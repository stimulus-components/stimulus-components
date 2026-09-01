import { Controller } from "@hotwired/stimulus"

const SVG_NAMESPACE = "http://www.w3.org/2000/svg"

// A node lists the keys it waits for, and a dash pattern lists its lengths, the way HTML lists
// tokens: separated by a space, or a comma.
const LIST_SEPARATOR = /[\s,]+/

// How far a connector leaves a node before it bends. Capped against the gap, so a tight layout
// does not produce a loop that doubles back over the node it leaves.
const DEFAULT_MAX_REACH = 40

// The dashes of a pending connector, and how many pixels of them travel past a point every second.
const DEFAULT_DASH_ARRAY = "4 4"
const DEFAULT_FLOW_SPEED = 8

export interface ConnectorBox {
  left: number
  top: number
  width: number
  height: number
}

/**
 * Which way the graph flows. `horizontal` leaves the source's right edge for the target's left
 * edge; `vertical` leaves the bottom edge for the top edge.
 */
export type ConnectorOrientation = "horizontal" | "vertical"

interface Point {
  x: number
  y: number
}

interface MeasuredNode {
  element: HTMLElement
  key: string
  box: ConnectorBox
}

/**
 * Joins the nodes of a graph with curved connectors, the way a CI pipeline draws its job graph.
 * Nothing here knows what a node stands for: a deployment pipeline, an automation flow and a
 * family tree all mount it.
 *
 * Each node carries `data-node-graph-key`, and `data-node-graph-depends-on` names the keys of the
 * nodes it waits for — several of them when the graph fans in. A key that no node on the page
 * carries draws nothing. A node whose work has not happened yet adds
 * `data-node-graph-pending="true"`, and the connectors into it are dashed and flow towards it. The
 * geometry is only known once the browser has laid the nodes out, so the paths are drawn here
 * rather than server-side.
 */
export default class NodeGraph extends Controller<HTMLElement> {
  declare readonly canvasTarget: SVGSVGElement
  declare readonly hasCanvasTarget: boolean
  declare readonly nodeTargets: HTMLElement[]
  declare readonly orientationValue: string
  declare readonly strokeWidthValue: number
  declare readonly maxReachValue: number
  declare readonly pathClassValue: string
  declare readonly dashArrayValue: string
  declare readonly flowValue: boolean
  declare readonly flowSpeedValue: number

  observer: ResizeObserver | null = null

  static targets = ["canvas", "node"]

  static values = {
    orientation: { type: String, default: "horizontal" },
    strokeWidth: { type: Number, default: 1.5 },
    maxReach: { type: Number, default: DEFAULT_MAX_REACH },
    pathClass: { type: String, default: "" },
    dashArray: { type: String, default: DEFAULT_DASH_ARRAY },
    flow: { type: Boolean, default: true },
    flowSpeed: { type: Number, default: DEFAULT_FLOW_SPEED },
  }

  connect(): void {
    if (!isOrientation(this.orientationValue)) {
      console.warn(
        `[@stimulus-components/node-graph] Unknown orientation: "${this.orientationValue}". Falling back to "horizontal".`,
      )
    }

    // The observer's own initial callback would cover this first draw, but relying on it leaves
    // the connectors up to a browser detail.
    this.draw()

    // Redraws when a label rewraps, a node moves or the viewport changes.
    this.observer = new ResizeObserver(() => this.draw())
    this.observer.observe(this.element)
    this.nodeTargets.forEach((node) => this.observer?.observe(node))
  }

  disconnect(): void {
    // Not `nodeTargets.forEach(unobserve)`: any node already removed from the DOM has dropped
    // out of that list and would stay observed.
    this.observer?.disconnect()
    this.observer = null
  }

  // A graph the user edits gains and loses nodes without a page load. Both callbacks can fire
  // before `connect()`, for the nodes already in the DOM, which the initial draw covers.
  nodeTargetConnected(node: HTMLElement): void {
    if (!this.observer) return

    this.observer.observe(node)
    this.draw()
  }

  nodeTargetDisconnected(node: HTMLElement): void {
    if (!this.observer) return

    this.observer.unobserve(node)
    this.draw()
  }

  draw(): void {
    if (!this.hasCanvasTarget) return

    const canvas = this.element.getBoundingClientRect()

    this.canvasTarget.setAttribute("width", String(canvas.width))
    this.canvasTarget.setAttribute("height", String(canvas.height))
    this.canvasTarget.setAttribute("viewBox", `0 0 ${canvas.width} ${canvas.height}`)

    // The connectors carry nothing a screen reader can use: the dependencies they draw are
    // already spelled out by the nodes themselves.
    this.canvasTarget.setAttribute("aria-hidden", "true")

    this.canvasTarget.replaceChildren(...this.connectors(canvas))
  }

  connectors(canvas: DOMRect): SVGPathElement[] {
    // Each node is measured once. A node that several others wait for would otherwise be
    // measured again for every one of them.
    const nodes: MeasuredNode[] = this.nodeTargets.map((element) => ({
      element,
      key: this.keyOf(element),
      box: this.boxOf(element, canvas),
    }))

    const paths: SVGPathElement[] = []

    nodes.forEach((node) => {
      this.dependencyKeysOf(node.element).forEach((key) => {
        const source = nodes.find((candidate) => candidate.key === key)

        // A key that no node on the page carries draws nothing, so a partial graph still renders.
        if (source) paths.push(this.connector(source, node))
      })
    })

    return paths
  }

  connector(source: MeasuredNode, target: MeasuredNode): SVGPathElement {
    const path = document.createElementNS(SVG_NAMESPACE, "path")

    path.setAttribute("d", this.connectorPath(source.box, target.box))
    path.setAttribute("fill", "none")
    path.setAttribute("stroke", "currentColor")
    path.setAttribute("stroke-width", String(this.strokeWidthValue))
    path.setAttribute(`data-${this.identifier}-from`, source.key)
    path.setAttribute(`data-${this.identifier}-to`, target.key)

    if (this.pathClassValue) path.setAttribute("class", this.pathClassValue)

    if (this.isPending(target.element)) {
      path.setAttribute(`data-${this.identifier}-pending`, "true")
      path.setAttribute("stroke-dasharray", this.dashArrayValue)

      this.flowDashes(path)
    }

    return path
  }

  /**
   * Travels the dashes of a pending connector from the source towards the node that waits for it.
   * A Web Animations API call rather than a stylesheet, so the package draws a moving connector
   * without a `@keyframes` rule of its own.
   */
  flowDashes(path: SVGPathElement): void {
    if (!this.flowValue || this.flowSpeedValue <= 0) return

    const period = dashPeriod(this.dashArrayValue)

    // A pattern this cannot measure — a length in `px`, in `%` — stays dashed without moving,
    // and so does a connector in a DOM without the Web Animations API, jsdom's among them.
    if (!Number.isFinite(period) || period <= 0 || typeof path.animate !== "function") return

    path.animate(
      // Negative: the dashes travel from the source to the node that waits for it.
      [{ strokeDashoffset: 0 }, { strokeDashoffset: -period }],
      { duration: (period / this.flowSpeedValue) * 1000, iterations: Infinity },
    )
  }

  /**
   * Cubic path joining two boxes, in the coordinate space both are measured against. The tangents
   * stay parallel to the flow at both ends, so the curve is flat when the boxes line up and bends
   * only as much as their offset across the flow needs.
   */
  connectorPath(source: ConnectorBox, target: ConnectorBox): string {
    return this.orientation === "vertical"
      ? verticalPath(source, target, this.maxReachValue)
      : horizontalPath(source, target, this.maxReachValue)
  }

  /**
   * An element's box relative to the graph. Both are measured in viewport coordinates, so the
   * graph may scroll without shifting the connectors.
   */
  boxOf(element: Element, canvas: DOMRect): ConnectorBox {
    const rect = element.getBoundingClientRect()

    return {
      left: rect.left - canvas.left,
      top: rect.top - canvas.top,
      width: rect.width,
      height: rect.height,
    }
  }

  keyOf(node: HTMLElement): string {
    return node.getAttribute(`data-${this.identifier}-key`) ?? ""
  }

  isPending(node: HTMLElement): boolean {
    return node.getAttribute(`data-${this.identifier}-pending`) === "true"
  }

  dependencyKeysOf(node: HTMLElement): string[] {
    const keys = node.getAttribute(`data-${this.identifier}-depends-on`)

    if (!keys) return []

    return keys.split(LIST_SEPARATOR).filter((key) => key.length > 0)
  }

  get orientation(): ConnectorOrientation {
    return isOrientation(this.orientationValue) ? this.orientationValue : "horizontal"
  }
}

/**
 * How far the dashes travel before the pattern comes back round. A pattern of an odd number of
 * lengths alternates on and off, so it only repeats after two passes.
 */
function dashPeriod(dashArray: string): number {
  const lengths = dashArray
    .split(LIST_SEPARATOR)
    .filter((length) => length.length > 0)
    .map(Number)

  const period = lengths.reduce((total, length) => total + length, 0)

  return lengths.length % 2 === 0 ? period : period * 2
}

function isOrientation(value: string): value is ConnectorOrientation {
  return value === "horizontal" || value === "vertical"
}

function horizontalPath(source: ConnectorBox, target: ConnectorBox, maxReach: number): string {
  const start = { x: source.left + source.width, y: centerY(source) }
  const end = { x: target.left, y: centerY(target) }
  const reach = curveReach(end.x - start.x, maxReach)

  return cubic(start, { x: start.x + reach, y: start.y }, { x: end.x - reach, y: end.y }, end)
}

function verticalPath(source: ConnectorBox, target: ConnectorBox, maxReach: number): string {
  const start = { x: centerX(source), y: source.top + source.height }
  const end = { x: centerX(target), y: target.top }
  const reach = curveReach(end.y - start.y, maxReach)

  return cubic(start, { x: start.x, y: start.y + reach }, { x: end.x, y: end.y - reach }, end)
}

function cubic(start: Point, firstControl: Point, secondControl: Point, end: Point): string {
  return `M ${pair(start)} C ${pair(firstControl)}, ${pair(secondControl)}, ${pair(end)}`
}

function curveReach(gap: number, maxReach: number): number {
  return Math.min(maxReach, Math.abs(gap) / 2)
}

function centerX(box: ConnectorBox): number {
  return box.left + box.width / 2
}

function centerY(box: ConnectorBox): number {
  return box.top + box.height / 2
}

function pair(point: Point): string {
  return `${round(point.x)} ${round(point.y)}`
}

function round(value: number): number {
  return Math.round(value * 100) / 100
}

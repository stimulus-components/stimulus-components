/**
 * @vitest-environment jsdom
 */

import { beforeEach, afterEach, describe, it, expect, vi } from "vitest"
import { Application } from "@hotwired/stimulus"
import NodeGraph from "../src/index"

let application: Application

const node = (identifier: string, key: string, dependsOn = "", attributes = ""): string => `
  <div data-${identifier}-target="node"
       data-${identifier}-key="${key}"
       data-${identifier}-depends-on="${dependsOn}"
       ${attributes}></div>
`

// Stimulus connects controllers from a MutationObserver callback.
const nextTick = (): Promise<void> =>
  new Promise((resolve): void => {
    setTimeout(resolve, 0)
  })

const mount = async (nodes: string, attributes = "", identifier = "node-graph"): Promise<void> => {
  application = Application.start()
  application.register(identifier, NodeGraph)

  document.body.innerHTML = `
    <div data-controller="${identifier}" ${attributes}>
      <svg data-${identifier}-target="canvas"></svg>
      ${nodes}
    </div>
  `

  await nextTick()
}

// A fan-out: two nodes both waiting for the first one.
const mountGraph = (attributes = "", identifier = "node-graph"): Promise<void> =>
  mount(
    `
      ${node(identifier, "suppliers")}
      ${node(identifier, "spend-q1", "suppliers")}
      ${node(identifier, "spend-q2", "suppliers")}
    `,
    attributes,
    identifier,
  )

// A chain of three nodes, the last of which has not run yet.
const mountPipeline = (attributes = ""): Promise<void> =>
  mount(
    `
      ${node("node-graph", "build")}
      ${node("node-graph", "e2e", "build")}
      ${node("node-graph", "release", "e2e", 'data-node-graph-pending="true"')}
    `,
    attributes,
  )

const canvas = (): SVGSVGElement => document.querySelector<SVGSVGElement>("svg")

const paths = (): SVGPathElement[] => Array.from(canvas().querySelectorAll<SVGPathElement>("path"))

const controller = (identifier = "node-graph"): NodeGraph =>
  application.getControllerForElementAndIdentifier(
    document.querySelector(`[data-controller="${identifier}"]`),
    identifier,
  ) as NodeGraph

beforeEach((): void => {
  // jsdom ships no ResizeObserver. The real one fires an initial observation, so this one does too.
  vi.stubGlobal(
    "ResizeObserver",
    class {
      constructor(private readonly callback: ResizeObserverCallback) {}

      observe(): void {
        this.callback([], this as unknown as ResizeObserver)
      }

      unobserve(): void {
        // The controller unobserves a node it loses; this stub holds no observation state.
      }

      disconnect(): void {
        // Nothing to release: this stub holds no observation state.
      }
    },
  )
})

afterEach((): void => {
  application?.stop()
  document.body.replaceChildren()
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe("#draw", () => {
  it("should draw one connector per node that waits for another", async (): Promise<void> => {
    await mountGraph()

    expect(paths()).toHaveLength(2)
  })

  it("should name both ends of a connector", async (): Promise<void> => {
    await mountGraph()

    expect(paths()[0].getAttribute("data-node-graph-from")).toBe("suppliers")
    expect(paths()[0].getAttribute("data-node-graph-to")).toBe("spend-q1")
  })

  it("should stroke with the inherited color", async (): Promise<void> => {
    await mountGraph()

    expect(paths()[0].getAttribute("stroke")).toBe("currentColor")
    expect(paths()[0].getAttribute("fill")).toBe("none")
    expect(paths()[0].getAttribute("stroke-width")).toBe("1.5")
    expect(paths()[0].getAttribute("class")).toBeNull()
  })

  it("should size the canvas and hide it from assistive technologies", async (): Promise<void> => {
    await mountGraph()

    expect(canvas().getAttribute("viewBox")).toBe("0 0 0 0")
    expect(canvas().getAttribute("aria-hidden")).toBe("true")
  })

  it("should draw nothing when a node points at a key the graph did not render", async (): Promise<void> => {
    await mount(node("node-graph", "spend-q1", "suppliers"))

    expect(paths()).toHaveLength(0)
  })

  it("should draw one connector per key when a node waits for several", async (): Promise<void> => {
    await mount(`
      ${node("node-graph", "spend-q1")}
      ${node("node-graph", "spend-q2")}
      ${node("node-graph", "savings", "spend-q1 spend-q2")}
    `)

    expect(paths()).toHaveLength(2)
  })

  it("should accept a comma between the keys a node waits for", async (): Promise<void> => {
    await mount(`
      ${node("node-graph", "spend-q1")}
      ${node("node-graph", "spend-q2")}
      ${node("node-graph", "savings", "spend-q1, spend-q2")}
    `)

    expect(paths()).toHaveLength(2)
  })

  it("should draw a solid connector into a node that is not pending", async (): Promise<void> => {
    await mountGraph()

    expect(paths()[0].getAttribute("stroke-dasharray")).toBeNull()
    expect(paths()[0].getAttribute("data-node-graph-pending")).toBeNull()
  })

  // No Web Animations API is stubbed here, so this also covers a DOM without one.
  it("should dash the connectors into a pending node", async (): Promise<void> => {
    await mountPipeline()

    expect(paths()[0].getAttribute("stroke-dasharray")).toBeNull()
    expect(paths()[1].getAttribute("stroke-dasharray")).toBe("4 4")
    expect(paths()[1].getAttribute("data-node-graph-pending")).toBe("true")
  })

  it("should dash with the pattern from the values", async (): Promise<void> => {
    await mountPipeline('data-node-graph-dash-array-value="2 6"')

    expect(paths()[1].getAttribute("stroke-dasharray")).toBe("2 6")
  })

  describe("the flowing dashes", () => {
    let animate: ReturnType<typeof vi.fn>

    beforeEach((): void => {
      // jsdom ships no Web Animations API. The real `animate` returns an Animation, which the
      // controller does not read.
      animate = vi.fn()
      Object.defineProperty(SVGElement.prototype, "animate", { value: animate, configurable: true })
    })

    afterEach((): void => {
      Reflect.deleteProperty(SVGElement.prototype, "animate")
    })

    it("should travel the dashes towards the node that waits", async (): Promise<void> => {
      await mountPipeline()

      expect(animate).toHaveBeenCalledWith([{ strokeDashoffset: 0 }, { strokeDashoffset: -8 }], {
        duration: 1000,
        iterations: Infinity,
      })
    })

    // The pattern alternates on and off, so an odd number of lengths only repeats after two passes.
    it("should travel twice the length of a pattern that lists an odd number of lengths", async (): Promise<void> => {
      await mountPipeline('data-node-graph-dash-array-value="3"')

      expect(animate).toHaveBeenCalledWith([{ strokeDashoffset: 0 }, { strokeDashoffset: -6 }], {
        duration: 750,
        iterations: Infinity,
      })
    })

    it("should travel at the speed from the values", async (): Promise<void> => {
      await mountPipeline('data-node-graph-flow-speed-value="16"')

      expect(animate).toHaveBeenCalledWith(expect.anything(), { duration: 500, iterations: Infinity })
    })

    it("should hold the dashes still when the flow is off", async (): Promise<void> => {
      await mountPipeline('data-node-graph-flow-value="false"')

      expect(paths()[1].getAttribute("stroke-dasharray")).toBe("4 4")
      expect(animate).not.toHaveBeenCalled()
    })

    it("should hold the dashes still when the pattern carries no measurable length", async (): Promise<void> => {
      await mountPipeline('data-node-graph-dash-array-value="4px 4px"')

      expect(paths()[1].getAttribute("stroke-dasharray")).toBe("4px 4px")
      expect(animate).not.toHaveBeenCalled()
    })
  })

  it("should follow the identifier the controller is registered under", async (): Promise<void> => {
    await mountGraph("", "pipeline")

    expect(paths()).toHaveLength(2)
    expect(paths()[0].getAttribute("data-pipeline-from")).toBe("suppliers")
  })

  it("should take its stroke width and its class from the values", async (): Promise<void> => {
    await mountGraph('data-node-graph-stroke-width-value="3" data-node-graph-path-class-value="stroke-indigo-400"')

    expect(paths()[0].getAttribute("stroke-width")).toBe("3")
    expect(paths()[0].getAttribute("class")).toBe("stroke-indigo-400")
  })

  it("should fall back to the horizontal orientation and warn on an unknown one", async (): Promise<void> => {
    const warn = vi.spyOn(console, "warn").mockImplementation((): void => {
      // Swallowed: this example asserts on the warning instead of printing it.
    })

    await mountGraph('data-node-graph-orientation-value="sideways"')

    expect(warn).toHaveBeenCalledWith(expect.stringContaining('Unknown orientation: "sideways"'))
    expect(controller().orientation).toBe("horizontal")
    expect(paths()).toHaveLength(2)
  })

  it("should draw nothing when the graph has no canvas", async (): Promise<void> => {
    application = Application.start()
    application.register("node-graph", NodeGraph)

    document.body.innerHTML = `
      <div data-controller="node-graph">
        ${node("node-graph", "suppliers")}
        ${node("node-graph", "spend-q1", "suppliers")}
      </div>
    `

    await nextTick()

    expect(document.querySelector("path")).toBeNull()
  })

  it("should redraw when a node joins the graph", async (): Promise<void> => {
    await mountGraph()

    document
      .querySelector<HTMLElement>("[data-controller='node-graph']")
      .insertAdjacentHTML("beforeend", node("node-graph", "spend-q3", "suppliers"))

    await nextTick()

    expect(paths()).toHaveLength(3)
  })

  it("should redraw when a node leaves the graph", async (): Promise<void> => {
    await mountGraph()

    document.querySelector<HTMLElement>("[data-node-graph-key='spend-q2']").remove()

    await nextTick()

    expect(paths()).toHaveLength(1)
  })
})

describe("#connectorPath", () => {
  const source = { left: 0, top: 0, width: 100, height: 40 }

  describe("horizontal, the default orientation", () => {
    it("should leave the source's right edge and reach the target's left edge", async (): Promise<void> => {
      await mountGraph()

      expect(controller().connectorPath(source, { left: 200, top: 0, width: 100, height: 40 })).toBe(
        "M 100 20 C 140 20, 160 20, 200 20",
      )
    })

    it("should bend towards a target sitting lower in the same stage", async (): Promise<void> => {
      await mountGraph()

      expect(controller().connectorPath(source, { left: 200, top: 60, width: 100, height: 40 })).toBe(
        "M 100 20 C 140 20, 160 80, 200 80",
      )
    })

    // A narrow gap must not produce control points that overshoot the nodes they leave.
    it("should cap the curve reach at half the horizontal gap", async (): Promise<void> => {
      await mountGraph()

      expect(controller().connectorPath(source, { left: 120, top: 60, width: 100, height: 40 })).toBe(
        "M 100 20 C 110 20, 110 80, 120 80",
      )
    })

    it("should take a tighter curve from maxReach", async (): Promise<void> => {
      await mountGraph('data-node-graph-max-reach-value="10"')

      expect(controller().connectorPath(source, { left: 200, top: 60, width: 100, height: 40 })).toBe(
        "M 100 20 C 110 20, 190 80, 200 80",
      )
    })
  })

  describe("vertical", () => {
    const attributes = 'data-node-graph-orientation-value="vertical"'

    it("should leave the source's bottom edge and reach the target's top edge", async (): Promise<void> => {
      await mountGraph(attributes)

      expect(controller().connectorPath(source, { left: 0, top: 100, width: 100, height: 40 })).toBe(
        "M 50 40 C 50 70, 50 70, 50 100",
      )
    })

    it("should bend towards a target sitting to the side", async (): Promise<void> => {
      await mountGraph(attributes)

      expect(controller().connectorPath(source, { left: 200, top: 140, width: 100, height: 40 })).toBe(
        "M 50 40 C 50 80, 250 100, 250 140",
      )
    })

    it("should cap the curve reach at half the vertical gap", async (): Promise<void> => {
      await mountGraph(attributes)

      expect(controller().connectorPath(source, { left: 200, top: 60, width: 100, height: 40 })).toBe(
        "M 50 40 C 50 50, 250 50, 250 60",
      )
    })
  })
})

describe("#boxOf", () => {
  it("should measure an element relative to the graph", async (): Promise<void> => {
    await mountGraph()

    const element = document.createElement("div")

    vi.spyOn(element, "getBoundingClientRect").mockReturnValue({
      left: 130,
      top: 240,
      width: 100,
      height: 40,
    } as DOMRect)

    expect(controller().boxOf(element, { left: 30, top: 40 } as DOMRect)).toEqual({
      left: 100,
      top: 200,
      width: 100,
      height: 40,
    })
  })
})

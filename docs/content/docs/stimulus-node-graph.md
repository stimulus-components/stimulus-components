---
title: Node Graph
description: A Stimulus controller that joins the nodes of a graph with curved SVG connectors.
package: node-graph
packagePath: "@stimulus-components/node-graph"
---

## Installation

:installation-block{:package="package" :packagePath="packagePath"}

## Example

:node-graph

## Usage

Lay the nodes out with your own CSS, give each one a key, and name the keys it depends on. The controller measures the
nodes once the browser has laid them out and draws one curved path per dependency inside the `canvas` target.

::code-block{tabName="app/views/index.html"}

```html
<div class="graph" data-controller="node-graph">
  <svg class="graph-canvas" data-node-graph-target="canvas"></svg>

  <div class="graph-stage">
    <div data-node-graph-target="node" data-node-graph-key="suppliers">Suppliers</div>
  </div>

  <div class="graph-stage">
    <div data-node-graph-target="node" data-node-graph-key="spend-q1" data-node-graph-depends-on="suppliers">
      Spend Q1
    </div>

    <div data-node-graph-target="node" data-node-graph-key="spend-q2" data-node-graph-depends-on="suppliers">
      Spend Q2
    </div>
  </div>

  <div class="graph-stage">
    <div data-node-graph-target="node" data-node-graph-key="savings" data-node-graph-depends-on="spend-q1 spend-q2">
      Savings report
    </div>
  </div>
</div>
```

::

A node that waits for several others separates their keys with a space, or with a comma. A key that no node on the page
carries draws nothing, so a partial graph never breaks.

### A larger graph

Each stage is one column, and the controller reads only the keys, so nothing stops a node from waiting for a node two
columns back, or for three nodes at once. The CI pipeline in the example above fans out to three jobs, fans back in on
`build`, then fans out again:

::code-block{tabName="app/views/index.html"}

```html
<div class="graph" data-controller="node-graph" data-node-graph-max-reach-value="24">
  <svg class="graph-canvas" data-node-graph-target="canvas"></svg>

  <div class="graph-stage">
    <div data-node-graph-target="node" data-node-graph-key="lint" data-node-graph-depends-on="install">Lint</div>
    <div data-node-graph-target="node" data-node-graph-key="types" data-node-graph-depends-on="install">Type check</div>
    <div data-node-graph-target="node" data-node-graph-key="unit" data-node-graph-depends-on="install">Unit tests</div>
  </div>

  <div class="graph-stage">
    <div data-node-graph-target="node" data-node-graph-key="build" data-node-graph-depends-on="lint types unit">
      Build
    </div>
  </div>

  <div class="graph-stage">
    <div data-node-graph-target="node" data-node-graph-key="e2e" data-node-graph-depends-on="build">E2E tests</div>
    <div data-node-graph-target="node" data-node-graph-key="preview" data-node-graph-depends-on="build">
      Deploy preview
    </div>
  </div>

  <div class="graph-stage">
    <div data-node-graph-target="node" data-node-graph-key="release" data-node-graph-depends-on="e2e, preview">
      Release
    </div>
  </div>
</div>
```

::

A dense graph wants a smaller `maxReach`, so the curves stay inside the gap between two columns.

The example dashes the connectors into the jobs that have not run yet. Nothing in the controller knows about a job
state: the rule matches the `data-node-graph-to` attribute the controller writes on each path.

```css
.graph [data-node-graph-to="e2e"],
.graph [data-node-graph-to="preview"],
.graph [data-node-graph-to="release"] {
  stroke-dasharray: 4 4;
}
```

### Required CSS

The connectors are drawn in the `canvas` target, which must cover the whole graph without taking part in the layout:

::code-block{tabName="app/assets/stylesheets/graph.css"}

```css
.graph {
  position: relative;
  display: inline-flex; /* Shrink to fit, so the canvas covers the whole graph. */
  align-items: center;
  gap: 3rem;
  color: #cbd5e1; /* The connectors stroke with `currentColor`. */
}

.graph-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.graph-stage {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
```

::

Give the graph element `position: relative` and let it shrink to fit its nodes: a graph wider than the viewport then
scrolls with its connectors when you wrap it in an `overflow-x: auto` container.

The connectors stroke with `currentColor`, so the `color` of the graph element sets their color. Set
`data-node-graph-path-class-value` instead to style every path with your own classes.

## Configuration

| Attribute                            | Default        | Description                                                                             | Optional |
| ------------------------------------ | -------------- | --------------------------------------------------------------------------------------- | -------- |
| `data-node-graph-orientation-value`  | `"horizontal"` | `horizontal` flows from the right edge to the left edge, `vertical` from bottom to top. | ✅       |
| `data-node-graph-stroke-width-value` | `1.5`          | Width of the connectors, in pixels.                                                     | ✅       |
| `data-node-graph-max-reach-value`    | `40`           | How far a connector leaves a node before it bends. Capped at half the gap.              | ✅       |
| `data-node-graph-path-class-value`   | `""`           | Classes set on every path, to style the connectors with your own CSS.                   | ✅       |
| `data-node-graph-key`                |                | On a node: the key the other nodes refer to.                                            | ✅       |
| `data-node-graph-depends-on`         |                | On a node: the keys of the nodes it waits for, separated by a space or a comma.         | ✅       |

Each path carries `data-node-graph-from` and `data-node-graph-to`, so a single connector can be styled or found again:

```css
[data-node-graph-to="savings"] {
  stroke: #6366f1;
  stroke-dasharray: 4 4;
}
```

These attribute names follow the identifier the controller is registered under. Register it as `pipeline` and the
attributes become `data-pipeline-key`, `data-pipeline-depends-on`, `data-pipeline-from` and `data-pipeline-to`.

## Redrawing

A `ResizeObserver` redraws the connectors when the graph resizes, when a label rewraps and when a node joins or leaves
the graph. Call `draw()` yourself after any other change that moves a node:

```html
<div data-controller="node-graph">
  <button data-action="node-graph#draw">Redraw</button>
</div>
```

## Extending Controller

::extending-controller
::code-block{tabName="app/javascript/controllers/node_graph_controller.js"}

```js
import NodeGraph from "@stimulus-components/node-graph"

export default class extends NodeGraph {
  connect() {
    super.connect()
    console.log("Do what you want here.")

    // Redraw the connectors.
    this.draw()

    // The orientation in use, after the fallback.
    this.orientation
  }

  // Read the keys of a node from somewhere else than the data attributes.
  dependencyKeysOf(node) {
    return JSON.parse(node.dataset.dependencies)
  }

  // Draw elbow connectors instead of curves. Both boxes are measured relative to the graph.
  connectorPath(source, target) {
    const startX = source.left + source.width
    const startY = source.top + source.height / 2
    const endY = target.top + target.height / 2
    const middleX = (startX + target.left) / 2

    return `M ${startX} ${startY} H ${middleX} V ${endY} H ${target.left}`
  }
}
```

::
::

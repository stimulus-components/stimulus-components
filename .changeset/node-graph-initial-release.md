---
"@stimulus-components/node-graph": minor
---

Add `@stimulus-components/node-graph`, a controller that joins the nodes of a graph with curved SVG connectors.

Each node carries a key and names the keys it depends on, so a CI pipeline, an import pipeline, an automation flow or a
family tree all mount the same controller. The geometry is only known once the browser has laid the nodes out, so the
paths are drawn in the browser, and a `ResizeObserver` redraws them when a label rewraps, the viewport changes, or a
node joins or leaves the graph.

The attribute names follow the identifier the controller is registered under, so a graph registered as `pipeline`
reads `data-pipeline-key` and `data-pipeline-depends-on`.

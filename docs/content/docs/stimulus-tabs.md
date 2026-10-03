---
title: Tabs
description: An accessible Stimulus controller for tabbed interfaces.
package: tabs
packagePath: "@stimulus-components/tabs"
---

## Installation

:installation-block{:package="package" :packagePath="packagePath"}

## Example

:tabs

## Usage

Add `tablist`, `tab`, and `panel` targets in matching order. The controller supplies the tab roles, links each tab to its panel, and selects the first enabled tab unless one has `aria-selected="true"`.

::code-block{tabName="app/views/index.html"}

```html
<div data-controller="tabs">
  <div data-tabs-target="tablist" aria-label="Account settings">
    <button data-tabs-target="tab" data-action="click->tabs#select keydown->tabs#navigate">Account</button>
    <button data-tabs-target="tab" data-action="click->tabs#select keydown->tabs#navigate">Password</button>
    <button data-tabs-target="tab" data-action="click->tabs#select keydown->tabs#navigate">Billing</button>
  </div>

  <section data-tabs-target="panel">Account settings</section>
  <section data-tabs-target="panel">Password settings</section>
  <section data-tabs-target="panel">Billing settings</section>
</div>
```

::

Tabs are activated automatically when they receive focus. Arrow keys move between enabled tabs and wrap at either end; Home and End move to the first and last enabled tabs.

For manual activation, set `data-tabs-activation-value="manual"`. Arrow keys then move focus without changing panels, and Enter or Space activates the focused tab.

For vertical tabs, set `data-tabs-orientation-value="vertical"`. Up and Down replace Left and Right for keyboard navigation.

Existing tab and panel IDs are preserved. You can explicitly associate tabs and panels that are not in matching order with `aria-controls`.

Tabs controllers can be nested. Each controller manages only its own targets, so interactions and dynamic updates in a nested group do not change its parent group.

Set `data-tabs-url-value="true"` to synchronize selection with the URL hash. A matching panel ID is selected on connection and on `hashchange`, while selecting a tab updates the hash. Unknown panel IDs and panels belonging to disabled tabs are ignored.

The controller dispatches a cancelable `tabs:before-change` event before an interaction changes the selected tab, followed by `tabs:change` after a successful change. Both events bubble and provide the previous and next tab as `event.detail.from` and `event.detail.to`. Canceling `tabs:before-change` leaves the current selection unchanged.

## Configuration

| Attribute                     | Default      | Description                                                     | Optional |
| ----------------------------- | ------------ | --------------------------------------------------------------- | -------- |
| `data-tabs-activation-value`  | `auto`       | Use `manual` to require Enter or Space after keyboard movement. | ✅       |
| `data-tabs-orientation-value` | `horizontal` | Use `vertical` to navigate with Up and Down.                    | ✅       |
| `data-tabs-url-value`         | `false`      | Synchronize the selected panel with the URL hash.               | ✅       |

## Extending Controller

::extending-controller
::code-block{tabName="app/javascript/controllers/tabs_controller.js"}

```js
import Tabs from "@stimulus-components/tabs"

export default class extends Tabs {
  connect() {
    super.connect()
    console.log("Do what you want here.")
  }
}
```

::
::

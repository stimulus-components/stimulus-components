---
title: Chartjs
description: A Stimulus controller to deal with chart.js.
package: chartjs
packagePath: '@stimulus-components/chartjs'
---

## Installation

:installation-block{:package="package" :packagePath="packagePath"}

::alert
This component is based on the [Chart.js library](https://www.chartjs.org/){target="\_blank" .underline .hover:no-underline}.
::

## Usage

### Basic usage

::code-block{tabName="app/views/index.html"}

```html
<canvas
  data-controller="chart"
  data-chart-data-value='{ "labels": ["January", "February", "March", "April", "May", "June", "July"], "datasets": [{ "label": "My First dataset", "backgroundColor": "transparent", "borderColor": "#3B82F6", "data": [37, 83, 78, 54, 12, 5, 99] }] }'
></canvas>
```

::

If you extend this controller, it could be handy to use it with a `target`:

::code-block{tabName="app/views/index.html"}

```html
<div
  data-controller="chart"
  data-chart-data-value='{ "labels": ["January", "February", "March", "April", "May", "June", "July"], "datasets": [{ "label": "My First dataset", "backgroundColor": "transparent", "borderColor": "#3B82F6", "data": [37, 83, 78, 54, 12, 5, 99] }] }'
>
  <canvas data-chart-target="canvas"></canvas>

  <!-- You need to define this action -->
  <button data-action="chart#update">Update me!</button>
</div>
```

::

**It's much simpler with a framework.**

### With backend framework (optional)

::code-block{tabName="app/controllers/charts_controller.rb"}

```ruby
class ChartsController < ApplicationController
  def index
    @chart_data = {
      labels: %w[January February March April May June July],
      datasets: [{
        label: 'My First dataset',
        backgroundColor: 'transparent',
        borderColor: '#3B82F6',
        data: [37, 83, 78, 54, 12, 5, 99]
      }]
    }

    @chart_options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  end
end
```

::

::code-block{tabName="app/views/index.html"}

```erb
<canvas
  data-controller="chart"
  data-chart-data-value="<%= @chart_data.to_json %>"
  data-chart-options-value="<%= @chart_options.to_json %>"
></canvas>
```

::

## Configuration

| Attribute                  | Default | Description              | Optional |
| -------------------------- | ------- | ------------------------ | -------- |
| `data-chart-data-value`    | `{}`    | The data for Chart.js    | ❌       |
| `data-chart-type-value`    | `line`  | Type of the chart        | ✅       |
| `data-chart-options-value` | `{}`    | The options for Chart.js | ✅       |

## Extending Controller

::extending-controller
::code-block{tabName="app/javascript/controllers/chartjs_controller.js"}

```js
import Chart from '@stimulus-components/chartjs'

export default class extends Chart {
  connect() {
    super.connect()
    console.log('Do what you want here.')

    // The chart.js instance
    this.chart

    // Options from the data attribute.
    this.options

    // Default options for every charts.
    this.defaultOptions
  }

  // Bind an action on this method
  async update() {
    const response = await fetch('https://example.com/chart_data.json')
    const data = await response.json()

    this.chart.data = data
    this.chart.update()
  }

  // You can set default options in this getter for all your charts.
  get defaultOptions() {
    return {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
    }
  }
}
```

::
::

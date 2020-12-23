---
layout: component
title: Chartjs
parent: Available controllers
package: chartjs
netlify_id: f75f37fa-c1c7-42c3-8266-27d11c67c2b1
---

A Stimulus controller to deal with chart.js.

## Installation

```bash
$ yarn add stimulus-chartjs
```

And use it in your JS file:
```js
import { Application } from "stimulus"
import Chart from "stimulus-chartjs"

const application = Application.start()
application.register("chart", Chart)
```

{% include demo.md %}

## Usage

### Basic usage

```html
<canvas
  data-controller="chart"
  data-chart-data-value='{ "labels": ["January", "February", "March", "April", "May", "June", "July"], "datasets": [{ "label": "My First dataset", "backgroundColor": "transparent", "borderColor": "#3B82F6", "data": [37, 83, 78, 54, 12, 5, 99] }] }'
></canvas>
```

If you extend this controller, it could be handy to with it with a `target`:
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

**It's much simpler with a framework.**

### With backend framework (optional)

In you controller:
```ruby
class ChartsController < ApplicationController
  def index
    @chart_data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
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

In your view:
```html
<canvas
  data-controller="chart"
  data-chart-data-value="<%= @chart_data.to_json %>"
  data-chart-options-value="<%= @chart_options.to_json %>"
></canvas>
```

## 🛠 Configuration

| Attribute | Default | Description | Optional |
| --------- | ------- | ----------- | -------- |
| `data-chart-data-value` | `{}` | The data for Chart.js | ❌ |
| `data-chart-type-value` | `line` | Type of the chart | ✅ |
| `data-chart-options-value` | `{}` | The options for Chart.js | ✅ |

## 🎛 Extending Controller

{% capture content %}
```js
import Chart from "stimulus-chartjs"

export default class extends Chart {
  connect() {
    super.connect()
    console.log("Do what you want here.")

    // The chart.js instance
    this.chart

    // Options from the data attribute.
    this.options

    // Default options for every charts.
    this.defaultOptions
  }

  // Bind an action on this method
  async update () {
    const response = await fetch('https://example.com/chart_data.json')
    const data = await response.json()

    this.chart.data = data
    this.chart.update()
  }

  // You can set default options in this getter for all your charts.
  get defaultOptions () {
    return {
      maintainAspectRatio: false,
      legend: {
        display: false
      }
    }
  }
}
```
{% endcapture %}

{% include extending_controller.md content=content %}

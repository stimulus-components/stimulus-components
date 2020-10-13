import { Controller } from 'stimulus'

export default class extends Controller {
  connect () {
    this.data.has('lazyLoading') ? this.lazyLoad() : this.load()
  }

  disconnect () {
    this.stopRefreshing()
  }

  load () {
    this.fetch()

    if (this.data.has('refreshInterval')) {
      this.startRefreshing()
    }
  }

  lazyLoad () {
    const options = {
      threshold: this.data.get('lazyLoadingThreshold') || 0,
      rootMargin: this.data.get('lazyLoadingRootMargin') || '0px'
    }

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.load()

          observer.unobserve(entry.target)
        }
      })
    }, options)

    observer.observe(this.element)
  }

  fetch () {
    fetch(this.data.get('url'))
      .then(response => response.text())
      .then(html => {
        this.element.innerHTML = html
      })
  }

  startRefreshing () {
    this.refreshTimer = setInterval(() => {
      this.fetch()
    }, this.data.get('refreshInterval'))
  }

  stopRefreshing () {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer)
    }
  }
}

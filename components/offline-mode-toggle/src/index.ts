import { Controller } from "@hotwired/stimulus"

export default class OfflineModeToggle extends Controller {
  static targets = [ "button", "span", "label"]
  static values = { connectionTestPath: String }

  connect() {
    const imageUrl = this.connectionTestPathValue || "/assets/white-pixel.png"
    useOnlineStatusInLocalStorage(this) // use localStorage to preserve state accross tabs, page navigation and refresh
    useNetworkCheck(this, { testUrl: imageUrl })
    this.setClasses()
    
    this.canBeOnline().then(networkAvailable => {
      // network availability must precede user's choice of online/offline mode
      this.onlineStatus = networkAvailable ? (this.getOnlineStatusFromLocalStorage() === "true" ) : false
    })
    .catch(() => {
      this.onlineStatus = false // definitely offline
    }).then(() => {
      this.setOnlineStatusInLocalStorage(this.onlineStatus)
      this.setButtonState(this.onlineStatus)
      })

    this.pollOnlineStatus() // make sure the toggle is off when there is no network available
  }

  // TODO: make toggle disabled when no network is available (gray out the button or something)
  setClasses() {
    this.ONLINE_BUTTON_CLASS = "bg-lime-500"
    this.OFFLINE_BUTTON_CLASS = "bg-gray-200"
    this.ONLINE_SPAN_CLASS = "translate-x-5"
    this.OFFLINE_SPAN_CLASS = "translate-x-0"
  }

  async canBeOnline() {
    return await this.checkOnlineStatus()
  }

  setButtonState(status) {
    if (status) {
      this.labelTarget.innerHTML = "Online"
      this.buttonTarget.classList.add(this.ONLINE_BUTTON_CLASS)
      this.spanTarget.classList.add(this.ONLINE_SPAN_CLASS)
    } else {
      this.labelTarget.innerHTML = "Offline"
      this.buttonTarget.classList.add(this.OFFLINE_BUTTON_CLASS)
      this.spanTarget.classList.add(this.OFFLINE_SPAN_CLASS)
    }
  }

  pollOnlineStatus() {
      setTimeout(async () => {
      const networkAvailable = await this.checkOnlineStatus()
      if (!networkAvailable && this.onlineStatus) {
        this.toggle()
      }
      this.pollOnlineStatus()
    }, 3000);
  }

  async canToggle() {
    return this.onlineStatus || await this.canBeOnline()
  }

  async toggle() {
    if (await this.canToggle()) {
      if (this.onlineStatus) {
        this.buttonTarget.classList.replace(this.ONLINE_BUTTON_CLASS, this.OFFLINE_BUTTON_CLASS)
        this.spanTarget.classList.replace(this.ONLINE_SPAN_CLASS, this.OFFLINE_SPAN_CLASS)
      } else {
        this.buttonTarget.classList.replace(this.OFFLINE_BUTTON_CLASS, this.ONLINE_BUTTON_CLASS)
        this.spanTarget.classList.replace(this.OFFLINE_SPAN_CLASS, this.ONLINE_SPAN_CLASS)
      }
      this.toggleOnlineStatus()
    }
  }

  toggleOnlineStatus() {
    this.onlineStatus = !this.onlineStatus
    this.labelTarget.innerHTML = this.onlineStatus ? "Online" : "Offline"
    this.setOnlineStatusInLocalStorage(this.onlineStatus)
  }
}

// TO-DO: Extract the following functions into separate files
// Maybe submit them to stimulus-use as mixins? 

export const useOnlineStatusInLocalStorage = controller => {
  Object.assign(controller, {
    getOnlineStatusFromLocalStorage() {
      return localStorage.getItem('onlineStatus') || "true";
    },
    setOnlineStatusInLocalStorage(value) {
    localStorage.setItem('onlineStatus', value)
    }
  })
}

export const useNetworkCheck = (controller, options = {}) => {
  Object.assign(controller, {
    async checkOnlineStatus() {
      try {
        const online = await fetch(options.testUrl, {
          headers: {
            "Cache-Control": "no-cache"
          }
        })
        return online.status >= 200 && online.status < 300
      } catch (err) {
        return false
      }
    }
  })
}

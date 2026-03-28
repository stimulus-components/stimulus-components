import { Controller } from "@hotwired/stimulus"

interface Address {
  street_number: string
  route: string
  locality: string
  administrative_area_level_2: string
  administrative_area_level_1: string
  country: string
  postal_code: string
}

export default class extends Controller {
  declare autocompleteElement: google.maps.places.PlaceAutocompleteElement
  declare place: google.maps.places.Place
  declare addressTarget: HTMLElement
  declare streetNumberTarget: HTMLInputElement
  declare routeTarget: HTMLInputElement
  declare cityTarget: HTMLInputElement
  declare countyTarget: HTMLInputElement
  declare stateTarget: HTMLInputElement
  declare countryTarget: HTMLInputElement
  declare postalCodeTarget: HTMLInputElement
  declare longitudeTarget: HTMLInputElement
  declare latitudeTarget: HTMLInputElement

  declare hasStreetNumberTarget: boolean
  declare hasRouteTarget: boolean
  declare hasCityTarget: boolean
  declare hasCountryTarget: boolean
  declare hasCountyTarget: boolean
  declare hasPostalCodeTarget: boolean
  declare hasStateTarget: boolean
  declare hasLongitudeTarget: boolean
  declare hasLatitudeTarget: boolean

  declare countryValue: Array<string>
  declare wrapperClassValue: string

  static targets = [
    "address",
    "city",
    "streetNumber",
    "route",
    "postalCode",
    "country",
    "county",
    "state",
    "longitude",
    "latitude",
  ]

  static values = {
    country: Array,
    wrapperClass: String,
  }

  initialize(): void {
    this.placeSelected = this.placeSelected.bind(this)
  }

  async connect(): Promise<void> {
    if (typeof google !== "undefined") {
      await this.initAutocomplete()
    }
  }

  async initAutocomplete(): Promise<void> {
    ;(await google.maps.importLibrary("places")) as google.maps.PlacesLibrary
    this.autocompleteElement = new google.maps.places.PlaceAutocompleteElement(this.autocompleteOptions)
    if (this.wrapperClassValue) {
      this.autocompleteElement.classList = this.wrapperClassValue
    }
    this.addressTarget.replaceWith(this.autocompleteElement)
    this.autocompleteElement.addEventListener("gmp-select", this.placeSelected)
  }

  async placeSelected(event: any): Promise<void> {
    const placePrediction = event.placePrediction
    this.place = placePrediction.toPlace()

    await this.place.fetchFields({
      fields: ["addressComponents", "location"],
    })

    const addressComponents = this.place.addressComponents

    if (addressComponents !== undefined) {
      const formattedAddress = this.formatAddressComponents(addressComponents) as Address

      this.setAddressComponents(formattedAddress)
    }

    if (this.place.location !== undefined) {
      this.setGeometry(this.place.location)
    }
  }

  setAddressComponents(address: Address): void {
    if (this.hasStreetNumberTarget) this.streetNumberTarget.value = address.street_number || ""
    if (this.hasRouteTarget) this.routeTarget.value = address.route || ""
    if (this.hasCityTarget) this.cityTarget.value = address.locality || ""
    if (this.hasCountyTarget) this.countyTarget.value = address.administrative_area_level_2 || ""
    if (this.hasStateTarget) this.stateTarget.value = address.administrative_area_level_1 || ""
    if (this.hasCountryTarget) this.countryTarget.value = address.country || ""
    if (this.hasPostalCodeTarget) this.postalCodeTarget.value = address.postal_code || ""
  }

  setGeometry(location: google.maps.LatLng): void {
    if (this.hasLongitudeTarget) this.longitudeTarget.value = location.lng().toString()
    if (this.hasLatitudeTarget) this.latitudeTarget.value = location.lat().toString()
  }

  get autocompleteOptions(): google.maps.places.PlaceAutocompleteElementOptions {
    const options: google.maps.places.PlaceAutocompleteElementOptions = {}

    if (this.countryValue && this.countryValue.length > 0) {
      options.componentRestrictions = {
        country: this.countryValue,
      }
    }

    return options
  }

  preventSubmit(event: KeyboardEvent): void {
    if (event.code === "Enter") {
      event.preventDefault()
    }
  }

  private formatAddressComponents(addressComponents: google.maps.places.AddressComponent[]): Address {
    const data = {}

    addressComponents.forEach((component: google.maps.places.AddressComponent) => {
      const type = component.types[0]

      data[type] = component.longText
    })

    return data as Address
  }
}

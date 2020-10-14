function debounce (callback, delay) {
  let timeout

  return (...args) => {
    const context = this
    clearTimeout(timeout)

    timeout = setTimeout(() => callback.apply(context, args), delay)
  }
}

export { debounce }

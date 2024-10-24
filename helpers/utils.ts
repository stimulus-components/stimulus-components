export function debounce(callback: Function, delay: number) {
  let timeout: number

  return (...args) => {
    clearTimeout(timeout)

    // @ts-expect-error
    timeout = setTimeout(() => {
      callback.apply(this, args)
    }, delay)
  }
}

export function throttle(callback: Function, delay: number) {
  let shouldWait = false

  return (...args) => {
    if (shouldWait) return

    callback.apply(this, args)

    shouldWait = true

    setTimeout(() => {
      shouldWait = false
    }, delay)
  }
}

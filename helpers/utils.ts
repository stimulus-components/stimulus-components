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

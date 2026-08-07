export function debounce(this: unknown, callback: (...args: unknown[]) => unknown, delay: number) {
  let timeout: ReturnType<typeof setTimeout>

  return (...args: unknown[]) => {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      callback.apply(this, args)
    }, delay)
  }
}

export function throttle(this: unknown, callback: (...args: unknown[]) => unknown, delay: number) {
  let shouldWait = false

  return (...args: unknown[]) => {
    if (shouldWait) return

    callback.apply(this, args)

    shouldWait = true

    setTimeout(() => {
      shouldWait = false
    }, delay)
  }
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

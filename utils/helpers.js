export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function toPascalCase(text) {
  return text
    .split('-')
    .map((s) => capitalize(s.toLowerCase()))
    .join('')
}

export function formatCompactNumber(number) {
  if (number) {
    return Intl.NumberFormat('en', { notation: 'compact' }).format(number)
  }
}

export function prettyNumber(number) {
  return new Intl.NumberFormat('en-US', { maximumSignificantDigits: 4 }).format(number)
}

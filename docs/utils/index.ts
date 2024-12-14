// @ts-expect-error
import markdownParser from "@nuxt/content/transformers/markdown"

export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function toPascalCase(text: string) {
  return text
    .split("-")
    .map((s) => capitalize(s.toLowerCase()))
    .join("")
}

export function formatCompactNumber(number?: number) {
  if (number) {
    return Intl.NumberFormat("en", { notation: "compact" }).format(number)
  }
}

export function prettyNumber(number: number): string {
  return new Intl.NumberFormat("en-US", { maximumSignificantDigits: 4 }).format(number)
}

export async function codeToMarkdown(content: string, language = "html") {
  return markdownParser.parse(
    null,
    `\`\`\`${language}
${content.trim()}
\`\`\`\``,
  )
}

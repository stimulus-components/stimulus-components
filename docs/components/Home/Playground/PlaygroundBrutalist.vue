<template>
  <PlaygroundContainer>
    <CodeBlock tab-name="index.html">
      <ContentRenderer :value="importMarkdown" />
    </CodeBlock>

    <BrowserBlock>
      <div v-html="`${playgroundDefaultContent} ${content}`"></div>
    </BrowserBlock>
  </PlaygroundContainer>
</template>

<script setup>
import { codeToMarkdown } from "@/utils"
import { playgroundDefaultContent } from "@/components/Home/Playground/content"
import PlaygroundContainer from "@/components/Home/Playground/PlaygroundContainer.vue"

const content = `
<div
  data-controller="clipboard"
  data-clipboard-success-content-value="<strong>Copied!</strong>"
  class="flex flex-col sm:flex-row items-center justify-between gap-2"
>
  <input
    type="text"
    value="https://www.slog-app.com/register"
    data-clipboard-target="source"
    readonly
    class="w-full px-3 py-2 text-gray-700 bg-gray-100 border border-black focus:outline-none focus:ring-2 focus:ring-teal-500"
  />

  <button
    type="button"
    data-action="clipboard#copy"
    data-clipboard-target="button"
    class="text-nowrap px-3 py-2 focus:outline-none bg-teal-300 font-semibold border border-black tracking-wide uppercase text-primary dark:text-primary"
  >
    Copy to clipboard
  </button>
</div>
`

const importMarkdown = await codeToMarkdown(content, "html")
</script>

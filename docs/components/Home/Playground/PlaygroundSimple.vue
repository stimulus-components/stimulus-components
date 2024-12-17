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
  class="mt-1 flex rounded-md shadow-sm"
>
  <input
    type="text"
    value="https://www.timecop-app.com/register"
    data-clipboard-target="source"
    readonly
    class="py-3 px-2 outline-none flex-1 block rounded-none rounded-l-md sm:text-sm border border-gray-300"
  />

  <button
    type="button"
    data-action="clipboard#copy"
    data-clipboard-target="button"
    class="inline-flex items-center gap-1 px-3 focus:outline-none rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
  >
    Copy to clipboard
  </button>
</div>
`

const importMarkdown = await codeToMarkdown(content, "html")
</script>

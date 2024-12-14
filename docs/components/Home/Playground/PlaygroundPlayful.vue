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
    value="https://www.timecop-app.com/register"
    data-clipboard-target="source"
    readonly
    class="w-full px-6 py-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
  />

  <button
    type="button"
    data-action="clipboard#copy"
    data-clipboard-target="button"
    class="text-nowrap px-6 py-4 focus:outline-none bg-pink-300 font-semibold rounded-full border border-black text-primary transition hover:border-b-2 hover:border-r-2 hover:-translate-y-[2px] hover:-translate-x-[2px]"
  >
    Copy to clipboard
  </button>
</div>
`

const importMarkdown = await codeToMarkdown(content, "html")
</script>

<template>
  <div
    class="prose dark:prose-invert prose-pre:mt-0 prose-pre:rounded-t-none prose-pre:rounded-b-xl prose-pre:mb-0 prose-h3:mt-0 py-16 max-w-6xl mx-auto"
  >
    <h2 class="text-4xl font-bold leading-8 tracking-tight text-primary text-center">
      Completely unstyled, UI agnostic
    </h2>

    <div class="grid md:grid-cols-2 gap-12 bg-[#F6F5FF] p-5 rounded-3xl">
      <div>
        <h3 class="text-center text-text-secondary font-normal">Install the package</h3>

        <CodeBlock>
          <ContentRenderer :value="installData" />
        </CodeBlock>
      </div>

      <div>
        <h3 class="text-center text-text-secondary font-normal">Import it in your application</h3>

        <CodeBlock tab-name="app/javascript/controllers/index.js">
          <ContentRenderer :value="importData" />
        </CodeBlock>
      </div>
    </div>
  </div>
</template>

<script setup>
import { codeToMarkdown } from "@/utils"

const installData = await codeToMarkdown(`$ yarn add @stimulus-components/clipboard`, "bash")

const content = `
import { Application } from "@hotwired/stimulus"
import Clipboard from "@stimulus-components/clipboard"

const application = Application.start()
application.register("clipboard", Clipboard)
`

const importData = await codeToMarkdown(content, "js")
</script>

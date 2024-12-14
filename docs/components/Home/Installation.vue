<template>
  <div
    class="prose dark:prose-invert prose-pre:mt-0 prose-pre:rounded-t-none prose-pre:rounded-b-xl prose-pre:mb-0 prose-h3:mt-0 py-16 mx-auto max-w-6xl px-4"
  >
    <h2 class="text-4xl font-bold leading-8 mb-5 tracking-tight text-center text-primary dark:text-primary-dark">
      Completely unstyled, UI-agnostic
    </h2>

    <p class="text-text-secondary dark:text-text-secondary-dark font-light leading-8 mb-12 text-center">
      Stimulus Components is not a single installable library. Instead, it offers a collection of standalone controllers
      that you can integrate as needed.

      <br />
      Completely UI-agnostic, it works seamlessly with any CSS framework, including custom ones.
    </p>

    <div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-12 bg-[#F6F5FF] dark:bg-slate-600 p-5 rounded-3xl">
      <div>
        <h3 class="text-center text-primary dark:text-primary-dark font-normal">Install the package</h3>

        <CodeBlock>
          <ContentRenderer :value="installData" />
        </CodeBlock>
      </div>

      <div>
        <h3 class="text-center text-primary dark:text-primary-dark font-normal">Import it in your application</h3>

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

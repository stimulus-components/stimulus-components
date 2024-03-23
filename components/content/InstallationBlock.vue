<template>
  <div class="relative">
    <ol class="relative space-y-2 list-none mt-5 pl-0">
      <li
        class="relative ps-12 pb-4 last:pb-0 before:content-[counter(step)] before:absolute before:start-0 before:flex before:items-center before:justify-center before:size-7 before:text-xs before:font-semibold before:text-slate-700 before:rounded-full before:border before:border-slate-200 dark:before:border-slate-700 dark:before:text-slate-200 dark:before:ring-0 dark:before:shadow-none dark:before:highlight-white/5 last:after:hidden after:absolute after:top-[calc(1.75rem_+_.5rem)] after:bottom-0 after:start-[0.875rem] after:w-px after:bg-slate-200 dark:after:bg-gray-800"
        style="counter-increment: step 1"
      >
        <h3 class="text-sm font-semibold text-gray-800 dark:text-gray-200">Install the package</h3>

        <CodeBlock copy-to-clipboard>
          <ContentRenderer
            :filename="tabs.yarn.filename"
            :value="tabs.yarn.markdownContent"
            :clipboard-content="tabs.yarn.installCommand"
            icon="Terminal"
          />
          <ContentRenderer
            :filename="tabs.npm.filename"
            :value="tabs.npm.markdownContent"
            :clipboard-content="tabs.npm.installCommand"
            icon="Terminal"
          />
          <ContentRenderer
            :filename="tabs.importmaps.filename"
            :value="tabs.importmaps.markdownContent"
            :clipboard-content="tabs.importmaps.installCommand"
            icon="Terminal"
          />
        </CodeBlock>
      </li>

      <li
        class="relative ps-12 pb-4 last:pb-0 before:content-[counter(step)] before:absolute before:start-0 before:flex before:items-center before:justify-center before:size-7 before:text-xs before:font-semibold before:text-slate-700 before:rounded-full before:border before:border-slate-200 dark:before:border-slate-700 dark:before:text-slate-200 dark:before:ring-0 dark:before:shadow-none dark:before:highlight-white/5 last:after:hidden after:absolute after:top-[calc(1.75rem_+_.5rem)] after:bottom-0 after:start-[0.875rem] after:w-px after:bg-slate-200 dark:after:bg-gray-800"
        style="counter-increment: step 1"
      >
        <h3 class="text-sm font-semibold text-gray-800 dark:text-gray-200">
          Register the controller in your application
        </h3>

        <CodeBlock tab-name="app/javascript/controllers/index.js">
          <ContentRenderer :value="importMarkdown" />
        </CodeBlock>
      </li>
    </ol>
  </div>
</template>

<script setup>
import markdownParser from '@nuxt/content/transformers/markdown'
import { toPascalCase } from '@/utils/helpers'

const props = defineProps({
  package: {
    type: String,
    required: true,
  },
  packagePath: {
    type: String,
    required: true,
  },
  controllerName: {
    type: String,
    default: null,
  },
  extraPackages: {
    type: String,
    default: '',
  },
})

const getInstallMarkdown = async (installCommand) => {
  return markdownParser.parse(
    null,
    `\`\`\`bash
$ ${installCommand}
\`\`\``,
  )
}

const getTabMarkdown = async (prefix) => {
  const installCommand = `${prefix} ${props.packagePath} ${props.extraPackages}`

  return {
    installCommand: installCommand,
    markdownContent: await getInstallMarkdown(installCommand),
  }
}

const tabs = {
  yarn: {
    filename: 'yarn',
    ...(await getTabMarkdown('yarn add')),
  },
  npm: {
    filename: 'npm',
    ...(await getTabMarkdown('npm install')),
  },
  importmaps: {
    filename: 'importmaps',
    ...(await getTabMarkdown('bin/importmap pin')),
  },
}

const className = toPascalCase(props.package)
const importMarkdown = await markdownParser.parse(
  null,
  `\`\`\`js
import { Application } from '@hotwired/stimulus'
import ${className} from '${props.packagePath}'

const application = Application.start()
application.register('${props.controllerName || props.package}', ${className})
\`\`\``,
)
</script>

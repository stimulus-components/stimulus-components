<template>
  <div class="relative">
    <ol class="relative space-y-2 list-none mt-5 pl-0">
      <li
        class="relative ps-12 pb-4 last:pb-0 before:content-[counter(step)] before:absolute before:start-0 before:flex before:items-center before:justify-center before:size-7 before:text-xs before:font-semibold before:text-slate-700 before:rounded-full before:border before:border-slate-200 dark:before:border-slate-700 dark:before:text-slate-200 dark:before:ring-0 dark:before:shadow-none dark:before:highlight-white/5 last:after:hidden after:absolute after:top-[calc(1.75rem_+_.5rem)] after:bottom-0 after:start-[0.875rem] after:w-px after:bg-slate-200 dark:after:bg-gray-700"
        style="counter-increment: step 1"
      >
        <h3 class="text-sm font-semibold text-gray-800 dark:text-gray-200">Install the package</h3>

        <div class="flex gap-6 mt-6 overflow-x-auto">
          <button
            v-for="(tab, index) in tabs"
            :key="index"
            type="button"
            tabindex="-1"
            :class="[
              'flex items-center gap-2 mb-2 pb-2 border-b-2',
              {
                'border-transparent': index !== selectedIndex,
                'border-orange-500': index === selectedIndex,
              },
            ]"
            @click.prevent="selectedIndex = index"
          >
            <component :is="tab.icon" class="size-4" :class="tab.iconClass" />

            {{ tab.filename }}
          </button>
        </div>

        <CodeBlock :clipboard-content="selectedTab.installCommand" icon="Terminal">
          <ContentRenderer :value="selectedTab.markdownContent" />
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
import { codeToMarkdown, toPascalCase } from "@/utils"
import YarnIcon from "@/components/Icons/YarnIcon.vue"
import NpmIcon from "@/components/Icons/NpmIcon.vue"
import BunIcon from "@/components/Icons/BunIcon.vue"
import PnpmIcon from "@/components/Icons/PnpmIcon.vue"

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
    default: "",
  },
})

const getTabMarkdown = async (prefix) => {
  const installCommand = `${prefix} ${props.packagePath} ${props.extraPackages}`

  return {
    installCommand,
    markdownContent: await codeToMarkdown(`$ ${installCommand}`, "bash"),
  }
}

const selectedIndex = ref(0)
const tabs = [
  {
    filename: "yarn",
    ...(await getTabMarkdown("yarn add")),
    icon: YarnIcon,
  },
  {
    filename: "npm",
    ...(await getTabMarkdown("npm install")),
    icon: NpmIcon,
  },
  {
    filename: "pnpm",
    ...(await getTabMarkdown("pnpm add")),
    icon: PnpmIcon,
  },
  {
    filename: "bun",
    ...(await getTabMarkdown("bun add")),
    icon: BunIcon,
  },
]
const selectedTab = computed(() => tabs.find((_, index) => index === selectedIndex.value))

const className = toPascalCase(props.package)
const content = `
import { Application } from '@hotwired/stimulus'
import ${className} from '${props.packagePath}'

const application = Application.start()
application.register('${props.controllerName || props.package}', ${className})
`

const importMarkdown = await codeToMarkdown(content, "js")
</script>

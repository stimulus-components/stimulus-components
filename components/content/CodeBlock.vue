<template>
  <div class="relative">
    <div
      class="bg-zinc-100 dark:bg-slate-800 flex gap-2 items-center justify-between border border-gray-200 dark:border-slate-500 border-b-0 overflow-x-scroll rounded-t-md"
    >
      <div class="flex">
        <component
          :is="tabs.length === 1 ? 'span' : 'button'"
          v-for="(tab, index) in tabs"
          :key="index"
          tabindex="-1"
          class="flex items-center flex-shrink-0 font-semibold gap-2 text-gray-700 dark:text-white border-b-2 text-sm/6 px-3 py-2 whitespace-nowrap overflow-x-scroll"
          :class="[index === selectedIndex ? 'bg-white dark:bg-slate-700 border-orange-500' : 'border-transparent']"
          type="button"
          @click.prevent="selectedIndex = index"
        >
          <component :is="tab.icon" class="size-4" />

          {{ tab.label }}
        </component>
      </div>

      <CopyToClipboard v-if="props.copyToClipboard" :content="selectedTab?.clipboardContent" />
    </div>

    <component :is="selectedTab?.component" />
  </div>
</template>

<script setup>
import CopyToClipboard from '@/components/CopyToClipboard.vue'
import { DocumentTextIcon, CommandLineIcon } from '@heroicons/vue/24/outline'

const slots = useSlots()
const selectedIndex = ref(0)
const props = defineProps({
  tabName: {
    type: String,
    default: null,
  },
  copyToClipboard: {
    type: Boolean,
    default: false,
  },
})

const tabs = computed(
  () =>
    slots.default?.().map((slot) => {
      const label = slot.props?.filename || props.tabName

      return {
        label: label,
        icon: label === 'Terminal' || slot.props?.icon === 'Terminal' ? CommandLineIcon : DocumentTextIcon,
        clipboardContent: slot.props?.['clipboard-content'],
        component: slot,
      }
    }) || [],
)

const selectedTab = computed(() => tabs.value.find((_, index) => index === selectedIndex.value))
</script>

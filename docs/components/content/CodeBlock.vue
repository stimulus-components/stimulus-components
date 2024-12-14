<template>
  <div class="relative">
    <div
      class="bg-[color:var(--tw-prose-pre-bg)] flex justify-between gap-2 items-center px-4 py-2 overflow-x-auto rounded-t-xl"
    >
      <div class="flex items-center gap-2 basis-1/3">
        <div class="size-3 rounded-full bg-red-500"></div>
        <div class="size-3 rounded-full bg-yellow-500"></div>
        <div class="size-3 rounded-full bg-green-500"></div>
      </div>

      <div class="flex justify-center text-nowrap text-gray-500 text-sm basis-1/3">
        {{ props.tabName }}
      </div>

      <CopyToClipboard v-if="props.clipboardContent" :content="props.clipboardContent" class="basis-1/3" />

      <div v-else class="basis-1/3"></div>
    </div>

    <slot />
  </div>
</template>

<script setup>
import CopyToClipboard from "@/components/CopyToClipboard.vue"

const props = defineProps({
  tabName: {
    type: String,
    default: "Terminal",
  },
  clipboardContent: {
    type: String,
    default: null,
  },
})
</script>

<template>
  <button
    class="rounded-md text-sm p-2 text-gray-500 dark:text-white dark:hover:text-gray-300 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
    @click.prevent="copyToClipboard"
  >
    <ClipboardDocumentCheckIcon v-if="copying" class="size-5" />
    <ClipboardDocumentIcon v-else class="size-5" />
  </button>
</template>

<script setup>
import { ClipboardDocumentCheckIcon, ClipboardDocumentIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  content: {
    type: String,
    default: null,
  },
})

const copying = ref(false)
const timeout = ref()

const copyToClipboard = () => {
  navigator.clipboard.writeText(props.content).then(() => copied())
}

const copied = () => {
  copying.value = true

  timeout.value = setTimeout(() => (copying.value = false), 2000)
}
</script>

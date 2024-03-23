<template>
  <Block title="Clipboard">
    <div
      data-controller="clipboard"
      data-clipboard-success-content-value="<strong>Copied!</strong>"
      class="mt-1 flex rounded-md shadow-sm"
    >
      <input
        type="text"
        value="Click the button to copy me!"
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
        <ClipboardDocumentCheckIcon class="size-5" />

        Copy to clipboard
      </button>
    </div>
  </Block>
</template>

<script setup>
import Block from '@/components/UI/Block.vue'
import { ClipboardDocumentCheckIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <div class="relative border rounded-xl shadow-md order-first sm:order-none">
    <div class="border-b bg-white flex justify-between gap-2 items-center px-4 py-2 overflow-x-auto rounded-t-xl">
      <div class="flex items-center gap-2 basis-1/3">
        <div class="size-3 rounded-full bg-red-500"></div>
        <div class="size-3 rounded-full bg-yellow-500"></div>
        <div class="size-3 rounded-full bg-green-500"></div>
      </div>

      <div class="flex justify-center text-nowrap text-gray-500 text-sm basis-1/3">
        {{ props.tabName }}
      </div>

      <div class="basis-1/3"></div>
    </div>

    <div class="p-3">
      <slot />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tabName: {
    type: String,
    default: "Safari",
  },
})
</script>

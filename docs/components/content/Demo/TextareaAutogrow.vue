<template>
  <Block title="Textarea Autogrow" :is-home="isHome">
    <div>
      <textarea
        data-controller="textarea-autogrow"
        class="shadow-sm appearance-none border w-full py-2 px-3 rounded-l-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="What's happening?"
      ></textarea>
    </div>
  </Block>
</template>

<script setup>
import Block from "@/components/UI/Block.vue"

defineProps({
  isHome: {
    type: Boolean,
    default: false,
  },
})
</script>

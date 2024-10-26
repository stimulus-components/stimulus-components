<template>
  <Block title="Remote Rails">
    <div class="mb-8">
      <a
        href="/message.html"
        class="text-blue-500"
        data-controller="remote"
        data-remote=""
        data-action="ajax:success->remote#prepend"
      >
        Click me to prepend ☝️
      </a>
    </div>

    <div class="mb-8">
      <a
        href="/message.html"
        class="text-blue-500"
        data-controller="remote"
        data-remote=""
        data-action="ajax:success->remote#append"
      >
        Click me to append 👇
      </a>
    </div>

    <div>
      <a
        href="/message.html"
        class="text-blue-500"
        data-controller="remote"
        data-remote=""
        data-action="ajax:success->remote#replace"
      >
        Click me to replace 👈
      </a>
    </div>
  </Block>
</template>

<script setup>
import Block from "@/components/UI/Block.vue"
</script>

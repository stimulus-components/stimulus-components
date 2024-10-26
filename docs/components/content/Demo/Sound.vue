<template>
  <Block title="Sound">
    <div data-controller="sound" data-sound-url-value="/sound.mp3" class="flex flex-col md:flex-row flex-wrap gap-3">
      <button type="button" data-action="sound#play" class="px-2 py-1 border rounded-md hover:bg-gray-100">
        ▶️ Play
      </button>

      <button type="button" data-action="sound#pause" class="px-2 py-1 border rounded-md hover:bg-gray-100">
        ⏸️ Pause
      </button>

      <button type="button" data-action="sound#reset" class="px-2 py-1 border rounded-md hover:bg-gray-100">
        ⏹️ Reset
      </button>

      <button
        type="button"
        data-action="sound#muted"
        data-sound-muted-param="true"
        class="px-2 py-1 border rounded-md hover:bg-gray-100"
      >
        🔇 Mute
      </button>

      <button
        type="button"
        data-action="sound#muted"
        data-sound-muted-param="false"
        class="px-2 py-1 border rounded-md hover:bg-gray-100"
      >
        🔈 Unmute
      </button>

      <button
        type="button"
        data-action="sound#loop"
        data-sound-loop-param="true"
        class="px-2 py-1 border rounded-md hover:bg-gray-100"
      >
        🔁 Loop
      </button>

      <button
        type="button"
        data-action="sound#volume"
        data-sound-volume-param="1"
        class="px-2 py-1 border rounded-md hover:bg-gray-100"
      >
        🔊 100%
      </button>

      <button
        type="button"
        data-action="sound#volume"
        data-sound-volume-param="0.25"
        class="px-2 py-1 border rounded-md hover:bg-gray-100"
      >
        🔉 25%
      </button>
    </div>
  </Block>
</template>

<script setup>
import Block from "@/components/UI/Block.vue"
</script>

<template>
  <Block title="Speech Recognition">
    <div data-controller="speech-recognition">
      <textarea
        data-speech-recognition-target="input"
        class="shadow-sm appearance-none border w-full py-2 px-3 rounded-md text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600"
        placeholder="Click Start and speak..."
        rows="4"
      ></textarea>

      <div class="mt-2 flex flex-wrap gap-2 items-center">
        <button
          type="button"
          data-speech-recognition-target="startButton"
          data-action="speech-recognition#start"
          class="hidden px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Start
        </button>

        <button
          type="button"
          data-speech-recognition-target="stopButton"
          data-action="speech-recognition#stop"
          class="hidden px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Stop
        </button>

        <span data-speech-recognition-target="indicator" class="hidden text-sm text-slate-500 dark:text-slate-400">
          Recording…
        </span>
      </div>
    </div>
  </Block>
</template>

<script setup>
import Block from "@/components/UI/Block.vue"
</script>

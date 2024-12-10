<template>
  <div class="max-w-6xl mx-auto px-4 text-center">
    <h2 class="text-4xl font-bold leading-8 tracking-tight text-primary">Contributing</h2>

    <p class="text-text-secondary font-light leading-8 mt-3">
      Do not hesitate to contribute to the project by adapting or adding features!
    </p>

    <p class="text-text-secondary font-light leading-8">Bug reports or pull requests are welcome.</p>

    <div class="mt-10 mx-auto max-w-3xl p-0.5 bg-gradient-to-tr from-surface-primary to-secondary rounded-xl">
      <div class="bg-white px-14 py-4 text-pretty rounded-xl">
        Don't forget to drop a 🌟 on
        <UIButton class="mx-4" variant="secondary" href="https://github.com/stimulus-components/stimulus-components">
          <GithubIcon />

          Github</UIButton
        >
        to support the project!
      </div>
    </div>
  </div>
</template>

<script setup>
import GithubIcon from "@/components/Icons/GithubIcon.vue"
</script>

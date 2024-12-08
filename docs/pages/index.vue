<template>
  <div>
    <div class="relative overflow-hidden">
      <HomeHero />

      <main class="px-4 py-8 lg:relative">
        <HomeInstallation />
        <HomePlayground />

        <HomeStats />

        <HomeComponentsList />
        <HomeSponsors />
        <HomeTestimonials />

        <TimecopCTA />

        <HomeContributing />
      </main>
    </div>
  </div>
</template>

<script setup>
useHead({
  titleTemplate: "Stimulus Components",
})
</script>

<template>
  <div>
    <div class="relative overflow-hidden">
      <HomeHero />

      <main>
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

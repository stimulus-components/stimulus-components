<template>
  <div class="bg-surface-primary">
    <SponsorsLines />

    <div class="relative py-16 mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-12">
      <div class="flex flex-col gap-6 items-start justify-center">
        <h2 class="text-4xl font-bold leading-8 tracking-tight text-primary text-center">Sponsors</h2>

        <p class="text-text-secondary font-light leading-8">
          Stimulus Component is an MIT licensed open source project and completely free to use. However, the amount of
          effort needed to maintain and develop new features for the project is not sustainable without proper financial
          backing. You can support Stimulus Components development on GitHub Sponsors.
        </p>

        <UIButton href="https://github.com/sponsors/stimulus-components">Become a sponsor</UIButton>
      </div>

      <div class="flex flex-col gap-6">
        <div v-for="(sponsor, index) in sponsors" :key="sponsor.name">
          <a :href="sponsor.url" target="_blank" rel="noopener noreferrer">
            <img
              :src="`/sponsors/${sponsor.src}`"
              :alt="sponsor.name"
              :class="[
                'max-h-10 w-full object-contain',
                {
                  'sm:rotate-6': index === 0,
                  'sm:rotate-3': index === 1,
                  'sm:-rotate-3': index === 3,
                  'sm:-rotate-6': index === 4,
                },
              ]"
              loading="lazy"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SponsorsLines from "@/components/Home/SponsorsLines.vue"

const sponsors = [
  {
    name: "SpendHQ",
    src: "spendhq.svg",
    url: "https://www.spendhq.com/",
  },
  {
    name: "Maybe",
    src: "maybe.svg",
    url: "https://maybe.co/",
  },
  {
    name: "Avo",
    src: "avo.svg",
    url: "https://avohq.io/",
  },
  {
    name: "Studio HB",
    src: "studio-hb.svg",
    url: "https://www.studio-hb.com/",
  },
  {
    name: "SearchApi",
    src: "searchapi.svg",
    url: "https://searchapi.io/",
  },
]
</script>

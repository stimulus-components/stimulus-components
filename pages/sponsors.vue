<template>
  <div class="relative overflow-hidden px-4 py-8">
    <div class="relative prose dark:prose-invert mx-auto z-30">
      <h1>Sponsors</h1>

      <p>
        Stimulus Components is an <a href="https://opensource.org/licenses/MIT" target="_blank">MIT</a> licensed open
        source project and completely free to use. However, the amount of effort needed to maintain and develop new
        features for the project is not sustainable without proper financial backing. You can support Stimulus
        Components development on
        <a href="https://github.com/sponsors/stimulus-components" target="_blank">GitHub Sponsors</a>. 🙏
      </p>

      <h2>Current Sponsors</h2>

      <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-8 items-center">
        <div v-for="sponsor in sponsors" :key="sponsor.name">
          <a :href="sponsor.url" target="_blank" rel="noopener noreferrer">
            <div class="flex justify-center">
              <img :src="`/sponsors/${sponsor.src}`" :alt="sponsor.name" class="max-h-16" loading="lazy" />
            </div>
          </a>
        </div>

        <div class="not-prose">
          <a
            href="https://github.com/sponsors/stimulus-components"
            target="_blank"
            class="flex items-center gap-2 border-2 hover:border-orange-400 border-dashed rounded-lg p-2 text-gray-500"
          >
            <div class="flex content-center justify-center items-center size-12 border-2 border-dashed rounded-lg">
              +
            </div>
            Your company
          </a>
        </div>
      </div>

      <h2>How to sponsor</h2>

      <p>
        Sponsorships can be done via
        <a href="https://github.com/sponsors/stimulus-components" target="_blank">GitHub Sponsors</a>. Invoices can be
        obtained via GitHub's payment system. Both monthly-recurring sponsorships and one-time donations are accepted.
      </p>

      <h2>Why becoming a sponsor</h2>

      <p>
        If you run a business and are using Stimulus Components in a revenue-generating product, it makes business sense
        to sponsor Stimulus Components development:
        <strong>it ensures the project that your product relies on stays healthy and actively maintained</strong>. It
        can also help your exposure in the Stimulus Components community and makes it easier to attract Stimulus
        Components developers.
      </p>

      <p>
        If you are an individual user and have enjoyed the productivity of using Stimulus Components, consider donating
        as a sign of appreciation - like buying me ☕️ once in a while :)
      </p>
    </div>

    <TimecopCTA></TimecopCTA>
  </div>
</template>

<script setup>
const sponsors = [
  {
    name: 'SpendHQ',
    src: 'spendhq.svg',
    url: 'https://www.spendhq.com/',
  },
  {
    name: 'Maybe',
    src: 'maybe.png',
    url: 'https://maybe.co/',
  },
  {
    name: 'Avo',
    src: 'avo.svg',
    url: 'https://avohq.io/',
  },
  {
    name: 'SearchApi',
    src: 'searchapi.svg',
    url: 'https://searchapi.io/',
  },
]

useHead({
  title: 'Sponsors',
  meta: [
    {
      name: 'description',
      content: 'You can support Stimulus Components development on GitHub Sponsors.',
    },
  ],
})
</script>

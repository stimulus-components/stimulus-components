<template>
  <div class="relative overflow-hidden">
    <div class="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
      <div class="relative h-full text-lg max-w-prose mx-auto" aria-hidden="true">
        <svg
          class="absolute top-12 left-full transform translate-x-32"
          width="404"
          height="384"
          fill="none"
          viewBox="0 0 404 384"
        >
          <defs>
            <pattern
              id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="384" fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)" />
        </svg>
        <svg
          class="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32"
          width="404"
          height="384"
          fill="none"
          viewBox="0 0 404 384"
        >
          <defs>
            <pattern
              id="f210dbf6-a58d-4871-961e-36d5016a0f49"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="384" fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
        </svg>
        <svg
          class="absolute bottom-12 left-full transform translate-x-32"
          width="404"
          height="384"
          fill="none"
          viewBox="0 0 404 384"
        >
          <defs>
            <pattern
              id="d3eb07ae-5182-43e6-857d-35c643af9034"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="384" fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)" />
        </svg>
      </div>
    </div>

    <div class="relative prose mx-auto z-30">
      <h1>Sponsors</h1>

      <p>
        Stimulus Components is an <a href="https://opensource.org/licenses/MIT" target="_blank">MIT</a> licensed open
        source project and completely free to use. However, the amount of effort needed to maintain and develop new
        features for the project is not sustainable without proper financial backing. You can support Stimulus
        Components development on
        <a href="https://github.com/sponsors/stimulus-components" target="_blank">GitHub Sponsors</a>. 🙏
      </p>
      <h2>How to sponsor</h2>

      <p>
        Sponsorships can be done via
        <a href="https://github.com/sponsors/stimulus-components" target="_blank">GitHub Sponsors</a>. Invoices can be
        obtained via GitHub’s payment system. Both monthly-recurring sponsorships and one-time donations are accepted.
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

      <h2>Current Sponsors</h2>

      <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-8 items-center">
        <div v-for="sponsor in sponsors" :key="sponsor.name">
          <a :href="sponsor.url" target="_blank">
            <img :src="require(`~/assets/sponsors/${sponsor.src}`)" :alt="sponsor.name" class="h-16" loading="lazy" />
          </a>
        </div>

        <div class="not-prose">
          <a
            href="https://github.com/sponsors/stimulus-components"
            target="_blank"
            class="flex items-center gap-2 border-2 hover:border-orange-400 border-dashed rounded-lg p-2 text-gray-500"
          >
            <div class="flex content-center justify-center items-center w-12 h-12 border-2 border-dashed rounded-lg">
              +
            </div>
            Your company
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sponsors',

  data() {
    return {
      sponsors: [
        {
          name: 'Per Angusta',
          src: 'per-angusta.svg',
          url: 'https://www.per-angusta.com/en/',
        },
      ],
    }
  },

  head() {
    return {
      title: 'Sponsors',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'You can support Stimulus Components development on GitHub Sponsors.',
        },
      ],
    }
  },
}
</script>

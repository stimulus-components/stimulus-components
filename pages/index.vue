<template>
  <div class="bg-white">
    <div class="relative overflow-hidden">
      <main class="lg:relative">
        <HomeHero></HomeHero>

        <div class="prose mx-auto pb-20">
          <p>
            <a href="https://stimulus.hotwired.dev/" target="_blank">Stimulus JS</a> is a modest yet powerful JavaScript
            framework that augments your HTML with just enough behavior to make it shine.
          </p>

          <p>
            We all share common behaviors between our applications and no one want to reinvent the wheel. That is why
            the Stimulus Components library exists. To bring you
            <strong>generic and customizable controllers</strong> in your applications.
          </p>

          <p>Every components of this library <strong>share a same philosophy</strong>:</p>

          <ul>
            <li>Have a <NuxtLink to="/docs">great documentation</NuxtLink> and demo.</li>
            <li>
              Can be <strong>extended</strong> and <strong>customized</strong> for your needs with a
              <strong>strong API</strong>.
            </li>
            <li>Be easy to <strong>learn</strong> and <strong>use</strong>.</li>
            <li>Be as close as possible to the Stimulus conventions.</li>
          </ul>

          <p>
            The Stimulus Components library is already used by <strong>hundreds of developers</strong> and
            <strong>many companies</strong>.
          </p>

          <ContentRendererMarkdown :value="data" />
        </div>

        <HomeStats></HomeStats>

        <TimecopCTA></TimecopCTA>

        <div class="prose mx-auto">
          <DocsFooter></DocsFooter>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
useHead({
  titleTemplate: 'Stimulus Components',
})

const { data } = await useAsyncData('content-loader', () => queryContent('examples/content-loader').findOne())
</script>

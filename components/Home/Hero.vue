<template>
  <div class="">
    <div class="relative isolate px-6 pt-14 lg:px-8">
      <div
        class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#eab308] to-[#f97316] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style="
            clip-path: polygon(
              74.1% 44.1%,
              100% 61.6%,
              97.5% 26.9%,
              85.5% 0.1%,
              80.7% 2%,
              72.5% 32.5%,
              60.2% 62.4%,
              52.4% 68.1%,
              47.5% 58.3%,
              45.2% 34.5%,
              27.5% 76.7%,
              0.1% 64.9%,
              17.9% 100%,
              27.6% 76.8%,
              76.1% 97.7%,
              74.1% 44.1%
            );
          "
        ></div>
      </div>

      <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div class="hidden sm:mb-8 sm:flex sm:justify-center">
          <div
            class="bg-white dark:bg-slate-700 relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 dark:text-gray-300 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
          >
            Stimulus Components is now an organization on NPM.

            <a href="https://www.npmjs.com/org/stimulus-components" class="font-semibold text-orange-500">
              <span class="absolute inset-0" aria-hidden="true"></span>
              Read more
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>

        <div class="text-center">
          <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            <span class="block xl:inline">Stimulus</span>
            <span class="block bg-gradient-to-r from-yellow-500 to-orange-500 xl:inline bg-clip-text text-transparent">
              Components</span
            >
          </h1>

          <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            Stimulus Components is an open-source set of StimulusJS controllers to solve common patterns.
          </p>

          <div class="mt-10 sm:flex sm:justify-center">
            <div class="rounded-md shadow">
              <NuxtLink
                to="/docs"
                class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white md:py-4 md:text-lg md:px-10 bg-gradient-to-r from-yellow-500 to-orange-500"
              >
                Get started &rarr;
              </NuxtLink>
            </div>

            <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <a
                href="https://github.com/stimulus-components"
                class="w-full flex items-center justify-center gap-1 px-8 py-3 border border-transparent text-base font-medium rounded-md bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                <GithubIcon />

                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#eab308] to-[#f97316] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style="
            clip-path: polygon(
              74.1% 44.1%,
              100% 61.6%,
              97.5% 26.9%,
              85.5% 0.1%,
              80.7% 2%,
              72.5% 32.5%,
              60.2% 62.4%,
              52.4% 68.1%,
              47.5% 58.3%,
              45.2% 34.5%,
              27.5% 76.7%,
              0.1% 64.9%,
              17.9% 100%,
              27.6% 76.8%,
              76.1% 97.7%,
              74.1% 44.1%
            );
          "
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import GithubIcon from '@/components/Icons/GithubIcon.vue'
</script>

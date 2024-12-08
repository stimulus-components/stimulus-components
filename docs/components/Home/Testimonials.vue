<template>
  <div class="py-16 mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl text-center">
      <div class="inline-flex rounded-full p-0.5 -rotate-2 bg-gradient-to-tr from-surface-primary to-secondary">
        <h2 class="bg-white relative rounded-full px-3 py-1 text-sm leading-6 text-primary backdrop-blur-sm">
          Testimonials
        </h2>
      </div>

      <p class="mt-2 text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl">
        See what other developers are saying about it!
      </p>
    </div>

    <div class="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
      <div class="-mt-8 sm:-mx-4 sm:columns-2 lg:columns-3">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="testimonial.author"
          :class="[
            'pt-8 sm:inline-block sm:w-full sm:px-4',
            {
              'rotate-1': index % 2 === 0,
              '-rotate-1': index % 2 !== 0,
            },
          ]"
        >
          <div class="rounded-2xl bg-gradient-to-tr from-surface-primary to-secondary p-0.5">
            <figure class="flex flex-col gap-6 rounded-2xl bg-gray-50 dark:bg-slate-900 p-8 text-sm leading-6">
              <blockquote class="text-gray-900 dark:text-gray-400">
                <p>“{{ testimonial.content }}”</p>
              </blockquote>

              <figcaption>
                <a
                  :href="`https://twitter.com/${testimonial.username}`"
                  class="flex items-center gap-x-4"
                  target="_blank"
                >
                  <img
                    :src="`/testimonials/${testimonial.username}.jpg`"
                    :alt="testimonial.name"
                    class="size-10 rounded-full bg-gray-50"
                    loading="lazy"
                  />

                  <div>
                    <div class="font-bold text-gray-900 dark:text-white">{{ testimonial.author }}</div>

                    <div class="text-gray-500 dark:text-gray-400">{{ testimonial.job }}</div>
                  </div>
                </a>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const testimonials = [
  {
    author: "Guillaume Briday",
    content:
      "All controllers originate from real-world applications that addressed common problems faced by nearly everyone.",
    username: "guillaumebriday",
    job: "Creator of Stimulus Components",
  },
  {
    author: "Matt Polito",
    content:
      "They’re lightweight, can be pulled in individually and solve a problem… it would be a disservice to our clients NOT to use them.",
    username: "mattpolito",
    job: "Senior Engineer at Hashrocket",
  },
  {
    author: "Avi Flombaum",
    content:
      "Stimulus Components are indispensable libraries for common UI patterns that are expertly developed and maintained.",
    username: "aviflombaum",
    job: "Co-founder of Flatiron School",
  },
  {
    author: "Ryan Weaver",
    content: "High-quality, pre-made stimulus controllers that solve my most common problems? I’m in love!",
    username: "weaverryan",
    job: "Writer for SymfonyCasts & Symfony core member",
  },
  {
    author: "Mike Holford",
    content:
      "Just used my first component today for https://urbanhunt.co 🎉 Super easy to integrate and got nested forms working in 10 minutes. Thanks!",
    username: "holfyio",
    job: "Developer / Maker",
  },
  {
    author: "Adrian Marin",
    content:
      "From time to time I need to apply a common pattern that I haven't yet built with Stimulus. Stimulus Components has it already! The components are polished, easy to implement, and the docs are great!",
    username: "adrianthedev",
    job: "Creator of @avo_hq",
  },
]
</script>

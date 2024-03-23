<template>
  <div class="py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-xl text-center">
        <h2 class="text-lg font-semibold leading-8 tracking-tight text-orange-600">Testimonials</h2>
        <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          See what other developers are saying about it!
        </p>
      </div>

      <div class="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
        <div class="-mt-8 sm:-mx-4 sm:columns-2 lg:columns-3">
          <div
            v-for="testimonial in testimonials"
            :key="testimonial.author"
            class="pt-8 sm:inline-block sm:w-full sm:px-4"
          >
            <figure class="rounded-2xl bg-gray-50 dark:bg-slate-900 p-8 text-sm leading-6">
              <blockquote class="text-gray-900 dark:text-gray-400">
                <p>“{{ testimonial.content }}”</p>
              </blockquote>

              <figcaption>
                <a
                  :href="`https://twitter.com/${testimonial.twitter}`"
                  class="mt-6 flex items-center gap-x-4"
                  target="_blank"
                >
                  <img
                    :src="`/testimonials/${testimonial.twitter}.jpg`"
                    :alt="testimonial.name"
                    class="size-10 rounded-full bg-gray-50"
                    loading="lazy"
                  />

                  <div>
                    <div class="font-semibold text-gray-900 dark:text-white">{{ testimonial.author }}</div>

                    <div class="text-gray-600 dark:text-gray-400">{{ testimonial.job }}</div>
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
    author: 'Guillaume Briday',
    content:
      'All controllers originate from real-world applications that addressed common problems faced by nearly everyone.',
    twitter: 'guillaumebriday',
    job: 'Creator of Stimulus Components',
  },
  {
    author: 'Matt Polito',
    content:
      'They’re lightweight, can be pulled in individually and solve a problem… it would be a disservice to our clients NOT to use them.',
    twitter: 'mattpolito',
    job: 'Senior Engineer at Hashrocket',
  },
  {
    author: 'Avi Flombaum',
    content:
      'Stimulus Components are indispensable libraries for common UI patterns that are expertly developed and maintained.',
    twitter: 'aviflombaum',
    job: 'Co-founder of Flatiron School',
  },
  {
    author: 'Ryan Weaver',
    content: 'High-quality, pre-made stimulus controllers that solve my most common problems? I’m in love!',
    twitter: 'weaverryan',
    job: 'Writer for SymfonyCasts & Symfony core member',
  },
  {
    author: 'Mike Holford',
    content:
      'Just used my first component today for https://urbanhunt.co 🎉 Super easy to integrate and got nested forms working in 10 minutes. Thanks!',
    twitter: 'holfyio',
    job: 'Developer / Maker',
  },
  {
    author: 'Adrian Marin',
    content:
      "From time to time I need to apply a common pattern that I haven't yet built with Stimulus. Stimulus Components has it already! The components are polished, easy to implement, and the docs are great!",
    twitter: 'adrianthedev',
    job: 'Creator of @avo_hq',
  },
]
</script>

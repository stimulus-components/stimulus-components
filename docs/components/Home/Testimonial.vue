<template>
  <div
    :class="[
      'pt-8 sm:inline-block sm:w-full sm:px-4',
      {
        'rotate-1': index % 2 === 0,
        '-rotate-1': index % 2 !== 0,
      },
    ]"
  >
    <div class="rounded-2xl bg-gradient-to-tr from-surface-primary to-secondary p-0.5">
      <figure class="flex flex-col gap-6 rounded-2xl bg-gray-50 dark:bg-surface-primary-dark p-8 text-sm leading-6">
        <blockquote class="text-primary dark:text-primary-dark">
          <p>“{{ testimonial.content }}”</p>
        </blockquote>

        <figcaption>
          <a :href="testimonial.url" class="flex items-center gap-x-4" target="_blank">
            <img
              :src="`/testimonials/${testimonial.avatar}`"
              :alt="testimonial.name"
              class="size-12 rounded-full bg-gray-50 p-0.5 bg-gradient-to-tr from-surface-primary to-secondary"
              loading="lazy"
            />

            <div>
              <div class="font-bold text-primary dark:text-primary-dark">{{ testimonial.author }}</div>

              <div class="text-gray-500 dark:text-gray-400">{{ testimonial.job }}</div>
            </div>
          </a>
        </figcaption>
      </figure>
    </div>
  </div>
</template>

<script setup>
defineProps({
  testimonial: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
})
</script>

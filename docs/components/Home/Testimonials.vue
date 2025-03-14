<template>
  <div class="pt-16 mx-auto max-w-6xl px-4 text-center">
    <div class="inline-flex rounded-full p-0.5 -rotate-2 bg-gradient-to-tr from-surface-primary to-secondary">
      <h2
        class="bg-white dark:bg-slate-800 relative rounded-full px-3 py-1 text-sm leading-6 text-primary dark:text-text-secondary-dark backdrop-blur-sm"
      >
        Testimonials
      </h2>
    </div>

    <p class="text-4xl font-bold leading-8 tracking-tight text-primary dark:text-primary-dark mt-2">
      See what other developers are saying about it!
    </p>

    <div class="text-left mt-8">
      <div class="sm:-mx-4 sm:columns-2 lg:columns-3">
        <Testimonial
          v-for="(testimonial, index) in testimonials"
          :key="testimonial.author"
          :testimonial="testimonial"
          :index="index"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import Testimonial from "@/components/Home/Testimonial.vue"

const testimonials = [
  {
    author: "Guillaume Briday",
    content:
      "All controllers originate from real-world applications that addressed common problems faced by nearly everyone.",
    avatar: "guillaumebriday.jpg",
    url: "https://x.com/guillaumebriday",
    job: "Creator of Stimulus Components",
  },
  {
    author: "Matt Polito",
    content:
      "They’re lightweight, can be pulled in individually and solve a problem… it would be a disservice to our clients NOT to use them.",
    avatar: "mattpolito.jpg",
    url: "https://x.com/mattpolito",
    job: "Senior Engineer at Hashrocket",
  },
  {
    author: "Avi Flombaum",
    content:
      "Stimulus Components are indispensable libraries for common UI patterns that are expertly developed and maintained.",
    avatar: "aviflombaum.jpg",
    url: "https://x.com/aviflombaum",
    job: "Co-founder of Flatiron School",
  },
  {
    author: "Ryan Weaver",
    content: "High-quality, pre-made stimulus controllers that solve my most common problems? I’m in love!",
    avatar: "weaverryan.jpg",
    url: "https://x.com/weaverryan",
    job: "Writer for SymfonyCasts & Symfony core member",
  },
  {
    author: "Mike Holford",
    content:
      "Just used my first component today for https://urbanhunt.co 🎉 Super easy to integrate and got nested forms working in 10 minutes. Thanks!",
    avatar: "holfyio.jpg",
    url: "https://x.com/holfyio",
    job: "Developer / Maker",
  },
  {
    author: "Adrian Marin",
    content:
      "From time to time I need to apply a common pattern that I haven't yet built with Stimulus. Stimulus Components has it already! The components are polished, easy to implement, and the docs are great!",
    avatar: "adrianthedev.jpg",
    url: "https://x.com/adrianthedev",
    job: "Creator of @avo_hq",
  },
  {
    author: "Adrian Siami",
    content:
      "Inspiring and smart stimulus controllers that will get you a head start, a great toolbox for any sensible developer!",
    avatar: "intrepidd.jpg",
    url: "https://x.com/intrepidd",
    job: "Open source contributor",
  },
  {
    author: "Laurent Buffevant",
    content:
      "Stimulus Components has become an essential tool in our daily workflow. Its ease of use, adaptability, and pre-built features save us time while enabling us to deliver outstanding interactivity for our clients.",
    avatar: "studiohb.jpg",
    url: "https://www.studio-hb.com/",
    job: "Co-founder of Studio HB",
  },
  {
    author: "Cyril Blaecke",
    content:
      "Why reinvent the wheel? Stimulus Components are time saving and easy to integrate. We use them in almost all of our Rails projects at Dilolabs.",
    avatar: "cbldev.jpg",
    url: "https://cbl.dev/",
    job: "Founder of Dilolabs",
  },
  {
    author: "Yaroslav Shmarov",
    content: "Don't reinvent the wheel. Use Stimulus Components. I use them in all my projects.",
    avatar: "yarotheslav.jpg",
    url: "https://x.com/yarotheslav",
    job: "Founder of SupeRails.com",
  },
]
</script>

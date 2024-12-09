<template>
  <NuxtLink
    :href="href"
    :target="target"
    :class="[
      'z-20 inline-flex items-center justify-center gap-1 px-8 py-3 rounded-xl text-base font-medium md:py-4 md:text-lg md:px-10',
      variantClasses,
    ]"
  >
    <slot />

    <div :class="['size-3 rounded-full ml-3', dotClasses]"></div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: "primary",
  },
  href: {
    type: String,
    required: false,
    default: null,
  },
  target: {
    type: String,
    required: false,
    default: null,
  },
})

const variantClasses = computed(() => {
  return {
    "bg-primary text-white transition hover:-rotate-1": props.variant === "primary",
    "bg-secondary text-primary transition hover:-rotate-1": props.variant === "secondary",
    "bg-tertiary text-primary transition hover:-rotate-1": props.variant === "tertiary",
  }
})

const dotClasses = computed(() => {
  return {
    "bg-tertiary": props.variant === "primary",
    "bg-white": props.variant === "secondary" || props.variant === "tertiary",
  }
})
</script>

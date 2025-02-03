<template>
  <Block title="Glow">
    <div data-controller="glow" class="relative glow-capture">
      <div
        data-glow-target="child"
        class="glow glow:ring-1 glow:border-glow glow:ring-glow glow:bg-glow/[.15] border-4 border-gray-400 rounded-lg bg-gray-900"
      >
        <div class="grid grid-cols-6 gap-2 place-items-center">
          <div class="col-span-3 p-8">
            <h2 class="font-bold text-2xl mb-4 text-gray-200 glow:text-glow/[.8]">Chicken Shawarma & Veggies</h2>

            <p class="text-sm text-gray-300 glow:text-glow">Vitae ducimus harum earum ratione autem esse ea!</p>

            <button
              class="flex gap-3 items-center px-10 py-3 mt-10 mb-5 text-gray-200 whitespace-nowrap bg-gray-800 rounded-xl border transition-colors border-border hover:text-text-primary glow:text-glow glow:border-glow glow:ring glow:ring-glow"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                ></path></svg
              ><span>Add to cart</span>
            </button>
          </div>

          <div class="col-span-3 -mt-5 -mb-10">
            <img class="h-[350px] object-cover object-left" src="/bowl.png" lazy="loading" />
          </div>
        </div>
      </div>

      <div data-glow-target="overlay" class="glow-overlay" style="--glow-color: #d0cefd"></div>
    </div>
  </Block>
</template>

<script setup>
import Block from "@/components/UI/Block.vue"
</script>

<style>
.glow-overlay {
  --glow-size: 25rem; /* Change the size of the glow effect here */

  position: absolute;
  inset: 0;
  pointer-events: none;
  user-select: none;
  opacity: var(--glow-opacity, 0);
  mask: radial-gradient(
    var(--glow-size) var(--glow-size) at var(--glow-x) var(--glow-y),
    var(--glow-color) 1%,
    transparent 50%
  );
  transition: 400ms mask ease;
  will-change: mask;
}
</style>

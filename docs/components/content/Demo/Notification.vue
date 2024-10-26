<template>
  <Block title="Notification">
    <p>Reload to re-run the animation.</p>

    <div
      data-controller="notification"
      class="transition transform duration-1000 absolute inset-0 hidden flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end z-50"
      data-transition-enter-from="opacity-0 translate-x-6"
      data-transition-enter-to="opacity-100 translate-x-0"
      data-transition-leave-from="opacity-100 translate-x-0"
      data-transition-leave-to="opacity-0 translate-x-6"
    >
      <div class="max-w-sm w-full bg-white shadow-lg pointer-events-auto rounded-lg shadow-xs overflow-hidden p-4">
        <div class="flex items-start">
          <svg
            class="size-6 text-green-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <div class="ml-3 w-0 flex-1 pt-0.5">
            <p class="text-sm font-medium text-gray-900">This alert will magically disappear!</p>
            <p class="mt-1 text-sm text-gray-500">Pretty cool, huh?</p>
          </div>

          <div class="ml-4 flex-shrink-0 flex">
            <button
              data-action="notification#hide"
              class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              <span class="sr-only">Close</span>
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Block>
</template>

<script setup>
import Block from "@/components/UI/Block.vue"
</script>

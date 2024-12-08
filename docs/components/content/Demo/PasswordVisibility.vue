<template>
  <Block title="Password Visibility">
    <div data-controller="password-visibility">
      <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <input
          id="password"
          type="password"
          name="password"
          class="focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 pr-10 sm:text-sm border border-gray-300 rounded-md"
          placeholder="Your password"
          value="my-super-secret-password"
          data-password-visibility-target="input"
        />

        <button
          data-action="password-visibility#toggle"
          type="button"
          class="text-gray-500 absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
        >
          <!-- Heroicon name: outline/eye -->
          <svg
            data-password-visibility-target="icon"
            xmlns="http://www.w3.org/2000/svg"
            class="size-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>

          <!-- Heroicon name: outline/eye-off -->
          <svg
            data-password-visibility-target="icon"
            xmlns="http://www.w3.org/2000/svg"
            class="hidden size-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
            />
          </svg>
        </button>
      </div>
    </div>
  </Block>
</template>

<script setup>
import Block from "@/components/UI/Block.vue"
</script>

<style>
.line-clamp {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: var(--read-more-line-clamp, 2);
}
</style>

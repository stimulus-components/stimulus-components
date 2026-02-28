<template>
  <Block title="Hotkey">
    <div class="space-y-8">
      <div>
        <p class="mb-2 text-sm text-slate-600 dark:text-slate-400">
          Press
          <kbd
            class="rounded border border-slate-300 bg-slate-100 px-1.5 py-0.5 font-mono text-sm dark:border-slate-600 dark:bg-slate-700"
            >g</kbd
          >
          to click the link.
        </p>
        <a
          href="/docs"
          data-controller="hotkey"
          data-action="keydown.g@document->hotkey#click"
          class="inline-block rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          Go to docs (g)
        </a>
      </div>

      <div>
        <p class="mb-2 text-sm text-slate-600 dark:text-slate-400">
          Press
          <kbd
            class="rounded border border-slate-300 bg-slate-100 px-1.5 py-0.5 font-mono text-sm dark:border-slate-600 dark:bg-slate-700"
            >j</kbd
          >
          to click the button
        </p>
        <button
          type="button"
          data-controller="hotkey"
          data-action="keydown.j@document->hotkey#click"
          class="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          @click="count++"
        >
          Submit - {{ count }}
        </button>
      </div>

      <div>
        <p class="mb-2 text-sm text-slate-600 dark:text-slate-400">
          Press
          <kbd
            class="rounded border border-slate-300 bg-slate-100 px-1.5 py-0.5 font-mono text-sm dark:border-slate-600 dark:bg-slate-700"
            >k</kbd
          >
          to focus the text input.
        </p>
        <input
          type="text"
          data-controller="hotkey"
          data-action="keydown.k@document->hotkey#focus"
          placeholder="Focus target (k)"
          class="w-full max-w-md rounded-md border border-slate-300 px-3 py-2 text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
        />
      </div>
    </div>
  </Block>
</template>

<script setup>
import Block from "@/components/UI/Block.vue"

const count = ref(0)
</script>

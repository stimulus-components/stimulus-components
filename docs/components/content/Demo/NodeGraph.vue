<template>
  <Block title="Node Graph">
    <div class="overflow-x-auto">
      <div
        class="relative inline-flex items-center gap-12 text-slate-300 dark:text-slate-600"
        data-controller="node-graph"
      >
        <svg class="pointer-events-none absolute inset-0 h-full w-full" data-node-graph-target="canvas"></svg>

        <div class="flex flex-col gap-3">
          <div
            class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm whitespace-nowrap text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            data-node-graph-target="node"
            data-node-graph-key="suppliers"
          >
            Suppliers
          </div>
        </div>

        <div class="flex flex-col gap-3">
          <div
            class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm whitespace-nowrap text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            data-node-graph-target="node"
            data-node-graph-key="spend-q1"
            data-node-graph-depends-on="suppliers"
          >
            Spend Q1
          </div>

          <div
            class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm whitespace-nowrap text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            data-node-graph-target="node"
            data-node-graph-key="spend-q2"
            data-node-graph-depends-on="suppliers"
          >
            Spend Q2
          </div>
        </div>

        <div class="flex flex-col gap-3">
          <div
            class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm whitespace-nowrap text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            data-node-graph-target="node"
            data-node-graph-key="savings"
            data-node-graph-depends-on="spend-q1 spend-q2"
          >
            Savings report
          </div>
        </div>
      </div>
    </div>

    <h2 class="mt-8 mb-2 text-xl">Vertical, with a thicker stroke</h2>

    <div
      class="relative inline-flex flex-col items-center gap-12 text-yellow-500/60"
      data-controller="node-graph"
      data-node-graph-orientation-value="vertical"
      data-node-graph-stroke-width-value="2"
    >
      <svg class="pointer-events-none absolute inset-0 h-full w-full" data-node-graph-target="canvas"></svg>

      <div
        class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm whitespace-nowrap text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        data-node-graph-target="node"
        data-node-graph-key="form-submitted"
      >
        Form submitted
      </div>

      <div class="flex gap-12">
        <div
          class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm whitespace-nowrap text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          data-node-graph-target="node"
          data-node-graph-key="notify"
          data-node-graph-depends-on="form-submitted"
        >
          Notify the team
        </div>

        <div
          class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm whitespace-nowrap text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          data-node-graph-target="node"
          data-node-graph-key="archive"
          data-node-graph-depends-on="form-submitted"
        >
          Archive
        </div>
      </div>
    </div>
  </Block>
</template>

<script setup>
import Block from "@/components/UI/Block.vue"
</script>

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

    <h2 class="mt-8 mb-2 text-xl">A CI pipeline</h2>

    <p class="mb-4 text-sm text-slate-500 dark:text-slate-400">
      Six stages, a fan-out, a fan-in from three jobs, and one job that waits for two. The connectors into the jobs that
      have not run yet are dashed and flow towards them, from
      <code class="text-xs">data-node-graph-pending</code> on the job.
    </p>

    <div class="overflow-x-auto">
      <div
        class="relative inline-flex items-center gap-8 text-slate-300 dark:text-slate-600"
        data-controller="node-graph"
        data-node-graph-max-reach-value="24"
      >
        <svg class="pointer-events-none absolute inset-0 h-full w-full" data-node-graph-target="canvas"></svg>

        <div v-for="(stage, index) in stages" :key="index" class="flex flex-col gap-3">
          <div
            v-for="job in stage"
            :key="job.key"
            class="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm whitespace-nowrap text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            data-node-graph-target="node"
            :data-node-graph-key="job.key"
            :data-node-graph-depends-on="job.dependsOn"
            :data-node-graph-pending="job.status === 'pending' ? 'true' : null"
          >
            <span class="size-2 shrink-0 rounded-full" :class="statusClasses[job.status]"></span>
            {{ job.label }}
          </div>
        </div>
      </div>
    </div>
  </Block>
</template>

<script setup>
import Block from "@/components/UI/Block.vue"

const statusClasses = {
  passed: "bg-emerald-500",
  running: "bg-yellow-500 animate-pulse",
  pending: "bg-slate-300 dark:bg-slate-600",
}

// One array per stage. `dependsOn` names the keys of the jobs a job waits for, with a space or a comma between them.
const stages = [
  [{ key: "checkout", label: "Checkout", status: "passed" }],
  [{ key: "install", label: "Install deps", status: "passed", dependsOn: "checkout" }],
  [
    { key: "lint", label: "Lint", status: "passed", dependsOn: "install" },
    { key: "types", label: "Type check", status: "passed", dependsOn: "install" },
    { key: "unit", label: "Unit tests", status: "passed", dependsOn: "install" },
  ],
  [{ key: "build", label: "Build", status: "running", dependsOn: "lint types unit" }],
  [
    { key: "e2e", label: "E2E tests", status: "pending", dependsOn: "build" },
    { key: "preview", label: "Preview", status: "pending", dependsOn: "build" },
  ],
  [{ key: "release", label: "Release", status: "pending", dependsOn: "e2e, preview" }],
]
</script>

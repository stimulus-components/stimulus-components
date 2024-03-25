<template>
  <div class="flex flex-col min-h-screen dark:bg-slate-800">
    <Nav />

    <main class="flex px-4 py-8">
      <div class="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-scroll gap-4">
        <div class="hidden md:block border-b md:border-b-0 pb-4 md:pr-4">
          <DocsSidebar />
        </div>

        <div
          class="prose dark:prose-invert max-w-none overflow-x-scroll prose-pre:mt-0 prose-pre:rounded-t-none prose-table:whitespace-nowrap"
        >
          <slot />

          <DocsFooter />
        </div>

        <DocsAltSidebar />
      </div>
    </main>

    <Footer />
  </div>
</template>

<template>
  <div class="flex flex-col min-h-screen dark:bg-slate-800">
    <Nav />

    <main class="px-4 max-w-screen md:grid md:grid-cols-[230px_auto] xl:grid-cols-[260px_auto_200px] xl:gap-8">
      <div class="hidden md:block">
        <DocsSidebar />
      </div>

      <div
        class="md:max-w-[500px] lg:max-w-[700px] xl:max-w-[864px] mx-auto prose dark:prose-invert prose-pre:mt-0 prose-pre:rounded-t-none prose-pre:rounded-b-xl prose-table:whitespace-nowrap"
      >
        <slot />
        <Footer />
      </div>

      <div class="hidden xl:block fixed right-0 top-16 p-4">
        <DocsAltSidebar />
      </div>
    </main>
  </div>
</template>

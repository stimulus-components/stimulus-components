<template>
  <div class="flex flex-col min-h-screen">
    <Nav />

    <main class="flex px-4 py-8">
      <div class="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-scroll gap-4">
        <div class="border-b md:border-b-0 md:border-r pb-4 md:pr-4">
          <DocsSidebar />
        </div>

        <div class="prose max-w-none overflow-scroll">
          <Nuxt />

          <DocsFooter />
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script>
export default {
  name: 'DocsLayout',
}
</script>

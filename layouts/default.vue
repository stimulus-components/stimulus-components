<template>
  <div class="flex flex-col min-h-screen">
    <Nav />

    <main class="flex-1 px-4 py-8">
      <slot />
    </main>

    <Footer />
  </div>
</template>

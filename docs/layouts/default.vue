<template>
  <div class="flex flex-col min-h-screen dark:bg-slate-800">
    <Nav />

    <main class="flex-1">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<template>
  <div>
    <h1>Docs</h1>

    <p>
      You will find in this section the documentation for every single controller of the
      <a href="https://github.com/stimulus-components" target="_blank">Stimulus Components</a>
      library.
    </p>
  </div>
</template>

<script>
export default {
  name: 'Docs',
  layout: 'docs',

  head() {
    return {
      title: 'Docs',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'You will find in this section the documentation for every single controller of the Stimulus Components library.',
        },
      ],
    }
  },
}
</script>

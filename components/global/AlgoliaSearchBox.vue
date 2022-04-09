<template>
  <div ref="docsearch" class="my-auto ml-auto"></div>
</template>

<script>
import docsearch from '@docsearch/js'

export default {
  name: 'AlgoliaSearchBox',

  mounted() {
    docsearch({
      container: this.$refs.docsearch,
      appId: this.$config.algoliaAppId,
      indexName: this.$config.algoliaIndexName,
      apiKey: this.$config.algoliaApiKey,
    })
  },
}
</script>

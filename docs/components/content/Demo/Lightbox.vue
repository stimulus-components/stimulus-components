<template>
  <Block title="Lightbox">
    <div data-controller="lightbox" class="grid gap-4 md:grid-cols-3">
      <a
        href="https://images.unsplash.com/photo-1604042292937-4b2b4781c821?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2081&q=80"
      >
        <img
          src="https://images.unsplash.com/photo-1604042292937-4b2b4781c821?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2081&q=80"
          alt=""
        />
      </a>

      <a
        href="https://images.unsplash.com/photo-1603878662588-5908ad857cd4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1615&q=80"
      >
        <img
          src="https://images.unsplash.com/photo-1603878662588-5908ad857cd4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1615&q=80"
          alt=""
        />
      </a>

      <a
        href="https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
      >
        <img
          src="https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
          alt=""
        />
      </a>
    </div>
  </Block>
</template>

<script setup>
import Block from "@/components/UI/Block.vue"
import "lightgallery/css/lightgallery.css"
</script>

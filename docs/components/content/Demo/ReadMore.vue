<template>
  <Block title="Read More">
    <div
      data-controller="read-more"
      data-read-more-more-text-value="Read more &darr;"
      data-read-more-less-text-value="Read less &uarr;"
    >
      <p class="line-clamp" data-read-more-target="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vehicula elit ut urna imperdiet maximus.
        Praesent quis nisi in velit volutpat consectetur in vitae diam. Nulla auctor nulla sapien, auctor varius est
        vestibulum ut. Morbi ullamcorper est a ipsum fringilla egestas. Vestibulum sed dictum purus. Aliquam dignissim
        pellentesque magna, in tempus tortor sollicitudin sed. Vestibulum dictum mattis lorem, eget sollicitudin felis
        elementum in. In ut quam mi. Fusce ac ultrices mauris. Class aptent taciti sociosqu ad litora torquent per
        conubia nostra, per inceptos himenaeos. Fusce nec erat in ex efficitur faucibus a ac nunc. Duis dui ex, blandit
        ut sem in, finibus tempor magna. Vivamus iaculis ante ut ex dapibus, id convallis tellus tristique. Maecenas et
        felis urna. Proin nec ipsum ac felis bibendum pretium. Curabitur nec suscipit tellus. Morbi hendrerit placerat
        tellus vel laoreet. Nulla nec nibh ligula. In commodo semper scelerisque. Vestibulum ante ipsum primis in
        faucibus orci luctus et ultrices posuere cubilia curae; Nam vulputate gravida sapien non aliquam. Nullam semper
        nibh justo, at varius orci facilisis id. Maecenas lacinia massa ut gravida tristique. Quisque tincidunt tellus
        et tempus interdum. Sed volutpat iaculis gravida. Vivamus faucibus urna ut malesuada ullamcorper. Aliquam
        lobortis velit dolor, in dapibus nibh viverra quis.
      </p>

      <button type="button" class="text-yellow-600" data-action="read-more#toggle">Read more &darr;</button>
    </div>
  </Block>
</template>

<script setup>
import Block from "@/components/UI/Block.vue"
</script>

<style>
.line-clamp {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: var(--read-more-line-clamp, 2);
}
</style>

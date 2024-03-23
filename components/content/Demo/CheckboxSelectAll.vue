<template>
  <Block title="Checkbox Select All">
    <form data-controller="checkbox-select-all" class="dark:text-gray-300">
      <table>
        <tbody>
          <tr>
            <td class="block">
              <label>
                <input id="checkbox-select-all" type="checkbox" data-checkbox-select-all-target="checkboxAll" />
                <span class="ml-2">Select All / Deselect All</span>
              </label>
            </td>

            <td v-for="index in [...Array(3).keys()]" :key="index" class="block">
              <label>
                <input type="checkbox" data-checkbox-select-all-target="checkbox" />
                <span class="ml-2">Team {{ index + 1 }}</span>
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </Block>
</template>

<script setup>
import Block from '@/components/UI/Block.vue'
</script>

<template>
  <Block title="Checkbox Select All">
    <form
      data-controller="checkbox-select-all"
      data-checkbox-select-all-checked-text-value="Unselect all"
      data-checkbox-select-all-unchecked-text-value="Select all"
      class="dark:text-gray-300"
    >
      <table>
        <tbody>
          <tr>
            <td class="block">
              <label>
                <input id="checkbox-select-all" type="checkbox" data-checkbox-select-all-target="checkboxAll" />
                <span data-checkbox-select-all-target="label" class="ml-2">Select all</span>
              </label>
            </td>

            <td v-for="index in [...Array(3).keys()]" :key="index" class="block">
              <label>
                <input type="checkbox" data-checkbox-select-all-target="checkbox" :checked="index === 1" />
                <span class="ml-2">Team {{ index + 1 }}</span>
              </label>
            </td>
          </tr>
        </tbody>
      </table>

      <p class="mt-4 text-sm text-gray-600 dark:text-gray-400">
        This example opts into the optional label target. Remove the label target and text values to keep the select-all
        behavior without changing the label text.
      </p>
    </form>
  </Block>
</template>

<script setup>
import Block from "@/components/UI/Block.vue"
</script>

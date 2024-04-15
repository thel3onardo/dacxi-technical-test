<script setup lang="ts">
const model = defineModel()

const updateModel = (event: Event) => {
  model.value = (event.target as HTMLInputElement).value
}
</script>

<template>
  <form class="flex flex-col gap-y-1">
    <label class="text-sm font-medium text-light">Specify Date</label>

    <input
      type="date"
      placeholder="Insert a date"
      class="bg-transparent border border-[#D9D9D9]/10 p-2 rounded-lg text-light/80 text-sm min-w-[10rem]"
      inputmode="numeric"
      @input="updateModel"
    />
  </form>
</template>

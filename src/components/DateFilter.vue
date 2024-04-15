<script lang="ts" setup>
import { ref, watch } from 'vue'
import InputDate from './ui/InputDate.vue'
import Button from './ui/Button.vue'
import { formatDate } from '@/util/formatDate'

const emit = defineEmits(['apply'])
const dateValue = ref('')

const emitApply = () => {
  emit('apply', formatDate(dateValue.value))
}

watch(dateValue, (newValue) => {
  console.log('dateValue from parent', newValue)
})
</script>

<template>
  <div class="flex gap-x-3 items-end">
    <InputDate v-model="dateValue" />
    <Button @click="emitApply" variant="primary">Apply</Button>
  </div>
</template>

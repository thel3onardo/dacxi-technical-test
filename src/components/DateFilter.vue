<script lang="ts" setup>
import { ref } from 'vue'
import { formatDate } from '@/util/formatDate'

import InputDate from './ui/InputDate.vue'
import Button from './ui/Button.vue'

const emit = defineEmits(['apply'])
const dateValue = ref('')
const showValidationError = ref(false)

const emitApply = () => {
  if (!dateValue.value) {
    showValidationError.value = true
    return
  }

  showValidationError.value = false
  emit('apply', formatDate(dateValue.value))
}
</script>

<template>
  <div class="flex flex-col relative">
    <div class="flex gap-x-3 items-end">
      <InputDate v-model="dateValue" />
      <Button @click="emitApply" variant="primary">Apply</Button>
    </div>
    <p v-if="showValidationError" class="text-red-400 text-xs mt-1 absolute top-full">
      Invalid date
    </p>
  </div>
</template>

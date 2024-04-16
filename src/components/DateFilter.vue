<script lang="ts" setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { formatDate } from '@/util/formatDate'

import InputDate from './ui/InputDate.vue'
import Button from './ui/Button.vue'
import { useCoinStore } from '@/stores/coin'

const coinStore = useCoinStore()
const emit = defineEmits(['apply'])
const dateValue = ref('')
const showValidationError = ref(false)

const resetState = async () => {
  dateValue.value = ''
  showValidationError.value = false

  coinStore.resetDateFilter()

  // revalidate state to prevent layout flickering
  await coinStore.fetchAndSetData(coinStore.currentCoin?.id)
}

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
  <div class="flex flex-col relative w-full md:w-auto px-2">
    <div class="flex gap-3 items-end flex-col md:flex-row w-full md:w-auto">
      <InputDate v-model="dateValue" class="w-full" />

      <div class="flex gap-x-3 w-full">
        <Button v-if="dateValue" @click="resetState" variant="default" class="w-full md:w-auto">
          <Icon icon="ph:x" class="text-2xl" />
        </Button>
        <Button @click="emitApply" variant="primary" class="w-full md:w-auto">Apply</Button>
      </div>
    </div>
    <p v-if="showValidationError" class="text-red-400 text-xs mt-1 absolute top-full">
      Invalid date
    </p>
  </div>
</template>

<script setup lang="ts">
import { capitalizeWord } from '@/util/capitalizeWord'
import { COINS } from '@/constants/coins'
import { onMounted, ref } from 'vue'

import CurrentCoinCard from '@/components/CurrentCoinCard.vue'
import BaseLayout from '@/components/layout/BaseLayout.vue'
import Button from '@/components/ui/Button.vue'

import Card from '@/components/ui/Card.vue'
import DateFilter from '@/components/DateFilter.vue'
import { useCoinStore } from '@/stores/coin'

const coinStore = useCoinStore()
const dateSelected = ref<Date | string>()

const setDateAndFetch = (dateFormatted: string) => {
  //Expected input date in format 'DD-MM-YYYY'
  coinStore.setDateFilter(dateFormatted)

  return coinStore.fetchAndSetData(coinStore.currentCoin?.id)
}

onMounted(async () => {
  await coinStore.fetchAndSetData('bitcoin')
})
</script>

<template>
  <BaseLayout>
    <div class="flex justify-between items-end w-full mb-8">
      <ul class="gap-x-4 flex items-center">
        <li v-for="coin in COINS" :key="coin">
          <Button
            @click="coinStore.fetchAndSetData(coin)"
            :variant="coinStore.currentCoin?.id === coin ? 'primary' : 'default'"
            >{{ capitalizeWord(coin) }}</Button
          >
        </li>
      </ul>
      <DateFilter @apply="setDateAndFetch" />
    </div>

    <h2 class="text-2xl text-light font-semibold mb-8">
      Showing results for <span class="text-primary">{{ dateSelected ?? 'Today' }}</span>
    </h2>

    <template v-if="coinStore.fetchFailed">
      <Card class="flex justify-center w-full text-light">
        <p class="font-semibold">An error ocurred. Please try again later!</p>
      </Card>
    </template>
    <template v-else>
      <CurrentCoinCard />
    </template>
  </BaseLayout>
</template>

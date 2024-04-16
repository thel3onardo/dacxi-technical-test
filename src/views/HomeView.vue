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
  <BaseLayout class="px-8">
    <div
      class="flex justify-between flex-col items-center gap-y-8 md:items-end md:flex-row w-full max-w-[300px] md:max-w-none mx-auto md:mx-0 mb-8"
    >
      <ul
        class="gap-x-4 flex flex-col md:flex-row items-center gap-y-6 md:gap-y-0 w-full md:w-auto"
      >
        <li v-for="coin in COINS" :key="coin" class="w-full">
          <Button
            @click="coinStore.fetchAndSetData(coin)"
            class="w-full md:w-auto"
            :variant="coinStore.currentCoin?.id === coin ? 'primary' : 'default'"
            block
            >{{ capitalizeWord(coin) }}</Button
          >
        </li>
      </ul>
      <DateFilter @apply="setDateAndFetch" />
    </div>

    <h2 class="text-2xl text-light font-semibold mb-8 text-center md:text-start">
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

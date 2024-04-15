<script setup lang="ts">
import { toast } from 'vue-sonner'
import { capitalizeWord } from '@/util/capitalizeWord'
import { COINS } from '@/constants/coins'
import { onMounted, ref } from 'vue'
import { fetchCoinData } from '@/services'

import CurrentCoinCard from '@/components/CurrentCoinCard.vue'
import BaseLayout from '@/components/layout/BaseLayout.vue'
import Button from '@/components/ui/Button.vue'

import Card from '@/components/ui/Card.vue'
import DateFilter from '@/components/DateFilter.vue'

const currentCoin = ref()
const dateSelected = ref<Date | string>()
const loading = ref(false)
const fetchError = ref(false)

type CurrentCoin = {
  id: string
  name: string
  symbol: string
  price: {
    current: number
    higherPriceLastDay: number
    lowestPriceLastDay: number
    changeInPercentageLastDay: number
  }
  logo: {
    url: string
  }
}

const setCurrentCoin = (coin: CurrentCoin) => {
  currentCoin.value = coin
}

const fetchAndSetData = async (coinName: any, filterDate: string = '') => {
  try {
    loading.value = true

    const res = await fetchCoinData({ name: coinName, filterDate })
    const data = await res.json()

    if (res.status === 200 && data) {
      fetchError.value = false

      return setCurrentCoin({
        id: data.id,
        name: data.name,
        symbol: data.symbol,
        price: {
          current: data.market_data?.current_price?.usd,
          higherPriceLastDay: data.market_data?.high_24h?.usd,
          lowestPriceLastDay: data.market_data?.low_24h?.usd,
          changeInPercentageLastDay: data.market_data?.price_change_percentage_24h
        },
        logo: {
          url: data.image?.large
        }
      })
    }

    throw Error()
  } catch (err) {
    fetchError.value = true
    toast.error('Failed to load data. Please, try again.')
  } finally {
    loading.value = false
  }
}

const setDateAndFetch = (dateFormatted: string) => {
  //Expected input date in format 'DD-MM-YYYY'
  dateSelected.value = dateFormatted

  return fetchAndSetData(currentCoin.value.id, dateSelected.value)
}

onMounted(async () => {
  await fetchAndSetData('bitcoin')
})
</script>

<template>
  <BaseLayout>
    <div class="flex justify-between items-end w-full mb-8">
      <ul class="gap-x-4 flex items-center">
        <li v-for="coin in COINS" :key="coin">
          <Button
            @click="fetchAndSetData(coin)"
            :variant="currentCoin?.id === coin ? 'primary' : 'default'"
            >{{ capitalizeWord(coin) }}</Button
          >
        </li>
      </ul>
      <DateFilter @apply="setDateAndFetch" />
    </div>

    <h2 class="text-2xl text-light font-semibold mb-4">Showing results for Today</h2>

    <template v-if="fetchError">
      <Card class="flex justify-center w-full text-light">
        <p class="font-semibold">An error ocurred. Please try again later!</p>
      </Card>
    </template>
    <template v-else>
      <CurrentCoinCard
        :price="{
          current: currentCoin?.price.current,
          higherPriceLastDay: currentCoin?.price.higherPriceLastDay,
          lowestPriceLastDay: currentCoin?.price.lowestPriceLastDay,
          changeInPercentageLastDay: currentCoin?.price.changeInPercentageLastDay
        }"
        :name="currentCoin?.name"
        :symbol="currentCoin?.symbol"
        :logo="{
          alt: 'ff',
          url: currentCoin?.logo?.url
        }"
        :loading="loading"
      />
    </template>
  </BaseLayout>
</template>

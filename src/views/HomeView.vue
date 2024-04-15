<script setup lang="ts">
import CurrentCoinCard from '@/components/CurrentCoinCard.vue'
import BaseLayout from '@/components/layout/BaseLayout.vue'
import Button from '@/components/ui/Button.vue'

import { toast } from 'vue-sonner'
import { capitalizeWord } from '@/util/capitalizeWord'
import { COINS } from '@/constants/coins'
import { onMounted, ref } from 'vue'
import { fetchCoinData } from '@/services'

const currentCoin = ref()
const loading = ref(false)

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

const fetchAndSetData = async (coinName: any) => {
  try {
    loading.value = true

    const res = await fetchCoinData(coinName)
    const data = await res.json()

    if (res.status === 200 && data) {
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
  } catch (err) {
    toast.error('Failed to load data. Please, try again.')
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await fetchAndSetData('bitcoin')
})
</script>

<template>
  <BaseLayout>
    <div class="flex justify-between w-full mb-6">
      <ul class="gap-x-4 flex">
        <li v-for="coin in COINS" :key="coin">
          <Button
            @click="fetchAndSetData(coin)"
            :variant="currentCoin?.id === coin ? 'primary' : 'default'"
            >{{ capitalizeWord(coin) }}</Button
          >
        </li>
      </ul>
    </div>
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
  </BaseLayout>
</template>

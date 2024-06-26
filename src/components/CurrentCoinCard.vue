<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import Card from './ui/Card.vue'
import Spinner from './ui/Spinner.vue'
import { useCoinStore } from '@/stores/coin'
import { computed } from 'vue'

const coinStore = useCoinStore()
const isHistory = computed(() => Boolean(coinStore.filterDate))

const formatPercentage = (percentageValue: number) => {
  return percentageValue?.toFixed(2) + '%'
}

const isPricePercentagePositive = computed(() => {
  return coinStore.currentCoin?.price.changeInPercentageLastDay > 0
})
</script>

<template>
  <Card class="flex flex-col justify-center gap-y-14 items-center min-h-[270px]">
    <template v-if="coinStore.loading">
      <Spinner />
    </template>
    <template v-else>
      <div class="flex flex-col md:flex-row gap-x-3">
        <div class="w-12 h-12">
          <img
            :src="coinStore.currentCoin?.logo.url"
            :alt="coinStore.currentCoin?.logo.alt"
            class="object-cover"
          />
        </div>
        <h2 class="font-semibold text-5xl text-light self-end">
          {{ coinStore.currentCoin?.name }}
        </h2>
        <span class="text-[#BEBEBE] self-end"
          >({{ coinStore.currentCoin?.symbol?.toUpperCase() }})</span
        >
      </div>

      <div
        class="flex justify-between flex-col items-start md:flex-row md:items-center gap-y-8 md:gap-y-0 w-full"
      >
        <section class="flex flex-col gap-y-2">
          <span class="uppercase text-sm text-[#D9D9D9]/80"
            >{{ isHistory ? 'history' : 'current' }} price</span
          >
          <div class="flex items-start md:items-end flex-col md:flex-row gap-x-4">
            <h4 class="font-semibold text-3xl text-light">
              ${{ Number(coinStore.currentCoin?.price.current) }}
            </h4>
            <div
              v-if="!isHistory"
              :class="`flex items-center ${isPricePercentagePositive ? 'text-green-500' : 'text-red-400'}`"
            >
              <span class="font-medium">{{
                formatPercentage(coinStore.currentCoin?.price.changeInPercentageLastDay)
              }}</span>
              <Icon
                :icon="
                  isPricePercentagePositive ? 'solar:arrow-up-outline' : 'solar:arrow-down-outline'
                "
                class="w-5 h-5"
              />
            </div>
          </div>
        </section>

        <template v-if="!isHistory">
          <section class="flex flex-col gap-y-2">
            <span class="uppercase text-sm text-[#D9D9D9]/80">HIGHER PRICE LAST 24 HOURs</span>
            <div class="flex items-end gap-x-4">
              <h4 class="font-semibold text-3xl text-light">
                ${{ coinStore.currentCoin?.price.higherPriceLastDay }}
              </h4>
            </div>
          </section>

          <section class="flex flex-col gap-y-2">
            <span class="uppercase text-sm text-[#D9D9D9]/80">lowest price last 24 hours</span>
            <div class="flex items-end gap-x-4">
              <h4 class="font-semibold text-3xl text-light">
                ${{ coinStore.currentCoin?.price.lowestPriceLastDay }}
              </h4>
            </div>
          </section>
        </template>
      </div>
    </template>
  </Card>
</template>

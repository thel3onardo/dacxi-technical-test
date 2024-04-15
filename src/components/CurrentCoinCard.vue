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
</script>

<template>
  <Card class="flex flex-col justify-center gap-y-14 items-center">
    <template v-if="coinStore.loading">
      <Spinner />
    </template>
    <template v-else>
      <div class="flex gap-x-3">
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

      <div class="flex items-center justify-between w-full">
        <section class="flex flex-col gap-y-2">
          <span class="uppercase text-sm text-[#D9D9D9]/80">current price</span>
          <div class="flex items-end gap-x-4">
            <h4 class="font-semibold text-3xl text-light">
              ${{ coinStore.currentCoin?.price.current }}
            </h4>
            <div v-if="!isHistory" class="flex items-center text-green-500">
              <span class="font-medium">{{
                formatPercentage(coinStore.currentCoin?.price.changeInPercentageLastDay)
              }}</span>
              <Icon icon="solar:arrow-up-outline" class="w-5 h-5" />
            </div>
          </div>
        </section>

        <section v-if="!isHistory" class="flex flex-col gap-y-2">
          <span class="uppercase text-sm text-[#D9D9D9]/80">HIGHER PRICE LAST 24 HOURs</span>
          <div class="flex items-end gap-x-4">
            <h4 class="font-semibold text-3xl text-light">
              ${{ coinStore.currentCoin?.price.higherPriceLastDay }}
            </h4>
          </div>
        </section>

        <section v-if="!isHistory" class="flex flex-col gap-y-2">
          <span class="uppercase text-sm text-[#D9D9D9]/80">lowest price last 24 hours</span>
          <div class="flex items-end gap-x-4">
            <h4 class="font-semibold text-3xl text-light">
              ${{ coinStore.currentCoin?.price.lowestPriceLastDay }}
            </h4>
          </div>
        </section>
      </div>
    </template>
  </Card>
</template>

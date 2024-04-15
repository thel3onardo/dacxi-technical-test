import { fetchCoinData } from '@/services'
import type { CurrentCoin } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue-sonner'

export const useCoinStore = defineStore('coin', () => {
  const currentCoin = ref()
  const filterDate = ref('')
  const loading = ref(false)
  const fetchFailed = ref(false)

  const resetDateFilter = () => {
    filterDate.value = ''
  }

  const setDateFilter = (dateValue: string) => {
    filterDate.value = dateValue
  }

  const setCurrentCoin = (coin: CurrentCoin) => {
    currentCoin.value = coin
  }

  const fetchAndSetData = async (coinName: any) => {
    try {
      loading.value = true

      const res = await fetchCoinData({ name: coinName, filterDate: filterDate.value })
      const data = await res.json()

      if (res.status === 200 && data) {
        fetchFailed.value = false

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
      fetchFailed.value = true
      toast.error('Failed to load data. Please, try again.')
    } finally {
      loading.value = false
    }
  }

  return {
    currentCoin,
    filterDate,
    loading,
    fetchFailed,
    resetDateFilter,
    fetchAndSetData,
    setDateFilter
  }
})

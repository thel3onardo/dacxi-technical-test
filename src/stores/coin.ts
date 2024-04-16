import { fetchCoinData } from '@/services'
import type { CoinName, CurrentCoin } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue-sonner'

export const useCoinStore = defineStore('coin', () => {
  const currentCoin = ref()
  const filterDate = ref('')
  const loading = ref(false)
  const fetchFailed = ref(false)
  const fetchTimeout = ref()

  const resetDateFilter = () => {
    filterDate.value = ''
  }

  const setDateFilter = (dateValue: string) => {
    filterDate.value = dateValue
  }

  const setCurrentCoin = (coin: CurrentCoin) => {
    currentCoin.value = coin
  }

  const fetchAndSetData = async (coinName: CoinName) => {
    if (fetchTimeout.value) clearTimeout(fetchTimeout.value)

    try {
      loading.value = true

      const res = await fetchCoinData({ name: coinName, filterDate: filterDate.value })
      const data = await res.json()

      if (res.status === 200 && data) {
        fetchFailed.value = false

        fetchTimeout.value = setTimeout(() => {
          fetchAndSetData(coinName)
        }, 30000)

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

      throw new Error('Failed to load data')
    } catch (err: any) {
      fetchFailed.value = true

      if (err.status === 429) {
        return toast.error('Too many requests. Please, try again later.')
      }

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

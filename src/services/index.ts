import { API_URL } from '@/constants/api'
import type { COINS } from '@/constants/coins'

type CoinName = keyof typeof COINS

export const fetchCoinData = async (name: CoinName) => {
  return fetch(`${API_URL}/coinsqwdqw/${name?.toLowerCase()}`, { mode: 'cors' })
}

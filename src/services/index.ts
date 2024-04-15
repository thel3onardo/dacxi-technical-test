import { API_URL } from '@/constants/api'
import type { COINS } from '@/constants/coins'

type CoinName = keyof typeof COINS
type FetchCoinArgs = {
  name: CoinName
  filterDate: string
}

export const fetchCoinData = async ({ name, filterDate }: FetchCoinArgs) => {
  const coinNameFormatted = name?.toLowerCase()
  const filterDateParams = filterDate ? `/history?date=${filterDate}` : ''

  const url = `${API_URL}/coins/${coinNameFormatted}${filterDateParams}`

  return fetch(url, { mode: 'cors' })
}

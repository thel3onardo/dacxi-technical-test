import type { COINS } from '@/constants/coins'

export type CurrentCoin = {
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

export type CoinName = keyof typeof COINS | (typeof COINS)[keyof typeof COINS]

export type FetchCoinArgs = {
  name: CoinName
  filterDate: string
}

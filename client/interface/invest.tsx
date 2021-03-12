export interface InvestInfo {
  leverage: number
  indexYear: [number]
  asset: [number]
}

export interface retireInfo {
  keepAssetYear: number
  liveOnAge: number
  totalAsset: number
}

export interface responseSaving {
  leverage: number
  indexYear: [number]
  asset: [number]
}

export interface chartInfo {
  name: string
  notRetureRate: number
  fixedDeposit: number
  bondFund: number
  equityFund: number
  etfFundAndStock: number
}

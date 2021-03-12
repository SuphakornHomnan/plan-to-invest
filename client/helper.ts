export function setData (listResponse) {
  const result: {
    name: string
    notRetureRate: number
    fixedDeposit: number
    bondFund: number
    equityFund: number
    etfFundAndStock: number
  }[] = []
  for (let i = 0; i < listResponse[0].indexYear.length; i++) {
    result.push({
      name: listResponse[0].indexYear[i] + ' Years',
      notRetureRate: listResponse[0].asset[i],
      fixedDeposit: listResponse[1].asset[i],
      bondFund: listResponse[2].asset[i],
      equityFund: listResponse[3].asset[i],
      etfFundAndStock: listResponse[4].asset[i]
    })
  }
  return result
}

import React, { useEffect } from 'react'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts'
import { useRouter } from 'next/router'
import api from '../../../api'

const data = [
  {
    name: '1 Years',
    notRetureRate: 120000,
    fixedDeposit: 121500,
    bondFund: 124200,
    equityFund: 127200,
    etfFundAndStock: 132000,
  },
  {
    name: '5 Years',
    notRetureRate: 600000,
    fixedDeposit: 622878.56,
    bondFund: 666018.25,
    equityFund: 717038.2,
    etfFundAndStock: 805873.2,
  },
  {
    name: '10 Years',
    notRetureRate: 1200000,
    fixedDeposit: 1285672.5,
    bondFund: 1457039,
    equityFund: 1676597.1,
    etfFundAndStock: 2103740,
  },
  {
    name: '15 Years',
    notRetureRate: 1800000,
    fixedDeposit: 1990939.6,
    bondFund: 2396523.5,
    equityFund: 2960703.5,
    etfFundAndStock: 4193967.5,
  },
  {
    name: '20 Years',
    notRetureRate: 2400000,
    fixedDeposit: 2741401.8,
    bondFund: 3512336.5,
    equityFund: 4679127,
    etfFundAndStock: 7560299.5,
  },
  {
    name: '25 Years',
    notRetureRate: 3000000,
    fixedDeposit: 3539955,
    bondFund: 4837572.5,
    equityFund: 6978765.5,
    etfFundAndStock: 12981811,
  },
  {
    name: '30 Years',
    notRetureRate: 3600000,
    fixedDeposit: 4389681.5,
    bondFund: 6411537,
    equityFund: 10056201,
    etfFundAndStock: 21713208,
  },
]

interface InvestInfo {
  oneYear: number | null
  fiveYear: number | null
  tenYear: number | null
  fifteenYear: number | null
  twentyYear: number | null
  twentyFiveYear: number | null
  thrityYear: number | null
  thrityFiveYear: number | null
  fortyYear: number | null
  leverage: number | null
}

const ResultInvestPlan = () => {
  const router = useRouter()
  const { saving } = router.query
  const value = parseFloat(saving)
  console.log(value)

  const res: {
    oneYear: number
    fiveYear: number
    tenYear: number
    fifteenYear: number
    twentyYear: number
    twentyFiveYear: number
    thrityYear: number
    thrityFiveYear: number
    fortyYear: number
    leverage: number
  }[] = []
  useEffect(async () => {
    try {
      if (value) {
        const res1 = await api.post<InvestInfo>('/saving', {
          value,
          multi: 0,
        })
        res.push(res1.data)
        const res2 = await api.post('/saving', {
          value,
          multi: 1.5,
        })
        res.push(res2.data)
        const res3 = await api.post('/saving', {
          value,
          multi: 3.5,
        })
        res.push(res3.data)
        const res4 = await api.post('/saving', {
          value,
          multi: 6,
        })
        res.push(res4.data)
        const res5 = await api.post('/saving', {
          value,
          multi: 10,
        })
        res.push(res5.data)
        console.log(res)
      }
    } catch (error) {
      alert(error.message)
    }
  }, [value])
  console.log(res)
  return (
    <div className="row">
      <LineChart
        width={900}
        height={600}
        data={data}
        margin={{ top: 10, right: 40, left: 40, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="notRetureRate" stroke="#E3EAA5" />
        <Line type="monotone" dataKey="fixedDeposit" stroke="#F7CAC9" />
        <Line type="monotone" dataKey="bondFund" stroke="#FFF" />
        <Line type="monotone" dataKey="equityFund" stroke="#F5B794" />

        <Line type="monotone" dataKey="etfFundAndStock" stroke="#A05069" />
      </LineChart>
      <div className="section-two-invest">
        <table className="invest-table">
          <thead>
            <tr>
              <th rowSpan={2}>Years</th>
              <th colSpan={5}>Investment</th>
            </tr>
            <tr>
              <th>Keep(0%)</th>
              <th>Fixed deposit(1.25%)</th>
              <th>Bond Fund(3.5%)</th>
              <th>Equity Fund(6%)</th>
              <th>ETF Fund or Stocks(10%)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>5</td>
              <td>1000</td>
              <td>1000</td>
              <td>1000</td>
              <td>1000</td>
              <td>1000</td>
            </tr>
            <tr>
              <td>10</td>
              <td>1000000</td>
              <td>1250000</td>
              <td>1500000</td>
              <td>1750000</td>
              <td>2000000</td>
            </tr>
            <tr>
              <td>15</td>
              <td>1000000</td>
              <td>1250000</td>
              <td>1500000</td>
              <td>1750000</td>
              <td>2000000</td>
            </tr>
            <tr>
              <td>20</td>
              <td>1000000</td>
              <td>1250000</td>
              <td>1500000</td>
              <td>1750000</td>
              <td>2000000</td>
            </tr>
            <tr>
              <td>25</td>
              <td>1000000</td>
              <td>1250000</td>
              <td>1500000</td>
              <td>1750000</td>
              <td>2000000</td>
            </tr>
            <tr>
              <td>30</td>
              <td>1000000</td>
              <td>1250000</td>
              <td>1500000</td>
              <td>1750000</td>
              <td>2000000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ResultInvestPlan

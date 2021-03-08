import React, { useEffect } from 'react'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ReferenceLine,
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

const ResultInvestPlan = () => {
  const router = useRouter()
  const { saving } = router.query
  const value = parseFloat(saving)


  useEffect(async () => {
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
    try {
      res.push(
        await api.post('/saving', {
          value,
          multi: 0,
        })
      )
      res.push(
        await api.post('/saving', {
          value,
          multi: 1.5,
        })
      )
      res.push(
        await api.post('/saving', {
          value,
          multi: 3.5,
        })
      )
      res.push(
        await api.post('/saving', {
          value,
          multi: 6,
        })
      )
      res.push(
        await api.post('/saving', {
          value,
          multi: 10,
        })
      )
      console.log(res)
    } catch (error) {
      alert(error.message)
    }
  }, [])
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
      <div className="section-two-invest">Hi</div>
    </div>
  )
}

export default ResultInvestPlan

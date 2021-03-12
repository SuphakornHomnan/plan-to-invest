/* eslint-disable multiline-ternary */
/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
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
import { InvestInfo } from '../../../interface/invest'
import { setData } from '../../../helper'

const ResultInvestPlan = () => {
  const router = useRouter()
  const { saving } = router.query
  const value = parseFloat(saving)
  const [resList, setRes] = useState([])
  const [data2, setDataState] = useState([])
  const [trigger, setTrigger] = useState(true)

  const res: {
    leverage: number
    indexYear: [number]
    asset: [number]
  }[] = []

  useEffect(() => {
    async function fetchData () {
      try {
        if (value) {
          const res1 = await api.post<InvestInfo>('/saving', {
            value,
            multi: 0,
            year: 25,
          })
          res.push(res1.data)
          const res2 = await api.post<InvestInfo>('/saving', {
            value,
            multi: 1.5,
            year: 25,
          })
          res.push(res2.data)
          const res3 = await api.post<InvestInfo>('/saving', {
            value,
            multi: 3.5,
            year: 25,
          })
          res.push(res3.data)
          const res4 = await api.post<InvestInfo>('/saving', {
            value,
            multi: 6,
            year: 25,
          })
          res.push(res4.data)
          const res5 = await api.post<InvestInfo>('/saving', {
            value,
            multi: 10,
            year: 25,
          })
          res.push(res5.data)
          setRes(res)
        }
      } catch (error) {
        alert(error.message)
      }
    }
    fetchData()
  }, [value])

  useEffect(() => {
    if (trigger) {
      if (resList.length === 5) {
        setDataState(setData(resList))
        setTrigger(false)
      }
    }
  }, [resList])
  console.log(data2)
  return (
    <div className="row">
      <LineChart
        width={900}
        height={600}
        data={data2}
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
        <div className="head-invest-title-table">
          ตารางแสดงเงินเก็บที่ได้จากการลงทุนแบบต่างๆ
        </div>
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
            {data2
              ? data2.map((info) => (
                  <tr key="info.name">
                    <td>{info.name.split(' ')[0]}</td>
                    <td>{info.notRetureRate}</td>
                    <td>{info.fixedDeposit}</td>
                    <td>{info.bondFund}</td>
                    <td>{info.equityFund}</td>
                    <td>{info.etfFundAndStock}</td>
                  </tr>))
              : null}

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ResultInvestPlan

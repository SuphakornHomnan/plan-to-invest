/* eslint-disable no-use-before-define */
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
  const { saving, year } = router.query
  const _saving = parseFloat(saving)
  const _year = parseInt(year)
  const [resList, setRes] = useState([])
  const [data2, setDataState] = useState([])
  const [trigger, setTrigger] = useState(true)
  const listReturn = [0, 1.5, 3.5, 6, 10]
  const res: {
    leverage: number
    indexYear: [number]
    asset: [number]
  }[] = []

  useEffect(() => {
    async function fetchData() {
      try {
        if (_saving) {
          for (let i = 0; i < listReturn.length; i++) {
            const response = await api.post<InvestInfo>('/saving', {
              value: _saving,
              multi: listReturn[i],
              year: _year
            })
            res.push(response.data)
          }
          setRes(res)
        }
      } catch (error) {
        alert(error.message)
      }
    }
    fetchData()
  }, [_saving])

  useEffect(() => {
    if (trigger) {
      if (resList.length === 5) {
        setDataState(setData(resList))
        setTrigger(false)
      }
    }
  }, [resList])
  return (
    <div className="row">
      {data2 !== [] ? (
        <LineChart
          width={800}
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
      ) : null}
      <div className="section-two-invest">
        <div className="head-invest-title-table">
          ตารางแสดงเงินเก็บที่ได้จากการลงทุนแบบต่างๆ
        </div>
        <table className="invest-table">
          <thead>
            <tr>
              <th rowSpan={2} className="color-1 font-invest">จำนวนปี</th>
              <th colSpan={5} className="color-2 font-invest">ผลลัพธ์จากการลงทุน</th>
            </tr>
            <tr>
              <th className="color-3 font-invest">เก็บเฉยๆ(0%)</th>
              <th className="color-4 font-invest">ฝากประจำ(1.25%)</th>
              <th className="color-5 font-invest">กองทุนตราสารหนี้(3.5%)</th>
              <th className="color-6 font-invest">กองทุนรวมหุ้น(6%)</th>
              <th className="color-7 font-invest">กองทุนETF/หุ้น(10%)</th>
            </tr>
          </thead>
          <tbody>
            {data2
              ? data2.map((info) => (
                  <tr key={info.name}>
                    <td className="color-td">{info.name.split(' ')[0]}</td>
                    <td className="color-td">{info.notRetureRate}</td>
                    <td className="color-td">{info.fixedDeposit}</td>
                    <td className="color-td">{info.bondFund}</td>
                    <td className="color-td">{info.equityFund}</td>
                    <td className="color-td">{info.etfFundAndStock}</td>
                  </tr>))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ResultInvestPlan

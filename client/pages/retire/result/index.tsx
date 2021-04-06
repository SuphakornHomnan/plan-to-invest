/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts'
import { useRouter } from 'next/router'
import {
  InvestInfo,
  retireInfo,
  responseSaving,
  chartInfo
} from '../../../interface/invest'
import api from '../../../api'
import { setData } from '../../../helper'

const ResultRetirePlan = () => {
  const router = useRouter()
  const { age, retireAge, dieAge, assetMonth,keepMonth } = router.query
  const _age = parseFloat(age)
  const _retireAge = parseFloat(retireAge)
  const _dieAge = parseFloat(dieAge)
  const _assetMonth = parseFloat(assetMonth)
  const _keepMonth = parseInt(keepMonth)
  const [retireInfo, setRetireInfo] = useState<retireInfo | {}>({})
  const [resList, setRes] = useState([])
  const listReturn = [0, 1.5, 3.5, 6, 10]
  const [data, setDataState] = useState<chartInfo[] | []>([])
  const [trigger, setTrigger] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const preInfo = await api.post('/retire', {
          nowAge: _age,
          retireAge: _retireAge,
          dieAge: _dieAge,
          assetPerMonth: _assetMonth,
        })
        setRetireInfo(preInfo.data)
        const res: responseSaving[] = []
        for (let i = 0; i < listReturn.length; i++) {
          const secondInfo = await api.post<InvestInfo>('/saving', {
            value: _keepMonth,
            multi: listReturn[i],
            year: preInfo.data.keepAssetYear,
          })
          res.push(secondInfo.data)
        }
        setRes(res)
      } catch (error) {
        alert(error.message)
      }
    }
    if (_age && _retireAge && _dieAge && _keepMonth) {
      fetchData()
    }
  }, [_age, _retireAge, _dieAge, _keepMonth])

  useEffect(() => {
    if (trigger) {
      if (resList.length === 5) {
        setDataState(setData(resList))
        setTrigger(false)
      }
    }
  }, [resList])
  return (
    <div className="retire-chart-container">
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
        <ReferenceLine
          y={retireInfo.totalAsset}
          label="เงินเป้าหมายที่ต้องการ"
          stroke="red"
        />
        <Line type="monotone" dataKey="notRetureRate" stroke="#E3EAA5" />
        <Line type="monotone" dataKey="fixedDeposit" stroke="#F7CAC9" />
        <Line type="monotone" dataKey="bondFund" stroke="#FFF" />
        <Line type="monotone" dataKey="equityFund" stroke="#F5B794" />

        <Line type="monotone" dataKey="etfFundAndStock" stroke="#A05069" />
      </LineChart>
      <div className="detail-retire-container">
        <div className="retire-detail-one">
          <p>เหลือเวลาให้หาเงินอีก</p>
          <div className="retire-show-year-one">
            <b className="retire-age-number">{retireInfo.keepAssetYear}</b>
            <p className="retire-age-number-year">ปี</p>
          </div>
        </div>
        <div className="retire-space"></div>
        <div className="retire-detail-two">
          <p className="retire-detail-two">
            ระยะเวลาที่คิดจะใช้ใน
            <br />
            ช่วงเกษียณเป็นเวลา
            <div className="retire-show-year-one">
              <b className="retire-age-number-two">{retireInfo.liveOnAge}</b>
              <p className="retire-age-number-year-two">ปี</p>
            </div>
            คิดว่าจะใช้
            <div className="retire-show-year-one">
              <b className="retire-age-number-two">{_assetMonth}</b>
              <p className="retire-age-number-year-three">บาทต่อเดือน</p>
            </div>
          </p>
        </div>
        <div className="retire-space"></div>
        <div className="retire-detail-three">
          <p>
            เงินที่ต้องการใช้ทั้งหมดในยามเกษียณ
            <div className="retire-show-year-one">
              <b className="retire-age-number-three">{retireInfo.totalAsset}</b>
              <p className="retire-age-number-year-four">บาท</p>
            </div>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ResultRetirePlan

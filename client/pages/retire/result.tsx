import React from 'react'
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
const data = [
  {
    name: '1 Years',
    notRetureRate: 120000,
    fixedDeposit: 121500,
    bondFund: 124200,
    equityFund: 127200,
    etfFundAndStock: 132000
  },
  {
    name: "5 Years",
    notRetureRate: 600000,
    fixedDeposit: 622878.56,
    bondFund: 666018.25,
    equityFund: 717038.2,
    etfFundAndStock: 805873.2
  },
  {
    name: "10 Years",
    notRetureRate: 1200000,
    fixedDeposit: 1285672.5,
    bondFund: 1457039,
    equityFund: 1676597.1,
    etfFundAndStock: 2103740
  },
  {
    name: "15 Years",
    notRetureRate: 1800000,
    fixedDeposit: 1990939.6,
    bondFund: 2396523.5,
    equityFund: 2960703.5,
    etfFundAndStock: 4193967.5
  },
  {
    name: "20 Years",
    notRetureRate: 2400000,
    fixedDeposit: 2741401.8,
    bondFund: 3512336.5,
    equityFund: 4679127,
    etfFundAndStock: 7560299.5
  },
  {
    name: "25 Years",
    notRetureRate: 3000000,
    fixedDeposit: 3539955,
    bondFund: 4837572.5,
    equityFund: 6978765.5,
    etfFundAndStock: 12981811
  },
  {
    name: "30 Years",
    notRetureRate: 3600000,
    fixedDeposit: 4389681.5,
    bondFund: 6411537,
    equityFund: 10056201,
    etfFundAndStock: 21713208
  }
]

function findLengthForData (keepAge : number) {
  if (keepAge === 1) {
    return 1
  } else if (keepAge > 1 && keepAge < 5) {
    return 2
  } else if (keepAge > 5 && keepAge < 10) {
    return 3
  } else if (keepAge > 10 && keepAge < 15) {
    return 4
  } else if (keepAge > 15 && keepAge < 20) {
    return 5
  } else if (keepAge > 20 && keepAge < 25) {
    return 6
  } else if (keepAge > 25 && keepAge < 30) {
    return 7
  } else if (keepAge > 30 && keepAge < 35) {
    return 8
  } else if (keepAge > 35 && keepAge < 40) {
    return 9
  } else if (keepAge > 40 && keepAge < 45) {
    return 10
  } else if (keepAge > 45 && keepAge < 50) {
    return 11
  } else if (keepAge > 50 && keepAge < 55) {
    return 12
  } else {
    return 0
  }
}

const ResultRetirePlan = () => {
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
          <ReferenceLine y={6000000} label="Total Asset" stroke="red" />
          <Line type="monotone" dataKey="notRetureRate" stroke="#E3EAA5" />
          <Line type="monotone" dataKey="fixedDeposit" stroke="#F7CAC9" />
          <Line type="monotone" dataKey="bondFund" stroke="#FFF" />
          <Line type="monotone" dataKey="equityFund" stroke="#F5B794" />

          <Line type="monotone" dataKey="etfFundAndStock" stroke="#A05069" />

        </LineChart>
        <div className="detail-retire-container">
            <div className="retire-detail-one">
                <p>
                    เหลือเวลาให้หาเงินอีก
                </p>
                <div className="retire-show-year-one">
                    <b className="retire-age-number">30</b>
                    <p className="retire-age-number-year">ปี</p>
                </div>
            </div>
            <div className="retire-space">

            </div>
            <div className="retire-detail-two">
                <p className="retire-detail-two">
                    ระยะเวลาที่คิดจะใช้ใน<br />
                    ช่วงเกษียณเป็นเวลา
                    <div className="retire-show-year-one">
                        <b className="retire-age-number-two">30</b>
                        <p className="retire-age-number-year-two">ปี</p>
                    </div>
                    คิดว่าจะใช้
                    <div className="retire-show-year-one">
                        <b className="retire-age-number-two">10000</b>
                        <p className="retire-age-number-year-three">บาทต่อเดือน</p>
                    </div>
                </p>
            </div>
            <div className="retire-space">

            </div>
            <div className="retire-detail-three">
                <p>
                    เงินที่ต้องการใช้ทั้งหมดในยามเกษียณ
                    <div className="retire-show-year-one">
                        <b className="retire-age-number-three">6000000</b>
                        <p className="retire-age-number-year-four">บาท</p>
                    </div>
                </p>
            </div>

        </div>
      </div>

  )
}

export default ResultRetirePlan

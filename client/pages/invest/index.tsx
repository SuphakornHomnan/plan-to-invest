// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import { useRouter } from 'next/router'

const InvestPlan = () => {
  const [saving, setSaving] = useState<string | number>(0)
  const [year, setYear] = useState<number>(0)
  const router = useRouter()
  function enterBtn () {
    if (saving === 0 || year === 0) {
      alert('กรุณาป้อนค่าให้ครบถ้วนก่อน')
    } else {
      router.push(`/invest/result?saving=${saving}&year=${year}`)
    }
  }
  return (
    <div className="container-invest-plan">
      <div className="row between">
        <div className="col">
          <label className="saving-para">เงินที่คิดว่าจะเก็บในแต่ละเดือน</label>
          <input
            className="input-saving"
            type="text"
            placeholder="..."
            onChange={({ target }) => setSaving(target.value)}
          />
        </div>
        <div className="col">
          <label className="saving-para">จำนวนที่ปีที่คาดว่าจะเก็บ</label>
          <input
            className="input-saving"
            type="number"
            placeholder="..."
            onChange={({ target }) => setYear(parseInt(target.value))}
          />
        </div>
      </div>

      <button className="bth-enter" onClick={enterBtn}>
        ยืนยัน
      </button>
    </div>
  )
}

export default InvestPlan

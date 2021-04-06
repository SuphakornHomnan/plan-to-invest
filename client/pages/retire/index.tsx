/* eslint-disable no-use-before-define */
import React, { useState } from 'react'
import { useRouter } from 'next/router'

const RetirePlan = () => {
  const router = useRouter()
  const [age, setAge] = useState<number>(0)
  const [retireAge, setRetireAge] = useState<number>(0)
  const [dieAge, setDieAge] = useState<number>(0)
  const [assetMonth, setAssetMonth] = useState<number>(0)
  const [keepMonth, setKeepMonth] = useState<number>(0)
  function enterBtn () {
    if (age === 0 || retireAge === 0 || dieAge === 0 || assetMonth === 0 || keepMonth === 0) {
      alert('กรุณาป้อนค่าให้ครบถ้วนสมบูรณ์')
    } else {
      router.push(`/retire/result?age=${age}&retireAge=${retireAge}&dieAge=${dieAge}&assetMonth=${assetMonth}&keepMonth=${keepMonth}`)
    }
  }
  return (

      <div className="container-retire-plan">
        <div className="sub-container-retire-form">
          <div className="your-age-container">
            <label className="your-age-label">อายุปัจจุบัน</label>
            <input
              className="your-retire-input"
              type="text"
              placeholder="..."
              onChange={({ target }) => setAge(parseInt(target.value))}
            />
          </div>
          <div className="your-retire-age-container">
            <label className="your-retire-label">อายุที่ต้องการเกีษยณ</label>
            <input
              className="your-retire-input"
              type="text"
              placeholder="..."
              onChange={({ target }) => setRetireAge(parseInt(target.value))}
            />
          </div>
        </div>
        <div className="sub-container2-retire-form">
          <div className="your-die-age-container">
            <label className="your-die-age-label">
              คาดว่าจะใช้ชีวิตได้ถึงอายุ
            </label>
            <input
              className="your-retire-input"
              type="text"
              placeholder="..."
              onChange={({ target }) => setDieAge(parseInt(target.value))}
            />
          </div>
          <div className="your-asset-container">
            <label className="your-asset-label">
              เงินที่คาดว่าจะต้องใช้ในแต่ละเดือนหลังเกีษยณ
            </label>
            <input
              className="your-retire-input"
              type="text"
              placeholder="..."
              onChange={({ target }) => setAssetMonth(parseFloat(target.value))}
            />
          </div>
        </div>
        <div className="your-asset-container w-33">
            <label className="your-asset-label">
              เงินที่จะเก็บในแต่ละเดือน
            </label>
            <input
              className="your-retire-input"
              type="text"
              placeholder="..."
              onChange={({ target }) => setKeepMonth(parseFloat(target.value))}
            />
          </div>
        <div className="retire-enter-position-form">
            <button className="bth-enter-retire-form" onClick={enterBtn}>ยืนยัน</button>
        </div>
      </div>

  )
}

export default RetirePlan

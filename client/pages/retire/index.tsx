import React, { useState } from 'react'
import Link from 'next/link'

const RetirePlan = () => {
  const [age, setAge] = useState<number>(0)
  const [retireAge, setRetireAge] = useState<number>(0)
  const [dieAge, setDieAge] = useState<number>(0)
  const [assetMonth, setAssetMonth] = useState<number>(0)
  return (
    <>
      <div className="container-retire-plan">
        <div className="sub-container-retire-form">
          <div className="your-age-container">
            <label className="your-age-label">Your age now</label>
            <input
              className="your-retire-input"
              type="text"
              placeholder="your age now ..."
              onChange={({ target }) => setAge(parseInt(target.value))}
            />
          </div>
          <div className="your-retire-age-container">
            <label className="your-retire-label">Your retire</label>
            <input
              className="your-retire-input"
              type="text"
              placeholder="your retire age ..."
              onChange={({ target }) => setRetireAge(parseInt(target.value))}
            />
          </div>
        </div>
        <div className="sub-container2-retire-form">
          <div className="your-die-age-container">
            <label className="your-die-age-label">
              Your age that you think to die
            </label>
            <input
              className="your-retire-input"
              type="text"
              placeholder="Your die age ..."
              onChange={({ target }) => setDieAge(parseInt(target.value))}
            />
          </div>
          <div className="your-asset-container">
            <label className="your-asset-label">
              Your asset that you use per month
            </label>
            <input
              className="your-retire-input"
              type="text"
              placeholder="asset per month ..."
              onChange={({ target }) => setAssetMonth(parseFloat(target.value))}
            />
          </div>
        </div>
        <div className="retire-enter-position-form">
          <Link href={`/retire/result?age=${age}&retireAge=${retireAge}&dieAge=${dieAge}&assetMonth=${assetMonth}`} >
            <button className="bth-enter-retire-form">Enter</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default RetirePlan

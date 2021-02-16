import React from 'react'
import '../css/investPlan.css'
const InvestPlan = () => {
  return (
    <>
      <div className="container">
        <label className="saving-para">Your saving per month</label>
        <input className="saving-input" type="text" placeholder="your saving per month ..."/>
        <button className="bth-enter">Enter</button>
      </div>
    </>
  )
}

export default InvestPlan

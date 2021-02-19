import React from 'react'

const InvestPlan = () => {
  return (
    <>
      <div className="container-invest-plan">
        <label className="saving-para">Your saving per month</label>
        <input className="saving-input" type="text" placeholder="your saving per month ..."/>
        <button className="bth-enter">Enter</button>
      </div>
    </>
  )
}

export default InvestPlan

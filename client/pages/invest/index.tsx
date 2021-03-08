// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import Link from 'next/link'

const InvestPlan = () => {
  const [saving, setSaving] = useState(0)
  return (
    <>
      <div className="container-invest-plan">
        <label className="saving-para">Your saving per month</label>
        <input
          className="saving-input"
          type="text"
          placeholder="your saving per month ..."
          onChange={({ target }) => setSaving(parseInt(target.value))}
        />
        <Link href={`/invest/result?saving=${saving}`}>
          <button className="bth-enter">Enter</button>
        </Link>
      </div>
    </>
  )
}

export default InvestPlan

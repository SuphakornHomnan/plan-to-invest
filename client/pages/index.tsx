import React from 'react'
import Link from 'next/link'

const Main = () => {
  return (
    <>
      <h3 className="head-topic">Plan to Invest</h3>
      <div className="container">
        <Link href='/invest'>
          <button className="bth-feature-one">Invest Plan with Saving</button>
        </Link>
        <Link href='/retire'>
          <button className="bth-feature-two">Retirement Plan</button>
        </Link>
      </div>
    </>
  )
}

export default Main

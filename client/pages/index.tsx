/* eslint-disable no-use-before-define */
import React from 'react'
import Link from 'next/link'

const Main = () => {
  return (
    <>
      <h3 className="head-topic">Plan to Invest</h3>
      <div className="container">
        <Link href='/invest'>
          <button className="bth-feature-one">วางแผนการลงทุนด้วยเงินเก็บ</button>
        </Link>
        <Link href='/retire'>
          <button className="bth-feature-two">วางแผนเกีษยณ</button>
        </Link>
      </div>
    </>
  )
}

export default Main

import React from 'react'
import Stripe from './stripe/Stripe'

function Donations() {
  return (
    <>
    <div className="mt-5" style={{textAlign: 'center'}}>Donations</div>
    <Stripe />
    </>
  )
}

export default Donations
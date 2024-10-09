/* eslint-disable @next/next/no-css-tags */
import Head from 'next/head'
import React from 'react'
import ProductsList from './product-listing/ProductsList'

const QuickDelivery = () => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/assets/css/product-listing.css" />
      </Head>
      <ProductsList pageName={"engagement-rings"} />    
    </>
  )
}

export default QuickDelivery

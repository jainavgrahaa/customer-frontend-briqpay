/* eslint-disable @next/next/no-css-tags */
import Head from 'next/head'
import React from 'react'
import EarringsList from './product-listing/EarringsList'

const EarRingListing = () => {
    return (
        <>
            <Head>
                <link rel="stylesheet" href="/assets/css/product-listing.css" />
            </Head>
            <EarringsList pageName={"engagement-rings"} />
        </>
    )
}

export default EarRingListing

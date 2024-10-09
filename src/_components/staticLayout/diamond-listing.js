/* eslint-disable @next/next/no-css-tags */
import Head from 'next/head'
import React from 'react'
import DiamondRingsList from './product-listing/DiamondList'

const DiamondRingListing = () => {
    return (
        <>
            <Head>
                <link rel="stylesheet" href="/assets/css/product-listing.css" />
            </Head>
            <DiamondRingsList pageName={"engagement-rings"} />
        </>
    )
}

export default DiamondRingListing

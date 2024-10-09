/* eslint-disable @next/next/no-css-tags */
import Head from "next/head";
import React from "react";
import WeddingRingList from "./product-listing/WeddingRingList";

const WeddingRingListing = () => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/assets/css/product-listing.css" />
      </Head>
      <WeddingRingList pageName={"engagement-rings"} />
    </>
  );
};

export default WeddingRingListing;

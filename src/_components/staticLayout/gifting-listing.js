/* eslint-disable @next/next/no-css-tags */
import Head from "next/head";
import React from "react";
import GiftingList from "./product-listing/GiftingList";

const GiftingListing = () => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/assets/css/product-listing.css" />
      </Head>
      <GiftingList pageName={"engagement-rings"} />
    </>
  );
};

export default GiftingListing;

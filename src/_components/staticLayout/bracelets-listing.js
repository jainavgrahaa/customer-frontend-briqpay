/* eslint-disable @next/next/no-css-tags */
import Head from "next/head";
import React from "react";
import BraceletsList from "./product-listing/BraceletsList";

const BraceletsListing = () => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/assets/css/product-listing.css" />
      </Head>
      <BraceletsList pageName={"engagement-rings"} />
    </>
  );
};

export default BraceletsListing;

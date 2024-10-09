/* eslint-disable @next/next/no-css-tags */
import Head from "next/head";
import React from "react";
import NaturalDiamondList from "./product-listing/NaturalDiamondList";

const NaturalDiamondListing = () => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/assets/css/product-listing.css" />
      </Head>
      <NaturalDiamondList pageName={"engagement-rings"} />
    </>
  );
};

export default NaturalDiamondListing;

/* eslint-disable @next/next/no-css-tags */
import Head from "next/head";
import React from "react";
import NeckLaceRingList from "./product-listing/NeckLaceList";

const NeckLaceListing = () => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/assets/css/product-listing.css" />
      </Head>
      <NeckLaceRingList pageName={"engagement-rings"} />
    </>
  );
};

export default NeckLaceListing;

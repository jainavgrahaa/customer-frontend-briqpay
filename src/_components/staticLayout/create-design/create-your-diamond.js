/* eslint-disable @next/next/no-css-tags */
import { useEffect, useState } from "react";
import Head from "next/head";
import ChooseDiamond from "@/_components/common/create-design/create-your-diamond/createYourDiamond";
import BreadCrumbs from "@/_components/common/breadcrumbs";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { fetchChooseDiamondssPageData } from "@/_store/chooseDiamond.slice";

export default function ChooseDiamondComponent({ ...props }) {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.chooseDiamond);
  const { storeId } = props || {};

  useEffect(() => {
    if (status === "idle") {
      dispatch;
      dispatch(
        fetchChooseDiamondssPageData({
          storeId,
          slug: "choose-your-diamands",
        })
      );
    }
  }, [status, dispatch, storeId]);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/assets/css/create-design.css" />
      </Head>
      <BreadCrumbs
        currentPage={<FormattedMessage id="chooseDiamond.chooseDiamond" />}
      />
      <ChooseDiamond />
    </>
  );
}

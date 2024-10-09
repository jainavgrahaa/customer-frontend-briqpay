/* eslint-disable @next/next/no-css-tags */
import Head from "next/head";
import CreateYourDesign from "@/_components/common/create-design/create-your-design/createYourDesign";
import BreadCrumbs from "@/_components/common/breadcrumbs";
import { FormattedMessage } from "react-intl";

export default function CreateYourComponent() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/assets/css/create-design.css" />
      </Head>
      <BreadCrumbs currentPage={<FormattedMessage id="createYourDesing.createDesign" />} />
      <CreateYourDesign />
    </>
  );
}

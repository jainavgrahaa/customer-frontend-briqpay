/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { storeTypes } from "@/_utils";

const ServerErrorPage = ({ domain }) => {
  return (
    <>
      {storeTypes[domain] === "df" ? (
        <Head>
          <link rel="stylesheet" href="/assets/css/theme/df.css" />
        </Head>
      ) : null}
      <div className="page-wrapper">
        <>
          <div className="page-not-found" style={{ display: "flex" ,paddingTop:"20px"}}>
            <h1>Internal server error, Please try again!</h1>
          </div>
        </>
      </div>
    </>
  );
};

export default ServerErrorPage;

import React from "react";
import Head from "next/head";

import AppointmentBlock from "@/_components/common/AppointmentBlock";
import AllTextComponent from "@/_components/common/AllTextComponent";
import InnerBanner from "@/_components/common/InnerBanner";
import { CookiesPolicyData } from "@/_utils/customApiData";

const CookiesPolicy = () => {
  return (
    <>
    <div className="all-text-pages">
      <div className="cookies-policy-page all-text-main-pages">
        <InnerBanner
          Sectitle={<>Cookies Policy</>}
          extraClass=""
        />
        <div className="all-text-page-content">
          <div className="main-content">
            {CookiesPolicyData.map(({ subtitle, title, content }, index) => (
              <AllTextComponent
                key={index}
                title={title}
                subtitle={subtitle}
                content={content}
              />
            ))}
          </div>
        </div>
      </div>
      <AppointmentBlock />
    </div>
    </>
  );
};

export default CookiesPolicy;


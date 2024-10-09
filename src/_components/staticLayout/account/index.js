/* eslint-disable @next/next/no-css-tags */
import Head from "next/head";

import React, { useEffect, useState } from "react";
import { Tab, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import AppointmentBlock from "@/_components/common/AppointmentBlock";
import BreadCrumbs from "@/_components/common/breadcrumbs";
import LoginForm from "@/_components/common/account/LoginForm";
import SignUpForm from "@/_components/common/account/SignUpForm";
import { FormattedMessage } from "react-intl";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { getCookie, setCookie } from "cookies-next";
import { TOKEN_KEY } from "@/_utils/userToken";
import useDeviceHelper from "@/_hooks/useDeviceHelper";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
const AccountLogin = ({storeId, domain}) => {
  const [value, setValue] = useState("1");
  const { userDetails } = useSelector((state) => state.auth);
  const router = useRouter();
  const { deviceType } = useDeviceHelper();
  const {getAuthToken} = useAuthHelper()

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  useEffect(() => {
    if(!userDetails?.isGuest) {
      router.push('/account-login')
    }
    const fetchSignUpToken = async () => {
      const domain = localStorage?.getItem('domain')
      const result = await getAuthToken(domain);
      setCookie(TOKEN_KEY, result?.token)
    };
    if(!getCookie(TOKEN_KEY)) {
      fetchSignUpToken()
    }
  }, [])

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/assets/css/bespoke.css" />
      </Head>
      <section className="account-form-sec">
        <div>
          <BreadCrumbs currentPage={"Account"} />
          <Typography className="heading" variant="h1">
            <FormattedMessage id="account.title" />
          </Typography>
          <div className="row">
            <div className="col-md-12">
            {deviceType === "mobile" && (
              <div className="tabs-mobile-form">
                <TabContext value={value}>
                  <div sx={{ borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="Sign in"
                      className="tabs-control"
                    >
                      <Tab label="Sign in" value="1" className="tabs-control" />
                      <div className="separator"></div>
                      <Tab
                        label="Create an account"
                        value="2"
                        className="tabs-control"
                      />
                    </TabList>
                  </div>

                  <div className="col-md-12 mobile-form-col">
                    <TabPanel value="1">
                      <LoginForm storeId={storeId} />
                    </TabPanel>
                  </div>
                  <div className="col-md-12 mobile-form-col">
                    <TabPanel value="2">
                      <SignUpForm domain={domain} />
                    </TabPanel>
                  </div>
                </TabContext>
              </div>
            )}
            {deviceType !== "mobile" && (
              <div className="tabs-desktop-form">
                <div className="row">
                  <div className="col-md-6">
                    <LoginForm storeId={storeId} />
                  </div>
                  <div className="col-md-6">
                    <SignUpForm domain={domain} />
                  </div>
                </div>
              </div>
            )}
            </div>
          </div>
        </div>

        {/* <AppointmentBlock /> */}
      </section>
    </>
  );
};

export default AccountLogin;

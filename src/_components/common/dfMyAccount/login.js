import React, { useContext, useEffect, useState } from "react";
import LoginCustomer from "@/_components/common/df-checkout-components/login-customer";
import RegisteredCustomer from "@/_components/common/df-checkout-components/registered-customer";
import { useSelector } from "react-redux";
import { LoginContext } from "@/_utils/loginCotext";
import BreadCrumbs from "@/_components/common/breadcrumbs";
import { FormattedMessage } from 'react-intl'
import useDeviceHelper from "@/_hooks/useDeviceHelper";

const DFLogin = ({ storeId }) => {
  const { userDetails } = useSelector((state) => state.auth);
  const { redirectPath } = useContext(LoginContext);
  const { deviceType } = useDeviceHelper();
  if (!userDetails?.isGuest) return null;
  return (
    <div className="df-account-login">
    <div className="pt-2 mb-5">
    <BreadCrumbs currentPage={"Account"} />
    </div>
    <div className="row pt-4 justify-content-between">
    <div className={`col-xl-6 col-lg-6 col-sm-12 ${(deviceType === "mobile" || deviceType === "tablet") ? "mb-5" : ""}`}>
    <h2 className="text-center mb-0"><FormattedMessage id={"common.logintext"} /></h2>
    <LoginCustomer storeId={userDetails?.storeId} buttonAlign={"center"} redirectPath={redirectPath} ButtonFullWidth ={"w-100"} />
    </div>
    <div className="col-xl-6 col-lg-6 col-sm-12">
    <h2 className="text-center mb-0"><FormattedMessage id={"common.registertext"} /></h2>
    <RegisteredCustomer storeId={userDetails?.storeId} buttonAlign={"center"} agreePolicy ButtonFullWidth ={"w-100"}/>
    </div>
    </div>
    </div>
  );
};

export default DFLogin;

import React from "react";
import ForgetPassword from "@/_components/common/account/ForgetPassword";
import TextTitle from "@/_components/atoms/TextTitle";
// import AppointmentBlock from "@/_components/common/AppointmentBlock";
// import { Typography } from "@mui/material";
// import ThankYou from "@/_components/common/ThankYou";

const ResetPassword = ({ storeId }) => {
  return (
    <section className="account-form-sec">
      <div className="container">
        <TextTitle name={"My Account"}  className={"heading-title"} variant={"h2"}/>

        <div className="row">
          <div className="col-md-7">
            <ForgetPassword storeId={storeId} />
            {/* <ThankYou title="Thank you!" content={"You have created an Austen&Blake account. Please check your email to activate your account."} button={true}/> */}
          </div>
        </div>
        {/* <AppointmentBlock /> */}
      </div>
    </section>
  );
};

export default ResetPassword;

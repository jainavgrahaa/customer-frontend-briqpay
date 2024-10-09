import React from "react";
import TextTitle from "@/_components/atoms/TextTitle";
import Auth from "@/_components/molecules/Auth";
import useDeviceHelper from "@/_hooks/useDeviceHelper";
const LoginForm = ({storeId}) => {
  const { deviceType } = useDeviceHelper();
  return (
    <div className="login-account-sec account-sec">
      {deviceType !== "mobile" && (
      <TextTitle variant="h3" name="common.signIn" />
      )}
      <TextTitle variant="p" name="signin.subTitle" className={"mb-4"} />
      <Auth storeId={storeId} />
    </div>
  );
};

export default LoginForm;

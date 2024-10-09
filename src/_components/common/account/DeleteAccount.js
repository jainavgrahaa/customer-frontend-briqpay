import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { FormattedMessage, useIntl } from "react-intl";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { clearRedirectUrl } from "@/_utils/session";
import { createAlert } from "@/_store/alert.slice";
import { setCookie } from "cookies-next";
import { logoutUser } from "@/_store/auth.slice";
import { TOKEN_KEY } from "@/_utils/userToken";
import * as yup from "yup";
import jwtDecode from "jwt-decode";
import LoadingButton from "@mui/lab/LoadingButton";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { EMAIL_REGEX } from "@/_components/dynamicLayout/constants";

const DeleteAccount = ({ storeId }) => {
  const [loader, setLoader] = useState(false);
  const intl = useIntl();
  const { loginUser, deleteAccount, getAuthToken } = useAuthHelper();
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .matches(
          EMAIL_REGEX,
          intl.formatMessage({
            id: "common.invalidEmail",
          })
        )
        .required(<FormattedMessage id="common.emailReq" />),
      password: yup
        .string()
        .required(intl.formatMessage({ id: "common.required" }))
        .min(6, intl.formatMessage({ id: "common.passwordMustBeSixCharLong" })),
    }),
    onSubmit: async (formValues) => {
      setLoader(true);
      const loginResult = await loginUser({
        email: formValues.email,
        password: formValues.password,
        storeId: storeId,
      });
    
      // Sign in successfully
      if (loginResult.token) {
        const userDetail = jwtDecode(loginResult.token);
    
        // Invalid user details
        if (!userDetail || !userDetail.id) {
          dispatch(
            createAlert({
              alertType: "error",
              msg:
                loginResult.error.message ||
                intl.formatMessage({ id: "signin.invalidCredentialsMessage" }),
            })
          );
          setLoader(false);
          return;
        }
        await deleteAccount(userDetail.id);
        dispatch(
          createAlert({
            alertType: "success",
            msg: "Account Deleted Successfully",
          })
        );
        const domain = localStorage?.getItem("domain");
        const tokenResult = await getAuthToken(domain);
        setCookie(TOKEN_KEY, tokenResult?.token);
        dispatch(logoutUser());
        router.push("/account-login");
        clearRedirectUrl(); 
        router.push(redirectUrl);
        setLoader(false);
        return;
      }
    
      if (loginResult.error) {
        dispatch(
          createAlert({
            alertType: "error",
            msg:
              loginResult.error.message ||
              intl.formatMessage({ id: "signin.invalidCredentialsMessage" }),
          })
        );
      }
    
      setLoader(false);
    },
  });

  return (
    <div className="account-delete-form">
      <p>
        Your profile will be deleted permanently. You will not be able to
        recover any related account information.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="login-account-sec account-sec">
          <div className="row account-form-wrapper">
            <div className="col-md-6">
              <TextField
                fullWidth
                label={<FormattedMessage id="common.email" />}
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                variant="standard"
                autoComplete="off"
                value={values.email}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
            </div>
            <div className="col-md-6">
              <TextField
                fullWidth
                type="password"
                name="password"
                label={<FormattedMessage id="common.password" />}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="standard"
                autoComplete="off"
                value={values.password}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
            </div>
          </div>
        </div>

        <div className="col-12 text-center account-sec p-0">
          <LoadingButton
            type="submit"
            variant="outlined"
            className="signin-btn"
            loading={loader}
          >
            <FormattedMessage id="common.deleteAccount" />
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

export default DeleteAccount;

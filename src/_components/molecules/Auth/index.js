import React, { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import { FormattedMessage, useIntl } from "react-intl";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import jwtDecode from "jwt-decode";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { getRedirectUrl, clearRedirectUrl } from "@/_utils/session";
import { createAlert } from "@/_store/alert.slice";
import { loginUser as storeLoginUser, userDetail } from "@/_store/auth.slice";
import InputField from "@/_components/atoms/InputField";
import LoaderButton from "@/_components/atoms/ActButton/LoaderButton";
import { EMAIL_REGEX } from "@/_components/dynamicLayout/constants";

const Auth = ({
  closeLoginModal,
  handleAuth,
  showForgotPassword = true,
  storeId,
}) => {
  const [loader, setLoader] = useState(false);
  const intl = useIntl();
  const { loginUser, getUserDetails } = useAuthHelper();
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
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
      if (handleAuth) {
        handleAuth(formValues);
      } else {
        setLoader(true);
        try {
          const result = await loginUser({
            email: formValues.email,
            password: formValues.password,
            storeId: storeId,
          });
          // Sign in successfully
          if (result.token) {
            const userD = jwtDecode(result.token);

            // Invalid user details
            if (!userD || !userD.id) {
              dispatch(
                createAlert({
                  alertType: "error",
                  msg:
                    result.error.message ||
                    intl.formatMessage({
                      id: "signin.invalidCredentialsMessage",
                    }),
                })
              );
              return;
            }

            dispatch(storeLoginUser(userD));
            const details = await getUserDetails(dispatch, userDetail);
            dispatch(userDetail(details.data));
            dispatch(
              createAlert({
                alertType: "success",
                msg: intl.formatMessage({ id: "signin.successMessage" }),
              })
            );
            resetForm();
            localStorage.removeItem("domain");
            const redirectUrl = getRedirectUrl("/my-account");
            clearRedirectUrl(); // Clear previous redirect URL
            setLoader(false);
            if (closeLoginModal) {
              closeLoginModal(false);
            } else {
              router.push(redirectUrl); // redirect
            }
            return;
          }

          if (result.error) {
            dispatch(
              createAlert({
                alertType: "error",
                msg:
                  result.error.message ||
                  intl.formatMessage({
                    id: "signin.invalidCredentialsMessage",
                  }),
              })
            );
          }

          setLoader(false);
          if (closeLoginModal) {
            closeLoginModal(true);
          } else {
            router.push(redirectUrl); // redirect
          }
        } catch (error) {
          dispatch(
            createAlert({
              alertType: "error",
              msg:
                error.response.data.error.message ||
                intl.formatMessage({
                  id: "signin.invalidCredentialsMessage",
                }),
            })
          );
          console.log("error", error);
        } finally {
          setLoader(false);
        }
        return;
      }
    },
  });

  return (
    <form onSubmit={handleSubmit} className="account-form-wrapper">
      <InputField
        fullWidth
        label="common.email"
        name="email"
        onChange={handleChange}
        onBlur={handleBlur}
        variant="standard"
        autoComplete="off"
        value={values.email}
        error={Boolean(touched.email && errors.email)}
        helperText={touched.email && errors.email}
      />
      <InputField
        fullWidth
        label="common.password"
        name="password"
        type="password"
        onChange={handleChange}
        onBlur={handleBlur}
        variant="standard"
        autoComplete="off"
        value={values.password}
        error={Boolean(touched.password && errors.password)}
        helperText={touched.password && errors.password}
      />
      {showForgotPassword && (
        <Link href="./reset-password" className="forgot-password-style">
          <FormattedMessage id="common.forgotYourPassword" />
        </Link>
      )}
      <LoaderButton
        name="common.signIn"
        loader={loader}
        className="signin-btn"
      />
    </form>
  );
};

export default Auth;

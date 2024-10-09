import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import jwtDecode from "jwt-decode";
import LoadingButton from "@mui/lab/LoadingButton";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { createAlert } from "@/_store/alert.slice";
import { loginUser as storeLoginUser, userDetail } from "@/_store/auth.slice";
import { EMAIL_REGEX } from "@/_components/dynamicLayout/constants";

const RegisteredCustomer = ({ setOpen, storeId }) => {
  const [loader, setLoader] = useState(false);
  const intl = useIntl();
  const { loginUser, getUserDetails } = useAuthHelper();
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
      setLoader(true);
      const result = await loginUser({
        email: formValues.email,
        password: formValues.password,
        storeId: storeId,
      }).catch(() => {
        setLoader(false);
      });
      // Sign in successfully
      if (result.token) {
        const userDetails = jwtDecode(result.token);

        // Invalid user details
        if (!userDetails || !userDetails.id) {
          dispatch(
            createAlert({
              alertType: "error",
              msg:
                result.error.message ||
                intl.formatMessage({ id: "signin.invalidCredentialsMessage" }),
            })
          );
          return;
        }

        dispatch(storeLoginUser(userDetails));
        const details = await getUserDetails();
        dispatch(userDetail(details.data));
        dispatch(
          createAlert({
            alertType: "success",
            msg: intl.formatMessage({ id: "signin.successMessage" }),
          })
        );
        resetForm();
        localStorage.removeItem("domain");
        setLoader(false);
        if(setOpen) {
          setOpen(2);
        }
        return;
      }

      if (result.error) {
        dispatch(
          createAlert({
            alertType: "error",
            msg:
              result.error.message ||
              intl.formatMessage({ id: "signin.invalidCredentialsMessage" }),
          })
        );
      }

      setLoader(false);
    },
  });
  return (
    <div className="guest-user register-box col-lg-6 col-md-12">
      <p className="heading">Registered Customers</p>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          className="mt-3"
          label="Email"
          name="email"
          variant="standard"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(touched.email && errors.email)}
          helperText={touched.email && errors.email}
        />
        <TextField
          fullWidth
          className="mt-3"
          label="Password"
          name="password"
          type="password"
          variant="standard"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          error={Boolean(touched.password && errors.password)}
          helperText={touched.password && errors.password}
        />
        <LoadingButton
          type="submit"
          variant="outlined"
          className="signin-btn mt-5"
          loading={loader}
        >
          <FormattedMessage id="common.signIn" />
        </LoadingButton>
        <p className="text">
          <span>
            <a href="./reset-password">Forgot your password?</a>
          </span>
        </p>
      </form>
    </div>
  );
};

export default RegisteredCustomer;

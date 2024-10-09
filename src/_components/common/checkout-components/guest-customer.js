/* eslint-disable react/no-unescaped-entities */
import { LoadingButton } from "@mui/lab";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { setCookie } from "cookies-next";
import { loginUser as storeLoginUser, userDetail } from "@/_store/auth.slice";
import { createAlert } from "@/_store/alert.slice";
import { useDispatch } from "react-redux";
import { TOKEN_KEY } from "@/_utils/userToken";
import { EMAIL_REGEX } from "@/_components/dynamicLayout/constants";

const GuestCustomer = ({ setOpen }) => {
  const [loader, setLoader] = useState(false);
  const { updateUserDetails, getUserDetails } = useAuthHelper();
  const intl = useIntl();
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
      firstname: "",
      lastname: "",
      email: "",
      isKlaviyoSubscribe: false,
    },
    validationSchema: yup.object().shape({
      firstname: yup.string().required("First Name is required"),
      lastname: yup.string().required("Last Name is required"),
      email: yup
        .string()
        .matches(
          EMAIL_REGEX,
          intl.formatMessage({
            id: "common.invalidEmail",
          })
        )
        .required(<FormattedMessage id="common.emailReq" />),
    }),
    onSubmit: async (formValues) => {
      setLoader(true);
      const result = await updateUserDetails({
        firstname: formValues.firstname,
        lastname: formValues.lastname,
        email: formValues.email,
        isKlaviyoSubscribe: formValues.isKlaviyoSubscribe,
      }).catch(() => {
        setLoader(false);
      });

      // Sign in successfully
      if (result.accessToken) {
        setCookie(TOKEN_KEY, result?.accessToken);
        const userDetails = jwtDecode(result.accessToken);

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
        setOpen(2);
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
    <div className="guest-user guest-box col-lg-6 col-md-12">
      <p className="heading">Guest & New customers</p>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          className="mt-3"
          label="Name"
          name="firstname"
          variant="standard"
          type="text"
          value={values?.firstname}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.firstname && errors.firstname}
          helperText={touched.firstname ? errors.firstname : ""}
        />
        <TextField
          fullWidth
          className="mt-3"
          label="Lastname"
          name="lastname"
          variant="standard"
          type="text"
          value={values?.lastname}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.lastname && errors.lastname}
          helperText={touched.lastname ? errors.lastname : ""}
        />
        <TextField
          fullWidth
          className="mt-3"
          label="Email"
          name="email"
          variant="standard"
          type="text"
          value={values?.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && errors.email}
          helperText={touched.email ? errors.email : ""}
        />
        <FormGroup className="mt-3">
          <FormControlLabel
            name="isKlaviyoSubscribe"
            control={
              <Checkbox
                checked={values.isKlaviyoSubscribe}
                onChange={handleChange}
              />
            }
            label={<FormattedMessage id="Email me news, updates and offers." />}
          />
        </FormGroup>
        <LoadingButton
          type="submit"
          variant="outlined"
          className="signin-btn mt-3"
          // className="create-account-btn "
          style={{ textTransform: "none" }}
          loading={loader}
        >
          <FormattedMessage id="common.continueAsGuest" />
        </LoadingButton>
        <p className="text">
          Don't have an account yet?&nbsp;
          <span>
            <a href="./account-login"> Create an account</a>
          </span>
        </p>
      </form>
    </div>
  );
};

export default GuestCustomer;

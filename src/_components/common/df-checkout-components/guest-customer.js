/* eslint-disable react/no-unescaped-entities */
import { LoadingButton } from "@mui/lab";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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
import { useDispatch, useSelector } from "react-redux";
import { TOKEN_KEY } from "@/_utils/userToken";
import { EMAIL_REGEX } from "@/_components/dynamicLayout/constants";

const GuestCustomer = ({ setOpen }) => {
  const [loader, setLoader] = useState(false);
  const { userDetails } = useSelector((state) => state.auth);
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
      firstname: userDetails.firstname || "",
      title: userDetails.title || "",
      lastname: userDetails.lastname || "",
      email: userDetails.email || "",
      telephone: userDetails.phoneNumber || "",
      isKlaviyoSubscribe: userDetails.isKlaviyoSubscribe,
      isTelephoneSubscribe: false,
    },
    validationSchema: yup.object().shape({
      firstname: yup.string().required("First Name is required"),
      title: yup.string().required("Title is required"),
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
      telephone: yup.string().required("Telephone is required"),
    }),
    onSubmit: async (formValues) => {
      setLoader(true);
      const result = await updateUserDetails({
        firstname: formValues.firstname,
        title: formValues.title,
        lastname: formValues.lastname,
        email: formValues.email,
        phoneNumber: formValues.telephone,
        isKlaviyoSubscribe: formValues.isKlaviyoSubscribe,
        isTelephoneSubscribe: formValues.isTelephoneSubscribe,
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
    <div className="guest-user guest-box">
      <form onSubmit={handleSubmit}>
        <div className="row">
        <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12 mt-3">
        <FormControl variant="standard" fullWidth>
          <InputLabel>Title *</InputLabel>
          <Select
            name="title"
            value={values?.title}
            label="Title"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title && errors.title}
            helperText={touched.title ? errors.title : ""}
          >
            <MenuItem value="Mr">Mr.</MenuItem>
            <MenuItem value="Ms">Ms.</MenuItem>
          </Select>
        </FormControl>
        </div>
        <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 mt-3">
        <TextField
        fullWidth
          label="First Name *"
          name="firstname"
          variant="standard"
          type="text"
          value={values?.firstname}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.firstname && errors.firstname}
          helperText={touched.firstname ? errors.firstname : ""}
        />
        </div>
        <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 mt-3">
        <TextField
        fullWidth
          label="Last Name *"
          name="lastname"
          variant="standard"
          type="text"
          value={values?.lastname}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.lastname && errors.lastname}
          helperText={touched.lastname ? errors.lastname : ""}
        />
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
        <TextField
          fullWidth
          label="Telephone *"
          name="telephone"
          variant="standard"
          type="text"
          value={values?.telephone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.telephone && errors.telephone}
          helperText={touched.telephone ? errors.telephone : ""}
        />
        <FormGroup className="mt-3">
          <FormControlLabel
            name="isTelephoneSubscribe"
            control={
              <Checkbox
                checked={values.isTelephoneSubscribe}
                onChange={handleChange}
              />
            }
            label={
              <FormattedMessage
                id="I would like to subscribe to the Diamonds Factory SMS messages to receive the latest news
            and promotions.."
              />
            }
          />
        </FormGroup>
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
        <TextField
          fullWidth
          label="Email *"
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
            label={
              <FormattedMessage id="I would not like to subscribe to the Diamonds Factory newsletter to receive the latest news&and promotions." />
            }
          />
        </FormGroup>
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-5">
        <LoadingButton
          type="submit"
          variant="contained"
          style={{ textTransform: "none" }}
          loading={loader}
        >
          <FormattedMessage id="Continue >" />
        </LoadingButton>
        </div>
        </div>
      </form>
    </div>
  );
};

export default GuestCustomer;

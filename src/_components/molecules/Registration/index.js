import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Link from "next/link";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { FormattedMessage, useIntl } from "react-intl";
import { createAlert } from "@/_store/alert.slice";
import { getStoreID, storeTypes } from "@/_utils";
import TextTitle from "@/_components/atoms/TextTitle";
import InputField from "@/_components/atoms/InputField";
import MaterialCheckbox from "@/_components/atoms/MaterialCheckbox";
import LoaderButton from "@/_components/atoms/ActButton/LoaderButton";
import { EMAIL_REGEX } from "@/_components/dynamicLayout/constants";

const Regsitration = ({ setRadioValue, domain }) => {
  const [loader, setLoader] = useState(false);
  const [storeId, setStoreId] = useState(null);
  const { registrationUser } = useAuthHelper();
  const isAB = storeTypes[domain] === "ab";
  const dispatch = useDispatch();
  const intl = useIntl();

  useEffect(() => {
    const fetchStoreId = async () => {
      const { storeId: id } = await getStoreID(domain);
      setStoreId(id);
    };

    fetchStoreId();
  }, []);

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
      title: isAB ? "Mr" : "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      isKlaviyoSubscribe: false,
    },
    validationSchema: yup.object().shape({
      title: yup
        .string()
        .required(intl.formatMessage({ id: "common.required" })),
      firstname: yup
        .string()
        .required(intl.formatMessage({ id: "common.required" })),
      lastname: yup
        .string()
        .required(intl.formatMessage({ id: "common.required" })),
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
      confirmPassword: yup
        .string()
        .required(intl.formatMessage({ id: "common.required" }))
        .oneOf(
          [yup.ref("password"), null],
          intl.formatMessage({ id: "common.passwordMustMatch" })
        ),
    }),
    onSubmit: async (formValues) => {
      setLoader(true);
      try {
        const result = await registrationUser({
          title: formValues.title,
          firstname: formValues.firstname,
          lastname: formValues.lastname,
          email: formValues.email,
          password: formValues.password,
          storeId: storeId,
          isKlaviyoSubscribe: formValues.isKlaviyoSubscribe,
        });
        // Register successfully
        if (!result.error) {
          dispatch(
            createAlert({
              alertType: "success",
              msg: intl.formatMessage({ id: "signup.successMessage" }),
            })
          );
          if (setRadioValue) {
            setRadioValue("Login");
          }
          resetForm();
        }
        if (result.error) {
          dispatch(
            createAlert({
              alertType: "error",
              msg: intl.formatMessage({ id: "signup.failed" }),
            })
          );
          resetForm();
        }
      } catch (error) {
        if (error?.response?.data?.error?.statusCode) {
          dispatch(
            createAlert({
              alertType: "error",
              msg:
                error?.response?.data?.error?.message ||
                "Something went wrong, Please try again!",
            })
          );
        } else {
          dispatch(
            createAlert({
              alertType: "error",
              msg:
                error?.response?.data?.error?.message ||
                "Something went wrong, Please try again!",
            })
          );
        }
      }
      setLoader(false);
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      {!isAB ? (
        <FormControl variant="standard" fullWidth style={{ marginBottom: 10 }}>
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
      ) : null}
      <InputField
        fullWidth
        label="common.firstName"
        name="firstname"
        onChange={handleChange}
        onBlur={handleBlur}
        variant="standard"
        autoComplete="off"
        value={values.firstname}
        error={Boolean(touched.firstname && errors.firstname)}
        helperText={touched.firstname && errors.firstname}
      />
      <InputField
        fullWidth
        label="common.lastName"
        name="lastname"
        onChange={handleChange}
        onBlur={handleBlur}
        variant="standard"
        autoComplete="off"
        value={values.lastname}
        error={Boolean(touched.lastname && errors.lastname)}
        helperText={touched.lastname && errors.lastname}
      />
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
      <InputField
        fullWidth
        label="common.confirmPassword"
        name="confirmPassword"
        type="password"
        onChange={handleChange}
        onBlur={handleBlur}
        variant="standard"
        autoComplete="off"
        value={values.confirmPassword}
        error={Boolean(touched.confirmPassword && errors.confirmPassword)}
        helperText={touched.confirmPassword && errors.confirmPassword}
        className={"mb-2"}
      />
      <TextTitle
        variant="body1"
        name="signup.passwordPattern"
        className="password-condition"
      />
      <MaterialCheckbox
        name="isKlaviyoSubscribe"
        label="signup.keepUpdateCheckText"
        handleChange={handleChange}
        checked={values.isKlaviyoSubscribe}
      />
      <Typography variant="body1" className="privacy-box">
        <FormattedMessage id="common.yourPrivacyText" />
        <span className="create-account-privacy">
          <FormattedMessage id="common.byClickCreateAccount" />{" "}
        </span>
        <span className="terms-condition">
          <FormattedMessage id="common.youAgreeToOur" />
          <Link href="/terms-and-condition">
            &nbsp;
            <FormattedMessage id="common.terms" />
          </Link>
          &nbsp; <FormattedMessage id="common.smallAndText" />
          <Link href="/privacy-policy">
            &nbsp;
            <FormattedMessage id="common.privacyPolicy" />
          </Link>
          .
        </span>
      </Typography>
      <LoaderButton
        name="common.createAnAccount"
        loader={loader}
        className="create-account-btn"
      />
    </form>
  );
};

export default Regsitration;

/* eslint-disable @next/next/no-img-element */
import { Button, Checkbox, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { FormattedMessage , useIntl } from "react-intl";
import * as yup from "yup";
import useAuthHelper from "@/_hooks/useAuthHelper";
import DFTalkToExpert from "@/_components/common/DFTalkToExpert";
import { createAlert } from "@/_store/alert.slice";
import { useDispatch } from "react-redux";
import { EMAIL_REGEX } from "@/_components/dynamicLayout/constants";

const DfEmailUs = ({ storeId }) => {
  const [checked, setChecked] = React.useState(true);
  const { needAssistant } = useAuthHelper();
  const dispatch = useDispatch();
  const intl = useIntl();
  const initialCustomerValues = {
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
    state: checked,
  };

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialCustomerValues,
      enableReinitialize: true,
      validationSchema: yup.object().shape({
        name: yup.string().required(<FormattedMessage id="Name Required" />),
        email: yup
        .string()
        .matches(
          EMAIL_REGEX,
          intl.formatMessage({
            id: "common.invalidEmail",
          })
        )
        .required(<FormattedMessage id="common.emailReq" />),
        phoneNumber: yup
          .number()
          .required(<FormattedMessage id="Contact Number Required" />),
        message: yup
          .string()
          .required(<FormattedMessage id="Message Required" />),
      }),
      onSubmit: async (formValues, { resetForm }) => {
        formValues["storeId"] = storeId;
        formValues["customerId"] = "";
        formValues["phoneNumber"] = +formValues.phoneNumber;
        try {
          const res = await needAssistant(formValues);
          if (res.id) {
            dispatch(
              createAlert({
                alertType: "success",
                msg: <FormattedMessage id="common.contactDetailsSuccess" />,
              })
            );
            resetForm();
          } else {
            dispatch(
              createAlert({
                alertType: "error",
                msg:
                  res?.error?.response?.data?.error?.message ||
                  "Something went wrong, Please try again!",
              })
            );
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
      },
    });
  const handleChangeCheck = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="form-brown-theme">
        <div className="w-100 m-auto mt-4 mb-5" style={{ maxWidth: "872px" }}>
          {/* <h4 className="email-us-title"><FormattedMessage id="email.heading" /></h4>
          <span className="email-us-subtitle">
            <FormattedMessage id="email.subtitle" />.
            service@diamondsfactory.co.uk
          </span> */}
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-sm-12 col-12 mb-3">
              <TextField
                fullWidth
                label={<FormattedMessage id="Name" />}
                name="name"
                variant="standard"
                autoComplete="off"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
              />
            </div>
            <div className="col-xl-6 col-lg-6 col-sm-6 col-12 mb-3">
              <TextField
                fullWidth
                label={<FormattedMessage id="Email Address" />}
                name="email"
                variant="standard"
                autoComplete="off"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
            </div>
            <div className="col-xl-6 col-lg-6 col-sm-6 col-12 mb-3">
              <TextField
                fullWidth
                label={<FormattedMessage id="Contact Number" />}
                name="phoneNumber"
                variant="standard"
                autoComplete="off"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phoneNumber}
                error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
              />
              <span className="f-12 d-block mt-3 color-bistre-brown">
                <FormattedMessage id="common.InfoAreaCodeNumber" />
              </span>
            </div>
            <div className="col-xl-12 col-lg-12 col-sm-12 col-12 mb-3 mt-3">
              <label className="color-bistre-brown mb-3">
                <FormattedMessage id="email.message" />
              </label>
              <TextField
                fullWidth
                name="message"
                variant="outlined"
                autoComplete="off"
                placeholder="Type Here *"
                multiline
                rows={4}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.message}
                error={Boolean(touched.message && errors.message)}
                helperText={touched.message && errors.message}
              />
              <span className="f-12 d-block mt-3">
                <FormattedMessage id="common.compulsaryFields" />
              </span>
            </div>
            <div className="col-xl-12 col-lg-12 col-sm-12 col-12 mb-3">
              <Checkbox
                checked={checked}
                onChange={handleChangeCheck}
                inputProps={{ "aria-label": "controlled" }}
                className="email-checkbox"
              />
              <span className="checkbox-text">
                <FormattedMessage id="email.aboutEnquiry" />
              </span>
            </div>
            <div className="col-xl-12 col-lg-12 col-sm-12 col-12 text-center">
              <Button variant="contained" type="submit">
                <FormattedMessage id="email.submit" />
              </Button>
            </div>
          </div>
        </div>
      </form>
      <DFTalkToExpert />
    </>
  );
};

export default DfEmailUs;

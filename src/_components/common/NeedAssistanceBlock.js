import React, { useState } from "react";
import Link from "next/link";
import { FormattedMessage } from "react-intl";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  Checkbox,
  TextField,
  FormControlLabel,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { createAlert } from "@/_store/alert.slice";
import { useDispatch } from "react-redux";
import TextTitle from '@/_components/atoms/TextTitle';
import { EMAIL_REGEX } from "@/_components/dynamicLayout/constants";
import { useIntl } from "react-intl";

const initialEnquiryDetails = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  getInTouch: "",
  message: "",
  customerId: ""
};

const NeedAssistanceBlock = () => {
  const { needAssistant } = useAuthHelper();
  const dispatch = useDispatch();
  const intl = useIntl();
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialEnquiryDetails,
      enableReinitialize: true,
      validationSchema: yup.object().shape({
        firstName: yup.string().required(<FormattedMessage id="common.firstNameReq" />),
        lastName: yup.string().required(<FormattedMessage id="common.lastNameReq" />),
        email: yup
          .string()
          .matches(
            EMAIL_REGEX,
            intl.formatMessage({
              id: "common.invalidEmail",
            })
          )
          .required(<FormattedMessage id="common.emailReq" />),
        getInTouch: yup.string().required(<FormattedMessage id="common.getInTouchReq" />),
        message: yup.string().required(<FormattedMessage id="common.messageReq" />),
        phoneNumber: yup.number().required(<FormattedMessage id="Contact Number Required" />)
      }),
      onSubmit: async (formValues, { resetForm }) => {
        await needAssistant(formValues).then(
          async (data) => {
            dispatch(
              createAlert({
                alertType: "success",
                msg: <FormattedMessage id="common.contactDetailsSuccess" />,
              })
            );
            resetForm();
          }
        );
      },
    });

  return (
    <>
      <section className="need-assistance">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="need-assistance-form">
              <div className="need-assistance-title mb-5">
                <TextTitle variant="h1" name="needAssistance.assistance" />
              </div>
              <div className="need-assistance-content row">
                <div className="col-md-6 col-xs-12">
                  <TextField
                    fullWidth
                    label={<FormattedMessage id="common.firstName" />}
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="standard"
                    autoComplete="off"
                    value={values.firstName}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />

                  <TextField
                    fullWidth
                    label={<FormattedMessage id="common.lastName" />}
                    name="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="standard"
                    autoComplete="off"
                    value={values.lastName}
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />

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

                  <TextField
                    fullWidth
                    label={<FormattedMessage id="needAssistance.phoneNumber" />}
                    name="phoneNumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="standard"
                    autoComplete="off"
                    value={values.phoneNumber}
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                  />
                </div>
                <div className="col-md-6 col-xs-12">
                  <FormControl
                    className="get-in-touch-dropdown"
                  >
                    <InputLabel>
                      {<FormattedMessage id="needAssistance.getInTouch" />}
                    </InputLabel>
                    <Select
                      label={<FormattedMessage id="needAssistance.getInTouch" />}
                      fullWidth
                      name="getInTouch"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="standard"
                      autoComplete="off"
                      value={values.getInTouch}
                      error={Boolean(touched.getInTouch && errors.getInTouch)}
                      helperText={touched.getInTouch && errors.getInTouch}
                    >
                      <MenuItem value="Need guidance">
                        <FormattedMessage id="needAssistance.needGuide" />
                      </MenuItem>
                      <MenuItem value="General Enquiry">
                        <FormattedMessage id="needAssistance.generalEnquiry" />
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    className="message-input"
                    fullWidth
                    label={<FormattedMessage id="common.message" />}
                    name="message"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="standard"
                    autoComplete="off"
                    value={values.message}
                    error={Boolean(touched.message && errors.message)}
                    helperText={touched.message && errors.message}
                  />
                  <FormControlLabel
                    value=""
                    control={<Checkbox checked />}
                    label={
                      <>
                        <FormattedMessage id="common.agree" />{" "}
                        <Link href="/terms-and-condition">
                          {" "}
                          <FormattedMessage id="common.terms" />
                        </Link>{" "}
                        <FormattedMessage id="common.smallAndText" />{" "}
                        <Link href="/privacy-policy">
                          <FormattedMessage id="common.privacyPolicy" />.
                        </Link>
                      </>
                    }
                    labelPlacement="end"
                  />
                </div>
                <div className="need-assistance-action">
                  <button type="submit" className="btn-link-primary">
                    <span className="gift-form-button">
                      <FormattedMessage id="common.getInTouch" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default NeedAssistanceBlock;

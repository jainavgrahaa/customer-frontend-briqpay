import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import React from "react";
import Link from "next/link";
import { FormattedMessage } from "react-intl";

const AppointmentForm = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  checked,
  setChecked,
}) => {
  return (
    <>
      <div className="login-account-sec account-sec">
        <form onSubmit={""} className="account-form-wrapper">
          <div className="row">
            <div className="col-md-6">
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                variant="standard"
                autoComplete="off"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                error={Boolean(touched.firstName && errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />
            </div>
            <div className="col-md-6">
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                variant="standard"
                autoComplete="off"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
                error={Boolean(touched.lastName && errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
            </div>
          </div>
          <div className="row">
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
                label="Phone Number"
                name="phoneNumber"
                variant="standard"
                type="text"
                value={values?.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.phoneNumber && errors.phoneNumber}
                helperText={touched.phoneNumber ? errors.phoneNumber : ""}
              />
            </div>
          </div>

          <TextField
            id="filled-multiline-flexible"
            label="Message"
            name="message"
            multiline
            maxRows={3}
            variant="standard"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </form>
        <div className="payment-checkbox">
          <FormControlLabel
            Name="agreeTermsAndCondition"
            control={
              <Checkbox
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
            }
            label={
              <div className="checkbox-text">
                <span>By clicking “Book appointment”, you agree to </span>
                <Link href={"/terms-and-condition"}>Terms</Link>
                <span> & </span>
                <Link href={"/privacy-policy"}>Privacy Policy</Link>
              </div>
            }
          />
        </div>
      </div>
    </>
  );
};

export default AppointmentForm;

import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import Link from "next/link";
import { FormattedMessage, useIntl } from "react-intl";
import { DETAILS_MODAL } from ".";
import { useState } from "react";
import MaterialCheckbox from "@/_components/atoms/MaterialCheckbox";

const TellUsModalComponent = ({ setIsOpen, setUserDetails }) => {
  const intl = useIntl();
  const [checked, setIsChecked] = useState({});

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  };

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      enableReinitialize: true,
      validationSchema: yup.object().shape({
        firstName: yup
          .string()
          .required(intl.formatMessage({ id: "common.required" })),
        lastName: yup
          .string()
          .required(intl.formatMessage({ id: "common.required" })),
        phoneNumber: yup
          .number()
          .typeError("Only numbers are allowed")
          .required(intl.formatMessage({ id: "common.required" })),
        email: yup
          .string()
          .email()
          .required(intl.formatMessage({ id: "common.required" })),
      }),
      onSubmit: async (formValues) => {
        setUserDetails(formValues);
        setIsOpen(DETAILS_MODAL);
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6 col-xs-12">
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            variant="standard"
            autoComplete="off"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.firstName}
            error={Boolean(touched.firstName && errors.firstName)}
            helperText={touched.firstName && errors.firstName}
          />
        </div>
        <div className="col-md-6 col-xs-12">
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            variant="standard"
            autoComplete="off"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.lastName}
            error={Boolean(touched.lastName && errors.lastName)}
            helperText={touched.lastName && errors.lastName}
          />
        </div>
        <div className="col-md-6 col-xs-12">
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
        <div className="col-md-6 col-xs-12">
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
        </div>
        <div className="col-md-12 message-input">
          <TextField
            fullWidth
            label="Message"
            name="message"
            variant="standard"
            autoComplete="off"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.message}
            error={Boolean(touched.message && errors.message)}
            helperText={touched.message && errors.message}
          />
        </div>
        <div className="col-md-12">
          <MaterialCheckbox
            name="first"
            strLabel={
              <>
                I have read and agree to the{" "}
                <Link href="#">Privacy Policy, Terms & Conditions</Link> and{" "}
                <Link href="#">Cookie Policy.</Link>
              </>
            }
            handleChange={() =>
              setIsChecked({
                ...checked,
                first: !checked.first,
              })
            }
            checked={checked.first}
          />
        </div>
        <div className="col-md-12">
          <MaterialCheckbox
            name="second"
            label="I authorise Austen & Blake to contact me with updates on their products and offers."
            handleChange={(e) =>
              setIsChecked({
                ...checked,
                second: !checked.second,
              })
            }
            checked={checked.second}
          />
        </div>
        <div className="d-flex justify-content-center">
          <Button
            variant="outlined"
            type="submit"
            disabled={!(checked.first && checked.second)}
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TellUsModalComponent;

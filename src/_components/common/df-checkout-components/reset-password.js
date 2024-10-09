import React, { useState } from "react";
import { TextField } from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { useFormik } from "formik";
import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { EMAIL_REGEX } from "@/_components/dynamicLayout/constants";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { useDispatch } from "react-redux";
import { createAlert } from "@/_store/alert.slice";

const ResetPasswordDF = ({ storeId }) => {
  const [loader, setLoader] = useState(false);
  const intl = useIntl();
  const { forgotPassword } = useAuthHelper();
  const dispatch = useDispatch();

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
      },
      enableReinitialize: true,
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
      }),
      onSubmit: async (formValues, { resetForm }) => {
        forgotPassword({
          email: formValues.email,
          storeId: storeId,
        })
          .then((res) => {
            if (res?.response?.data?.error?.message) {
              dispatch(
                createAlert({
                  alertType: "error",
                  msg: res?.response?.data?.error?.message,
                })
              );
            }
            if (res.token) {
              dispatch(
                createAlert({
                  alertType: "success",
                  msg: "You will receive an email shortly to reset your password.",
                })
              );
              resetForm();
            }
          })
          .catch((err) => {
            dispatch(
              createAlert({
                alertType: "error",
                msg:
                  err?.response?.data?.error?.message ||
                  "Something went wrong, please try again!",
              })
            );
          });
      },
    });
  return (
    <>
      <div className="resetpassword-modal m-auto w-100" style={{ maxWidth: "535px" }}>
        <p className="text-center mb-0"><FormattedMessage id={"resetpassword.description"} /></p>
        <form onSubmit={handleSubmit}>
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
          <div className={`text-center`}>
            <LoadingButton
              type="submit"
              variant="contained"
              className={`mt-3`}
              loading={loader}
            >
              <FormattedMessage id="common.reterivepassword" />
            </LoadingButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default ResetPasswordDF;

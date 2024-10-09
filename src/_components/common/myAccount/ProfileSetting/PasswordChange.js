import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useIntl } from "react-intl";
import InputField from "@/_components/atoms/InputField";
import { useDispatch, useSelector } from "react-redux";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { createAlert } from "@/_store/alert.slice";
import { getApiUrl } from "@/_utils";

const PasswordChange = ({ storeId }) => {
  const intl = useIntl();
  const { userDetails } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { updatePassword } = useAuthHelper();

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
      current: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object().shape({
      current: yup
        .string()
        .required(intl.formatMessage({ id: "common.required" })),
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
    onSubmit: async () => {
      const payload = {
        currentPassword: values.current,
        newPassword: values.password,
        confirmNewPassword: values.confirmPassword,
      };
      setLoading(true)
      try {
        const res = await updatePassword(payload, userDetails.id);
        if (res?.response?.data?.error?.message) {
          dispatch(
            createAlert({
              alertType: "error",
              msg:
                res?.response?.data?.error?.message ||
                "Something went wrong, please try again!",
            })
          );
        }
        if (res.id) {
          dispatch(
            createAlert({
              alertType: "success",
              msg: "Password changed successfully",
            })
          );
          resetForm()
        }
      } catch (error) {
        dispatch(
          createAlert({
            alertType: "error",
            msg:
              error?.response?.data?.error?.message ||
              "Something went wrong, please try again!",
          })
        );
      } finally {
        setLoading(false)
      }
    },
  });

  return (
    <div className="password-change">
      <h2 className="profileSettingHeading">Password Change</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 inputs_col">
            <InputField
              fullWidth
              label="Current Password"
              name="current"
              onChange={handleChange}
              onBlur={handleBlur}
              variant="standard"
              autoComplete="off"
              value={values.current}
              error={Boolean(touched.current && errors.current)}
              helperText={touched.current && errors.current}
            />
          </div>
          <div className="col-md-6  inputs_col hidden_col">
            {/* <input type="text" className="form-control inputs" placeholder="Last name" aria-label="Last name"/> */}
          </div>
          <div className="col-md-6  inputs_col">
            <InputField
              fullWidth
              label="New Password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              variant="standard"
              autoComplete="off"
              value={values.password}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </div>
          <div className="col-md-6  inputs_col">
            <InputField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              variant="standard"
              autoComplete="off"
              value={values.confirmPassword}
              error={Boolean(touched.confirmPassword && errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
            />
          </div>
          <button disabled={loading} className="saveChange_btn">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default PasswordChange;

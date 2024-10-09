import useAuthHelper from "@/_hooks/useAuthHelper";
import { createAlert } from "@/_store/alert.slice";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useIntl, FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

const ChangePassword = ({ setActiveComponent }) => {
  const intl = useIntl();
  const [message, setMessage] = useState("");
  const { userDetails } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { updatePassword } = useAuthHelper();
  const [loader, setLoader] = useState(false);

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
        .required(intl.formatMessage({ id: "common.requiredCurrentPassword" })),
      password: yup
        .string()
        .required(intl.formatMessage({ id: "common.requiredNewPassword" }))
        .min(6, intl.formatMessage({ id: "common.passwordMustBeSixCharLong" })),
      confirmPassword: yup
        .string()
        .required(intl.formatMessage({ id: "common.confirmPasswordrequired" }))
        .oneOf(
          [yup.ref("password"), null],
          intl.formatMessage({ id: "common.passwordmatch" })
        ),
    }),
    onSubmit: async () => {
      setLoader(true);
      setMessage("")
      const payload = {
        currentPassword: values.current,
        newPassword: values.password,
        confirmNewPassword: values.confirmPassword,
      };
      try {
        const res = await updatePassword(payload, userDetails.id);
        if (res?.id) {
          setMessage(true)
          resetForm();
          // setActiveComponent("MyAccount");
          setActiveComponent("Change Password");
        } else {
          dispatch(
            createAlert({
              alertType: "error",
              msg:
                res?.response?.data?.error?.message ||
                intl.formatMessage({ id: "common.somethingWentWrong" }),
            })
          );
        }

      } catch (error) {
        dispatch(
          createAlert({
            alertType: "error",
            msg:
              error?.response?.data?.error?.message ||
              intl.formatMessage({ id: "common.somethingWentWrong" }),
          })
        );
      } finally {
        setLoader(false);
      }
    },
  });

  return (
    <div className="change-password">
      <h2 className="mb-2">{intl.formatMessage({ id: "account.changePassword" })}</h2>
      {message && <p className="success-message f-16 mt-4"><FormattedMessage id="account.passwordChanged" /></p>}
      <form onSubmit={handleSubmit}>
        <div className="my-account-password form-dark-feilds mt-30">
          <TextField
            fullWidth
            label={
              <span>
                Current Password <span style={{ color: "red" }}>*</span>
              </span>
            }
            name="current"
            variant="standard"
            type="password"
            value={values?.current}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.current && errors.current}
            helperText={touched.current ? errors.current : ""}
            className="mb-3"
          />
          <TextField
            fullWidth
            label={
              <span>
                New Password <span style={{ color: "red" }}>*</span>
              </span>
            }
            name="password"
            variant="standard"
            type="password"
            value={values?.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && errors.password}
            helperText={touched.password ? errors.password : ""}
            className="mb-3"
          />
          <TextField
            fullWidth
            label={
              <span>
                Confirm Password <span style={{ color: "red" }}>*</span>
              </span>
            }
            name="confirmPassword"
            variant="standard"
            type="password"
            value={values?.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.confirmPassword && errors.confirmPassword}
            helperText={touched.confirmPassword ? errors.confirmPassword : ""}
          />
          <p className="mt-30 mb-30 f-16">
            <FormattedMessage id="common.requiredMsg" />
          </p>
          <Button
            variant="contained"
            type="submit"
            disabled={loader}
            fullWidth
          >
            {loader ? "Loading" : intl.formatMessage({ id: "common.update" })}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;

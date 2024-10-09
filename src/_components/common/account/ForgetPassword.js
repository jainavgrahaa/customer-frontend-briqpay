import React from "react";
import * as yup from "yup";
import {
  TextField,
  Button,
  ListItemText,
  ListItemIcon,
  List,
  ListItem,
} from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { useFormik } from "formik";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { createAlert } from "@/_store/alert.slice";
import { useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { getApiUrl } from "@/_utils";
import TextTitle from "@/_components/atoms/TextTitle";
import Link from "next/link";
import { EMAIL_REGEX } from "@/_components/dynamicLayout/constants";
const AccountAssistance = ({ storeId }) => {
  const { forgotPassword } = useAuthHelper();
  const dispatch = useDispatch();
  const intl = useIntl();

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
    <div>
      <p>
        Enter the email address you used to create your Austen&Blake account.
      </p>
      <List component="div" disablePadding>
        <ListItem>
          <ListItemIcon>
            <span className="material-icons-outlined">done</span>
          </ListItemIcon>
          <ListItemText primary="You will receive an email shortly to reset your password." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <span className="material-icons-outlined">done</span>
          </ListItemIcon>
          <ListItemText primary="If you do not receive an email, please contact us for assistance." />
        </ListItem>
      </List>
      <form onSubmit={handleSubmit} className="account-form-wrapper">
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
        <Button type="submit" variant="outlined" className="signin-btn">
          Submit
        </Button>
      </form>
    </div>
  );
};

const ResetPassword = ({ storeId, token }) => {
  const router = useRouter();
  const intl = useIntl();
  const dispatch = useDispatch();

  const reset = async (payload, resetForm) => {
    try {
      const res = await fetch(getApiUrl(`/customer/reset-password`), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(payload),
      });
      const r = await res.json();
      if (r?.error?.message) {
        dispatch(
          createAlert({
            alertType: "error",
            msg: r?.error?.message || "Something went wrong, please try again!",
          })
        );
      } else {
        dispatch(
          createAlert({
            alertType: "success",
            msg: "Password reset successfully",
          })
        );
        router.push("/account-login");
        resetForm();
      }
    } catch (error) {
      dispatch(
        createAlert({
          alertType: "error",
          msg: "Something went wrong, please try again!",
        })
      );
    }
  };

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
        newPassword: values.password,
        confirmNewPassword: values.confirmPassword,
        storeId: storeId,
      };
      reset(payload, resetForm);
    },
  });

  return (
    <form onSubmit={handleSubmit} className="account-form-wrapper">
      <TextField
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
      <TextField
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
      <Button type="submit" variant="outlined" className="signin-btn">
        Submit
      </Button>
    </form>
  );
};

const ForgetPassword = ({ storeId }) => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return (
    <div>
      <div className="login-account-sec account-sec">
        <List component="div" disablePadding>
          <Link href="/account-login" style={{ textDecoration: "none" }}>
            <ListItem>
              <ListItemIcon>
                <span class="material-icons-outlined">arrow_back_ios_new</span>
              </ListItemIcon>
              <ListItemText primary="Back to login" />
            </ListItem>
          </Link>
        </List>
        <TextTitle
          name={token ? "Set New Password" : "Account Assistance"}
          variant={"h2"}
        />
        {token ? (
          <ResetPassword storeId={storeId} token={token} />
        ) : (
          <AccountAssistance storeId={storeId} />
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;

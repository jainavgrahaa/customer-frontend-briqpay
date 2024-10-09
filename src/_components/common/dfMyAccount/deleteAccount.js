import { createAlert } from "@/_store/alert.slice";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import jwtDecode from "jwt-decode";
import { logoutUser } from "@/_store/auth.slice"
import { clearRedirectUrl } from "@/_utils/session";;
import { TOKEN_KEY } from "@/_utils/userToken";
import { setCookie } from "cookies-next";
import { EMAIL_REGEX } from "@/_components/dynamicLayout/constants";
import { useRouter } from "next/router";
import useAuthHelper from "@/_hooks/useAuthHelper";

function DeleteAccount({ storeId }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loginUser, deleteAccount, getAuthToken } = useAuthHelper();
  const intl = useIntl();
  const [loader, setLoader] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
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
        password: yup
          .string()
          .required(intl.formatMessage({ id: "common.required" }))
          .min(
            6,
            intl.formatMessage({ id: "common.passwordMustBeSixCharLong" })
          ),
      }),
      onSubmit: async (formValues) => {
        try {
          setErrorMessage(false)
          setLoader(true);
          const result = await loginUser({
            email: formValues.email,
            password: formValues.password,
            storeId: storeId,
          });
          // Sign in successfully
          if (result?.token) {
            const userDetail = jwtDecode(result.token);

            // Invalid user details
            if (!userDetail || !userDetail.id) {
              dispatch(
                createAlert({
                  alertType: "error",
                  msg:
                    result.error.message ||
                    intl.formatMessage({
                      id: "signin.invalidCredentialsMessage",
                    }),
                })
              );
              return;
            }
            await deleteAccount(userDetail.id);
            const domain = localStorage?.getItem("domain");

            dispatch(logoutUser());
            clearRedirectUrl();
            setShowMessage(true)
            router.push("/account-login");
            setLoader(false);
            return;
          }

          if (result?.error) {
            dispatch(
              createAlert({
                alertType: "error",
                msg:
                  result.error.message ||
                  intl.formatMessage({
                    id: "signin.invalidCredentialsMessage",
                  }),
              })
            );
          }
        } catch (error) {
          if (error?.response?.data?.error?.statusCode) {
            setErrorMessage(true)
            // dispatch(
            //   createAlert({
            //     alertType: "error",
            //     msg:
            //       error?.response?.data?.error?.message ||
            //       "Something went wrong, Please try again!",
            //   })
            // );
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
        } finally {
          setLoader(false);
        }
      },
    });

  return (
    <div className="delete-account">
      <h2 className="mb-2">
        <FormattedMessage id="common.deleteAccount" />
      </h2>
      {errorMessage && <p className="error mb-30"><FormattedMessage id={"common.invalidPassword"} /></p>}
      <div className="delete-account-password form-dark-feilds">
        <TextField
          fullWidth
          label={
            <span>
              <FormattedMessage id={"common.emailadress"} /> <span className="required">*</span>
            </span>
          }
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          variant="standard"
          autoComplete="off"
          value={values.email}
          error={Boolean(touched.email && errors.email)}
          helperText={touched.email && errors.email}
          className="mb-3"
        />
        <TextField
          fullWidth
          type="password"
          name="password"
          label={
            <span>
              <FormattedMessage id={"common.password"} /> <span className="required">*</span>
            </span>
          }
          onChange={handleChange}
          onBlur={handleBlur}
          variant="standard"
          autoComplete="off"
          value={values.password}
          error={Boolean(touched.password && errors.password)}
          helperText={touched.password && errors.password}
          className="mb-3"
        />
        <p className="mt-3 mb-30 f-16">
          <FormattedMessage id="common.requiredMsg" />
        </p>
        {
          !showMessage &&
          <Button
            variant="contained"
            type="button"
            onClick={() => handleSubmit()}
            disabled={loader}
            fullWidth
          >
            {loader ? "Loading" : <FormattedMessage id="common.submit" />}
          </Button>
        }
      </div>
      {showMessage && <p className="success-message f-16 mt-4"><FormattedMessage id="account.deleted" /></p>}
    </div>
  );
}
export default DeleteAccount;

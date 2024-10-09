import React, { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import jwtDecode from "jwt-decode";
import LoadingButton from "@mui/lab/LoadingButton";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { createAlert } from "@/_store/alert.slice";
import { loginUser as storeLoginUser, userDetail } from "@/_store/auth.slice";
import { EMAIL_REGEX } from "@/_components/dynamicLayout/constants";
import { TOKEN_KEY } from "@/_utils/userToken";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";

const RegisteredCustomer = ({
  setOpen,
  storeId,
  buttonAlign,
  agreePolicy = false,
  ButtonFullWidth,
  setIsOpenLoginModal
}) => {
  const [loader, setLoader] = useState(false);
  const [agreePolicyChecked, setAgreePolicyChecked] = useState(false);
  const intl = useIntl();
  const { registrationUser, getUserDetails } = useAuthHelper();
  const dispatch = useDispatch();
  const router = useRouter();
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
      title: "",
      lastname: "",
      email: "",
      telephone: "",
      isKlaviyoSubscribe: false,
      isTelephoneSubscribe: false,
      password: "",
    },
    validationSchema: yup.object().shape({
      title: yup.string().required(<FormattedMessage id="common.titleReq" />),
      firstname: yup
        .string()
        .required(<FormattedMessage id="common.invalidFirstName" />)
        .min(1, <FormattedMessage id="common.invalidFirstName" />)
        .max(32, <FormattedMessage id="common.invalidFirstName" />),
      lastname: yup
        .string()
        .required(<FormattedMessage id="common.invalidLastName" />)
        .min(1, <FormattedMessage id="common.invalidLastName" />)
        .max(32, <FormattedMessage id="common.invalidLastName" />),
      telephone: yup.string().required("Telephone No. invalid!"),
      email: yup
        .string()
        .matches(
          EMAIL_REGEX,
          intl.formatMessage({
            id: "common.invalidEmailAddress",
          })
        )
        .required(<FormattedMessage id="common.invalidEmailAddress" />),
      password: yup
        .string()
        .required(<FormattedMessage id="common.passwordMustBeThreeCharLong" />)
        .min(3, <FormattedMessage id="common.passwordMustBeThreeCharLong" />)
        .max(20, <FormattedMessage id="common.passwordMustBeThreeCharLong" />),
    }),
    onSubmit: async (formValues) => {
      try {
        setLoader(true);
        const result = await registrationUser({
          firstname: formValues.firstname,
          title: formValues.title,
          lastname: formValues.lastname,
          email: formValues.email,
          phoneNumber: formValues.telephone,
          isKlaviyoSubscribe: formValues.isKlaviyoSubscribe,
          isTelephoneSubscribe: formValues.isTelephoneSubscribe,
          password: formValues.password,
          storeId: storeId,
        });
        // Sign in successfully
        if (result.token) {
          const userDetails = jwtDecode(result.token);
          setIsOpenLoginModal(false)
          setCookie(TOKEN_KEY, result?.token);
          // Invalid user details
          if (!userDetails || !userDetails.id) {
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

          dispatch(storeLoginUser(userDetails));
          const details = await getUserDetails();
          dispatch(userDetail(details.data));
          dispatch(
            createAlert({
              alertType: "success",
              msg: intl.formatMessage({ id: "signin.successMessage" }),
            })
          );
          resetForm();
          localStorage.removeItem("domain");
          setLoader(false);
          if (setOpen) {
            setOpen(2);
          }
          router.push("/my-account");
          return;
        }

        if (result.error) {
          dispatch(
            createAlert({
              alertType: "error",
              msg:
                error?.response?.data?.error?.message ||
                "Something went wrong!",
            })
          );
        }
      } catch (error) {
        dispatch(
          createAlert({
            alertType: "error",
            msg:
              error?.response?.data?.error?.message || "Something went wrong!",
          })
        );
      } finally {
        setLoader(false);
      }
    },
  });
  return (
    <div className="register-modal">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 mb-2">
            <FormControl variant="standard" fullWidth>
              <InputLabel>
                <FormattedMessage id={"common.title"} />{" "}
                <span className="required">*</span>
              </InputLabel>
              <Select
                name="title"
                value={values?.title}
                label={
                  <span>
                    <FormattedMessage id={"common.title"} />{" "}
                    <span className="required">*</span>
                  </span>
                }
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.title && errors.title}
                helperText={touched.title ? errors.title : ""}
              >
                <MenuItem value="Mr">Mr.</MenuItem>
                <MenuItem value="Ms">Ms.</MenuItem>
              </Select>
              {touched.title && errors.title &&
              <span style={{ color: "#d32f2f", marginTop: 10 }}>
                {touched.title && errors.title}
              </span>
              }
            </FormControl>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 mb-2">
            <TextField
              fullWidth
              label={
                <span>
                  <FormattedMessage id={"common.firstName"} />{" "}
                  <span className="required">*</span>
                </span>
              }
              name="firstname"
              variant="standard"
              type="text"
              value={values?.firstname}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.firstname && errors.firstname}
              helperText={touched.firstname ? errors.firstname : ""}
            />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 mb-2">
            <TextField
              fullWidth
              label={
                <span>
                  <FormattedMessage id={"common.lastName"} />{" "}
                  <span className="required">*</span>
                </span>
              }
              name="lastname"
              variant="standard"
              type="text"
              value={values?.lastname}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.lastname && errors.lastname}
              helperText={touched.lastname ? errors.lastname : ""}
            />
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-2">
            <TextField
              fullWidth
              label={
                <span>
                  <FormattedMessage id={"common.telephonetext"} />{" "}
                  <span className="required">*</span>
                </span>
              }
              name="telephone"
              variant="standard"
              type="text"
              value={values?.telephone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.telephone && errors.telephone}
              helperText={touched.telephone ? errors.telephone : ""}
            />
            <FormGroup className="mt-15">
              <FormControlLabel
                name="isTelephoneSubscribe"
                control={
                  <Checkbox
                    checked={values.isTelephoneSubscribe}
                    onChange={handleChange}
                  />
                }
                label={<FormattedMessage id="DFSms.messagesubscribe" />}
              />
            </FormGroup>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-2">
            <TextField
              fullWidth
              label={
                <span>
                  <FormattedMessage id={"common.email"} />{" "}
                  <span className="required">*</span>
                </span>
              }
              name="email"
              variant="standard"
              type="text"
              value={values?.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && errors.email}
              helperText={touched.email ? errors.email : ""}
            />
            <FormGroup className="mt-15">
              <FormControlLabel
                name="isKlaviyoSubscribe"
                control={
                  <Checkbox
                    checked={values.isKlaviyoSubscribe}
                    onChange={handleChange}
                  />
                }
                label={<FormattedMessage id="DFNewsletter.subscribetext" />}
              />
            </FormGroup>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <TextField
              fullWidth
              label={
                <span>
                  <FormattedMessage id={"common.password"} />{" "}
                  <span className="required">*</span>
                </span>
              }
              name="password"
              type="password"
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
            {agreePolicy && (
              <FormGroup className="mt-15">
                <FormControlLabel
                  name="isKlaviyoSubscribe"
                  control={
                    <Checkbox
                      checked={values.agreePolicyChecked}
                      onChange={() =>
                        setAgreePolicyChecked(!agreePolicyChecked)
                      }
                    />
                  }
                  label={<FormattedMessage id="privacypolict-agreetext" />}
                />
              </FormGroup>
            )}
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-30">
            <div
              className={`${
                buttonAlign && buttonAlign === "center" ? "text-center" : ""
              }`}
            >
              <LoadingButton
                startIcon={
                  loader ? (
                    <CircularProgress
                      size={20}
                      sx={{ color: "white", height: 0 }}
                    />
                  ) : (
                    ""
                  )
                }
                type="submit"
                variant="contained"
                disabled={agreePolicy && !agreePolicyChecked}
                className={`${ButtonFullWidth}`}
                loadingPosition="center"
              >
                <FormattedMessage id="common.continuerightarrow" />
              </LoadingButton>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisteredCustomer;

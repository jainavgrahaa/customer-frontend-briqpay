import React, { useState,useEffect,useContext } from "react";
import { TextField } from "@mui/material";
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
import { useRouter } from "next/router";
import Modal from "@/_components/modal";
import ResetPasswordDF from "@/_components/common/df-checkout-components/reset-password"

const LoginCustomer = ({ setOpen, storeId, buttonAlign, redirectPath,ButtonFullWidth,modalStatus,handleOpenForgotPasswordModal, setIsOpenLoginModal }) => {
  const [loader, setLoader] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const intl = useIntl();
  const { loginUser, getUserDetails } = useAuthHelper();
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
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
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
        .required(intl.formatMessage({ id: "common.passwordMustBeThreeCharLong" }))
        .min(3, intl.formatMessage({ id: "common.passwordMustBeThreeCharLong" })),
    }),
    onSubmit: async (formValues) => {
      try {
        setLoader(true);
        const result = await loginUser({
          email: formValues.email,
          password: formValues.password,
          storeId: storeId,
        });
        // Sign in successfully
        if (result.token) {
          const userDetails = jwtDecode(result.token);
          setIsOpenLoginModal(false)
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
          if(setOpen) {
            setOpen(2);
          }
          
          router.push(redirectPath || '/my-account')
          return;
        }

        if (result.error) {
          dispatch(
            createAlert({
              alertType: "error",
              msg:
                result.error.message ||
                intl.formatMessage({ id: "signin.invalidCredentialsMessage" }),
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
      } finally {
        setLoader(false);
      }
    },
  });
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenForgotPassword = () => {
    setModalOpen(true);
  };
  return (
    <>
    <div className="login-modal">
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
        <TextField
          fullWidth
          label={
              <span>
                <FormattedMessage id={"common.email"} /> <span className="required">*</span>
              </span>
            }
          name="email"
          variant="standard"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(touched.email && errors.email)}
          helperText={touched.email && errors.email}
        />
        </div>
        <div>
        <TextField
          fullWidth
          label={
            <span>
              <FormattedMessage id={"common.password"} /> <span className="required">*</span>
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
        </div>
        {!modalStatus &&
        <p className="text mt-2 semi-bold cursorP mb-0" onClick={handleOpenForgotPassword}>
             <FormattedMessage id={"common.forgottenpassword"} />
        </p>
        }
        {modalStatus &&
        <p className="text mt-2 semi-bold cursorP mb-0" onClick={handleOpenForgotPasswordModal}>
             <FormattedMessage id={"common.forgottenpassword"} />
        </p>
        }
        <div
          className={`${
            buttonAlign && buttonAlign === "center" ? "text-center" : ""
          }`}
        >
          <LoadingButton
            type="submit"
            variant="contained"
            className={`mt-30 ${ButtonFullWidth}`}
            loading={loader}
          >
            <FormattedMessage id="common.login" />
          </LoadingButton>
        </div>
      </form>
    </div>
    {!modalStatus &&
    <Modal
      isOpen={modalOpen}
      onClose={handleCloseModal}
      className="forgot-modal"
      title="Forgot Password"
    >
      <div className="forgot-modal-container m-auto w-100" style={{maxWidth: "872px"}}>
         <ResetPasswordDF storeId={storeId}DF/>
      </div>
    </Modal>
    }
    </>
  );
};

export default LoginCustomer;

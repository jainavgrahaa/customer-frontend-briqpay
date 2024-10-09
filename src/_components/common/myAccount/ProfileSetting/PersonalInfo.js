import React, { useEffect, useState } from "react";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { createAlert } from "@/_store/alert.slice";
import { userDetail } from "@/_store/auth.slice";
import { FormattedMessage, useIntl } from "react-intl";
import { EMAIL_REGEX } from "@/_components/dynamicLayout/constants";

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const { getUserDetails, updateUserDetails } = useAuthHelper();
  const { userDetails } = useSelector((state) => state.auth);
  const intl = useIntl();
  const fetchData = async () => {
    const result = await getUserDetails();
    dispatch(userDetail(result.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: userDetails,
      enableReinitialize: true,
      validationSchema: yup.object().shape({
        firstname: yup.string().required("First Name is required"),
        lastname: yup.string().required("Last Name is required"),
        email: yup
          .string()
          .matches(
            EMAIL_REGEX,
            intl.formatMessage({
              id: "common.invalidEmail",
            })
          )
          .required(<FormattedMessage id="common.emailReq" />),
        phoneNumber: yup
          .number()
          .typeError("Only numbers are allowed")
          .required("Phone Number is required"),
      }),
      onSubmit: async (formValues) => {
        setLoader(true);
        await updateUserDetails(formValues)
          .then(() => {
            fetchData();
            dispatch(
              createAlert({
                alertType: "success",
                msg: "Personal Information Updated successfully",
              })
            );
            setLoader(false);
          })
          .catch((error) =>
            dispatch(createAlert({ alertType: "error", msg: error?.message }))
          );
      },
    });

  return (
    <div className="personalInformation">
      <h1>
        <FormattedMessage id="common.personalInfo" />
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 inputs_col">
            <TextField
              fullWidth
              label="First Name"
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
          <div className="col-md-6 inputs_col">
            <TextField
              fullWidth
              label="Last Name"
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
          <div className="col-md-6 inputs_col">
            <TextField
              fullWidth
              label="Email"
              name="email"
              variant="standard"
              type="text"
              value={values?.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && errors.email}
              helperText={touched.email ? errors.email : ""}
            />
          </div>
          <div className="col-md-6 inputs_col">
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
          <LoadingButton
            type="submit"
            variant="outlined"
            className="saveChange_btn"
            loading={loader}
            disabled={Object.keys(errors).length > 0 || loader}
          >
            <FormattedMessage id="common.saveChanges" />
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;

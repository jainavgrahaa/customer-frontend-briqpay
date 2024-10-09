import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { useDispatch, useSelector } from "react-redux";
import { createAlert } from "@/_store/alert.slice";
import { FormattedMessage, useIntl } from "react-intl";
import { userDetail } from "@/_store/auth.slice";
import { EMAIL_REGEX } from "@/_components/dynamicLayout/constants";

const AccountInformation = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const [loader, setLoader] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const { getUserDetails, updateUserDetails } = useAuthHelper();
  const { userDetails } = useSelector((state) => state.auth);

  const fetchData = async () => {
    const result = await getUserDetails();
    dispatch(userDetail(result.data));
    setDataLoading(false)
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: userDetails,
      enableReinitialize: true,
      validationSchema: yup.object().shape({
        firstname: yup.string().required(
          intl.formatMessage({
            id: "common.firstNameRequired",
          })
        ),
        lastname: yup.string().required(
          intl.formatMessage({
            id: "common.lastNameRequired",
          })
        ),
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
          .typeError(
            intl.formatMessage({
              id: "common.onlyNumbersRequired",
            })
          )
          .required(
            intl.formatMessage({
              id: "common.phoneNumberRequired",
            })
          ),
      }),
      onSubmit: async (formValues) => {
        try {
          setLoader(true);
          setShowSuccessMsg(false);
          await updateUserDetails(formValues);
          await fetchData();
          setShowSuccessMsg(true);
        } catch (error) {
          dispatch(createAlert({ alertType: "error", msg: error?.message }));
        } finally {
          setLoader(false);
        }
      },
    });

    if(dataLoading) return null;

  return (
    <form onSubmit={handleSubmit}>
      <div className="myaccount-right-side">
        <h2>
          <FormattedMessage id="account.accountInformation" />
        </h2>
        {showSuccessMsg && <p className="success-message mb-30">Your personal information has been successfully updated.</p>}
        <div className="row form-dark-feilds">
          <div className="col-xl-6 col-lg-6 col-sm-12 col-12 mb-3">
            <FormControl variant="standard" fullWidth>
              <InputLabel>Title</InputLabel>
              <Select
                name="title"
                value={values?.title}
                label="Title"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.title && errors.title}
                helperText={touched.title ? errors.title : ""}
              >
                <MenuItem value="Mr">Mr.</MenuItem>
                <MenuItem value="Ms">Ms.</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="col-xl-6 col-lg-6 col-sm-12 col-12 mb-3">
            <FormControl variant="standard" fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={values.gender}
                label="Gender"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.gender && errors.gender}
                helperText={touched.gender ? errors.gender : ""}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="col-xl-6 col-lg-6 col-sm-12 col-12 mb-3">
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
          <div className="col-xl-6 col-lg-6 col-sm-12 col-12 mb-3">
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
          <div className="col-xl-6 col-lg-6 col-sm-12 col-12 mb-3">
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
          <div className="col-xl-6 col-lg-6 col-sm-12 col-12 mb-3">
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
          <div className="col-xl-12 col-lg-12 col-sm-12 col-12">
            <p className="mt-3 f-16">
              <FormattedMessage id="common.requiredMsg" />
            </p>
          </div>
          <div className="col-xl-12 col-lg-12 col-sm-12 col-12 mb-3 mt-4">
            <Button
              variant="contained"
              onClick={() => handleSubmit()}
              disabled={loader}
              fullWidth
            >
              <FormattedMessage id="common.update" />
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AccountInformation;

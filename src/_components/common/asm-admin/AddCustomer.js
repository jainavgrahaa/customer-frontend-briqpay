import InputField from "@/_components/atoms/InputField";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { FormattedMessage, useIntl } from "react-intl";
import { createAlert } from "@/_store/alert.slice";
import { useRouter } from "next/router";
import { userDetail } from "@/_store/auth.slice";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { deleteCookie, setCookie } from "cookies-next";
import {
  ASM_TOKEN_KEY,
  ASM_USER_EMAIL,
  ORDER_ID,
  LOCATION_ID,
  TOKEN_KEY,
} from "@/_utils/userToken";
import { EMAIL_REGEX } from "@/_components/dynamicLayout/constants";

const acquisitionChannelOption = [
  {
    value: "Lounge",
    label: "Lounge",
  },
  {
    value: "Store",
    label: "Store",
  },
  {
    value: "Online",
    label: "Online",
  },
  {
    value: "Tele",
    label: "Tele",
  },
  {
    value: "Web Viewing",
    label: "Web Viewing",
  },
]

const AddCustomer = ({
  storeId,
  setStep,
  selectedLocation,
  selectedChannel,
}) => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const intl = useIntl();
  const router = useRouter();
  const { registrationUser, getUserDetails, impersonateUser } = useAuthHelper();

  const impersonateUserDetails = async (id) => {
    const payload = {
      locationId: selectedLocation,
      salesChannel: selectedChannel,
    };
    const result = await impersonateUser(id, payload);
    if (result.token) {
      setCookie(TOKEN_KEY, result?.token);
      deleteCookie(ORDER_ID);
      deleteCookie(LOCATION_ID);
      const details = await getUserDetails();
      dispatch(userDetail({ ...details.data }));
      router.push("/");
    }
    if (result.error || result.message) {
      dispatch(
        createAlert({
          alertType: "error",
          msg:
            result?.error?.message ||
            result?.message ||
            "Something went wrong!",
        })
      );
    }
  };

  const handleRegistration = async (formValues) => {
    try {
      const payload = JSON.stringify({
        firstname: formValues.firstname,
        lastname: formValues.lastname,
        email: formValues.email,
        storeId: storeId,
      });
      const result = await registrationUser(payload);

      if (!result.error) {
        dispatch(
          createAlert({
            alertType: "success",
            msg:
              intl.formatMessage({ id: "signup.successMessage" }),
          })
        );
        impersonateUserDetails(result?.id);
      }

      // Register successfully
      if (result.error) {
        if (result.error.statusCode === 401) {
          deleteCookie(ASM_TOKEN_KEY);
          deleteCookie(ASM_USER_EMAIL);
          dispatch(
            createAlert({
              alertType: "error",
              msg:
                result.error.message ||
                intl.formatMessage({ id: "signup.failed" }),
            })
          );
          setStep(1);
        } else {
          dispatch(
            createAlert({
              alertType: "error",
              msg:
                result.error.message ||
                intl.formatMessage({ id: "signup.failed" }),
            })
          );
        }
      }
    } catch (error) {
      dispatch(
        createAlert({
          alertType: "error",
          msg: error?.response?.data?.error?.message || "Something went wrong!",
        })
      );
    } finally {
      setLoader(false);
    }
  };

  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        firstname: "",
        lastname: "",
        email: "",
        phoneNumber: "",
        acquisitionChannel: ""
      },
      validationSchema: yup.object().shape({
        firstname: yup
          .string()
          .required(intl.formatMessage({ id: "common.required" })),
        lastname: yup
          .string()
          .required(intl.formatMessage({ id: "common.required" })),
        phoneNumber: yup
          .number()
          .typeError(intl.formatMessage({ id: "common.onlyNumbersRequired" }))
          .required(intl.formatMessage({ id: "common.required" })),
        email: yup
          .string()
          .matches(
            EMAIL_REGEX,
            intl.formatMessage({
              id: "common.invalidEmail",
            })
          )
          .required(<FormattedMessage id="common.emailReq" />),
        acquisitionChannel: yup
          .string()
          .required(intl.formatMessage({ id: "common.acquisitionChannel" })),
      }),
      onSubmit: async (formValues) => {
        setLoader(true);
        handleRegistration(formValues);
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <InputField
            fullWidth
            label="common.firstName"
            name="firstname"
            onChange={handleChange}
            onBlur={handleBlur}
            variant="standard"
            autoComplete="off"
            value={values.firstname}
            error={Boolean(touched.firstname && errors.firstname)}
            helperText={touched.firstname && errors.firstname}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            fullWidth
            label="common.lastName"
            name="lastname"
            onChange={handleChange}
            onBlur={handleBlur}
            variant="standard"
            autoComplete="off"
            value={values.lastname}
            error={Boolean(touched.lastname && errors.lastname)}
            helperText={touched.lastname && errors.lastname}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            fullWidth
            label="common.email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            variant="standard"
            autoComplete="off"
            value={values.email}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            fullWidth
            label="common.phoneNumber"
            name="phoneNumber"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            variant="standard"
            autoComplete="off"
            value={values.phoneNumber}
            error={Boolean(touched.phoneNumber && errors.phoneNumber)}
            helperText={touched.phoneNumber && errors.phoneNumber}
          />
        </Grid>
        <Grid item={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              <FormattedMessage id="common.acquisitionChannel" />
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values.acquisitionChannel}
              label="Acquisition Channel"
              onChange={(e) => {
                setFieldValue('acquisitionChannel', e?.target?.value)
              }}
              name={<FormattedMessage id="common.acquisitionChannel" />}
              error={Boolean(touched.acquisitionChannel && errors.acquisitionChannel)}
              helperText={touched.acquisitionChannel && errors.acquisitionChannel}
            >
              {acquisitionChannelOption?.map((dropDownObj, index) => (
                <MenuItem value={dropDownObj?.value} key={index}>
                  {dropDownObj?.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} className="text-center mt-4">
        <Button
          disabled={loader || !selectedLocation || !selectedChannel}
          type="submit"
          variant="outlined"
          className="bordered-btn"
        >
          Add & Proceed
        </Button>
      </Grid>
    </form>
  );
};

export default AddCustomer;

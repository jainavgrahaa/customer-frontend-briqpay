import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { FormattedMessage, useIntl } from "react-intl";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { useDispatch, useSelector } from "react-redux";
import { createAlert } from "@/_store/alert.slice";
import TextTitle from "@/_components/atoms/TextTitle";
import { EMAIL_REGEX } from "@/_components/dynamicLayout/constants";

export function mergeCountries(res) {
  const combined = [...res.shippingCountry, ...res.billingCountry];
  const uniqueCountries = new Map();

  combined.forEach((country) => {
    uniqueCountries.set(country.id, country);
  });

  return Array.from(uniqueCountries.values());
}

const NewAddressForm = ({
  address,
  setAddress,
  isEdit,
  setIsEdit,
  initialAddress,
  fetchAddress,
  storeId,
}) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [countryData, setCountryData] = useState([]);

  const { addUserAddress, updateUserAddress, getAdditionalCountry } =
    useAuthHelper();
  const { userDetails } = useSelector((state) => state.auth);
  const intl = useIntl();

  const fetchCountryData = async () => {
    const result = await getAdditionalCountry(storeId);
    setCountryData(mergeCountries(result));
  };

  useEffect(() => {
    fetchCountryData();
  }, []);

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: address,
      enableReinitialize: true,
      validationSchema: yup.object().shape({
        firstName: yup
          .string()
          .required(intl.formatMessage({ id: "common.required" })),
        lastName: yup
          .string()
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
        phoneNumber: yup
          .number()
          .typeError(intl.formatMessage({ id: "common.onlyNumbersRequired" }))
          .required(intl.formatMessage({ id: "common.required" })),
        countryId: yup
          .string()
          .required(intl.formatMessage({ id: "common.required" })),
        postcode: yup
          .string()
          .required(intl.formatMessage({ id: "common.required" })),
        city: yup
          .string()
          .required(intl.formatMessage({ id: "common.required" })),
        address1: yup
          .string()
          .required(intl.formatMessage({ id: "common.required" })),
      }),
      onSubmit: async (formValues, { resetForm }) => {
        setLoader(true);
        if (isEdit) {
          await updateUserAddress(formValues, userDetails?.id)
            .then(async () => {
              fetchAddress();
              // Reset form values and validation state
              setAddress(initialAddress);
              resetForm();
              setIsEdit(false);
              dispatch(
                createAlert({
                  alertType: "success",
                  msg: "Address Updated successfully",
                })
              );
              setLoader(false);
            })
            .catch((error) => {
              dispatch(
                createAlert({ alertType: "error", msg: error?.message })
              );
              setLoader(false);
            });
        } else {
          await addUserAddress({
            ...formValues,
            customerId: userDetails?.id,
          })
            .then(async () => {
              fetchAddress();
              resetForm();
              dispatch(
                createAlert({
                  alertType: "success",
                  msg: "New Address Added successfully",
                })
              );
              setLoader(false);
            })
            .catch((error) => {
              dispatch(
                createAlert({ alertType: "error", msg: error?.message })
              );
              setLoader(false);
            });
        }
      },
    });

  return (
    <>
      <form className="addressPageForm" onSubmit={handleSubmit}>
        <TextTitle
          variant="h1"
          name={isEdit ? "address.editAddress" : "address.addNewAddress"}
        />
        <div className="row">
          <div className="col-md-6 inputs_col">
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              variant="standard"
              type="text"
              value={values?.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.firstName && errors.firstName}
              helperText={touched.firstName ? errors.firstName : ""}
            />
          </div>
          <div className="col-md-6  inputs_col">
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              variant="standard"
              type="text"
              value={values?.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.lastName && errors.lastName}
              helperText={touched.lastName ? errors.lastName : ""}
            />
          </div>
          <div className="col-md-6  inputs_col">
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
          <div className="col-md-6  inputs_col">
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
          <div className="col-md-6  inputs_col">
            <FormControl variant="standard" fullWidth>
              <InputLabel>Country</InputLabel>
              <Select
                name="countryId"
                value={values?.countryId}
                label="Country"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.countryId && errors.countryId}
                helperText={touched.countryId ? errors.countryId : ""}
              >
                {countryData?.map((ele) => {
                  return (
                    <MenuItem value={ele?.id} key={ele?.id}>
                      {ele?.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="col-md-6  inputs_col hidden_col">
            <TextField
              fullWidth
              label="Postcode"
              name="postcode"
              variant="standard"
              type="text"
              value={values?.postcode}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.postcode && errors.postcode}
              helperText={touched.postcode ? errors.postcode : ""}
            />
          </div>
          <div className="col-md-6  inputs_col hidden_col">
            <TextField
              fullWidth
              label="City"
              name="city"
              variant="standard"
              type="text"
              value={values?.city}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.city && errors.city}
              helperText={touched.city ? errors.city : ""}
            />
          </div>
          <div className="col-md-6  inputs_col hidden_col">
            <TextField
              fullWidth
              label="Street, house"
              name="address1"
              variant="standard"
              type="text"
              value={values?.address1}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.address1 && errors.address1}
              helperText={touched.address1 ? errors.address1 : ""}
            />
          </div>
          <LoadingButton
            type="submit"
            variant="outlined"
            className="saveChange_btn"
            loading={loader}
            disabled={Object.keys(errors).length > 0 || loader}
          >
            {`${isEdit ? "Update" : "Save"} Changes`}
          </LoadingButton>
        </div>
      </form>
    </>
  );
};

export default NewAddressForm;

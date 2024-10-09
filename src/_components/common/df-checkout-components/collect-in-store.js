import useAuthHelper from "@/_hooks/useAuthHelper";
import { createAlert } from "@/_store/alert.slice";
import { LoadingButton } from "@mui/lab";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { EMAIL_REGEX } from "@/_components/dynamicLayout/constants";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import AddressForm from "./address-form";
import {
  formattedRes,
  setInitialBillingAddress,
  setInitialShippingAddress,
} from "./collection-details";

const CollectInStore = ({
  setOpen,
  billingAddress,
  setBillingAddress,
  shippingMethodId,
  storeData,
  orderDetails,
  addressOptions,
  allowSearchByPostCode,
}) => {
  const [stores, setStores] = useState([]);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const intl = useIntl();
  
  const { getStoresForPickup, addDeliveryDetails } = useAuthHelper();

  const fetchStoreDetails = async () => {
    const result = await getStoresForPickup(storeData.objectId);
    setStores(result.data);
  };

  useEffect(() => {
    fetchStoreDetails();
  }, []);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
  } = useFormik({
    initialValues: billingAddress,
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      instorePickupId: yup.string().required("Store Name is required"),
      title: yup.string().required("Title is required"),
      firstname: yup.string().required("First Name is required"),
      lastname: yup.string().required("Last Name is required"),
      countryId: yup.string().required("Country is required"),
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
        .required("Phone Number is required"),
      address1: yup.string().required("Address is required"),
      postcode: yup.string().required("Postcode is required"),
    }),
    onSubmit: async (formValues) => {
      const payload = {
        shippingMethodId,
        instorePickupId: formValues.instorePickupId,
        billingAddressId: values.billingAddressId || undefined,
        billingAddress: values.billingAddressId
          ? undefined
          : {
              title: formValues.title,
              firstName: formValues.firstname,
              lastName: formValues.lastname,
              address1: formValues.address1,
              address2: formValues.address2,
              city: formValues.city,
              state: formValues.state,
              countryId: formValues.countryId,
              postcode: formValues.postcode,
              email: formValues.email,
              phoneNumber: formValues.phoneNumber,
            },
        specialInstructions: formValues.specialInstructions,
      };
      setLoader(true);
      addDeliveryDetails(payload, orderDetails.objectId)
        .then((result) => {
          dispatch(
            createAlert({
              alertType: "success",
              msg: "Delivery Address Updated Successfully",
            })
          );
          setBillingAddress({
            ...setInitialBillingAddress(formattedRes(result)),
            ...setInitialShippingAddress(formattedRes(result)),
          });
          setOpen(3);
          setLoader(false);
        })
        .catch((error) => {
          dispatch(createAlert({ alertType: "error", msg: error?.message }));
          setLoader(false);
        });
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="collectionDetailsFrom-wrapper">
        <div className="collectionDetailsFrom-input mb-5">
          <FormControl variant="standard" fullWidth>
            <InputLabel>Store</InputLabel>
            <Select
              name="instorePickupId"
              value={values?.instorePickupId}
              label="Store"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.instorePickupId && errors.instorePickupId}
              helperText={touched.instorePickupId ? errors.instorePickupId : ""}
            >
              <MenuItem value="" key="select">
                Select
              </MenuItem>
              {stores?.map((ele) => {
                return (
                  <MenuItem value={ele?.id} key={ele?.id}>
                    {ele?.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <>
          <p className="bold-text mb-2">Billing address</p>
          <AddressForm
            values={values}
            setValues={setValues}
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={touched}
            errors={errors}
            isShipping={false}
            storeData={storeData}
            addressOptions={addressOptions}
            showAddressForm={allowSearchByPostCode && !values.billingAddressId}
            disabled={Boolean(values.billingAddressId)}
          />
          <TextField
            fullWidth
            className="mb-3"
            label="Special Instructions"
            name="specialInstructions"
            variant="standard"
            type="text"
            value={values?.specialInstructions}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.specialInstructions && errors.specialInstructions}
            helperText={
              touched.specialInstructions ? errors.specialInstructions : ""
            }
          />
          <LoadingButton
            type="submit"
            variant="outlined"
            className="signin-btn"
            loading={loader}
          >
            Continue
          </LoadingButton>
        </>
      </div>
    </form>
  );
};

export default CollectInStore;

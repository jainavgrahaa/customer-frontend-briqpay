import useAuthHelper from "@/_hooks/useAuthHelper";
import { createAlert } from "@/_store/alert.slice";
import { LoadingButton } from "@mui/lab";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import BillingAddressForm from "./billing-address-form";
import {
  formattedRes,
  setInitialBillingAddress,
  setInitialShippingAddress,
  formattedShippingAddress,
} from "./collection-details";
import ShippingAddressForm from "./shipping-address-form";

const FreeDelivery = ({
  allowDifferentAddress,
  shippingMethodId,
  orderDetails,
  billingAddress,
  setBillingAddress,
  setOpen,
  storeData,
  addressOptions,
  allowSearchByPostCode,
  mail,
  shippingCountries,
  billingCountries,
}) => {
  const [sameBillingAndShippingAddress, setSameBillingAndShippingAddress] =
    useState(true);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const intl = useIntl();
  const { addDeliveryDetails } = useAuthHelper();

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
      ...(sameBillingAndShippingAddress
        ? {}
        : {
            title: yup
              .string()
              .required(intl.formatMessage({ id: "common.required" })),
            firstname: yup
              .string()
              .required(intl.formatMessage({ id: "common.required" })),
            lastname: yup
              .string()
              .required(intl.formatMessage({ id: "common.required" })),
            countryId: yup
              .string()
              .required(intl.formatMessage({ id: "common.required" })),
            phoneNumber: yup
              .number()
              .typeError(
                intl.formatMessage({ id: "common.onlyNumbersRequired" })
              )
              .required(intl.formatMessage({ id: "common.required" })),
            address1: yup
              .string()
              .required(intl.formatMessage({ id: "common.required" })),
            postcode: yup
              .string()
              .required(intl.formatMessage({ id: "common.required" })),
          }),
      s_title: yup
        .string()
        .required(intl.formatMessage({ id: "common.required" })),
      s_firstname: yup
        .string()
        .required(intl.formatMessage({ id: "common.required" })),
      s_lastname: yup
        .string()
        .required(intl.formatMessage({ id: "common.required" })),
      s_countryId: yup
        .string()
        .required(intl.formatMessage({ id: "common.required" })),
      s_phoneNumber: yup
        .number()
        .required(intl.formatMessage({ id: "common.required" })),
      s_address1: yup
        .string()
        .required(intl.formatMessage({ id: "common.required" })),
      s_postcode: yup
        .string()
        .required(intl.formatMessage({ id: "common.required" })),
    }),
    onSubmit: async (formValues) => {
      const getBillingAddress = () => {
        if (
          (sameBillingAndShippingAddress && values.shippingAddressId) ||
          values.billingAddressId
        ) {
          return undefined;
        }
        return sameBillingAndShippingAddress
          ? {
              title: formValues.s_title,
              firstName: formValues.s_firstname,
              lastName: formValues.s_lastname,
              address1: formValues.s_address1,
              address2: formValues.s_address2,
              city: formValues.s_city,
              state: formValues.s_state,
              countryId: formValues.s_countryId,
              postcode: formValues.s_postcode,
              email: mail,
              phoneNumber: formValues.s_phoneNumber,
            }
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
              email: mail,
              phoneNumber: formValues.phoneNumber,
            };
      };
      const payload = {
        shippingMethodId,
        instorePickupId: null,
        shippingAddressId: values.shippingAddressId || undefined,
        shippingAddress: values.shippingAddressId
          ? undefined
          : {
              title: formValues.s_title,
              firstName: formValues.s_firstname,
              lastName: formValues.s_lastname,
              address1: formValues.s_address1,
              address2: formValues.s_address2,
              city: formValues.s_city,
              state: formValues.s_state,
              countryId: formValues.s_countryId,
              postcode: formValues.s_postcode,
              email: mail,
              phoneNumber: formValues.s_phoneNumber,
            },
        billingAddressId: sameBillingAndShippingAddress
          ? values.shippingAddressId || undefined
          : values.billingAddressId || undefined,
        billingAddress: getBillingAddress(),
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
            ...setInitialShippingAddress(
              formattedShippingAddress(result),
              storeData
            ),
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
      <div className="free-delivert-wrapper">
        <ShippingAddressForm
          values={values}
          setValues={setValues}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
          storeData={storeData}
          addressOptions={addressOptions}
          showAddressForm={allowSearchByPostCode && !values.shippingAddressId}
          disabled={Boolean(values.shippingAddressId)}
          shippingCountries={shippingCountries}
        />
        <BillingAddressForm
          values={values}
          setValues={setValues}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
          storeData={storeData}
          addressOptions={addressOptions}
          showAddressForm={allowSearchByPostCode && !values.billingAddressId}
          disabled={Boolean(values.billingAddressId)}
          allowDifferentAddress={allowDifferentAddress}
          sameBillingAndShippingAddress={sameBillingAndShippingAddress}
          setSameBillingAndShippingAddress={setSameBillingAndShippingAddress}
          billingCountries={billingCountries}
        />
        <LoadingButton type="submit" variant="contained" loading={loader}>
          Continue {">"}
        </LoadingButton>
      </div>
    </form>
  );
};

export default FreeDelivery;

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import {
  setInitialBillingAddress,
  setInitialShippingAddress,
} from "./collection-details";
import SearchAddress from "./search-address";

const AddressForm = ({
  values,
  setValues,
  handleChange,
  handleBlur,
  touched,
  errors,
  prefix = "",
  isShipping = false,
  storeData,
  addressOptions,
  showAddressForm,
  disabled,
  countryOptions
}) => {
  const [show, setShow] = useState(true);

  const onChangeHandler = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      ...(isShipping
        ? setInitialShippingAddress(e)
        : setInitialBillingAddress(e)),
      shippingAddressId: isShipping ? e.id : prevValues.shippingAddressId,
      billingAddressId: !isShipping ? e.id : prevValues.billingAddressId,
    }));
    setShow(true);
  };

  return (
    <>
      <div className="row">
        {addressOptions.length ? (
          <div className="collectionDetailsFrom-input mb-3">
            <FormControl variant="standard" fullWidth>
              <InputLabel>Select Saved Address</InputLabel>
              <Select
                name={isShipping ? "shippingAddressId" : "billingAddressId"}
                label="Select Saved Address"
                value={
                  isShipping
                    ? values.shippingAddressId
                    : values.billingAddressId
                }
                onChange={(e) => onChangeHandler(e.target.value)}
              >
                <MenuItem value="" key="select" />
                {addressOptions?.map((ele) => {
                  return (
                    <MenuItem value={ele} key={ele?.id}>
                      {ele?.address1 + ", " + ele.address2 + ", " + ele.city}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        ) : null}
        <div className="col-lg-2 col-md-12">
          <FormControl variant="standard" fullWidth>
            <InputLabel>Title</InputLabel>
            <Select
              name={`${prefix}title`}
              className="mb-3"
              value={values?.[`${prefix}title`]}
              label="Title"
              onChange={handleChange}
              disabled={disabled}
              onBlur={handleBlur}
              error={touched[`${prefix}title`] && errors[`${prefix}title`]}
              helperText={
                touched[`${prefix}title`] ? errors[`${prefix}title`] : ""
              }
            >
              <MenuItem value="Mr">Mr.</MenuItem>
              <MenuItem value="Ms">Ms.</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="col-lg-5 col-md-12">
          <TextField
            fullWidth
            label="Name"
            className="mb-3"
            name={`${prefix}firstname`}
            variant="standard"
            type="text"
            value={values?.[`${prefix}firstname`]}
            onChange={handleChange}
            disabled={disabled}
            onBlur={handleBlur}
            error={
              touched[`${prefix}firstname`] && errors[`${prefix}firstname`]
            }
            helperText={
              touched[`${prefix}firstname`] ? errors[`${prefix}firstname`] : ""
            }
          />
        </div>
        <div className="col-lg-5 col-md-12">
          <TextField
            fullWidth
            label="Surname"
            className="mb-3"
            name={`${prefix}lastname`}
            variant="standard"
            type="text"
            value={values?.[`${prefix}lastname`]}
            onChange={handleChange}
            disabled={disabled}
            onBlur={handleBlur}
            error={touched[`${prefix}lastname`] && errors[`${prefix}lastname`]}
            helperText={
              touched[`${prefix}lastname`] ? errors[`${prefix}lastname`] : ""
            }
          />
        </div>
      </div>
      {show && (
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <TextField
              fullWidth
              className="mb-3"
              label="Address Line 1"
              name={`${prefix}address1`}
              variant="standard"
              type="text"
              value={values?.[`${prefix}address1`]}
              onChange={handleChange}
              disabled={disabled}
              onBlur={handleBlur}
              error={
                touched[`${prefix}address1`] && errors[`${prefix}address1`]
              }
              helperText={
                touched[`${prefix}address1`] ? errors[`${prefix}address1`] : ""
              }
            />
          </div>
          <div className="col-lg-6 col-md-12">
            <TextField
              fullWidth
              className="mb-3"
              label="Address Line 2"
              name={`${prefix}address2`}
              variant="standard"
              type="text"
              value={values?.[`${prefix}address2`]}
              onChange={handleChange}
              disabled={disabled}
              onBlur={handleBlur}
            />
          </div>
          <div className="col-lg-6 col-md-12">
          <div className="collectionDetailsFrom-input mb-4">
            <FormControl variant="standard" fullWidth>
              <InputLabel>Country</InputLabel>
              <Select
                name={`${prefix}countryId`}
                label="Country"
                value={values?.[`${prefix}countryId`]}
                onChange={handleChange}
                error={touched[`${prefix}countryId`] && errors[`${prefix}countryId`]}
                helperText={
                  touched[`${prefix}countryId`] ? errors[`${prefix}countryId`] : ""
                }
              >
                <MenuItem value="" key="select" />
                {countryOptions?.map((ele) => {
                  return (
                    <MenuItem value={ele?.id} key={ele?.id}>
                      {ele?.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <TextField
              fullWidth
              className="mb-3"
              label="State"
              name={`${prefix}state`}
              variant="standard"
              type="text"
              value={values?.[`${prefix}state`]}
              onChange={handleChange}
              disabled={disabled}
              onBlur={handleBlur}
            />
          </div>
          <div className="col-lg-6 col-md-12">
            <TextField
              fullWidth
              className="mb-3"
              label="City"
              name={`${prefix}city`}
              variant="standard"
              type="text"
              value={values?.[`${prefix}city`]}
              onChange={handleChange}
              disabled={disabled}
              onBlur={handleBlur}
            />
          </div>
          <div className="col-lg-6 col-md-12">
            <TextField
              fullWidth
              label="Email"
              variant="standard"
              type="text"
              className="mb-3"
              name={`${prefix}email`}
              value={values?.[`${prefix}email`]}
              onChange={handleChange}
              disabled={disabled}
              onBlur={handleBlur}
              error={touched[`${prefix}email`] && errors[`${prefix}email`]}
              helperText={
                touched[`${prefix}email`] ? errors[`${prefix}email`] : ""
              }
            />
          </div>
          <div className="col-lg-6 col-md-12">
            <TextField
              fullWidth
              label="Phone Number"
              name={`${prefix}phoneNumber`}
              value={values?.[`${prefix}phoneNumber`]}
              variant="standard"
              type="text"
              onChange={handleChange}
              disabled={disabled}
              onBlur={handleBlur}
              className="mb-3"
              error={
                touched[`${prefix}phoneNumber`] &&
                errors[`${prefix}phoneNumber`]
              }
              helperText={
                touched[`${prefix}phoneNumber`]
                  ? errors[`${prefix}phoneNumber`]
                  : ""
              }
            />
          </div>
          <div className="col-lg-6 col-md-12">
            <TextField
              fullWidth
              label="Postcode"
              className="mb-3"
              variant="standard"
              type="text"
              name={`${prefix}postcode`}
              value={values?.[`${prefix}postcode`]}
              onChange={handleChange}
              disabled={disabled}
              onBlur={handleBlur}
              error={
                touched[`${prefix}postcode`] && errors[`${prefix}postcode`]
              }
              helperText={
                touched[`${prefix}postcode`] ? errors[`${prefix}postcode`] : ""
              }
            />
          </div>
        </div>
      )}
      {disabled && (
        <p
          className="billing-address cursorP semi-bold mt-3"
          onClick={() => {
            setValues((prevValues) => ({
              ...prevValues,
              ...(isShipping
                ? setInitialShippingAddress()
                : setInitialBillingAddress()),
              billingAddressId: "",
              shippingAddressId: "",
            }));
            setShow(true);
          }}
        >
          Add New Address
        </p>
      )}
      {showAddressForm && !disabled && (
        <SearchAddress
          setValues={setValues}
          setShow={setShow}
          show={show}
          prefix="s_"
        />
      )}
    </>
  );
};

export default AddressForm;

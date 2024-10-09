import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import AddressForm from "./address-form";

const BillingAddressForm = ({
  allowDifferentAddress,
  setValues,
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
  setSameBillingAndShippingAddress,
  sameBillingAndShippingAddress,
  addressOptions,
  storeData,
  showAddressForm,
  disabled,
  billingCountries
}) => {
  const onChangeHandler = (e) => {
    setSameBillingAndShippingAddress(!sameBillingAndShippingAddress);
  };
  return (
    <>
      <FormGroup className="mb-3">
        <p className="bold-text billing-address billable-add">
          Billing address
        </p>
      </FormGroup>
      <FormControlLabel
        disabled={!allowDifferentAddress}
        name=""
        control={
          <Checkbox
            checked={sameBillingAndShippingAddress}
            onChange={onChangeHandler}
          />
        }
        label="My billing and shipping address are same"
      />
      {!sameBillingAndShippingAddress && (
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
          showAddressForm={showAddressForm}
          disabled={disabled}
          countryOptions={billingCountries}
        />
      )}
    </>
  );
};

export default BillingAddressForm;

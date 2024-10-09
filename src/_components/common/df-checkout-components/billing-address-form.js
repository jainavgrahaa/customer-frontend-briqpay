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
        label="My delivery and billing addresses are the same."
      />
      <p>To ship your order to a delivery address that is different from your billing address we will require you to provide additional documents for verification. We will be in contact via email after you place your order.</p>
      {!sameBillingAndShippingAddress && (
        <>
         <h3 className="mt-4">Delivery Address</h3>
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
        </>
      )}
    </>
  );
};

export default BillingAddressForm;

import AddressForm from "./address-form";

const ShippingAddressForm = ({
  values,
  setValues,
  handleChange,
  handleBlur,
  touched,
  errors,
  storeData,
  addressOptions,
  showAddressForm,
  disabled,
  shippingCountries
}) => {
  return (
    <>    
      <AddressForm
        values={values}
        setValues={setValues}
        handleChange={handleChange}
        handleBlur={handleBlur}
        touched={touched}
        errors={errors}
        isShipping={true}
        storeData={storeData}
        addressOptions={addressOptions}
        prefix={"s_"}
        showAddressForm={showAddressForm}
        disabled={disabled}
        countryOptions={shippingCountries}
      />
    </>
  );
};

export default ShippingAddressForm;

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  FormHelperText,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { useDispatch, useSelector } from "react-redux";
import { createAlert } from "@/_store/alert.slice";
import { FormattedMessage, useIntl } from "react-intl";
import { EMAIL_REGEX } from "@/_components/dynamicLayout/constants";
import { mergeCountries } from "@/_components/molecules/NewAddressForm";

const initialAddress = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  countryId: "",
  postcode: "",
  city: "",
  address1: "",
  isDefaultAddress: false,
};

const CreateAcoount = ({
  storeId,
  setEditAddress = false,
  initialV,
  fetchAddress,
  isEditAddress,
  setShowCreateAcc,
  onSuccess
}) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [messageupdate, setMessageupdate] = useState("");
  const [radioValue, setRadioValue] = useState(
    initialV?.isDefaultAddress ? "Yes" : "No"
  );
  const [countryData, setCountryData] = useState(null);
  const { userDetails } = useSelector((state) => state.auth);
  const intl = useIntl();
  const { addUserAddress, updateUserAddress, getAdditionalCountry } =
    useAuthHelper();

  const fetchCountryData = async () => {
    const result = await getAdditionalCountry(storeId);
    setCountryData(mergeCountries(result));
  };

  useEffect(() => {
    fetchCountryData();
  }, []);

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialV || initialAddress,
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      firstName: yup.string()
      .min(1, <FormattedMessage id="common.addressbookfnerror" />)
      .max(32, <FormattedMessage id="common.addressbookfnerror" />)
      .required(<FormattedMessage id="common.addressbookfnerror" />),
      lastName: yup.string()
      .min(1, <FormattedMessage id="common.addressbooklnerror" />)
      .max(32, <FormattedMessage id="common.addressbooklnerror" />)
      .required(<FormattedMessage id="common.addressbooklnerror" />),
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
        .typeError(<FormattedMessage id="common.onlyNumbersRequired" />)
        .required(<FormattedMessage id="common.phoneNumberRequired" />),
      countryId: yup.string().required(<FormattedMessage id="common.selectCountry" />),
      postcode: yup.string()
      .min(2, <FormattedMessage id="common.postcodelimit" />)
      .max(10, <FormattedMessage id="common.postcodelimit" />)
      .required(<FormattedMessage id="common.postcodelimit" />),
      city: yup.string()
      .min(2, <FormattedMessage id="common.cityerrorlimit" />)
      .max(128, <FormattedMessage id="common.cityerrorlimit" />)
      .required(<FormattedMessage id="common.cityerrorlimit" />),
      address1: yup.string()
      .min(3, <FormattedMessage id="common.addresserrorlimit" />)
      .max(128, <FormattedMessage id="common.addresserrorlimit" />)
      .required(<FormattedMessage id="common.addresserrorlimit" />),
    }),
    onSubmit: async (formValues, { resetForm }) => {
      setLoader(true);
      if (isEditAddress) {
        await updateUserAddress(formValues, userDetails?.id)
          .then(async () => {
            resetForm();
            setMessageupdate(<FormattedMessage id="df.addressUpdateMsg" />)
            if (fetchAddress) {
              await fetchAddress();
              setEditAddress(false);
            } else {
              setEditAddress(false);
            }
            setLoader(false);
          })
          .catch((error) => {
            dispatch(createAlert({ alertType: "error", msg: error?.message }));
            setEditAddress(false);
            setLoader(false);
          });
      } else {
        await addUserAddress({
          ...formValues,
          customerId: userDetails?.id,
        })
          .then(async () => {
            setShowCreateAcc(false);
            setLoader(false);
          })
          .catch((error) => {
            dispatch(createAlert({ alertType: "error", msg: error?.message }));
            setLoader(false);
          });
      }
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="myaccount-right-side">
        <h2 className="mb-4">
          <FormattedMessage id="address.addressBookEntries" />
        </h2>
        <h4 className={`${initialV ? "mb-4" : "mb-2"}`}>
          {initialV ? "Edit Address" : "Add New Address"}
        </h4>
        <div className="row form-dark-feilds">
          <div className="col-xl-6 col-lg-6 col-sm-12 col-12 mb-3">
            <TextField
              fullWidth
              label={
                <span>
                  <FormattedMessage id={"common.firstName"} /> <span className="required">*</span>
                </span>
              }
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
          <div className="col-xl-6 col-lg-6 col-sm-12 col-12 mb-3">
            <TextField
              fullWidth
              label={
                <span>
                  <FormattedMessage id={"common.lastName"} /> <span className="required">*</span>
                </span>
              }
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
          <div className="col-xl-6 col-lg-6 col-sm-12 col-12 mb-3">
            <TextField
              fullWidth
              label={
                <span>
                  <FormattedMessage id={"common.email"} /> <span className="required">*</span>
                </span>
              }
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
              label={
                <span>
                  <FormattedMessage id={"common.phoneNumber"} /> <span className="required">*</span>
                </span>
              }
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
          <div className="col-xl-6 col-lg-6 col-sm-12 col-12 mb-3">
            <FormControl variant="standard" fullWidth error={touched.countryId && Boolean(errors.countryId)}>
              <InputLabel>
                <FormattedMessage id="common.country" /> <span className="required">*</span>
              </InputLabel>
              <Select
                name="countryId"
                value={values?.countryId}
                label="Country"
                disabled={!countryData}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {countryData?.map((ele) => {
                  return (
                    <MenuItem value={ele?.id} key={ele?.id}>
                      {ele?.name}
                    </MenuItem>
                  );
                })}
              </Select>
              {touched.countryId && errors.countryId && (
                <FormHelperText>{errors.countryId}</FormHelperText>
              )}
            </FormControl>
          </div>
          <div className="col-xl-6 col-lg-6 col-sm-12 col-12 mb-3">
            <TextField
              fullWidth
              label={
                <span>
                  <FormattedMessage id={"common.postcode"} /> <span className="required">*</span>
                </span>
              }
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
          <div className="col-xl-6 col-lg-6 col-sm-12 col-12 mb-3">
            <TextField
              fullWidth
              label={
                <span>
                  <FormattedMessage id={"common.city"} /> <span className="required">*</span>
                </span>
              }
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
          <div className="col-xl-6 col-lg-6 col-sm-12 col-12 mb-3">
            <TextField
              fullWidth
              label={
                <span>
                  <FormattedMessage id={"common.streethouse"} /> <span className="required">*</span>
                </span>
              }
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
          <div className="col-xl-12 col-lg-12 col-sm-12 col-12 mb-4 mt-2">
            <div className="d-flex align-items-center">
              <p className="radio-heading mr-15 f-16 mb-0">
                <FormattedMessage id="common.defaultAddress" />:
              </p>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Yes"
                name="radio-buttons-group"
                className="add-address-radio-btn"
                value={radioValue}
                onChange={(e) => {
                  setRadioValue(e.target.value);
                  setFieldValue(
                    "isDefaultAddress",
                    e.target.value === "Yes" ? true : false
                  );
                }}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-sm-12 col-12 mb-3">
            {!messageupdate &&
            <Button
              variant="contained"
              onClick={() => handleSubmit()}
              disabled={Object.keys(errors).length > 0 || loader}
            >
              {initialV ? "Update" : "Save"}
            </Button>
            }
            {messageupdate && <p className="success-message f-16 mb-30">{messageupdate}</p>}
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateAcoount;

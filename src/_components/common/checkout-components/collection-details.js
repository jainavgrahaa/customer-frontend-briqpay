import { useEffect, useRef, useState } from "react";
import FreeDelivery from "./free-delivery";
import { stepCheck } from "@/_utils";
import useAuthHelper from "@/_hooks/useAuthHelper";
import CollectInStore from "./collect-in-store";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { FormattedMessage } from "react-intl";

export const formattedRes = (res) => {
  const orderPayment = res?.orderPayment[0]?.payment?.address;
  const instructions = res?.orderSpecialInstruction?.[0].instructions;
  const instorePickupId = res.orderShipping?.[0]?.instorePickupId;
  return {
    ...orderPayment,
    specialInstructions: instructions,
    instorePickupId: instorePickupId,
  };
};

export const formattedShippingAddress = (res) => {
  return {
    ...res.orderShipping?.[0]?.address,
  };
};

export const setInitialBillingAddress = (a) => ({
  city: a?.city || "",
  state: a?.state || "",
  address1: a?.address1 || "",
  address2: a?.address2 || "",
  postcode: a?.postcode || "",
  title: a?.title || "",
  firstname: a?.firstName || "",
  lastname: a?.lastName || "",
  countryId: a?.countryId || "",
  // email: a?.email || "",
  phoneNumber: a?.phoneNumber || "",
  specialInstructions: a?.specialInstructions || "",
  instorePickupId: a?.instorePickupId || "",
});

export const setInitialShippingAddress = (a) => ({
  s_city: a?.city || "",
  s_state: a?.state || "",
  s_address1: a?.address1 || "",
  s_address2: a?.address2 || "",
  s_postcode: a?.postcode || "",
  s_title: a?.title || "",
  s_firstname: a?.firstName || "",
  s_lastname: a?.lastName || "",
  s_countryId: a?.countryId || "",
  // s_email: a?.email || "",
  s_phoneNumber: a?.phoneNumber || "",
});

const CollectionDetails = ({
  open,
  setOpen,
  orderDetails,
  storeData,
  mail,
  deviceTypeServer,
  storeId
}) => {
  const allowSearchByPostCode = true;
  const [shippingMethods, setShippingMethods] = useState({});
  const [toggleState, setToggleState] = useState(1);
  const [addressOptions, setAddressOptions] = useState([]);
  const [shippingCountries, setShippingCountries] = useState(null)
  const [billingCountries, setBillingCountries] = useState(null)
  const [billingAddress, setBillingAddress] = useState({
    ...setInitialBillingAddress(),
    ...setInitialShippingAddress(),
  });
  const [loading, setLoading] = useState(true);
  const { getAllShippingMethod, getDeliveryDetails, getUserAllAddress, getAdditionalCountry } =
    useAuthHelper();
  const toggleTab = (index) => {
    setToggleState(index);
  };

  const fetchDeliveryDetails = async () => {
    setLoading(true);
    const res = await getDeliveryDetails(orderDetails.objectId);
    if (res?.orderPayment?.length) {
      setBillingAddress({
        ...setInitialBillingAddress(formattedRes(res)),
        ...setInitialShippingAddress(formattedShippingAddress(res)),
        shippingMethodType: res.orderShipping?.[0]?.shippingMethodType?.type,
      });
      if (open === 2) {
        setOpen(3);
      }
    } else {
      setOpen(2);
    }
    setLoading(false);
  };

  const fetchData = async () => {
    const result = await getAllShippingMethod(storeData.objectId);
    const val = {};
    result.data.forEach((ele) => {
      val[ele.type] = ele.id;
    });
    setShippingMethods(val);
  };

  const fetchAddressOptions = async () => {
    const res = await getUserAllAddress();
    setAddressOptions(res || []);
  };

  const fetchAdditionalCountry = async () => {
    const res = await getAdditionalCountry(storeId);
    setShippingCountries(res.shippingCountry)
    setBillingCountries(res.billingCountry)
  }

  useEffect(() => {
    if (open === 2) {
      fetchData();
    }
  }, [open]);

  useEffect(() => {
    fetchDeliveryDetails();
    fetchAddressOptions();
    fetchAdditionalCountry()
  }, []);

  if ((!Object.keys(shippingMethods) && !shippingCountries && !billingCountries) || loading) return null;

  return (
<>
      {open === 2 && storeData ? (
        <>
          {/* <ul className="bloc-tabs">
            {Object.keys(shippingMethods)?.includes("pickup") && (
              <li
                className={
                  stepCheck(toggleState, 1)
                    ? "tabs active-tabs mob_menu"
                    : "tabs"
                }
                onClick={() => toggleTab(1)}
              >
                <span />
                Collect in Store
              </li>
            )}
            {Object.keys(shippingMethods)?.includes("shipping") && (
              <li
                className={
                  stepCheck(toggleState, 2)
                    ? "tabs active-tabs mob_menu"
                    : "tabs"
                }
                onClick={() => toggleTab(2)}
              >
                <span /> Free Insured Delivery
              </li>
            )}
          </ul> */}
          <FormControl component="fieldset">
            <FormLabel component="legend"><FormattedMessage id="collection.shippingMethods"/></FormLabel>
            <RadioGroup
              className="bloc-tabs"
              sx={{
                display: "flex",
                flexDirection: "row",
                gap:
                  deviceTypeServer === "mobile"
                    ? "0px !important"
                    : "60px !important",
                margin: "10px 0px 35px 0px !important",
              }}
              value={toggleState}
              onChange={(event) => toggleTab(parseInt(event.target.value, 10))}
            >
              {Object.keys(shippingMethods)?.includes("pickup") && (
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label="Collect in Store"
                  className={stepCheck(toggleState, 1) ? " mob_menu" : ""}
                />
              )}
              {orderDetails?.orderType?.name !== "Internal Order" && Object.keys(shippingMethods)?.includes("shipping") && (
                <FormControlLabel
                  value={2}
                  control={<Radio />}
                  label="Free Insured Delivery"
                  className={stepCheck(toggleState, 2) ? "mob_menu" : ""}
                />
              )}
            </RadioGroup>
          </FormControl>
          <div className="content-tabs container">
            <div
              className={
                stepCheck(toggleState, 1) ? "active-content" : "content"
              }
            >
              <section className="follow-us-sec">
                <div className="thumbNail">
                  <CollectInStore
                    setOpen={setOpen}
                    shippingMethodId={shippingMethods["pickup"]}
                    storeData={storeData}
                    billingAddress={billingAddress}
                    setBillingAddress={setBillingAddress}
                    orderDetails={orderDetails}
                    addressOptions={addressOptions}
                    allowSearchByPostCode={allowSearchByPostCode}
                    mail={mail}
                    billingCountries={billingCountries}
                  />
                </div>
              </section>
            </div>

            <div
              className={
                stepCheck(toggleState, 2) ? "active-content" : "content"
              }
            >
              <FreeDelivery
                allowDifferentAddress={storeData?.allowDifferentAddress}
                setOpen={setOpen}
                shippingMethodId={shippingMethods["shipping"]}
                storeData={storeData}
                setBillingAddress={setBillingAddress}
                orderDetails={orderDetails}
                billingAddress={billingAddress}
                addressOptions={addressOptions}
                allowSearchByPostCode={allowSearchByPostCode}
                mail={mail}
                shippingCountries={shippingCountries}
                billingCountries={billingCountries}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="row">
          <div className="col-lg-9 col-md-12">
            <p className="bold-text mt-2">
              {billingAddress?.shippingMethodType === "shipping"
                ? "Free Shipping"
                : "InStore"}
            </p>
            <p className="light-text mt-2">{billingAddress?.city}</p>
            <p className="light-text mt-2">
              {billingAddress?.address1 + ", " + billingAddress?.address2}
            </p>
          </div>
          <div className="col-lg-3 col-md-12 btn-wrapper">
            <button
              type="button"
              className="btn"
              onClick={() => {
                setOpen(2);
              }}
            >
             <FormattedMessage id="common.edit"/>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CollectionDetails;

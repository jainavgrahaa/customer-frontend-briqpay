import { useEffect, useState } from "react";
import FreeDelivery from "./free-delivery";
import useAuthHelper from "@/_hooks/useAuthHelper";
import {Button} from "@mui/material";

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
  heading,
  open,
  setOpen,
  orderDetails,
  storeData,
  mail,
  storeId
}) => {
  const allowSearchByPostCode = true;
  const [shippingMethods, setShippingMethods] = useState({});
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

  const fetchAdditionalCountry = async () => {
    const res = await getAdditionalCountry(storeId);
    setShippingCountries(res.shippingCountry)
    setBillingCountries(res.billingCountry)
  }

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
    <div className="checkout-child-wrapper checkout-address">
      {open === 2 && storeData ? (
        <>
          <h4 className="regular">{heading}</h4>
          <FreeDelivery
            // allowDifferentAddress={storeData?.allowDifferentAddress}
            allowDifferentAddress={"false"}
            setOpen={setOpen}
            shippingMethodId={shippingMethods["shipping"]}
            storeData={storeData}
            setBillingAddress={setBillingAddress}
            orderDetails={orderDetails}
            billingAddress={billingAddress}
            addressOptions={addressOptions}
            allowSearchByPostCode={allowSearchByPostCode}
            main={mail}
            shippingCountries={shippingCountries}
            billingCountries={billingCountries}
          />
        </>
      ) : (
        <div className="row checkout-child-wrapper">
          <div className="col-lg-9 col-md-12">
            <p className="semi-bold mt-2">
              Free Shipping
            </p>
            <p className="mb-0">{billingAddress?.city}</p>
            <p className="mb-0">
              {billingAddress?.address1 + ", " + billingAddress?.address2}
            </p>
          </div>
          <div className="col-lg-3 col-md-12 btn-wrapper">
            <Button
              type="button"
              variant="outlined"
              onClick={() => {
                setOpen(2);
              }}
            >
              Edit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionDetails;

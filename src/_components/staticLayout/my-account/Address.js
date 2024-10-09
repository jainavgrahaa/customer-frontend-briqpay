import ExistingAddress from "@/_components/common/myAccount/address/ExistingAddress";
import NewAddressForm from "@/_components/molecules/NewAddressForm";
import useAuthHelper from "@/_hooks/useAuthHelper";
import React, { useEffect, useState } from "react";

const initialAddress = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  countryId: "",
  postcode: "",
  city: "",
  address1: "",
};

const Address = ({ storeId }) => {
  const [address, setAddress] = useState(initialAddress);
  const [isEdit, setIsEdit] = useState(false);
  const [allAddress, setAllAddress] = useState([]);
  const { getUserAllAddress } = useAuthHelper();

  const fetchAddress = async () => {
    const result = await getUserAllAddress();
    setAllAddress(result);
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  const refreshAddress = () => {
    fetchAddress();
  };

  return (
    <div>
      <div className="addressPage">
        <div className="row">
          <div className="col-md-8">
            <div className="address-form-wrapper">
              <NewAddressForm
                address={address}
                setAddress={setAddress}
                setIsEdit={setIsEdit}
                isEdit={isEdit}
                initialAddress={initialAddress}
                fetchAddress={fetchAddress}
                storeId={storeId}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="address-wrapper">
              <ExistingAddress
                allAddress={allAddress}
                setAllAddress={setAllAddress}
                setIsEdit={setIsEdit}
                setAddress={setAddress}
                refreshAddress={refreshAddress}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;

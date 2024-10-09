import React, { useState } from "react";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { useDispatch, useSelector } from "react-redux";
import { createAlert } from "@/_store/alert.slice";
import { LoadingButton } from "@mui/lab";
import { FormattedMessage } from "react-intl";

const ExistingAddress = ({
  allAddress,
  setAllAddress,
  setIsEdit,
  setAddress,
  refreshAddress,
}) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const { deleteUserAddressById, updateUserAddress } = useAuthHelper();
  const { userDetails } = useSelector((state) => state.auth);

  const deleteHandler = async (id) => {
    setLoader(true);
    await deleteUserAddressById(id, userDetails?.id)
      .then(() => {
        const filterAddress = allAddress?.filter((ele) => ele?.id !== id);
        setAllAddress(filterAddress);
        dispatch(
          createAlert({
            alertType: "success",
            msg: "Address Deleted successfully",
          })
        );
        setLoader(false);
      })
      .catch((error) =>
        dispatch(createAlert({ alertType: "error", msg: error.message }))
      );
  };

  const editHandler = async (row) => {
    setIsEdit(true);
    setAddress({
      firstName: row?.firstName,
      lastName: row?.lastName,
      email: row?.email,
      phoneNumber: row?.phoneNumber,
      countryId: row?.countryId,
      postcode: row?.postcode,
      city: row?.city,
      address1: row?.address1,
      id: row?.id,
    });
  };

  const updateDefaultAddress = async (values) => {
    const payload = {
      firstName: values?.firstName,
      lastName: values?.lastName,
      email: values?.email,
      phoneNumber: values?.phoneNumber,
      countryId: values?.countryId,
      postcode: values?.postcode,
      city: values?.city,
      address1: values?.address1,
      id: values?.id,
      isDefaultAddress: true,
    };
    await updateUserAddress(payload, userDetails?.id);
    dispatch(
      createAlert({
        alertType: "success",
        msg: "Default Address Updated successfully",
      })
    );
    refreshAddress();
  };

  if (allAddress?.length === 0) {
    return <p>No addresses found</p>;
  }

  return allAddress?.map((ele, index) => (
    <div className="adressStyle" key={`${index}`}>
      <label className="radio-label">
        <input
          type="radio"
          className="radio-input"
          name="addressSelection"
          checked={ele.isDefaultAddress}
          disabled={ele.isDefaultAddress}
          onClick={() =>
            updateDefaultAddress({ ...ele, isDefaultAddress: true })
          }
        />
        <span className="custom-radio" />
        <div className="radio-btn-text">
          <div className="d-flex flex-column">
            <p className="name">{ele?.firstName + " " + ele?.lastName}</p>
            <p className="address">
              {ele?.address1}, {ele?.city}, {ele?.state}{ele?.state ? ',' : ''} {ele?.country?.name}
            </p>
            <p className="number">{ele?.phoneNumber}</p>
          </div>
          <div className="d-flex gap-3">
            <button
              className="editbutton"
              type="button"
              onClick={() => editHandler(ele)}
            >
              <FormattedMessage id="common.edit"/>
            </button>
            <LoadingButton
              className="deletbutton"
              type="button"
              loading={loader}
              onClick={() => deleteHandler(ele?.id)}
            >
              <FormattedMessage id="common.delete"/>
            </LoadingButton>
          </div>
        </div>
      </label>
    </div>
  ));
};

export default ExistingAddress;

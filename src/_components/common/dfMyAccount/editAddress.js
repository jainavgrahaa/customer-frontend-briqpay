import useAuthHelper from "@/_hooks/useAuthHelper";
import { createAlert } from "@/_store/alert.slice";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import CreateAcoount from "./account";
import { Button } from "@mui/material";

const EditAddress = ({ storeId }) => {
  const [editAddress, setEditAddress] = useState(false);
  const [showCreateAcc, setShowCreateAcc] = useState(false);
  const [loader, setLoader] = useState(false);
  const [allAddress, setAllAddress] = useState(null);
  const { userDetails } = useSelector((state) => state.auth);
  const { deleteUserAddressById, getUserAllAddress } = useAuthHelper();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const fetchAddress = async () => {
    setLoader(true);
    const result = await getUserAllAddress();
    setAllAddress(result || []);
    setLoader(false);
  };

  useEffect(() => {
    fetchAddress();
  }, [showCreateAcc]);

  const editHandler = (row) => {
    setEditAddress({
      firstName: row?.firstName,
      lastName: row?.lastName,
      email: row?.email,
      phoneNumber: row?.phoneNumber,
      countryId: row?.countryId,
      postcode: row?.postcode,
      city: row?.city,
      address1: row?.address1,
      id: row?.id,
      isDefaultAddress: row?.isDefaultAddress,
    });
  };

  const deleteHandler = async (id) => {
    setLoader(true);
    setMessage("");
    await deleteUserAddressById(id, userDetails?.id)
      .then(() => {
        setMessage(<FormattedMessage id="common.adressdeletestatus" />);
        fetchAddress();
      })
      .catch((error) => {
        dispatch(createAlert({ alertType: "error", msg: error.message }));
        setLoader(false);
      });
  };
  const handleNewAddressSuccess = () => {
    setMessage(<FormattedMessage id="df.addressAddStatus" />);
    fetchAddress();
  };
  if (!allAddress) {
    return (
      <div className="address-book">
        <h2>
          <FormattedMessage id="address.editAddress" />
        </h2>
        <p className="mt-4 mb-4">Loading...</p>
      </div>
    );
  }

  return (
    <>
      {!showCreateAcc ? (
        <>
          {!allAddress.length ? (
            <div className="address-book">
              <h2 className="mb-4">
                <FormattedMessage id="address.editAddress" />
              </h2>
              <p className="mb-40 f-16">
                <FormattedMessage id="address.noAddress" />
              </p>
            </div>
          ) : null}
          {allAddress.length ? (
            <>
              {editAddress ? (
                <CreateAcoount
                  setEditAddress={setEditAddress}
                  isEditAddress
                  initialV={editAddress}
                  fetchAddress={fetchAddress}
                  storeId={storeId}
                  onSuccess={handleNewAddressSuccess}
                />
              ) : (
                <div className="address-book-entries">
                  <h2 className="mb-30">
                    <FormattedMessage id="address.addressBookEntries" />
                  </h2>
                  {message && <p className="success-message f-16 mb-30">{message}</p>}
                  <div className="row">
                    {allAddress?.map((ele) => (
                      <>
                        <div className="col-xl-6 col-lg-6 col-sm-12 mb-30 d-flex flex-column justify-content-between">
                          <div className="address-book-address mb-4">
                            <p className="mb-1 f-16">
                              {ele?.firstName} {ele?.lastName}
                            </p>
                            <p className="mb-1 f-16">
                              {ele?.address1}, {ele?.address2}
                            </p>
                            <p className="mb-1 f-16">{ele?.city}</p>
                            <p className="mb-1 f-16">{ele?.country?.name}</p>
                            <p className="mb-1 f-16">
                              {ele?.isDefaultAddress ? "Default Address" : ""}
                            </p>
                            <Button
                              variant="text"
                              disabled={loader}
                              className="edit-btn icon-rounded"
                              onClick={() => editHandler(ele)}
                            >
                              <span class="material-icons-outlined f-18">
                                edit
                              </span>
                            </Button>
                          </div>
                          <div className="book-entries-buttons">
                            <Button
                              variant="outlined"
                              disabled={loader}
                              className="delete-btn brown-color-outlined"
                              onClick={() => deleteHandler(ele?.id)}
                              fullWidth
                            >
                              <FormattedMessage id="common.delete" />
                            </Button>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : null}

          {!editAddress ? (
            <Button
              onClick={() => setShowCreateAcc(true)}
              variant="contained"
              fullWidth
            >
              + <FormattedMessage id="address.addNewAddress" />
            </Button>
          ) : null}
        </>
      ) : (
        <CreateAcoount setShowCreateAcc={setShowCreateAcc} storeId={storeId} onSuccess={handleNewAddressSuccess} />
      )}
    </>
  );
};

export default EditAddress;

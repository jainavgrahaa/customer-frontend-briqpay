import Modal from "@/_components/modal";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuthHelper from "@/_hooks/useAuthHelper";
import DeleteAccount from "../../account/DeleteAccount";
import { userDetail } from "@/_store/auth.slice";

const EmailPref = ({ storeId }) => {
  const [showCustomModal, setshowCustomModal] = useState(false);
  const { userDetails } = useSelector((state) => state.auth);
  const { updateUserDetails } = useAuthHelper();
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    setshowCustomModal(false);
  };
  const handleOpenModal = () => {
    setshowCustomModal(true);
  };

  const handleSubscription = async (isSubscribe) => {
    const payload = {
      id: userDetails.id,
      isKlaviyoSubscribe: isSubscribe,
    };

    await updateUserDetails(payload);
    dispatch(
      userDetail({
        ...userDetails,
        isKlaviyoSubscribe: isSubscribe,
      })
    );
  };

  return (
    <>
      <div className="emailPreference">
        <h2>Email Preferences</h2>
        {userDetails?.isKlaviyoSubscribe ? (
          <button className="subscribed" disabled>
            <span className="material-icons-outlined">check</span>Subscribed
          </button>
        ) : (
          <button
            className="subscribed"
            onClick={() => handleSubscription(true)}
          >
            Subscribe
          </button>
        )}
        <p>
          By joining our email list, you will be the first to know about
          exciting new designs, special events, store openings and much more.
        </p>
        {userDetails?.isKlaviyoSubscribe && (
          <button
            className="unsubscribe"
            onClick={() => handleSubscription(false)}
          >
            Unsubscribe
          </button>
        )}
        <button onClick={handleOpenModal} className="deleteAcc btn">
          Delete account
        </button>
      </div>
      {showCustomModal && (
        <Modal
          onClose={handleCloseModal}
          title="Delete your account?"
          handleSubmit={"#"}
          isOpen={showCustomModal}
          cancelText="Back"
          okText="Next"
          className="delete-ac-modal"
        >
          <DeleteAccount storeId={storeId} />
        </Modal>
      )}
    </>
  );
};

export default EmailPref;

import { Button } from "@mui/material";
import { useState } from "react";
import DetailsModal from "./details-modal";
import Modal from "@/_components/modal";
import TellUsModalComponent from "./tell-us-modal";
import Head from "next/head";

export const DETAILS_MODAL = "details-modal";

const TellUsModal = ({
  isOpen,
  setIsOpen,
  handleCloseModal,
  storeId,
  translateId,
}) => {
  const [userDetails, setUserDetails] = useState({});
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/assets/css/bespoke.css" />
      </Head>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        onSubmit={handleCloseModal}
        okText="Submit"
        title="Tell us your idea..."
        className="bespoke-form-modal"
      >
        {isOpen === true ? (
          <TellUsModalComponent
            setIsOpen={setIsOpen}
            setUserDetails={setUserDetails}
          />
        ) : null}
        {isOpen === DETAILS_MODAL ? (
          <DetailsModal
            setIsOpen={setIsOpen}
            storeId={storeId}
            translateId={translateId}
            uDetails={userDetails}
          />
        ) : null}
      </Modal>
    </>
  );
};

export default TellUsModal;

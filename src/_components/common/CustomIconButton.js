import React , {useState} from "react";
import { IconButton } from "@mui/material";
import Modal from "@/_components/modal";
import Share from "@/_components/common/modal-info-content/share";
const CustomIconButton = () => {
  const [modalOpen,setmodalOpen] = useState(false);
  const handleCloseModal = () => {
    setmodalOpen(false);
  };
  return (
    <>
      <div className="d-flex justify-content-end">
      <IconButton color="primary" aria-label="Share" className="cursorP" onClick={()=>setmodalOpen(true)}>
        <span className="material-icons-outlined">share</span>
      </IconButton>
      <IconButton color="primary" aria-label="Favourite" className="cursorP">
        <span className="material-icons-outlined">favorite_border</span>
      </IconButton>
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCloseModal}
        okText="OK"
        subtitle={"Share Link"}
        className="info-modal-content modal-xs align-items-center"
      >
        <>
            <Share/>
        </>
      </Modal>
    </>
  );
};

export default CustomIconButton;

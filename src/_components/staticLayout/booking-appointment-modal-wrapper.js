import React, { useState } from "react";
import BookAppointmentModal from "./book-appointment-modal";
import VirtualAppointmentModal from "./virtual-appointment-modal";

const BookAppointmentModalWrapper = ({
  closeButtonModal,
  translateId,
  storeId,
}) => {
  const [isVirtualModalOpen, setIsVirtualModalOpen] = useState(false);
  return (
    <>
      {isVirtualModalOpen ? (
        <VirtualAppointmentModal
          storeId={storeId}
          openButtonModal
          closeButtonModal={closeButtonModal}
          translateId={translateId}
        />
      ) : (
        <BookAppointmentModal
          storeId={storeId}
          openButtonModal
          closeButtonModal={closeButtonModal}
          translateId={translateId}
          setIsVirtualModalOpen={setIsVirtualModalOpen}
        />
      )}
    </>
  );
};

export default BookAppointmentModalWrapper;

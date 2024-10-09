import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@/_components/modal";
import VirtualAppointmentModal from "./virtual-appointment-modal";
import BookAppointmentModalWrapper from "./booking-appointment-modal-wrapper";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { getCookie } from "cookies-next";
import { TOKEN_KEY } from "@/_utils/userToken";

const SelectAppointmentModal = ({
  openButtonModal,
  closeButtonModal,
  storeId,
  translateId,
}) => {
  const [selectedAppointmentType, setSelectedAppointmentType] = useState(null);
  const [appointmentModes, setAppointmentModes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { getAppointmentModes } = useAuthHelper();
  const handleAppointmentTypeClick = (id) => {
    setSelectedAppointmentType(id);
  };

  const handleStepForm = () => {
    setIsModalOpen(selectedAppointmentType);
    setSelectedAppointmentType(null);
  };

  const handleCloseButtonClick = () => {
    setIsModalOpen(false);
    closeButtonModal();
  };

  const fetchAppointmentModes = async () => {
    setLoading(true);
    const res = await getAppointmentModes(translateId);
    setAppointmentModes(res);
    setLoading(false);
  };

  useEffect(() => {
    if (translateId && getCookie(TOKEN_KEY)) {
      fetchAppointmentModes();
    }
  }, [translateId, getCookie(TOKEN_KEY)]);

  return (
    <>
      {openButtonModal && (
        <Modal
          onClose={closeButtonModal}
          title="Select an Appointment Type"
          handleSubmit={"#"}
          onNext={handleStepForm}
          isOpen={openButtonModal}
          nextText="Next"
          Modaltype={"StepModal"}
          className="appointment-modal"
          disableNext={!selectedAppointmentType}
        >
          <div className="appointment_type-form-sec mb-4">
            <div className="appointemnt-description-text mb-5">
              <Typography variant="body2" component="p" className="text-center">
                Schedule a free consultation with one of our Jewellery Experts.
                We offer both in-store and virtual appointments.
              </Typography>
            </div>
            <div className="row">
              {!loading && !appointmentModes?.length ? (
                <div className="text-center">
                  No Appointment Modes Available
                </div>
              ) : null}
            </div>
            <div className="row">
              {loading ? (
                <div className="text-center">Loading...</div>
              ) : (
                appointmentModes?.map((ele) => (
                  <div
                    className="col-md-12 col-sm-12 col-xl-6 col-lg-6"
                    key={ele.appointmentModeType}
                  >
                    <div
                      className={`appointment-type-box ${
                        selectedAppointmentType === ele.appointmentModeType
                          ? "card-active"
                          : ""
                      }`}
                      onClick={() => {
                        handleAppointmentTypeClick(ele.appointmentModeType);
                      }}
                    >
                      <div className="appointment-type-img">
                        <img src={ele.image} alt={ele.appointmentModeType} />
                      </div>
                      <div className="appointment-type-cntnt">
                        <h6 className="mb-1">{ele.appointmentModeType}</h6>
                        <p>{ele.appointmentModedescription}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </Modal>
      )}
      {isModalOpen === "In Store" && (
        <BookAppointmentModalWrapper
          storeId={storeId}
          openButtonModal
          closeButtonModal={handleCloseButtonClick}
          translateId={translateId}
        />
      )}
      {isModalOpen === "Virtual" && (
        <VirtualAppointmentModal
          storeId={storeId}
          openButtonModal
          closeButtonModal={handleCloseButtonClick}
          translateId={translateId}
        />
      )}
    </>
  );
};

export default SelectAppointmentModal;

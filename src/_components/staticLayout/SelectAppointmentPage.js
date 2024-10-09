import React, { useEffect, useState } from "react";
import Head from "next/head";
import Typography from "@mui/material/Typography";
import Modal from "@/_components/modal";
import VirtualAppointmentModal from "./virtual-appointment-modal";
import BookAppointmentModalWrapper from "./booking-appointment-modal-wrapper";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { getCookie } from "cookies-next";
import { TOKEN_KEY } from "@/_utils/userToken";
import { Button } from "@mui/material";
import BookAppointmentPage from "./book-appointment-page";
import VirtualAppointmentPage from "./VirtualAppointmentPage";
import { storeTypes } from "@/_utils";
import { FormattedMessage } from "react-intl";
import DFTalkToExpert from "@/_components/common/DFTalkToExpert";

const SelectAppointmentPage = ({
  openButtonModal,
  closeButtonModal,
  storeId,
  translateId,
  domain
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
      <Head>
        <link rel="stylesheet" href="/assets/css/appointment-forms.css" />
      </Head>
      <div className={`appointment-modal ${storeTypes[domain] === "ab" ? "ab-appointment-page" : storeTypes[domain] === "df" ? "df-appointment-page" : "" }`}>
        <div className="appointment_type-form-sec mb-4">
          {isModalOpen === false &&
            <>
              <div className="inner-banner-theme">
                <div className="container">
                  {storeTypes[domain] === "df" &&
                  <h1 className="text-center"><FormattedMessage id="common.appointmentType" /></h1>
                  }
                  {storeTypes[domain] === "ab" &&
                  <h2 className="text-center mb-30"><FormattedMessage id="common.appointmentType" /></h2>
                  }
                  <p className="text-center">
                    <FormattedMessage id="common.appointmentDescription" />
                  </p>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  {!loading && !appointmentModes?.length ? (
                    <div className="text-center mt-5 mb-5">
                      <p className="f-16">No Appointment Modes Available</p>
                    </div>
                  ) : null}
                </div>
                <div className="row">
                  {loading ? (
                    <div className="text-center mt-5 mb-5"><p className="f-16">Loading...</p></div>
                  ) : (
                    appointmentModes?.map((ele) => (
                      <div
                        className="col-md-12 col-sm-12 col-xl-6 col-lg-6"
                        key={ele.appointmentModeType}
                      >
                        <div
                          className={`appointment-type-box ${selectedAppointmentType === ele.appointmentModeType
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
                {!loading && appointmentModes?.length &&
                  <div className="row">
                    <div className="col-sm-12 text-right mt-30 mb-30">
                      <Button
                        variant="outlined"
                        size="large"
                        className={"next-step-btn brown-color-outlined"}
                        onClick={() => handleStepForm(1)}
                        disabled={!selectedAppointmentType}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                }
              </div>
            </>
          }
          {isModalOpen === "In Store" && (
            <BookAppointmentPage
              storeId={storeId}
              translateId={translateId}
              setIsModalOpen={setIsModalOpen}
              storeTypes = {storeTypes}
              domain = {domain}
            />
          )}
          {isModalOpen === "Virtual" && (
            <VirtualAppointmentPage
              storeId={storeId}
              openButtonModal
              closeButtonModal={handleCloseButtonClick}
              translateId={translateId}
              setIsModalOpen={setIsModalOpen}
              storeTypes = {storeTypes}
              domain = {domain}
            />
          )}
          {storeTypes[domain] === "df" &&
          <DFTalkToExpert/>
          }
        </div>
      </div>
    </>
  );
};

export default SelectAppointmentPage;

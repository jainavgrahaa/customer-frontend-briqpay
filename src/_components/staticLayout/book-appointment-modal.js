/* eslint-disable @next/next/no-css-tags */
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Modal from "@/_components/modal";
import AppointmentCalendar from "@/_components/common/AppointmentCalendar";
import StepForm from "@/_components/common/StepForm";
import CustomCard from "@/_components/common/cards/CustomCard";
import CustomButton from "@/_components/common/CustomButton";
import LocationDetail from "@/_components/common/cards/LocationDetail";
import ThankYou from "@/_components/common/ThankYou";
import AppointmentForm from "@/_components/common/account/AppointmentForm";
import { stepCheck } from "@/_utils";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { useFormik } from "formik";
import * as yup from "yup";
import { FormattedMessage, useIntl } from "react-intl";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { createAlert } from "@/_store/alert.slice";
import useDeviceHelper from "@/_hooks/useDeviceHelper";
import { useRouter } from "next/router";
import { EMAIL_REGEX } from "../dynamicLayout/constants";
import { getCookie } from "cookies-next";
import { TOKEN_KEY } from "@/_utils/userToken";

const BookAppointmentModal = ({
  openButtonModal,
  closeButtonModal,
  translateId,
  storeId,
  setIsVirtualModalOpen,
}) => {
  const [appointmentStep, setAppointmentStep] = useState(1);
  const [isCardActive, setIsCardActive] = useState(null);
  const [storeOptions, setStoreOptions] = useState([]);
  const [selectedStore, setSelectedStore] = useState();
  const [appointmentModeId, setAppointmentModeId] = useState();
  const [selectedService, setSelectedService] = useState();
  const [servicesOptions, setServicesOptions] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [timeSlots, setTimeSlots] = useState([]);
  const [activeSlots, setActiveSlots] = useState([]);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const intl = useIntl();
  const dispatch = useDispatch();
  const { deviceType } = useDeviceHelper();
  const { userDetails } = useSelector((state) => state.auth);
  const router = useRouter();
  const tokenKey = getCookie(TOKEN_KEY);

  const {
    getAppointmentModes,
    getStoreLocations,
    getServices,
    addAppointment,
    getTimeSlots,
  } = useAuthHelper();

  const handleCustomCard = (val) => {
    setIsCardActive(val);
  };

  const fetchAppointmentModes = async () => {
    setLoading(true);
    const res = await getAppointmentModes(translateId);
    setAppointmentModeId(
      res?.find((ele) => ele.appointmentModeType === "In Store")
        ?.appointmentModeOptions[0]?.id
    );
    setLoading(false);
  };

  const fetchStoreLocations = async (locationPart) => {
    setLoading(true);
    const res = await getStoreLocations(storeId);
    setStoreOptions(res);
    const t = res?.filter(
      (ele) => ele?.id === locationPart || ele?.name === locationPart
    );
    if (locationPart && t) {
      setSelectedStore(t?.[0]);
    } else {
      setSelectedStore(res?.[0]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (tokenKey && translateId) {
      const { hash } = window?.location;
      let locationPart = "";
      if (hash) {
        locationPart = hash?.substring(hash?.indexOf("?") + 1);
        if (locationPart.startsWith("#")) {
          locationPart = "";
        }
      }
      fetchAppointmentModes();
      fetchStoreLocations(locationPart);
    }
  }, [router.asPath, translateId, tokenKey]);

  const handleClose = () => {
    setAppointmentStep(1);
    setIsCardActive(null);
    setSelectedService(null);
    setSelectedDate(new Date());
    setSelectedTimeSlot(null);
    setChecked(false);
    closeButtonModal();
  };

  const fetchServices = async () => {
    setLoading(true);
    const res = await getServices(
      selectedStore.id,
      appointmentModeId,
      translateId
    );
    setServicesOptions(res || []);
    setLoading(false);
  };

  useEffect(() => {
    if (appointmentStep === 3 && deviceType === "mobile") {
      setAppointmentStep(appointmentStep + 1);
    }
  }, [selectedTimeSlot]);

  useEffect(() => {
    if (appointmentStep === 2 && !servicesOptions) {
      fetchServices();
    }
  }, [appointmentStep]);

  const fetchTimeSlots = async () => {
    const res = await getTimeSlots(
      selectedStore.id,
      dayjs(selectedDate).format("YYYY-MM-DD"),
      selectedService.id,
      appointmentModeId
    );
    setActiveSlots(Object.values(res) || []);
    setTimeSlots(
      Object.keys(res).map((ele) =>
        dayjs(selectedDate)
          .set("hour", ele.slice(0, 2))
          .set("minute", ele.slice(3))
          .set("second", 0)
      )
    );
  };

  useEffect(() => {
    if (
      selectedStore?.id &&
      selectedDate &&
      selectedService?.id &&
      appointmentModeId
    ) {
      fetchTimeSlots();
    }
  }, [selectedDate, selectedService, selectedStore]);

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        message: "",
      },
      validationSchema: yup.object().shape({
        firstName: yup
          .string()
          .required(intl.formatMessage({ id: "common.required" })),
        lastName: yup
          .string()
          .required(intl.formatMessage({ id: "common.required" })),
        email: yup
          .string()
          .matches(
            EMAIL_REGEX,
            intl.formatMessage({
              id: "common.invalidEmail",
            })
          )
          .required(<FormattedMessage id="common.emailReq" />),
        phoneNumber: yup
          .number()
          .typeError(intl.formatMessage({ id: "common.onlyNumbersRequired" }))
          .required(intl.formatMessage({ id: "common.required" })),
      }),
    });

  const handleStepForm = (e) => {
    if (appointmentStep === 4) {
      handleSubmit();
    }
    if (e === 0) {
      if (appointmentStep > 1) {
        setAppointmentStep(appointmentStep - 1);
        setSelectedTimeSlot(null);
      }
    } else if (e === 1) {
      if (
        !(
          appointmentStep === 4 &&
          values.firstName === "" &&
          values.lastName === "" &&
          values.email === "" &&
          values.phoneNumber === ""
        )
      ) {
        if (appointmentStep < 4) {
          setAppointmentStep(appointmentStep + 1);
        } else {
          const payload = {
            title: "",
            firstname: values.firstName,
            lastname: values.lastName,
            message: values.message,
            email: values.email,
            phone: values.phoneNumber,
            customerId: userDetails.id,
            locationId: selectedStore.id,
            storeId: storeId,
            date: dayjs(selectedDate).format(),
            time: dayjs(selectedTimeSlot).format(),
            durationInMinutes: selectedService?.durationInMinutes,
            state: true,
            appointmentTypeId: selectedService.id,
            appointmentModeId: appointmentModeId,
          };
          setLoading(true);
          addAppointment(payload)
            .then((res) => {
              if (res.id) {
                setAppointmentStep(appointmentStep + 1);
              } else {
                dispatch(
                  createAlert({
                    alertType: "error",
                    msg:
                      error?.message ||
                      "Something went wrong, please try again!",
                  })
                );
                setLoading(false);
              }
            })
            .catch((error) => {
              dispatch(
                createAlert({
                  alertType: "error",
                  msg:
                    error?.message || "Something went wrong, please try again!",
                })
              );
              setLoading(false);
            });
        }
      }
    }
    if (appointmentStep === 1) {
      setServicesOptions(null);
    }
  };

  return (
    <>
      {openButtonModal && (
        <Modal
          onClose={handleClose}
          title="Book an appointment"
          handleSubmit={"#"}
          onNext={handleStepForm}
          isOpen={openButtonModal}
          stepCounter={appointmentStep}
          backText={appointmentStep > 1 ? "Back" : undefined}
          disableNext={
            loading ||
            (appointmentStep === 1 && !selectedStore) ||
            (appointmentStep === 2 && !selectedService) ||
            (appointmentStep === 3 && !selectedTimeSlot) ||
            (appointmentStep === 4 && !checked) ||
            selectedStore.appointment === false
          }
          onBack={handleStepForm}
          nextText={
            stepCheck(appointmentStep, 4)
              ? "Book an Appointment"
              : deviceType === "mobile" && appointmentStep > 1
              ? undefined
              : "Next"
          }
          disableactions={stepCheck(appointmentStep, 5) ? true : false}
          Modaltype={"StepModal"}
          className="appointment-modal"
        >
          <>
            {stepCheck(appointmentStep, 5) && (
              <ThankYou
                title="Thank you!"
                content="You will receive an e-mail from us shortly with your appointment details. Please be aware that our appointments are confirmed over the phone, so you will receive a confirmation call to reserve your slot."
                secontContent={
                  "If you want to cancel your appointment at any time please let us know as soon as possible."
                }
              />
            )}
            {stepCheck(appointmentStep, 1) && (
              <>
                <StepForm
                  activeindicator={appointmentStep}
                  BAModalStatus={openButtonModal}
                  activeindexStart={1}
                />
                <div className="location-wrapper view-step-padd">
                  {loading ? (
                    <div className="w-100 text-center">Loading...</div>
                  ) : (
                    <div className="row">
                      <div className="col-md-12 col-sm-12 col-lg-8 col-xl-8">
                        <div className="calander-div">
                          <CustomButton
                            title="Select Store"
                            data={storeOptions}
                            selectStore="select-store"
                            value={selectedStore}
                            setValue={setSelectedStore}
                            msg={"No Stores Available"}
                          />
                        </div>
                      </div>
                      <div className="col-md-12 col-sm-12 col-lg-4 col-xl-4">
                        {selectedStore && (
                          <LocationDetail
                            title={selectedStore.name}
                            address={
                              selectedStore?.locationAddress?.address1 +
                              ", " +
                              selectedStore?.locationAddress?.address2
                            }
                            number={selectedStore.telephone}
                            LoclayoutFirst={true}
                            durationInMinutes={
                              selectedService?.durationInMinutes
                            }
                            selectedTimeSlot={selectedTimeSlot}
                            img={selectedStore?.imageMedia?.url}
                            isClosed={selectedStore.appointment === false}
                            setIsVirtualModalOpen={setIsVirtualModalOpen}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
            {stepCheck(appointmentStep, 2) && (
              <>
                <StepForm
                  activeindicator={appointmentStep}
                  BAModalStatus={openButtonModal}
                  activeindexStart={2}
                />
                <section className="features-card virtual-featured-card view-step-padd">
                  <div className="create-design-section">
                    <div className="choose-section">
                      {loading ? (
                        <div className="w-100 text-center">Loading...</div>
                      ) : (
                        <div className="row">
                          {servicesOptions?.appointmentsOffered?.[0]?.appointmentType?.map(
                            (ele) => {
                              return (
                                <div
                                  className="col-md-12 col-sm-12 col-lg-6 col-xl-6"
                                  key={ele.id}
                                  onClick={() => {
                                    setSelectedService(ele);
                                    if (deviceType === "mobile") {
                                      setAppointmentStep(appointmentStep + 1);
                                    }
                                  }}
                                >
                                  <CustomCard
                                    id={ele.id}
                                    data={ele}
                                    addOnClaass="virtual-box"
                                    handleClick={handleCustomCard}
                                    activeClass={`${
                                      isCardActive === ele.id
                                        ? "select-card"
                                        : ""
                                    }`}
                                  />
                                </div>
                              );
                            }
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              </>
            )}
            {stepCheck(appointmentStep, 3) && (
              <>
                <StepForm
                  activeindicator={appointmentStep}
                  BAModalStatus={openButtonModal}
                  activeindexStart={3}
                />
                <div className="calander-wrapper view-step-padd">
                  <div className="row">
                    <div className="col-md-8">
                      <div className="calander-div step3-calender">
                        <AppointmentCalendar
                          selectedDate={selectedDate}
                          setSelectedDate={setSelectedDate}
                          setSelectedTimeSlot={setSelectedTimeSlot}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <CustomButton
                        title={dayjs(selectedDate).format("LL")}
                        data={timeSlots}
                        value={selectedTimeSlot}
                        setValue={setSelectedTimeSlot}
                        msg={"No Time Slots Available"}
                        activeSlots={activeSlots}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            {stepCheck(appointmentStep, 4) && (
              <>
                <StepForm
                  activeindicator={appointmentStep}
                  BAModalStatus={openButtonModal}
                  activeindexStart={4}
                />
                <div className="appointment-form view-step-padd">
                  <div className="row">
                    <div className="col-md-8  m-order-2">
                      <div className="calander-wrapper">
                        <AppointmentForm
                          values={values}
                          touched={touched}
                          errors={errors}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          checked={checked}
                          setChecked={setChecked}
                        />
                      </div>
                    </div>
                    <div className="col-md-4  m-order-1">
                      <div className="appointment-schedule">
                        {selectedStore && selectedDate && selectedService && (
                          <LocationDetail
                            selectedDate={selectedDate}
                            title={selectedService.name}
                            address={
                              selectedStore?.locationAddress?.address1 +
                              ", " +
                              selectedStore?.locationAddress?.address2
                            }
                            number={selectedStore.telephone}
                            LoclayoutSecond={true}
                            durationInMinutes={
                              selectedService?.durationInMinutes
                            }
                            selectedTimeSlot={selectedTimeSlot}
                            img={selectedStore?.imageMedia?.url}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        </Modal>
      )}
    </>
  );
};

export default BookAppointmentModal;

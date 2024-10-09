import Head from "next/head";
import React, { useEffect, useState } from "react";
import { appointmentTime, cards } from "@/_utils/customApiData";
import Modal from "@/_components/modal";
import AppointmentCalendar from "@/_components/common/AppointmentCalendar";
import StepForm from "@/_components/common/StepForm";
import CustomCard from "@/_components/common/cards/CustomCard";
import CustomButton from "@/_components/common/CustomButton";
import ThankYou from "@/_components/common/ThankYou";
import AppointmentForm from "@/_components/common/account/AppointmentForm";
import { stepCheck } from "@/_utils";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import LocationDetail from "@/_components/common/cards/LocationDetail";
import { FormattedMessage, useIntl } from "react-intl";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { useFormik } from "formik";
import * as yup from "yup";
import dayjs from "dayjs";
import { Button, Checkbox } from "@mui/material";
import Link from "next/link";
import { createAlert } from "@/_store/alert.slice";
import { useDispatch, useSelector } from "react-redux";
import useDeviceHelper from "@/_hooks/useDeviceHelper";
import { EMAIL_REGEX } from "../dynamicLayout/constants";
import { getCookie } from "cookies-next";
import { TOKEN_KEY } from "@/_utils/userToken";

const VirtualAppointmentPage = ({
  openButtonModal,
  closeButtonModal,
  translateId,
  storeId,
  setIsModalOpen,
  domain,
  storeTypes
}) => {
  const [appointmentStep, setAppointmentStep] = useState(1);
  const [isCardActive, setIsCardActive] = useState(null);
  const [modeId, setModeId] = useState("");
  const [imgUrl, setImgUrl] = useState();
  const [modeOptions, setModeOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState(false);
  const [servicesOptions, setServicesOptions] = useState([]);
  const [selectedService, setSelectedService] = useState();
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [timeSlots, setTimeSlots] = useState([]);
  const { userDetails } = useSelector((state) => state.auth);
  const intl = useIntl();
  const dispatch = useDispatch();
  const { deviceType } = useDeviceHelper();
  const tokenKey = getCookie(TOKEN_KEY);

  const {
    getAppointmentModes,
    getVirtualAppointmentServices,
    addAppointment,
    getMediaFile,
  } = useAuthHelper();

  const handleClose = () => {
    setAppointmentStep(1);
    setIsCardActive(null);
    setSelectedService(null);
    setSelectedDate(new Date());
    setSelectedTimeSlot(null);
    setChecked(false);
    closeButtonModal();
  };

  useEffect(() => {
    if (selectedService?.image) {
      getMediaFile(selectedService.image).then((res) =>
        setImgUrl(res?.[0]?.signedUrl)
      );
    }
  }, [selectedService]);

  const fetchAppointmentModes = async () => {
    setLoading(true);
    const res = await getAppointmentModes(translateId);
    const options = res?.find(
      (ele) => ele.appointmentModeType === "Virtual"
    )?.appointmentModeOptions;
    setModeOptions(options);
    setModeId(options?.[0]?.id);
    setLoading(false);
  };

  const fetchServices = async () => {
    setLoading(true);
    const res = await getVirtualAppointmentServices(modeId, translateId);
    setServicesOptions(res?.appointmentsOffered || []);
    setLoading(false);
  };

  useEffect(() => {
    if (translateId && tokenKey) {
      fetchAppointmentModes();
    }
  }, [translateId, tokenKey]);

  useEffect(() => {
    if (appointmentStep === 2) {
      fetchServices();
    }
  }, [appointmentStep]);

  useEffect(() => {
    if (appointmentStep === 3 && deviceType === "mobile") {
      setAppointmentStep(appointmentStep + 1);
    }
  }, [selectedTimeSlot]);

  useEffect(() => {
    const dayOfWeek = dayjs(selectedDate).day();
    const durationInMinutes = selectedService?.durationInMinutes;
    if (selectedDate) {
      let openTime = dayjs(selectedDate)
        .set("hour", 10)
        .set("minute", "00")
        .set("second", 0);
      let closeTime = dayjs(selectedDate)
        .set("hour", 16)
        .set("minute", "00")
        .set("second", 0);
      if (dayOfWeek === 6) {
        openTime = dayjs(selectedDate)
          .set("hour", 11)
          .set("minute", "00")
          .set("second", 0);
        closeTime = dayjs(selectedDate)
          .set("hour", 15)
          .set("minute", "00")
          .set("second", 0);
      }
      const arr = [];
      while (
        openTime.diff(closeTime) !== 0 &&
        openTime.diff(closeTime) < 0 &&
        arr.length < 30
      ) {
        arr.push(openTime);
        openTime = dayjs(openTime).add(+durationInMinutes, "m");
      }
      setTimeSlots(arr);
    }
  }, [selectedDate, selectedService]);

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

  const handleCustomCard = (val) => {
    setIsCardActive(val);
  };

  const handleStepForm = (e) => {
    if (appointmentStep === 1) {
      handleSubmit();
    }
    if (
      values.firstName !== "" &&
      values.lastName !== "" &&
      values.email !== "" &&
      values.phoneNumber !== ""
    ) {
      if (e === 0) {
        if (appointmentStep > 1) {
          setAppointmentStep(appointmentStep - 1);
          setSelectedTimeSlot(null);
        }
      } else if (e === 1) {
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
            // locationId: selectedStore.id,
            storeId: storeId,
            date: dayjs(selectedDate).format(),
            time: dayjs(selectedTimeSlot).format(),
            durationInMinutes: selectedService?.durationInMinutes,
            state: true,
            appointmentTypeId: selectedService.id,
            appointmentModeId: modeId,
          };
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
                setLoader(false);
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
              setLoader(false);
            });
        }
      }
    }
  };

  return (
    <>
      <div className="container">
      <div className="book-appointment">
        {storeTypes[domain] === "ab" &&
        <h2 className="text-center mb-3"><FormattedMessage id="view.virtualAppointment"/></h2>
        }
        {storeTypes[domain] === "df" &&
        <h1 className="text-center mb-3"><FormattedMessage id="view.virtualAppointment"/></h1>
        }
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
              VAModalStatus={openButtonModal}
              activeindexStart={1}
            />
            <div className="appointment-form view-step-padd">
              <div className="row">
                <div className="col-md-4  m-order-1 contact-selection">
                  {!loading ? (
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={modeId}
                        name="radio-buttons-group"
                      >
                        {modeOptions?.map((ele) => (
                          <FormControlLabel
                            key={ele}
                            value={ele.id}
                            control={<Radio />}
                            label={ele.name}
                            onClick={() => setModeId(ele.id)}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  ) : (
                    <div className="w-100 text-center">Loading...</div>
                  )}
                </div>
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
              </div>
            </div>
          </>
        )}
        {stepCheck(appointmentStep, 2) && (
          <>
            <StepForm
              activeindicator={appointmentStep}
              VAModalStatus={openButtonModal}
              activeindexStart={2}
            />
            <section className="features-card virtual-featured-card view-step-padd">
              <div className="create-design-section">
                <div className="choose-section">
                  <div className="row">
                    {loading ? (
                      <div className="w-100 text-center">Loading...</div>
                    ) : (
                      servicesOptions?.[0]?.appointmentType?.map((ele) => {
                        return (
                          <div
                            className="col-md-6"
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
                              activeClass={`${isCardActive === ele.id ? "select-card" : ""
                                }`}
                            />
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
        {stepCheck(appointmentStep, 3) && (
          <>
            <StepForm
              activeindicator={appointmentStep}
              VAModalStatus={openButtonModal}
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
              VAModalStatus={openButtonModal}
              activeindexStart={4}
            />
            {/* {dataTheme === "ab" && ( */}
            <div className="VaConfirm-box-wrapper view-step-padd">
              <div className="vaconfirm-inner">
                <div className="row">
                  <div className="col-md-6 col-sm-12">
                    <div className="store-vaimg-block">
                      {imgUrl && <img src={imgUrl} alt=" " />}
                      <div className="row">
                        <div className="col-6">
                          <div className="timer-label">
                            {selectedService.name}
                          </div>
                          <div className="timer">
                            <span className="material-icons-outlined">
                              {" "}
                              schedule{" "}
                            </span>
                            {selectedService.durationInMinutes} mins
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="timer-label">
                            {" "}
                            {dayjs(selectedDate).format("LL")}{" "}
                            <span className="timer-label-span-block">
                              {dayjs(selectedTimeSlot).format("LT")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <div className="va-store-contact-data">
                      <h5>{values?.firstName + " " + values.lastName}</h5>
                      <p className="email">{values.email}</p>
                      <p className="ph-no">{values.phoneNumber}</p>
                      {values.message && (
                        <p className="decription-va">{values.message}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="account-sec-step-form">
                  <FormControlLabel
                    Name="agreeTermsAndCondition"
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={() => setChecked(!checked)}
                      />
                    }
                    label={
                      <div className="checkbox-text">
                        <span>
                          By clicking “Book appointment”, you agree to{" "}
                        </span>
                        <Link href={"/terms-and-condition"}>Terms</Link>
                        <span> & </span>
                        <Link href={"/privacy-policy"}>Privacy Policy</Link>
                      </div>
                    }
                  />
                </div>
              </div>
            </div>
            {/* )} */}
            {/* {dataTheme === "df" && (
                  <div className="VaConfirm-box-wrapper appointment-form view-step-padd">
                    <div className="vaconfirm-inner">
                      <div className="row">
                        <div className="col-md-8 col-sm-12">
                          <div className="va-store-contact-data">
                            <h5>Dia Campolmi</h5>
                            <p className="email">
                              diamante.campolmi@austenblake.com
                            </p>
                            <p className="ph-no">020 7660 1529</p>
                            <p className="decription-va">
                              Hi, I’m textplaceholder. Text message. Here I’d
                              llike to talk about engagement rings more.
                            </p>
                            <p className="decription-book-confirmation mt-4">
                              By clicking “Book appointment”, you agree to{" "}
                              <a href="#">Terms</a> and{" "}
                              <a href="#">Privacy Policy</a> .
                            </p>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-12">
                          <div className="appointment-schedule">
                            <LocationDetail LoclayoutSecond={true} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )} */}
          </>
        )}
        <div
          className="btn-actions mt-30 mb-30 d-flex"
          style={{
            justifyContent: appointmentStep >= 1 ? "space-between" : "center",
          }}
        >
          {appointmentStep !== 5 && (
            <Button
              variant="outlined"
              onClick={() => appointmentStep === 1 ? setIsModalOpen(false) : handleStepForm(0)}
              className="previous-button"
            >
              Previous
            </Button>
          )}
          {appointmentStep < 5 && (
            <Button
              variant="outlined"
              onClick={() => handleStepForm(1)}
              className="next-button"
              disabled={
                loading ||
                (appointmentStep === 2 && !selectedService) ||
                (appointmentStep === 3 && !selectedTimeSlot) ||
                (appointmentStep === 4 && !checked)
              }
            >
              {appointmentStep === 4 ? "Submit" : "Next"}
            </Button>
          )}
        </div>
      </div>
      </div>
    </>
  );
};

export default VirtualAppointmentPage;

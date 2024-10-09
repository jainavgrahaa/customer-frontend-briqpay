import React, { useState, useEffect } from "react";
import Modal from "@/_components/modal";
import useAuthHelper from "@/_hooks/useAuthHelper";
import TextTitle from '@/_components/atoms/TextTitle';
import { Grid, TextField, Button, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useFormik } from "formik";
import * as yup from "yup";
import { FormattedMessage, useIntl } from "react-intl";
import CustomFileUpload from "@/_components/common/customFileUploadButton";
import { useDispatch } from "react-redux";
import { EMAIL_REGEX } from "../dynamicLayout/constants";

const DFBespoke = ({ storeId, translateId }) => {
  const { getQuestionnaires, addBespokeEnquiries } = useAuthHelper();
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [data, setData] = useState(null);
  const [selectedValues, setSelectedValues] = useState({});
  const [file, setFile] = useState();
  const intl = useIntl();
  const dispatch = useDispatch();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  };

  useEffect(() => {
    const orderRingSizerButton = document.querySelectorAll('a[href*="#start-conversation"]');
    if (orderRingSizerButton) {
      orderRingSizerButton.forEach((button) => {
        button.addEventListener("click", () => {
          setIsSelectModalOpen(true);
        });
      });
    }
    return () => {
      if (orderRingSizerButton) {
        orderRingSizerButton.forEach((button) => {
          button.removeEventListener("click", () => {
            setIsSelectModalOpen(false);
          });
        });
      }
    };
  });

  const handleSelectCloseButtonClick = () => {
    setIsSelectModalOpen(false);
  };

  const fetchQuestionnaires = async () => {
    const res = await getQuestionnaires(storeId, translateId);
    const formattedRes = res.map((ele) => {
      if (ele.propertyType.propertyType === "list") {
        const t = ele.bespokeQuestionnaireOptions.map((ele) => ({
          id: ele.id,
          bespokeQuestionnaireId: ele.bespokeQuestionnaireId,
          name: ele.option,
          label: ele.option,
        }));
        return {
          ...ele,
          bespokeQuestionnaireOptions: t,
        };
      }
      return ele;
    });
    setData(formattedRes);
  };

  useEffect(() => {
    fetchQuestionnaires();
  }, []);

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      enableReinitialize: true,
      validationSchema: yup.object().shape({
        firstName: yup
          .string()
          .required(intl.formatMessage({ id: "common.required" })),
        lastName: yup
          .string()
          .required(intl.formatMessage({ id: "common.required" })),
        phoneNumber: yup
          .number()
          .typeError(intl.formatMessage({ id: "common.onlyNumbersRequired" }))
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
      }),
      onSubmit: async (formValues) => {
        const payload = {
          ...formValues,
          customerId: formValues.id,
          storeId: storeId
        };
        try {
          const res = await addBespokeEnquiries(payload);
          if (res?.response?.data?.error) {
            dispatch(
              createAlert({
                alertType: "error",
                msg: res.response.data.error.message,
              })
            );
          }
          else {
            dispatch(
              createAlert({
                alertType: "success",
                msg: <FormattedMessage id="bespoke.bespokeSuccess" />,
              })
            );
          }
          if (res.id) {
            uploadFile(res.id);
          }
        } catch (error) {
          dispatch(
            createAlert({
              alertType: "error",
              msg: "Something went wrong, please try again",
            })
          );
        }
      },
    });

  if (!data) return null;

  return (
    <>
      <Modal
        isOpen={isSelectModalOpen}
        onClose={handleSelectCloseButtonClick}
        onSubmit={handleSelectCloseButtonClick}
        okText="Submit"
        title="Start the Conversation"
        className="forms-modal xl-modal df-bespoke-modal"
      >
        <TextTitle name={"bespokeStartConversationModal.description"} className={"text-center"} variant={"p"} />
        <form onSubmit={handleSubmit} style={{ width: '100%', padding: '16px' }} className="form-brown-theme">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={
                  <>
                    <FormattedMessage id="common.firstName" />
                    {" *"}
                  </>
                }
                name="firstName"
                variant="standard"
                autoComplete="off"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                error={Boolean(touched.firstName && errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={
                  <>
                    <FormattedMessage id="common.lastName" />
                    {" *"}
                  </>
                }
                name="lastName"
                variant="standard"
                autoComplete="off"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                error={Boolean(touched.lastName && errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={
                  <>
                    <FormattedMessage id="email.emailAddress" />
                    {" *"}
                  </>
                }
                name="email"
                variant="standard"
                autoComplete="off"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={
                  <>
                    <FormattedMessage id="common.telePhone" />
                    {" *"}
                  </>
                }
                name="phoneNumber"
                variant="standard"
                autoComplete="off"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phoneNumber}
                error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
              />
            </Grid>
            {data?.map((ele, i) => {
              if (ele.propertyType.propertyType === "text") {
                return (
                  <Grid item xs={12} sm={12} key={ele.propertyType.propertyType + i}>
                    <label className="color-bistre-brown mb-3">
                      {ele?.question}
                    </label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      name="designLabel"
                      placeholder="Type Here *"
                      multiline
                      rows={4}
                      onChange={(e) =>
                        setSelectedValues({
                          ...selectedValues,
                          [i]: {
                            value: e.target.value,
                            bespokeQuestionnaireId: ele?.bespokeQuestionnaireId,
                          },
                        })
                      }
                    />
                  </Grid>
                );
              }
              if (ele.propertyType.propertyType === "insert") {
                return (
                  <Grid item xs={12} sm={12} key={ele.propertyType.propertyType + i}>
                    <label className="color-bistre-brown mb-3">
                      {ele?.question}
                    </label>
                    <CustomFileUpload
                      buttonType="outlined"
                      className="bistre-outlined-border color-bistre-brown border-style-dash"
                      buttonText="Browse *"
                      onChange={(newFiles) =>{
                        setSelectedValues({
                          ...selectedValues,
                          [i]: {
                            value: newFiles,
                            bespokeQuestionnaireId: ele?.bespokeQuestionnaireId,
                          },
                        });
                        setFile({
                          id: ele?.bespokeQuestionnaireTranslates?.[0]
                            ?.bespokeQuestionnaireId,
                          file: e?.target?.files?.[0],
                        })
                      }
                    }
                    />
                  </Grid>
                );
              }
              return (
                <div key={ele.propertyType.propertyType + i}>
                  {i + 1} {ele.propertyType.propertyType}
                </div>
              );
            })}
            <Grid item xs={12} sm={12}>
              <TextTitle name="common.fieldMarks" variant="p" className="mb-1 f-12" />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="enquiry"
                    control={<Radio />}
                    label={<FormattedMessage id="common.dfConcent" />}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} align="center" className="mt-4">
              <Button type="submit" variant="contained" color="primary"
                disabled={
                  Object.keys(selectedValues).length !== data.length - 1 && !file
                }>
                <FormattedMessage id="common.submit" />
              </Button>
            </Grid>
          </Grid>
        </form>
      </Modal>
    </>
  );
};

export default DFBespoke;

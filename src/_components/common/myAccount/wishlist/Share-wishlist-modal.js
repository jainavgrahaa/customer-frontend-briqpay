import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import Modal from "@/_components/modal";
import TextTitle from "@/_components/atoms/TextTitle";
import {
  Grid,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import LoaderButton from "@/_components/atoms/ActButton/LoaderButton";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { createAlert } from "@/_store/alert.slice";
import { useDispatch } from "react-redux";
import { EMAIL_REGEX } from "@/_components/dynamicLayout/constants";

const ShareWishListModal = ({ storeId, modalClose, modalOpen }) => {
  const [loader, setLoader] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const intl = useIntl();
  const dispatch = useDispatch();
  const { shareWishlist } = useAuthHelper();

  const formik = useFormik({
    initialValues: {
      friendsemail: "",
      secondfriendsemail: "",
      message: "",
      yourname: "",
      youremail: "",
      sendCopy: false,
      agree: false,
    },
    validationSchema: Yup.object().shape({
      friendsemail: Yup.string()
        .matches(
          EMAIL_REGEX,
          intl.formatMessage({
            id: "common.invalidEmail",
          })
        )
        .required(<FormattedMessage id="common.emailReq" />),
      secondfriendsemail: Yup.string().matches(
        EMAIL_REGEX,
        intl.formatMessage({
          id: "common.invalidEmail",
        })
      ),
      message: Yup.string().required("Field Required"),
      yourname: Yup.string().required("Field Required"),
      youremail: Yup.string()
        .matches(
          EMAIL_REGEX,
          intl.formatMessage({
            id: "common.invalidEmail",
          })
        )
        .required(<FormattedMessage id="common.emailReq" />),
      agree: Yup.bool().oneOf(
        [true],
        "You must accept the terms and conditions"
      ),
    }),
    onSubmit: async (values) => {
      setLoader(true);
      try {
        const payload = {
          storeId: storeId,
          friendEmail: values.friendsemail,
          secondFriendEmail: values.secondfriendsemail || "",
          message: values.message,
          isEmailCopy: values.sendCopy,
          senderName: values.yourname,
          senderEmail: values.youremail,
        };
        await shareWishlist(payload);
        setFormSubmitted(true);
      } catch (error) {
        dispatch(
          createAlert({
            alertType: "error",
            msg:
              error?.response?.data?.error?.message ||
              "Something went wrong, Please try again!",
          })
        );
      } finally {
        setLoader(false);
      }
    },
  });

  useEffect(() => {
    () => {
      setFormSubmitted(false);
    };
  }, []);

  return (
    <>
      <Modal
        isOpen={modalOpen}
        onClose={modalClose}
        okText="OK"
        title={
          formSubmitted ? "Your wishlist has been sent!" : "Share your wishlist"
        }
        className="info-modal-content"
      >
        <div className="m-auto" style={{ maxWidth: "740px" }}>
          <div className="light-grey-bg-4">
            {!formSubmitted ? (
              <>
                <TextTitle
                  name={"common.shareDescription"}
                  className={"text-center"}
                  variant={"p"}
                />
                <form
                  onSubmit={formik.handleSubmit}
                  style={{ width: "100%", padding: "16px" }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        variant="standard"
                        name="friendsemail"
                        label="Friend’s email"
                        value={formik.values.friendsemail}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.friendsemail &&
                          Boolean(formik.errors.friendsemail)
                        }
                        helperText={
                          formik.touched.friendsemail &&
                          formik.errors.friendsemail
                        }
                        type="email"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        variant="standard"
                        name="secondfriendsemail"
                        label="Second friend's email (optional)"
                        value={formik.values.secondfriendsemail}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.secondfriendsemail &&
                          Boolean(formik.errors.secondfriendsemail)
                        }
                        helperText={
                          formik.touched.secondfriendsemail &&
                          formik.errors.secondfriendsemail
                        }
                        type="email"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        variant="standard"
                        name="message"
                        label="Message"
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.message &&
                          Boolean(formik.errors.message)
                        }
                        helperText={
                          formik.touched.message && formik.errors.message
                        }
                        type="text"
                        rows={2}
                        multiline
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="sendCopy"
                              checked={formik.values.sendCopy}
                              onChange={formik.handleChange}
                            />
                          }
                          label="Send me a copy of this email"
                        />
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        variant="standard"
                        name="yourname"
                        label="Your name"
                        value={formik.values.yourname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.yourname &&
                          Boolean(formik.errors.yourname)
                        }
                        helperText={
                          formik.touched.yourname && formik.errors.yourname
                        }
                        type="text"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        variant="standard"
                        name="youremail"
                        label="Your email"
                        value={formik.values.youremail}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.youremail &&
                          Boolean(formik.errors.youremail)
                        }
                        helperText={
                          formik.touched.youremail && formik.errors.youremail
                        }
                        type="email"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="agree"
                              checked={formik.values.agree}
                              onChange={formik.handleChange}
                            />
                          }
                          label={
                            <>
                              <FormattedMessage id="common.agree" />{" "}
                              <Link
                                href="/terms-and-condition"
                                className="light-blue-link-color"
                              >
                                {" "}
                                <FormattedMessage id="common.terms" />
                              </Link>{" "}
                              <FormattedMessage id="common.smallAndText" />{" "}
                              <Link
                                href="/privacy-policy"
                                className="light-blue-link-color"
                              >
                                <FormattedMessage id="common.privacyPolicy" />.
                              </Link>
                            </>
                          }
                        />
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} sm={12} className="text-center mt-4">
                      <LoaderButton name="common.send" loader={loader} />
                    </Grid>
                    <Grid item xs={12} sm={12} className="text-center mt-2">
                      <Button variant="outlined">
                        <FormattedMessage id="btn.DiscoverOurDesign" />
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </>
            ) : (
              <div className="text-center">
                <Button variant="outlined" onClick={() => modalClose()}>
                  <FormattedMessage id="common.Close" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ShareWishListModal;

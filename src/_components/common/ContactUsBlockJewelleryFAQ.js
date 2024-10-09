import React from "react";
import { Button } from "@mui/material";
import { FormattedMessage } from "react-intl";

const ContactUsBlockJewelleryFAQ = (extraClass = "") => {
  return (
    <div className={`contact-us-block ${!!extraClass.keys ? extraClass : ""}`} style={{marginTop:"60px"}}>
      <h4 className="subtitle mb-5"><FormattedMessage id="common.questionHelp" /></h4>
      <div className="faq-contact-detail">
        <div className="email-detail"><a href="mailto:service@austenblake.com?subject=Questions? We can help">service@austenblake.com</a></div>
        <div className="contact-detail"><a href="tel:020 7660 1529">020 7660 1529</a></div>
      </div>
      <Button variant="outlined" href="#select-appointment">
        <span className="material-icons-outlined">calendar_month</span>
        <FormattedMessage id="common.bookApp" />
      </Button>
    </div>
  );
};

export default ContactUsBlockJewelleryFAQ;

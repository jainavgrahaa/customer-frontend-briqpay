import React from "react";
import { Button } from "@mui/material";
import { FormattedMessage } from "react-intl";

const ContactUsBlock = (props) => {
  return (
    <div className={`contact-us-block-data mb-5`}>
      <h4 className="subtitle mb-0"><FormattedMessage id="common.questionHelp" /></h4>
      <div className="faq-contact-detail">
        <div className="email-detail"><a href={`mailto:${props?.email}?subject=Questions? We can help`}>{props?.email}</a></div>
        <div className="contact-detail"><a href={`tel:${props?.phoneNumber}`}>{props?.phoneNumber}</a></div>
      </div>
      <Button variant="outlined" href="#select-appointment">
        <span className="material-icons-outlined">calendar_month</span>
        <FormattedMessage id="common.bookApp" />
      </Button>
    </div>
  );
};

export default ContactUsBlock;

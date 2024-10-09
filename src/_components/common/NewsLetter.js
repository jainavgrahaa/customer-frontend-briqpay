import React from "react";
import NewsLetterForm from "./NewsLetterForm";
import { FormattedMessage } from "react-intl";

const NewsLetter = () => {
  return (
    <div className="text-sec">
      <h3 className="heading">
        <FormattedMessage id="newsletter.subscribeTo" />
        <i>  <FormattedMessage id="newsletter" /></i>
      </h3>
      <p>
      <FormattedMessage id="newsletter.desc" />
      </p>
      <NewsLetterForm buttonLabel="Subscribe" fLabel="First Name" />
      <div className="form-container"></div>
    </div>
  );
};

export default NewsLetter;

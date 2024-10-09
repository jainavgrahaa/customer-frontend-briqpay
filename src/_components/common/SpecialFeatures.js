/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";

const SpecialFeatures = () => {
  return (
    <section className="special-feature-sec">
      <div className="container">
        <div className="special-features-container">
          <div className="special-features-box">
            EXCELLENT 4.9/5
            <img
              src="/assets/icons/raw-svgs/trust-pilot-logo.svg"
              className="ms-2"
            />
          </div>
          <div className="special-features-box">
            <img
              className="me-2"
              src="/assets/icons/raw-svgs/finance-icon.svg"
            />
            0% FINANCE AVAILABLE
          </div>
          <div className="special-features-box">
            <img
              className="me-2"
              src="/assets/icons/raw-svgs/return-icon.svg"
            />
            60-DAYS EXTENDED RETURNS
          </div>
          <div className="special-features-box">
            <img
              className="me-2"
              src="/assets/icons/raw-svgs/resize-icon.svg"
            />
            FREE RESIZING
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialFeatures;

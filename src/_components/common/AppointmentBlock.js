/* eslint-disable @next/next/no-img-element */
import React from "react";
import { FormattedMessage } from "react-intl";

//Material
import { Button } from "@mui/material";
import Link from "next/link";

const AppointmentBlock = () => {
  return (
    <section className="book-appoint-sec ">
      <div className="container">
        <div className="sec-In">
          <div className="book-app-tl">
            <h2 className="p24">
              <img src="/assets/images/austen-and-blake-logo.png" alt="" />
            </h2>
            <p className="p16"> <FormattedMessage id="appointment.heading" /></p>
          </div>
          <div className="book-app-links">
            <Link href="#" className="link-primary regular">
              020 7660 1529
            </Link>
            <Link href="#" className="link-primary regular">
              service@austenblake.com
            </Link>
          </div>
          <div className="book-app-action">
            <Button variant="outlined" sx={{ mt: 3, mb: 2 }} size="large" href="#select-appointment">
              <span className="material-icons-outlined">calendar_month</span>              
              <FormattedMessage id="common.bookApp" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentBlock;

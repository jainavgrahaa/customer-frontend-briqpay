/* eslint-disable @next/next/no-img-element */
import React from "react";

//Material
import { Button } from "@mui/material";

const ContactUsNewBlock = () => {
  return (
    <section className="footer-contact-us">
      <div className="contact-us-with-logo">
        <div className="contact-us">
          <div className="book-app-tl">
            <h2>Contact Us</h2>
            <p>Our Jewellery Experts are here to help</p>
          </div>
          <div className="book-app-action">
            <Button variant="outlined" sx={{ mt: 3, mb: 2 }} size="large" href="tel:020 7660 1529">
              <svg>
                <use href={`/assets/icons/icons.svg#phone_call`} />
              </svg>
              020 7660 1529
            </Button>
            <Button variant="outlined" sx={{ mt: 3, mb: 2 }} size="large" href="mailto:service@austenblake.com">
              <svg>
                <use href={`/assets/icons/icons.svg#mail_icon`} />
              </svg>
              service@austenblake.com
            </Button>
            <Button variant="outlined" sx={{ mt: 3, mb: 2 }} size="large" href="#select-appointment">
              <span className="material-icons-outlined">calendar_month</span>
              Book an appointment
            </Button>
          </div>
        </div>
        <div className="ab-logo">
          <img src="/assets/images/austen-and-blake-logo.png" alt="" />
        </div>
      </div>
    </section>
  );
};

export default ContactUsNewBlock;

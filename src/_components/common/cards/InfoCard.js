import React from "react";
import Link from "next/link";

const InfoCard = () => {
  return (
      <div className="shipping-info">
        <div className="shipping-info-title">
          <h2>Shipping Info</h2>
        </div>
        <div className="shipping-info-content">
          <div className="estimated-delivery-date-subheading">
            Estimated delivery date:
          </div>
          <div className="estimated-date">
            <span className="material-icons-outlined icons-small">event</span>
            <span>18th - 25th of August, 2022</span>
          </div>
          <div className="questions-section">
            <h4>Questions? We can help.</h4>
            <div className="contact-options">
              <p>
                <Link href="mailto:service@austenblake.com">
                  service@austenblake.com
                </Link>
              </p>
              <p>020 7660 1529</p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default InfoCard;

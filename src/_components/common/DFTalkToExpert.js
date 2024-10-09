import React from "react";
import { FormattedMessage } from "react-intl";
import Link from "next/link";
const DFTalkToExpert = () => {
  return (
    <>
      <div className="talk-to-jewellary">
          <h2 className="text-center">
            <FormattedMessage id="dfCart.jewelleryexperts" />
          </h2>
        <div className="jewellary-expert-icons">
          <div className="icon-wrapper">
            <img
              className="expert-chat-icon"
              src="/assets/images/diamond-factory/cart/chat.png"
              alt="chat-icon"
            />
            <p className="mb-0 f-16"><FormattedMessage id="common.chatnow" /></p>
          </div>
          <Link href={"tel:02071383672 "} className="icon-wrapper">
            <img
              className="expert-chat-icon"
              src="/assets/images/diamond-factory/cart/phone-call.png"
              alt="chat-icon"
            />
            <p className="mb-0 f-16"><FormattedMessage id="common.callus" /><span className="d-block">02071383672</span></p>
          </Link>
            <Link href={"#select-appointment"} className="icon-wrapper">
            <img
              className="expert-chat-icon"
              src="/assets/images/diamond-factory/cart/calendar.png"
              alt="chat-icon"
            />
              <p className="mb-0 f-16">
              <FormattedMessage id="dfCart.visitshowroom" />
              <span className="d-block"><FormattedMessage id="common.BookAnAppointment" /></span>
              </p>
            </Link>
        </div>
      </div>
    </>
  );
};

export default DFTalkToExpert;

import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useAuthHelper from "@/_hooks/useAuthHelper";

const DfContact = () => {
  const [location, setLocation] = useState(null);
  const pathname = usePathname();
  const { getByLocationName } = useAuthHelper();
  useEffect(() => {
    getByLocationName(pathname.replace("/viewings/", "")).then((res) => {
      setLocation(res?.data[0]);
    });
  }, []);
  return (
    <div className="contact-us-component">
      <div className="contact-us-heading">
        <h2 className="mb-2"> {location !== undefined ? <FormattedMessage id="common.ContactUs" /> : <FormattedMessage id="contact.ourExpertsInfo" />}</h2>
      </div>
      <div className="contact-us-icons">
        <div className="icon-wrapper">
          <img
            className="expert-chat-icon"
            src="/assets/images/diamond-factory/cart/chat.png"
            alt="chat-icon"
          />
          <Link href={"https://api.whatsapp.com/send?phone=0758 484 4383"} className="f-16 regular"><FormattedMessage id="contact.whatsappUs" /> <br/> 0758 484 4383</Link>
        </div>
        <div className="icon-wrapper">
          <img
            className="expert-chat-icon"
            src="/assets/images/diamond-factory/cart/phone-call.png"
            alt="chat-icon"
          />
          <Link href={`tel:${location?.telephone || "0203 011 0151"}`} className="f-16 regular"><FormattedMessage id="common.callUs" /> <br/> {location?.telephone || "0203 011 0151"}</Link>
        </div>
        <div className="icon-wrapper">
          <img
            className="expert-chat-icon"
            src="/assets/images/diamond-factory/cart/message.png"
            alt="chat-icon"
          />
          <Link href={"mailto:service@diamondsfactory.co.uk"} className="f-16 regular"><FormattedMessage id="email.heading" /> <br/> service@diamondsfactory.co.uk</Link>
        </div>
      </div>
    </div>
  );
};

export default DfContact;

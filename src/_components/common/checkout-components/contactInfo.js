import React from "react";
import GuestCustomer from "./guest-customer";
import RegisteredCustomer from "./registered-customer";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";

const ContactInfo = ({ heading, name, mail, phone, open, setOpen, storeId }) => {
  const router = useRouter();
  return (
    <>
      {open === 1 ? (
        <div className="guest-container col-lg-12 col-md-12 mb-5">
         <GuestCustomer setOpen={setOpen} />
         <RegisteredCustomer setOpen={setOpen} storeId={storeId} />
        </div>
      ) : (
        <div className="checkout-child-wrapper">
          <h3>{heading}</h3>
          <div className="row">
            <div className="col-lg-9 col-md-12">
              <p className="bold-text">{name}</p>
              <p className="light-text mt-2">{mail}</p>
              <p className="light-text mt-2">{phone}</p>
            </div>
            <div className="col-lg-3 col-md-12 btn-wrapper">
              <button
                type="button"
                className="btn"
                onClick={() => {
                  router.push('/my-account');
                }}
              >
               <FormattedMessage id="common.edit"/>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactInfo;

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { FormattedMessage } from "react-intl";

const ClientsLogos = ({ certificates }) => {
  console.warn(certificates);
  return (
    <section className="clients-logo-sec">
      <div className="DF-client-container">
        <h6 className="color-white mb-0 f-14"><FormattedMessage id="common.ourcertificatetitle" /></h6>
        <ul className="cara-logos client-logos">
          {certificates?.map(({ iconsLink, alt, link }, index) => {
            return (
              <li key={index}>
                <Link href={link} target="_blank">
                  <img
                    src={iconsLink || "assets/images/menu/mens-rings.png"}
                    alt={alt}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default ClientsLogos;

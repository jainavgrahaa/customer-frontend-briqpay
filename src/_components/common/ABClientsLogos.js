/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const ABClientsLogos = ({ certificates }) => {
  return (
    <section className="ab-clients-logo-sec">
      <div className="ab-client-container">
        <ul className="cara-logos client-logos">
          {certificates?.map(({ iconsLink, alt }, index) => {
            return (
              <li key={index}>
                  <img
                    src={iconsLink || "assets/images/menu/mens-rings.png"}
                    alt={alt}
                  />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default ABClientsLogos;

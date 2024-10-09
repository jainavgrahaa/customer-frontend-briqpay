/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { FormattedMessage } from "react-intl";

const ExpertAdvice = ({
  title,
  subtext,
  btnText,
  btnLink,
  ourStore,
  ourStoreLink,
  imagePath,
  handleButton,
  actions = false,
}) => {
  return (
    <section className="expert-wrapper">
      <div className="expert-text-wrapper">
        <h5 className="heading">{title}</h5>
        <div>{subtext}</div>

        <Link
          href={btnLink}
          onClick={() => handleButton()}
          className="btn btn-outline-primary"
        >
          {btnText}
        </Link>

        <div className="store-link">
          <Link href={ourStoreLink || "#"}>{ourStore}</Link>
        </div>
        {actions && (
          <>
            <div className="expert-wrapper-actions">
              <Link href="#" className="link-primary regular">
                020 7660 1529
              </Link>
              <Link href="#" className="link-primary regular">
                service@austenblake.com
              </Link>
              <Link href="#" className="link-primary regular">
                 <FormattedMessage id="advice.liveChat" />
              </Link>
            </div>
            <div className="expert-wrapper-actions-mobile">
              <div>
                <Link href="#" className="link-primary regular">
                  020 7660 1529
                </Link>
                <Link href="#" className="link-primary regular">
                   <FormattedMessage id="advice.liveChat" />
                </Link>
              </div>

              <Link href="#" className="link-primary regular">
                service@austenblake.com
              </Link>
            </div>
          </>
        )}
      </div>
      <div className="expert-bg-wrapper">
        <img src={imagePath} alt={title} />
      </div>
    </section>
  );
};

export default ExpertAdvice;

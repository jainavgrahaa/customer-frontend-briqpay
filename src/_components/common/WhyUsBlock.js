/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import environment from "@/_utils/environment";
import Link from "next/link";
import React from "react";
import TrustPilotBox from "../trustPilotBox";
import { FormattedMessage } from "react-intl";
import TextTitle from '@/_components/atoms/TextTitle';

const WhyUsBlock = () => {
  return (
    <section className="why-us-sec">
      <div className="container why-us-container">
        <TextTitle variant="h1" name="common.whyUs" className="heading" />
        <p>
          <Link href="/review" className="link-primary">
            <span><FormattedMessage id="whyUS.viewAllReviews" /></span>{" "}
            <span className="material-icons-outlined">chevron_right</span>
          </Link>
        </p>
        <div className="review-sec">
          <div className="reviews-left">
            <TrustPilotBox
              businessUnitId={environment.trustpilot.chatView.businessUnitId}
              templateId={environment.trustpilot.chatView.templateId}
              height="300px"
            />
          </div>
          <div className="trustpilot-google-review">
            <a
              href={environment.trustpilot.url || "#"}
              target="_blank"
              rel="noreferrer"
            >
              <div className="trustpilot-short">
                <div className="trustpilot-short-icon">
                  <img src="/assets/images/trustpilot-short-new.png" />
                </div>
                <div className="trustpilot-short-count">
                  <div className="count-no"><FormattedMessage id="whyUs.score" /></div>
                  <div className="count-info"><FormattedMessage id="whyUs.excellent" /></div>
                </div>
              </div>
            </a>
            <a
              href={environment.googleReview.url || "#"}
              target="_blank"
              rel="noreferrer"
            >
              <div className="google-short">
                <div className="google-short-icon">
                  <img src="/assets/images/google-short-new.png" />
                </div>
                <div className="google-short-count">
                  <div className="count-no"><FormattedMessage id="whyUs.googleScore" /></div>
                  <div className="count-info"><FormattedMessage id="whyUs.excellent" /></div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsBlock;

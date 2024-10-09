/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { FormattedMessage } from "react-intl";

const DfCustomerFeedback = () => {
  return (
    <div className="customer-feedback-section">
      <div className="custmor-title">
        <p className="title-info">
          <span className="title-heading"><FormattedMessage id="customerFeedback.heading" /></span>
        </p>
        <div className="title-features">
          <span className="happy-custmer">100,000 <FormattedMessage id="customerFeedback.happyCusto" /></span>
          <img
            className="rectangle"
            src="/assets/images/diamond_factory_images/home-page/See-what-customers-have-to-say/reactangle.png"
          />
          <span className="satisfaction">98% <FormattedMessage id="customerFeedback.custoSatif" /></span>
          <img
            className="rectangle"
            src="/assets/images/diamond_factory_images/home-page/See-what-customers-have-to-say/reactangle.png"
          />
          <div className="title-trust">
            <p className="rated-trust"></p>
            <div className="trust-logos">
              <img
                src="/assets/images/diamond_factory_images/home-page/See-what-customers-have-to-say/trust-slide.png"
                className="trust-logo"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="customer-images">
        <div className="image-stack">
          <div className="stack-1">
            <div className="text-button">
              <div className="card-text">
                <div className="card-logo">
                  <img
                    className="stars-logo"
                    src="/assets/images/diamond_factory_images/home-page/See-what-customers-have-to-say/start-rating.png"
                  />
                </div>
                <p className="card-description">
                    <FormattedMessage id="customerFeedback.customerfeed" />
                </p>
                <p className="card-msg"><FormattedMessage id="customerFeedback.customerName" /></p>
              </div>
            </div>
          </div>
          <div className="stack-1">
            <div className="text-button">
              <div className="card-text">
                <div className="card-logo">
                  <img
                    className="stars-logo"
                    src="/assets/images/diamond_factory_images/home-page/See-what-customers-have-to-say/start-rating.png"
                  />
                </div>
                <p className="card-description">
                    <FormattedMessage id="customerFeedback.customerfeed" />
                </p>
                <p className="card-msg"><FormattedMessage id="customerFeedback.customerName" /></p>
              </div>
            </div>
          </div>
          <div className="stack-1">
            <div className="text-button">
              <div className="card-text">
                <div className="card-logo">
                  <img
                    className="stars-logo"
                    src="/assets/images/diamond_factory_images/home-page/See-what-customers-have-to-say/start-rating.png"
                  />
                </div>
                <p className="card-description">
                    <FormattedMessage id="customerFeedback.customerfeed" />
                </p>
                <p className="card-msg"><FormattedMessage id="customerFeedback.customerName" /></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="custmer-pegination">
        <div className="pegination">
          <img
            className="pegination-dots"
            src="/assets/images/diamond_factory_images/home-page/See-what-customers-have-to-say/dot.png"
          />
          <img
            className="pegination-dots"
            src="/assets/images/diamond_factory_images/home-page/See-what-customers-have-to-say/dot.png"
          />
          <img
            className="pegination-dots"
            src="/assets/images/diamond_factory_images/home-page/See-what-customers-have-to-say/dot.png"
          />
          <img
            className="pegination-dots"
            src="/assets/images/diamond_factory_images/home-page/See-what-customers-have-to-say/dot.png"
          />
          <img
            className="pegination-dots"
            src="/assets/images/diamond_factory_images/home-page/See-what-customers-have-to-say/dot.png"
          />
          <img
            className="pegination-dots"
            src="/assets/images/diamond_factory_images/home-page/See-what-customers-have-to-say/dot.png"
          />
          <img
            className="pegination-dots"
            src="/assets/images/diamond_factory_images/home-page/See-what-customers-have-to-say/dot.png"
          />
          <img
            className="pegination-dots"
            src="/assets/images/diamond_factory_images/home-page/See-what-customers-have-to-say/dot.png"
          />
        </div>
      </div>
    </div>
  );
};

export default DfCustomerFeedback;

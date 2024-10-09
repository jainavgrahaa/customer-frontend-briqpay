import dayjs from "dayjs";
import Head from "next/head";
import React, { useEffect, useState } from "react";

const API_URL =
  "https://api.trustpilot.com/v1/business-units/4cc5012400006400050e0a76/reviews?stars=5,4&apikey=nHyxvSGxmDEg7DAuJWgRGZrGTLFm1RwK";

const HappyCustomersTrustPilot = () => {
  const [data, setData] = useState(null);
  const [expanded, setExpanded] = useState(null);

  const fetchReviews = async () => {
    const result = await fetch(API_URL);
    const res = await result.json();
    setData(res.reviews);
    setExpanded(res.reviews.map(() => false));
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const toggleReadMore = (index) => {
    setExpanded((prev) => {
      const newExpanded = [...prev];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  if (!data || !expanded) return null;

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="/assets/css/happy-customers-trust-pilot.css"
        />
      </Head>
      <div className="root">
        <div class="text-center">
          <h1 id="trust-score">What our customers say about us</h1>
          <figure>
            <img
              src="/assets/images/diamond-factory/engagement-ring/uk.png"
              alt="Stars"
            />
            <figcaption>UK & USA</figcaption>
          </figure>
        </div>
        <div className="happymain">
          <div className="wrapperCompanyInfo">
            <div className="tpWidgetHumanscore">
              <h1 id="trust-score">Excellent</h1>
              <span>
                <img
                  src="https://www.diamondsfactory.com/catalog/view/theme/default/image/information/4-5star.png"
                  alt="Stars"
                />
              </span>
            </div>
            <div className="trustpilotReviewCount">
              <a
                className="tp-businessinfo"
                target="_blank"
                href="https://uk.trustpilot.com/review/www.diamondsfactory.co.uk?utm_medium=trustbox&utm_source=List"
                rel="noopener noreferrer"
              >
                Based on <span>{data.length} reviews</span> on
              </a>
              <div className="tp-widget-logo">
                <a
                  id="profile-link"
                  target="_blank"
                  href="https://uk.trustpilot.com/review/www.diamondsfactory.co.uk?utm_medium=trustbox&utm_source=List"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://www.diamondsfactory.com/catalog/view/theme/default/image/information/trustpilot-icon.svg"
                    alt="Trustpilot Logo"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="reviewsFilterLabel">
            Showing our 4 & 5 star reviews
          </div>
          <div id="wrapper-reviews" className="wrapperReviews">
            {data.map((review, index) => (
              <div key={index} className="reviewItem">
                <div className="media">
                  <div className="media-body">
                    <div className="review-stars">
                      <div className="profilestar tpstar-5">&nbsp;</div>
                    </div>
                    <div className="dateUserInfo">
                      {review?.location?.name ? (
                        <span className="review-name">
                          {review?.location?.name},&nbsp;
                        </span>
                      ) : null}
                      <span className="review-date">
                        {dayjs(review.updatedAt || review.createdAt).format(
                          "DD MMM YYYY"
                        )}
                      </span>
                    </div>
                    <div className="reviewTitle">{review.title}</div>
                    <div className="reviewContent">
                      <p className="review-content-para">
                        {expanded[index]
                          ? review.text
                          : `${review.text.slice(0, 170)}...`}
                      </p>
                      <span
                        className="moreLink"
                        onClick={() => toggleReadMore(index)}
                      >
                        {expanded[index] ? "Read less" : "Read more"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HappyCustomersTrustPilot;

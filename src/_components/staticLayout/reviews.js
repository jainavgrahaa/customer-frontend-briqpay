import React from "react";
import Head from "next/head";

import environment from "@/_utils/environment";

import AppointmentBlock from "@/_components/common/AppointmentBlock";
import InnerBanner from "@/_components/common/InnerBanner";
import FollowUsBlock from "@/_components/common/FollowUsBlock";
import TrustPilotBox from "@/_components/trustPilotBox";
import ReviewMoments from "@/_components/common/reviews/ReviewMoments";
import RatingBlock from "@/_components/common/RatingBlock";

import { ratingSlider } from "@/_utils/customApiData";

const ReviewsandTestimonials = () => {
  return (
    <>
      <div className="reviews-and-testimonials-page">
        <div>
          <InnerBanner
            Sectitle={<>Reviews and Testimonials</>}
            extraClass=""
            variant="faq"
            bannerPara={
              <>
                {`Text here. It's placeholder. What is free resizing. Best selling
                engagement and diamond rings, which our customers prefer and
                prefer year by year.`}
              </>
            }
          />
          <div className="reviews container">
            <TrustPilotBox
              businessUnitId={environment.trustpilot.chatView.businessUnitId}
              templateId={environment.trustpilot.chatView.templateId}
              height="300px"
            />
          </div>
        </div>
        <RatingBlock ratingSlider={ratingSlider} />
        <ReviewMoments />
        <FollowUsBlock />
        <AppointmentBlock />
      </div>
    </>
  );
};

export default ReviewsandTestimonials;

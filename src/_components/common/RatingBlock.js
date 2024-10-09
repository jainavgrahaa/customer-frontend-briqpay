/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import RatingBlockSlider from "./sliders/RatingBlockSlider";

const RatingBlock = ({ ratingSlider, extraClass, slidesPerView }) => {
  return (
    <section className={`${extraClass === "our-promise" ? "our-promise-sec": "rating-sec"}`}>
      <div className="container">
        <div className="row">
        {extraClass !== "our-promise" && (
          <div className="col-lg-2 rating-img-box">
            <img src="/assets/images/rating-img-box.png" />
          </div>
        )}
          <div className={`rating-content ${extraClass === "our-promise"? "col-lg-12": "col-lg-10"}`}>
            <RatingBlockSlider
              images={ratingSlider}
              breakpoints={{
                640: { slidesPerView: 1.5, spaceBetween: 30 },
                768: { slidesPerView: 1.5, spaceBetween: 30,slideToShow: 1.5 },
                1024: { slidesPerView: 4, spaceBetween: 40,slideToShow: 1.5 },
              }}
              extraClass={extraClass}
              slidesPerView={slidesPerView}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RatingBlock;

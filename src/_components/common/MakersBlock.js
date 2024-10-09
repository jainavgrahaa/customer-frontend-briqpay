/* eslint-disable @next/next/no-img-element */
import React from "react";
import SwiperSlider from "./sliders/SwiperSlider";
import GuideBlock from "./GuideBlock";


const MakersBlock = ({ variant, SecTitle }) => {
  return (
    <section className="makers-sec">
      <div className="container">
        <div className="heading-sec">
          <h2 className="heading">{SecTitle}</h2>
          {variant !== "hub" ? (
            <p>
              Transparency is central for us, learn all you need to know about
              diamonds.
            </p>
          ) : (
            ""
          )}
        </div>
        {variant !== "hub" ? (
          <div className="sec-banner">
            <img src="/assets/images/we_are_the_makers.png" alt="" />
          </div>
        ) : (
          ""
        )}
        <div className="links-wrap">
          <GuideBlock/>
          <SwiperSlider />
        </div>
      </div>
    </section>
  );
};

export default MakersBlock;

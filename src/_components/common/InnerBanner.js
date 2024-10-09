import React from "react";

const InnerBanner = ({ variant, Sectitle, extraClass, bannerPara }) => {
  return (
    <div className={`inner-banner ${extraClass}`}>
      <div className="banner-wrap">
        <div className="banner-content">
          <h1 className="heading">{Sectitle}</h1>
          {variant == "faq" ? <div className="banner-desc">{bannerPara}</div> : ""}
        </div>
      </div>
    </div>
  );
};

export default InnerBanner;

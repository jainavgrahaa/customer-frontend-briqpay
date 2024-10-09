/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

const TopBanner = ({
  variant,
  SecTitle,
  LinkName,
  LinkUrl,
  extraClass,
  imgPath,
  mobileImage,
  bannerPara,
  gara,
}) => {
  return (
    <>
      <div className={`main-banner ${extraClass ? extraClass : ""}`}>
        <div className="container">
          <div className="banner-wrap">
            <div className="banner-content">
              <h1 className="heading">{SecTitle}</h1>

              {variant == "home" ? (
                <div
                  className="banner-desc"
                >{bannerPara}</div>
              ) : (
                ""
              )}

              {LinkName !== "" ? (
                <Link href={LinkUrl || "#"} className="btn-link-primary">
                  {LinkName}
                </Link>
              ) : (
                ""
              )}
            </div>
            {imgPath !== "" || mobileImage !== "" ? (
              <div className="banner-img">
                <img src={imgPath} alt="" className="desktop-image" />
                {mobileImage == undefined ? (
                  <img src={imgPath} alt="" className="mobile-image" />
                ) : (
                  <img src={mobileImage} alt="" className="mobile-image" />
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBanner;

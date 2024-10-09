/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";

// Import Swiper styles
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Link from "next/link";
import { stepCheck } from "@/_utils";
import useBreakPoints from "@/_hooks/useBreakpoints";
import HandSlider from "@/_components/common/handSlider/handSlider";
import ImageTurnable from "@/_components/common/react-image-turnable/ImageTurnable";

/* Note */
// type1 = only image thimb with hover - this default if nothing mentioned
// type2 = product images with price
/* */

const defaultBreakPoints = {
  1200: {
    slidesPerView: 4,
    spaceBetween: 8,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 8,
  },
};

const SliderSectionCustomArrow = ({
  images,
  titleText,
  titleLink,
  type,
  titleHighlightText,
  breakpoints,
  // slideView,
  extraClass,
  handSliderRequired,
  ImageTurnableRequired,
}) => {
  const { breakpointsData, setSwiper, prevRef, nextRef } = useBreakPoints(
    breakpoints,
    defaultBreakPoints
  );
  // const getBreakPoints = () => {
  //   let breakpointsValue = {};

  //   Object.entries(breakpoints).map(([key, val]) => {
  //     Object.assign(breakpointsValue, {
  //       [key]: {
  //         slidesPerView: val.slidesPerView,
  //         spaceBetween: val.spaceBetween,
  //       },
  //     });
  //   });
  //   return breakpointsValue;
  // };

  return (
    <section
      className={`thumbslider-section cat-slider ${
        extraClass ? extraClass : ""
      }`}
    >
      <div className="thumbslider-header cat-header">
        {titleText && (
          <div className="sect-title-clm">
            <h1 className="heading">
              {titleText} <i className="title-italic"> {titleHighlightText}</i>
            </h1>
            {titleLink && (
              <Link href={titleLink.link || "#"}>
                {" "}
                {titleLink.label}{" "}
                <span className="material-icons-outlined icons-small">
                  chevron_right
                </span>
              </Link>
            )}
          </div>
        )}

        <div className="thumbslider-controls">
          <div className="swiper-button material-icons-outlined" ref={prevRef}>
            arrow_back_ios
          </div>
          <div className="swiper-button material-icons-outlined" ref={nextRef}>
            arrow_forward_ios
          </div>
        </div>
      </div>
      {images && breakpointsData && (
        <Swiper
          modules={[Navigation]}
          slidesOffsetBefore={0}
          slidesOffsetAfter={0}
          className="thumbslider-thumb container"
          // slidesPerView={slideView}
          spaceBetween={8}
          navigation={{
            prevEl: prevRef?.current,
            nextEl: nextRef?.current,
          }}
          updateOnWindowResize
          observer
          observeParents
          onSwiper={setSwiper}
          breakpoints={breakpointsData}
        >
          {images.map((image, index) => (
            <React.Fragment>
              {ImageTurnableRequired && (
                <SwiperSlide key={image?.label?.replace(/-/g, ' ') + index}>
                  <ImageTurnable />
                </SwiperSlide>
              )}
              {handSliderRequired && (
                <SwiperSlide key={'handslider' + index}>
                  <HandSlider />
                </SwiperSlide>
              )}
              <SwiperSlide key={'thumb-img'+image?.label?.replace(/-/g, ' ') + index}>
                {stepCheck(type, "type1") && (
                  <div className="thumb-img">
                    <Link href="#">
                      <img
                        alt={image.alt || image.label}
                        src={image.url}
                        className={
                          image.hoverImg
                            ? "animated slider-2-img"
                            : "animated"
                        }
                      />
                      {image.hoverImg && (
                        <img
                          alt={image.alt || image.label}
                          src={image.hoverImg}
                          className="img-hover"
                        />
                      )}
                      {image.label && (
                        <div
                          className={
                            titleText === "Bestselling" ? "" : "hover-sect"
                          }
                        >
                          {image.label}
                          <span className="material-icons-outlined icons-small">
                            chevron_right
                          </span>
                        </div>
                      )}
                    </Link>
                  </div>
                )}

                {stepCheck(type, "type2") && (
                  <div className="thumb-img">
                    <Link href="#">
                      <img
                        alt={image.alt || image.label}
                        src={image.url}
                        className="slider-2-img"
                      />
                      <img
                        alt={image.alt || image.label}
                        src={image.hoverImg}
                        className="img-hover"
                      />
                      <div className="thumb-detail-sect">
                        <h5>{image.label}</h5>
                        {image?.details?.price ? (
                          <p>
                            from : <strong>{image.details.price}</strong>
                          </p>
                        ) : (
                          <p></p>
                        )}
                        {/* {image.details} */}
                      </div>
                    </Link>
                  </div>
                )}

                {stepCheck(type, "type3") && (
                  <section className="single-location-wrapper">
                    <div className="our-stores-slider">
                      <div className="row our-stores-inner">
                        <div className="col-md-6 our-stores-left-sec">
                          <div className="store-location">
                            <h3>LEEDS</h3>
                            <p>
                              {` Located in the heart of the city, this store has
                              been nominated as a finalist at the PJ Awards
                              for 'Best Refurbishment' - worth a visit!`}
                            </p>
                          </div>
                          <div className="store-details">
                            <p className="bold-text">
                              <span className="material-icons-outlined">
                                location_on
                              </span>{" "}
                              {` 4 Commercial Street, Leeds, LS1 6AL`}
                            </p>
                            <div className="days-sec">
                              <p>
                                <span className="days">
                                  Monday to Friday:
                                </span>
                                <span className="times">
                                  <b> 09:00 - 17:00</b>
                                </span>
                              </p>
                              <p>
                                <span className="days">Saturday:</span>
                                <span className="times">
                                  <b>09:30 - 17:30</b>
                                </span>
                              </p>
                              <p>
                                <span className="days">Sunday:</span>
                                <span className="times">
                                  <b>11:00 - 17:00</b>
                                </span>
                              </p>
                            </div>
                            <p>
                              <a
                                className="bold-text book-appointment"
                                href="#book-appointment"
                              >
                                Book an appointment
                              </a>
                              <a
                                className="bold-text video-appointment"
                                href="#virtual-appointment"
                              >
                                <span className="material-icons-outlined">
                                  videocam
                                </span>
                                Video appointment
                              </a>
                            </p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <img
                            src="/assets/images/our-stores-1.png"
                            className="our-store-img"
                          />
                        </div>
                      </div>
                    </div>
                  </section>
                )}
              </SwiperSlide>
            </React.Fragment>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default SliderSectionCustomArrow;

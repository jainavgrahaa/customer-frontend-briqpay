import React, { useEffect, useState, useRef } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const defaultBreakPoints = {
  1030: {
    slidesPerView: 4,
  },
};

const getBreakPoints = (slidesPerView) => {
  return {
    1030: {
      slidesPerView,
    },
  };
};

const DFCarousal = ({
  slideView = 2,
  spaceBetween = 8,
  children,
  navigation = {},
  deviceTypeServer,
  height,
  isPagination,
  isNavigateArrow,
  domain,
  isCarousal
}) => {
  const [swiper, setSwiper] = useState();
  const [breakpointsData, setBreakpointsData] = useState(defaultBreakPoints);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    setBreakpointsData(getBreakPoints(slideView));
  }, [slideView]);

  useEffect(() => {
    if (swiper) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation?.init();
      swiper.navigation?.update();
    }
  }, [swiper, isNavigateArrow]);
  return (
    <>
      {isNavigateArrow && isNavigateArrow === true || isNavigateArrow === "true" && (
        <div className="swiper-navigation">
          <div ref={prevRef} className="swiper-button-prev">
            <span className="material-icons-outlined">west</span>
          </div>
          <div ref={nextRef} className="swiper-button-next">
            <span className="material-icons-outlined">east</span>
          </div>
        </div>
      )}
      <Swiper
        pagination={deviceTypeServer === "mobile" ? true : false}
        modules={deviceTypeServer === "mobile" ? [Pagination] : [Navigation]}
        slidesOffsetBefore={0}
        slidesOffsetAfter={0}
        className={deviceTypeServer === "mobile" ? "swiper-dff" : "thumbslider-thumb"}
        slidesPerView={slideView}
        spaceBetween={spaceBetween}
        navigation={isNavigateArrow ? { prevEl: prevRef.current, nextEl: nextRef.current } : navigation}
        updateOnWindowResize
        observer
        observeParents
        style={{
          ...(deviceTypeServer === "mobile" && {
            position: "static",
            display: "flex",
            alignItems: "center",
            "--swiper-pagination-color": "#957127 !important",
            "--swiper-pagination-bullet-color": "#957127",
            "--swiper-pagination-bullet-size": "8px !important",
            "--swiper-pagination-bullet-size-active": "16px !important",
          }),
        }}
        onSwiper={setSwiper}
        breakpoints={breakpointsData}
      >
        {children}
      </Swiper>
    </>
  );
};

export default DFCarousal;

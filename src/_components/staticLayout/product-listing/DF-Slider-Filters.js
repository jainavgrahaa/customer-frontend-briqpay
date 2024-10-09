// Import Swiper styles
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useEffect, useRef, useState } from "react";
import { stepCheck } from "@/_utils";
import useDeviceHelper from "@/_hooks/useDeviceHelper";
import { FormattedMessage } from "react-intl";

export const DFSliderFilters = ({ theme }) => {
  const breakpoints = {
    640: { slidesPerView: 3, spaceBetween: 0 },
    768: { slidesPerView: 2.8, spaceBetween: 2 },
    1024: { slidesPerView: 2.8, spaceBetween: 2 },
  };

  const defaultBreakPoints = {
    1024: {
      slidesPerView: 2.8,
      spaceBetween: 2,
    },
  };
  const [toggleState, setToggleState] = useState(1);
  const [swiper, setSwiper] = useState();
  const [breakpointsData, setBreakpoints] = useState(defaultBreakPoints);
  const prevRef = useRef();
  const nextRef = useRef();
  const { deviceType } = useDeviceHelper();

  useEffect(() => {
    if (breakpoints) {
      setBreakpoints(breakpoints);
    } else {
      setBreakpoints(defaultBreakPoints);
    }
  }, [swiper]);

  useEffect(() => {
    if (swiper && swiper.params && swiper.params.navigation) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation?.init();
      swiper.navigation?.update();
    }
  }, [swiper]);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <section
      className={deviceType === "mobile" ? `thumbslider-section-mb cat-slider theme-01 ${theme}` : "thumbslider-section cat-slider theme-01"}
      style={{ width: deviceType === "mobile" ? "100%" : "25%" }}
    >
      <div className="container px-0 px-md-3">
        <span
          style={{
            color: "#957127",
            fontSize: "12px",
            fontWeight: "600",
          }}
        >
          Style
        </span>
        <div className={deviceType === "mobile" ? "thumbslider-header-df " : "thumbslider-header cat-header"}>

          <div
            className="swiper-button material-icons-outlined"
            ref={prevRef}
            style={{ zIndex: 1000, cursor: "pointer" }}
          >
            arrow_back_ios
          </div>
          <ul className="bloc-tabs">
            <Swiper
              slidesOffsetBefore={0}
              slidesOffsetAfter={0}
              className="df-swiper-wrapper"
              slidesPerView={deviceType === "mobile" ? 3.9 : 2}
              spaceBetween={8}
              modules={[Navigation]}
              breakpoints={breakpointsData}
              updateOnWindowResize
              observer
              observeParents
              onSwiper={setSwiper}
              style={{ width: deviceType === "mobile" ? "20rem" : "12rem", overflow: "hidden" }}
            >
              <SwiperSlide>
                <li
                  className={
                    stepCheck(toggleState, 1)
                      ? "tabs active-tabs mob_menu"
                      : "tabs"
                  }
                  onClick={() => toggleTab(1)}
                  style={{
                    background: "#FFFCF6",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <img alt={<FormattedMessage id="alt.ring" />} src="/assets/images/diamond_factory_images/product-listing/filters/ring.png" />
                  <div style={{ fontSize: "14px" }}>Solitare</div>
                </li>
              </SwiperSlide>
              <SwiperSlide>
                <li
                  className={
                    stepCheck(toggleState, 1)
                      ? "tabs active-tabs mob_menu"
                      : "tabs"
                  }
                  onClick={() => toggleTab(1)}
                  style={{
                    background: "#FFFCF6",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <img alt={<FormattedMessage id="alt.ring" />} src="/assets/images/diamond_factory_images/product-listing/filters/ring.png" />
                  <div style={{ fontSize: "14px" }}>Halo</div>
                </li>
              </SwiperSlide>
              <SwiperSlide>
                <li
                  className={
                    stepCheck(toggleState, 1)
                      ? "tabs active-tabs mob_menu"
                      : "tabs"
                  }
                  onClick={() => toggleTab(1)}
                  style={{
                    background: "#FFFCF6",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <img alt={<FormattedMessage id="alt.ring" />} src="/assets/images/diamond_factory_images/product-listing/filters/ring.png" />
                  <div style={{ fontSize: "14px" }}>Halo</div>
                </li>
              </SwiperSlide>
              <SwiperSlide>
                <li
                  className={
                    stepCheck(toggleState, 1)
                      ? "tabs active-tabs mob_menu"
                      : "tabs"
                  }
                  onClick={() => toggleTab(1)}
                  style={{
                    background: "#FFFCF6",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <img src="/assets/images/diamond_factory_images/product-listing/filters/ring.png" />
                  <div style={{ fontSize: "14px" }}>Halo</div>
                </li>
              </SwiperSlide>
            </Swiper>
          </ul>
          <div
            className="swiper-button material-icons-outlined"
            ref={nextRef}
            style={{ zIndex: 1000, cursor: "pointer" }}
          >
            arrow_forward_ios
          </div>
        </div>
      </div>
    </section>
  );
};

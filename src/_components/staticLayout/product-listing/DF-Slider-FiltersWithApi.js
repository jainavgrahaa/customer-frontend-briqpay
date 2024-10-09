// Import Swiper styles
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import TextTitle from "@/_components/atoms/TextTitle";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useEffect, useRef, useState } from "react";
import { stepCheck } from "@/_utils";
import useDeviceHelper from "@/_hooks/useDeviceHelper";
import { usePathname } from "next/navigation";
import { Router, useRouter } from "next/router";
import CircularLoader from "@/_components/common/loader/circular-loader";

export const DFSliderFiltersWithApi = ({
  featureData,
  selectedFilter,
  filterVal,
}) => {
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

  const pathName = usePathname();
  const router = useRouter();
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

  const handleChange = (value, val) => {
    const name = pathName?.split("/").at(2);

    const key = val.toLowerCase();
    let newArray = [...filterVal];

    newArray = newArray.filter((obj) => !Object.keys(obj).includes(key));
    newArray.push({ [key]: [value] });
    // Clean up the array to remove any empty arrays
    newArray = newArray.filter((obj) => {
      const values = Object.values(obj)[0];
      return Array.isArray(values) ? values.length > 0 : true;
    });
    selectedFilter(newArray);
    // if(name){

    //   const modifiedStr = pathName.replace(name, value.toLowerCase());
    //   if (router && router?.query) {
    //     const queryString = new URLSearchParams(router.query).toString();
    //     const modifiedUrl = queryString
    //       ? `${modifiedStr}?${queryString}`
    //       : modifiedStr;
    //     window.location.href = modifiedUrl;
    //   } else {
    //     window.location.replace(modifiedStr);
    //     window.location.reload();
    //   }
    // }
    // else{
    //   const name = pathName?.split("/").at(1);
    //   const modifiedStr = `${name}/${value.toLowerCase()}`
    //   window.location.href = modifiedStr;
    // }
  };

  return featureData.map((data) => {
    return (
      data?.featureGroupFeatureMapType === "category" && (
        <section
          className={
            deviceType === "mobile"
              ? "thumbslider-section-mb cat-slider theme-01  "
              : "thumbslider-section cat-slider theme-01"
          }
          style={{ width: deviceType === "mobile" ? "100%" : "25%" }}
        >
          <div className="container">
            <h6 className={"filter-title mb-0 text-uppercase"}>{data?.name}</h6>
            <div
              className={
                deviceType === "mobile"
                  ? "thumbslider-header-df "
                  : "thumbslider-header cat-header"
              }
            >
              <div
                className="swiper-button material-icons-outlined"
                ref={prevRef}
                style={{ zIndex: 9, cursor: "pointer" }}
              >
                arrow_back_ios
              </div>
              <ul className="bloc-tabs tabs1">
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
                  style={{
                    width: deviceType === "mobile" ? "20rem" : "16rem",
                    overflow: "hidden",
                  }}
                >
                  {data?.featureOptions?.map((feat, index) => {
                    return (
                      <SwiperSlide key={`${index}-${feat?.name}`}>
                        <li
                          className={
                            stepCheck(toggleState, 1)
                              ? "tabs active-tabs mob_menu"
                              : "tabs"
                          }
                          onClick={() => {
                            toggleTab(1),
                              handleChange(
                                feat?.name.toLowerCase(),
                                data?.name
                              );
                          }}
                          style={{
                            background: "#FFFCF6",
                            display: "flex",
                            border: "none",
                            flexDirection: "column",
                          }}
                        >
                          <img
                            alt="Ring"
                            src={
                              "/assets/images/diamond_factory_images/product-listing/filters/ring.png"
                            }
                          />
                          <p
                            style={{ fontSize: "13px" }}
                            className="mb-0 slider-text"
                          >
                            {feat?.name}
                          </p>
                        </li>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </ul>
              <div
                className="swiper-button material-icons-outlined"
                ref={nextRef}
                style={{ zIndex: 9, cursor: "pointer" }}
              >
                arrow_forward_ios
              </div>
            </div>
          </div>
        </section>
      )
    );
  });
};

import { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { storeTypes } from "@/_utils";

const getBreakPoints = (slidesPerView) => {
  return {
    1030: {
      slidesPerView,
    },
  };
};

const Carousal = ({
  slideView = 2,
  spaceBetween = 8,
  children,
  navigation = {},
  isPagination,
  deviceTypeServer,
  domain,
  isCarousalPagination,
  paginationType,
}) => {
  const defaultBreakPoints = {
    1030: {
      slidesPerView: slideView || 4,
    },
  };
  const [swiper, setSwiper] = useState();
  const [breakpointsData, setBreakpointsData] = useState(defaultBreakPoints);
  useEffect(() => {
    setBreakpointsData(getBreakPoints(slideView || 2));
  }, [slideView]);

  useEffect(() => {
    if (swiper && swiper.params && swiper.params.navigation) {
      swiper.params.navigation = { ...swiper.params.navigation, ...navigation };
      swiper.navigation?.init();
      swiper.navigation?.update();
    }
  }, [swiper, navigation]);
  return (
    <>
      <Swiper
        pagination={{
          clickable: isCarousalPagination,
        }}
        modules={isPagination ? [Pagination] : [Navigation]}
        slidesOffsetBefore={0}
        slidesOffsetAfter={0}
        className={
          storeTypes?.[domain] === "df" && deviceTypeServer === "mobile"
            ? "swiper-dff"
            : `${
                paginationType === "bullet" && "bullet-pagination"
              } thumbslider-thumb swiper-ab`
        }
        slidesPerView={slideView}
        spaceBetween={spaceBetween}
        navigation={navigation}
        updateOnWindowResize
        observer
        observeParents
        style={{
          ...(storeTypes?.[domain] === "df" &&
            deviceTypeServer === "mobile" && {
              position: "static",
              display: "flex",
              alignItems: "center",
              "--swiper-pagination-color": "#957127",
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

export default Carousal;

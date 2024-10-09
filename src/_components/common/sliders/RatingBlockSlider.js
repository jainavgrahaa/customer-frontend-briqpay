import React from "react";

// Import Swiper styles
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import OurPromise from "../OurPromise";
import useBreakPoints from "@/_hooks/useBreakpoints";

const defaultBreakPoints = {
  1024: {
    slidesPerView: 2,
    spaceBetween: 8,
  },
};

const RatingBlockSlider = ({
  images,
  breakpoints,
  extraClass,
  slidesPerView,
}) => {
  const { breakpointsData, setSwiper } = useBreakPoints(
    breakpoints,
    defaultBreakPoints
  );
  return (
    <section className={`thumbslider-section ${extraClass ? extraClass : ""}`}>
      <div className="container">
        {images && breakpointsData && (
          <Swiper
            modules={[Navigation]}
            slidesOffsetBefore={0}
            slidesOffsetAfter={0}
            className="thumbslider-thumb"
            slidesPerView={slidesPerView}
            spaceBetween={8}
            updateOnWindowResize
            observer
            observeParents
            onSwiper={setSwiper}
            breakpoints={breakpointsData}
          >
            {images.map(({ id, image, title, content, date }) => (
              <SwiperSlide key={id+index}>
                <OurPromise
                  id={id}
                  image={image}
                  title={title}
                  content={content}
                  date={date}
                  extraClass={extraClass}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default RatingBlockSlider;

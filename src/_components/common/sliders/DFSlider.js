/* eslint-disable @next/next/no-img-element */
import React from "react";

// import Swiper core and required modules
import { Pagination } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Link from "next/link";
import { sliderData } from "@/_utils/customApiData";

const DFSlider = ({childrens}) => {
  return (
    <div className="image-sec">
    <Swiper
      modules={[
        Pagination,
      ]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
    >
      {childrens?.map((slide, index) => {
        return (
          <SwiperSlide key={slide?.id + index}>
            <div className="image-sec">
              <img src={slide?.image} alt={slide?.title} />
              <div className="image-overlay">
                <h4>{slide?.title}</h4>
                <Link href="#" className="">
                  Read more
                </Link>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
    </div>
  );
};

export default DFSlider;

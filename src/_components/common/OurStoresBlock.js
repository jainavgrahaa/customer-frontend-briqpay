import React from "react";
import { FormattedMessage } from "react-intl";
import SliderSectionCustomArrow from "@/_components/common/sliders/SliderSectionCustomArrow";
import {
    shopByStyle,
  } from "@/_utils/customApiData";


const OurStoresBlock = () => {
    return (
    <>
        <section className="shop-by-price-sec">
            <div className="shop-by-price-wrapper">
            <SliderSectionCustomArrow
                images={shopByStyle}
                titleText={ <FormattedMessage id="common.ourStores" />}
                titleHighlightText=""
                type="type1"
                breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 0 },
                768: { slidesPerView: 2, spaceBetween: 30 },
                1024: { slidesPerView: 4, spaceBetween: 30 },
                }}
                slideView={2}
            />
            </div>
        </section>
    </>
    )
};

export default OurStoresBlock;

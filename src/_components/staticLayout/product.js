/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

import OurPromise from "@/_components/common/OurPromise";
import {
  diamondRadioButton,
  productAccordionData,
  metalRadioData,
  backingRadioButton,
  shapeRadioData,
  totalCarat,
  productClarity,
  productColor,
  productCertificate,
  productBannerSlider,
  productSecureData,
  ShippingInformationData,
  productCutGrade,
  productPolish,
  productSymmetry,
  productBandWidth,
} from "@/_utils/customApiData";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import SliderSectionCustomArrow from "@/_components/common/sliders/SliderSectionCustomArrow";
import CardWithLabel from "@/_components/common/cards/CardWithLabel";
import RadioButton from "@/_components/common/radio/RadioButton";
import CustomAccordion from "@/_components/common/CustomAccordion";
import CustomIconButton from "@/_components/common/CustomIconButton";
import Head from "next/head";
import IconRadioButton from "@/_components/common/radio/IconRadioButton";
import Link from "next/link";
import TextRadioButton from "@/_components/common/radio/TextRadioButton";
import AddToBagCard from "@/_components/common/cards/AddToBagCard";
import CustomTabs from "@/_components/common/CustomTabs";
import { TabContext, TabPanel } from "@mui/lab";
import CustomTable from "@/_components/tables";
import ShippingInfo from "@/_components/common/ShippingInfo";
import BreadCrumbs from "@/_components/common/breadcrumbs";
import CustomProductFilter from "../common/menuTypes/customProductFilter";
import BandWidth from "../common/radio/BandWidth";
import CustomSlider from "../common/sliders/CustomSlider";
import useDeviceHelper from "@/_hooks/useDeviceHelper";
// import ThreeSixtyImageView from "@/_components/common/threeSixtyImageView";
// import { imgList } from "@/_components/common/threeSixtyImageView/test";

const Product = () => {
  const [productType, setProductType] = useState("1");
  const [imageId, setImageId] = useState();
  const { deviceType } = useDeviceHelper();

  const handleChangeTabs = (val) => {
    setProductType(val);
  };
  return (
    <div className="product-wrapper">
      <section>
        <div className="container">
          <BreadCrumbs currentPage={"Engagement Rings"} />
          <div className="row row-lg">
            <div className="col-lg-7">
              {/* <ThreeSixtyImageView
                images={imgList}
              /> */}
              {deviceType === "desktop" ? (
                <>
                  <CardWithLabel id={imageId} cardImage={"product-ring.png"} />
                  <CustomSlider
                    setImageId={setImageId}
                    extraClass="theme-01"
                    images={productBannerSlider}
                  />
                </>
              ) : (
                <>
                  <SliderSectionCustomArrow
                    images={productBannerSlider}
                    extraClass="theme-01"
                    type="type2"
                    breakpoints={{
                      640: { slidesPerView: 2, spaceBetween: 6 },
                      768: { slidesPerView: 2, spaceBetween: 20 },
                      1024: { slidesPerView: 4, spaceBetween: 20 },
                    }}
                    slideView={2}
                    details
                  />{" "}
                </>
              )}
              <CustomAccordion accordionData={productAccordionData} />
            </div>
            <div className="col-lg-5">
              <div className="heading">
                <Typography variant="h1">
                  Round Diamond Stud Earrings
                </Typography>
                <CustomIconButton />
              </div>
              <Typography variant="body1">
                These beautiful earrings feature a matched pair of round
                brilliant diamonds secured in classic basket settings.
              </Typography>
              <Link href="#" className="read-more-link">
                Read more
              </Link>
              <TabContext value={productType}>
                <CustomTabs handleChangeTabs={handleChangeTabs} />
                <div className="round-diamond-sec">
                  <TabPanel value="1" sx={{ padding: "0" }}>
                    <BandWidth
                      radioData={productBandWidth}
                      title={"Band Width : "}
                      subTitle={"Delicate (2mm)"}
                    />
                    <IconRadioButton
                      radioData={metalRadioData}
                      title={"Metal"}
                    />
                    <CustomProductFilter
                      customData={["team1", "team2", "team3"]}
                      title={"Ring Size"}
                      icon={true}
                      extraClass="shape-filter-box"
                    />
                    <div className="round-diamond-sec">
                      <RadioButton
                        radioData={backingRadioButton}
                        title={"Backing"}
                      />
                      <RadioButton
                        radioData={diamondRadioButton}
                        title={"Diamond"}
                      />
                    </div>

                    <IconRadioButton
                      radioData={shapeRadioData}
                      title={"Shape"}
                      extraClass="shape-filter-box"
                    />
                    <TextRadioButton
                      radioData={totalCarat}
                      title={"Total Carat"}
                      icon={true}
                      extraClass=""
                    />
                    <TextRadioButton
                      radioData={productClarity}
                      title={"Clarity"}
                      icon={true}
                      extraClass=""
                    />
                    <TextRadioButton
                      radioData={productColor}
                      title={"Color"}
                      icon={true}
                      extraClass=""
                    />
                    <TextRadioButton
                      radioData={productCutGrade}
                      title={"Cut Grade"}
                      icon={true}
                      extraClass="special-radio-box"
                    />

                    <TextRadioButton
                      radioData={productCertificate}
                      title={"Certificate"}
                      icon={true}
                      extraClass="special-radio-box"
                    />
                    <TextRadioButton
                      radioData={productPolish}
                      title={"Polish"}
                      icon={true}
                      extraClass="special-radio-box"
                    />
                    <TextRadioButton
                      radioData={productSymmetry}
                      title={"Symmetry"}
                      icon={true}
                      extraClass="special-radio-box"
                    />
                    <TextRadioButton
                      radioData={productSymmetry}
                      title={"Fluo"}
                      icon={true}
                      extraClass="special-radio-box"
                    />
                  </TabPanel>
                  <TabPanel value="2">
                    <Box className="table-container">
                      <CustomTable />
                    </Box>
                  </TabPanel>
                  <AddToBagCard />
                  <Box className="appointment-btn">
                    <Button variant="outlined" href="#book-appointment">Book an appointment</Button>
                    <Button
                      variant="text"
                      startIcon={
                        <span className="material-icons-outlined">
                          videocam
                        </span>
                      }
                      href="#virtual-appointment"
                    >
                      Virtual appointment
                    </Button>
                  </Box>

                  <div className="discount-message">
                    <div className="offer">
                      <img src="/assets/images/product-offer.png" />
                      <span>Finance from as low as £19.47/month</span>
                    </div>
                    <span className="material-icons-outlined icons-small">
                      keyboard_arrow_right
                    </span>
                  </div>

                  <ShippingInfo
                    variant="product"
                    extraClass="theme-02"
                    shippingData={ShippingInformationData}
                  />
                  {/* <InfoCard /> */}
                  {/* <RangeSlider /> */}
                </div>
              </TabContext>
              <Box className="row choose-section">
                {productSecureData.map(({ id, image, title, content }) => {
                  return (
                    <Box className="col-md-12" key={id}>
                      <OurPromise
                        id={id}
                        image={image}
                        title={title}
                        content={content}
                        parentBoxClass="feature-box"
                      />
                    </Box>
                  );
                })}
              </Box>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;

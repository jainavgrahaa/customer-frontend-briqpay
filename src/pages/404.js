/* eslint-disable @next/next/no-img-element */
import DFHeader from "@/layout/DFHeader";
import DFFooter from "@/layout/DFFooter";
import FollowUsBlock from "@/_components/common/FollowUsBlock";
import SliderSectionCustomArrow from "@/_components/common/sliders/SliderSectionCustomArrow";
import { categoryData } from "@/_utils/customApiData";
import { Button, Typography } from "@mui/material";
import Head from "next/head";
import useDeviceHelper from "@/_hooks/useDeviceHelper";
import { getPageNotFoundImages, storeTypes } from "@/_utils";
import ABHeader from "@/layout/ABHeader";
import ABFooter from "@/layout/ABFooter";
import DFTalkToExpert from "@/_components/common/DFTalkToExpert"

const NotFound = ({ domain,  pageProps, getFooterData, getHeaderData, phoneNumber }) => {
  const { deviceType } = useDeviceHelper();
  return (
    <>
      {storeTypes[domain] === "df" ? (
        <Head>
          <link rel="stylesheet" href="/assets/css/theme/df.css" />
        </Head>
      ) : null}
      <div className="page-wrapper">
        {storeTypes[domain] === "df" ? (
          <DFHeader getHeaderData={getHeaderData} phoneNumber={phoneNumber}/>
        ) : (
          <ABHeader getHeaderData={getHeaderData} phoneNumber={phoneNumber}/>
        )}
        {storeTypes[domain] === "df" ? (
          <>
            <div
              className="page-not-found"
              style={{
                display: "flex",
                position: "relative",
                backgroundColor: "#FFFCF6",
              }}
            >
              <div
                className="not-found-section"
                style={{
                  marginTop: "60px",
                }}
              >
                <h3 className="title" style={{ textAlign: "center" }}>
                  404 Error
                </h3>
                <Typography
                  variant="h5"
                  fontSize={16}
                  fontWeight={400}
                  textWrap={"no-wrap"}
                  textAlign={"center"}
                  lineHeight=" 24px"
                >
                  Is it me you are looking for? Cause I wonder that is not.
                </Typography>

                <Typography
                  variant="h5"
                  fontSize={16}
                  fontWeight={400}
                  textWrap={"no-wrap"}
                  textAlign={"center"}
                  my={2}
                  lineHeight=" 24px"
                >
                  But let me start by saying you can try to find what you are
                  looking for in our search bar or{" "}
                  <a href="/" style={{ textDecoration: "underline" }}>
                    Click here
                  </a>{" "}
                  to go back to our homepage.
                </Typography>

                <Typography
                  variant="h5"
                  fontSize={16}
                  fontWeight={400}
                  textWrap={"no-wrap"}
                  textAlign={"center"}
                  mb={10}
                  lineHeight=" 24px"
                >
                  If you need further assistance, you can contact our customer
                  service on{" "}
                  <a
                    href="mailto:service@diamondsfactory.co.uk "
                    style={{ textDecoration: "underline" }}
                  >
                    service@diamondsfactory.co.uk
                  </a>{" "}
                  or at
                  <a href="tel:020 7138 3672">020 7138 3672</a>
                </Typography>
              </div>
            </div>
            <DFTalkToExpert/>
            <section className="insta-section">
              <p className="insta-section-text">
                Join us @diamondsfactoryworld
              </p>
              <div className="insta-img-section">
                <div className="insta-images">
                  <img
                    className="insta-img"
                    src="/assets/images/diamond_factory_images/home-page/join-us/girl_1.png"
                    alt="group-image"
                  />
                  <img
                    className="insta-img"
                    src="/assets/images/diamond_factory_images/home-page/join-us/girl_2.png"
                    alt="group-image"
                  />
                  <img
                    className="insta-img"
                    src="/assets/images/diamond_factory_images/home-page/join-us/girl_3.png"
                    alt="group-image"
                  />
                  <img
                    className="insta-img"
                    src="/assets/images/diamond_factory_images/home-page/join-us/girl_4.png"
                    alt="group-image"
                  />
                  <img
                    className="insta-img"
                    src="/assets/images/diamond_factory_images/home-page/join-us/girl_5.png"
                    alt="group-image"
                  />
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            <div className="page-not-found mt-5">
              <h2>Page not found</h2>
              <p>Sorry, we couldn’t find that page.</p>
              <a href={"/choose-engagement-rings"}>
                <span className="btn-cont-shop">continue shopping</span>
              </a>
            </div>
            <div className="mid-banner">
              <div className="mid-banner-content">
                <h2>
                  Check out our <br />
                  new collection
                </h2>
                <Button href="/choose-engagement-rings/product-listing">
                  Get Started
                </Button>
              </div>
              <img
                loading="lazy"
                src={getPageNotFoundImages[deviceType]}
                width={"100%"}
                alt={"404-banner"}
              />
            </div>
            <SliderSectionCustomArrow
              images={categoryData}
              titleText={"Shop by"}
              titleHighlightText="Category"
              extraClass="theme-02 type-fixed container"
              type="type1"
              slideView={2.1}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 6 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 4, spaceBetween: 20 },
              }}
            />
            <FollowUsBlock />
          </>
        )}
        {storeTypes[domain] === "df" ? (
          <DFFooter
            getFooterData={getFooterData}
            domain={domain}
            deviceType={deviceType}
          />
        ) : (
          <ABFooter
            getFooterData={getFooterData}
            domain={domain}
            deviceType={deviceType}
          />
        )}
      </div>
    </>
  );
};

export default NotFound;

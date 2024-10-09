/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import CreateDesignMainTabs from "../createDesignMainTabs";
import OurPromise from "@/_components/common/OurPromise";
import {
  productAccordionData,
  productSecureData,
  CYDShippingInformationData,
} from "@/_utils/customApiData";
import {
  Button,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { Box } from "@mui/system";
import CustomAccordion from "@/_components/common/CustomAccordion";
import AddToBagCard from "@/_components/common/cards/AddToBagCard";
import { TabContext } from "@mui/lab";
import ShippingInfo from "@/_components/common/ShippingInfo";
import Modal from "@/_components/modal";
import Link from "next/link";
import TrustPilotBox from "@/_components/trustPilotBox";
import environment from "@/_utils/environment";
import useDeviceHelper from "@/_hooks/useDeviceHelper";

const CreateYourDesign = () => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(min-width: 768px)");
      setMatches(mediaQuery.matches);
      const handleChange = (e) => setMatches(e.matches);
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);
  const [productType, setProductType] = useState("1");

  const handleChangeTabs = (val) => {
    setProductType(val);
  };

  const [showElement, setShowElement] = useState(false);
  const [shareModal, setshareModal] = useState(false);
  const { deviceType } = useDeviceHelper();
  useEffect(() => {
    const handleScroll = () => {
      const elementToWatch = document.getElementById('section-to-watch');
      const elmntHeader = document.getElementById('header')
      const elementRect = elementToWatch.getBoundingClientRect();
      const isElementOutOfViewport = elementRect.bottom < 0 + elmntHeader?.offsetHeight + 12;

      setShowElement(isElementOutOfViewport);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleCloseModal = () => {
    setshareModal(false);
  };
  return (
    <>
      <CreateDesignMainTabs />
      <div className="product-wrapper create-your-design">
        <section>
          <div className="container">
            <div className="row create-your-design-sec">
              <div className="col-lg-7">
                <div className="row product-img-list">
                  <div className="col-sm-12 product-img">
                    <img
                      src="/assets/images/create-your-design/product-image-01.jpg"
                      alt=""
                    />
                  </div>
                  <div className="col-sm-6 product-img">
                    <img
                      src="/assets/images/create-your-design/product-image-01-diamond.jpg"
                      alt=""
                    />
                  </div>
                  <div className="col-sm-6 product-img">
                    <img
                      src="/assets/images/create-your-design/product-image-01-with-real.jpg"
                      alt=""
                    />
                  </div>
                  <div className="col-sm-6 product-img">
                    <img
                      src="/assets/images/create-your-design/product-image-01-ring.jpg"
                      alt=""
                    />
                  </div>
                </div>
                <CustomAccordion accordionData={productAccordionData} />
              </div>
              <div className="col-lg-5">
                <div className="heading">
                  <h4 className="sub-heading mb-0">Your unique ring design</h4>
                  <span className="material-icons-outlined icons-small cursorP" onClick={() => setshareModal(true)}>
                    share
                  </span>
                </div>
                <div className="product-thumb row">
                  <div className="product-thumb-data">
                    <div className="product-img">
                      <img
                        src="/assets/images/create-your-design/product-image-01-ring-thumb.jpg"
                        alt=""
                      />
                    </div>
                    <div className="product-details">
                      <div className="property j-space-between">
                        <div className="lft">
                          <h2>Setting</h2>
                        </div>
                        <div className="rht">
                          <a href="#" className="info-link">
                            Edit
                          </a>
                        </div>
                      </div>
                      <div className="property j-space-between">
                        <div className="lft">
                          <b>Harper</b>
                          <div className="property">
                            <p className="label">Style:</p>
                            <p className="value">Solitare</p>
                          </div>
                          <div className="property">
                            <p className="label">Metal:</p>
                            <p className="value">White gold</p>
                          </div>
                        </div>
                        <div className="rht price">£304</div>
                      </div>
                    </div>
                  </div>
                  <div className="product-thumb-data">
                    <div className="product-img">
                      <img
                        src="/assets/images/create-your-design/product-image-01-diamond-thumb.jpg"
                        alt=""
                      />
                    </div>
                    <div className="product-details">
                      <div className="property j-space-between">
                        <div className="lft">
                          <h2>Diamond</h2>
                        </div>
                        <div className="rht">
                          <a href="#" className="info-link">
                            Edit
                          </a>
                        </div>
                      </div>
                      <div className="property j-space-between">
                        <div className="lft">
                          <div className="property">
                            <p className="label">Shape:</p>
                            <p className="value">Round</p>
                          </div>
                          <div className="property">
                            <p className="label">Carat:</p>
                            <p className="value">0.52</p>
                          </div>
                          <div className="property">
                            <p className="label">Clarity:</p>
                            <p className="value">V12</p>
                          </div>
                          <div className="property">
                            <p className="label">Colour:</p>
                            <p className="value">L</p>
                          </div>
                          <div className="property">
                            <p className="label">Cut grade:</p>
                            <p className="value">Excellent</p>
                          </div>
                          <div className="property">
                            <p className="label">Polish:</p>
                            <p className="value">Excellent</p>
                          </div>
                          <div className="property">
                            <p className="label">Fluorescense:</p>
                            <p className="value">None</p>
                          </div>
                          <div className="property">
                            <p className="label">Certficate:</p>
                            <p className="value">EGL/SGL</p>
                          </div>
                        </div>
                        <div className="rht price">£1,210</div>
                      </div>
                    </div>
                  </div>
                  <div className="product-thumb-data gift-data">
                    <div className="product-img">
                      <img
                        src="/assets/images/create-your-design/product-image-01-two-diamond-thumb.jpg"
                        alt=""
                      />
                    </div>
                    <div className="product-details">
                      <div className="property j-space-between">
                        <div className="lft">
                          <b>Diamond Earrings</b>
                          <div className="property">
                            <span className="offer-text">
                              <span className="material-icons-outlined icons-small">
                                redeem
                              </span>
                              Purchase more than $1,000
                            </span>
                          </div>
                        </div>
                        <div className="rht price">Free</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="select-container">
                  <FormControl variant="standard" fullWidth>
                    <InputLabel id="">Select your ring size</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id=""
                      label="Select your ring size"
                    >
                      <MenuItem value={10}>Ring Size 01</MenuItem>
                      <MenuItem value={11}>Ring Size 02</MenuItem>
                    </Select>
                  </FormControl>
                  <span className="material-icons-outlined icons-small cursorP">
                    info
                  </span>
                </div>

                <TabContext value={productType}>
                  <div className="round-diamond-sec">
                    <div id="section-to-watch">
                      <AddToBagCard variant="createyoudesign" />

                      <Box className="appointment-btn">
                        <Button variant="contained">Add to bag</Button>
                        <Button variant="outlined" href="#select-appointment">Book an appointment</Button>
                      </Box>
                    </div>
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
                      variant="createyoudesign"
                      ShippingData={CYDShippingInformationData}
                    />

                    <Box className="row choose-section">
                      {productSecureData.map(
                        ({ id, image, title, content }) => {
                          return (
                            <Box className="col-md-12" key={id}>
                              <OurPromise
                                id={id}
                                image={image}
                                title={title}
                                content={content}
                                parentBoxClass="feature-box mt-4 mb-0"
                              />
                            </Box>
                          );
                        }
                      )}
                    </Box>
                  </div>
                </TabContext>
              </div>
            </div>
          </div>
        </section>
        {deviceType !== "mobile" && (
        <section className={"sticky-order-summary pdp-stick-wrap"}>
              <div className="sticky-order-left-column">
                <p className="round-diamond-text">Round Diamond Stud Earrings</p>
                <p className="price-diamond-text">$1,940 <span className="main-price-tag">$1,400</span></p>
              </div>
              <div style={{ display: "flex", gap: "16px" }} className="sticky-order-right-column">
                <div className="sticky-appointment-block">
                <Button
                  variant="outlined"
                  sx={{ width: "100%" }}
                  className="checkout-btn standard-btn mt-0 mb-0"
                  size="small"
                  href="#select-appointment"
                >
                 Button
                </Button>
                <div className="discount-text-message">
                  <div className="discount-rating text-center">
                    <TrustPilotBox
                      businessUnitId={environment.trustpilot.inlineReview.businessUnitId}
                      templateId={environment.trustpilot.inlineReview.templateId}
                      height="20px"
                    />
                  </div>
                </div>
                </div>
                <div className="sticky-addbag-block">
                <Button
                  variant="outlined"
                  sx={{ mt: 3, mb: 2, width: "100%" }}
                  className="checkout-btn dark-blue-btn"
                  size="small"
                >
                  Add to Bag
                </Button>
                <div className="discount-message">
                  <div className="discount-rating text-center">
                    <img src="/assets/images/product-offer.png" alt=" " />
                    <span className="rating-text">
                    Finance from as low as £19.47/month
                    </span>
                  </div>
                </div>
              </div>
              </div>
        </section>
        )}
        {deviceType === "mobile" && (
             <div className="sticky-order-summary-mob">
             <div className="order-total-mob">
             <p className="round-diamond-text">Round Diamond Stud Earrings</p>
                <p className="price-diamond-text">$1,940 <span className="main-price-tag">$1,400</span></p>
             </div>
             <div>
               <Button
                 variant="outlined"
                 sx={{ width: "100%" }}
                 className="checkout-btn dark-blue-btn"
                 size="large"
               >
                 Add to Bag
               </Button>
               <div className="discount-message">
                 <div className="offer">
                   <TrustPilotBox
                     businessUnitId={environment.trustpilot.inlineReview.businessUnitId}
                     templateId={environment.trustpilot.inlineReview.templateId}
                     height="20px"
                   />
                 </div>
               </div>
             </div>
           </div>
        )}
      </div>
      <Modal
        isOpen={shareModal}
        onClose={handleCloseModal}
        onSubmit={handleCloseModal}
        okText="OK"
        title={"Share link"}
        className="sm-modal"
      >
        <div className="share-links-wrap d-flex justify-content-center" style={{gap: "30px"}}>
          <Link href={"#"}><span class="material-icons-outlined">link</span></Link>
          <Link href={"#"}>
            <img src={"/assets/images/icons/whatsapp.svg"} alt="WhatsApp"/>
          </Link>
          <Link href={"#"}>
          <img src={"/assets/images/icons/email-share.svg"} alt="email"/>
          </Link>
        </div>
      </Modal>
    </>
  );
};

export default CreateYourDesign;

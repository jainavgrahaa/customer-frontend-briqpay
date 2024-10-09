/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import NewsLetterForm from "@/_components/common/NewsLetterForm";
import ContactUsNewBlock from "@/_components/common/ContactUsNewBlock";
import ClientsLogos from "@/_components/common/ClientsLogos";
import DFDesktopMenuFooter from "@/_components/common/DFDesktopMenuFooter";
import DFMobileMenuFooter from "@/_components/common/DFMobileMenuFooter";
import useDeviceHelper from "@/_hooks/useDeviceHelper";
import { storeTypes } from "@/_utils";
import { FormattedMessage } from 'react-intl'

// paymentMethod
const DFFooter = ({ getFooterData, domain, deviceType: device, storeId, pageData, translateId, cookieToken }) => {
  const [currecy, setCurrecy] = React.useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [footerData] = useState(getFooterData);
  const { deviceType } = useDeviceHelper(device);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleChange = (event) => {
    setCurrecy(event.target.value);
  };
  
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 176) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  // ************************************
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setScrollPosition(window.scrollY);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => setIsOpen(false), [scrollPosition]);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <footer className="footerdf">
        <div id="footer">
          <div className="container">
            {footerData?.isContactUs && <ContactUsNewBlock />}
            <div className="back-to-top">
              <Button
                variant="text"
                sx={{
                  backgroundColor: "black",
                  color: "#FFFCF6",
                  "&:hover": {
                    backgroundColor: "gray",
                  },
                }}
                onClick={goToTop}
              >
                <p className="f-14 semi-bold mb-0 mr-5"><FormattedMessage id={"common.backtotop"} /></p>
                <span className="material-icons-outlined icons-small f-18">
                  arrow_upward
                </span>{" "}
              </Button>
            </div>
            <div className="footer-top">
              {/* {footerData && (
                <ABDesktopMenuFooter
                  siteComponentNavigations={footerData?.siteNavigation}
                />
              )} */}
              {footerData &&
                (deviceType === "desktop" || deviceType === "tablet") && (
                  <DFDesktopMenuFooter
                    siteComponentNavigations={footerData?.siteNavigation}
                    footerData={footerData}
                    storeId={storeId}
                    pageData={pageData}
                    translateId={translateId}
                    domain={domain}
                    cookieToken={cookieToken}
                  />
                )}
              {deviceType === "mobile" && (
                <div className="footer-subscription-form form-container">
                  <NewsLetterForm
                    variant="footer"
                    fLabel="Name"
                    buttonLabel="Sign up"
                    title={getFooterData?.newsletterTitle}
                    theme={storeTypes[domain]}
                    newsletterDescription = {"For the chance to win a pair of diamond earrings! Plus early access to sales, birthday rewards & promotions."}
                  />
                </div>
              )}
              {footerData && deviceType === "mobile" && (
                <DFMobileMenuFooter
                  siteComponentNavigations={footerData?.siteNavigation}
                  footerData={footerData}
                />
              )}
              {(deviceType === "desktop" || deviceType === "tablet") && (
                <div className="footer-subscription-form form-container">
                  <NewsLetterForm
                    variant="footer"
                    fLabel="Name"
                    buttonLabel="Sign up"
                    title={getFooterData?.newsletterTitle}
                    theme={storeTypes[domain]}
                    newsletterDescription = {"For the chance to win a pair of diamond earrings! Plus early access to sales, birthday rewards & promotions."}
                  />
                </div>
              )}
            </div>
            {deviceType === "mobile" && (
              <div className="footer-mid-df">
                <div className="for-mobile-only">
                  <h6 className="color-white mb-0 text-uppercase"><FormattedMessage id={"common.followus"} /></h6>
                  <ul className="social-list-df">
                    {footerData?.socialMedias?.map((obj, index) => {
                      return (
                        <li key={index}>
                          <Link href={obj?.link ? obj?.link : "#"}>
                            <img
                              style={{ minWidth: "1rem" }}
                              src={obj?.iconsLink}
                              alt={obj?.alt}
                            />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="for-mobile-only">
                  <h6 className="color-white mb-0 text-uppercase"><FormattedMessage id={"common.changelocation"} /></h6>
                  <ul>
                    <div className="flag-list-df">
                      {/* <h6>You’re in:</h6> */}
                      <FormControl
                        variant="standard"
                        className="country-dropdown"
                      >
                        <Select
                          defaultValue="UK"
                          IconComponent={(props) => {
                            return isOpen ? (
                              <span onClick={()=>setIsOpen(!isOpen)} style={{color:"gray",cursor:"pointer" }} className="material-icons-outlined icons-small">
                                expand_less{" "}
                              </span>
                            ) : (
                              <span onClick={()=>setIsOpen(!isOpen)} style={{color:"gray",cursor:"pointer" }} className="material-icons-outlined icons-small">
                                expand_more
                              </span>
                            );
                          }}
                          onOpen={toggleDropdown}
                          onClose={toggleDropdown}
                          open={isOpen}
                        >
                          <MenuItem value="UK">
                              <img src="/assets/images/flag/UK_flag.png" />
                            <span style={{ color: "gray", paddingLeft: "4px" }}>
                              UK (£)
                         
                            </span>
                          </MenuItem>
                          <MenuItem value="US">
                              <img src="/assets/images/flag/UK_flag.png" />
                            <span style={{ color: "white", paddingLeft: "4px" }}>
                            US ($)
                            </span>
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </ul>
                </div>
              </div>
            )}
            <div className="footer-brand-logos">
              {footerData &&
                (deviceType === "desktop" || deviceType === "tablet") && (
                  <ClientsLogos certificates={footerData?.certificates} />
                )}
            </div>
          </div>
        </div>
      </footer>
      <div className="footer-bt">
        <div className="container">
        <ul>
          {footerData?.otherLinks?.map(({ link, label }, index) => {
            return (
              <li key={index}>
                <Link href={link || "#"}>{label}</Link>
              </li>
            );
          })}
        </ul>
        <p className="copy">{getFooterData?.copyright}</p>
        <div className="footer-payment">
          {footerData?.paymentMethod?.map((payment, index) => {
            return (
              <div key={index}>
                <img src={payment?.iconsLink} alt={payment.alt} />
              </div>
            );
          })}
        </div>
        </div>
      </div>
      {showTopBtn && (
        <div className="top-to-btm" id="scroll-btn" onClick={goToTop}>
          <span className="material-icons-outlined">arrow_upward</span>
        </div>
      )}
    </>
  );
};

export default DFFooter;

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FormControl, Select, MenuItem } from "@mui/material";
import NewsLetterForm from "@/_components/common/NewsLetterForm";
import ContactUsNewBlock from "@/_components/common/ContactUsNewBlock";
import ABDesktopMenuFooter from "@/_components/common/ABDesktopMenuFooter";
import ABMobileMenuFooter from "@/_components/common/ABMobileMenuFooter";
import { storeTypes } from "@/_utils";
import useDeviceHelper from "@/_hooks/useDeviceHelper";
import ABClientsLogos from "@/_components/common/ABClientsLogos";
import { translationValue } from "@/_store/translation.slice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { abFooterTranslation } from "@/_utils/customApiData";

const ABFooter = ({ getFooterData, domain, storeId, pageData, cookieToken}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { getStoreTranslations, getNavigationHierarchy } = useAuthHelper()
  const [showTopBtn, setShowTopBtn] = useState(false);
  const { deviceType } = useDeviceHelper();
  const [currecy, setCurrecy] = React.useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [footerData] = useState(getFooterData);
  const [languages, setLanguages] = useState([])
  const [defaultTranslate, setDefaultTranslate] = useState()
  const { translationValue:translateCode } = useSelector((state) => state.translation);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if(storeId) {
      getStoreTranslations({storeId, cookieToken}).then(res => {
        const allowedTranslates = res?.allowedTranslates || [];
        const lang = [
          ...allowedTranslates,
          res?.defaultTranslate
        ]
        setDefaultTranslate(lang.filter(ele => (ele?.translate_id === translateCode || ele?.code === translateCode))?.[0])
        setLanguages([
          ...allowedTranslates,
          res?.defaultTranslate
        ])
      })
    }
  }, [storeId])

  useEffect(() => {
    const translateData = translateCode?.trim().toLowerCase();
    setCurrecy(translateData);
  }, [translateCode]);

  const handleChange = async (event) => {
    let urlSlug = event?.target?.value;
    if (!urlSlug.startsWith('http://') && !urlSlug.startsWith('https://')) {
      urlSlug = `https://${urlSlug}`;
    }
    window.open(urlSlug, '_blank');
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 176) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setScrollPosition(window.scrollY);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect((
  )=>  setIsOpen(false)
  ,[scrollPosition])

  return (
    <>
      <footer className="footerab">
        <div id="footer">
          <div className="container">
            {footerData?.isContactUs && <ContactUsNewBlock />}
            <div className="footer-top">
              {footerData && deviceType==="desktop" && (
                <ABDesktopMenuFooter
                  siteComponentNavigations={footerData?.siteNavigation}
                />
              )}
              {footerData && (
                <ABMobileMenuFooter
                  siteComponentNavigations={footerData?.siteNavigation}
                />
              )}
              <div className="footer-subscription-form form-container">
                {/* <h4>SIGN UP FOR OUR NEWSLETTER</h4> */}
                <NewsLetterForm
                  variant="footer"
                  fLabel="Name"
                  buttonLabel="Subscribe"
                  title={getFooterData?.newsletterTitle}
                  theme={storeTypes[domain]}
                />
              </div>
            </div>
            <div className="footer-mid">
              <ul className="social-list">
                {getFooterData?.socialMedias?.map((obj, index) => {
                  return (
                    <li key={index}>
                      <Link href={obj?.link ? obj?.link : "#"}>
                        <img
                          style={{ minWidth: "1.95rem" }}
                          src={obj?.iconsLink}
                          alt={obj?.alt}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <ul className="flag-list">
                <FormControl variant="standard" className="country-dropdown">
                  <Select
                    defaultValue={domain}
                    IconComponent={(props) => (
                      <span
                        {...props}
                        className={`material-icons icons-small ${props.className}`}
                        onClick={toggleDropdown}
                      >
                        {isOpen ? "keyboard_arrow_up" : "keyboard_arrow_down"}
                      </span>
                    )}
                    onOpen={toggleDropdown}
                    onClose={toggleDropdown}
                    open={isOpen}
                    value={domain}
                    onChange={(e) => handleChange(e)}
                    >
                    {abFooterTranslation?.map((ele) => (
                      <MenuItem value={ele?.value} key={ele?.value}>
                        <div style={{ display: "flex", alignItems: "center",  overflowY: "auto" }}>
                        <span style={{ paddingRight: "4px" }}>
                        <i className={`${ele?.flag}`}></i>
                        </span>
                        <span>
                        {ele?.lable}</span>
                        </div>
                      </MenuItem>
                    ))}
                    {/* <MenuItem value="uk">
                      <span style={{ paddingRight: "4px" }}>
                        <img src="/assets/images/flag/UK_flag.png" />
                      </span>
                      UK (£)
                    </MenuItem>
                    <MenuItem value="fr">
                      <span style={{ paddingRight: "4px" }}>
                        <img src="/assets/images/flag/UK_flag.png" />
                      </span>
                      FR (£)
                    </MenuItem> */}
                  </Select>
                </FormControl>
              </ul>
              {deviceType !== "mobile" && (
                <div className="footer-brand-logos">
                  {footerData && (
                    <ABClientsLogos certificates={footerData?.certificates} />
                  )}
                </div>
              )}
            </div>
            {deviceType === "mobile" && (
              <div className="footer-brand-logos">
                {footerData && (
                  <ABClientsLogos certificates={footerData?.certificates} />
                )}
              </div>
            )}
          </div>
        </div>
      </footer>
      <div className="footer-bt-ab">
        <div className="container">
          <p className="copy">{getFooterData?.copyright}</p>
          <ul>
            {footerData?.otherLinks?.map(({ link, label }, index) => {
              return (
                <li key={index}>
                  <Link href={link}>{label}</Link>
                </li>
              );
            })}
          </ul>
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

export default ABFooter;

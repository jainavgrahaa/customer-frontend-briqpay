/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { React, useState, useEffect, useContext, useRef } from "react";
import { DFDesktopMenu } from "../_components/common/DFDesktopMenu";
import { DFMobileMenu } from "../_components/common/DFMobileMenu";
import HeaderCart from "@/_components/common/HeaderCart";
import { ABMobileMenuStatic } from "@/_components/common/ABMobileMenu-static";
import useDeviceHelper from "@/_hooks/useDeviceHelper";
import { calculateTimeLeft } from "@/_utils";
import { cartDetails } from "@/_store/cart.slice";
import { useDispatch, useSelector } from "react-redux";
import { LoginContext } from "@/_utils/loginCotext";
import environment from "@/_utils/environment";
import TrustPilotBox from "@/_components/trustPilotBox";
import { Button, FormControl, MenuItem, Select, Tooltip } from "@mui/material";
import Search from "@/_components/common/search-functionality/Search";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { translationValue } from "@/_store/translation.slice";
import { useIntl } from "react-intl";
import { FormattedMessage } from "react-intl";

const DFHeader = ({
  getHeaderData,
  deviceType: device,
  expireTime,
  dhms,
  translateId,
  domain,
  currency,
  cartData,
  storeId,
  cookieToken,
  pageData,
  phoneNumber,
  message,
  headerLink,
}) => {
  const [showHeaderDesktopCart, setShowHeaderDesktopCart] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState(true);
  const { showCartModalHeader } = useSelector((state) => state.cart);
  const { userDetails } = useSelector((state) => state.auth);
  const { translationValue: translateCode } = useSelector(
    (state) => state?.translation
  );
  const [desktopMenuShrinked, setDesktopMenuShrinked] = useState(false);
  const [defaultTranslate, setDefaultTranslate] = useState();
  const [allowedTranslates, setAllowedTranslates] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [serachModal, setSerachModal] = useState(false);
  const [isSearchValue, setIsSearchValue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [toggleComponent, setToggleComponent] = useState(1);
  const dispatch = useDispatch();
  const lastScrollPosition = 100;
  const { deviceType } = useDeviceHelper(device);
  const { getStoreTranslations, getNavigationHierarchy } = useAuthHelper();
  const intl = useIntl();

  const topHeaderData = [
    {
      label: <FormattedMessage id="header.excellent" />,
      logo: "/assets/images/diamond_factory_images/header/trustpilot-logo/trustpilot-logo.svg",
      link: "https://uk.trustpilot.com/review/www.diamondsfactory.co.uk?utm_medium=trustbox&utm_source=MicroTrustScore",
    },
    {
      label: <FormattedMessage id="header.priceMatch" />,
      link: "terms-and-conditions#PriceMatch",
    },
    {
      label: <FormattedMessage id="header.finance" />,
      link: "/finance",
    },
    {
      label: <FormattedMessage id="header.clickCollect" />,
      link: "customer-care/finance",
    },
    {
      label: <FormattedMessage id="header.freeReturns" />,
      link: "/refunds-returns",
    },
    {
      label: <FormattedMessage id="header.lifeTimeGuarantee" />,
      link: "/guarantee",
    },
  ];

  const hideHeader = () => {
    setShowHeaderDesktopCart(!showHeaderDesktopCart);
  };
  const setSerachModalfun = (value) => {
    setSerachModal(value);
  };
  const handleChange = async (event) => {
    dispatch(translationValue(event?.target?.value));
    // setCurrecy(event.target.value);
    const res = await getNavigationHierarchy(
      pageData?.id,
      event?.target?.value
    );
    window.location.replace(`/${res?.urlSlug}`);
  };

  useEffect(() => {
    if (storeId) {
      getStoreTranslations({ storeId, cookieToken }).then((res) => {
        const allowedTranslates = res?.allowedTranslates || [];
        const lang = [...allowedTranslates, res?.defaultTranslate];
        setAllowedTranslates(res?.allowedTranslates);
        setDefaultTranslate(
          lang.filter(
            (ele) =>
              ele?.translate_id === translateCode || ele?.code === translateCode
          )?.[0]
        );
        setLanguages([...allowedTranslates, res?.defaultTranslate]);
      });
    }
  }, [storeId, cookieToken]);

  useEffect(() => {
    const timer = setInterval(() => {
      calculateTimeLeft(expireTime, setTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setShowHeaderDesktopCart(showCartModalHeader);
  }, [showCartModalHeader]);

  useEffect(() => {
    dispatch(cartDetails(cartData));
  }, [cartData]);
  const { scrollDir, currSrc } = useScrollDirection();

  useEffect(() => {
    if (scrollDir === "down" && currSrc < 100) {
      setDesktopMenu(true);
    } else if (scrollDir === "down") {
      setDesktopMenu(false);
    } else if (scrollDir === "up") {
      setDesktopMenu(true);
    }
  }, [scrollDir, currSrc]);

  const { openLoginModal } = useContext(LoginContext);

  const [headerH, setHeaderH] = useState(0);

  const headerRef = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      setHeaderH(headerRef.current.clientHeight);
    }, 800);
  }, [headerRef]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        style={{ height: `${headerH}px` }}
        className={`${deviceType === "desktop" ? "header-top-wrap-test" : ""} ${
          desktopMenu ? "" : "header-top-hidden-test"
        }`}
      ></div>

      <header
        id="header-df"
        ref={headerRef}
        className="sticky"
        style={{ background: "#fff" }}
      >
        <div className="fluid-container">
          {deviceType === "desktop" && (
            <div
              className={`header-top-wrap-df ${
                desktopMenu ? "" : "header-top-hidden-df"
              }`}
            >
              <div className="container">
                <div className="header-top">
                  <div className="header-left">
                    {message && headerLink ? (
                      <div className="text-message mr-5">
                        <Link style={{ cursor: "pointer" }} href='/finance'>
                          {message}
                        </Link>
                      </div>
                    ) : (
                      <div className="text-message mr-5">
                        <Link href='/finance'>{message}</Link>
                      </div>
                    )}
                    {dhms && !!Object.values(dhms).length && (
                      <div className="text-rt">
                        <span>
                          {!timeLeft.days ? dhms?.days : timeLeft?.days}d{" "}
                          {!timeLeft.hours ? dhms?.hours : timeLeft?.hours}h{" "}
                          {!timeLeft.minutes
                            ? dhms?.minutes
                            : timeLeft?.minutes}
                          m{" "}
                          {!timeLeft.seconds
                            ? dhms?.seconds
                            : timeLeft?.seconds}
                          s
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="header-right">
                    <ul>
                      {deviceType === "desktop" &&
                        topHeaderData?.map((trustData, index) => {
                          return (
                            <>
                              <div
                                key={index}
                                className="d-flex align-items-center justify-content-center"
                              >
                                {trustData.logo &&
                                domain?.includes("austenblake") &&
                                trustData.logo.includes("trustpilot") ? (
                                  <TrustPilotBox
                                    businessUnitId={
                                      environment.trustpilot.inlineReview
                                        .businessUnitId
                                    }
                                    templateId={
                                      environment.trustpilot.inlineReview
                                        .templateId
                                    }
                                    height="20px"
                                    theme="dark"
                                  />
                                ) : trustData.logo &&
                                  domain?.includes("diamondsfactory") &&
                                  trustData.logo.includes("trustpilot") ? (
                                  <TrustPilotBox
                                    businessUnitId={
                                      environment.trustpilotDF.inlineReview
                                        .businessUnitId
                                    }
                                    templateId={
                                      environment.trustpilotDF.inlineReview
                                        .templateId
                                    }
                                    height="20px"
                                    theme="dark"
                                  />
                                ) : (
                                  <Link href={trustData.link}>
                                    <li>{trustData.label}</li>
                                  </Link>
                                )}
                              </div>
                              {<div className="single-pipe"></div>}
                            </>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="header-container-mobile">
            <div className="header-mobile-links">
              {!!getHeaderData && (
                <DFMobileMenu
                  getHeaderData={getHeaderData}
                  phoneNumber={phoneNumber}
                  searchoption={setSerachModalfun}
                  userDetailsprop={userDetails}
                  searchModalProp={serachModal}
                />
              )}
            </div>

            <div className="header-mobile-logo">
              <Link href="/">
                <img src={getHeaderData?.siteLogo} alt="" />
              </Link>
            </div>

            <div className="header-mobile-links">
              <Link href="/viewings">
                <img src="/assets/images/diamond-factory/header/icons/location.svg" />
              </Link>
              <Link href={`tel:${phoneNumber.replace(/\s+/g, "")}`}>
                <img src="/assets/images/diamond-factory/header/icons/call.svg" />
              </Link>
              <span
                className="cart-header-link cursorP"
                onClick={() => setShowHeaderDesktopCart(!showHeaderDesktopCart)}
              >
                <img src="/assets/images/diamond-factory/header/icons/bag.svg" />
              </span>
            </div>
          </div>
          <div className={`header-container-df fixed-container position-relative`}>
            {deviceType === "desktop" && (
              <div className="top-nav-df">
                {
                  <div className="top-nav-left-links-df">
                    {phoneNumber && (
                      <Tooltip
                        title={phoneNumber.replace(/\s+/g, "")}
                        placement="bottom-start"
                      >
                        <Link href={`tel:${phoneNumber.replace(/\s+/g, "")}`}>
                          <img src="/assets/images/diamond-factory/header/icons/call.svg" />
                        </Link>
                      </Tooltip>
                    )}
                    <Tooltip
                      title={intl.formatMessage({ id: "bookApp.location" })}
                      placement="bottom-start"
                    >
                      <Link href="/viewings">
                        <img src="/assets/images/diamond-factory/header/icons/location.svg" />
                      </Link>
                    </Tooltip>
                    <Tooltip
                      title={intl.formatMessage({ id: "common.bookApp" })}
                      placement="bottom-start"
                    >
                      <Link href="/book-appointment">
                        <img src="/assets/images/diamond-factory/header/icons/calendar.svg" />
                      </Link>
                    </Tooltip>
                  </div>
                }
                <Link
                  href="/"
                  className={`header-logo-df ${
                    desktopMenuShrinked ? "header-logo-shrinked-df" : ""
                  }`}
                >
                  <img
                    height="18.34px"
                    src={
                      getHeaderData?.siteLogo ??
                      "/assets/images/austen-and-blake-logo.png"
                    }
                    alt=""
                  />
                </Link>
                <div className="top-nav-right-links-df">
                  {allowedTranslates?.length > 0 && (
                    <div className="flag-list-df">
                      <FormControl
                        variant="standard"
                        className="country-dropdown"
                        sx={{
                          "& .MuiSelect-root": {
                            borderBottom: "none !important",
                          },
                          "& .MuiInputBase-root::before": {
                            borderBottom: "none !important",
                          },
                          "& .MuiInputBase-root::after": {
                            borderBottom: "none !important",
                          },
                        }}
                      >
                        <Select
                          defaultValue={defaultTranslate?.translate_id}
                          onOpen={toggleDropdown}
                          onClose={toggleDropdown}
                          open={isOpen}
                          value={defaultTranslate?.translate_id}
                          onChange={(e) => handleChange(e)}
                          sx={{
                            "& .MuiSelect-icon": {
                              display: "none", // Hide the select icon
                            },
                          }}
                        >
                          {languages?.map((ele) => (
                            <MenuItem
                              value={ele?.translate_id}
                              key={ele?.objectId}
                            >
                              <span style={{ paddingRight: "4px" }}>
                                <img
                                  src={`/assets/images/flag/${ele?.image}`}
                                />
                              </span>
                              <span style={{ color: "#000" }}>
                                {ele?.code?.toUpperCase()}
                              </span>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  )}
                  <Tooltip
                    title={intl.formatMessage({ id: "common.search" })}
                    placement="bottom-start"
                  >
                    <Link
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setSerachModalfun(true);
                      }}
                    >
                      <img src="/assets/images/diamond-factory/header/icons/search.svg" />
                    </Link>
                  </Tooltip>

                  {userDetails?.isGuest ? (
                    <Tooltip
                      title={intl.formatMessage({ id: "commom.account" })}
                      placement="bottom-start"
                    >
                      <Button onClick={() => openLoginModal()}>
                        <img src="/assets/images/diamond-factory/header/icons/account.svg" />
                      </Button>
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title={intl.formatMessage({ id: "commom.account" })}
                      placement="bottom-start"
                    >
                      <Link href="/my-account">
                        <img src="/assets/images/diamond-factory/header/icons/account.svg" />
                      </Link>
                    </Tooltip>
                  )}
                  {userDetails?.isGuest ? (
                    <Button
                      onClick={() =>
                        openLoginModal(_, _, {
                          redirectPath: "/my-account?tab=wishList",
                        })
                      }
                    >
                      <img src="/assets/images/diamond-factory/header/icons/heart.svg" />
                    </Button>
                  ) : (
                    <Link href="/my-account?tab=wishList">
                      <img src="/assets/images/diamond-factory/header/icons/heart.svg" />
                    </Link>
                  )}
                  <Tooltip
                    title={intl.formatMessage({ id: "common.myBag" })}
                    placement="bottom-start"
                  >
                    <span
                      className="cart-header-link cursorP"
                      onClick={() =>
                        setShowHeaderDesktopCart(!showHeaderDesktopCart)
                      }
                    >
                      <img src="/assets/images/diamond-factory/header/icons/bag.svg" />
                    </span>
                  </Tooltip>
                </div>
              </div>
            )}
            {deviceType === "desktop" && getHeaderData && (
              <DFDesktopMenu getHeaderData={getHeaderData} />
            )}
            <HeaderCart
              visibility={showHeaderDesktopCart}
              hideHeader={hideHeader}
              translateId={translateId}
              currency={currency}
              domain={domain}
              menuShrinked={desktopMenuShrinked}
            />
          </div>
        </div>
        {serachModal && (
          <div className="toggle-wrap">
            <Search
              serachModal={serachModal}
              setserachModal={setSerachModal}
              setIsSearchValue={setIsSearchValue}
              isSearchValue={isSearchValue}
              cookieToken={cookieToken}
              pageData={pageData}
              setLoader={setLoader}
              loader={loader}
              setSearchSuggestions={setSearchSuggestions}
              searchSuggestions={searchSuggestions}
              setLoading={setLoading}
              loading={loading}
              toggleComponent={toggleComponent}
            />
          </div>
        )}
      </header>
    </>
  );
};
export default DFHeader;

function useScrollDirection() {
  const [scrollDir, setScrollDir] = useState("none");
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [currSrc, setCurrScr] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setCurrScr(currentScrollY);
      if (currentScrollY === 0) {
        setScrollDir("none");
      } else if (currentScrollY > prevScrollY) {
        setScrollDir("down");
      } else {
        setScrollDir("up");
      }
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);

  return { scrollDir, currSrc };
}

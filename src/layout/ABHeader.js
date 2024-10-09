/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { React, useState, useEffect, useRef } from "react";
import { ABDesktopMenu } from "../_components/common/ABDesktopMenu";
import { ABMobileMenu } from "../_components/common/ABMobileMenu";
import HeaderCart from "@/_components/common/HeaderCart";
import { ABMobileMenuStatic } from "@/_components/common/ABMobileMenu-static";
import { ABDesktopMenuStatic } from "@/_components/common/ABDesktopMenu-static";
import { calculateTimeLeft } from "@/_utils";
import useDeviceHelper from "@/_hooks/useDeviceHelper";
import { useDispatch, useSelector } from "react-redux";
import { cartDetails, showHeaderCartModal } from "@/_store/cart.slice";
import AsmHeader from "./AsmHeader";
import { ASM_USER_EMAIL } from "@/_utils/userToken";
import { getCookie } from "cookies-next";
import Search from "@/_components/common/search-functionality/Search";
import { useIntl } from "react-intl";
import { FormattedMessage } from 'react-intl'
import { Tooltip } from "@mui/material";

const ABHeader = ({
  getHeaderData,
  deviceType: device,
  expireTime,
  dhms,
  message,
  headerLink,
  translateId,
  cartData,
  currency,
  domain,
  storeId,
  cookieToken,
  pageData,
  phoneNumber
}) => {
  const { deviceType } = useDeviceHelper(device);
  const { showCartModalHeader } = useSelector((state) => state.cart);
  const [showHeaderDesktopCart, setShowHeaderDesktopCart] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState(true);
  const [desktopMenuShrinked, setDesktopMenuShrinked] = useState(false);
  const [serachModal, setSerachModal] = useState(false);
  const [isSearchValue, setIsSearchValue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [toggleComponent, setToggleComponent] = useState(1);
  const { userDetails } = useSelector((state) => state.auth);
  const intl = useIntl();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const dispatch = useDispatch();

  const hideHeader = () => {
    setShowHeaderDesktopCart(!showHeaderDesktopCart);
    dispatch(showHeaderCartModal(!showHeaderDesktopCart));
  };

  useEffect(() => {
    setShowHeaderDesktopCart(showCartModalHeader);
  }, [showCartModalHeader]);

  useEffect(() => {
    const timer = setInterval(() => {
      calculateTimeLeft(expireTime, setTimeLeft);
    }, 1000);
    return () => clearInterval(timer);
  }, [expireTime]);

  const { scrollDir, currSrc } = useScrollDirection();

  useEffect(() => {
    if (cartData) {
      dispatch(cartDetails(cartData));
    }
  }, [cartData]);

  useEffect(() => {
    if (scrollDir === "down" && currSrc < 100) {
      setDesktopMenu(true);
      setDesktopMenuShrinked(false);
    } else if (scrollDir === "down") {
      setDesktopMenu(false);
      setDesktopMenuShrinked(true);
    } else if (scrollDir === "up") {
      setDesktopMenu(true);
      setDesktopMenuShrinked(false);
    }
  }, [scrollDir, currSrc]);
  const [headerH, setHeaderH] = useState(0);
  const headerRef = useRef(null);

  useEffect(() => {
    const setHeight = () => {
      if (headerRef.current) {
        setTimeout(() => {
          setHeaderH(headerRef.current.clientHeight);
        }, 100);
      }
    };

    setTimeout(setHeight, 0);
  }, []);

  return (
    <>
      <div
        style={{ height: `${headerH}px` }}
        className={`header-top-wrap-test ${desktopMenu ? "" : "header-top-hidden-test"
          }`}
      ></div>
      <header
        id="header-ab"
        ref={headerRef}
        className="sticky fixed-container"
        style={{ background: "#fff" }}
      >
        <div className="fluid-container">
          {!!message && !!dhms && !!Object.values(dhms).length && (
            <div
              className={`header-top-wrap ${desktopMenu ? "" : "header-top-hidden"
                }`}
            >
              <div className="container p-0">
                <div className="header-top">
                  {message && headerLink ? (
                    <div className="text-message">
                      <a style={{ cursor: "pointer" }} href={headerLink}>
                        {message}
                      </a>
                    </div>
                  ) : (
                    <div className="text-message">{message}</div>
                  )}
                  {dhms && !!Object.values(dhms).length && (
                    <div className="text-rt">
                      <FormattedMessage id={"ends.in"} />{" "}
                      <span>
                        {!timeLeft.days ? dhms?.days : timeLeft?.days}d{" "}
                        {!timeLeft.hours ? dhms?.hours : timeLeft?.hours}h{" "}
                        {!timeLeft.minutes ? dhms?.minutes : timeLeft?.minutes}m{" "}
                        {!timeLeft.seconds ? dhms?.seconds : timeLeft?.seconds}s
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {getCookie(ASM_USER_EMAIL) && (
            <AsmHeader
              storeId={storeId}
              asmUserEmail={getCookie(ASM_USER_EMAIL)}
            />
          )}
          <div className="header-container-mobile">
            <div className="header-mobile-links">
              {!!getHeaderData ? (
                <ABMobileMenu
                  getHeaderData={getHeaderData}
                  storeId={storeId}
                  translateId={translateId}
                  domain={domain}
                  userDetailsProp={userDetails}
                  phoneNumberProp={phoneNumber}
                />
              ) : (
                <ABMobileMenuStatic />
              )}
              <Link href="/viewings">
                <svg>
                  <use href={`/assets/icons/icons.svg#location_svg`} />
                </svg>
              </Link>
            </div>

            <div className="header-mobile-logo">
              <Link href="/">
                <img src={getHeaderData?.siteLogo} alt="" />
              </Link>
            </div>

            <div className="header-mobile-links">
              {
                phoneNumber &&
                <Link href={`tel:${phoneNumber.replace(/\s+/g, '')}`} title={phoneNumber.replace(/\s+/g, '')}>
                  <svg>
                    <use href={`/assets/icons/icons.svg#telephone_svg`} />
                  </svg>
                </Link>
              }
              <span
                onClick={() => setShowHeaderDesktopCart(!showHeaderDesktopCart)}
              >
                <svg>
                  <use href={`/assets/icons/icons.svg#shopping_cart`} />
                </svg>
              </span>
            </div>
          </div>
          <div className="header-container">
            {deviceType === "desktop" && (
              <div className={`top-nav ${desktopMenuShrinked && "rel"}`}>
                {desktopMenu && (
                  <div className="top-nav-left-links">
                    <Tooltip title={intl.formatMessage({ id: 'common.bookApp' })} placement="bottom-start">
                      <Link href="/book-appointment">
                      <svg>
                        <use
                          href={`/assets/icons/icons.svg#book_appointment_svg`}
                        />
                      </svg>
                      <span><FormattedMessage id={"common.bookApp"} /></span>
                    </Link>
                    </Tooltip>
                    
                    {
                    phoneNumber &&
                      <Tooltip title={phoneNumber.replace(/\s+/g, '')} placement="bottom-start">
                        <Link href={`tel:${phoneNumber.replace(/\s+/g, '')}`}>
                          <svg>
                            <use href={`/assets/icons/icons.svg#telephone_svg`} />
                          </svg>
                          <span>{phoneNumber}</span>
                        </Link>
                      </Tooltip>
                    }
                    <Tooltip title={intl.formatMessage({ id: 'bookApp.location' })} placement="bottom-start">
                    <Link href="/viewings">
                      <svg>
                        <use href={`/assets/icons/icons.svg#location_svg`} />
                      </svg>
                    </Link>
                    </Tooltip>
                  </div>
                )}
                <Link
                  href="/"
                  className={`header-logo ${desktopMenuShrinked ? "header-logo-shrinked" : ""
                    }`}
                >
                  <img
                    src={
                      getHeaderData?.siteLogo ??
                      "/assets/images/austen-and-blake-logo.png"
                    }
                    alt=""
                  />
                </Link>
                {desktopMenuShrinked &&
                  (getHeaderData ? (
                    <ABDesktopMenu
                      desktopMenuShrinked={desktopMenuShrinked}
                      getHeaderData={getHeaderData}
                      extraClass={"shrinked-header"}
                    />
                  ) : (
                    <ABDesktopMenuStatic />
                  ))}
                <div className="top-nav-right-links">
                  <Tooltip title={intl.formatMessage({ id: 'common.search' })} placement="bottom-start">
                    <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setSerachModal(true);
                    }}
                  >
                    <svg>
                      <use href={`/assets/icons/icons.svg#search_svg`} />
                    </svg>
                  </Link>
                  </Tooltip>
                  
                  {desktopMenu && (
                    <Tooltip title={intl.formatMessage({ id: 'account.title' })} placement="bottom-start">
                      <Link
                      href={
                        userDetails?.isGuest ? "/account-login" : "/my-account"
                      }
                    >
                      <svg>
                        <use href={`/assets/icons/icons.svg#profile_svg`} />
                      </svg>
                    </Link>
                    </Tooltip>
                    
                  )}
                  {desktopMenu && (
                    <Link href={userDetails?.isGuest ? "/account-login" : "/my-account?tab=wishlist"}>
                      <svg>
                        <use href={`/assets/icons/icons.svg#favourite_svg`} />
                      </svg>
                    </Link>
                  )}
                  <Tooltip title={intl.formatMessage({ id: 'common.myBag' })} placement="bottom-start">
                    <span
                    className="cart-header-link cursorP"
                    onClick={() =>
                      setShowHeaderDesktopCart(!showHeaderDesktopCart)
                    }
                  >
                    <svg>
                      <use href={`/assets/icons/icons.svg#shopping_cart`} />
                    </svg>
                  </span>
                  </Tooltip>
                  
                </div>
              </div>
            )}

            {!desktopMenuShrinked &&
              deviceType === "desktop" &&
              (getHeaderData ? (
                <ABDesktopMenu
                  getHeaderData={getHeaderData}
                  extraClass={"container p-0"}
                />
              ) : (
                <ABDesktopMenuStatic />
              ))}
            {/* <DFDesktopMenu /> */}
            <HeaderCart
              visibility={showHeaderDesktopCart}
              hideHeader={hideHeader}
              translateId={translateId}
              currency={currency}
              domain={domain}
              menuShrinked={desktopMenuShrinked}
            />
          </div>
          {/* <HeaderCart
            visibility={showHeaderDesktopCart}
            hideHeader={hideHeader}
          /> */}
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

export default ABHeader;

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

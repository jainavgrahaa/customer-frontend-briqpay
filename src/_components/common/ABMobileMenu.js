/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import React, { useState, useEffect, createRef, forwardRef } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { flushSync } from "react-dom";
import dynamic from 'next/dynamic'
const SelectAppointmentModal = dynamic(() => import('@/_components/staticLayout/select-appointment-modal'), { ssr: false })
import { FormattedMessage } from "react-intl";
import Search from "./search-functionality/Search";
import { useIntl } from "react-intl";

const MenuItemComponent = (props) => {
  const { className, onClick, link, children, linkLevel } = props;
  const ref = createRef;
  // If link is not set return the orinary ListItem
  //   if (linkLevel && (!link || typeof link !== 'string')) {
  if (!linkLevel) {
    return (
      <ListItemButton
        className={className}
        // eslint-disable-next-line react/display-name
        component={forwardRef((props, ref) => (
          <Link {...props} ref={ref} activeclassname="active" />
        ))}
        onClick={onClick}
        to={link}
      >
        {children}
      </ListItemButton>
    );
  }

  // Return a LitItem with a link component
  return (
    <ListItemButton
      className={className}
      // children={children}
      // eslint-disable-next-line react/display-name
      component={forwardRef((props, ref) => (
        <Link {...props} ref={ref} activeclassname="active" />
      ))}
      href={link || "#"}
      onClick={onClick}
    >
      {children}
    </ListItemButton>
  );
};

const MenuItemMobile = (props) => {
  const {
    label,
    link,
    subRoutes = [],
    secondLevel = false,
    parentLink = null,
    toggleActiveEvent,
    currentActive,
    viewAll,
    linkShowAll,
    getToRoot
  } = props;
  const isExpandable = subRoutes && subRoutes.length > 0;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (currentActive === link) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [currentActive]);

  const handleClick = (event) => {
    const linkDisabled = !secondLevel;
    if (linkDisabled && isExpandable) {
      event.preventDefault();
    } else {
    }
    if (!open && !secondLevel) {
      toggleActiveEvent(link);
    }
    setOpen(!open);
  };
  const MenuItemRoot = (
    <MenuItemComponent
      linkLevel={secondLevel}
      link={props?.titleUrl || link}
      // link={secondLevel ? `/${parentLink}/${link}` : `/${props?.titleUrl || link}`}
      onClick={(e) => { handleClick(e); secondLevel && getToRoot() }}
      className="mobile-menu-item"
    >
      {/* { secondLevel && <ListItemIcon><span className="material-icons text-white">arrow_right</span></ListItemIcon>} */}
      {secondLevel && link != "#" && (
        <a href={props?.titleUrl || link || "#"}>
          <img src={link} />
        </a>
      )}
      <ListItemText
        primary={label}
        className={` ${viewAll === true ? "view-all-link" : ""}`}
      />
      {viewAll && <span className="material-icons">keyboard_arrow_right</span>}
      {/* Display the expand menu if the item has children */}
      {isExpandable && !open && (
        <span className="material-icons-outlined icons-small">
          chevron_right
        </span>
      )}
      {isExpandable && open && (
        <span className="material-icons-outlined icons-small">
          keyboard_arrow_down
        </span>
      )}
    </MenuItemComponent>
  );

  const MenuItemChildren = isExpandable ? (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {subRoutes?.map((item, index) => (
          <MenuItemMobile
            {...item}
            parentLink={link}
            secondLevel={true}
            key={index}
          />
        ))}
      </List>
      {linkShowAll.show && (
        <div className="more-actions view-all-links">
          <ul className="more-actions-list">
            <li>
              <Link href={linkShowAll?.labelLink || "#"}>
                <span>{linkShowAll.label}</span>
                <span className="material-icons-outlined icons-small">
                  chevron_right
                </span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </Collapse>
  ) : null;

  return (
    <>
      {MenuItemRoot}
      {MenuItemChildren}
    </>
  );
};

const BackLink = ({ getToRoot }) => {
  return (
    <div className="mobile-menu-link mobile-menu-close" onClick={getToRoot}>
      <span className="material-icons icons-small">chevron_left</span> Back
    </div>
  );
};

export const ABMobileMenu = ({ getHeaderData, storeId, translateId, domain, cookieToken, pageData,userDetailsProp,phoneNumberProp }) => {
  const [headerData] = useState(
    getHeaderData?.siteNavigation?.sort((a, b) => a.sequence - b.sequence)
  );
  const getSquence = (array) => {
    return array?.sort((a, b) => a.sequence - b.sequence);
  };
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [currentActiveNav, setCurrentActiveNav] = useState(null);
  const [currentActiveParent, setCurrentActiveParent] = useState(null);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [serachModal, setSerachModal] = useState(false);
  const [isSearchValue, setIsSearchValue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [toggleComponent, setToggleComponent] = useState(1);
  const intl = useIntl();
  const handleButtonClick = () => {
    setIsSelectModalOpen(true);
  };
  const handleSelectCloseButtonClick = () => {
    setIsSelectModalOpen(false);
  };
  const toggleActive = (data) => {
    flushSync(() => {
      setCurrentActiveNav(data);
    });
  };

  const toggleParent = (data) => {
    setCurrentActiveParent(data);
  };

  const toggleRootLinks = (link) => {
    toggleParent(link);
  };

  const getToRoot = () => {
    setCurrentActiveParent("");
    setCurrentActiveNav(null);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
    setCurrentActiveParent("");
    setCurrentActiveNav(null);
  };

  return (
    <>
      {/* {JSON.stringify(routes)} */}
      <div className="menu-mobile ab-menu-mobile">
        {!showMobileMenu && (
          <button className="mobileMenuToggle" onClick={toggleMobileMenu}>
            <span className="material-icons icons-small">menu</span>
          </button>
        )}
        {showMobileMenu && (
          <div id="mobileNav">
            <button
              className={`mobileMenuToggle closeToggle ${!currentActiveParent ? "is-active" : ""
                }`}
              onClick={toggleMobileMenu}
            >
              <span className="material-icons">close</span>
            </button>
            <ul className="nav root-nav has-searchBox">
              <li>
                {
                  !serachModal ?
                    <div className="search-box">
                      <span className="material-icons-outlined icons-small">
                        search
                      </span>
                      <input type="text" defaultValue="" placeholder="Search"
                        onClick={(e) => {
                          e.preventDefault();
                          setSerachModal(true);
                        }} />
                    </div> :
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
                }
              </li>
            </ul>
            <ul className="nav root-nav">
              {getHeaderData?.siteNavigation?.map((item, index) => {
                const menuItems =
                  item.showTabs &&
                  item?.section.filter((subitem) => !subitem.tabs);
                return (
                  <li key={index} className="mobile-menu-item">
                    <div
                      id={`nav${index}`}
                      className="mobile-menu-link"
                      onClick={() => toggleRootLinks(`nav${index}`)}
                    >
                      <span>{item?.label}</span>
                      <span className="material-icons">chevron_right</span>
                    </div>
                    <div
                      className={`mobile-subnav ${currentActiveParent === `nav${index}` ? "is-active" : ""
                        }`}
                    >
                      <BackLink getToRoot={getToRoot} />
                      <div className={`collapsible-nav`}>
                        <div className="w-100">
                          <ul
                            className={`collapsible-nav-menu nav flex-column ${item.type === "2" && "type-2-menu"
                              }`}
                          >
                            {item.showTabs ? (
                              <>
                                {item?.tabValues?.map((tabValue, tabIndex) => {
                                  const tabMenuItems = item?.section.filter(
                                    (subitem) =>
                                      subitem.tabs === tabValue.tabValue
                                  );

                                  return (
                                    <div key={tabValue}>
                                      <h4
                                        className="collapsible-nav-subtitle"
                                        key={tabIndex}
                                      >
                                        {tabValue.tabValue}
                                      </h4>
                                      {tabMenuItems?.map(
                                        (subitem, subindex) => {
                                          return (
                                            <li key={subindex}>
                                              <MenuItemMobile
                                                {...subitem}
                                                link={"#"}
                                                subRoutes={subitem.link}
                                                currentActive={currentActiveNav}
                                                toggleActiveEvent={() =>
                                                  toggleActive(subitem.label)
                                                }
                                              />
                                            </li>
                                          );
                                        }
                                      )}
                                    </div>
                                  );
                                })}
                                <div>
                                  {menuItems?.map((subitem, subindex) => {
                                    return (
                                      <li
                                        key={subindex}
                                        className="menu-item-without-tab"
                                      >
                                        <MenuItemMobile
                                          {...subitem}
                                          link={"#"}
                                          subRoutes={subitem.link}
                                          currentActive={currentActiveNav}
                                          toggleActiveEvent={() =>
                                            toggleActive(subitem.label)
                                          }
                                        />
                                      </li>
                                    );
                                  })}
                                </div>
                              </>
                            ) : (
                              item?.section?.map((subitem, subindex) => (
                                <li key={subindex}>
                                  <MenuItemMobile
                                    {...subitem}
                                    link={"#"}
                                    subRoutes={subitem.link}
                                    currentActive={currentActiveNav}
                                    getToRoot={getToRoot}
                                    toggleActiveEvent={() =>
                                      toggleActive(subitem.label)
                                    }
                                  />
                                </li>
                              ))
                            )}
                            <div className="additional-links">
                              {item?.additionalLink?.map(
                                (additionalLinkItem, additionalLinkIndex) => (
                                  <div
                                    className="more-actions"
                                    key={additionalLinkItem.label}
                                  >
                                    <ul className="more-actions-list">
                                      <li key={additionalLinkIndex}>
                                        {item.type == "2" ? (
                                          <Link
                                            href="#"
                                            className="type-2-additional-link"
                                          >
                                            <img
                                              src={additionalLinkItem.iconLink}
                                              alt={"icon"}
                                            />
                                            <span>
                                              {additionalLinkItem.label}
                                            </span>
                                          </Link>
                                        ) : (
                                          <Link href="#">
                                            <span>
                                              {additionalLinkItem.label}
                                            </span>
                                            <span className="material-icons-outlined icons-small">
                                              chevron_right
                                            </span>
                                          </Link>
                                        )}
                                      </li>
                                    </ul>
                                  </div>
                                )
                              )}
                            </div>
                            <div className="mobile-menu-banner">
                              <img src={item?.imageUrl} />
                            </div>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <ul className="level-specific-menu-items">
              <li
                className={`mobile-menu-actions ${!currentActiveParent ? "is-active" : ""
                  }`}
              >
                <div className="menu-actions-1">
                  <Link
                      href={
                        userDetailsProp?.isGuest ? "/account-login" : "/my-account"
                      }
                      title={intl.formatMessage({ id: 'commom.account' })}
                    >
                      <svg>
                        <use href={`/assets/icons/icons.svg#profile_svg`} />
                      </svg>
                      <span>My account</span>
                    </Link>
                  <Link href={userDetailsProp?.isGuest ? "/account-login" : "/my-account?tab=wishlist"}>
                      <svg>
                        <use href={`/assets/icons/icons.svg#favourite_svg`} />
                      </svg>
                      <span>Wishlist</span>
                    </Link>
                </div>
                <div className="menu-actions-2">
                  <div>
                    <Link href="/viewings">
                      <span className="material-icons-outlined icons-small">
                        location_on
                      </span>{" "}
                      <span>Our Stores</span>
                    </Link>
                    {
                      phoneNumberProp &&
                      <Link href={`tel:${phoneNumberProp.replace(/\s+/g, '')}`} title={phoneNumberProp.replace(/\s+/g, '')}>
                        <svg>
                          <use href={`/assets/icons/icons.svg#telephone_svg`} />
                        </svg>
                        <span>{phoneNumberProp}</span>
                      </Link>
                    }
                  </div>
                  <div>
                    <Link href="#select-appointment">
                      <span className="material-icons-outlined icons-small">
                        calendar_month
                      </span>{" "}
                      <span>
                        <FormattedMessage id="common.bookApp" /></span>
                    </Link>
                  </div>
                </div>
                <div className="menu-actions-3">
                  <Link href="/education">
                    <span>Guides</span>
                  </Link>
                  <Link href="/review">
                    <span>Reviews</span>
                  </Link>
                  <Link href="/faqs">
                    <span>FAQs</span>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        )}
        {
          isSelectModalOpen ?
            <SelectAppointmentModal
              openButtonModal={isSelectModalOpen}
              closeButtonModal={handleSelectCloseButtonClick}
              storeId={storeId}
              translateId={translateId}
              domain={domain}
            /> : null
        }
      </div>
    </>
  );
};

export default {
  ABMobileMenu,
};

import Link from "next/link";
import React, { useState, useEffect, createRef, forwardRef } from "react";
import { Button } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { flushSync } from "react-dom";
import useDeviceHelper from "@/_hooks/useDeviceHelper";
import MultiListMenu from "./menuTypes/multiListMenu";
import SingleRowImageMenu from "./menuTypes/singleRowImageMenu";
import SingleImageMenu from "./menuTypes/singleImageMenu";
import { stepCheck } from "@/_utils";
import { useIntl } from 'react-intl';

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
      style={{ width: "50%" }}
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
  } = props;
  const isExpandable = subRoutes && subRoutes.length > 0;
  const [open, setOpen] = useState(false);
  const { deviceType } = useDeviceHelper();
  const [hasMore, setHasMore] = useState(false);

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
      onClick={(e) => handleClick(e)}
      className="mobile-menu-item"
    >
      {/* { secondLevel && <ListItemIcon><span className="material-icons text-white">arrow_right</span></ListItemIcon>} */}
      {secondLevel && link != "#" && link && (
        <a href={props?.titleUrl || link || "#"} className="icon-img">
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
        <span className="material-icons-outlined icons-small">add</span>
      )}
      {isExpandable && open && (
        <span className="material-icons-outlined icons-small">
          <span className="material-symbols-outlined">minimize</span>
        </span>
      )}
    </MenuItemComponent>
  );

  const MenuItemChildren = isExpandable ? (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <div className="d-flex flex-wrap" style={{ rowGap: "10px" }}>
          {deviceType === "mobile"
            ? subRoutes
              ?.slice(0, 6)
              ?.map((item, index) => (
                <MenuItemMobile
                  {...item}
                  parentLink={link}
                  secondLevel={true}
                  key={`mobile-${index}`}
                />
              ))
            : subRoutes?.map((item, index) => (
              <MenuItemMobile
                {...item}
                parentLink={link}
                secondLevel={true}
                key={`subroutemobile-${index}`}
              />
            ))}
          {deviceType === "mobile" && subRoutes.length > 6 && (
            <div className="d-flex flex-wrap" style={{ rowGap: "10px" }}>
              {hasMore ? (
                <>
                  {subRoutes?.slice(6)?.map((item, index) => (
                    <MenuItemMobile
                      {...item}
                      parentLink={link}
                      secondLevel={true}
                      key={`mobileviewmore-${index}`}
                    />
                  ))}{" "}
                  <div
                    className="button-show"
                    onClick={() => setHasMore(false)}
                    style={{ width: "100%" }}
                  >
                    Show Less
                  </div>
                </>
              ) : (
                <div className="button-show" onClick={() => setHasMore(true)}>
                  See more ({subRoutes.length - 6}){" "}
                  <span className="material-icons-outlined icons-small">
                    expand_more
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
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

const BackLink = ({ getToRoot, itemLabel }) => {
  return (
    <div className="mobile-menu-link mobile-menu-close">
      <div className="mobile-menu-back" onClick={getToRoot}>
        <span className="material-icons-outlined icons-small">
          chevron_left
        </span>{" "}
        {itemLabel}
      </div>
      <div className="mobile-menu-showall">shop all</div>
    </div>
  );
};
export const TabsComponent = ({ tabData, tabValues, type = 3 }) => {
  const weddingRingData = tabValues.map((t) => {
    return {
      gender: t.tabValue,
      data: tabData.filter((d) => d.tabs === t.tabValue),
    };
  });
  return (
    <>
      {weddingRingData?.map((linkData) => {
        return (
          <div
            key={`wdata-${index}`}
            className={`menu-grid-item col-lg-6 col-md-12`}
          >
            <h4>{linkData?.gender}</h4>
            <div className="row gy-5">
              {linkData?.data?.map((items, index) => {
                return (
                  <>
                    {items?.isLeftAlign && (
                      <div
                        className={`grid-item-category ${items?.type == "template" ? "col-md-12" : "col-md-4"
                          } `}
                        key={`weddingdata-${index}`}
                      >
                        <div className="grid-item-title">
                          {items?.isClickable ? (
                            <Link
                              href={`${items?.lableLink}`}
                              className="view-all-link"
                            >
                              {items.label}
                              <img
                                src={"/assets/icons/raw-svgs/arrow-right.svg"}
                              />
                            </Link>
                          ) : (
                            <h4>{items?.label} </h4>
                          )}
                        </div>
                        <div
                          className={` grid-items-with-icon  ${items?.type == "template" ? "d-flex" : "grid-items"
                            }`}
                        >
                          {items?.link?.map((data, index) => {
                            return (
                              <Link href="#" key={`icon-${index}`}>
                                {data?.showIcon && data?.label !== "Price" && (
                                  <img src={data?.link} />
                                )}
                                <span>{data?.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};
export const SectionMenu = ({ section, type, sectionData }) => {
  // const [activeTab, setActiveTab] = useState(
  //   sectionData?.tabValues?.[0]?.tabValue
  // );
  // const [filterTabData, setFilterTabData] = useState();

  // useEffect(() => {
  //   const filterData = section?.filter((data) => data.tabs === activeTab);
  //   setFilterTabData(filterData);
  // }, [activeTab]);
  // const handleTabClick = (tabValue) => {
  //   setActiveTab(tabValue);
  // };
  return (
    <section
      className={`menu-grid-container ${type === "4" ? "education-menu-tab" : ""
        }`}
    >
      <div
        className={`menu-items ${type === "4" ? "" : "row justify-content-between"
          } ${type === "3" ? "d-none" : ""}`}
      >
        {sectionData?.section?.map((linkData) => {
          return (
            linkData?.isLeftAlign && (
              <div
                key={linkData?.label}
                className={`menu-grid-item ${type !== "4" ? "col-lg-2 col-md-2" : "col-md-2"
                  } ${linkData?.link?.length > 12 ? "col-md-4" : ""}`}
              >
                <div className="grid-item-category">
                  <div className="grid-item-title">
                    {linkData?.isClickable ? (
                      <Link
                        href={`${linkData?.lableLink}`}
                        className="view-all-link"
                      >
                        {linkData?.label}
                        <img src={"/assets/icons/raw-svgs/arrow-right.svg"} />
                      </Link>
                    ) : (
                      <h4>{linkData?.label} </h4>
                    )}
                  </div>
                  <div className={`grid-items grid-items-with-icon `}>
                    <div className="grid-item-container">
                      <div className="grid-item-one">
                        {linkData?.link?.slice(0, 12)?.map((data, index) => {
                          return (
                            <Link href="#" key={`item1-${index}`}>
                              {data?.showIcon &&
                                linkData?.label !== "Price" && (
                                  <img src={data?.link} />
                                )}
                              <span>{data?.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                      {linkData?.link?.length > 12 && (
                        <div className="grid-item-one">
                          {linkData?.link?.slice(12)?.map((data, index) => {
                            return (
                              <Link href="#" key={`item2-${index}`}>
                                {data?.showIcon && <img src={data?.link} />}
                                <span>{data?.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          );
        })}
      </div>
      {sectionData?.showTabs && (
        <div className="row menu-items even-border">
          <TabsComponent
            tabData={sectionData?.section}
            tabValues={sectionData?.tabValues}
          />
        </div>
      )}
      <div
        className={`menu-grid-banner-tab ${type === "4" ? "education-menu-tab-right" : ""
          }`}
      >
        {sectionData?.section?.map((linkData, index) => {
          return (
            !linkData?.isLeftAlign && (
              <div className="grid-banner">
                <div>
                  {linkData?.isClickable ? (
                    <Link
                      href={`${linkData?.lableLink}`}
                      className={`view-all-link col-6`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <h4
                        style={{
                          fontSize: "14px",
                          textTransform: "uppercase",
                          color: "#957127",
                          fontWeight: "700",
                        }}
                      >
                        {linkData?.label}
                      </h4>
                      <img src={"/assets/icons/raw-svgs/arrow-right.svg"} />
                    </Link>
                  ) : linkData?.linkShowAll?.show ? (
                    <div>
                      <h4>{linkData?.label}</h4>
                      <Link
                        href={`${linkData?.lableLink}`}
                        className="view-all-link dark-brown"
                      >
                        <h4>{linkData?.linkShowAll?.label}</h4>
                        <img src={"/assets/icons/raw-svgs/arrow-right.svg"} />
                      </Link>
                    </div>
                  ) : (
                    <h4>{linkData?.label}</h4>
                  )}
                </div>

                <div>
                  {stepCheck(type, "1") ? (
                    <MultiListMenu linkData={linkData} />
                  ) : stepCheck(type, "4") ? (
                    <SingleRowImageMenu linkData={linkData} />
                  ) : (
                    <SingleImageMenu linkData={linkData} />
                  )}
                </div>
              </div>
            )
          );
        })}
      </div>
    </section>
  );
};
export const DFMobileMenu = ({ getHeaderData, phoneNumber, searchoption, userDetailsprop,searchModalProp }) => {
  const [headerData] = useState(
    getHeaderData?.siteNavigation?.sort((a, b) => a.sequence - b.sequence)
  );
  const { deviceType } = useDeviceHelper();
  const getSquence = (array) => {
    return array?.sort((a, b) => a.sequence - b.sequence);
  };
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [currentActiveNav, setCurrentActiveNav] = useState(null);
  const [currentActiveParent, setCurrentActiveParent] = useState(null);
  const [itemLabel, setItemLabel] = useState("");
  const [activeTab, setActiveTab] = useState("WOMEN");
  const intl = useIntl();
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
  useEffect(() => {
    if (searchModalProp) {
      setShowMobileMenu(false);
    }
  }, [searchModalProp]);
  return (
    <>
      <div className="menu-mobile df-menu-mobile">
        {!showMobileMenu && (
          <button className="mobileMenuToggle" onClick={toggleMobileMenu}>
            <span className="material-icons-outlined icons-small">menu</span>
          </button>
        )}
        {showMobileMenu && (
          <>
            <div id="mobileNav">
              <div className="header-container-mobile-close">
                <button
                  // className={`mobileMenuToggle closeToggle ${
                  //   !currentActiveParent ? "is-active" : ""
                  // }`}
                  onClick={toggleMobileMenu}
                >
                  <span className="material-icons-outlined icons-small">
                    close
                  </span>
                </button>
                <div className="header-mobile-logo">
                  <img src={getHeaderData?.siteLogo} alt="" />
                </div>

                <div className="header-mobile-links">
                  <Link href="/viewings">
                    <img src="/assets/images/diamond-factory/header/icons/location.svg" />
                  </Link>
                  <Link href={`tel:${phoneNumber.replace(/\s+/g, '')}`}>
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

              <ul className="nav root-nav has-searchBox">
                <li>
                  <div className="search-box">
                    <span className="material-icons-outlined icons-small">
                      search
                    </span>
                    <input type="text" defaultValue="" placeholder="Search" />
                  </div>
                </li>
              </ul>
              <ul className="root-nav">
                {getHeaderData?.siteNavigation?.map((item, index) => {
                  const menuItems =
                    item.showTabs &&
                    item?.section.filter((subitem) => !subitem.tabs);
                  const tabMenuItems = item?.section.filter(
                    (subitem) => subitem.tabs === activeTab
                  );

                  return (
                    <li key={`navvalue-${index}`} className="mobile-menu-item">
                      <div
                        id={`nav${index}`}
                        className="mobile-menu-link"
                        onClick={() => {
                          toggleRootLinks(`nav${index}`);
                          setItemLabel(item?.label);
                        }}
                      >
                        <span>{item?.label}</span>
                        <span className="material-icons-outlined icons-small">
                          chevron_right
                        </span>
                      </div>
                      <div
                        className={`mobile-subnav ${currentActiveParent === `nav${index}`
                            ? "is-active"
                            : ""
                          }`}
                      >
                        <div className="header-container-mobile-subnav-close">
                          <button
                            // className={`mobileMenuToggle closeToggle ${
                            //   !currentActiveParent ? "is-active" : ""
                            // }`}
                            onClick={toggleMobileMenu}
                          >
                            <span className="material-icons-outlined icons-small">
                              close
                            </span>
                          </button>
                          <div className="header-mobile-logo">
                            <img src={getHeaderData?.siteLogo} alt="" />
                          </div>
                          <div className="header-mobile-links">
                  <Link href="/viewings">
                    <img src="/assets/images/diamond-factory/header/icons/location.svg" />
                  </Link>
                  <Link href={`tel:${phoneNumber.replace(/\s+/g, '')}`}>
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
                        <BackLink
                          getToRoot={getToRoot}
                          currentActiveParent={currentActiveParent}
                          itemLabel={itemLabel}
                        />
                        {deviceType === "mobile" && (
                          <div className={`collapsible-nav`}>
                            <div className="w-100">
                              <ul
                                className={`collapsible-nav-menu nav flex-column ${item.type === "2" && "type-2-menu"
                                  }`}
                              >
                                {item.showTabs ? (
                                  <>
                                    {/* {tabs.length > 0 && ( */}
                                    <div className="d-flex row px-4">
                                      {item?.tabValues.map((ele) => (
                                        <div
                                          className={`${activeTab === ele.tabValue
                                              ? "gendertab activetab"
                                              : "gendertab"
                                            } col-6 text-center `}
                                          key={ele}
                                          onClick={() =>
                                            setActiveTab(ele.tabValue)
                                          }
                                        >
                                          <span>{ele.tabValue}</span>
                                        </div>
                                      ))}
                                    </div>
                                    {tabMenuItems?.map((subitem, subindex) => {
                                      return (
                                        <li key={`tabmenuitem-${subindex}`}>
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

                                    <div>
                                      {menuItems?.map((subitem, subindex) => {
                                        return (
                                          <li
                                            key={`menuitem-${subindex}`}
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
                                    <li key={`secmenuitem-${subindex}`}>
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
                                  ))
                                )}
                                <div className="additional-links">
                                  {item?.additionalLink?.map(
                                    (
                                      additionalLinkItem,
                                      additionalLinkIndex
                                    ) => (
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
                                                  src={
                                                    additionalLinkItem.iconLink
                                                  }
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
                        )}
                        {deviceType === "tablet" && (
                          <SectionMenu
                            section={getHeaderData?.siteNavigation}
                            type={item?.type}
                            sectionData={item}
                          />
                        )}
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
                    <Link href="#"
                     onClick={(e) => {
                      e.preventDefault();
                      searchoption(true);
                    }}
                    >
                      <img src="/assets/images/diamond-factory/header/icons/search.svg" alt="search icon" />
                      {" "}
                      <span>Search</span>
                    </Link>
                    {userDetailsprop?.isGuest ? (
                    <Button onClick={() => openLoginModal()} className="justify-content-start p-0 gap-2">
                      <img src="/assets/images/diamond-factory/header/icons/account.svg" />
                      {" "}
                      <span className="text-capitalize" style={{fontSize: "16px", marginLeft: "4px", fontWeight: "400"}}>Account</span>
                    </Button>
                  ) : (
                    <Link href="/my-account" title={intl.formatMessage({ id: 'commom.account' })}>
                      <img src="/assets/images/diamond-factory/header/icons/account.svg" />
                      {" "}
                      <span>Account</span>
                    </Link>
                  )}
                  {userDetailsprop?.isGuest ? (
                    <Button onClick={() => openLoginModal()} className="justify-content-start p-0 gap-2">
                      <img src="/assets/images/diamond-factory/header/icons/heart.svg" />
                      {" "}
                      <span className="text-capitalize" style={{fontSize: "16px", marginLeft: "4px", fontWeight: "400"}}>Wishlist</span>
                    </Button>
                  ) : (
                    <Link href="/my-account?tab=wishList">
                      <img src="/assets/images/diamond-factory/header/icons/heart.svg" />
                      {" "}
                      <span>Wishlist</span>
                    </Link>
                  )}
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "1px",
                      background: "#D6BB8F",
                    }}
                  ></div>
                  <div className="menu-actions-1">
                    <a href={`tel:${phoneNumber.replace(/\s+/g, '')}`}>
                      <img src="/assets/images/diamond-factory/header/icons/call.svg" />
                      {" "}
                      <span>020 7138 3672</span>
                    </a>
                    <Link href="/viewings">
                      <img src="/assets/images/diamond-factory/header/icons/location.svg" />
                      {" "}
                      <span>Our Stores</span>
                    </Link>
                    <Link href="#select-appointment">
                      <img src="/assets/images/diamond-factory/header/icons/calendar.svg"/>
                      {" "}
                      <span>Book an appointment</span>
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default {
  DFMobileMenu,
};

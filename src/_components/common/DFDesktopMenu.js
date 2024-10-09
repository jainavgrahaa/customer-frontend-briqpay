/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState } from "react";
import MultiListMenu from "./menuTypes/multiListMenu";
import SingleImageMenu from "./menuTypes/singleImageMenu";
import SingleRowImageMenu from "./menuTypes/singleRowImageMenu";
import { stepCheck } from "@/_utils";

export function Menu(props) {
  const children = React.Children.toArray(props.children);
  return (
    <nav className="menu df-menu">
      <div className="menu-mobile"></div>
      <ul className="menu-list">
        {children.map((item, index) => {          
          return (
            <MenuItem name={item.props.name} key={index} id={item.props.id}>
              {item}
            </MenuItem>
          );
        })}
      </ul>
    </nav>
  );
}
export function MenuDropdown(props) {
  const classNames = ["menu-dropdown"];
  if (props.megaMenu && !props.isEmpty) {
    classNames.push("mega-menu");
  }
  return <div className={classNames.join(" ")}>{props.render()}</div>;
}

MenuDropdown.defaultProps = {
  render: () => {},
};
function MenuItem(props) {   
  const { name, id } = props;
  const iconHide=props.children.props.isEmpty
  return (
    <li className="menu-item">
      <Link href={id ?? "#"} className="main-menu-link">
        <span className="menu-link">{name}</span>
       {!iconHide? <span className="material-icons-outlined icons-small">
          keyboard_arrow_down
        </span>:null}
      </Link>
      {props.children}
    </li>
  );
}

MenuItem.defaultProps = {
  children: () => {},
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
            key={linkData?.data?.label}
            className={`menu-grid-item col-lg-6 col-md-12`}
          >
            <h4>{linkData?.gender}</h4>
            <div className="row gy-5">
              {linkData?.data?.map((items, index) => {
                return (
                  <>
                    {items?.isLeftAlign && (
                      <div
                        className={`grid-item-category ${
                          items?.type == "template"
                            ? "col-md-12"
                            : items?.label === "Price"
                            ? "col-md-12"
                            : "col-md-4"
                        } `}
                        key={index}
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
                          className={` grid-items-with-icon  ${
                            items?.type == "template" ? "d-flex" : "grid-items"
                          }`}
                        >
                          {items?.link?.map((data) => {
                            return (
                              <Link href="#" key={data?.label}>
                                {data?.showIcon && <img src={data?.link} />}
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
      className={`menu-grid-container ${type === "4" ? "education-menu" : ""}`}
    >
      <div
        className={`menu-items ${
          type === "4" ? "" : "row justify-content-between"
        } ${type === "3" ? "d-none" : ""}`}
      >
        {sectionData?.section?.map((linkData) => {
          return (
            linkData?.isLeftAlign && (
              <div
                key={linkData?.label}
                className={`menu-grid-item ${
                  type !== "4" && "col-lg-2 col-md-2"
                } ${linkData?.link?.length > 12 ? "col-lg-4" : " col-lg-2"}`}
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
                        {linkData?.link?.slice(0, 12)?.map((data) => {
                          return (
                            <Link
                              href={data?.titleUrl || "#"}
                              key={data?.label}
                            >
                              {data?.showIcon && <img src={data?.link} />}
                              <span>{data?.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                      {linkData?.link?.length > 12 && (
                        <div className="grid-item-one">
                          {linkData?.link?.slice(12)?.map((data) => {
                            return (
                              <Link
                                href={data?.titleUrl || "#"}
                                key={data?.label}
                              >
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
      <div className="menu-grid-banner">
        <div className="grid-banner">
          {sectionData?.section?.map((linkData, index) => {
            return (
              !linkData?.isLeftAlign && (
                <>
                  <div className="view-all-action text-btn-align">
                    {/* {sectionData?.showTabs &&
                      sectionData?.section?.map((tab, index) => (
                        <Link
                          className={
                            `tab-item view-all-link`
                            ${
                              activeTab === tab?.label ? "active" : ""
                            }`
                          }
                          onClick={() => handleTabClick(tab?.label)}
                          href="#"
                          key={index}
                        >
                          <h4>{tab?.tabs}</h4>
                          {activeTab === tab?.label ? (
                            <img
                              src={
                                "/assets/icons/raw-svgs/arrow-right-black.svg"
                              }
                            />
                          ) : (
                            <img
                              src={"/assets/icons/raw-svgs/arrow-right.svg"}
                            />
                          )}
                        </Link>
                      ))} */}
                    {linkData?.isClickable ? (
                      <Link
                        href={`${linkData?.lableLink}`}
                        className={`view-all-link `}
                      >
                        <h4>{linkData?.label}</h4>
                        <img src={"/assets/icons/raw-svgs/arrow-right.svg"} />
                      </Link>
                    ) : linkData?.linkShowAll?.show ? (
                      <>
                        <h4>{linkData?.label}</h4>
                        <Link
                          href={`${linkData?.lableLink}`}
                          className="view-all-link dark-brown"
                        >
                          <h4>{linkData?.linkShowAll?.label}</h4>
                          <img src={"/assets/icons/raw-svgs/arrow-right.svg"} />
                        </Link>
                      </>
                    ) : (
                      <h4>{linkData?.label}</h4>
                    )}
                  </div>

                  <div
                    className={`${
                      stepCheck(type, "4") ? "" : "view-all-action"
                    }`}
                  >
                    {stepCheck(type, "1") ? (
                      <MultiListMenu linkData={linkData} />
                    ) : stepCheck(type, "4") ? (
                      <SingleRowImageMenu linkData={linkData} />
                    ) : (
                      <SingleImageMenu linkData={linkData} />
                    )}
                  </div>
                </>
              )
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const DFDesktopMenu = ({ getHeaderData, extraClass }) => {
  const [headerData] = useState(
    getHeaderData?.siteNavigation?.sort((a, b) => a.sequence - b.sequence)
  );
  const getSquence = (array) => {
    return array?.sort((a, b) => a.sequence - b.sequence);
  };
  return (
    <Menu>
      {getSquence(headerData)?.map((sectionData, index) => {
        const isEmpty=sectionData.section.length === 0;
        return (
          <MenuDropdown
            name={String(sectionData?.label)}
            id={String(sectionData?.link)}
            megaMenu
            isEmpty={isEmpty}
            key={`${sectionData?.type}${index}`}
            render={() =>
              !isEmpty   && (
                <SectionMenu
                  section={sectionData?.siteNavigationSections}
                  type={sectionData?.type}
                  sectionData={sectionData}
                />
              )
            }
          />
        );
      })}
    </Menu>
  );
};

export default {
  DFDesktopMenu,
};

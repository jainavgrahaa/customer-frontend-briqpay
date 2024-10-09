/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { checkIsFlag } from "@/_utils";
import Link from "next/link";
import React, { useState } from "react";

export const Menu = (props) => {
  const children = React.Children.toArray(props.children);
  return (
    <nav className={`menu ab-menu  ${!props.desktopMenuShrinked && "rel"} `}>
      <div className="menu-mobile"></div>
      <ul className="menu-list">
        {children.map((item, index) => {
          return (
            <MenuItem
              name={item.props.name}
              link={item?.props.link}
              key={index}
            >
              {item}
            </MenuItem>
          );
        })}
      </ul>
    </nav>
  );
};
export const MenuDropdown = (props) => {
  const classNames = ["menu-dropdown"];
  if (props.megaMenu && props.section.length > 0) {
    classNames.push("mega-menu");
  }
  return <div className={classNames.join(" ")}>{props.render()}</div>;
}

// MenuDropdown.defaultProps = {
//   render: () => {},
// };

const MenuItem = (props) => {
  const { name, link } = props;
  return (
    <li className={`menu-item`}>
      <Link href={link || "#"}>
        <span className="menu-link">{name}</span>
      </Link>
      {props.children}
    </li>
  );
}

// MenuItem.defaultProps = {
//   children: () => {},
// };

export function HeaderAllMenus({
  section,
  imageUrl,
  type,
  tabValues,
  showTabs,
  additionalLink,
  className,
  imageCta,
}) {
  const getSquence = (array) => {
    return (
      Array.isArray(array) && array?.sort((a, b) => a.sequence - b.sequence)
    );
  };
  return (
    <section className={`menu-grid-container ${className}`}>
      <div
        className={`menu-grid-items ${
          type == "2" ? "row-cols-2 type-2-menu" : " "
        }`}
      >
        {showTabs ? (
          <>
            {tabValues?.map((tabValue, index) => (
              <React.Fragment key={index}>
                <div className="menu-grid-items-tabs">
                  <div className="tab-value">{tabValue.tabValue}</div>
                  {getSquence(section)?.map(
                    (item, index) =>
                      item?.tabs === tabValue?.tabValue &&
                      item?.tabs !== null && (
                        <div
                          className="menu-grid-item"
                          key={`${item.label}${index}`}
                        >
                          <div className="grid-item-category">
                            <div className="grid-item-title">
                              {item?.labelLink ? (
                                <h4>
                                  <a href={item?.labelLink}>
                                    {item?.label}
                                  </a>
                                </h4>
                              ) : (
                                <h4>{item?.label}</h4>
                              )}
                            </div>
                            <div className="grid-items grid-items-with-icon">
                              {getSquence(item?.link)?.map(
                                (itemNavigation, index) => (
                                  <Link
                                    href={itemNavigation?.link || "#"}
                                    key={itemNavigation?.label + index}
                                  >
                                    {itemNavigation.link
                                      ?.split("/")
                                      .includes("assets") && (
                                      <img src={itemNavigation.link} />
                                    )}
                                    <span>{itemNavigation?.label}</span>
                                  </Link>
                                )
                              )}
                            </div>
                            {item.linkShowAll?.show && (
                              <div className="view-all-action">
                                <Link
                                  href={item?.linkShowAll?.labelLink || "#"}
                                  className="view-all-link"
                                >
                                  <span>{item?.linkShowAll?.label}</span>
                                  <span className="material-icons-outlined icons-small">
                                    chevron_right
                                  </span>
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                  )}
                  {additionalLink &&
                    getSquence(additionalLink)?.map(
                      (item, index) =>
                        item?.tabs === tabValue?.tabValue &&
                        item?.tabs !== null && (
                          <div
                            className="menu-grid-item"
                            key={`${item.label}${index}`}
                          >
                            <div className="grid-item-category">
                              <div className="grid-item-title">
                                {item?.labelLink ? (
                                  <h4>
                                    <a href={item?.labelLink}>{item?.label}</a>
                                  </h4>
                                ) : (
                                  <h4>{item?.label}</h4>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                    )}
                </div>
              </React.Fragment>
            ))}
            {getSquence(section)?.map(
              (item, index) =>
                !item?.tabs && (
                  <div className="menu-grid-item" key={`${item.label}${index}`}>
                    <div className="grid-item-category">
                      <div className="grid-item-title">
                        {item?.labelLink ? (
                          <h4>
                            <a href={item?.labelLink}>{item?.label}</a>
                          </h4>
                        ) : (
                          <h4>{item?.label}</h4>
                        )}
                      </div>
                      <div className="grid-items grid-items-with-icon">
                        {getSquence(item?.link)?.map(
                          (itemNavigation, index) => (
                            <Link
                              href={itemNavigation?.link || "#"}
                              key={itemNavigation?.label + index}
                            >
                              {itemNavigation.link
                                .split("/")
                                .includes("assets") && (
                                <img src={itemNavigation.link} />
                              )}
                              <span>{itemNavigation?.label}</span>
                            </Link>
                          )
                        )}
                      </div>
                      {item.linkShowAll?.show && (
                        <div className="view-all-action">
                          <Link
                            href={item?.linkShowAll?.labelLink || "#"}
                            className="view-all-link"
                          >
                            <span>{item?.linkShowAll?.label}</span>
                            <span className="material-icons-outlined icons-small">
                              chevron_right
                            </span>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )
            )}
            <div className="side-labels">
              {additionalLink &&
                getSquence(additionalLink)?.map(
                  (item, index) =>
                    !item?.tabs && (
                      <div
                        className="menu-grid-item"
                        key={`${item.label}${index}`}
                      >
                        <div className="grid-item-category">
                          {item?.label && (
                            <div className="view-all-action">
                              <Link
                                href={item?.link || "#"}
                                className="view-all-link"
                              >
                                <span>{item?.label}</span>
                                <span className="material-icons-outlined icons-small">
                                  chevron_right
                                </span>
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                )}
            </div>
          </>
        ) : (
          <>
            {getSquence(section)?.map((item, index) => (
              <div
                className={`menu-grid-item ${getSquence(item?.link)?.length > 12 ? 'three-column-layout' : ''}`}
                key={`${item?.label}${index}`}
              >
                <div className="grid-item-category">
                  <div className="grid-item-title">
                    {item?.labelLink ? (
                      <h4>
                        <a href={item?.labelLink}>{item?.label}</a>
                      </h4>
                    ) : (
                      <h4>{item?.label}</h4>
                    )}
                  </div>
                  <div
                    className={`grid-items grid-items-with-icon ${getSquence(item?.link)?.length > 12 ? 'three-column' : ''} ${
                      index === section.length - 1
                        ? "grid-items-contact-us"
                        : ""
                    }`}
                  >
                    {getSquence(item?.link)?.map((itemNavigation, index) => (
                      <Link
                        href={
                          itemNavigation?.titleUrl || itemNavigation.link || "#"
                        }
                        key={itemNavigation.link + index}
                      >
                        {itemNavigation.link.split("/").includes("assets") &&
                        checkIsFlag(itemNavigation?.showIcon) ? (
                          <img src={itemNavigation.link} />
                        ) : (
                          " "
                        )}
                        <span>{itemNavigation?.label}</span>
                      </Link>
                    ))}
                  </div>
                  {item?.linkShowAll?.show && (
                    <div className="view-all-action">
                      <Link
                        href={item?.linkShowAll?.labelLink || "#"}
                        className="view-all-link"
                      >
                        <span>{item?.linkShowAll?.label}</span>
                        <span className="material-icons-outlined icons-small">
                          chevron_right
                        </span>
                      </Link>
                    </div>
                  )}
                  {index === section?.length - 1 &&
                    type == "2" &&
                    additionalLink &&
                    getSquence(additionalLink)?.map((item, index) => (
                      <div
                        className="menu-grid-item"
                        key={`${item?.label}${index}`}
                      >
                        <div className="grid-item-category">
                          {item?.label && (
                            <div className="view-all-action">
                              <Link
                                href={item?.link || "#"}
                                className="view-all-link type-2-additional-link"
                              >
                                <img src={item?.iconLink} />
                                <span>{item?.label}</span>
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
            {type !== "2" && additionalLink?.length > 0 && (
              <div className="side-labels">
                {getSquence(additionalLink)?.map(
                  (item, index) =>
                    !item?.tabs && (
                      <div
                        className="menu-grid-item"
                        key={`${item.label}${index}`}
                      >
                        <div className="grid-item-category">
                          {item?.label && (
                            <div className="view-all-action">
                              <Link
                                href={item?.link || "#"}
                                className="view-all-link"
                              >
                                <span>{item?.label}</span>
                                <span className="material-icons-outlined icons-small">
                                  chevron_right
                                </span>
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                )}
              </div>
            )}
          </>
        )}
      </div>
      {imageUrl && (
        <div className="menu-grid-banner">
          <div className="grid-banner">
            {imageCta ? (
              <a href={imageCta}>
                <img src={imageUrl} />
              </a>
            ) : (
              <img src={imageUrl} />
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export const ABDesktopMenu = ({
  getHeaderData,
  extraClass,
  desktopMenuShrinked,
}) => {
  const [headerData] = useState(
    getHeaderData?.siteNavigation?.sort((a, b) => a.sequence - b.sequence)
  );
  const getSquence = (array) => {
    return array?.sort((a, b) => a.sequence - b.sequence);
  };

  return (
    <div className={extraClass}>
      <Menu desktopMenuShrinked={desktopMenuShrinked}>
        {getSquence(headerData)?.map((item, index) => {
          return (
            <MenuDropdown
              key={index}
              name={String(item?.label)}
              link={String(item?.link)}
              megaMenu
              section={item?.section}
              render={() =>
                item?.section && (
                  <HeaderAllMenus
                    imageUrl={item?.siteLogo}
                    {...item}
                    className={extraClass}
                    imageCta={item?.imageCta}
                  />
                )
              }
            />
          );
        })}
      </Menu>
    </div>
  );
};

export default {
  ABDesktopMenu,
};

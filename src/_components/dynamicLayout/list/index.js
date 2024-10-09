import React, { Fragment, useMemo, useState } from "react";
import { SwiperSlide } from "swiper/react";
import useDeviceHelper from "@/_hooks/useDeviceHelper";
import ListItem from "./listItem";
import Carousal from "../carousal";
import { checkIsFlag, storeTypes } from "@/_utils";
import DFCarousal from "../dfCarousal";

const ListWrapper = ({ children, slideView = 1, height, isAutoItemWidth }) => {
  const gridTemplateColumns =
    isAutoItemWidth === "true" ? `auto` : `repeat(${slideView},1fr)`;
  // grid-auto-columns: min-content;
  // grid-auto-flow: column;

  return (
    <div
      className="d-simple-list"
      style={{
        gridTemplateColumns: gridTemplateColumns,
        gridAutoColumns: isAutoItemWidth === "true" ? "min-content" : undefined,
        gridAutoFlow: isAutoItemWidth === "true" ? "column" : undefined,
        height,
      }}
    >
      {children}
    </div>
  );
};

const List = ({
  listItems = [],
  detail,
  navigation,
  itemPerRow,
  isCarousal,
  isAccordion,
  isSeparator,
  isListItem,
  image,
  items,
  domain,
  spaceBetweenPerSlide,
  height,
  isSingleSection,
  deviceTypeServer,
  isNavigateArrow,
  isAutoItemWidth,
  isNavigateArrowType,
  isCarousalPagination,
  paginationType,
}) => {
  /**
   * Get component and child component
   * Using carousal
   */

  const [active, setActive] = useState(null);
  const { nextEl, prevEl } = navigation;
  // const domain =  (typeof window !== 'undefined') ? localStorage?.getItem('domain') : "";
  const { deviceType } = useDeviceHelper(deviceTypeServer);
  const handleToggle = (index) => {
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
    }
  };
  const { Component, ChildComponent, componentProps } = useMemo(() => {
    const isListCarousal = listItems.length > 1 && isCarousal;
    const Component =
      checkIsFlag(isListCarousal) && storeTypes[domain] === "ab"
        ? Carousal
        : checkIsFlag(isListCarousal) && storeTypes[domain] === "df"
        ? DFCarousal
        : ListWrapper;
    const ChildComponent = checkIsFlag(isListCarousal) ? SwiperSlide : Fragment;
    const componentProps = {
      isNavigateArrow,
      isCarousal,
    };
    return { Component, ChildComponent, componentProps };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCarousal, navigation]);
  return (
    <div
      className={`d-list ${
        isNavigateArrow === "true" ? "navigate-arrows" : ""
      } ${isAutoItemWidth === "true" ? "auto-width-carousel" : ""}`}
    >
      <Component
        spaceBetween={spaceBetweenPerSlide}
        slideView={isAutoItemWidth === "true" ? "auto" : itemPerRow}
        navigation={navigation}
        height={height}
        isPagination={!isSingleSection && storeTypes[domain] === "ab"}
        deviceTypeServer={deviceType}
        domain={domain}
        isNavigateArrow={isNavigateArrow}
        isCarousal={
          listItems.length > 0 &&
          checkIsFlag(isCarousal) &&
          deviceTypeServer === "mobile"
        }
        isAutoItemWidth={isAutoItemWidth}
        isCarousalPagination={isCarousalPagination}
        paginationType={paginationType}
      >
        {listItems.map((item, index) => {
          return (
            <ChildComponent key={index}>
              <ListItem
                data={item}
                isAutoItemWidth={isAutoItemWidth}
                height={height}
                index={index}
                structure={detail[item.type]}
                image={image}
                items={items}
                heading={detail.heading?.text}
                isAccordion={isAccordion}
                isSeparator={isSeparator}
                isCarousal={isCarousal}
                isListItem={isListItem}
                isSingleSection={isSingleSection}
                active={active}
                handleToggle={handleToggle}
                deviceTypeServer={deviceType}
                domain={domain}
              />
            </ChildComponent>
          );
        })}
      </Component>
    </div>
  );
};

export default List;

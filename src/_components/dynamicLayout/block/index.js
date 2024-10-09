import React, { useEffect, useState } from "react";
import Column from "./column";
import useDeviceHelper from "@/_hooks/useDeviceHelper";
import { defaultValue } from "../constants";
import Heading from "../heading";
import { storeTypes } from "@/_utils";

const Block = ({
  deviceTypeServer,
  data: dataBlock = {},
  storeId,
  storeName,
  storeObjectId,
  domain,
  pdpPlpdata,
  plpData,
  mergedInjectionData,
  features,
  pageId,
  lang,
  navigationMedias,
  breadcrumbData,
  pdpPayloadData,
  currency,
  educationDefaultList,
  faqDefaultList,
  blogData,
  translateId,
  pageNavigation,
  featureOptionsPrice,
  cookieToken,
  navigationHierarchyId,
  phoneNumber,
  email
}) => {
  const data = dataBlock?.block;
  const { deviceType } = useDeviceHelper(deviceTypeServer);
  const style = {};

  data &&
    Object?.keys(data)?.forEach((prop) => {
      if (prop != "properties")
        style[prop] = data[prop] && data[prop]?.[deviceType];
    });

  // const substrings = style.sectionSplit?.split(",");
  // const numbers = substrings?.map((str) => parseInt(str, 10));

  /**
   * Get split of grid view as per device type
   * Ex. desktop, tablet or mobile
   */
  const sections = data?.blockSections || [];
  const sortedSections = sections?.sort((a, b) => a.sequence - b.sequence);
  const isSingleSection = sortedSections.length === 1;
  /**
   * This logic is used to add width to the fixed section used along with dynamic section in a block
   */
  const section =
    !isSingleSection &&
    sortedSections.find(({ section }) => {
      return section?.type === "data";
    });
  if (!!section) {
    const findWidth = sortedSections.reduce(
      (acc, item) => {
        if (item.section?.width?.[deviceType] && item.section.type === "CMS") {
          acc.widthTotal += item.section?.width?.[deviceType];
          acc.itemsHavingWidth += 1;
        }
        return acc;
      },
      { widthTotal: 0, itemsHavingWidth: 0 }
    );

    // This case derives that dynamic and static section has same width
    if (findWidth.widthTotal < 100 && findWidth.itemsHavingWidth === 1) {
      section.section.width[deviceType] = findWidth.widthTotal;
    }
    // This case derives that dynamic and static section has a total of width adjusted to 100%
    else if (findWidth.widthTotal < 100 && findWidth.itemsHavingWidth > 1) {
      section.section.width[deviceType] = 100 - findWidth.widthTotal;
    }
    // This case derives that dynamic and two static section equal width as width property is not found
    else if (!findWidth.itemsHavingWidth && !!findWidth.itemsHavingWidth) {
      section.section.width[deviceType] = Math.floor(
        100 / sortedSections.length
      );
    }
  }
  return (
    <section
      className="d-grid-wrapper"
    // commenting this code as width is not applied at block level
    // style={{ width: style?.width + "%" }}
    >
      <Heading data={data?.title} />
      <div
        className={`d-row ${data?.containerType === "fluidContainer" && isSingleSection
            ? sortedSections?.[0].section?.bgColor
            : ""
          } ${data?.containerType === "fixedContainer"
            ? "fixed-container"
            : "fluid-container"
          } ${data?.align || ("" && data?.bgColor) || defaultValue?.bgColor}`}
      // style={{ backgroundColor: data.bgColor || defaultValue.bgColor }}
      >
        {/* number is not in use so removed */}
        {sortedSections &&
          sortedSections?.map((item, index) => {
            return (
              <Column
                plpData={plpData}
                mergedInjectionData={mergedInjectionData}
                pdpPlpdata={pdpPlpdata}
                storeId={storeId}
                storeName={storeName}
                storeObjectId={storeObjectId}
                key={index}
                width={item.section?.width?.[deviceType]}
                data={item}
                isSingleSection={isSingleSection}
                deviceTypeServer={deviceTypeServer}
                domain={domain}
                features={features}
                pageId={pageId}
                lang={lang}
                navigationMedias={navigationMedias}
                breadcrumbData={breadcrumbData}
                pdpPayloadData={pdpPayloadData}
                currency={currency}
                educationDefaultList={educationDefaultList}
                faqDefaultList={faqDefaultList}
                blogData={blogData}
                translateId={translateId}
                pageNavigation={pageNavigation}
                blockData={data}
                featureOptionsPrice={featureOptionsPrice}
                cookieToken={cookieToken}
                navigationHierarchyId={navigationHierarchyId}
                email={email}
                phoneNumber={phoneNumber}
              />
            );
          })}
      </div>
    </section>
  );
};

export default Block;

import React, { useEffect, useRef, useState } from "react";
import { types } from "./constants";
import Description from "./description";
import Heading from "./heading";
import useDeviceHelper from "@/_hooks/useDeviceHelper";
import List from "./list";
import ActionButton from "./actionButton";
import { checkArrayIteration, checkIsFlag, marginAndSplit } from "@/_utils";
import environment from "@/_utils/environment";
import TrustPilotBox from "../trustPilotBox";
import { storeTypes } from "@/_utils";

const Section = ({
  data = {},
  isSingleSection = false,
  deviceTypeServer,
  domain,
  blockData,
}) => {
  const prevRef = useRef();
  const nextRef = useRef();
  const {
    properties,
    image,
    items,
    bgColor,
    descriptionList,
    ctas,
    heading,
    backgroundImage,
  } = data?.section;
  const { deviceType } = useDeviceHelper(deviceTypeServer);
  const [isItemLoad, setIsItemload] = useState("false");

  const sectionMargin = data?.section?.margin;
  const sectionPadding = data?.section?.padding;
  const ctaAllignment = data?.section?.ctaAllignment;
  const ctaGap = data?.section?.gap;
  const gap = marginAndSplit(deviceTypeServer, ctaGap);
  const sortedDesc =
    checkArrayIteration(descriptionList) &&
    descriptionList?.sort((a, b) => a.sequence - b.sequence);

  const aboveDesc =
    checkArrayIteration(sortedDesc) &&
    sortedDesc?.filter((i) => i.position === types.aboveList);

  const belowDesc =
    checkArrayIteration(sortedDesc) &&
    sortedDesc?.filter((i) => i.position === types.belowList);

  const belowHeadingDesc =
    checkArrayIteration(sortedDesc) &&
    sortedDesc?.filter((i) => i.position === types.belowHeading);

  const sortedCtas =
    checkArrayIteration(ctas) && ctas?.sort((a, b) => a.sequence - b.sequence);

  const belowHeadingCta =
    checkArrayIteration(sortedCtas) &&
    sortedCtas?.filter((i) => i.position === types.belowHeading);

  const endOfHeadingCta =
    checkArrayIteration(sortedCtas) &&
    sortedCtas?.filter((i) => i.position === types.endOfHeading);

  const aboveListCta =
    checkArrayIteration(sortedCtas) &&
    sortedCtas?.filter((i) => i.position === types.aboveList);

  const belowListCta =
    checkArrayIteration(sortedCtas) &&
    sortedCtas?.filter((i) => i.position === types.belowList);

  const aboveListBelowHeading =
    checkArrayIteration(sortedCtas) &&
    sortedCtas?.filter((i) => i.position === types.aboveListBelowHeading);

  // useEffect(() => {
  const newInlineStyle = {};
  Object.keys(data?.section)?.forEach((prop) => {
    if (prop != "properties")
      newInlineStyle[prop] =
        data?.section[prop] && data?.section[prop][deviceType];
  });
  const inlineStyle = newInlineStyle;
  // }, [deviceType, properties]);
  useEffect(() => {
    setIsItemload(prevRef.current && nextRef.current ? "true" : "false");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prevRef.current, nextRef.current]);
  return (
    <section
      className={`d-section`}
      style={{
        margin: marginAndSplit(deviceType, sectionMargin),
        padding: marginAndSplit(deviceType, sectionPadding),
        backgroundPosition: inlineStyle?.backgroundPosition,
        backgroundSize: inlineStyle?.backgroundSize,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
      }}
    >
      <div
        className={
          belowDesc?.length > 0
            ? "thumbslider-header"
            : inlineStyle.width &&
              isSingleSection &&
              aboveDesc?.some((obj) => obj?.text) &&
              belowDesc?.some((obj) => obj?.text)
            ? "flex-description"
            : blockData.containerType === "fluidContainerWithFixedContentWidth"
            ? "d-section-container-fix-containt"
            : ""
        }
      >
        {!!heading?.text && (
          <div
            style={{ margin: "auto" }}
            className={`${
              aboveListBelowHeading?.length > 0
                ? "d-header-block-2"
                : "d-header-block"
            } ${endOfHeadingCta?.length > 0 ? "cta-end-heading" : ""}`}
          >
            <div className={heading?.text && "d-section-heading"}>
              {/* Section heading */}
              <Heading
                data={heading}
                deviceType={deviceTypeServer}
                isAccordion={inlineStyle?.isAccordion === "true"}
              />
              {
                /* Description Below Heading list */
                belowHeadingDesc?.map((desc, index) => (
                  <Description
                    key={index}
                    data={desc}
                    width={inlineStyle?.width ? inlineStyle.width : "auto"}
                    isAboveDesc={!!desc}
                    readMoreReq={bgColor === "madison"}
                    deviceType={deviceTypeServer}
                  />
                ))
              }
              <div
                style={{
                  textAlign: "center",
                  display:
                    ctaAllignment?.[deviceTypeServer] === "vertical"
                      ? "flex"
                      : "block",

                  flexDirection:
                    ctaAllignment?.[deviceTypeServer] === "vertical"
                      ? "column"
                      : "row",
                  gap:
                    ctaAllignment?.[deviceTypeServer] === "vertical" ? gap : "0",
                }}
              >
                {belowHeadingCta?.map((item, index) => (
                  <ActionButton
                    key={index}
                    data={item}
                    ctaGap={gap}
                    deviceType={deviceTypeServer}
                  />
                ))}
              </div>
            </div>
            {storeTypes[domain] === "ab" &&
            inlineStyle?.isNavigateArrow === "true" &&
            (inlineStyle?.isCarousal === true ||
              inlineStyle?.isCarousal === "true") ? (
              <div
                className={
                  inlineStyle.isNavigateArrowType === "middle"
                    ? "middle-arrow-slider-controls swiper-controls"
                    : "swiper-controls"
                }
              >
                <div
                  className="swiper-button material-icons-outlined"
                  ref={prevRef}
                >
                  arrow_back_ios
                </div>
                <div
                  className="swiper-button material-icons-outlined"
                  ref={nextRef}
                >
                  arrow_forward_ios
                </div>
              </div>
            ) : null}
            {endOfHeadingCta && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",

                  flexDirection:
                    ctaAllignment?.[deviceTypeServer] === "vertical"
                      ? "column"
                      : "row",
                  gap:
                    ctaAllignment?.[deviceTypeServer] === "vertical" ? gap : "0",
                }}
              >
                {endOfHeadingCta?.map((item, index) => {
                  return (
                    <ActionButton
                      key={index}
                      data={item}
                      ctaGap={gap}
                      deviceType={deviceTypeServer}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}
        {
          /* Description above list */
          aboveDesc?.map((desc, index) => (
            <Description
              key={index}
              data={desc}
              width={inlineStyle?.width ? inlineStyle.width : "auto"}
              isAboveDesc={!!desc}
              readMoreReq={bgColor === "madison"}
              deviceType={deviceTypeServer}
            />
          ))
        }
        {aboveListCta &&
          deviceTypeServer === "mobile" &&
          heading.text.trim() === "Follow Us" && (
            <div style={{ display: "flex" }}>
              {aboveListCta?.map((item, index) => {
                return (
                  <ActionButton
                    key={index}
                    data={item}
                    ctaGap={gap}
                    deviceType={deviceTypeServer}
                  />
                );
              })}
            </div>
          )}
        <div
          style={{
            overflow: "auto",
            textAlign: "center",
            display:
              ctaAllignment?.[deviceTypeServer] === "vertical"
                ? "flex"
                : "block",
            flexDirection:
              ctaAllignment?.[deviceTypeServer] === "vertical"
                ? "column"
                : "row",
            gap: ctaAllignment?.[deviceTypeServer] === "vertical" ? gap : "0",
          }}
        >
          {aboveListCta &&
            deviceTypeServer !== "mobile" &&
            aboveListCta?.map((item, index) => {
              return (
                <ActionButton
                  key={index}
                  data={item}
                  ctaGap={gap}
                  deviceType={deviceTypeServer}
                />
              );
            })}
        </div>
        {/* Main list view */}
        {items &&
          !data?.section?.name
            ?.trim()
            .includes("AB-Trustpilot Service Right Banner Section") &&
          !data?.section?.name?.trim().includes("Reviews section") &&
          !(
            data?.section?.name
              ?.trim()
              .includes("DF-See what customers have to say Item Section") &&
            data?.sequence === 2
          ) && (
            <List
              listItems={items || []}
              detail={data?.section}
              itemPerRow={Number(inlineStyle?.itemPerRow)}
              isAutoItemWidth={inlineStyle?.isAutoItemWidth}
              isCarousal={inlineStyle?.isCarousal}
              isAccordion={checkIsFlag(inlineStyle?.isAccordion)}
              paginationType={inlineStyle?.paginationType}
              isCarousalPagination={checkIsFlag(
                inlineStyle?.isCarousalPagination
              )}
              isSeparator={checkIsFlag(inlineStyle.isSeparator)}
              image={image}
              isSingleSection={isSingleSection}
              isListItem={checkIsFlag(inlineStyle?.isListItem)}
              items={checkIsFlag(isItemLoad) && items}
              height={inlineStyle?.height}
              width={inlineStyle.width}
              spaceBetweenPerSlide={Number(inlineStyle.spaceBetweenPerSlide)}
              navigation={{
                nextEl: nextRef.current,
                prevEl: prevRef.current,
              }}
              deviceTypeServer={deviceTypeServer}
              domain={domain}
              isNavigateArrow={inlineStyle?.isNavigateArrow}
              isNavigateArrowType={inlineStyle.isNavigateArrowType}
            />
          )}

        {data?.section?.name
          ?.trim()
          .includes("AB-Trustpilot Service Right Banner Section") && (
          <TrustPilotBox
            businessUnitId={environment.trustpilot.slider.businessUnitId}
            templateId={environment.trustpilot.slider.templateId}
            height="140px"
          />
        )}

        {domain?.includes("austenblake") &&
          data?.section?.name?.trim().includes("Reviews section") && (
            <TrustPilotBox
              businessUnitId={
                environment.trustpilot.reviewSection.businessUnitId
              }
              templateId={environment.trustpilot.reviewSection.templateId}
              height="1000px"
            />
          )}

        {domain?.includes("diamondsfactory") &&
          data?.section?.name?.trim().includes("Happy Customers") && (
            <TrustPilotBox
              businessUnitId={
                environment.trustpilotDF.reviewSection.businessUnitId
              }
              templateId={environment.trustpilotDF.reviewSection.templateId}
              height="1000px"
            />
          )}

        {
          /* Description below list */
          belowDesc?.map((desc, index) => (
            <Description
              key={index}
              data={desc}
              width={inlineStyle?.width ? inlineStyle.width : "auto"}
              isAboveDesc={!desc}
              readMoreReq={bgColor === "madison"}
              deviceType={deviceTypeServer}
            />
          ))
        }
        <div
          style={{
            textAlign: "center",
            display:
              ctaAllignment?.[deviceTypeServer] === "vertical" ? "flex" : "block",

            flexDirection:
              ctaAllignment?.[deviceTypeServer] === "vertical" ? "column" : "row",
            gap: ctaAllignment?.[deviceTypeServer] === "vertical" ? gap : "0",
          }}
        >
          {belowListCta &&
            belowListCta?.map((item, index) => {
              return (
                <ActionButton
                  key={index}
                  data={item}
                  ctaGap={gap}
                  deviceType={deviceTypeServer}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Section;

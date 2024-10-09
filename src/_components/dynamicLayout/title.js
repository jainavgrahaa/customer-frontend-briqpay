/* eslint-disable @next/next/no-img-element */
import React, { Fragment } from "react";
import { defaultValue } from "./constants";
import { marginAndSplit } from "@/_utils";
import environment from "@/_utils/environment";
import TrustPilotBox from "../trustPilotBox";

const Title = ({
  marginTitle,
  paddingTitle,
  data,
  index,
  inlineStyle,
  as = "span",
  structure = {},
  deviceType,
  titleAndTagLineBgColor,
  isListItem,
  url,
  isSeparator,
  paddingImage,
  marginImage,
  hasHoverImg,
  domain,
  imageWidth,
  isAutoItemWidth,
  hoverAnimationImage,
  imageShadowBox
}) => {
  const newInlineStyle = {};

  Object.keys(structure)?.forEach((prop) => {
    if (prop != "properties") {
      newInlineStyle[prop] = structure[prop] && structure[prop][deviceType];
    }
  });
  const Component = newInlineStyle?.headingLevel || as;
  // commenting this out as certificate section isn't satisfying the condition
  // if (!data || !data.text) {
  //   return "";
  // }
  return (
    <>
      {url && !imageShadowBox && !url.includes("trustpilot") && newInlineStyle?.align === "center" && hasHoverImg !== "true" && (
        <img
          className="main-title-image"
          src={url}
          alt={data.alt}
          style={{
            marginRight: "0.5rem",
            objectFit: inlineStyle.imageFit,
            height: inlineStyle.height > 0 ? inlineStyle.height + "px" : "auto",
            width: (isAutoItemWidth === 'false' || isAutoItemWidth === undefined) ? (inlineStyle?.width
              ? inlineStyle?.width + "%"
              : "auto"): imageWidth + "%",
            padding: marginAndSplit(deviceType, paddingImage),
            margin: marginAndSplit(deviceType, marginImage),
          }}
        />
      )}
       {url && imageShadowBox && !url.includes("trustpilot") && newInlineStyle?.align === "center" && hasHoverImg !== "true" && (
        <div className="image-with-shadow">
        <img
          className="main-title-image"
          src={url}
          alt={data.alt}
          style={{
            marginRight: "0.5rem",
            objectFit: inlineStyle.imageFit,
            height: inlineStyle.height > 0 ? inlineStyle.height + "px" : "auto",
            width: (isAutoItemWidth === 'false' || isAutoItemWidth === undefined) ? (inlineStyle?.width
              ? inlineStyle?.width + "%"
              : "auto"): imageWidth + "%",
            padding: marginAndSplit(deviceType, paddingImage),
            margin: marginAndSplit(deviceType, marginImage),
          }}
        />
        </div>
      )}
      {url && url.includes("trustpilot") && newInlineStyle?.align === "center" && hasHoverImg !== "true" && (
        <TrustPilotBox
          businessUnitId={environment.trustpilot.inlineReview.businessUnitId}
          templateId={environment.trustpilot.inlineReview.templateId}
          height="20px"
        />
      )}
    {data.text &&
    <Component
      style={{
        textAlign: newInlineStyle?.align || defaultValue.textAlign,
        color: data?.color || "inherit",
        backgroundColor: newInlineStyle?.bgColor ? titleAndTagLineBgColor : "inherit",
        padding: marginAndSplit(deviceType, paddingTitle),
        // borderRight: isSeparator && !index ? "1px solid #D9D9D9" : "",
        borderRight: isSeparator ? "1px solid #D9D9D9" : "initial",
        margin: marginAndSplit(deviceType, marginTitle)
      }}
    >{data.text}
    </Component>
    }
      {/* {data.linkType === "link_with_arrow" && (
        <span className="material-icons-outlined icons-small float-right">
          chevron_right
        </span>
      )} */}
      </>
  );
};

export default Title;

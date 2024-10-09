import React from "react";
import LinkWrapper from "../common/Link";
import { headingLevels } from "./constants";
import useDeviceHelper from "@/_hooks/useDeviceHelper";
import { marginAndSplit } from "@/_utils";

const DecoratedText = ({ text, isAccordion }) => {
  return (
    <>
      <span className={isAccordion ? "accordian-span": ""}>
        {text}
      </span>
     
    </>
  );
};

const Heading = ({ data = {}, device, isAccordion }) => {
  const { link, text, linkTarget } = data;
  const { deviceType } = useDeviceHelper(device);

  const newInlineStyle = {};
  Object.keys(data)?.forEach((prop) => {
    if (prop != "properties") {
      newInlineStyle[prop] = data[prop] && data[prop][deviceType];
    }
  });
  const inlineStyle = newInlineStyle;
  const Heading = headingLevels[inlineStyle?.headingLevel] || "div";
  const HeadType = link ? LinkWrapper : "span";
  const headingSpace = text === "Engagement rings";
  const paddingHeading = data?.text && data?.padding;
  const marginHeading = data?.text && data?.margin;

  const linkProps = {};
  if (link) {
    linkProps.href = link;
    linkProps.target = ["window", "newTab"].includes(linkTarget)
      ? "_blank"
      : "";
  }
  return (
    <div className="d-heading-tag-wp">
      <Heading
        className={headingSpace ? "d-heading d-heading-space" : "d-heading"}
        style={{
          textAlign: inlineStyle.align,
          padding: marginAndSplit(deviceType, paddingHeading),
          margin: marginAndSplit(deviceType, marginHeading),
        }}
        device={device}
      >
        {/* <HeadType {...linkProps}>{text || ""}</HeadType> */}
        <HeadType {...linkProps}>
          <DecoratedText text={text} isAccordion={isAccordion} />
        </HeadType>
      </Heading>
    </div>
  );
};

export default Heading;

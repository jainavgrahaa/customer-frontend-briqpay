/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { getElementStyle } from "@/_utils/dynamicLayout";
import { Button as MuiButton } from "@mui/material";
import { useMemo } from "react";
import Link from "../common/Link";
import { defaultValue, types } from "./constants";
import { splitAndJoin } from "@/_utils";
import useDeviceHelper from "@/_hooks/useDeviceHelper";

const ActionButton = ({ data, color, ctaGap, deviceType: device }) => {
  const elStyle = useMemo(() => {
    return getElementStyle(data.style);
  }, []);
  const HeadType = data.link ? Link : "span";
  const { deviceType } = useDeviceHelper(device);
  const linkProps = {};
  if (data.link) {
    linkProps.href = data.link;
    linkProps.target = ["window", "newTab"].includes(data.linkTarget)
      ? "_blank"
      : "";
    linkProps.style = data.style;
  }

  const isArrowLink = data.linkType === types.linkWithArrow;
  const variant = isArrowLink ? "text" : data.linkType;
  const linkRender = (
    <HeadType
      {...linkProps}
      className={`${
        data.linkType === undefined
          ? "text-btn"
          : data.linkType === "contained"
          ? "filled-btn"
          : data.linkType === "outlined"
          ? "bordered-btn"
          : data.linkType === "link_with_arrow"
          ? "link-with-arrow"
          : data.linkType === "image_with_link"
          ? "img-with-link"
          : data.linkType === "link_with_theme_color"
          ? "text-btn theme-color"
          : ""
      } d-inline-block`}
    >
      {data.buttonIcon && (
        <span className="material-icons-outlined">{data.buttonIcon}</span>
      )}
      {data.icon && <img src={data.icon} />}
      {data.text}
      {/* ?.sectionCtaTranslates[0] */}
      {isArrowLink && (
        <span className="material-icons-outlined icons-small">
          chevron_right
        </span>
      )}
    </HeadType>
  );
  return (
    <div
      style={{
        textAlign: data.align || defaultValue.textAlign,
        padding: splitAndJoin("padding", deviceType, data) || "initial",
        margin: splitAndJoin("margin", deviceType, data),
        color,
        ...(data.align !== "center" && { float: data.align }),
        display: "inline-block",
      }}
    >
      {linkRender}
    </div>
  );
};

export default ActionButton;

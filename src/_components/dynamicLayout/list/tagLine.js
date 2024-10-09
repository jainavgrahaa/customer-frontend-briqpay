import React, { useEffect, useState } from "react";
import { defaultValue, types } from "../constants";
import { marginAndSplit } from "@/_utils";

const TagLine = ({
  marginTagLine,
  paddingTagLine,
  data,
  as = "div",
  structure = {},
  color,
  titleAndTagLineBgColor,
  deviceType,
}) => {

  const newInlineStyle = {};
  Object.keys(structure)?.forEach((prop) => {
    if (prop != "properties")
      newInlineStyle[prop] = structure[prop] && structure[prop][deviceType];
  });

  const Component = newInlineStyle.headingLevel || as;
  const isRight = newInlineStyle.iconPosition === types.right;
  if (!data || !data.text) {
    return "";
  }
  const [iconText, seticonText] = useState(data.icon);
  const [materialIcon, setmaterialIcon] = useState();
  useEffect(() => {
    if (iconText) {
      let iconTextArray = iconText.split("");
      let materialStartValueArray = iconTextArray.slice(0, 8);
      let materialStartValue = materialStartValueArray.join("");
      let materialIconEndValue = iconTextArray.slice(9);
      let materialIconTextValue = materialIconEndValue.join("");
      if (materialStartValue === "material") {
        setmaterialIcon(materialIconTextValue);
      }
    }
  }, []);
  return (
    <Component
      style={{
        backgroundColor: titleAndTagLineBgColor || "initial",
        textAlign: newInlineStyle.align || defaultValue.textAlign,
        color: color ? color : "black",
        padding: marginAndSplit(deviceType, paddingTagLine),
        margin: marginAndSplit(deviceType, marginTagLine),
      }}
      className={`${materialIcon ? "m-icon" : ""}`}
    >
      {!isRight && (
        <>
          {!materialIcon && <span className="symbol-span">{data.icon}</span>}
          {materialIcon && (
            <span
              className="material-icons-outlined mr-10"
              style={{ verticalAlign: "middle" }}
            >
              {materialIcon}
            </span>
          )}
        </>
      )}
      {data.text}
      {isRight && (
        <>
          {!materialIcon && <span className="symbol-span">{data.icon}</span>}
          {materialIcon && (
            <span
              className="material-icons-outlined mr-10"
              style={{ verticalAlign: "middle" }}
            >
              {materialIcon}
            </span>
          )}
        </>
      )}
    </Component>
  );
};

export default TagLine;

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useState } from "react";
import {
  FormControl,
  FormLabel,
  List,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import useDeviceHelper from "@/_hooks/useDeviceHelper";

const TextCheckBoxButton = ({
  checkBoxData,
  title,
  checkboxes = [],
  setCheckboxes,
  subtitle,
  extraClass = "",
  mobileTitleType,
}) => {
  const [activeCheckboxes, setActiveCheckboxes] = useState(checkboxes);
  const [mobilefiterContent, setmobilefiterContent] = useState(false);
  const handleChange = useCallback(
    (value) => {
      setActiveCheckboxes((prevValue) => [...new Set([...prevValue, value])]);
      setCheckboxes((prevValue) => [...new Set([...prevValue, value])]);
      // if (activeCheckboxes.includes(value)) {
      //   // If the checkbox is already active, remove it
      //   setActiveCheckboxes(
      //     activeCheckboxes.filter((checkboxValue) => checkboxValue !== value)
      //   );
      //   setCheckboxes(
      //     activeCheckboxes.filter((checkboxValue) => checkboxValue !== value)
      //   );
      // } else {
      //   // If the checkbox is not active, add it
      //   // setActiveCheckboxes([...activeCheckboxes, value]);
      //   // setCheckboxes([...activeCheckboxes, value]);
      // }
    },
    [activeCheckboxes, checkboxes]
  );

  const { deviceType } = useDeviceHelper();

  return (
    <div
      className={`text-checkbox-wrap ${extraClass} ${
        mobileTitleType === "accordian" ? "mobile-title-accordian" : ""
      }`}
    >
      <FormControl>
        {mobileTitleType !== "accordian" && (
          <FormLabel id="checkbox-label">{title}</FormLabel>
        )}
        {mobileTitleType === "accordian" &&
          (deviceType === "mobile" || deviceType === "tablet") && (
            <FormLabel
              id="checkbox-label"
              className="d-flex justify-space-between w-100 pt-3 pb-3"
              onClick={() => setmobilefiterContent(!mobilefiterContent)}
            >
              {title}
              {mobilefiterContent ? (
                <span class="material-icons-outlined">remove</span>
              ) : (
                <span class="material-icons-outlined">add</span>
              )}
            </FormLabel>
          )}
        {subtitle && <p>{subtitle}</p>}
        <List
          component="div"
          className={`text-checkbox-list ${
            !mobilefiterContent ? "d-flex" : "d-none"
          }`}
        >
          {checkBoxData?.map(({ id, value, label, img }) => {
            return (
              <FormControlLabel
                key={`${id + value}`}
                onChange={() => handleChange(value)}
                className={activeCheckboxes.includes(value) ? "active" : ""}
                control={
                  <Checkbox
                    checked={activeCheckboxes.includes(value)}
                    name={value}
                    icon={img && <img src={`/assets/icons/raw-svgs/${img}`} />}
                    checkedIcon={
                      img && <img src={`/assets/icons/raw-svgs/${img}`} />
                    }
                  />
                }
                label={label}
              />
            );
          })}
        </List>
      </FormControl>
    </div>
  );
};

export default TextCheckBoxButton;

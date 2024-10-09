/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const IconRadioButtonPLP = ({
  filterData,
  radioData,
  extraClass,
  code,
  parentCode,
  onChange,
}) => {
  const metalsList = filterData?.find((e) => e?.slugKey?.includes("metal"));
  return (
    <div className={`icon-radio-wrapper ${extraClass}`}>
      <FormControl>
        <div sx={{ display: "flex" }}></div>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          {radioData?.map((data) => {
            return (
              <FormControlLabel
                key={data?.id + data?.name}
                value={data?.name}
                // label={name}
                control={
                  <Radio
                    className={`${data?.selected ? "active" : ""}`}
                    onChange={(e) => onChange(parentCode, data?.id)}
                    icon={
                      <img
                        src={
                          metalsList?.featureOptions.find(
                            (e) => e?.name?.trim() === data?.metal?.trim()
                          )?.image ?? "/assets/icons/raw-svgs/yellow-gold.svg"
                        }
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "/assets/icons/raw-svgs/yellow-gold.svg";
                        }}
                        alt={data?.metal}
                      />
                    }
                    checkedIcon={
                      <img
                        src={
                          metalsList?.featureOptions.find(
                            (e) => e?.name?.trim() === data?.metal?.trim()
                          )?.image ?? "/assets/icons/raw-svgs/yellow-gold.svg"
                        }
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "/assets/icons/raw-svgs/yellow-gold.svg";
                        }}
                        alt={data?.metal}
                      />
                    }
                    checked={data?.selected}
                  />
                }
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default IconRadioButtonPLP;

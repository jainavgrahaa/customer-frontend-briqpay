/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { updatePlpUrl } from "@/_store/plp.slice";

const TextCheckBoxButtonPLP = ({
  checkBoxData,
  title,
  subtitle,
  extraClass = "",
}) => {
  const checkBoxList = checkBoxData.find(
    (e) => e.featureGroupFeatureMapType === "category"
  );
  const pathName = usePathname();
  const dispatch = useDispatch();
  const [urlData, setUrlData] = useState("");

  const handleChange = (value) => {
    dispatch(
      updatePlpUrl({
        category: `${checkBoxList?.slugKey}=${value}`,
      })
    );
    setUrlData(value);
  };

  const handleCapitalString = (inputString) => {
    return (
      inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase()
    );
  };

  useEffect(() => {
    const name = pathName
      .split("/")
      .find((e) => e.includes(`${checkBoxList?.slugKey}=`))
      ?.split("=")?.[1];
    setUrlData(name);
  }, [pathName]);

  return (
    <div className={`text-checkbox-wrap ${extraClass}`}>
      <FormControl>
        <FormLabel id="checkbox-label">{title}</FormLabel>
        {subtitle && <p>{subtitle}</p>}

        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {checkBoxData.map(
            ({ featureGroupFeatureMapType, featureOptions }) => {
              return (
                featureGroupFeatureMapType === "category" &&
                featureOptions.map(({ id, name }) => {
                  return (
                    <FormControlLabel
                      key={id + name}
                      label={handleCapitalString(name)}
                      onClick={() => handleChange(name)}
                      sx={{
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      value={name}
                      className={
                        name === urlData ? "active" : false
                      }
                      control={
                        <Radio
                          checked={
                            name === urlData ? true : false
                          }
                          sx={{
                            borderRadius: "50%",
                          }}
                          icon={
                            <img
                              width={70}
                              height={70}
                              style={{ borderRadius: "50%" }}
                              src={`/assets/icons/raw-svgs/Princess.svg`}
                            />
                          }
                          checkedIcon={
                            <img
                              width={70}
                              height={70}
                              style={{ borderRadius: "50%" }}
                              src={`/assets/icons/raw-svgs/Princess.svg`}
                            />
                          }
                        />
                      }
                    />
                  );
                })
              );
            }
          )}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default TextCheckBoxButtonPLP;

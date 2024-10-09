/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { checkIsFlag } from "@/_utils";

const IconRadioButton = ({
  radioData,
  title = "",
  extraClass,
  setSelected,
  selected,
  titleLabel,
}) => {
  const [selectedName, setSelectedName] = useState("");
  const [defaultOptionName, setDefaultOptionName] = useState("");

  const handleChange = (val, name) => {
    setSelectedName(name);
    setSelected({ [name]: val });
  };

  useEffect(() => {
    if (radioData) {
      const defaultOptionName = radioData?.find(
        (item) => item?.isDefault
      )?.name;
      setDefaultOptionName(defaultOptionName);
    }
  }, [radioData]);

  return (
    <div className={`icon-radio-wrapper ${extraClass || ""}`}>
      <FormControl>
        {(titleLabel || selectedName) && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <FormLabel
              sx={{ display: "flex", alignItems: "center" }}
              id="demo-row-radio-buttons-group-label"
            >
              {titleLabel}
              <Typography variant="body2" className="mt-0 mb-0 ml-5">
                {selectedName || defaultOptionName}
              </Typography>
            </FormLabel>
          </div>
        )}
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          {radioData?.map(
            (
              { image, featureOptionId, name, label, isActive, isDefault },
              index
            ) => {
              // return null
              return (
                <FormControlLabel
                  key={featureOptionId + label || name}
                  value={label || name}
                  label={(!image && label) || name}
                  control={
                    image ? (
                      <Radio
                        style={{
                          ...(selected?.[title] == featureOptionId ||
                            (checkIsFlag(isDefault) &&
                              !selectedName && {
                                border: "1px solid black",
                                borderRadius: "50px",
                                padding: "4px",
                              })),
                        }}
                        defaultChecked={
                          selected?.[title] === featureOptionId ||
                          checkIsFlag(isDefault)
                        }
                        checked={selected?.[title] === featureOptionId}
                        // disabled={!checkIsFlag(isActive)}
                        onClick={() =>
                          handleChange(
                            featureOptionId,
                            `${titleLabel}`.toLowerCase()
                          )
                        }
                        icon={
                          <img
                            loading="eager"
                            src={`/assets/icons/raw-svgs/${image}`}
                            alt={label || name}
                          />
                        }
                        checkedIcon={
                          <img
                            loading="eager"
                            src={`/assets/icons/raw-svgs/${image}`}
                            alt={label || name}
                          />
                        }
                      />
                    ) : (
                      <Radio
                        disabled={!checkIsFlag(isActive)}
                        onClick={() => handleChange(featureOptionId, name)}
                      />
                    )
                  }
                />
              );
            }
          )}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default IconRadioButton;

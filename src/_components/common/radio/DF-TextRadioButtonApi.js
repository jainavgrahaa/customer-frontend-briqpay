/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { checkIsFlag } from "@/_utils";

const DFTextRadioButtonApi = ({
  radioData,
  title,
  extraClass,
  setSelected,
  selected,
  setRingSizeValue
}) => {
  const handleChange = (val,name) => {
    setRingSizeValue(name)
    setSelected &&
      setSelected((prevSelected) => {
        const updatedSelected = { ...prevSelected };
        if (updatedSelected.hasOwnProperty(title)) {
          updatedSelected[title] = val;
        }
        return updatedSelected;
      });
  };

  return (
    <div className={`df-text-radio-wrap ${extraClass}`}>
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">{""}</FormLabel>
        <List component="div" className="text-radio-list">
          {radioData.map(
            ({
              value,
              label,
              featureOptionId,
              isActive,
              radioIcon,
              name,
              isDefault,
            }) => {
              return (
                <ListItemButton
                  disabled={!checkIsFlag(isActive)}
                  key={`${featureOptionId + value}`}
                  onClick={() => handleChange(featureOptionId, name)}
                  className={`${
                    (selected && selected[title] === featureOptionId) ||
                    checkIsFlag(isDefault)
                      ? "selected"
                      : ""
                  }`}
                >
                  <ListItem>
                    {radioIcon && (
                      <img src={`/assets/icons/raw-svgs/${radioIcon}`} />
                    )}
                    <ListItemText primary={label} />
                  </ListItem>
                </ListItemButton>
              );
            }
          )}
        </List>
      </FormControl>
    </div>
  );
};

export default DFTextRadioButtonApi;

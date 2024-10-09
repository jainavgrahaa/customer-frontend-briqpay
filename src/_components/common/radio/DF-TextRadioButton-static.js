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

const DFTextRadioButtonStatic = ({ radioData, title, icon, extraClass }) => {
  const [selected, setSelected] = useState("");
  const handleChange = (val) => {
    setSelected(val);
  };

  return (
    <div className={`df-text-radio-wrap ${extraClass}`}>
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">
          {title} 
        </FormLabel>
        <List component="div" className="text-radio-list">
          {radioData.map(({ id, value, label , radioIcon}) => {
            return (
              <ListItemButton
                key={`${id + value}`}
                onClick={() => handleChange(value)}
                className={`${selected === value ? "selected" : ""}`}
              >
                <ListItem>
                  {radioIcon && <img src={`/assets/icons/raw-svgs/${radioIcon}`} />}
                  <ListItemText primary={label}/>
                </ListItem>
              </ListItemButton>
            );
          })}
        </List>
      </FormControl>
    </div>
  );
};

export default DFTextRadioButtonStatic;

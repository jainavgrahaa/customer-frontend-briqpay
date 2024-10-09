import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useState } from "react";

const RadioButton = ({ radioData, title, setSelected, selected, titleLabel }) => {
  const [id,setId]=useState("");

  const handleChange = (val) => {
    setId(val)
    setSelected((prevSelected) => {
      const updatedSelected = { ...prevSelected };
      if (updatedSelected.hasOwnProperty(title)) {
        updatedSelected[title] = val;
      }
      return updatedSelected;
    });
  };

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">{titleLabel}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        {radioData?.map(({ label, featureOptionId, name }) => {
          return (
            <FormControlLabel
              key={featureOptionId}
              value={name} 
              label={label || name}
              control={
                <Radio onClick={() => handleChange(featureOptionId, name)} />
              }
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};
export default RadioButton;

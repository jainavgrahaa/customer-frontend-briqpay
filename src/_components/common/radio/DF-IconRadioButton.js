import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from "@mui/material";

const DFIconRadioButton = ({ radioData, title="" , extraClass,subtitile="" }) => {
  return (
    <div className={`icon-radio-wrapper ${extraClass}`}>
      <FormControl>
				<div style={{ display: 'flex', alignItems: "center" }}>
        {title && (<FormLabel id="demo-row-radio-buttons-group-label">{title}</FormLabel>) }   
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          {subtitile && (<span className="form-sublable">{subtitile}</span>) }
          {radioData.map(({ value, img, id, label= "" }) => {
            return (
              <FormControlLabel
                key={id + value}
                value={value}
                label={label}
                control={
                  <Radio
                    icon={
                      img && (
                        <img
                          alt={label}
                          src={`/assets/icons/raw-svgs/${img}`}
                        />
                      )
                    }
                    checkedIcon={
                      img && (
                        <img
                          alt={label}
                          src={`/assets/icons/raw-svgs/${img}`}
                        />
                      )
                    }
                  />
                }
              />
            );
          })}
        </RadioGroup>
        </div>
      </FormControl>
    </div>
  );
};

export default DFIconRadioButton;

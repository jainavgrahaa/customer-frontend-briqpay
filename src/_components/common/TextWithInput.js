import React, { useState } from "react";
import { FormControl, FormLabel, TextField } from "@mui/material";

const TextWithInput = ({ onChange, inputData, title, subtitle, file, extraClass, accept }) => {
  return (
    <div className={`text-radio-wrap ${extraClass}`}>
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">{title}</FormLabel>
        {subtitle && <p>{subtitle}</p>}
        {inputData && (
          <TextField
            id={inputData}
            label={inputData}
            type="text"
            variant="standard"
            onChange={onChange}
          />
        )}
        {file && (
          <>
            <FormLabel for="file-input" className="file-input-label">
              <svg>
                <use href={`/assets/icons/icons.svg#browse-icon`} />
              </svg>
              Browse files
            </FormLabel>
            <TextField
              id="file-input"
              type="file"
              variant="standard"
              onChange={onChange}
              inputProps={{ accept: accept ? "image/png, image/gif, image/jpeg" : "*"}}
            ></TextField>
          </>
        )}
      </FormControl>
    </div>
  );
};

export default TextWithInput;

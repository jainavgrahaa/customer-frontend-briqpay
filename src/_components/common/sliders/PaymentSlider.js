import React from "react";
import { Slider } from "@mui/material";

function SliderComponent({ defaultValue, valuetext, onChange, breakPoints }) {
  return (
    <Slider
      track={false}
      aria-labelledby="track-false-slider"
      getAriaValueText={valuetext}
      min={6}
      max={48}
      defaultValue={defaultValue}
      marks={breakPoints}
      onChange={onChange}
      step={null}
    />
  );
}

export default SliderComponent;

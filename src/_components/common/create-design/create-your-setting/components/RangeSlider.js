import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import Modal from "@/_components/modal";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
const RangeSlider = ({
  title,
  lowerLimit,
  upperLimit,
  unit,
  currentLowerLimit,
  currentUpperLimit,
  marks,
  extraClass,
  infoTitle,
  infoDescription,
  checBoxData,
  rangeClass,
  onChange,
  step = 0.01
}) => {
  const [priceRange, setPriceRange] = useState([currentLowerLimit, currentUpperLimit]);

  const handleSliderChange = (event, newValue) => {
    setPriceRange(newValue);
    if(onChange) {
      onChange(newValue)
    }
  };

  const formatValue = (value) => {
    if (unit === "£") {
      return Math.round(value); // Display whole numbers for £
    } else {
      return value?.toFixed(2); // Display two decimal places for other units
    }
  };
  const [rangeSliderInfo, setrangeSliderInfo] = useState(false);
  const handleCloseModal = () => {
    setrangeSliderInfo(false);
  };
  return (
    <>
      <div className={`${rangeClass === undefined ? extraClass : rangeClass} range-slider position-relative`}>
        <h4>{title}
          {infoTitle && <span className="material-icons-outlined icons-small cursor-pointer" style={{ cursor: "pointer", opacity: 0.5, marginLeft: "8px" }} onClick={() => setrangeSliderInfo(true)}>info</span>}
        </h4>
        <Slider
          value={priceRange}
          onChange={handleSliderChange}
          min={lowerLimit}
          max={upperLimit}
          step={step}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${unit}${formatValue(value)}`} // Use the formatValue function
          marks={marks} // Add the marks array to your Slider
        />
        {!marks && (
          <div className="values">
            <p className="lower-limit">{unit}{formatValue(priceRange[0])}</p> {/* Use the formatValue function */}
            <p className="upper-limit">{unit}{formatValue(priceRange[1])}</p> {/* Use the formatValue function */}
          </div>
        )}
        {checBoxData &&
        <FormGroup className="position-labeled">
          <FormControlLabel control={<Checkbox />} label="Hearts & Arrows" />
        </FormGroup>
        }
      </div>
      {infoTitle &&
        <Modal
          isOpen={rangeSliderInfo}
          onClose={handleCloseModal}
          onSubmit={handleCloseModal}
          okText="OK"
          title={infoTitle}
          className="sm-modal"
        >
          <div className="col-md-12">
            <p>
              {infoDescription}
            </p>
          </div>

        </Modal>
      }
    </>
  );
};

export default RangeSlider;

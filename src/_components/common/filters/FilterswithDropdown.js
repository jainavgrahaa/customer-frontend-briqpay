import React from "react";
import {
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Select,
  Icon,
} from "@mui/material";

const FilterswithDropdown = ({ filterData, title = "", extraClass }) => {
  const [selectedValues, setSelectedValues] = React.useState({});

  const handleChange = (filterName, value) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [filterName]: value,
    }));
  };

  return (
    <div className={`filters-wrapper ${extraClass}`}>
      <div className="filter-title">{title}</div>
      <div className="filter-dropdowns">
        {filterData.map((filter, index) => (
          <FormControl key={index} variant="standard">
            <InputLabel>{filter.filterName}</InputLabel>
            <Select
              value={selectedValues[filter.filterName] || ""}
              fullWidth
              label={filter.filterName}
              onChange={(event) =>
                handleChange(filter.filterName, event.target.value)
              }
              IconComponent={(props) => (
                <Icon
                  {...props}
                  className={`material-icons-outlined icons-small ${props.className}`}
                >
                  keyboard_arrow_down
                </Icon>
              )}
            >
              {filter.selectValues.map((selectValue) => (
                <FormControlLabel
                  key={selectValue}
                  control={<Checkbox name={selectValue} />}
                  label={selectValue}
                />
              ))}
            </Select>
          </FormControl>
        ))}
      </div>
    </div>
  );
};

export default FilterswithDropdown;

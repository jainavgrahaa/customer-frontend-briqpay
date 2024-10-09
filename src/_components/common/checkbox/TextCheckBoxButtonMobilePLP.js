/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Checkbox,
  Radio,
} from "@mui/material";
import CircularLoader from "../loader/circular-loader";
import { useRouter } from "next/router";
import TextCheckBoxButton from "@/_components/common/checkbox/TextCheckBoxButton";

const TextCheckBoxButtonMobilePLP = ({
  filterData,
  title = "",
  extraClass,
  selectedFilter,
  filterVal,
  isCount,
  facetList,
  currency,
  setSelectedFilterData,
  featureOptionsPrice
}) => {
  const [selectedValues, setSelectedValues] = useState(filterVal || []);
  const [selectedKey, setSelectedKey] = useState([]);
  const [keyCountMap, setKeyCountMap] = useState({});
  const router = useRouter();
  const [urlData, setUrlData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (filterVal?.length > 0) {
      setSelectedValues(filterVal);
      // selectedFilter(filterVal);
    }
  }, [filterVal]);

  const valuesArray = selectedValues?.map((obj) => Object.values(obj)?.flat())?.flat();

  const handleChange = (filterName, value, val, isCheckbox = true) => {
    const key = val.toLowerCase();
    let newArray = [...selectedValues];

    if (isCheckbox) {
      const exists = newArray.some((obj) => Object.keys(obj).includes(key));
      if (exists) {
        newArray = newArray.map((obj) => {
          if (Object.keys(obj).includes(key)) {
            const values = Array.isArray(obj[key]) ? obj[key] : [obj[key]];
            if (values.includes(value)) {
              const filteredValues = values.filter((v) => v !== value);
              return filteredValues.length > 0 ? { [key]: filteredValues } : null;
            } else {
              return { [key]: [...values, value] };
            }
          }
          return obj;
        }).filter(Boolean);
      } else {
        newArray.push({ [key]: [value] });
      }
    } else {
      newArray = newArray.filter((obj) => !Object.keys(obj).includes(key));
      newArray.push({ [key]: [value] });
    }

    // Clean up the array to remove any empty arrays
    newArray = newArray.filter((obj) => {
      const values = Object.values(obj)[0];
      return Array.isArray(values) ? values.length > 0 : true;
    });
    setSelectedValues(newArray);
    selectedFilter(newArray);
  };

  const convertObjectWithPriceRange = (obj) => {
    const newObj = {};

    Object.entries(obj).forEach(([key, value]) => {
      if (key === 'minprice' && obj.hasOwnProperty('maxprice')) {
        newObj['pricerange'] = [`${value[0]}-${obj['maxprice'][0]}`];
      } else if (key !== 'maxprice') {
        newObj[key] = value;
      }
    });

    return newObj;
  };

  useEffect(() => {
    if (router?.query) {
      delete router?.query?.urlSlug;

      // Convert query params to a more usable format
      const formattedData = Object.entries(router.query).reduce((acc, [key, value]) => {
        if (Array.isArray(value)) {
          acc[key] = value.map(item => item.trim().toLowerCase());
        } else if (typeof value === 'string') {
          acc[key] = value.split(',').map(item => item.trim().toLowerCase());
        }
        return acc;
      }, {});

      setUrlData(convertObjectWithPriceRange(formattedData));

      // Update keyCountMap
      const keyCountMap = Object.entries(formattedData).reduce((acc, [key, value]) => {
        acc[key] = value.length;
        return acc;
      }, {});

      setKeyCountMap(keyCountMap);

      // Convert to selectedValues format
      const newSelectedValues = Object.entries(formattedData).map(([key, value]) => ({
        [key]: value
      }));
      setSelectedValues(newSelectedValues);
    }
  }, [router]);


  // priceData
  const priceFilterData = (currency) => ({
    name: "pricerange",
    label: "Price",
    featureGroupFeatureMapType: "filter",
    featureOptions: featureOptionsPrice,
  });

  const updatedFilterData = [...filterData, priceFilterData(currency)];

  return updatedFilterData.map((filter, index) => {
    return (
      filter?.featureGroupFeatureMapType === "filter" && (
        <div className={`theme-01 text-checkbox-wrap ${extraClass}`} key={index}>
          <FormControl component="fieldset">
            <FormLabel id="checkbox-label">{filter?.label}</FormLabel>
            {/* for price */}
            {filter?.name === "pricerange" && <>
              <TextCheckBoxButton
                checkBoxData={filter?.featureOptions}
                subtitle=""
                extraClass="full-width-checkbox standard-checkboxes"
              />
            </>}
            {/* for Metal */}
            {filter?.name === "Metal" && <>
              <RadioGroup
                row
                className="icon-first"
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                {filter?.featureOptions?.map((selectValue, index) => (
                  <FormControlLabel
                    key={index}
                    labelPlacement="start"
                    control={
                      <Checkbox
                        name={selectValue.name}
                        // disabled={
                        //   !(facetList?.[
                        //     filter?.name.toLowerCase()
                        //   ]?.includes(selectValue.name) || /pricerange/.test(filter.name.toLowerCase().trim()))
                        // }
                        checked={
                          valuesArray.some((values) =>
                            values.includes(selectValue?.name)
                          ) ||
                            urlData[filter.name?.toLowerCase()]?.includes(selectValue?.name.toLowerCase())
                            ? true
                            : false
                        }
                        onChange={(event) => {
                          const val =
                            selectedValues !== selectValue?.name
                              ? selectValue?.name
                              : "";
                          handleChange(
                            selectValue.featureOptionType,
                            val,
                            filter.name
                          );
                        }}
                        sx={{
                          borderRadius: "50%",
                          display: "flex !important"
                        }}
                        icon={
                          <img
                            width={32}
                            height={32}
                            style={{ borderRadius: "50%" }}
                            src={`${selectValue?.image}`}
                            alt=""
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/assets/images/default-img.jpg";
                            }}
                          />
                        }
                        checkedIcon={
                          <img
                            width={32}
                            height={32}
                            style={{ borderRadius: "50%" }}
                            src={`${selectValue?.image}`}
                            alt=""
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/assets/images/default-img.jpg";
                            }}
                          />
                        }
                      />
                    }
                    label={selectValue?.name}
                  />
                ))}
              </RadioGroup></>}
            {/* for stoneShape */}
            {(filter?.name === "stoneShape" || filter?.name.includes("Shape")) && <>
              <RadioGroup
                row
                className="icon-first"
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                {filter?.featureOptions?.map((selectValue, index) => (
                  <FormControlLabel
                    key={index}
                    labelPlacement="top"
                    control={
                      <Checkbox
                        name={selectValue.name}
                        // disabled={
                        //   !(facetList?.[
                        //     filter?.name.toLowerCase()
                        //   ]?.includes(selectValue.name) || /pricerange/.test(filter.name.toLowerCase().trim()))
                        // }
                        checked={
                          valuesArray.some((values) =>
                            values.includes(selectValue?.name)
                          ) ||
                            urlData[filter.name?.toLowerCase()]?.includes(selectValue?.name.toLowerCase())
                            ? true
                            : false
                        }
                        onChange={(event) => {
                          const val =
                            selectedValues !== selectValue?.name
                              ? selectValue?.name
                              : "";
                          handleChange(
                            selectValue.featureOptionType,
                            val,
                            filter.name
                          );
                        }}
                        sx={{
                          borderRadius: "50%",
                          display: "flex !important"
                        }}
                        icon={
                          <img
                            width={32}
                            height={32}
                            style={{ borderRadius: "50%" }}
                            src={`${selectValue?.image}`}
                            alt=""
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/assets/images/default-img.jpg";
                            }}
                          />
                        }
                        checkedIcon={
                          <img
                            width={32}
                            height={32}
                            style={{ borderRadius: "50%" }}
                            src={`${selectValue?.image}`}
                            alt=""
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/assets/images/default-img.jpg";
                            }}
                          />
                        }
                      />
                    }
                    label={selectValue?.name}
                  />
                ))}
              </RadioGroup>
            </>}
            {/* for bandwidth */}
            {filter?.name === "bandwidth" && <>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                {filter?.featureOptions?.map((selectValue, index) => (
                  <FormControlLabel
                    key={index}
                    labelPlacement="top"
                    control={
                      <Checkbox
                        name={selectValue.name}
                        // disabled={
                        //   !(facetList?.[
                        //     filter?.name.toLowerCase()
                        //   ]?.includes(selectValue.name) || /pricerange/.test(filter.name.toLowerCase().trim()))
                        // }
                        checked={
                          valuesArray.some((values) =>
                            values.includes(selectValue?.name)
                          ) ||
                            urlData[filter.name?.toLowerCase()]?.includes(selectValue?.name.toLowerCase())
                            ? true
                            : false
                        }
                        onChange={(event) => {
                          const val =
                            selectedValues !== selectValue?.name
                              ? selectValue?.name
                              : "";
                          handleChange(
                            selectValue.featureOptionType,
                            val,
                            filter.name
                          );
                        }}
                        sx={{
                          borderRadius: "50%",
                          display: "flex !important"
                        }}
                      />
                    }
                    label={selectValue?.name}
                  />
                ))}
              </RadioGroup>
            </>}

            {filter?.name !== "Metal" && filter?.name !== "pricerange" && filter?.name !== "stoneShape" && filter?.name !== "bandwidth" && !filter?.name.includes("Shape") && <>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                {filter?.featureOptions?.map((selectValue, index) => (
                  <FormControlLabel
                    key={index}
                    labelPlacement="top"
                    control={
                      <Checkbox
                        name={selectValue.name}
                        // disabled={
                        //   !(facetList?.[
                        //     filter?.name.toLowerCase()
                        //   ]?.includes(selectValue.name) || /pricerange/.test(filter.name.toLowerCase().trim()))
                        // }
                        checked={
                          valuesArray.some((values) =>
                            values.includes(selectValue?.name)
                          ) ||
                            urlData[filter.name?.toLowerCase()]?.includes(selectValue?.name.toLowerCase())
                            ? true
                            : false
                        }
                        onChange={(event) => {
                          const val =
                            selectedValues !== selectValue?.name
                              ? selectValue?.name
                              : "";
                          handleChange(
                            selectValue.featureOptionType,
                            val,
                            filter.name,
                            false
                          );
                        }}
                        sx={{
                          borderRadius: "50%",
                          display: "flex !important"
                        }}
                        icon={
                          <img
                            width={40}
                            height={40}
                            style={{ borderRadius: "50%" }}
                            src={`${selectValue?.image}`}
                            alt=""
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/assets/images/default-img.jpg";
                            }}
                          />
                        }
                        checkedIcon={
                          <img
                            width={40}
                            height={40}
                            style={{ borderRadius: "50%" }}
                            src={`${selectValue?.image}`}
                            alt=""
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/assets/images/default-img.jpg";
                            }}
                          />
                        }
                      />
                    }
                    label={selectValue?.name}
                  />
                ))}
              </RadioGroup>
            </>
            }

            {/* {filter?.name === "pricerange" ? (
              <RadioGroup
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                {filter?.featureOptions?.map((selectValue, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Radio
                        name={selectValue.name}
                        disabled={
                          !(facetList?.[
                            filter?.name.toLowerCase()
                          ]?.includes(selectValue.name) || /pricerange/.test(filter.name.toLowerCase().trim()))
                        }
                        checked={
                          valuesArray.some((values) =>
                            values.includes(selectValue?.name)
                          ) ||
                          urlData?.includes(selectValue?.name.toLowerCase())
                            ? true
                            : false
                        }
                        onChange={(event) => {
                          const val =
                            selectedValues !== selectValue?.name
                              ? selectValue?.name
                              : "";
                          handleChange(
                            selectValue.featureOptionType,
                            val,
                            filter.name
                          );
                        }}
                        sx={{
                          borderRadius: "50%",
                          display: "flex" 
                        }}
                      />
                    }
                    label={selectValue?.label}
                  />
                ))}
              </RadioGroup>
            ) : (
                <RadioGroup
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                {filter?.featureOptions?.map((selectValue, index) => (
                  <FormControlLabel
                    key={index}
                    labelPlacement="top"
                    control={
                      <Checkbox
                        name={selectValue.name}
                        disabled={
                          !(facetList?.[
                            filter?.name.toLowerCase()
                          ]?.includes(selectValue.name) || /pricerange/.test(filter.name.toLowerCase().trim()))
                        }
                        checked={
                          valuesArray.some((values) =>
                            values.includes(selectValue?.name)
                          ) ||
                          urlData?.includes(selectValue?.name.toLowerCase())
                            ? true
                            : false
                        }
                        onChange={(event) => {
                          const val =
                            selectedValues !== selectValue?.name
                              ? selectValue?.name
                              : "";
                          handleChange(
                            selectValue.featureOptionType,
                            val,
                            filter.name
                          );
                        }}
                        sx={{
                          borderRadius: "50%",
                          display:"flex !important"
                        }}
                        icon={
                          <img
                            width={40}
                            height={40}
                            style={{ borderRadius: "50%" }}
                            src={selectValue.image}
                            alt=""
                          />
                        }
                        checkedIcon={
                          <img
                            width={40}
                            height={40}
                            style={{ borderRadius: "50%" }}
                            src={selectValue.image}
                          />
                        }
                      />
                    }
                    label={selectValue?.name}
                  />
                ))}
              </RadioGroup>
            )}  */}
          </FormControl>
        </div>
      )
    );
  });


};

export default TextCheckBoxButtonMobilePLP;

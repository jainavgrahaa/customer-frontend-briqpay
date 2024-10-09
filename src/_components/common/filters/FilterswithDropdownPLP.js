import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Select,
  Checkbox,
  Icon,
} from "@mui/material";
import { convertToSentenceCase } from "@/_utils";
import { useRouter } from "next/router";
import Image from "next/image";
import ImageWithFallback from "../ImageWithFallback";
import { usePathname } from "next/navigation";

const FilterswithDropdownPLP = ({
  filterData,
  title = "",
  extraClass,
  selectedFilter,
  filterVal,
  isCount,
  facetList,
  currency,
  featureOptionsPrice,
}) => {
  const pathname = usePathname();

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

  const valuesArray = selectedValues
    ?.map((obj) => Object.values(obj)?.flat())
    ?.flat();

  const handleChange = (
    featureOptionType,
    value,
    filterName,
    isCheckbox = true
  ) => {
    const key = featureOptionType.toLowerCase();
    let newArray = [...selectedValues];

    if (isCheckbox) {
      const exists = newArray.some((obj) => Object.keys(obj).includes(key));
      if (exists) {
        newArray = newArray
          .map((obj) => {
            if (Object.keys(obj).includes(key)) {
              const values = Array.isArray(obj[key]) ? obj[key] : [obj[key]];
              if (values.includes(value)) {
                const filteredValues = values.filter((v) => v !== value);
                return filteredValues.length > 0
                  ? { [key]: filteredValues }
                  : null;
              } else {
                return { [key]: [...values, value] };
              }
            }
            return obj;
          })
          .filter(Boolean);
      } else {
        // newArray = newArray.filter((obj) => !Object.keys(obj).includes(key));
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
      if (key === "minprice" && obj.hasOwnProperty("maxprice")) {
        newObj["pricerange"] = [`${value[0]}-${obj["maxprice"][0]}`];
      } else if (key !== "maxprice") {
        newObj[key] = value;
      }
    });

    return newObj;
  };

  useEffect(() => {
    if (router?.query) {
      delete router?.query?.urlSlug;

      // Convert query params to a more usable format
      const formattedData = Object.entries(router.query).reduce(
        (acc, [key, value]) => {
          if (Array.isArray(value)) {
            acc[key] = value.map((item) => item.trim().toLowerCase());
          } else if (typeof value === "string") {
            acc[key] = value
              .split(",")
              .map((item) => item.trim().toLowerCase());
          }
          return acc;
        },
        {}
      );

      setUrlData(convertObjectWithPriceRange(formattedData));

      // Update keyCountMap
      const keyCountMap = Object.entries(formattedData).reduce(
        (acc, [key, value]) => {
          acc[key] = value.length;
          return acc;
        },
        {}
      );

      setKeyCountMap(keyCountMap);

      // Convert to selectedValues format
      const newSelectedValues = Object.entries(formattedData).map(
        ([key, value]) => ({
          [key]: value,
        })
      );
      // setSelectedValues(newSelectedValues);
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

  const countCalculate = (keyToCheck) => {
    let occurrence = 0;

    selectedValues.forEach((obj) => {
      if (obj.hasOwnProperty(keyToCheck)) {
        occurrence++;
      }
    });

    return occurrence;
  };

  return (
    <>
      <div className={`filters-wrapper ${extraClass} d-block`}>
        <div className="filter-dropdowns listing">
          <div className="filter-title">{title}</div>
          {updatedFilterData.map(
            (filter, index) =>
              filter?.featureGroupFeatureMapType === "filter" && (
                <FormControl
                  key={`${index}-${filter?.name}`}
                  variant="standard"
                >
                  {selectedValues.find((e) =>
                    e.hasOwnProperty(
                      filter?.featureOptions[0]?.featureOptionType
                    )
                  )?.[filter?.featureOptions[0]?.featureOptionType].length >
                    0 && (
                    <div className="num-box">
                      {countCalculate(
                        `${filter?.featureOptions[0]?.featureOptionType}`
                      )}
                    </div>
                  )}
                  {((filter?.name !== "pricerange" &&
                    keyCountMap[filter.name.toLowerCase()] > 0) ||
                    (filter?.name === "pricerange" &&
                      keyCountMap["minprice"] > 0)) &&
                    isCount && (
                      <div className="num-box">
                        {
                          keyCountMap[
                            filter?.name !== "pricerange"
                              ? filter.name.toLowerCase()
                              : "minprice"
                          ]
                        }
                      </div>
                    )}
                  <InputLabel>
                    {convertToSentenceCase(
                      filter?.name === "pricerange"
                        ? filter?.label
                        : filter.name
                    )}
                  </InputLabel>
                  <Select
                    value={selectedValues || ""}
                    fullWidth
                    label={
                      filter?.name === "pricerange"
                        ? filter?.label
                        : filter.name
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
                    {filter?.name === "Metal" && (
                      <>
                        <RadioGroup
                          className="icon-first"
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                        >
                          {filter?.featureOptions?.map((selectValue, index) => (
                            <>
                              s{selectValue.featureOptionType}
                              <FormControlLabel
                                key={index}
                                labelPlacement="end"
                                style={{
                                  gap: "4px",
                                }}
                                control={
                                  <Checkbox
                                    name={selectValue.name}
                                    checked={
                                      valuesArray.some((values) =>
                                        values.includes(selectValue?.name)
                                      ) ||
                                      urlData[
                                        filter.name?.toLowerCase()
                                      ]?.includes(
                                        selectValue?.name.toLowerCase()
                                      )
                                        ? true
                                        : false
                                    }
                                    onChange={(event) => {
                                      const value = selectValue?.propertyName
                                        ? `${selectValue?.propertyName}_${selectValue?.propertyValue}`
                                        : `${selectValue?.propertyValue}`;
                                      handleChange(
                                        selectValue.featureOptionType,
                                        value,
                                        filter.name
                                      );
                                    }}
                                    sx={{
                                      borderRadius: "50%",
                                      display: "flex !important",
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
                                          e.target.src =
                                            "/assets/images/default-img.jpg";
                                        }}
                                      />
                                    }
                                    checkedIcon={
                                      <img
                                        width={32}
                                        height={32}
                                        style={{ borderRadius: "50%" }}
                                        src={`/${selectValue?.image}`}
                                        alt=""
                                        onError={(e) => {
                                          e.target.onerror = null;
                                          e.target.src =
                                            "/assets/images/default-img.jpg";
                                        }}
                                      />
                                    }
                                  />
                                }
                                label={selectValue?.name}
                              />
                            </>
                          ))}
                        </RadioGroup>
                      </>
                    )}
                    {filter?.name === "pricerange" && (
                      <RadioGroup>
                        {filter?.featureOptions?.map((selectValue) => (
                          <FormControlLabel
                            key={selectValue}
                            control={<Radio />}
                            label={
                              filter?.name === "pricerange"
                                ? selectValue?.label
                                : selectValue?.name
                            }
                            checked={
                              valuesArray?.length > 0
                                ? valuesArray.some((values) =>
                                    values.includes(selectValue?.name)
                                  )
                                : urlData[filter.name?.toLowerCase()]?.includes(
                                    selectValue?.name.toLowerCase()
                                  )
                                ? true
                                : false
                            }
                            onChange={(event) => {
                              const val = selectValue?.name;
                              handleChange(
                                selectValue.featureOptionType,
                                val,
                                filter.name,
                                false
                              );
                            }}
                          />
                        ))}
                      </RadioGroup>
                    )}
                    {/* for stoneShape */}
                    {(filter?.name === "stoneShape" ||
                      filter?.name.includes("Shape")) && (
                      <>
                        <RadioGroup
                          className="icon-last-with-checkbox"
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                        >
                          {filter?.featureOptions?.map((selectValue, index) => (
                            <FormControlLabel
                              key={index}
                              style={{
                                gap: "4px",
                              }}
                              sx={{
                                "& .MuiFormControlLabel-label": {
                                  flexGrow: 1,
                                },
                              }}
                              control={
                                <Checkbox
                                  name={selectValue.name}
                                  checked={
                                    valuesArray.some((values) =>
                                      values.includes(selectValue?.name)
                                    ) ||
                                    urlData[
                                      filter.name?.toLowerCase()
                                    ]?.includes(selectValue?.name.toLowerCase())
                                      ? true
                                      : false
                                  }
                                  onChange={(event) => {
                                    const value = selectValue?.propertyName
                                      ? `${selectValue?.propertyName}_${selectValue?.propertyValue}`
                                      : `${selectValue?.propertyValue}`;
                                    handleChange(
                                      selectValue.featureOptionType,
                                      value,
                                      filter.name
                                    );
                                  }}
                                  sx={{
                                    borderRadius: "50%",
                                    display: "flex !important",
                                  }}
                                />
                              }
                              label={
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    gap: "20px",
                                  }}
                                >
                                  {selectValue?.name}
                                  <ImageWithFallback
                                    width={28}
                                    height={28}
                                    style={{}}
                                    src={selectValue.image}
                                    fallback={"/assets/images/default-img.jpg"}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src =
                                        "/assets/images/default-img.jpg";
                                    }}
                                    alt=""
                                  />
                                </div>
                              }
                            />
                          ))}
                        </RadioGroup>
                      </>
                    )}
                    {/* for bandwidth */}
                    {filter?.name === "bandwidth" && (
                      <>
                        <RadioGroup
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                        >
                          {filter?.featureOptions?.map((selectValue, index) => (
                            <FormControlLabel
                              key={index}
                              labelPlacement="end"
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
                                    urlData[
                                      filter.name?.toLowerCase()
                                    ]?.includes(selectValue?.name.toLowerCase())
                                      ? true
                                      : false
                                  }
                                  onChange={(event) => {
                                    const value = selectValue?.propertyName
                                      ? `${selectValue?.propertyName}_${selectValue?.propertyValue}`
                                      : `${selectValue?.propertyValue}`;
                                    handleChange(
                                      selectValue.featureOptionType,
                                      value,
                                      filter.name
                                    );
                                  }}
                                  sx={{
                                    borderRadius: "50%",
                                    // display: "flex !important"
                                  }}
                                />
                              }
                              label={selectValue?.name}
                            />
                          ))}
                        </RadioGroup>
                      </>
                    )}

                    {filter?.name !== "Metal" &&
                      filter?.name !== "pricerange" &&
                      filter?.name !== "stoneShape" &&
                      filter?.name !== "bandwidth" &&
                      !filter?.name.includes("Shape") && (
                        <>
                          <RadioGroup
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            {filter?.featureOptions?.map(
                              (selectValue, index) => (
                                <FormControlLabel
                                  key={index}
                                  labelPlacement="end"
                                  control={
                                    <Checkbox
                                      name={selectValue.name}
                                      checked={
                                        valuesArray.some((values) =>
                                          values.includes(selectValue?.name)
                                        ) ||
                                        urlData[
                                          filter.name?.toLowerCase()
                                        ]?.includes(
                                          selectValue?.name.toLowerCase()
                                        )
                                          ? true
                                          : false
                                      }
                                      onChange={(event) => {
                                        const value = selectValue?.propertyName
                                          ? `${selectValue?.propertyName}_${selectValue?.propertyValue}`
                                          : `${selectValue?.propertyValue}`;
                                        handleChange(
                                          selectValue.featureOptionType,
                                          value,
                                          filter.name
                                        );
                                      }}
                                      sx={{
                                        borderRadius: "50%",
                                        // display: "flex !important"
                                      }}
                                    />
                                  }
                                  label={selectValue?.name}
                                />
                              )
                            )}
                          </RadioGroup>
                        </>
                      )}
                  </Select>
                </FormControl>
              )
          )}
        </div>
      </div>
    </>
  );
};

export default FilterswithDropdownPLP;

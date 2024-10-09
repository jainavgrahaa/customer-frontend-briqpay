/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import RangeSlider from "@/_components/common/sliders/RangeSlider";
import MaterialCheckbox from "@/_components/atoms/MaterialCheckbox";
import TextTitle from "@/_components/atoms/TextTitle";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { Button } from "@mui/material";
import CustomTableList from "@/_components/common/CustomTableList";
import useAuthHelper from "@/_hooks/useAuthHelper";

const ChooseSpecificDiamond = ({ storeId, variantOptionId, translateId }) => {
  const tableHeadings = ["View", "Carat", "Color", "Clarity", "Cut", "Price"];
  const [loading, setLoading] = useState(true);
  const { getPosition, getDiamondsList } = useAuthHelper();
  const [diamondList, setDiamondList] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [rangeFilter, setRangeFilter] = useState({
    minPrice: 0,
    maxPrice: 3500,
    minCarat: 0,
    maxCarat: 80,
  });
  const [filters, setFilters] = useState({
    withImage: false,
    localStock: false,
    heartsAndArrows: false,
    withVideo: false,
  });

  let timeoutId = useRef(null);
  const fetchDiamonds = (() => {
    return async (param) => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }

      timeoutId.current = setTimeout(async () => {
        setLoading(true);
        const res = await getPosition();
        const positionId = res.data?.[0]?.id;
        if (positionId) {
          const response = await getDiamondsList(
            storeId,
            variantOptionId,
            positionId,
            translateId,
            param
          );
          setDiamondList(response?.data || []);
          setLoading(false);
        }
      }, 1000);
    };
  })();

  useEffect(() => {
    const keys = Object.keys(filters);
    const queryString = keys.filter((ele) => filters[ele]);
    let str = "";
    queryString.forEach((ele) => {
      str = str + "&" + ele + "=true";
    });

    const rangeKeys = Object.keys(rangeFilter);
    rangeKeys.forEach((ele) => {
      str = str + "&" + ele + "=" + rangeFilter[ele];
    });
    if(searchText) {
      str = str + "&" + "searchKey=" + searchText;
    }
    fetchDiamonds(str);
  }, [filters, rangeFilter, searchText]);

  return (
    <div className="choose-specific-diamond">
      <RangeSlider
        title="Carat"
        lowerLimit={0}
        upperLimit={80}
        unit=""
        currentLowerLimit={rangeFilter.minCarat}
        currentUpperLimit={rangeFilter.maxCarat}
        extraClass="col-md-6"
        rangeClass={"col-md-12 mb-4"}
        onChange={(e) =>
          setRangeFilter({
            ...rangeFilter,
            minCarat: e[0],
            maxCarat: e[0],
          })
        }
      />
      <RangeSlider
        title="Price"
        lowerLimit={1000}
        upperLimit={3500}
        unit="£"
        currentLowerLimit={rangeFilter.minPrice}
        currentUpperLimit={rangeFilter.maxPrice}
        extraClass="col-md-12"
        rangeClass={"col-md-12 mb-4"}
        onChange={(e) =>
          setRangeFilter({
            ...rangeFilter,
            minPrice: e[0],
            maxPrice: e[0],
          })
        }
      />
      <div className="diamond-search-crateria mt-5">
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-6">
            <MaterialCheckbox
              name="With image"
              label="With image"
              checked={filters.withImage}
              handleChange={() =>
                setFilters({
                  ...filters,
                  withImage: !filters.withImage,
                })
              }
            />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6">
            <MaterialCheckbox
              name="With video"
              label="With video"
              checked={filters.withVideo}
              handleChange={() =>
                setFilters({
                  ...filters,
                  withVideo: !filters.withVideo,
                })
              }
            />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6">
            <MaterialCheckbox
              name="Local stock"
              label="Local stock"
              checked={filters.localStock}
              handleChange={() =>
                setFilters({
                  ...filters,
                  localStock: !filters.localStock,
                })
              }
            />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            <MaterialCheckbox
              name="Hearts & arrows"
              label="Hearts & arrows"
              checked={filters.heartsAndArrows}
              handleChange={() =>
                setFilters({
                  ...filters,
                  heartsAndArrows: !filters.heartsAndArrows,
                })
              }
            />
          </div>
        </div>
        <div className="search-diamond row align-items-end mb-5">
          <div className="col-xl-10 col-lg-10 col-sm-10">
            <TextField
              type="text"
              variant="standard"
              placeholder="Search"
              sx={{ width: "100%" }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <span
                      className="material-icons-outlined"
                      style={{ color: "#000" }}
                    >
                      search
                    </span>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="col-xl-2 col-lg-2 col-sm-2">
            <Button variant="text" className="text-style-normal">
              <span className="underline">Reset</span>
            </Button>
          </div>
        </div>
      </div>
      {loading ? (
        <div className={"mb-4"}>Loading...</div>
      ) : diamondList?.length === 0 ? (
        <TextTitle
          variant="p"
          name={`${diamondList.length} diamonds found matching your criteria`}
          className={"mb-4"}
        />
      ) : (
        <div className="">
          <CustomTableList
            tableHeadings={tableHeadings}
            newTableContent={diamondList}
            tableType={"ChooseSpecificDiamond"}
          />
        </div>
      )}
    </div>
  );
};

export default ChooseSpecificDiamond;

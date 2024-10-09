import React, { useState, useEffect } from "react";
import { FormControl, MenuItem, Select, Icon, InputLabel } from "@mui/material";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const FilterswithDropdownPLPSort = ({ title = "", extraClass }) => {
  const pathName = usePathname();
  const router = useRouter();
  const { pageData } = useSelector((state) => state.appconfig);
  const { navigationLists } = pageData || {};
  // State for sorted filter data
  const [filterDataArr, setFilterDataArr] = useState([]);
  const [selectedValues, setSelectedValues] = useState("");

  const handleChange = (e) => {
    setSelectedValues(e.target.value);
    const newSortedData = `sort=${e.target.value.toLowerCase()}`;
    const modifiedStr = `${pathName}`;
    if (Object?.values(router?.query)?.length > 0) {
      if (Object.keys(router?.query).some((q) => q === "sort")) {
        const query = router?.query;
        query["sort"] = e?.target?.value.toLowerCase();
        const queryString = new URLSearchParams(query).toString();
        const modifiedUrl = queryString
          ? `${modifiedStr}?${queryString}`
          : modifiedStr;
        window.location.href = modifiedUrl;
      } else {
        const queryString = new URLSearchParams(router.query).toString();
        const modifiedUrl = queryString
          ? `${modifiedStr}?${queryString}&${newSortedData}`
          : modifiedStr;
        window.location.href = modifiedUrl;
      }
    } else {
      const modifiedStr = `${pathName}?${newSortedData}`;
      window.location.href = modifiedStr;
    }
  };

  useEffect(() => {
    if (navigationLists) {
      const sortedNavigationLists = [...navigationLists].sort((a, b) => {
        // Handle cases where sequence is null
        if (a.sequence === null && b.sequence === null) return 0;
        if (a.sequence === null) return 1;
        if (b.sequence === null) return -1;
        return a.sequence - b.sequence;
      });
      const mappedFilterDataArr = sortedNavigationLists.map((item) => ({
        name: item.displayName,
        value: item.name,
      }));
      setSelectedValues(mappedFilterDataArr?.[0]?.value);
      setFilterDataArr(mappedFilterDataArr);
    }
  }, [navigationLists]);

  // handle current url sorting
  // useEffect(() => {
  //   if (router.query.sort) {
  //     setSelectedValues(router.query.sort);
  //   }
  // }, [router]);

  return (
    <div className={`filters-wrapper ${extraClass}`}>
      <div className="filter-title">{title}</div>
      <div className="filter-dropdowns listing">
        <FormControl variant="standard">
          <Select
            value={selectedValues}
            className="sort-menu px-0"
            sx={{ display: "flex", justifyContent: "end", minWidth: "120px" }}
            fullWidth
            label={selectedValues}
            onChange={handleChange}
            IconComponent={(props) => (
              <Icon
                {...props}
                className={`material-icons-outlined icons-small ${props.className}`}
              >
                keyboard_arrow_down
              </Icon>
            )}
          >
            {filterDataArr?.map((selectValue) => (
              <MenuItem
                key={`${selectValue?.name}-sort`}
                value={selectValue?.value}
              >
                {selectValue?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default FilterswithDropdownPLPSort;

import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  Box,
  Pagination,
  IconButton,
  Button,
} from "@mui/material";
import { TextField, InputAdornment } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import useAuthHelper from "@/_hooks/useAuthHelper";
import DfPdpChooseDiamondTable from "./DfPdpChooseDiamondTable";

const initialFilters = {
  withImage: false,
  localStock: false,
  heartsAndArrows: false,
  withVideo: false,
};

export default function DfPdpSearchDiamond({
  storeId,
  variantOptionId,
  translateId,
  setDiamondList,
  diamondList,
  setLoading,
}) {
  const [page, setPage] = useState(1);
  const [positionId, setPositionId] = useState(null);
  const { getPosition, getDiamondsList } = useAuthHelper();

  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState(initialFilters);

  let timeoutId = useRef(null);

  const fetchPositionId = async () => {
    const res = await getPosition();
    setPositionId(res?.data?.[0]?.id);
  };

  const fetchDiamonds = (() => {
    return async (param) => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
      timeoutId.current = setTimeout(async () => {
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
    setLoading(true);
    fetchPositionId();
  }, []);

  useEffect(() => {
    const keys = Object.keys(filters);
    const queryString = keys.filter((ele) => filters[ele]);
    let str = "";
    queryString.forEach((ele) => {
      str = str + "&" + ele + "=true";
    });

    if (searchText) {
      str = str + "&" + "certificateCode=" + searchText;
    }
    if (positionId) {
      setLoading(true);
      fetchDiamonds(str);
    }
  }, [filters, searchText, positionId]);

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

   return (
    <>
      <div className="search-field mt-4 mb-4">
        <TextField
          variant="standard"
          placeholder="Search by Diamond Сode"
          className="dark-placeholder"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            style: { height: "50px" },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  <span className="material-icons-outlined text-icon color-black">
                    search
                  </span>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="row">
        <div className="col-xl-10 col-lg-10 col-sm-12">
          <div className="d-flex flex-row align-items-center flex-wrap">
            <FormControlLabel
              labelPlacement="start"
              control={
                <Switch
                  checked={filters.withVideo}
                  onChange={handleFilterChange}
                  name="withVideo"
                />
              }
              label="Video"
            />
            <FormControlLabel
              labelPlacement="start"
              control={
                <Switch
                  checked={filters.withImage}
                  onChange={handleFilterChange}
                  name="withImage"
                />
              }
              label="Image"
            />
            <FormControlLabel
              labelPlacement="start"
              control={
                <Switch
                  checked={filters.localStock}
                  onChange={handleFilterChange}
                  name="localStock"
                />
              }
              label="Local Stock"
            />
            <FormControlLabel
              labelPlacement="start"
              control={
                <Switch
                  checked={filters.heartsAndArrows}
                  onChange={handleFilterChange}
                  name="heartsAndArrows"
                />
              }
              label="Hearts & Arrows"
            />
          </div>
        </div>
        <div className="col-xl-2 col-lg-2 col-sm-12 text-right">
          <Button
            variant="text"
            className="underlined-button text-style-normal color-black"
            onClick={() => {
              setFilters(initialFilters);
            }}
          >
            Reset Filters
          </Button>
        </div>
      </div>
      <DfPdpChooseDiamondTable diamondList={diamondList} />
    </>
  );
}

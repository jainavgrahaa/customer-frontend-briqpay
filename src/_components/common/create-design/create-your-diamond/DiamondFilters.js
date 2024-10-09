import React, { useState } from "react";
import ChooseDiamondProductsList from "./createYourDiamondProductsList";
import ChooseDiamondListView from "./chooseDiamondListView";
import { cydFilters } from "@/_utils/customApiData";
import Button from "@mui/material/Button";
import Modal from "@/_components/modal";
import CustomTabsData from "../../CustomTabsData";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import useDeviceHelper from "@/_hooks/useDeviceHelper";
import CustomTableList from "@/_components/common/CustomTableList";
import { chooseDiamondListViewTable } from "@/_utils/customApiData";
import { deliveryFiltersText } from "@/_utils/customApiData";
const DiamondFilters = () => {
  const [gridViewActive, setGridViewActive] = useState(true);
  const [listViewActive, setListViewActive] = useState(false);
  const [filterTab, setfilterTab] = useState(null);
  const handleFilterTab = (index) => {
    setfilterTab(index);
  };
  const [infoModal, setinfoModal] = useState(false);
  const handleCloseModal = () => {
    setinfoModal(false);
  };
  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };
  const { deviceType } = useDeviceHelper();
  const tableHeadings = [
    "Shape",
    "Carat",
    "Clarity",
    "Colour",
    "Cut",
    "Price",
    "Compare",
  ];
  return (
    <>
      <div className="choose-diamond-filters">
        <div className="left-filters">
          {cydFilters.map((data, index) => (
            <React.Fragment key={index}>
              <Button
                variant="text"
                className={`text-style-normal ${
                  filterTab === index ? "active" : ""
                }`}
                onClick={() => handleFilterTab(index)}
              >
                {data?.value}{" "}
                {data?.count && <span className="">({data?.count})</span>}
                {data?.infoTitle && (
                  <span
                    className="material-icons-outlined icons-small cursor-pointer"
                    style={{
                      cursor: "pointer",
                      opacity: 0.5,
                      marginLeft: "8px",
                    }}
                    onClick={() => setinfoModal(true)}
                  >
                    info
                  </span>
                )}
              </Button>
              {data?.infoTitle && (
                <Modal
                  isOpen={infoModal}
                  onClose={handleCloseModal}
                  onSubmit={handleCloseModal}
                  okText="OK"
                  title={data?.infoTitle}
                  className="sm-modal"
                >
                  <div className="col-md-12">
                    <p>{data?.infoDescription}</p>
                  </div>
                </Modal>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="right-filters">
          <div className="compare-filter">
            <svg>
              <use href={`/assets/icons/icons.svg#compare_products_icon`} />
            </svg>
            <p>Compare(0)</p>
          </div>
          <div className="view-filter">
            <svg
              onClick={() => {
                setListViewActive(true);
                setGridViewActive(false);
              }}
              className="list-view cursorP"
            >
              {listViewActive ? (
                <use href={`/assets/icons/icons.svg#list_view_on`} />
              ) : (
                <use href={`/assets/icons/icons.svg#list_view_off`} />
              )}
            </svg>
            <svg
              onClick={() => {
                setGridViewActive(true);
                setListViewActive(false);
              }}
              className="grid-view cursorP"
            >
              {gridViewActive ? (
                <use href={`/assets/icons/icons.svg#grid_view_on`} />
              ) : (
                <use href={`/assets/icons/icons.svg#grid_view_off`} />
              )}
            </svg>
          </div>
        </div>
      </div>
      <CustomTabsData
        tabs={deliveryFiltersText}
        type="radio"
        extraClass="sub-tabs justify-content-start tab-level-1 mt-2 mb-2"
      />
      {deviceType === "desktop" && (
        <div className="d-flex justify-space-between">
          <div className="selected-filters d-flex align-items-center mb-4">
            <Stack direction="row" spacing={1} className="chips-filters">
              <Chip
                label="Solitare"
                onDelete={handleDelete}
                deleteIcon={<span class="material-icons-outlined">close</span>}
              />
              <Chip
                label="Halo"
                onDelete={handleDelete}
                deleteIcon={<span class="material-icons-outlined">close</span>}
              />
            </Stack>
            <Button
              variant="text"
              sx={{ mt: 2, mb: 2 }}
              className="text-style-normal underlined-button m-0"
            >
              {" "}
              Reset all
            </Button>
          </div>
        </div>
      )}
      {listViewActive && (
        <CustomTableList
          tableHeadings={tableHeadings}
          tableContent={chooseDiamondListViewTable}
          compare={true}
          tableType={"CreateDimond"}
        />
      )}
      {gridViewActive && <ChooseDiamondProductsList />}
    </>
  );
};

export default DiamondFilters;

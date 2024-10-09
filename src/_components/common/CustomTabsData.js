import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Modal from "@/_components/modal";
import { setSelectedSettingDetail } from "@/_store/chooseSettings.slice";

const CustomTabsData = ({ tabs, type, extraClass = "", containerClass }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedSettingDetail } = useSelector(
    (state) => state.chooseSettings
  );

  const [activeTab, setActiveTab] = useState(0);
  const [radioInfo, setRadioInfo] = useState({
    isOpen: false,
    title: "",
  });

  const handleTabClick = (index, stepRoute, infoTitle) => {
    setActiveTab(index);

    if (stepRoute) {
      router.push(stepRoute);
    }
    if (type !== "radio") {
      setRadioInfo({
        isOpen: true,
        title: infoTitle,
      });
    }
  };
  const handleSecondTabClick = (index, stepRoute) => {
    setActiveTab(index);
    if (stepRoute) {
      router.push(stepRoute);
    }
  };

  const handleCloseModal = () => {
    setRadioInfo({
      ...radioInfo,
      isOpen: false,
    });
  };

  return (
    <div className={`tabs-container ${containerClass}`}>
      <div className={`tab-header ${extraClass}`}>
        {tabs.map((tab, index) =>
          type === "radio" ? (
            <div key={tab.label} className="tab-header-with-tooltip">
              <FormControlLabel
                key={index}
                value={tab.value}
                label={tab.label}
                onClick={() => handleTabClick(index, tab.route, tab.infoTitle)}
                control={<Radio checked={activeTab === index} />}
              />
              {tab.radioIcon && (
                <span class="material-icons-outlined me-3">
                  {tab.radioIcon}
                </span>
              )}
              {tab.infoTitle && (
                <span
                  className="material-icons-outlined icons-small cursor-pointer"
                  style={{ cursor: "pointer", opacity: 0.5 }}
                  onClick={() =>
                    setRadioInfo({
                      isOpen: true,
                      title: tab.infoTitle,
                    })
                  }
                >
                  info
                </span>
              )}
            </div>
          ) : (
            <div
              key={index}
              className={`tab-item ${
                tab.route
                  ? `/${tab.route}` === router.asPath
                    ? "active"
                    : "selected"
                  : activeTab === index
                  ? "active"
                  : "selected"
              }`}
            >
              <div className="tab-sub-heading">
                {tab.tabNumber && <h2>{tab.tabNumber}</h2>}
                <div>
                  <span>{tab.label}</span>
                  {selectedSettingDetail && tab.tabNumber === "1" && (
                    <Box display={"flex"} alignItems={"center"}>
                      <Typography
                        fontSize={12}
                        sx={{
                          mb: "0px!important",
                          maxWidth: "100px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {selectedSettingDetail.name}
                      </Typography>
                      <Button
                        sx={{
                          fontSize: "12px!important",
                          fontWeight: "normal!important",
                          textDecoration: "underline !important",
                          textTransform: "capitalize !important",
                          px: "10px !important",
                          minWidth: "initial",
                        }}
                        onClick={() => {
                          router.push(tab.route);
                        }}
                      >
                        View
                      </Button>
                      <Button
                        sx={{
                          fontSize: "12px!important",
                          fontWeight: "normal!important",
                          textDecoration: "underline !important",
                          textTransform: "capitalize !important",
                          px: "10px !important",
                          minWidth: "initial",
                        }}
                        onClick={() => {
                          dispatch(setSelectedSettingDetail(null));
                          router.push(tab.route);
                        }}
                      >
                        Change
                      </Button>
                    </Box>
                  )}
                </div>
                <img src={tab.tabLogo} alt="" />
              </div>
            </div>
          )
        )}
      </div>
      {radioInfo.isOpen && (
        <Modal
          isOpen={radioInfo.isOpen}
          onClose={handleCloseModal}
          onSubmit={handleCloseModal}
          okText="OK"
          title={radioInfo.title}
          className="sm-modal"
        >
          <div className="col-md-12">
            <p>
              {
                tabs.find((tab) => tab.infoTitle === radioInfo.title)
                  ?.infoDescription
              }
            </p>
          </div>
        </Modal>
      )}
      {tabs[activeTab]?.content && (
        <div className={`tab-content ${extraClass}`}>
          {tabs[activeTab].content}
        </div>
      )}
    </div>
  );
};

export default CustomTabsData;

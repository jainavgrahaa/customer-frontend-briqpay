import { useState, useEffect } from "react";
import TabStep2level2a from "./tabsStep2level2a";
import TabStep2level2b from "./tabsStep2level2b";
import TabStep2level2c from "./tabsStep2level2c";
import CustomTabsData from "../../CustomTabsData";
import useDeviceHelper from "@/_hooks/useDeviceHelper";
import { Button } from "@mui/material";
import TextTitle from "@/_components/atoms/TextTitle";
import { useSelector } from "react-redux";

const CreateYourDiamondDesign = () => {
  const { category_filters } = useSelector((state) => state.chooseDiamond);

  const tabStep2level2 = [
    {
      label: "Shop, Carat & price",
      content: <TabStep2level2a />,
    },
    {
      label: "Colour, clarity & cut",
      content: <TabStep2level2b />,
    },
    {
      label: "Advanced Filters",
      content: <TabStep2level2c />,
    },
  ];
  const dimondsTypeText = [
    {
      label: "Natural diamonds",
      value: "Natural diamonds",
      infoTitle: "Natural diamonds",
      infoDescription:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      label: "Lab diamonds",
      value: "Lab diamonds",
      infoTitle: "Lab diamonds",
      infoDescription:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
  ];
  const { deviceType } = useDeviceHelper();
  const [mfilter, setmfilter] = useState(false);
  return (
    <>
      <CustomTabsData
        tabs={category_filters}
        type="radio"
        extraClass="sub-tabs tab-level-1"
      />
      {deviceType !== "mobile" && (
        <CustomTabsData tabs={tabStep2level2} extraClass="sub-tabs gap-60" />
      )}
      {deviceType === "mobile" && (
        <div className={`m-filter-wrap ${mfilter ? "active" : ""}`}>
          <Button className="filter-btn" onClick={() => setmfilter(!mfilter)}>
            Filters{" "}
            {mfilter ? (
              <span class="material-icons-outlined">expand_more</span>
            ) : (
              <span class="material-icons-outlined">expand_less</span>
            )}
          </Button>
          <div className="mf-inner">
            <TextTitle variant="h5" name={"Shape"} className={"mb-1"} />
            <TabStep2level2a />
            <TabStep2level2b />
            <TabStep2level2c />
            <Button variant="outlined" className="w-100 mt-5 mb-3">
              Select Filter
            </Button>
            <Button
              variant="text"
              className="text-style-normal w-100 underlined-button"
            >
              Reset All
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateYourDiamondDesign;

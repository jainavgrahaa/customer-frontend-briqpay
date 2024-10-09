import { useSelector } from "react-redux";
import RangeSlider from "./components/RangeSlider";
import IconRadioButton from "./components/IconRadioButton";
import useDeviceHelper from "@/_hooks/useDeviceHelper";
import { useState } from "react";

const TabStep1level1b = () => {
  const { pageData } = useSelector((state) => state.chooseSettings);

  const { featureGroup, priceBuckets } = pageData || {};

  const featureMetalsData = featureGroup?.find((e) => e.slugKey === "metal-s");
  const featureShapesData = featureGroup?.find((e) => e.slugKey === "shapes");

  const settingMetalsData = featureMetalsData?.featureOptions?.map((e) => ({
    featureOptionId: e.featureOptionId,
    name: e.name,
    image: "yellow-gold.svg",
    label: e.label,
    isDefault: false,
    isActive: false,
  }));

  const settingShapesData = featureShapesData?.featureOptions?.map((e) => ({
    featureOptionId: e.featureOptionId,
    name: e.name,
    image: "round-shape.svg",
    label: e.label,
    isDefault: false,
    isActive: false,
  }));

  const overallMin = 0;
  const overallMax = 0;
  // const overallMin = Math.min(...priceBuckets?.map((item) => item.min)) || 0;
  // const overallMax = Math.max(...priceBuckets?.map((item) => item.max)) || 0;

  const handleRangeChange = (value) => {
    const [selectedMin, selectedMax] = value;

    const matchingBucket = priceBuckets.find(
      (bucket) => selectedMin >= bucket.min && selectedMax <= bucket.max
    );

    if (matchingBucket) {
      return matchingBucket.id;
    } else {
      return null;
    }
  };

  const [selected, setSelected] = useState([]);

  const { deviceType } = useDeviceHelper();
  return (
    <div className="more-filters">
      <div className="left-section">
        <IconRadioButton
          radioData={settingMetalsData}
          extraClass={"metal-filter column-3"}
          titleLabel="Metal"
          selected={selected}
          setSelected={(e) => console.log("..................", e)}
        />
        {deviceType !== "mobile" && (
          <RangeSlider
            title="Ring price"
            lowerLimit={overallMin}
            upperLimit={overallMax}
            unit={"£"}
            currentLowerLimit={overallMin}
            currentUpperLimit={overallMax}
            onChange={handleRangeChange}
          />
        )}
      </div>
      <div className="right-section">
        <IconRadioButton
          radioData={settingShapesData}
          extraClass={"shape-filter column-3"}
          titleLabel="Shape"
          selected={selected}
          setSelected={(e) => console.log("..................", e)}
        />

        {deviceType === "mobile" && (
          <RangeSlider
            title="Ring price"
            lowerLimit={1000}
            upperLimit={3500}
            unit={"£"}
            step={1}
            currentLowerLimit={1000}
            currentUpperLimit={2500}
          />
        )}
      </div>
    </div>
  );
};

export default TabStep1level1b;

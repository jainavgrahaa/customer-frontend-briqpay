import {
  settingStoneData,
  ratingSliderStep2level2aObj,
} from "@/_utils/customApiData";
import RangeSlider from "../../sliders/RangeSlider";
import TextCheckBoxButton from "../../checkbox/TextCheckBoxButton";

const TabStep2level2a = () => {
  return (
    <>
      <TextCheckBoxButton
        checkBoxData={settingStoneData}
        subtitle=""
        extraClass="full-width-checkbox"
      />
      <div className="sliders row">
        {ratingSliderStep2level2aObj.map((slideData, index) => (
          <RangeSlider
            key={index}
            title={slideData?.title}
            lowerLimit={slideData?.lowerLimit}
            upperLimit={slideData?.upperLimit}
            unit={slideData?.unit}
            currentLowerLimit={slideData?.currentLowerLimit}
            currentUpperLimit={slideData?.currentUpperLimit}
            extraClass={slideData?.extraClass}
            marks={slideData?.marks}
            infoTitle= {slideData?.infoTitle}
            infoDescription= {slideData?.infoDescription}
          />
        ))}
      </div>
    </>
  );
};

export default TabStep2level2a;

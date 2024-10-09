import { ratingSliderStep2level2bObj } from "@/_utils/customApiData";
import RangeSlider from "../../sliders/RangeSlider";

const TabStep2level2b = () => {
  return (
    <div className="sliders row">
      {ratingSliderStep2level2bObj.map((slideData, index) => (
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
          infoTitle={slideData?.infoTitle}
          infoDescription={slideData?.infoDescription}
          checBoxData={slideData?.checBoxData}
        />
      ))}
    </div>
  );
};

export default TabStep2level2b;

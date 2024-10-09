import {
  ratingSliderStep2level2cbObj,
  productCertificate,
} from "@/_utils/customApiData";
import RangeSlider from "../../sliders/RangeSlider";
import TextRadioButton from "../../radio/TextRadioButton";
import { useSelector } from "react-redux";

const TabStep2level2c = () => {
  const { advanced_filters } = useSelector((state) => state.chooseDiamond);

  return (
    <div className="sliders row">
      {advanced_filters.map((slideData, index) => (
        <RangeSlider
          key={index}
          title={slideData?.title}
          lowerLimit={slideData?.lowerLimit}
          upperLimit={slideData?.upperLimit}
          unit={slideData?.unit}
          currentLowerLimit={slideData?.currentLowerLimit}
          currentUpperLimit={slideData?.currentUpperLimit}
          marks={slideData?.marks}
          extraClass={slideData?.extraClass}
          infoTitle={slideData?.infoTitle}
          infoDescription={slideData?.infoDescription}
        />
      ))}
      <TextRadioButton
        radioData={productCertificate}
        title={"Certificate"}
        icon={true}
        extraClass="special-radio-box"
      />
    </div>
  );
};

export default TabStep2level2c;

import { DFSliderFilters } from "@/_components/staticLayout/product-listing/DF-Slider-Filters";
import { DFSliderFiltersWithApi } from "@/_components/staticLayout/product-listing/DF-Slider-FiltersWithApi";
import { getStoreType } from "@/_utils";

export const SliderFilterDFPlp = ({
    domain,
    fetures,
    deviceType
}) => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        background: "#FFFCF6",
        padding: deviceType === "mobile" ? "0px" : "0px 60px 0px 60px",
        borderTop: "1px solid ",
        borderColor: "var(--light-brown-4)",
      }}
    >
      {deviceType === "mobile" && (
        <DFSliderFilters theme={getStoreType(domain)} />
      )}
      {deviceType !== "mobile" && (
        <>
          <DFSliderFiltersWithApi featureData={fetures} />
        </>
      )}
    </div>
  );
};

// import { settingStyleData } from "@/_utils/customApiData";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import TextCheckBoxButton from "../../checkbox/TextCheckBoxButton";

const TabStep1level1a = ({ onSelect, selectedMetals }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = router;

  const [checkboxes, setCheckboxes] = useState(() => {
    return query.styles ? query.styles.split(",") : [];
  });

  const { pageData } = useSelector((state) => state.chooseSettings);
  const { featureGroup, storeId } = pageData || {};

  const featureData = featureGroup?.find((e) => e.slugKey === "design");
  const { featureOptions } = featureData || {};

  const settingStyleData = featureOptions?.map((e) => ({
    id: e.featureOptionId,
    value: e.name,
    img: e.image || "hidden_halo.svg",
    label: e.label,
  }));

  return (
    <>
      <TextCheckBoxButton
        checkBoxData={settingStyleData}
        checkboxes={selectedMetals}
        setCheckboxes={onSelect}
        subtitle=""
        extraClass="full-width-checkbox"
      />
    </>
  );
};

export default TabStep1level1a;

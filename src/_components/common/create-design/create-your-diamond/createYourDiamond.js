import { useState, useEffect } from "react";
import { wishlist } from "@/_utils/customApiData";
import CreateYourDiamondDesign from "./createYourDiamondDesign";
import CreateDesignMainTabs from "../createDesignMainTabs";
import DiamondFilters from "./DiamondFilters";
import { useSelector, useDispatch } from "react-redux";
import chooseDiamondSettings from "../../../../mocks/choose-your-diamond";
import {
  setAdvancedFilters,
  setCategoryFilters,
} from "../../../../_store/chooseDiamond.slice";
import { getSettingsDiamonds } from "@/_store/api/chooseYourDiamond";

const ChooseDiamond = () => {
  const [posts, setPosts] = useState([]);
  const { pageData } = useSelector((state) => state.chooseDiamond);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pageData) {
      const payload = {
        featureGroupId: pageData?.featureGroupMaps[0]?.featureGroupId,
        translateId: pageData?.translate?.translate_id,
        navigationHierarchyId: pageData?.id,
        storeId: pageData?.storeId,
        selectedFeatureOptionIds: [],
        collectionIds: [],
        pageSize: 10,
        pageIndex: 0,
      };

      setPosts(wishlist);
      dispatch(setAdvancedFilters(chooseDiamondSettings));
      dispatch(setCategoryFilters(chooseDiamondSettings));
      dispatch(getSettingsDiamonds(payload));
    }
  }, [pageData]);

  return (
    <>
      <div className={`tab-content main-tabs`}>
        <CreateDesignMainTabs />
        <CreateYourDiamondDesign />
        <DiamondFilters />
      </div>
    </>
  );
};

export default ChooseDiamond;

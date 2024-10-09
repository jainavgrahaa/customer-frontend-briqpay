/* eslint-disable @next/next/no-css-tags */
import { useEffect, useState } from "react";
import Head from "next/head";
import CreateYourSetting from "@/_components/common/create-design/create-your-setting/createYourSetting";
import BreadCrumbs from "@/_components/common/breadcrumbs";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChooseSettingsPageData,
  fetchChooseYourSettingData,
} from "@/_store/chooseSettings.slice";

export default function CreateYourSettingComponent({ ...props }) {
  const dispatch = useDispatch();
  const { pageData, status, error, chooseYourSettingStatus } = useSelector(
    (state) => state.chooseSettings
  );
  const { storeId } = props || {};

  useEffect(() => {
    if (status === "idle") {
      dispatch(
        fetchChooseSettingsPageData({
          storeId,
          slug: "choose-your-style",
          pageSize: 12,
        })
      );
    }
  }, [status, dispatch, storeId]);

  useEffect(() => {
    if (
      status === "succeeded" &&
      chooseYourSettingStatus === "idle" &&
      pageData.featureGroupMaps[0]?.featureGroupId
    ) {
      dispatch(
        fetchChooseYourSettingData({
          featureGroupId: pageData.featureGroupMaps[0]?.featureGroupId,
          translateId: pageData?.translate?.translate_id,
          navigationHierarchyId: pageData?.id,
          storeId: pageData?.storeId,
          code: "ER0000001",
          selectedFeatureOptionIds: [
            "0c6f3f16-0416-40e0-a984-a27c2624dfa8",
            "83d07b62-9ad2-416f-a956-392f4f4adf51",
            "b2f6b2f5-6e4c-47d2-8ef7-8927dcb1b5ce",
            "724b3e2d-4c97-4dd4-a6c2-1161a05ca6f3",
          ],
          pageSize: 12,
          pageIndex: 0,
        })
      );
    }
  }, [status, chooseYourSettingStatus, pageData, dispatch, storeId]);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/assets/css/create-design.css" />
      </Head>
      <BreadCrumbs
        currentPage={
          <FormattedMessage id="createYourSettings.chooseYourSetting" />
        }
      />
      <CreateYourSetting />
    </>
  );
}

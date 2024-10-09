/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { updateQuickDelivery } from "@/_store/pdp.slice";
import {
  extractStoneProperties,
  formatColumns,
  formattedRows,
} from "../tables/tableHelper";

export default function CustomTabs({
  handleChangeTabs,
  tabData,
  collectionId,
}) {
  const dispatch = useDispatch();
  const [value, setValue] = useState("1");

  const { userDetails } = useSelector((state) => state.auth);

  const { translate, navigationhierarchyid } = useSelector(
    (state) => state.appconfig
  );
  const { quickDelivery } = useSelector((state) => state.pdp);
  const { columns, page } = quickDelivery || {};
  const { getDeliveryData } = useAuthHelper();
  const rowsPerPage = 5;

  const fetchQuickDelivery = async () => {
    try {
      dispatch(updateQuickDelivery({ loader: true }));
      const res = await getDeliveryData(
        userDetails?.storeId,
        collectionId,
        translate?.translate_id,
        navigationhierarchyid,
        page,
        rowsPerPage
      );

      dispatch(
        updateQuickDelivery({ columns: formatColumns(res?.features || []) })
      );

      const rows = res?.data?.map((ele) => ({
        ...extractStoneProperties(ele?.productData?.[0]),
        ...formattedRows(ele?.selectedFeatures),
        price: ele?.subtotalPrice || "NA",
        id: ele?.id,
      }));

      dispatch(updateQuickDelivery({ deliveryData: rows || [] }));
      dispatch(
        updateQuickDelivery({ totalRecords: res?.totalRecordCount || 0 })
      );
    } catch (error) {
    } finally {
      dispatch(updateQuickDelivery({ loader: false }));
    }
  };

  useEffect(() => {
    if (userDetails?.storeId) {
      fetchQuickDelivery();
    }
  }, [page, userDetails?.storeId]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    handleChangeTabs(newValue);
  };

  return (
    <>
      {columns.length > 0 ? (
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon position tabs example"
          className="tabs-wrapper"
        >
          <Tab
            icon={<img src="/assets/icons/raw-svgs/essential-icon.svg" />}
            iconPosition="start"
            label="Customise"
            value="1"
          />
          <Tab
            icon={<img src="/assets/icons/raw-svgs/transport-icon.svg" />}
            iconPosition="start"
            label="Quick delivery"
            value="2"
          />
        </Tabs>
      ) : null}
    </>
  );
}

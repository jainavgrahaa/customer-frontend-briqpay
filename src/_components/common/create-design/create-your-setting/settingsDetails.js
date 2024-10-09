/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useCallback, useEffect, useState } from "react";

import OurPromise from "@/_components/common/OurPromise";
import {
  productAccordionData,
  productBannerSlider,
  productSecureData,
  ShippingInformationData,
} from "@/_utils/customApiData";
import { useRouter } from "next/router";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CustomAccordion from "@/_components/common/CustomAccordion";
import CustomIconButton from "@/_components/common/CustomIconButton";
import Link from "next/link";
import AddToBagCard from "@/_components/common/cards/AddToBagCard";
import CustomTabs from "@/_components/common/CustomTabs";
import { TabContext, TabPanel } from "@mui/lab";
import CustomTable from "@/_components/tables";
import ShippingInfo from "@/_components/common/ShippingInfo";
import CustomProductFilter from "../../menuTypes/customProductFilter";
import {
  getApiUrl,
  getStoreID,
  sortedSequence,
  storeTypes,
  useBreadCrumbs,
} from "@/_utils";
import ABTextRadioButton from "@/_components/common/radio/AB-TextRadiobutton";
import IconRadioButton from "@/_components/common/radio/IconRadioButton";
import BandWidth from "@/_components/common/radio/BandWidth";
import RadioButton from "@/_components/common/radio/RadioButton";
import BreadCrumbsDynamic from "@/_components/common/breadcrumbs/dynamic";
import apiService from "@/_utils/apiService";
import { useSelector, useDispatch } from "react-redux";
import { cartDetails, showHeaderCartModal } from "@/_store/cart.slice";
import useAuthHelper from "@/_hooks/useAuthHelper";
import Loader from "@/_components/common/loader";
import { FormattedMessage } from "react-intl";
import PaymentDetails from "@/_components/common/PaymentDetails";
import ChooseSpecificDiamond from "@/_components/common/ChooseSpecificDiamond/ChooseSpecificDiamond";
import { ORDER_ID } from "@/_utils/userToken";
import { getCookie } from "cookies-next";
import CustomSlider from "../../sliders/CustomSlider";

const SettingsDetails = ({
  pdpPlpdata,
  breadcrumbData,
  pdpPayloadData,
  domain,
  deviceTypeServer,
  currency,
  translateId,
  storeId,
  navigationHierarchyId,
}) => {
  const router = useRouter();
  const { selectedSettingDetail, settingDetailData } = useSelector(
    (state) => state.chooseSettings
  );
  const existingOrderId = router.query.hasOwnProperty("orderId")
    ? router.query.orderId
    : getCookie(ORDER_ID);
  const featureData =
    pdpPlpdata?.features?.filter((ft) => ft.isOptional === false) ?? [];
  const optionalFeatureData =
    pdpPlpdata?.features?.filter((ft) => ft.isOptional === true) ?? [];
  const selectedItemsInitialData = [
    ...featureData,
    ...optionalFeatureData,
  ]?.reduce((accumulator, data) => {
    const defaultValue =
      data?.featureOptions?.find(
        (feature) => feature?.isDefault && feature?.featureOptionId
      )?.featureOptionId || "";

    return {
      ...accumulator,
      [data?.name]: defaultValue,
    };
  }, {});

  const [productType, setProductType] = useState("1");
  const [imageId, setImageId] = useState();
  const [selected, setSelected] = useState(selectedItemsInitialData);
  const [loader, setLoader] = useState(false);
  const [variantData, setVariantData] = useState(null);
  const [showOptionalFeature, setShowOptionalFeature] = useState(false);
  const breadCrumbArray = useBreadCrumbs(breadcrumbData);
  const [addToBagLoader, setAddToBagLoader] = useState(false);
  const dispatch = useDispatch();
  const { getCartData } = useAuthHelper();
  const [showStickySummary, setShowStickySummary] = useState(false);
  const [selecetedItemData, setSelectedItemData] = useState(null);
  const [rowData, setRowData] = useState(null);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [isOpenSpecificDiamond, setisOpenSpecificDiamond] = useState(false);
  useEffect(() => {
    const fetchStoreId = async () => {
      const domain = localStorage?.getItem("domain");
      const { v12AuthenticationKey } = await getStoreID(domain);
      setShowPaymentDetails(Boolean(v12AuthenticationKey));
    };

    fetchStoreId();
  }, []);

  const handleButtonClick = () => {
    setShowPaymentDetails(!showPaymentDetails);
  };

  const handleScroll = useCallback(() => {
    if (window.pageYOffset > 1300) {
      setShowStickySummary(true);
    } else {
      setShowStickySummary(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddVariant = async () => {
    setLoader(true);
    const selecetedItems = Object.values(selected || [])?.filter(
      (val) => !!val
    );

    const addToBagData = {
      ...pdpPayloadData,
      storeId,
      selectedFeatureOptionIds: selecetedItems,
    };
    const apiUrl = getApiUrl(`/collection-details`);

    try {
      const pdpData = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: addToBagData ? JSON.stringify(addToBagData) : "",
      });

      setVariantData({});
      const variantData = await pdpData.json();
      setSelectedItemData({ priceData: variantData?.priceMap });
      const data = {
        items: {
          group: {
            collections: [
              {
                isSample: false,
                collectionId: variantData?.collectionDetails?.id,
                variants: [variantData?.defaultVariant?.id],
                productUrl: router?.asPath?.split("?")?.[0],
              },
            ],
          },
        },
      };

      if (existingOrderId) {
        data.orderId = existingOrderId;
      }

      setVariantData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    handleAddVariant();
  }, [selected]);

  // needed to featureOptions css
  const extraClass = {
    ringsize: "shape-filter-box",
    shape: "shape-filter-box",
    cutGrade: "special-radio-box",
    certificate: "special-radio-box",
    polish: "special-radio-box",
    symmetry: "special-radio-box",
    fluo: "special-radio-box",
  };

  const renderField = (data) => {
    const featureOptionsArray = sortedSequence(data?.featureOptions);
    const hasImageAndLabel = (array) => {
      return array?.some((item) => item.image !== null);
    };
    switch (data?.featureDisplayType?.trim().toLowerCase()) {
      case "list":
        return (
          <ABTextRadioButton
            radioData={featureOptionsArray}
            title={data?.name}
            icon={true}
            extraClass={
              data?.name === "Shape" ? "shape-filter-box" : "special-radio-box"
            }
            setSelected={setSelected}
            selected={selected}
            titleLabel={data?.label || data?.name}
          />
        );
      case "radio_without_label":
        return (
          <IconRadioButton
            radioData={featureOptionsArray}
            title={data?.name}
            setSelected={setSelected}
            selected={selected}
            subTitle={data?.label || data?.name}
            extraClass={extraClass[data?.name.toLowerCase()] || ""}
            titleLabel={data?.label || data?.name}
          />
        );
      case "radio_with_label":
        return (
          <BandWidth
            radioData={featureOptionsArray}
            title={data?.name}
            setSelected={setSelected}
            selected={selected}
            extraClass={extraClass[data?.name.toLowerCase()]}
            titleLabel={data?.label || data?.name}
          />
        );
      case "dropdown":
        return (
          <CustomProductFilter
            customData={data?.featureOptions}
            title={data?.name}
            setSelected={setSelected}
            selected={selected}
            icon={true}
            extraClass="shape-filter-box"
            titleLabel={data?.label || data?.name}
          />
        );
      case "radio":
        return (
          <div className="round-diamond-sec">
            <RadioButton
              radioData={featureOptionsArray}
              title={data?.name}
              setSelected={setSelected}
              selected={selected}
              extraClass={extraClass[data?.name.toLowerCase()]}
              titleLabel={data?.label || data?.name}
            />
          </div>
        );
      default:
        return (
          <div className="round-diamond-sec">
            <RadioButton
              radioData={featureOptionsArray}
              title={data?.name}
              setSelected={setSelected}
              selected={selected}
              extraClass={extraClass[data?.name.toLowerCase()]}
              titleLabel={data?.label || data?.name}
            />
          </div>
        );
    }
  };

  return (
    <>
      <div className="product-wrapper">
        {loader && <Loader storeTypes={storeTypes} domain={domain} />}
        <section>
          <div className="container">
            <BreadCrumbsDynamic currentPage={breadCrumbArray} />
            <div className="row row-lg">
              <div className="col-lg-7">
                <CustomSlider
                  setImageId={setImageId}
                  extraClass="theme-01"
                  images={productBannerSlider}
                />
              </div>
              <div className="col-lg-5">
                <div className="heading">
                  <Typography variant="h1">
                    {selectedSettingDetail?.name ?? ""}
                  </Typography>
                  <CustomIconButton />
                </div>
                <Typography variant="body1">
                  <FormattedMessage id="product.settings" />
                </Typography>
                <Link href="#" className="read-more-link">
                  <FormattedMessage id="product.readMore" />
                </Link>
                <TabContext value={productType}>
                  <div className="round-diamond-sec mt-5">
                    <Box className="appointment-btn two-btns-full-width">
                      <Button
                        variant="outlined"
                        href="#book-appointment"
                        className={`me-1 ${deviceTypeServer !== "mobile" ? "w-50" : ""
                          }`}
                      >
                        {" "}
                        <FormattedMessage id="common.bookApp" />
                      </Button>
                      <Button
                        variant="contained"
                        className={`mb-0 ms-1 ${deviceTypeServer !== "mobile" ? "w-50" : ""
                          }`}
                        onClick={() => router.push('/choose-your-diamands')}
                      >
                        Choose this setting
                      </Button>
                    </Box>
                    <Box>
                      <Typography variant="paragraph" fontWeight="bold">
                        Setting information
                      </Typography>
                      <Box
                        flex
                        flexDirection={"column"}
                        gap={4}
                        className="mt-3"
                      >
                        {settingDetailData?.variantOptionDetails?.[0]?.componentproperty?.map(
                          (item, index) => (
                            <Box key={index}>
                              {item?.property}:{" "}
                              <strong>{item?.value || item?.number}</strong>
                            </Box>
                          )
                        )}
                      </Box>
                      <Box
                        flex
                        flexDirection={"column"}
                        gap={4}
                        className="mt-3"
                      >
                        <Typography variant="paragraph" fontWeight="bold">
                          Side Stones
                        </Typography>
                        {settingDetailData?.variantOptionDetails?.[0]?.stoneproperty?.map(
                          (item, index) => (
                            <Box key={index}>
                              {item?.property}:{" "}
                              <strong>{item?.value || item?.number}</strong>
                            </Box>
                          )
                        )}
                      </Box>
                    </Box>
                    {+productType === 1 &&
                      selecetedItemData?.priceData?.price && (
                        <>
                          <div
                            className="discount-message"
                            onClick={handleButtonClick}
                          >
                            <div className="offer">
                              <img src="/assets/images/product-offer.png" />
                              <span>
                                <FormattedMessage id="product.finance" />{" "}
                                {currency}
                                19.47/
                                <FormattedMessage id="product.month" />
                              </span>
                            </div>
                            <span className="material-icons-outlined icons-small">
                              keyboard_arrow_right
                            </span>
                          </div>
                          {showPaymentDetails && (
                            <PaymentDetails
                              orderSummary={{
                                Total: selecetedItemData?.priceData?.price,
                              }}
                              storeId={storeId}
                              currency={currency}
                            />
                          )}
                        </>
                      )}
                    {+productType === 2 && rowData?.sellingprice ? (
                      <>
                        <div
                          className="discount-message"
                          onClick={handleButtonClick}
                        >
                          <div className="offer">
                            <img src="/assets/images/product-offer.png" />
                            <span>
                              <FormattedMessage id="product.finance" />{" "}
                              {currency}
                              19.47/
                              <FormattedMessage id="product.month" />
                            </span>
                          </div>
                          <span className="material-icons-outlined icons-small">
                            keyboard_arrow_right
                          </span>
                        </div>
                        {showPaymentDetails && (
                          <PaymentDetails
                            orderSummary={{
                              Total: rowData?.sellingprice,
                            }}
                            storeId={storeId}
                            currency={currency}
                          />
                        )}
                      </>
                    ) : null}
                    <ShippingInfo
                      variant="product"
                      extraClass="theme-02"
                      shippingData={ShippingInformationData}
                    />
                    {/* <InfoCard /> */}
                    {/* <RangeSlider /> */}
                  </div>
                </TabContext>
                <Box className="row choose-section">
                  {productSecureData.map(({ id, image, title, content }) => {
                    return (
                      <Box className="col-md-12" key={id}>
                        <OurPromise
                          id={id}
                          image={image}
                          title={title}
                          content={content}
                          parentBoxClass="feature-box"
                        />
                      </Box>
                    );
                  })}
                </Box>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SettingsDetails;

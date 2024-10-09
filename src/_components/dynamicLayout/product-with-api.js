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
import SliderSectionCustomArrow from "@/_components/common/sliders/SliderSectionCustomArrow";
import CardWithLabel from "@/_components/common/cards/CardWithLabel";
import CustomAccordion from "@/_components/common/CustomAccordion";
import CustomIconButton from "@/_components/common/CustomIconButton";
import Link from "next/link";
import AddToBagCard from "@/_components/common/cards/AddToBagCard";
import CustomTabs from "@/_components/common/CustomTabs";
import { TabContext, TabPanel } from "@mui/lab";
import CustomTable from "@/_components/tables";
import ShippingInfo from "@/_components/common/ShippingInfo";
import CustomProductFilter from "../common/menuTypes/customProductFilter";
import CustomSlider from "../common/sliders/CustomSlider";
import {
  getApiUrl,
  getStoreID,
  sortedSequence,
  storeTypes,
  useBreadCrumbs,
} from "@/_utils";
import ABTextRadioButton from "../common/radio/AB-TextRadiobutton";
import IconRadioButton from "../common/radio/IconRadioButton";
import BandWidth from "../common/radio/BandWidth";
import RadioButton from "../common/radio/RadioButton";
import BreadCrumbsDynamic from "@/_components/common/breadcrumbs/dynamic";
import apiService from "@/_utils/apiService";
import { useDispatch, useSelector } from "react-redux";
import { cartDetails, showHeaderCartModal } from "@/_store/cart.slice";
import useAuthHelper from "@/_hooks/useAuthHelper";
import Loader from "../common/loader";
import { FormattedMessage } from "react-intl";
import PaymentDetails from "../common/PaymentDetails";
import TrustPilotBox from "../trustPilotBox";
import environment from "@/_utils/environment";
import ChooseSpecificDiamond from "@/_components/common/ChooseSpecificDiamond/ChooseSpecificDiamond";
import { ORDER_ID } from "@/_utils/userToken";
import { getCookie } from "cookies-next";
import { updatePdpMeta } from "@/_store/appconfig.slice";
import { extraClass } from "./constants";

const ProductWithApi = ({
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
  const existingOrderId = router.query.hasOwnProperty("orderId")
    ? router.query.orderId
    : getCookie(ORDER_ID);
  const featureData = pdpPlpdata?.features?.filter(
    (ft) => ft.isOptional === false
  );
  const optionalFeatureData = pdpPlpdata?.features?.filter(
    (ft) => ft.isOptional === true
  );
  const selectedItemsInitialData = [
    ...featureData,
    ...optionalFeatureData,
  ]?.reduce((accumulator, data) => {
    const defaultValue =
      data?.featureOptions?.find((feature) =>
        pdpPlpdata?.defaultFeatureOptions?.includes(feature?.featureOptionId)
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
  const { deliveryMessage } = useSelector((state) => state.appconfig);

  useEffect(() => {
    setSelectedItemData({ priceData: pdpPlpdata?.priceMap });
  }, [pdpPlpdata]);

  const selectedItemsValues = [...featureData, ...optionalFeatureData]?.reduce(
    (accumulator, data) => {
      const defaultKey =
        data?.featureOptions?.find((feature) =>
          pdpPlpdata?.defaultFeatureOptions?.includes(feature?.featureOptionId)
        )?.featureOptionType || "";
      const defaultValue =
        data?.featureOptions?.find((feature) =>
          pdpPlpdata?.defaultFeatureOptions?.includes(feature?.featureOptionId)
        )?.featureName || "";

      return {
        ...accumulator,
        [defaultKey]: defaultValue,
      };
    },
    {}
  );

  useEffect(() => {
    dispatch(updatePdpMeta(selectedItemsValues));
  }, []);

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
      if (variantData?.priceMap) {
        setSelectedItemData({ priceData: variantData?.priceMap });
      }
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

  const handleChangeTabs = (val) => {
    setProductType(val);
  };

  const handleOnAddToBag = async () => {
    setAddToBagLoader(true);
    const orderLineItemId = router.query?.orderLineItemId;
    const orderId = existingOrderId ?? "";
    const apiUrl = router.query.hasOwnProperty("orderLineItemId")
      ? getApiUrl(`/order/item/update/${orderLineItemId}`)
      : getApiUrl(`/order/item/add`);
    try {
      const dataApi = await apiService().post(apiUrl, variantData);
      if (dataApi) {
        const cartData = await getCartData(translateId, orderId);
        if (cartData) {
          dispatch(showHeaderCartModal(true));
          dispatch(cartDetails(cartData));
        }
      }
      // const variantDatas = await dataApi.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      setAddToBagLoader(false);
    } finally {
      setAddToBagLoader(false);
    }
  };

  const handleOnAddToBagQuickDelivery = async (id) => {
    setAddToBagLoader(true);
    const apiUrl = getApiUrl(`/order/item/add`);
    try {
      const dataApi = await apiService().post(apiUrl, {
        items: {
          group: {
            collections: [
              {
                stockTagId: id || row.id,
              },
            ],
          },
        },
      });
      if (dataApi) {
        const cartData = await getCartData(translateId);
        if (cartData) {
          dispatch(showHeaderCartModal(true));
          dispatch(cartDetails(cartData));
        }
      }
      // const variantDatas = await dataApi.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      setAddToBagLoader(false);
    } finally {
      setAddToBagLoader(false);
    }
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
            defaultFeatureOptions={pdpPlpdata?.defaultFeatureOptions}
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
            defaultFeatureOptions={pdpPlpdata?.defaultFeatureOptions}
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
            defaultFeatureOptions={pdpPlpdata?.defaultFeatureOptions}
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
            defaultFeatureOptions={pdpPlpdata?.defaultFeatureOptions}
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
          <div className="round-diamond-sec val-2">
            <RadioButton
              radioData={featureOptionsArray}
              defaultFeatureOptions={pdpPlpdata?.defaultFeatureOptions}
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
          <div className="round-diamond-sec val">
            <RadioButton
              radioData={featureOptionsArray}
              defaultFeatureOptions={pdpPlpdata?.defaultFeatureOptions}
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
      <div style={{ position: "absolute", left: "0", width: "100%" }}>
        {deviceTypeServer !== "mobile" && showStickySummary && (
          <div className="sticky-order-summary pdp-stick-wrap">
            <div className="sticky-order-left-column">
              <p className="round-diamond-text">
                <FormattedMessage id="product.diamondEaring" />
              </p>
              <p className="price-diamond-text">
                {selecetedItemData?.priceData?.discountPrice &&
                  `${currency}
               ${selecetedItemData?.priceData?.discountPrice}`}
                <span className="main-price-tag">
                  {currency}
                  {selecetedItemData?.priceData?.price}
                </span>
              </p>
            </div>
            <div
              style={{ display: "flex", gap: "16px" }}
              className="sticky-order-right-column"
            >
              <div className="sticky-appointment-block">
                <Button
                  variant="outlined"
                  className="checkout-btn standard-btn mt-0 mb-0 w-100"
                  size="small"
                  href="#select-appointment"
                >
                  <FormattedMessage id="common.bookApp" />
                </Button>
                <div className="discount-text-message">
                  <div className="discount-rating text-center">
                    <TrustPilotBox
                      businessUnitId={
                        environment.trustpilot.inlineReview.businessUnitId
                      }
                      templateId={
                        environment.trustpilot.inlineReview.templateId
                      }
                      height="20px"
                    />
                  </div>
                </div>
              </div>
              <div className="sticky-addbag-block">
                <Button
                  variant="outlined"
                  sx={{
                    mt: 3,
                    mb: 2,
                    width: "100%",
                    "&.Mui-disabled": {
                      color: "white",
                      opacity: !selecetedItemData?.priceData?.price ? 0.6 : 1,
                      pointerEvents: !selecetedItemData?.priceData?.price
                        ? "none"
                        : "initial",
                    },
                  }}
                  className="checkout-btn dark-blue-btn"
                  size="small"
                  onClick={handleOnAddToBag}
                  disabled={!selecetedItemData?.priceData?.price}
                >
                  {addToBagLoader ? (
                    <FormattedMessage id="product.loading" />
                  ) : (
                    <FormattedMessage id="product.addToBag" />
                  )}
                </Button>
                <div className="discount-message">
                  <div className="discount-rating text-center">
                    <img src="/assets/images/product-offer.png" alt=" " />
                    <span className="rating-text">
                      <FormattedMessage id="product.finance" /> {currency}19.47/
                      <FormattedMessage id="product.month" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {deviceTypeServer === "mobile" && showStickySummary && (
          <div className="sticky-order-summary-mob">
            <div className="order-total-mob">
              <p>
                <FormattedMessage id="product.total" />
              </p>
              <p>
                {selecetedItemData?.priceData?.discountPrice && (
                  <span>
                    {currency}
                    {selecetedItemData?.priceData?.discountPrice}
                  </span>
                )}
                {selecetedItemData?.priceData?.price && (
                  <span>
                    {currency}
                    {selecetedItemData?.priceData?.price}
                  </span>
                )}
              </p>
            </div>
            <div>
              <Button
                variant="outlined"
                sx={{ width: "100%" }}
                className="checkout-btn dark-blue-btn"
                size="large"
                onClick={handleOnAddToBag}
              >
                {addToBagLoader ? (
                  <FormattedMessage id="product.loading" />
                ) : (
                  <FormattedMessage id="product.addToBag" />
                )}
              </Button>
              <div className="discount-message">
                <div className="offer">
                  <TrustPilotBox
                    businessUnitId={
                      environment.trustpilot.inlineReview.businessUnitId
                    }
                    templateId={environment.trustpilot.inlineReview.templateId}
                    height="20px"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="product-wrapper">
        <section>
          <div className="container">
            <BreadCrumbsDynamic currentPage={breadCrumbArray} />
            <div className="row row-lg">
              <div className="col-lg-7">
                {/* <ThreeSixtyImageView
                images={imgList}
              /> */}
                {deviceTypeServer === "desktop" ? (
                  <>
                    {/* <CardWithLabel
                      id={imageId}
                      cardImage={"product-ring.png"}
                    /> */}
                    <CustomSlider
                      setImageId={setImageId}
                      extraClass="theme-01"
                      images={[]}
                    />
                  </>
                ) : (
                  <>
                    <SliderSectionCustomArrow
                      images={[]}
                      extraClass="theme-01"
                      handSliderRequired={true}
                      ImageTurnableRequired={true}
                      type="type2"
                      breakpoints={{
                        640: { slidesPerView: 2, spaceBetween: 6 },
                        768: { slidesPerView: 2, spaceBetween: 20 },
                        1024: { slidesPerView: 4, spaceBetween: 20 },
                      }}
                      slideView={2}
                      details
                    />{" "}
                  </>
                )}
                <CustomAccordion accordionData={productAccordionData} />
              </div>
              <div className="col-lg-5">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <Typography variant="h4" className="mb-0">
                    {pdpPlpdata?.collectionDetails?.name ?? ""}
                  </Typography>
                  <CustomIconButton />
                </div>
                <Typography variant="body1">
                  <FormattedMessage id="product.settings" />
                </Typography>
                <Link href="#" className="read-more-link">
                  <FormattedMessage id="product.readMore" />
                </Link>
                {deliveryMessage ? (
                  <p
                    className="mt-3 mb-2 p-3 text-center"
                    style={{ backgroundColor: "#F0F6FD" }}
                  >
                    {deliveryMessage}
                  </p>
                ) : null}
                <TabContext value={productType}>
                  <CustomTabs
                    handleChangeTabs={handleChangeTabs}
                    collectionId={
                      variantData?.items?.group?.collections?.[0]
                        ?.collectionId || pdpPlpdata?.collectionDetails?.id
                    }
                  />
                  <div className="round-diamond-sec">
                    <TabPanel value="1" sx={{ padding: "0" }}>
                      {(showOptionalFeature
                        ? [...featureData, ...optionalFeatureData]
                        : featureData
                      )?.map((data, index) => {
                        return (
                          <Fragment key={index}>{renderField(data)}</Fragment>
                        );
                      })}
                      <div className="d-flex justify-space-between mt-4 mb-4">
                        {optionalFeatureData.length > 0 && (
                          <Button
                            variant="text"
                            className="text-style-normal"
                            onClick={() =>
                              setShowOptionalFeature(!showOptionalFeature)
                            }
                          >
                            {!showOptionalFeature && (
                              <span className="underline">
                                + <FormattedMessage id="pdp.moreOptions" />
                              </span>
                            )}
                            {showOptionalFeature && (
                              <span className="underline">
                                <FormattedMessage id="pdp.lessOptions" />
                              </span>
                            )}
                          </Button>
                        )}
                        <Button
                          variant="text"
                          className="text-style-normal"
                          onClick={() =>
                            setisOpenSpecificDiamond(!isOpenSpecificDiamond)
                          }
                        >
                          <span className="underline">
                            <img
                              src="/assets/icons/raw-svgs/black-diamond.svg"
                              className="mr-5"
                            />{" "}
                            {isOpenSpecificDiamond
                              ? "Back to simple view"
                              : "Choose a specific diamond"}
                          </span>
                        </Button>
                      </div>
                      {isOpenSpecificDiamond && (
                        <ChooseSpecificDiamond
                          storeId={storeId}
                          variantOptionId={
                            variantData?.items?.group?.collections?.[0]
                              ?.variants?.[0]
                          }
                          translateId={translateId}
                        />
                      )}
                      <AddToBagCard
                        handleOnAddToBag={handleOnAddToBag}
                        loader={addToBagLoader}
                        priceData={selecetedItemData?.priceData}
                        currency={currency}
                      />
                    </TabPanel>
                    <TabPanel value="2">
                      <Box className="table-container">
                        <CustomTable
                          setSelectedItemData={setRowData}
                          translateId={translateId}
                          storeId={storeId}
                          handleOnAddToBagQuickDelivery={
                            handleOnAddToBagQuickDelivery
                          }
                          loader={addToBagLoader}
                          collectionId={
                            variantData?.items?.group?.collections?.[0]
                              ?.collectionId ||
                            pdpPlpdata?.collectionDetails?.id
                          }
                          currency={currency}
                          navigationHierarchyId={navigationHierarchyId}
                        />
                      </Box>
                      {rowData && (
                        <AddToBagCard
                          handleOnAddToBag={handleOnAddToBag}
                          loader={addToBagLoader}
                          rowData={rowData}
                          currency={currency}
                          hideBtn
                        />
                      )}
                    </TabPanel>
                    <Box className="appointment-btn two-btns-full-width">
                      <Button
                        variant="outlined"
                        href="#book-appointment"
                        className={`${
                          deviceTypeServer !== "mobile" ? "w-50" : ""
                        }`}
                      >
                        {" "}
                        <FormattedMessage id="common.bookApp" />
                      </Button>
                      <Button
                        href="#virtual-appointment"
                        variant="text"
                        className={`${
                          deviceTypeServer !== "mobile" ? "w-50" : ""
                        }`}
                        startIcon={
                          <span className="material-icons-outlined">
                            videocam
                          </span>
                        }
                      >
                        <FormattedMessage id="common.virtualAppointment" />
                      </Button>
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
                              {showPaymentDetails
                                ? "keyboard_arrow_down"
                                : "keyboard_arrow_right"}
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
                            {showPaymentDetails
                              ? "keyboard_arrow_down"
                              : "keyboard_arrow_right"}
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

export default ProductWithApi;

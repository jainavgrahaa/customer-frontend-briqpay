import React, { Fragment, useCallback, useEffect, useState } from "react";

import OurPromise from "@/_components/common/OurPromise";
// import AppointmentBlock from "@/_components/common/AppointmentBlock";
import { productSecureData, DfCutGrade } from "@/_utils/customApiData";
import { Backdrop, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { TabContext, TabPanel } from "@mui/lab";
import CustomTable from "@/_components/tables";
import VerticalSlider from "../common/sliders/VerticalSlider";
import DfCustomIconButton from "../common/DF-CustomIcons";
import DFAddToBagCard from "../common/cards/DF-AddToBagCard";
import DFTextRadioButton from "../common/radio/DF-TextRadioButton";
import RangeSlider from "../common/sliders/RangeSlider";
import Chip from "@mui/material/Chip";
import {
  getApiUrl,
  getStoreID,
  sortedSequence,
  storeTypes,
  useBreadCrumbs,
} from "@/_utils";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import BreadCrumbsDynamic from "../common/breadcrumbs/dynamic";
import apiService from "@/_utils/apiService";
import DFIconRadioButton from "../common/radio/Df-IconRadioButtonApi";
import DFTextRadioButtonApi from "../common/radio/DF-TextRadioButtonApi";
import { useDispatch, useSelector } from "react-redux";
import { cartDetails, showHeaderCartModal } from "@/_store/cart.slice";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { FormattedMessage } from "react-intl";
import Link from "next/link";
import TextTitle from "../atoms/TextTitle";
import useDeviceHelper from "@/_hooks/useDeviceHelper";
import CustomTabs from "../common/CustomTabs";
import DfPdpSearchDiamond from "@/_components/common/DfPdpSearchDiamond";
import DfFinance from "@/_components/common/DF-Finance";
const DfProductDetail = ({
  pdpPlpdata,
  breadcrumbData,
  pdpPayloadData,
  domain,
  currency,
  translateId,
  storeId,
}) => {
  const selectedItemsInitialData = pdpPlpdata?.features?.reduce(
    (accumulator, data) => {
      const defaultValue =
        data?.featureOptions?.find(
          (feature) => feature?.isDefault && feature?.featureOptionId
        )?.featureOptionId || "";

      return {
        ...accumulator,
        [data?.name]: defaultValue,
      };
    },
    {}
  );
  const { getCartData } = useAuthHelper();
  const [selected, setSelected] = useState(selectedItemsInitialData);
  const [productType, setProductType] = useState("1");
  const [moreoptions, setmoreoptions] = useState(false);
  const filtersLength = pdpPlpdata?.features || [];
  const displayedFilterLength = moreoptions
    ? filtersLength
    : filtersLength.slice(0, 6);
  const [loader, setLoader] = useState(false);
  const [addToBagLoader, setAddToBagLoader] = useState(false);
  const [variantData, setVariantData] = useState({});
  const [ringsizOptions, setringsizOptions] = useState(false);
  const [ringSizeValue, setRingSizeValue] = useState("");
  const [diamondRing, setdiamondRing] = useState(true);
  const [pendants, setpendants] = useState(false);
  const [weddingRing, setweddingRing] = useState(false);
  const [earrings, setearrings] = useState(false);
  const [bracelets, setbracelets] = useState(false);
  const [stoneToggle, setstoneToggle] = useState(false);
  const [diamondList, setDiamondList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ratingValue, setratingValue] = useState(5);
  const [selecetedItemData, setSelectedItemData] = useState({
    priceData: 0,
  });
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const breadCrumbArray = useBreadCrumbs(breadcrumbData);
  const dispatch = useDispatch();
  const { cartDetails: cartDetail } = useSelector((state) => state.cart);
  const { deliveryMessage } = useSelector((state) => state.appconfig);
  const { deviceType } = useDeviceHelper();
  const RingDiamondDetails = [
    { label: "Product Code", value: "CLRN349_01" },
    { label: "Design Number", value: "RN0033666" },
    { label: "Certificate", value: "DF" },
    { label: "Metal", value: "18K White Gold" },
    { label: "Setting Height", value: "5.2mm" },
    { label: "Setting Width", value: "1.5mm" },
    { label: "Shank Width", value: "1.5mm" },
    { label: "Band Thickness", value: "1.5mm" },
    { label: "Stone Type", value: "Lab-Created Diamond" },
    { label: "Shape", value: "Round" },
    { label: "Colour", value: "G" },
    { label: "Clarity", value: "SI1" },
    { label: "Setting", value: "4 Prong" },
    { label: "Total Weight", value: "Approx. 0.3000 ct. wt. (0.300ct. x 1)" },
  ];
  const rederFieldCss = {
    metal: "band_width",
    bandWidth: "band-width-box three-box-layout",
    total: "stonme-type-box",
    colour: "",
    shape: "shape-filter-box",
    clarity: "",
    cutGrade: "df-Clarity-box four-box-layout",
    certificate: "df-Certificate-box three-box-layout",
    polish: "df-Clarity-box four-box-layout",
  };

  const renderField = (data) => {
    const featureOptionsArray = sortedSequence(data?.featureOptions);
    switch (data?.featureDisplayType.trim().toLowerCase()) {
      case "list":
        return (
          <>
            {data?.name === "Ring Size" ? (
              <div className="ring-size-block-div">
                <div className="ring-size-block">
                  <label>{data?.label || data?.name}</label>
                  <div className="ring-size-custom-derop-down">
                    <span className="form-sublable">
                      {ringSizeValue || "Choose Ring"}
                    </span>
                    <Button
                      sx={{ mt: 3, mb: 2 }}
                      size="large"
                      onClick={() => setringsizOptions(!ringsizOptions)}
                      className={ringsizOptions ? "active" : null}
                    >
                      <span className="text-decoration-underline-text">
                        <FormattedMessage id="dfPdf.ringSizeGuide" />
                      </span>
                      <span className="material-icons-outlined">
                        <FormattedMessage id="dfPdf.keyboardArrow" />
                      </span>
                    </Button>
                  </div>
                </div>
                {ringsizOptions && (
                  <DFTextRadioButtonApi
                    title={data?.label || data?.name}
                    radioData={featureOptionsArray}
                    extraClass="df-ringGuide-box six-box-layout first-full-width mt-4"
                    setSelected={setSelected}
                    selected={selected}
                    setRingSizeValue={setRingSizeValue}
                  />
                )}
              </div>
            ) : (
              <DFTextRadioButton
                radioData={featureOptionsArray}
                title={data?.label || data?.name}
                setSelected={setSelected}
                selected={selected}
                extraClass={data?.name[rederFieldCss]}
              />
            )}
          </>
        );
      case "radio_without_label":
        return (
          <DFIconRadioButton
            radioData={featureOptionsArray}
            title={data?.label || data?.name}
            setSelected={setSelected}
            selected={selected}
            extraClass={
              data?.label.trim().toLowerCase() === "shape"
                ? "shape-filter-box"
                : "choose-colour"
            }
            subtitile={"Choose  colour"}
          />
        );
      case "Range Slider":
        return (
          <div className="rangleSlider_block">
            <label>
              <FormattedMessage id="dfPdf.caratSize" />
            </label>
            <RangeSlider />
          </div>
        );
    }
  };

  const handleSubmitAddtoBag = useCallback(async () => {
    setLoader(true);
    const selecetedItems = Object.values(selected).filter((val) => !!val);

    const addToBagData = {
      ...pdpPayloadData,
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
      setSelectedItemData({ priceData: variantData?.priceMap || 0 });
      const data = {
        items: {
          group: {
            collections: [
              {
                isSample: false,
                collectionId: variantData?.collectionDetails?.id,
                variants: [variantData?.defaultVariant?.id],
              },
            ],
          },
        },
      };
      setVariantData(data);
    } catch (error) {
      setLoader(false);
      console.error("Error fetching data:", error);
    } finally {
      setLoader(false);
    }
  }, [selected]);

  const handleOnAddtoBag = async () => {
    setAddToBagLoader(true);
    const apiUrl = getApiUrl(`/order/item/add`);
    try {
      const dataApi = await apiService().post(apiUrl, variantData);
      if (dataApi) {
        const cartData = await getCartData(translateId);
        if (cartData) {
          dispatch(showHeaderCartModal(true));
          dispatch(cartDetails(cartData));
        }
      }
      setVariantData({});
    } catch (error) {
      console.error("Error fetching data:", error);
      setAddToBagLoader(false);
    } finally {
      setAddToBagLoader(false);
    }
  };

  useEffect(() => {
    handleSubmitAddtoBag();
  }, [selected]);

  // Sticky Bar Scroll Behaviour
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const fetchStoreId = async () => {
    const domain = localStorage?.getItem("domain");
    const { v12AuthenticationKey } = await getStoreID(domain);
    setShowPaymentDetails(Boolean(v12AuthenticationKey));
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    fetchStoreId();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrolledClass = scrolled ? "active" : "";

  const handleChangeTabs = (val) => {
    setProductType(val);
  };

  return (
    <>
      <div className="product-wrapper">
        {loader && (
          <Backdrop sx={{ color: "#1D1F1E", zIndex: () => 10000 }} open={true}>
            {storeTypes[domain] === "ab" ? (
              <img
                alt={<FormattedMessage id="alt.loader" />}
                src={"/assets/images/austen-and-blake/loader/anb_loader.gif"}
              />
            ) : (
              <img
                alt={<FormattedMessage id="alt.loader" />}
                src={
                  "/assets/images/diamond_factory_images/loader/df-preloader.gif"
                }
              />
            )}
          </Backdrop>
        )}
        <section>
          <div className="container-df">
            <div className="row row-lg">
              <div className="col-lg-6">
                <BreadCrumbsDynamic currentPage={breadCrumbArray} />
                <VerticalSlider />
                <DfCustomIconButton storeTypes={storeTypes} domain={domain}/>
              </div>
              <div className="col-lg-6 bg-right-container">
                <div className="row">
                  <div className="col-lg-7">
                    <Typography variant="h4" className="f-24">
                      {pdpPlpdata?.collectionDetails?.name || ""}
                    </Typography>
                  </div>
                  <div className="col-lg-5">
                    <div className="d-flex gap-15 justify-content-end">
                      <TextTitle
                        variant="p"
                        name={"custom.productCode"}
                        className="f-12 mb-0"
                      />
                      <p className="f-12 color-bistre-brown mb-0">
                        {pdpPlpdata?.collectionDetails?.code}
                      </p>
                    </div>
                    <div className="d-flex gap-15 justify-content-end align-items-center">
                      <TextTitle
                        variant="p"
                        name={"common.customerrating"}
                        className="f-12 mb-0"
                      />
                      <div className="d-flex gap-1">
                        {Array.from({ length: 5 }, (_, index) => (
                          <span
                            key={index}
                            className={`material-icons-outlined f-14 ${
                              ratingValue <= index ? "" : "color-bistre-brown"
                            }`}
                          >
                            {ratingValue <= index ? "grade" : "star"}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <Typography variant="h4" className="mb-0 regular">
                    <del>
                      {currency} {selecetedItemData?.priceData?.price || 0}
                    </del>
                  </Typography>
                  <Typography variant="h4" className="mb-0">
                    {currency}3 030
                  </Typography>
                  <Typography variant="p" className="f-10 light-dark-color">
                    (vat.incl.)
                  </Typography>
                  <Chip label="You Save £219" className="df-badge-1" />
                </div>
                {deliveryMessage ? (
                  <p
                    className="mt-3 mb-2 p-3 text-center"
                    style={{ backgroundColor: "#957127", color: "#fff" }}
                  >
                    {deliveryMessage}
                  </p>
                ) : null}
                <TabContext value={productType}>
                  <CustomTabs handleChangeTabs={handleChangeTabs} />
                  <div className="round-diamond-sec">
                    <TabPanel value="1" sx={{ padding: "0" }}>
                      {displayedFilterLength?.map((data, index) => {
                        return (
                          <Fragment key={index}>{renderField(data)}</Fragment>
                        );
                      })}
                      {filtersLength.length > 6 && (
                        <div className="more-options-button no-border d-flex justify-content-center">
                          <Button
                            variant="text"
                            onClick={() => setmoreoptions(!moreoptions)}
                            className="text-style-normal brown-color-btn plain-text-btn"
                          >
                            <FormattedMessage
                              id={
                                moreoptions
                                  ? "pdp.lessOptions"
                                  : "pdp.moreOptions"
                              }
                            />
                            <span className="material-icons-outlined">
                              {moreoptions ? "remove" : "add"}
                            </span>
                          </Button>
                        </div>
                      )}
                      {/* {moreoptions && (
                        <>
                          <DFTextRadioButton
                            radioData={DfCutGrade}
                            title={<FormattedMessage id="pdp.polish" />}
                            extraClass="df-Clarity-box four-box-layout"
                            setSelected={setSelected}
                            selected={selected}
                          />
                          <DFTextRadioButton
                            radioData={DfCutGrade}
                            title={<FormattedMessage id="pdp.symmetry" />}
                            extraClass="df-Clarity-box four-box-layout"
                            setSelected={setSelected}
                            selected={selected}
                          />
                          <DFTextRadioButton
                            radioData={DfCutGrade}
                            title={<FormattedMessage id="pdp.flui" />}
                            extraClass="df-Clarity-box four-box-layout"
                            setSelected={setSelected}
                            selected={selected}
                          />
                        </>
                      )} */}
                      <div
                        className={`coudnt-find-right-stone mt-3 mb-3 cursorP ${
                          stoneToggle ? "active" : ""
                        }`}
                        onClick={() => setstoneToggle(!stoneToggle)}
                      >
                        {!stoneToggle && (
                          <>
                            <h4 className="mb-0 regular f-24">
                              Couldnt find the right stone?
                            </h4>
                            <Link href="/">Choose a specific</Link>
                            <span className="material-icons-outlined">
                              keyboard_arrow_right
                            </span>
                            <img
                              alt={<FormattedMessage id="alt.ring" />}
                              src={`/assets/images/ring-size-guide-stone.png`}
                            />
                          </>
                        )}
                        {stoneToggle && (
                          <>
                            {loading ? (
                              <h4 className="mb-0 regular f-24 text-center">
                                Loading...
                              </h4>
                            ) : (
                              <>
                                <h4 className="mb-0 regular f-24 text-center">
                                  {diamondList?.length || 0}
                                </h4>
                                <p className="text-center mb-0">
                                  diamonds found matching your criteria
                                </p>
                              </>
                            )}
                            <span className="material-icons-outlined">
                              expand_less
                            </span>
                          </>
                        )}
                      </div>
                      {stoneToggle && (
                        <div className="right-stone-content">
                          <DfPdpSearchDiamond
                            setLoading={setLoading}
                            setDiamondList={setDiamondList}
                            diamondList={diamondList}
                            storeId={storeId}
                            variantOptionId={
                              variantData?.items?.group?.collections?.[0]
                                ?.variants?.[0]
                            }
                            translateId={translateId}
                          />
                        </div>
                      )}
                    </TabPanel>
                    <TabPanel value="2">
                      <Box className="table-container">
                        <CustomTable />
                      </Box>
                    </TabPanel>
                    <DFAddToBagCard
                      handleDfAddtoCart={handleOnAddtoBag}
                      loader={addToBagLoader}
                    />
                    <Box className="appointment-btn mt-3 gap-10 d-flex">
                      <Button
                        variant="outlined"
                        href="/book-appointment"
                        className="w-50 brown-color-outlined"
                      >
                        <FormattedMessage id="common.bookApp" />
                      </Button>
                      <Button
                        variant="outlined"
                        href="/book-appointment"
                        className="w-50 brown-color-outlined"
                      >
                        <FormattedMessage id="common.videoApp" />
                      </Button>
                    </Box>
                    <div className="shipping-details mt-3">
                      <p className="d-flex align-items-center">
                        <span class="material-icons-outlined mr-10">
                          schedule
                        </span>{" "}
                        Estimated Delivery 2-3 working weeks.{" "}
                        <strong>Need it sooner?</strong>{" "}
                        <Link href={"#"} className="color-bistre-brown">
                          Click here
                        </Link>
                      </p>
                      <p className="d-flex align-items-center">
                        <span class="material-icons-outlined mr-10">360</span>{" "}
                        Shipping and Return Policies{" "}
                        <span class="material-icons-outlined ml-5 cursorP">
                          info
                        </span>
                      </p>
                    </div>
                    <div className="pdp-accordian-sec">
                      {showPaymentDetails ? (
                        <Accordion>
                          <AccordionSummary
                            expandIcon={
                              <span class="material-icons-outlined">
                                expand_more
                              </span>
                            }
                            aria-controls="panel1-content"
                            id="panel1-header"
                          >
                            <div className="d-flex justify-content-between w-100">
                              <strong>
                                Finance from as low as £12.9/month
                              </strong>
                              <img src="/assets/images/retail-finance.svg" />
                            </div>
                          </AccordionSummary>

                          <AccordionDetails>
                            <DfFinance
                              orderSummary={{
                                Total: selecetedItemData?.priceData?.price,
                              }}
                              storeId={storeId}
                              currency={currency}
                            />
                          </AccordionDetails>
                        </Accordion>
                      ) : null}
                      <Accordion>
                        <AccordionSummary
                          expandIcon={
                            <span class="material-icons-outlined">
                              expand_more
                            </span>
                          }
                          aria-controls="panel2-content"
                          id="panel2-header"
                        >
                          <strong>Product Description</strong>
                        </AccordionSummary>
                        <AccordionDetails>
                          Discover our 4 Prong Solitaire in 18K White Gold, with
                          Center Stone of 0.300 ct.wt. G SI1 Round Lab-Created
                          DiamondYou'll have a naturally timeless elegance when
                          wearing this classic four prong set solitaire ring. An
                          engagement ring that will make the natural shine and
                          brilliance of the diamond stand out on your hand.
                        </AccordionDetails>
                      </Accordion>
                      <Accordion defaultExpanded>
                        <AccordionSummary
                          expandIcon={
                            <span class="material-icons-outlined">
                              expand_more
                            </span>
                          }
                          aria-controls="panel3-content"
                          id="panel3-header"
                        >
                          <strong>Ring & Diamond Details</strong>
                        </AccordionSummary>
                        <AccordionDetails>
                          {RingDiamondDetails.map((item, index) => (
                            <p
                              key={`ringdiamonddetails-${index}`}
                              className="d-flex justify-content-between border-dash-bottom light-brown pb-3"
                            >
                              <strong>{item?.label}</strong>
                              {item?.value}
                            </p>
                          ))}
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  </div>
                </TabContext>
              </div>
            </div>
          </div>
        </section>
        {/* <AppointmentBlock /> */}
      </div>
      <div className={`pricepopup white-bg p-3 ${scrolledClass}`}>
        <div className="container">
          {deviceType === "desktop" && (
            <div className="d-flex gap-15 align-items-center justify-content-between">
              <div className="pricepopup-item-1">
                {(diamondRing || pendants) && (
                  <div className="d-flex align-items-center gap-15">
                    <p className="f-14">
                      <span className="d-block">£664</span>
                      <span className="d-block semi-bold">Setting</span>
                      <span className="d-block semi-bold">
                        (18K White Gold)
                      </span>
                    </p>
                    <p className="f-14">+</p>
                    <p className="f-14">
                      <span className="d-block">£225</span>
                      <span className="d-block semi-bold">Diamond</span>
                      <span className="d-block semi-bold">(0.30 Round)</span>
                    </p>
                    <p className="f-14">=</p>
                  </div>
                )}
                {weddingRing && (
                  <div className="d-flex align-items-center gap-10">
                    <p>
                      Metal{" "}
                      <span className="semi-bold d-block text-100-wrap">
                        18 White Gold
                      </span>
                    </p>
                    <p>
                      Band Width{" "}
                      <span className="semi-bold d-block text-100-wrap">
                        2mm
                      </span>
                    </p>
                    <p>
                      Band Thickness{" "}
                      <span className="semi-bold d-block text-100-wrap">
                        1.7mm
                      </span>
                    </p>
                    <p>
                      Ring Size{" "}
                      <span className="semi-bold d-block text-100-wrap">M</span>
                    </p>
                  </div>
                )}
                {(earrings || bracelets) && (
                  <div className="d-flex align-items-center gap-10">
                    <p>
                      Metal{" "}
                      <span className="semi-bold d-block text-100-wrap">
                        18 White Gold
                      </span>
                    </p>
                    <p>
                      Shape{" "}
                      <span className="semi-bold d-block text-100-wrap">
                        Round
                      </span>
                    </p>
                    <p>
                      Carat{" "}
                      <span className="semi-bold d-block text-100-wrap">
                        1.75
                      </span>
                    </p>
                    <p>
                      Colour{" "}
                      <span className="semi-bold d-block text-100-wrap">
                        H-1
                      </span>
                    </p>
                    <p>
                      Clarity{" "}
                      <span className="semi-bold d-block text-100-wrap">
                        S1
                      </span>
                    </p>
                  </div>
                )}
                <p className="f-14">
                  Best Price & Quality Guaranteed.{" "}
                  <Link href="" className="underline">
                    Find Out More
                  </Link>
                </p>
              </div>
              <div className="pricepopup-item-2">
                <div className="d-flex align-items-end gap-10 mb-3">
                  <TextTitle
                    variant={"h4"}
                    name={"£267"}
                    className={"color-bistre-brown mb-0"}
                  />
                  <h6 className="light-dark-color mb-0">
                    <del>£293</del>{" "}
                    <span className="f-12 mb-0">(vat.incl.)</span>
                  </h6>
                </div>
                <p className="f-14 p-2 d-inline-flex align-items-center br-100 bg-whitesmoke">
                  You Save £219{" "}
                  <span class="material-icons-outlined cursorP ml-5">info</span>{" "}
                </p>
              </div>
              <div className="pricepopup-item-3">
                <h4 className="color-bistre-brown">
                  January Sale <span className="d-block">Price</span>
                </h4>
              </div>
              <div className="pricepopup-item-4">
                <div className="d-flex gap-10">
                  <Button variant="contained">Add To Bag</Button>
                  <Button variant="outlined" href="#book-appointment">
                    Book an Appointment
                  </Button>
                </div>
                <p className="f-14 text-center mt-3">
                  Finance from as low as £139.85 / month +
                </p>
              </div>
            </div>
          )}
          {(deviceType === "tablet" || deviceType === "mobile") && (
            <>
              <div className="d-flex gap-15 align-items-center justify-content-between">
                <div
                  className={`pricepopup-item-tablet-1 ${
                    deviceType === "mobile" ? "w-100 text-center" : ""
                  }`}
                >
                  {(diamondRing || pendants) && (
                    <div
                      className={`d-flex align-items-center gap-15 ${
                        deviceType === "mobile"
                          ? "w-100 justify-content-center"
                          : ""
                      }`}
                    >
                      <p className="mb-1">
                        <span className="d-block">£664</span>
                        <span className="semi-bold">(Setting)</span>
                      </p>
                      <p className="mb-1">+</p>
                      <p className="mb-1">
                        <span className="d-block">£225</span>
                        <span className="semi-bold">(Diamond)</span>
                      </p>
                      <p className="mb-1">=</p>
                    </div>
                  )}
                  <div
                    className={`d-flex align-items-center gap-10 mb-1 ${
                      deviceType === "mobile"
                        ? "w-100 justify-content-center"
                        : ""
                    }`}
                  >
                    <h4 className="color-bistre-brown mb-0 regular">
                      £267{" "}
                      <span className="light-dark-color f-12">(vat.incl.)</span>
                    </h4>
                    <h4 className="color-bistre-brown mb-0 regular br-left">
                      January Sale Price
                    </h4>
                  </div>
                  <p className="mb-0">
                    Finance from as low as £139.85 / month +
                  </p>
                </div>
                {deviceType === "tablet" && (
                  <div className="pricepopup-item-tablet-2">
                    <Button variant="contained" fullWidth className="mb-2">
                      Add To Bag
                    </Button>
                    <Button
                      variant="outlined"
                      href="#book-appointment"
                      fullWidth
                    >
                      Book an Appointment
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DfProductDetail;

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { stepCheck } from "@/_utils";
import {
  wishlist,
  moreColorVariantsData,
  sortingFilterData,
} from "@/_utils/customApiData";
import TabStep1level1a from "./tabStep1level1a";
import TabStep1level1b from "./tabStep1level1b";
import CustomTabsData from "../../CustomTabsData";
import IconRadioButton from "../../radio/IconRadioButton";
import CreateDesignMainTabs from "../createDesignMainTabs";
import Link from "next/link";
import Head from "next/head";
import FilterswithDropdown from "@/_components/common/filters/FilterswithDropdown";
import TextTitle from "@/_components/atoms/TextTitle";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Box, Button } from "@mui/material";
import useDeviceHelper from "@/_hooks/useDeviceHelper";
import { useSelector, useDispatch } from "react-redux";
import SettingsDetails from "./settingsDetails";
import {
  setSelectedSettingDetail,
  fetchSettingDetailsData,
} from "@/_store/chooseSettings.slice";
import { useRouter } from "next/router";

const CreateYourSetting = () => {
  const router = useRouter();
  const { query } = router;
  const dispatch = useDispatch();
  const {
    pageData,
    count,
    chooseYourSettingData,
    selectedSettingDetail,
    settingDetailStatus,
  } = useSelector((state) => state.chooseSettings);
  const { userDetails } = useSelector((state) => state.auth);
  const { navigationhierarchyid } = useSelector((state) => state.appconfig);
  const { storeId } = userDetails || {};

  const { featureGroup } = pageData || {};
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [mfilter, setmfilter] = useState(false);
  const [selectedMetals, setSelectedMetals] = useState([]);

  const [selectedStyles, setSelectedStyles] = useState(() => {
    return query.styles ? query.styles.split(",") : [];
  });

  useEffect(() => {
    setPosts(wishlist);
  }, []);

  const tabStep1level1 = [
    {
      label: "Setting Style",
      content: (
        <TabStep1level1a
          onSelect={setSelectedMetals}
          selectedMetals={selectedMetals}
        />
      ),
    },
    {
      label: "More Filters",
      content: <TabStep1level1b featureGroup={featureGroup} />,
    },
  ];

  const handleDelete = (chipToDelete) => {
    setSelectedStyles((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  const handleReset = () => {
    setSelectedStyles([]);
    router.replace(
      {
        pathname: router.pathname,
        query: {},
      },
      undefined,
      { shallow: true }
    );
  };

  const { deviceType } = useDeviceHelper();

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/assets/css/product-listing.css" />
      </Head>
      <CreateDesignMainTabs />
      <div className={`tab-content main-tabs`}>
        {selectedSettingDetail ? (
          <SettingsDetails domain={localStorage.getItem("domain")} />
        ) : (
          <>
            {deviceType !== "mobile" && (
              <CustomTabsData
                tabs={tabStep1level1}
                extraClass="sub-tabs gap-60"
              />
            )}
            {deviceType === "mobile" && (
              <>
                <TextTitle
                  variant="h5"
                  name={"Setting Style"}
                  className={"mb-1"}
                />
                <TabStep1level1a />
                <div className={`m-filter-wrap ${mfilter ? "active" : ""}`}>
                  <Button
                    className="filter-btn"
                    onClick={() => setmfilter(!mfilter)}
                  >
                    Filters{" "}
                    {mfilter ? (
                      <span class="material-icons-outlined">expand_more</span>
                    ) : (
                      <span class="material-icons-outlined">expand_less</span>
                    )}
                  </Button>
                  <div className="mf-inner">
                    <TabStep1level1b />
                    <Button variant="outlined" className="w-100 mt-5 mb-3">
                      Select Filter
                    </Button>
                    <Button
                      variant="text"
                      className="text-style-normal w-100 underlined-button"
                    >
                      Reset All
                    </Button>
                  </div>
                </div>
              </>
            )}
            <div className="d-flex justify-space-between">
              {deviceType !== "mobile" && (
                <div className="selected-filters flex-wrap d-flex align-items-center">
                  {selectedMetals.length > 0 && (
                    <>
                      <Stack
                        direction="row"
                        spacing={1}
                        className="chips-filters"
                      >
                        {selectedMetals.map((item, index) => (
                           <Chip
                           key={index}
                           label={item}
                           onDelete={() => handleDelete(item)}
                           deleteIcon={<span className="material-icons-outlined color-black">close</span>}
                         />
                        ))}
                      </Stack>
                      <Button
                        onClick={() => setSelectedMetals([])}
                        variant="text"
                        sx={{ mt: 2, mb: 2 }}
                        className="text-style-normal underlined-button m-0"
                      >
                        {" "}
                        Reset all
                      </Button>
                    </>
                  )}
                </div>
              )}
              <div className="sort-filters-block d-flex align-items-center">
                <TextTitle
                  variant="p"
                  name={`${count ?? 0} ${count === 1 ? "product" : "products"}`}
                  className={"me-5 mb-0"}
                />
                <FilterswithDropdown
                  filterData={sortingFilterData}
                  title={"Sort: "}
                  extraClass={"filtering filters-sort"}
                />
              </div>
            </div>
            <div className="toggle-content choose-setting-page product-listing">
              <div>
                <div className="row product-thumb">
                  {loading ? (
                    <h4>Loading ...</h4>
                  ) : (
                    Array.isArray(chooseYourSettingData) && chooseYourSettingData?.map((product) => {
                      return (
                        <div
                          className="product-thumb-data col-lg-3 col-md-6 col-sm-6 col-6"
                          key={product?.id}
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            dispatch(setSelectedSettingDetail(product))
                          }
                        >
                          <div className="product-top-head">
                            {stepCheck(product?.bestseller, 1) ? (
                              <p className="bestseller">Bestseller</p>
                            ) : null}
                            {stepCheck(product?.favourite, 1) ? (
                              <p className="favourite">
                                <span className="material-icons-outlined">
                                  favorite
                                </span>
                              </p>
                            ) : null}
                          </div>
                          <div className="product-thumb-box">
                            <div className="img-wrapper">
                              <img
                                src={`${
                                  product.medias.length
                                    ? product?.medias[0].url
                                    : "/assets/images/default-img.jpg"
                                }`}
                                alt={product?.alt || product?.label}
                              />
                            </div>
                            {product?.variants && (
                              <div className="icon-radio-wrapper color-variants">
                                <IconRadioButton
                                  radioData={moreColorVariantsData}
                                  extraClass={"color-variants"}
                                />
                              </div>
                            )}
                          </div>
                          <div>
                            {product?.name && <h5>{product?.name}</h5>}
                            {product?.details && (
                              <p>
                                <span className="price-from">from: </span>
                                <b>{product?.details?.price}</b>
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
                {
                  Array.isArray(chooseYourSettingData) && chooseYourSettingData?.length > 1 && (
                    <Box textAlign={"center"}>
                      <Button
                        variant="outlined"
                        className="checkout-btn standard-btn mt-5 mb-0"
                        size="small"
                        href="#select-appointment"
                      >
                        View More
                      </Button>
                    </Box>
                  )
                }
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CreateYourSetting;

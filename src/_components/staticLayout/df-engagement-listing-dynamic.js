/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-css-tags */
import Head from "next/head";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Router } from "next/router";
// import DFEngagementRingsList from './product-listing/DFEngagementRingsList'
import { DFSliderFilters } from "./product-listing/DF-Slider-Filters";
import { settingStoneData, settingtypeData } from "@/_utils/customApiData";
import TextCheckBoxButton from "../common/checkbox/TextCheckBoxButton";
import Link from "next/link";
import useDeviceHelper from "@/_hooks/useDeviceHelper";
import { getStoreType } from "@/_utils";
import { DFSliderFiltersWithApi } from "./product-listing/DF-Slider-FiltersWithApi";
import usePlp from "@/_hooks/usePlp";
import FilterswithDropdownPLP from "../common/filters/FilterswithDropdownPLP";
import { Button } from "@mui/material";
import IconRadioButtonPLP from "../common/radio/IconRadioButtonPLP";
import FilterswithDropdownPLPSort from "../common/filters/FilterswithDropdownPLPSort";
import CircularLoader from "../common/loader/circular-loader";
import InnerBanner from "../common/InnerBanner";
import { usePathname } from "next/navigation";

const DFEngagementRingListingDynamic = ({
  pdpPlpdata,
  plpData: finalDataServer,
  mergedInjectionData: mergedInjectionDataServer,
  fetures,
  pageId,
  lang,
  navigationMedias,
  domain,
  breadcrumbData,
  currency,
}) => {
  // const [showMobileFilters, setshowMobileFilters] = useState(false);
  const { deviceType } = useDeviceHelper();
  const pathname = usePathname();
  const categoryPath = pathname?.split("/").at(1);
  const productRows = 4
  const {
    setshowMobileFilters,
    handleWishList,
    handleChage,
    handleFilter,
    fetchMoreProducts,
    showMobileFilters,
    loader,
    filterVal
  } = usePlp(
    pdpPlpdata,
    pageId,
    lang,
    navigationMedias,
    breadcrumbData,
    finalDataServer
  );
  const [load, setLoad] = useState(false);
  const [selectedFilterData, setSelectedFilterData] = useState([]);

  Router.events.on("routeChangeStart", () => {
    setLoad(true);
  });
  Router.events.on("routeChangeComplete", () => {
    setLoad(false);
  });
  Router.events.on("routeChangeError", () => {
    setLoad(false);
  });

  const handleClickSeletedFilter = () => {
    handleFilter(selectedFilterData);
    setshowMobileFilters(!showMobileFilters);
  };

  const handleResetAllFilters = () => {
    handleFilter([]);
    setSelectedFilterData([]);
    setshowMobileFilters(!showMobileFilters);
  };

  const handleFavourite = (productCode, itemId) => {
    openLoginModal(handleWishList, [productCode, itemId], { redirect: false });
  };

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/assets/css/product-listing.css" />
      </Head>
      <div className={"plp-banner"}>
        <InnerBanner
          variant="faq"
          Sectitle={"Engagement Rings for Women"}
          bannerPara={
            <>
              <p>
                <FormattedMessage id="dfProduct.plpBanner" />
              </p>
            </>
          }
          extraClass=""
        />
      </div>
      <div
        className={`product-listing ${showMobileFilters ? "sticky-filter-top" : "sticky-filter-bottom"
          }`}
      >
        {/* <BreadCrumbsDynamic currentPage={breadCrumbArray} /> */}
        <div
          style={{
            background: "#FFFCF6",
            borderTop: "1px solid ",
            borderColor: "var(--light-brown-4)",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
            className="container"
          >
            {deviceType === "mobile" && (
              <DFSliderFilters theme={getStoreType(domain)} />
            )}
            {deviceType !== "mobile" && (
              <>
                <DFSliderFiltersWithApi
                  featureData={fetures}
                  selectedFilter={handleFilter}
                  filterVal={filterVal}
                />
              </>
            )}
          </div>
        </div>
        <div className="container">
          <div className={`filters-and-sort ${getStoreType(domain)}`}>
            <FilterswithDropdownPLP
              selectedFilter={handleFilter}
              filterData={fetures}
              filterVal={filterVal}
              facetList={pdpPlpdata?.facetList}
              currency={currency}
              title={"Filter: "}
              extraClass={"filtering"}
              isCount={true}
            />
            <FilterswithDropdownPLPSort
              filterData={fetures}
              title={"Sort: "}
              extraClass={"sorting"}
            />
          </div>
          {filterVal?.length > 0 && (
            <div className="selected-filter">
              {filterVal?.map((item) => {
                const [key, value] = Object.entries(item)[0];
                return (
                  <label>
                    {value}{" "}
                    <span
                      className="material-icons-outlined"
                      onClick={() => handleFilterData(key, value)}
                    >
                      close
                    </span>
                  </label>
                );
              })}
            </div>
          )}
          <div className="product-count">
            <p>
              {mergedInjectionDataServer?.length}
              <FormattedMessage id="dfList.EngagementRingsFound" />
            </p>
          </div>
          <div
            className={`filters-mobile ${showMobileFilters ? "sticky-top" : "sticky-bottom"
              }`}
          >
            <div
              className={`filters-title`}
              onClick={() => setshowMobileFilters(!showMobileFilters)}
            >
              <span className="title">
                <FormattedMessage id="dfList.Filters" />
              </span>
              <span className="material-icons-outlined icons-small mr-5">
                {showMobileFilters ? "" : "tune"}
              </span>
            </div>
            <div className={`filters-mobile-details`}>
              <TextCheckBoxButton
                checkBoxData={settingStoneData}
                title={"Stone"}
                subtitle=""
                extraClass="full-width-checkbox"
                mobileTitleType="accordian"
              />
              <TextCheckBoxButton
                checkBoxData={settingtypeData}
                title={"Setting type"}
                subtitle=""
                extraClass="full-width-checkbox standard-checkboxes"
                mobileTitleType="accordian"
              />

              <div className="mobile-filter-actions mt-4">
                <Button variant="contained">See Your Results</Button>
              </div>
            </div>
          </div>

          <div className={`product-thumb row ${getStoreType(domain)}`}>
            {(loader || load) && <CircularLoader />}
            {mergedInjectionDataServer?.map((product) => {
              return product?.prodcuctData?.map((item) => {
                return (
                  item?.selected && (
                    <div
                      className={`product-thumb-data ${getStoreType(domain) === "df" ? "df-pl" : ""
                        }  ${item?.mediaId
                          ? "banner col-lg-6 col-md-12 col-sm-12 col-xs-12"
                          : "col-lg-3 col-md-6 col-sm-6 col-6"
                        }`}
                      key={item.id}
                    >
                      <div className="product-top-head">
                        {item.tags ? (
                          <p className="on-sale">{item.tags}</p>
                        ) : null}
                        {item.tags ? (
                          <div className="favourite">
                            <Button
                              onClick={(e) =>
                                handleFavourite(product?.code, item?.id)
                              }
                            >
                              {!item?.isWishlisted ? (
                                <span className="material-icons-outlined">
                                  favorite_border
                                </span>
                              ) : (
                                <span className="material-icons-outlined">
                                  favorite
                                </span>
                              )}
                            </Button>
                          </div>
                        ) : null}
                      </div>
                      <Link
                        href={`/${categoryPath}/design/${item?.variantoptionname
                          ?.trim()
                          ?.replace(/\W+/g, "-")
                          ?.toLowerCase()}-${item.code}`
                        }
                        rel="nofollow"
                      >
                        <img
                          src={`/assets/images/austen-and-blake/engagement-listing/engagement-ring.png`}
                          alt={product.alt || product.label}
                        />
                        <div className="d-flex justify-content-between pt-3 pb-2">
                          {item.variantoptionname && (
                            <p className="text-truncate-custom w-50 text-uppercase">
                              {item.variantoptionname}
                            </p>
                          )}
                          {item.fromprice && (
                            <p>
                              <b>
                                {currency}
                                {item?.fromprice}
                              </b>{" "}
                              <br />
                              <strike className="opacity-50">
                                {currency}
                                {item?.price}
                              </strike>
                            </p>
                          )}
                        </div>
                      </Link>
                      {!item?.mediaId && (
                        <IconRadioButtonPLP
                          radioData={product?.prodcuctData}
                          extraClass={"color-variants"}
                          code={item?.id}
                          parentCode={product?.code}
                          onChange={handleChage}
                        />
                      )}
                    </div>
                  )
                );
              });
            })}
          </div>
          {mergedInjectionDataServer?.length > productRows &&  (
            <div className="view-more mb-5 mt-5">
              <button className="view-more-btn btn-link-primary" onClick={fetchMoreProducts}>
                <FormattedMessage id="dfList.ViewMore" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DFEngagementRingListingDynamic;

/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import BreadCrumbs from "@/_components/common/breadcrumbs";
import TextCheckBoxButton from "@/_components/common/checkbox/TextCheckBoxButton";
import IconRadioButton from "@/_components/common/radio/IconRadioButton";
import FilterswithDropdown from "@/_components/common/filters/FilterswithDropdown";
import {
  settingStoneData,
  settingtypeData,
  filtersDFListingPage,
  sortingDFFilterData,
  enagageColorVariantsData,
  DFEngagementRingsListData,
} from "@/_utils/customApiData";
import { stepCheck } from "@/_utils";
import Link from "next/link";
import { DFSliderFilters } from "./DF-Slider-Filters";
import useDeviceHelper from "@/_hooks/useDeviceHelper";

const DFEngagementRingsList = ({ pageName }) => {
  const [showMobileFilters, setshowMobileFilters] = useState(false);
  const { deviceType } = useDeviceHelper();

  return (
    <div className="product-listing">
      {/* <BreadCrumbs currentPage={pageName} /> */}
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
        {deviceType === "mobile"  && <DFSliderFilters />}
        {deviceType !== "mobile" && (
          <>
            <DFSliderFilters />
            <DFSliderFilters />
            <DFSliderFilters />
            <DFSliderFilters />
          </>
        )}
      </div>
      <div className="container">
        <div className="filters-and-sort">
          <FilterswithDropdown
            filterData={filtersDFListingPage}
            title={"Filter: "}
            extraClass={"filtering"}
          />
          <FilterswithDropdown
            filterData={sortingDFFilterData}
            title={"Sort: "}
            extraClass={"sorting"}
          />
        </div>
        <div className={`filters-mobile ${showMobileFilters ? "sticky-top" : "sticky-bottom"}`}>
          <div
            className={`filters-title`}
            onClick={() => setshowMobileFilters(!showMobileFilters)}
          >
            <span className="title">Filters</span>
            <span className="material-icons-outlined icons-small">
              {showMobileFilters ? "keyboard_arrow_down" : "keyboard_arrow_up"}
            </span>
          </div>
          <div
            className={`filters-mobile-details`}
          >
            <TextCheckBoxButton
              checkBoxData={settingStoneData}
              title={"Stone"}
              subtitle=""
              extraClass="full-width-checkbox"
            />
            <TextCheckBoxButton
              checkBoxData={settingtypeData}
              title={"Setting type"}
              subtitle=""
              extraClass="full-width-checkbox standard-checkboxes"
            />

            <div className="mobile-filter-actions">
              <button className="btn-link-primary">Select Filters</button>
              <button className="standard-btn btn-link">Reset All</button>
            </div>
          </div>
        </div>

        <div className="product-thumb row">
          {DFEngagementRingsListData.map((product, index) => {
            return (
              <div
                className={`product-thumb-data df-pl ${
                  product.banner
                    ? "banner col-lg-6 col-md-12 col-sm-12 col-xs-12"
                    : "col-lg-3 col-md-6 col-sm-6 col-6"
                }`}
                key={product.id}
              >
                 <div className="product-top-head">
                 {stepCheck(product.bestseller, 1) ? (
                    <p className="on-sale">ON SALE</p>
                  ) : null}
                  {stepCheck(product.favourite, 1) ? (
                    <p className="favourite">
                      <span className="material-icons-outlined">
                        favorite_border
                      </span>
                    </p>
                  ) : null}
                 </div>
                 <div className="product-thumb-box">
                <Link href="/product-details" className="img-wrapper">
                  <img src={product.url} alt={product.alt || product.label} />
                </Link>
                {product.variants && (
                  <div className="icon-radio-wrapper color-variants">
                    <IconRadioButton
                      radioData={enagageColorVariantsData}
                      extraClass={"color-variants"}
                    />
                    </div>
                  )}
                </div>
                <Link href="/product-details" className="product-cntnt">
                  <div className="d-flex justify-content-between pt-2">
                    {product.label && (
                      <h3 className="text-truncate-custom w-50">
                        {product.label}
                      </h3>
                    )}
                    {product.details && (
                      <p>
                        <b>{product.details.price}</b> <br />
                        <strike className="opacity-50">{"£2459"}</strike>
                      </p>
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="view-more">
          <button className="view-more-btn btn-link-primary">View More</button>
        </div>
      </div>
    </div>
  );
};

export default DFEngagementRingsList;

/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import BreadCrumbs from "@/_components/common/breadcrumbs";
import TextCheckBoxButton from "@/_components/common/checkbox/TextCheckBoxButton";
import IconRadioButton from "@/_components/common/radio/IconRadioButton";
import FilterswithDropdown from "@/_components/common/filters/FilterswithDropdown";
import RangeSlider from "@/_components/common/sliders/RangeSlider";
import {
    settingStoneData,
    settingtypeData,
    filtersListingPage,
    sortingFilterData,
    moreColorVariantsData,
    NaturalDiamondListData,
} from "@/_utils/customApiData";
import { stepCheck } from "@/_utils";
import Link from "next/link";

const NaturalDiamondList = ({ pageName }) => {
    const [showMobileFilters, setshowMobileFilters] = useState(false);

    return (
        <>
            <div className="product-listing">
                <BreadCrumbs currentPage={pageName} />
                {/* <IconRadioButton radioData={settingStyleData} extraClass={"style-filter"} title="Choose your style" /> */}
                <TextCheckBoxButton
                    checkBoxData={settingStoneData}
                    title={"Choose your style: "}
                    subtitle=""
                    extraClass="full-width-checkbox"
                />
                <div className="filters-and-sort">
                    <FilterswithDropdown
                        filterData={filtersListingPage}
                        title={"Filter: "}
                        extraClass={"filtering"}
                    />
                    <FilterswithDropdown
                        filterData={sortingFilterData}
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
                            title={"Shape"}
                            subtitle=""
                            extraClass="full-width-checkbox"
                        />
                        <TextCheckBoxButton
                            checkBoxData={settingStoneData}
                            title={"Stone"}
                            subtitle=""
                            extraClass="full-width-checkbox"
                        />
                        <TextCheckBoxButton
                            checkBoxData={settingStoneData}
                            title={"Metal"}
                            subtitle=""
                            extraClass="full-width-checkbox"
                        />
                        <TextCheckBoxButton
                            checkBoxData={settingtypeData}
                            title={"Setting type"}
                            subtitle=""
                            extraClass="full-width-checkbox standard-checkboxes"
                        />
                        <RangeSlider
                            title="Price Range"
                            lowerLimit={1000}
                            upperLimit={3500}
                            unit={"£"}
                            currentLowerLimit={1000}
                            currentUpperLimit={2500}
                        />
                        <div className="mobile-filter-actions">
                            <button className="btn-link-primary">Select Filters</button>
                            <button className="standard-btn btn-link">Reset All</button>
                        </div>
                    </div>
                </div>

                <div className="product-thumb row">
                    {NaturalDiamondListData.map((product, index) => {
                        return (
                            <div
                                className={`product-thumb-data ${product.banner
                                    ? "banner col-lg-6 col-md-12 col-sm-12 col-xs-12"
                                    : "col-lg-3 col-md-6 col-sm-6 col-6"
                                    }`}
                                key={product.id}
                            >
                                <div className="product-top-head">
                                {stepCheck(product.bestseller, 1) ? (
                                        <p className="bestseller">Bestseller</p>
                                    ) : null}
                                    {stepCheck(product.favourite, 1) ? (
                                        <p className="favourite">
                                            <span className="material-icons-outlined">favorite</span>
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
                                            radioData={moreColorVariantsData}
                                            extraClass={"color-variants"}
                                        />
                                        </div>
                                    )}
                                </div>
                                <Link href="/product-details">
                                    {product.label && <h5>{product.label}</h5>}
                                    {product.details && (
                                        <p>
                                            <span className="price-from">from: </span>
                                            <b>{product.details.price}</b>
                                        </p>
                                    )}
                                </Link>
                            </div>
                        );
                    })}
                </div>
                <div className="view-more">
                    <button className="view-more-btn btn-link-primary">View More</button>
                </div>
            </div>
        </>
    );
};

export default NaturalDiamondList;

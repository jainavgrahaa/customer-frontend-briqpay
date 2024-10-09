/* eslint-disable @next/next/no-css-tags */
import Head from "next/head";
import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import usePlp from "@/_hooks/usePlp";
import { updatePlpUrl } from "@/_store/plp.slice";
import { LoginContext } from "@/_utils/loginCotext";
import { getStoreType } from "@/_utils";
import IconRadioButtonPLP from "../common/radio/IconRadioButtonPLP";
import FilterswithDropdownPLP from "../common/filters/FilterswithDropdownPLP";
import TextCheckBoxButtonPLP from "../common/checkbox/TextCheckBoxButtonPLP";
import FilterswithDropdownPLPSort from "../common/filters/FilterswithDropdownPLPSort";
import BreadCrumbsDynamic from "../common/breadcrumbs/dynamic";
import InnerBanner from "../common/InnerBanner";
import TextCheckBoxButtonMobilePLP from "../common/checkbox/TextCheckBoxButtonMobilePLP";
import CircularLoader from "../common/loader/circular-loader";
import { SliderFilterDFPlp } from "../common/checkbox/SliderFilterPLP";
import ContentSlider from "@/_components/common/ContentSlider";
import { usePathname } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Scrollbar } from "swiper/core";
import { useSelector, useDispatch } from "react-redux";

// Install Swiper modules
SwiperCore.use([Scrollbar]);

const ProductListingWithApi = ({
  pdpPlpdata,
  plpData: finalDataServer,
  mergedInjectionData: mergedInjectionDataServer,
  fetures,
  pageId,
  lang,
  domain,
  deviceType,
  navigationMedias,
  breadcrumbData,
  currency,
  pageNavigation,
  featureOptionsPrice,
  isPage = true,
  storeId,
  finalDataResult,
}) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const productRows = 4;

  const {
    setshowMobileFilters,
    handleWishList,
    handleChage,
    handleFilter,
    fetchMoreProducts,
    setFilterVal,
    showMobileFilters,
    title,
    breadCrumbArray,
    loader,
    filterVal,
    mergedInjectionData,
    finalData,
    updatePLP,
  } = usePlp({
    pdpPlpdata,
    pageId,
    lang,
    navigationMedias,
    breadcrumbData,
    finalDataServer: mergedInjectionDataServer,
    storeId,
    finalDataResult,
  });

  const { openLoginModal } = useContext(LoginContext);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const categoryPath = pathname?.split("/").at(1);
  // const [load, setLoad] = useState(false);
  const [selectedFilterData, setSelectedFilterData] = useState([]);
  const [plpListingData, setPlpListingData] = useState(
    mergedInjectionDataServer
  );
  const [hoveredItem, setHoveredItem] = useState(null);

  const { plpData, plpUrl } = useSelector((state) => state.plp);

  useEffect(() => {
    if (plpData) {
      setPlpListingData(plpData);
    }
  }, [plpData]);

  const handleClickSeletedFilter = () => {
    // handleFilter(selectedFilterData);
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

  const [urlData, setUrlData] = useState([]);
  const [urlQueryData, setUrlQueryData] = useState([]);

  const transformQuery = (query) => {
    const result = [];

    query.forEach((obj) => {
      Object.entries(obj).forEach(([key, value]) => {
        if (value.includes(",")) {
          value.split(",").forEach((v) => {
            result.push({ [key]: v.trim() });
          });
        } else {
          result.push({ [key]: value });
        }
      });
    });

    return result;
  };

  const updateFilterNames = () => {
    const path = pathname
      ?.split("/")
      ?.filter((e) => !e.includes("="))
      .at(-2);
    const filters = [];
    if (path) {
      filters?.push(path);
    }
    setUrlData([...filters]);
    const mergedData = {}; // Create a copy of the original object

    pathname
      ?.split("/")
      ?.filter((e) => e.includes("="))
      ?.map((e) => {
        const key = e.split("=")[0];
        const value = e.split("=")[1];

        return (mergedData[key] = decodeURIComponent(value));
      });

    if (mergedData.minprice && mergedData.maxprice) {
      mergedData[
        "minprice-maxprice"
      ] = `${mergedData.minprice}-${mergedData.maxprice}`;
      delete mergedData.minprice;
      delete mergedData.maxprice;
    }

    const filterData = Object.entries(mergedData)?.map(([key, value]) => ({
      [key]: value,
    }));
    setFilterVal([...transformQuery(filterData)]);
    setUrlQueryData([...transformQuery(filterData)]);
  };

  useEffect(() => {
    const basePath = pathname
      .split("/")
      .slice(0, 3)
      .join("/")
      ?.split("/")
      ?.filter((e) => !e.includes("="))
      ?.splice(1); // Base path without parameters

    let newUrl = `/${basePath}`;

    const { category } = plpUrl;
    if (category) {
      newUrl += `/${category}`;
    }

    router.push(newUrl, undefined, { shallow: true });
  }, [plpUrl]);

  useEffect(() => {
    if (!isPage && pathname?.split("/").length > 1) {
      const path = pathname
        ?.split("/")
        ?.filter((e) => !e.includes("="))
        .at(-2);
      const filters = [];
      if (path) {
        filters?.push(path);
      }
      setUrlData([...filters]);
      const mergedData = {}; // Create a copy of the original object
      pathname
        ?.split("/")
        ?.filter((e) => e.includes("="))
        ?.map((e) => {
          if (e.split("=")[0] !== "text") {
            const key = e.split("=")[0];
            const value = e.split("=")[1];

            return (mergedData[key] = decodeURIComponent(value));
          }
        });
      Object.entries(router.query).forEach(([key, value]) => {
        if (key === "minprice" && router.query.hasOwnProperty("maxprice")) {
          mergedData[
            "minprice-maxprice"
          ] = `${value}-${router.query["maxprice"]}`;
        } else if (key !== "maxprice") {
          mergedData[key] = value;
        }
      });

      const filterData = Object.entries(mergedData)?.map(([key, value]) => ({
        [key]: value,
      }));
      setFilterVal([...transformQuery(filterData)]);
      setUrlQueryData([...transformQuery(filterData)]);
    } else if (pathname?.split("/").length > 2) {
      updateFilterNames();
    }
  }, [pathname, router]);

  const onClose = () => {
    dispatch(
      updatePlpUrl({
        category: null,
      })
    );
  };

  const onQueryClose = (key, value) => {
    const updatedQuery = {}; // Create a copy of the original object

    pathname
      ?.split("/")
      ?.filter((e) => e.includes("="))
      ?.map((e) => {
        const key = e.split("=")[0];
        const value = e.split("=")[1];

        return (updatedQuery[key] = decodeURIComponent(value));
      });

    if (key === "minprice-maxprice") {
      delete updatedQuery["minprice"];
      delete updatedQuery["maxprice"];
    } else {
      const values = updatedQuery[key]?.split(",");
      if (values) {
        const newValues = values.filter((val) => val !== value);
        if (newValues.length > 0) {
          updatedQuery[key] = newValues.join(",");
        } else {
          delete updatedQuery[key];
        }
      } else {
        delete updatedQuery[key];
      }
    }

    // Reconstruct the path parameters
    const pathParams = Object.entries(updatedQuery)
      .map(([key, value]) => `${key}=${value}`)
      .join("/");

    // Construct the new URL
    const basePath = pathname
      .split("/")
      .slice(0, 3)
      .join("/")
      ?.split("/")
      ?.filter((e) => !e.includes("="))
      ?.splice(1); // Base path without parameters

    let newUrl = `/${basePath}`;

    const { category } = plpUrl;
    if (category) {
      newUrl += `/${category}`;
    }
    newUrl += `/${pathParams}`;

    // Replace the router path with the new URL
    // router.replace(newUrl);
    router.push(newUrl, undefined, { shallow: true });
    updateFilterNames();
    updatePLP("");
  };

  const filterName = (data) => {
    return Object?.values(data).join()?.split("_")?.length === 1
      ? Object?.values(data)[0]
      : Object?.values(data).join()?.split("_")?.[1];
  };

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/assets/css/product-listing.css" />
      </Head>
      <div
        className={`product-listing ${
          showMobileFilters ? "sticky-filter-top" : "sticky-filter-bottom"
        }`}
      >
        {getStoreType(domain) === "ab" && isPage && (
          <div className={"plp-banner"}>
            <InnerBanner
              variant="faq"
              Sectitle={title?.label}
              bannerPara={
                <>
                  <p>
                    <FormattedMessage id="abProduct.plpBanner" />
                    <a href="#">
                      <FormattedMessage id="product.readMore" />
                    </a>
                  </p>
                </>
              }
              extraClass=""
            />
          </div>
        )}
        {isPage && (
          <div className="plp-rating-custom-sec">
            <div className="container">
              <div
                className="row"
                style={{ overflow: "auto", flexWrap: "nowrap" }}
              >
                <div className="col-xl-3 col-lg-3 col-sm-12 col-12 text-center">
                  <img
                    alt={<FormattedMessage id="alt.trustPilotRating" />}
                    src="/assets/icons/raw-svgs/rating-trust-pilot.svg"
                  />
                </div>
                <div className="col-xl-3 col-lg-3 col-sm-12 col-12 text-center">
                  <img
                    alt={<FormattedMessage id="alt.trustPilotRating" />}
                    src="/assets/icons/raw-svgs/finance-icon.svg"
                  />
                </div>
                <div className="col-xl-3 col-lg-3 col-sm-12 col-12 text-center">
                  <img
                    alt={<FormattedMessage id="alt.trustPilotRating" />}
                    src="/assets/icons/raw-svgs/return-icon.svg"
                  />
                </div>
                <div className="col-xl-3 col-lg-3 col-sm-12 col-12 text-center">
                  <img
                    alt={<FormattedMessage id="alt.trustPilotRating" />}
                    src="/assets/icons/raw-svgs/resize-icon.svg"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {isPage && <BreadCrumbsDynamic currentPage={breadCrumbArray} />}
        <div className="container">
          {isPage && (
            <>
              {getStoreType(domain) === "ab" ? (
                <TextCheckBoxButtonPLP
                  checkBoxData={fetures}
                  title={"Choose your style: "}
                  subtitle=""
                  extraClass="full-width-checkbox"
                />
              ) : (
                <SliderFilterDFPlp
                  domain={domain}
                  fetures={fetures}
                  deviceType={deviceType}
                />
              )}
            </>
          )}
        </div>
        <div className="container">
          <div className={`filters-and-sort ${getStoreType(domain)}`}>
            <div className="ab-plp-filter-div content-slider">
              <ContentSlider>
                <FilterswithDropdownPLP
                  selectedFilter={handleFilter}
                  filterData={fetures}
                  filterVal={filterVal}
                  facetList={pdpPlpdata?.facetList}
                  title={"Filter: "}
                  currency={currency}
                  extraClass={"filtering"}
                  isCount={true}
                  featureOptionsPrice={featureOptionsPrice}
                />
              </ContentSlider>
            </div>
            <div className="d-flex align-items-center sort-content">
              <p className="mb-0">
                {plpListingData?.filter((product) => product?.code)?.length}{" "}
                <FormattedMessage id="dfProduct.products" />
              </p>
              <FilterswithDropdownPLPSort
                title={"Sort: "}
                extraClass={"sorting"}
              />
            </div>
          </div>
        </div>
        <div className="container">
          <Box
            display="flex"
            alignItems="center"
            flexWrap={"wrap"}
            gap={3}
            className="mb-5 mt-5"
          >
            {plpUrl?.category !== null && (
              <Box display="flex" alignItems="center" sx={{ height: 20 }}>
                <Typography
                  style={{ textTransform: "capitalize" }}
                  className="mb-0 mr-5"
                >
                  {plpUrl?.category?.split("=")?.[1]}
                </Typography>
                <IconButton>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => onClose()}
                    className="icons-small material-icons-outlined"
                  >
                    close
                  </span>
                </IconButton>
              </Box>
            )}
            {urlQueryData &&
              urlQueryData
                ?.filter((item) => !item.hasOwnProperty("Style"))
                ?.map((data) => {
                  return (
                    Object?.keys(data).join() !== "sort" && (
                      <Box
                        key={Object?.values(data).join()}
                        display="flex"
                        alignItems="center"
                        sx={{ height: 20 }}
                      >
                        <Typography className="mb-0 mr-5">
                          {filterName(data)}
                        </Typography>
                        <IconButton>
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              onQueryClose(
                                Object?.keys(data).join(),
                                Object?.values(data).join()
                              )
                            }
                            className="icons-small material-icons-outlined"
                          >
                            close
                          </span>
                        </IconButton>
                      </Box>
                    )
                  );
                })}
          </Box>
        </div>
        <div
          className={`filters-mobile ${
            showMobileFilters ? "sticky-top" : "sticky-bottom"
          }`}
        >
          <div
            className={`filters-title`}
            onClick={() => setshowMobileFilters(!showMobileFilters)}
          >
            <span className="title">
              <FormattedMessage id="dfList.Filters" />
            </span>
            <span className="material-icons-outlined icons-small">
              {showMobileFilters ? "keyboard_arrow_down" : "keyboard_arrow_up"}
            </span>
          </div>
          <div className={`filters-mobile-details ab-filters-details`}>
            <TextCheckBoxButtonMobilePLP
              selectedFilter={handleFilter}
              filterData={fetures}
              filterVal={filterVal}
              facetList={pdpPlpdata?.facetList}
              featureOptionsPrice={featureOptionsPrice}
              title={"Filter: "}
              currency={currency}
              extraClass={"full-width-checkbox"}
              isCount={true}
              setSelectedFilterData={setSelectedFilterData}
            />
            <div className="mobile-filter-actions">
              <button
                className="btn-link-primary"
                onClick={handleClickSeletedFilter}
              >
                <FormattedMessage id="dfList.selectFilter" />
              </button>
              <button
                className="standard-btn btn-link"
                onClick={handleResetAllFilters}
              >
                <FormattedMessage id="dfList.ResetAll" />
              </button>
            </div>
          </div>
        </div>
        <div className="container">
          <div className={`product-thumb row ${getStoreType(domain)}`}>
            {/* {(loader || load) && <CircularLoader />} */}
            {plpListingData?.map((product, productIndex) => {
              return product?.prodcuctData?.map((item) => {
                const sliderImages = [
                  "/assets/images/product-card-listings.png",
                  "https://ecdn.speedsize.com/c6dfaf12-09d0-4fd2-8a44-fb84acc9094c/static.austenblake.com/image/product_v3/clrn00349/rn0026163/detail/down/ww/di/0001.jpg",
                ];
                return (
                  item?.selected && (
                    <div
                      className={`product-thumb-data ${
                        item?.mediaId
                          ? "banner col-lg-6 col-md-12 col-sm-12 col-xs-12"
                          : "col-lg-3 col-md-6 col-sm-6 col-6"
                      }`}
                      key={item.id}
                    >
                      {product?.code && (
                        <div className="product-top-head">
                          <div>
                            {item.tags ? (
                              <p className="bestseller">{item.tags}</p>
                            ) : null}
                          </div>
                          <div className="favourite">
                            <Button
                              onClick={() => {
                                handleFavourite(product?.code, item?.id);
                              }}
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
                        </div>
                      )}
                      <div className="product-thumb-box">
                        {isMobile ? (
                          <Swiper
                            spaceBetween={50}
                            slidesPerView={1}
                            scrollbar={{ draggable: true }}
                            loop={false}
                          >
                            {sliderImages?.map((src, index) => (
                              <SwiperSlide key={src?.replace(/-/g, ' ') + index}>
                                <img
                                  src={src}
                                  alt={`Slide ${index}`}
                                  style={{ width: "100%", height: "auto" }}
                                />
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        ) : (
                          <Link
                            className="img-wrapper"
                            href={
                              item?.mediaId
                                ? "#"
                                : `/${categoryPath}/design/${item?.variantoptionname
                                    ?.trim()
                                    ?.replace(/\W+/g, "-")
                                    ?.toLowerCase()}-${item.code}`
                            }
                            rel="nofollow"
                            onMouseEnter={() => setHoveredItem(item?.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                          >
                            <div className="default-img">
                              <img
                                src={"/assets/images/product-card-listings.png"}
                                alt={item?.name}
                              />
                            </div>
                            <div className="hover-img">
                              <img
                                src={
                                  "https://ecdn.speedsize.com/c6dfaf12-09d0-4fd2-8a44-fb84acc9094c/static.austenblake.com/image/product_v3/clrn00349/rn0026163/detail/down/ww/di/0001.jpg"
                                }
                                alt={item?.name}
                              />
                            </div>
                          </Link>
                        )}

                        {!item?.mediaId && (
                          <IconRadioButtonPLP
                            radioData={
                              (finalDataResult || finalData)[productIndex]
                                ?.prodcuctData
                            }
                            filterData={fetures}
                            extraClass={"color-variants"}
                            code={item?.id}
                            parentCode={product?.code}
                            onChange={handleChage}
                          />
                        )}
                      </div>
                      <Link
                        href={`/${categoryPath}/design/${item?.variantoptionname
                          ?.trim()
                          ?.replace(/\W+/g, "-")
                          ?.toLowerCase()}-${item.code}`}
                        rel="nofollow"
                      >
                        {item?.variantoptionname && (
                          <h5>{item?.variantoptionname}</h5>
                        )}
                        {(item?.price || item?.fromPrice) && (
                          <p>
                            {item?.fromPrice && (
                              <span className="price-from">
                                <FormattedMessage id="dfProduct.from" />
                              </span>
                            )}
                            <b>
                              {currency}
                              {item?.fromPrice ? item?.fromPrice : item?.price}
                            </b>
                          </p>
                        )}
                      </Link>
                    </div>
                  )
                );
              });
            })}
          </div>
          {mergedInjectionDataServer?.length > productRows && (
            <div className="view-more mb-5 mt-5">
              <button
                className="view-more-btn btn-link-primary"
                onClick={fetchMoreProducts}
              >
                <FormattedMessage id="dfList.ViewMore" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductListingWithApi;

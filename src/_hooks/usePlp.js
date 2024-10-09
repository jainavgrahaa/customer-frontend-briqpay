import { useEffect, useState } from "react";
import { useBreadCrumbs } from "@/_utils";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { merge } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import useAuthHelper from "./useAuthHelper";
import { getCookie } from "cookies-next";
import { TOKEN_KEY } from "@/_utils/userToken";
import { fetchPlpData } from "@/_store/plp.slice";

const usePlp = ({ navigationMedias, breadcrumbData, finalDataServer }) => {
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.auth);
  const { storeId } = userDetails || {};
  const { navigationhierarchyid, translate } = useSelector(
    (state) => state.appconfig
  );

  const [showMobileFilters, setshowMobileFilters] = useState(false);
  const breadCrumbArray = useBreadCrumbs(breadcrumbData);
  const [loader, setLoader] = useState(false);
  const [filterVal, setFilterVal] = useState([]);
  const [finalData, setFinalData] = useState(finalDataServer);
  const [mergedInjectionData, setMergedInjectionData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pathName = usePathname();
  const router = useRouter();
  const { getWishList } = useAuthHelper();
  const userToken = getCookie(TOKEN_KEY);

  const fetchWishList = async () => {
    if (storeId) {
      const res = await getWishList(storeId);
      return res;
    }
  };

  useEffect(() => {
    if (userToken) {
      fetchWishList();
    }
  }, [userToken]);

  const handleFilter = (val) => {
    setLoader(true);
    setFilterVal(val);
    const keys = val.map((e) => Object.keys(e)?.[0]);
    let newpathname = window.location.pathname;

    const newQuery = val.reduce((acc, item) => {
      Object.entries(item).forEach(([key, value]) => {
        if (key === "pricerange") {
          const [minprice, maxprice] = value[0].split("-");
          if (!!Number(minprice)) acc["minprice"] = minprice;
          if (!!Number(maxprice)) acc["maxprice"] = maxprice;
        } else {
          if (acc.hasOwnProperty(key)) {
            acc[key] = `${acc[key]},${value.join(",")}`;
          } else {
            acc[key] = Array.isArray(value) ? value.join(",") : value;
          }
        }
      });
      return acc;
    }, {});
    const updateQueryValues = merge(router.query, newQuery);

    // router.replace({
    //   pathname: pathName,
    //   query: { ...updateQueryValues },
    // });
    const queryParams = Object.entries(updateQueryValues)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    updatePLP(queryParams);

    // Construct the path parameters from updateQueryValues
    const pathParams = Object.entries(updateQueryValues)
      .map(([key, value]) => `${key}=${value}`)
      .join("/");

    // Construct the new URL
    // console.log(newpathname);

    if (!Object.keys(updateQueryValues).length) {
      router.push(newpathname.split("/")[1], undefined, { shallow: true });
    } else {
      const newUrl = `${newpathname.split("/")[1]}/${pathParams}`;
      router.push(newUrl, undefined, { shallow: true });
    }

    // Replace the router path with the new URL

    setLoader(false);
  };

  const updatePLP = (queryParams) => {
    dispatch(
      fetchPlpData({
        navigationhierarchyid,
        transcode: translate?.code,
        params: queryParams && "&" + queryParams,
      })
    );
  };

  const handleChage = (code, id) => {
    const updatedData = finalData?.map((item) => {
      if (item?.code === code?.trim()) {
        return {
          ...item,
          prodcuctData: item.prodcuctData.map((product) => ({
            ...product,
            selected: product.id === id,
          })),
        };
      }
      return item;
    });
    setFinalData([...updatedData]);
  };
  const handleWishList = (code, id) => {
    const updatedData = finalData.map((item) => {
      if (item.code === code) {
        item.prodcuctData.forEach((product) => {
          console.log(
            "finalData",
            product.id === id ? product?.isWishlisted : null,
            code,
            id
          );
          product.isWishlisted =
            product.id === id ? !product.isWishlisted : product.isWishlisted;
        });
      }
      return item;
    });
    setFinalData([...updatedData], navigationMedias);
  };

  const fetchMoreProducts = async () => {
    const newPage = currentPage + 1;
    const rows = 4;
    try {
      const url = getApiUrl(
        `/solr/navigation/filter/search?navigationhierarchyid=${navigationhierarchyid}&transcode=${translate}&rows=${rows}&start=${newPage}`
      );
      const data = await apiService().get(url);
      setMergedInjectionData((prevData) => [...prevData, ...data.newProducts]);
      setCurrentPage(newPage);
    } catch (error) {
      console.error("Error fetching more products:", error);
    }
  };

  useEffect(() => {
    const mergeDataIntoArray = (data, array) => {
      const injectionData =
        data &&
        data.map((item) => ({
          prodcuctData: [{ ...item, selected: true, isWishList: false }],
        }));
      const resultArray = Array.isArray(array) ? [...array] : [];
      for (let i = 0; i < array?.length; i += 5) {
        const dataItem = injectionData[i / 5];
        if (dataItem) {
          resultArray.splice(i + 5, 0, dataItem);
        }
      }

      return resultArray;
    };
    setMergedInjectionData(mergeDataIntoArray(navigationMedias, finalData));
  }, [navigationMedias, finalData]);
  const title = breadCrumbArray?.find((title) => !title?.reqSlash);
  return {
    setshowMobileFilters,
    handleWishList,
    handleChage,
    handleFilter,
    setFilterVal,
    fetchMoreProducts,
    updatePLP,
    title,
    breadCrumbArray,
    loader,
    filterVal,
    mergedInjectionData,
    showMobileFilters,
    finalData,
  };
};

export default usePlp;

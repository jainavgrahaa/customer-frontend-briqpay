import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { getApiUrl } from '@/_utils';
import apiService from '@/_utils/apiService';
import { contentData } from '@/_store/globalSearch.slice';
import { useDispatch } from 'react-redux';
import { usePathname } from 'next/navigation';

const SearchInputField = ({
  toggleComponent,
  setSearchTitle,
  searchTitle,
  modal,
  setserachModal,
  setIsSearchValue,
  setSearchSuggestions,
  cookieToken,
  pageData,
  setLoader,
  setLoading,
  hideProdPageSearch
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [apiLink, setApiLink] = useState("");
  const [text, setText] = useState("");
  const dispatch = useDispatch()

  useEffect(() => {
    const matches = pathname.match(/search\/text=([^/]+)/);
    if (matches && matches[1]) {
      setText(matches[1]);
    }
  }, [pathname]);
  const removeTextParameter = (queryString) => {
    const [path, query] = queryString.split('?');
    if (!query) return queryString;
    const params = new URLSearchParams(query);
    params.delete('text');
    const newQueryString = params.toString();
    return newQueryString;
  }

  const mergeUrlWithParams = (baseUrl, additionalParams) => {
    const urlObj = new URL(baseUrl);
    const additionalParamsObj = new URLSearchParams(additionalParams);
    additionalParamsObj?.forEach((value, key) => {
      urlObj?.searchParams?.append(key, value);
    });
    return urlObj.toString();
  }

  const searchTextApi = async () => {
    try {
      let headersData = {};
      let prodData = '';
      let data = {}
      if (toggleComponent === 2) {
        const url = getApiUrl(`/solr/cmscontent/search/get?text=${searchTitle ?? text}&transcode=en-gb&pagetype=education`);
        data = await apiService().get(url);
      } else {
        const params = await removeTextParameter(router?.asPath)
        const newUrl = mergeUrlWithParams(apiLink, params);
        headersData = cookieToken ? { headers: { Authorization: `Bearer ${cookieToken}` } } : {};
        prodData = await fetch(newUrl, headersData);
        data = await prodData.json();
      }
      if (data && toggleComponent !== 2) {
        const pdpPlpdata = data;
        const plpListingData =
          pdpPlpdata?.expandedData &&
          Object?.entries(pdpPlpdata?.expandedData)?.map(([code, details]) => {
            return details?.docs.map((doc) => {
              return {
                ...(!!doc.id && { id: doc.id }),
                ...(!!doc.bandwidth && { bandwidth: doc.bandwidth }),
                ...(!!doc.ringsize && { ringsize: doc.ringsize }),
                ...(!!doc.stonetype && { stonetype: doc.stonetype }),
                ...(!!doc.settingtype && { settingtype: doc.settingtype }),
                ...(!!doc.carat && { carat: doc.carat }),
                ...(!!doc.color && { color: doc.color }),
                ...(!!doc.stoneshape && { stoneshape: doc.stoneshape }),
                ...(!!doc.code && { code: doc.code }),
                ...(!!doc.name && { name: doc.name }),
                ...(!!doc.variantoptionname && {
                  variantoptionname: doc.variantoptionname,
                }),
                ...(!!doc.navigationhierarchyid && {
                  navigationhierarchy: doc.navigationhierarchyid,
                }),
                ...(!!doc.tags && { tags: doc.tags }),
                ...(!!doc.transcode && { transcode: doc.transcode }),
                price: Array.isArray(doc.price) ? doc.price[0] || {} : doc.price || {},
                fromprice: Array.isArray(doc.fromprice) ? doc.fromprice[0] || {} : doc.fromprice || {},
                collectionid: Array.isArray(doc.collectionid) ? doc.collectionid[0] || {} : doc.collectionid || {},
                ...(!!doc.metal && { metal: doc.metal }),
                ...(!!doc.image && { image: doc.image }),
                selected: false,
              };
            });
          });

        const mergeData = (expendedData, collapseData) => {
          const mergedData = [];
          collapseData?.forEach((collapseItem) => {
            const matchingExpended =
              expendedData.find((expendedArray) => {
                return expendedArray.some(
                  (expendedItem) => expendedItem.code === collapseItem.code
                );
              }) ?? [];
            if (matchingExpended) {
              const mergedItem = {
                code: collapseItem?.code,
                prodcuctData: [{ ...collapseItem, selected: true }, ...matchingExpended],
              };

              const includedMetal = [];
              // added that only unique variants are rendered
              const filterData = mergedItem.prodcuctData.filter(({ metal }, i, ar) => {
                if (!includedMetal.includes(metal)) {
                  const ob = ar.some((item) => item.metal === metal);
                  if (!ob) {
                    return;
                  }
                  includedMetal.push(metal);
                  return ob;
                }
                return;
              });
              mergedData.push({
                code: mergedItem.code,
                // add upto 4 variants
                prodcuctData: filterData.slice(0, 4),
              });
            }
          });

          return mergedData;
        };
        const mergeDataIntoArray = (data, array) => {
          const injectionData =
            data &&
            data?.map((item) => ({
              prodcuctData: [{ ...item, selected: true }],
            }));
          const resultArray = [...array];
          for (let i = 0; i < array?.length; i += 5) {
            const dataItem = injectionData?.[i / 5];
            if (dataItem) {
              resultArray?.splice(i + 5, 0, dataItem);
            }
          }
          return resultArray;
        };

        const plpData = mergeData(plpListingData, pdpPlpdata?.collapsedData);
        const mergedInjectionData = mergeDataIntoArray(pageData?.navigationMedias, plpData);
        return mergedInjectionData;
      }
      return data?.cmsContentData || [];
    } catch {
      (e) => {
        console.log(e);
      }
    }
  };

  const handleSearchKeyPress = async (e) => {
    if (e?.key === 'Enter') {
      if (!apiLink && toggleComponent !== 2) {
        dispatch(contentData([]))
        router.push(
          {
            pathname: `search/text=${searchTitle}`
          }
        );
        setserachModal(false);
        setLoading(false);
      }
      else {
        const response = await searchTextApi();
        if (response) {
          dispatch(contentData(response));
        }
        router.push(
          {
            pathname: `search/text=${searchTitle}`
          }
        );
        setserachModal(false);
        setLoading(false);
      }
    } else if (toggleComponent && apiLink) {
      const response = await searchTextApi({ apiLink });
      if (response) {
        dispatch(contentData(response));
      }
    }
  };

  const fetchSearchSuggestions = async (searchText) => {
    let url = '';
    if (toggleComponent === 2) {
      url = getApiUrl(`/solr/cmscontent/search/get?text=${searchText ?? text}&transcode=en-gb&pagetype=education`);
    } else {
      url = getApiUrl(`/solr/collection/search/suggest?text=${searchText ?? text}&transcode=en-gb`);
    }

    try {
      const data = await apiService().get(url);
      let suggestions = [];
      let links = []
      if (toggleComponent === 2) {
        suggestions = data?.cmsContentData || [];
        dispatch(contentData(suggestions));
      }
      else {
        suggestions = data?.data?.nameSuggester?.[searchText]?.suggestions || [];
        links = data?.links;
        setApiLink(links[0])
      }
      setSearchSuggestions(suggestions.map((s) => ({ label: s?.term || s?.title })));
      setLoader(false);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setLoader(false);
    }
  };

  const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  };

  const debouncedFetchSuggestions = useCallback(
    debounce((searchText) => {
      fetchSearchSuggestions(searchText);
    }, 500),
    []
  );

  useEffect(() => {
    if (searchTitle?.length >= 3) {
      debouncedFetchSuggestions(searchTitle);
      setIsSearchValue(true)
      setLoader(true);
    } else {
      setIsSearchValue(false)
      setLoader(false)
      setSearchSuggestions([]);
    }
  }, [searchTitle]);
  const handleInputFocus = (item) => {
    setserachModal(item)
  };

  useEffect(() => {
    const autoHitFunction = async() => {
      await fetchSearchSuggestions(text)
    }
    autoHitFunction();
    handleSearchKeyPress()
  }, [text, toggleComponent])

  return (
    <div className="search-input">
      <span className="material-icons-outlined">search</span>
      {toggleComponent === 2 && hideProdPageSearch ? (
        <input
          type="text"
          value={decodeURIComponent(searchTitle ?? text)}
          onChange={(e) => setSearchTitle(e.target.value)}
          onKeyDown={handleSearchKeyPress}
          onFocus={modal === false ? "" : () => handleInputFocus(true)}
        />
      ) :
        <input
          type="text"
          value={decodeURIComponent(searchTitle ?? text)}
          onChange={(e) => setSearchTitle(e.target.value)}
          onKeyDown={handleSearchKeyPress}
          onFocus={modal === false ? "" : () => handleInputFocus(true)}
        />
      }
    </div>
  )
}

export default SearchInputField
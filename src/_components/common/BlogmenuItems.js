import React, { useEffect, useRef, useState, useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { Router, useRouter } from "next/router";
import { Button, CircularProgress } from "@mui/material";
import Head from "next/head";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import apiService from "@/_utils/apiService";
import { TextField } from "@mui/material";
import Link from "next/link";
import { getApiUrl } from "@/_utils";
import CircularLoader from "./loader/circular-loader";
import { usePathname } from "next/navigation";
import useDeviceHelper from "@/_hooks/useDeviceHelper";
const searchTextInNavigationSection = async ({ searchData, storeId, path }) => {
  const url = getApiUrl(
    `/solr/cmscontent/search/get?text=${searchData}&transcode=en-gb&pagetype=blog&storeid=${storeId}`
  );
  try {
    const blogData = await apiService().get(url);
    return blogData;
  } catch {}
};

const BlogmenuItems = ({
  activeBlogType,
  blogCategories,
  storeId,
  setItems,
  searchString,
  setSearchString,
  item,
  storeTypes,
  domain,
}) => {
  const ref = useRef(null);
  const router = useRouter();
  const [searchVisibility, setSearchVisibility] = useState(false);
  const [searchAsDefault, setSearchAsDefault] = useState(false);
  const [load, setLoad] = useState(false);

  Router.events.on("routeChangeStart", () => {
    setLoad(true);
  });
  Router.events.on("routeChangeComplete", () => {
    setLoad(false);
  });
  Router.events.on("routeChangeError", () => {
    setLoad(false);
  });

  // useEffect(() => {
  //   const firstRender = ref.current;
  //   if (firstRender) {
  //     const blogContainerWidth =
  //       ref.current.parentNode.getBoundingClientRect().width;
  //     var blogListWidth = 0;

  //     [...ref.current.children].map((elem) => {
  //       blogListWidth += elem.getBoundingClientRect().width;
  //     });
  //     if (blogListWidth > blogContainerWidth - 400) {
  //       setSearchVisibility(false);
  //       setSearchAsDefault(false);
  //     } else {
  //       setSearchVisibility(true);
  //       setSearchAsDefault(true);
  //     }
  //   }
  // }, []);

  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const debouncedSearchInput = useCallback(
    async (searchData) => {
      setLoading(true);
      try {
        if (searchData) {
          const res = await searchTextInNavigationSection({
            searchData,
            storeId,
            path: pathname.split("/").at(1),
          });

          if (res && res.cmsContentData && res.cmsContentData.length > 0) {
            setItems(res.cmsContentData);
          } else {
            setItems([]);
          }
        } else {
          setItems([]);
        }
      } catch (error) {
        setItems([]);
      }

      setLoading(false);
    },
    [pathname, setItems, storeId]
  );

  const handleSearchBlog = (event) => {
    setSearchString(event?.target?.value);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!searchString) {
        setItems([]);
      } else {
        debouncedSearchInput(searchString);
      }
    }, 500); 

    return () => clearTimeout(timeoutId);
  }, [debouncedSearchInput, searchString, setItems]);

  useEffect(() => {
    const { text } = router.query;
    if (text && pathname === "/blog") {
      setSearchString(text);
    } else {
      // setSearchString("");
    }
  }, [router]);

  useEffect(() => {
    setLoading(true);
    if (selectedOption && item) {
      const matchBlogdata = item?.cmsContentData?.find(
        (data) => data?.name ?? data?.title === selectedOption
      );

      if (matchBlogdata) router.push(matchBlogdata?.url);
    }
    setLoading(false);
  }, [selectedOption, item, router]);
  const { deviceType } = useDeviceHelper();
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/assets/css/blog.css" />
      </Head>
      <div className="blog-container">
        {load && <CircularLoader />}
        <div className={`block-navbar position-relative fixed-container ${searchVisibility ? "search-active" : ""}`}>
          <div className="nav-menu" ref={ref}>
            <Link
              scroll={false}
              href={
                router?.asPath.substring(1)?.split("/")[0] ||
                router?.asPath.substring(1)
              }
              className={`nav-item ${
                blogCategories?.filter((a) => a.isSelected)?.length === 0
                  ? "active"
                  : ""
              }`}
            >
              <FormattedMessage id="blog.defaultTab" />
            </Link>
            {blogCategories?.map((category, index) => (
              <Link
                scroll={false}
                href={category?.urlSlug}
                key={index}
                className={`nav-item ${category?.isSelected ? "active" : ""}`}
              >
                {category.title || category.name}
              </Link>
            ))}
          </div>
          {(storeTypes[domain] === "df" && !searchVisibility) && (
            <Button
              className="blogs-search"
              onClick={() => {
                setSearchVisibility(true);
              }}
            >
              <span className="icons-small material-icons-outlined blog-search-icon">
                search
              </span>
            </Button>
          )}
          {((storeTypes[domain] === "df" && searchVisibility) || (storeTypes[domain] === "ab")) && (
            <div
              className={`blogsearch-popup`}
            >
              <Stack spacing={2} sx={{ width: "100%" }}>
                <Autocomplete
                  options={
                    open &&
                    item &&
                    searchString &&
                    searchString?.length > 3 &&
                    item.length > 0 
                      ? [
                          {
                            name: "Search suggestions",
                            url: "",
                            disabled: true,
                          },
                          ...item,
                        ]
                      : []
                  }
                  isOptionEqualToValue={(option, value) =>
                    option?.name === value?.name
                  }
                  getOptionLabel={(option) => option?.name ?? option?.title}
                  isOptionDisabled={(option) => option.disabled || false}
                  autoComplete="on"
                  inputValue={searchString || selectedOption || ""}
                  onChange={(event, newValue) => {
                    setSelectedOption(newValue);
                    if (newValue) {
                      setLoading(true);
                      router.push(newValue?.url ?? newValue?.urlslug);
                      setLoading(false);
                    }
                  }}
                  getOptionDisabled={(option) =>
                    option.name === "Search suggestions" 
                  }
                  open={
                    open && item && item?.length > 0 && searchString?.length > 3
                  }
                  onOpen={() => {
                    setOpen(true);
                  }}
                  onClose={() => {
                    setOpen(false);
                  }}
                  autoHighlight
                  inputMode="text"
                  openOnFocus={false}
                  includeInputInList={false}
                  filterOptions={(options) => options}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          setLoading(false);
                          router.push({
                            pathname: "/blog",
                            query: { text: searchString },
                          });
                        }
                      }}
                      label="Search"
                      onChange={(event) => handleSearchBlog(event)}
                      onBlur={() => {
                        setItems([]);
                      }}
                      InputProps={{
                        ...params.InputProps,
                        autoComplete: "off",
                        endAdornment: (
                          <React.Fragment>
                            {!load &&loading && (
                              <CircularProgress color="inherit" size={20} />
                            )}
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                        ),
                      }}
                      value={searchString}
                      loading={!load && loading}
                    />
                  )}
                  noOptionsText={item?.length === 0 &&" No Result Found"}
                />

                <span className="material-icons-outlined icon-left-position">
                  search
                </span>
                {(storeTypes[domain] === "df" && searchVisibility) && (
                  <Button
                    className="search-close"
                    onClick={() => setSearchVisibility(false)}
                  >
                    <span className="material-icons-outlined icon-right-position">
                      close
                    </span>
                  </Button>
                )}
              </Stack>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogmenuItems;

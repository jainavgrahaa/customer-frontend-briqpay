import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { FormattedMessage } from "react-intl";
import useDebounce from "@/_hooks/useDebounce";
import { checkArrayIteration, getApiUrl } from "@/_utils";
import apiService from "@/_utils/apiService";
import { CircularProgress, TextField } from "@mui/material";

const searchTextInNavigationSection = async ({
  searchData,
  storeId,
  path,
}) => {
  const url = getApiUrl(
    `/solr/cmscontent/search/get?text=${searchData}&transcode=en-gb&pagetype=${path ? 'faq' : 'education'}&storeid=${storeId}`
  );
  try {
    return await apiService().get(url);
  } catch { }
};

const SearchInputEducationBlock = ({ storeId, educationDefaultList, faqDefaultList }) => {
  const pathname = usePathname()
  const isFaq = pathname?.includes('faqs')
  const defaultList = isFaq ? faqDefaultList : educationDefaultList
  const educationDefatultArray = defaultList?.filter((data) => {
    return data?.urlSlug?.split("/").length > 1;
  });

  const router = useRouter();
  const currentPath = router?.asPath;

  const [loading, setLoading] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [items, setItems] = useState(
    educationDefatultArray?.length > 0 ? educationDefatultArray : []
  );
  const [noResults, setNoResults] = useState(false);
  const searchInput = useDebounce(async (searchData) => {
    setNoResults(false)
    if (searchData || searchData !== searchString) {
      setSearchString(searchData);
      setLoading(true)
      const res = await searchTextInNavigationSection({
        searchData,
        storeId,
        path: isFaq,
      });
      if (res && res?.cmsContentData.length > 0) {
        const filterData = res?.cmsContentData?.filter((data) => {
          return data?.urlslug;
        });
        setItems(filterData);
      } else {
        setNoResults(true)
        setItems(educationDefatultArray);
      }
    }
    setLoading(false);
  }, 1000);

  const handleChange = (e) => {
    searchInput(e.target.value);
  }
  return (
    <section className="about-us-block">
      <div className="container" style={{ padding: "0px !important" }}>
        <div className="search-sec">
          <div className="input-group">
            <TextField
              type="text"
              label={<FormattedMessage id="common.search" />}
              variant="standard"
              onChange={handleChange}
              sx={{ width: '100%' }}
              InputProps={{
                endAdornment: <span className="material-icons-outlined">search</span>,
              }}
            />
          </div>
        </div>
        {searchString !== "" && noResults && <small style={{ margin: "15px 0 20px", display: "block" }}><FormattedMessage id="common.noresults" /></small>}

        <div className="guide-sec">
          <div className="container education-guide ">
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "3rem",
                }}
              >
                <CircularProgress />
              </div>
            ) : (
              <div className="row">
                {checkArrayIteration(items) &&
                  items?.map((item) => {
                    return (
                      <div className={"sub-page"} key={item.title}>
                        <Link
                          href={item?.urlSlug ?? item?.urlslug}
                          className={
                            currentPath === "/" + item?.urlSlug ?? item?.urlslug
                              ? "page-title selected-text"
                              : "page-title"
                          }
                        >
                          {item?.name || item.title}
                        </Link>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchInputEducationBlock;

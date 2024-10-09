import { wishlist } from "@/_utils/customApiData";
import { useState, useEffect } from "react";
import { stepCheck } from "@/_utils";
import { useRouter } from "next/router";
import BreadCrumbs from "@/_components/common/breadcrumbs";
import Link from "next/link";
import ProductListingWithApi from "@/_components/dynamicLayout/product-listing-with-api";
import Search from "./Search";
import SearchInputField from "@/_components/atoms/InputField/searchInputField";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { storeTypes } from "@/_utils";

const Product = ({
  pageName,
  pageData,
  cookieToken,
  domain,
  fetures,
  ...props
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [serachModal, setserachModal] = useState(false);
  const [searchTitle, setSearchTitle] = useState(null);
  const [toggleComponent, setToggleComponent] = useState(1);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [prodData, setProdData] = useState([]);
  const [isSearchValue, setIsSearchValue] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [loader, setLoader] = useState(false);
  const [text, setText] = useState("");
  const { contentData } = useSelector((state) => state?.globalSearch);

  const switchComponent = (index) => {
    setToggleComponent(index);
  };

  useEffect(() => {
    const url = router.asPath;
    const matches = pathname.match(/search\/text=([^/]+)/);
    if (matches && matches[1]) {
      setText(matches[1]);
    }
  }, [router.asPath]);
  useEffect(() => {
    setPosts(wishlist);
  }, []);
  useEffect(() => {
    setProdData(contentData);
  }, [contentData]);
  return (
    <>
      <div className={`${storeTypes[domain] === "df" ? "cream pt-5" : ""}`}>
        <div className="toggle-wrap container">
          <BreadCrumbs currentPage={pageName} className={"mt-0"} />
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <SearchInputField
                toggleComponent={toggleComponent}
                setserachModal={setserachModal}
                searchTitle={searchTitle}
                setSearchTitle={setSearchTitle}
                setContentData={setProdData}
                setIsSearchValue={setIsSearchValue}
                isSearchValue={isSearchValue}
                setSearchSuggestions={setSearchSuggestions}
                searchSuggestions={searchSuggestions}
                cookieToken={cookieToken}
                pageData={pageData}
                setLoader={setLoader}
                loader={loader}
                setLoading={setLoading}
              />
              <Search
                toggleComponent={toggleComponent}
                setToggleComponent={setToggleComponent}
                setContentData={setProdData}
                loading={loading}
                setLoading={setLoading}
                serachModal={serachModal}
                searchData={searchTitle}
                setserachModal={setserachModal}
                hideProdPageSearch={true}
                setIsSearchValue={setIsSearchValue}
                isSearchValue={isSearchValue}
                setSearchSuggestions={setSearchSuggestions}
                searchSuggestions={searchSuggestions}
                cookieToken={cookieToken}
                pageData={pageData}
                setLoader={setLoader}
                loader={loader}
              />
            </div>

            <div className="col-lg-4 col-md-2"></div>

            <div className="col-lg-4 col-md-4">
              <ul className="heading_menu bloc-tabs-heading">
                <li
                  className={
                    stepCheck(toggleComponent, 1) ? "tabs active-tabs" : "tabs"
                  }
                  onClick={() => switchComponent(1)}
                >
                  <input className="radio-input" type="radio" />
                  <span className="custom-radio" />
                  Products
                </li>
                <li
                  className={
                    stepCheck(toggleComponent, 2) ? "tabs active-tabs" : "tabs"
                  }
                  onClick={() => switchComponent(2)}
                >
                  <input className="radio-input" type="radio" />
                  <span className="custom-radio" />
                  Content
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          className={`container toggle-content wishlist_page ${
            storeTypes[domain] === "df" ? "cream" : ""
          }`}
        >
          <div
            className={
              stepCheck(toggleComponent, 1)
                ? "content  active-content"
                : "content"
            }
          >
            {text && (
              <h3 className="count-api-numbers">
                We found <b>{prodData?.length}</b> results for{" "}
                <b>“{decodeURIComponent(text)}”</b>
              </h3>
            )}
            <ProductListingWithApi
              {...props}
              mergedInjectionData={prodData}
              finalDataResult={prodData}
              isPage={false}
              fetures={fetures}
            />
          </div>

          <div
            className={
              stepCheck(toggleComponent, 2)
                ? "content  active-content content-page"
                : "content"
            }
          >
            {text && (
              <h3 className="count-api-numbers">
                We found <b>{prodData?.length}</b> results for <b>“{text}”</b>
              </h3>
            )}
            <div className="d-flex flex-wrap">
              {loading ? (
                <h4>Loading ...</h4>
              ) : (
                prodData.map((content) => {
                  return (
                    <div className="wishlistData" key={content.title}>
                      <Link href={`/${content?.urlslug}`}>
                        <h4>{content.title}</h4>
                      </Link>
                      <p>{content.description}</p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;

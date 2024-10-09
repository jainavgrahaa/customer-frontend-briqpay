/* eslint-disable @next/next/no-css-tags */
import DynamicLayout from "@/_components/dynamicLayout";
import Error from "next/error";
import Seo from "@/_components/common/Seo";
import {
  domainSelection,
  getLayoutData,
  getStoreID,
  getDevice,
  parseFooterData,
  parseHeaderData,
  parsePageData,
  storeTypes,
  calculateTimeLeft,
  getApiUrl,
  parsePDPData,
  checkIsFlag,
  getCartData,
  getCartService,
  mergeCartData,
  getAuthToken,
  getDataForPageUrlService,
  sortedSequence,
} from "@/_utils";
import DFHeader from "@/layout/DFHeader";
import Head from "next/head";
import DFFooter from "@/layout/DFFooter";
import ABHeader from "@/layout/ABHeader";
import ABFooter from "@/layout/ABFooter";
import { cartDataResponse } from "@/_utils/cartdata-response";
import { useEffect } from "react";
import { getCookie, setCookie } from "cookies-next";
import { TOKEN_KEY } from "@/_utils/userToken";
import { useDispatch } from "react-redux";
import {
  updateNavigationhierarchyid,
  updateTranslate,
  updateDeliveryMessage,
  updatePageData,
  updateStoreData,
} from "@/_store/appconfig.slice";
// const DynamicComponent2WithCustomLoading = dynamic(
//   () => import('@/layout/ABFooter'),
//   { loading: () => <p>Loading caused by client page transition ...</p> }
// )

function checkValidXMLURL(pathnames) {
  let valid = false;
  for (var index = 0; index < pathnames.length; index++) {
    var name = pathnames[index];
    /(.xml|y)$/.test(name) ? (valid = true) : (valid = false);
  } //End of for loop
  return valid;
}

export async function getServerSideProps({ params, req, query, locale, res }) {
  // res.setHeader(
  //   "Cache-Control",
  //   "public, s-maxage=30, stale-while-revalidate=59"
  // );

  // // Set cache control header for 20 minutes (1200 seconds)
  // res.setHeader(
  //   "Cache-Control",
  //   "public, s-maxage=1200, stale-while-revalidate=59"
  // );

  let cookieToken = req?.cookies?.["token"];

  const hostname = req?.headers?.host; // This gives you the hostname
  const deviceTypeServer = getDevice(req?.headers["user-agent"]);

  // Get navigation in array form, supported by NextJs Navigation
  const pageNavigationArray = params?.urlSlug;
  const domain = domainSelection[hostname];
  let featureOptionsPrice = [];
  let isPdp = true;
  let pdpPayloadData;
  let pageData;
  let pageIsDynamic = false;
  let pageRootUrl = "";
  let isPDPPage = false;

  /*enable this if xmls are generated
  const validXML = (pageNavigationArray?.length) ? checkValidXMLURL(pageNavigationArray) : false;
  if(validXML){
    const apiPageDataUrl = `https://user1693298217290.requestly.tech/${storeTypes[domain]}-sitemap`
    const XMLResponse = await fetch(apiPageDataUrl, {method: "GET"});
    const sitemap = await XMLResponse.json();
    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();
    return { props: {} };
  }
  */

  try {
    const {
      storeId,
      storeName,
      storeObjectId,
      expireTime,
      message,
      link: headerLink,
      currency,
      defaultTranslate,
      translateCode,
      email,
      phoneNumber,
    } = await getStoreID(domain);
    cookieToken = !cookieToken ? await getAuthToken(domain) : cookieToken;
    const dhms = calculateTimeLeft(expireTime);

    let pdpPlpdata = {};
    let pageLocal =
      locale !== "en-default" && locale !== translateCode ? locale : null;
    // 1. Get page details if page exists or not
    // engagement-rings/solitare
    pageData = await getDataForPageUrlService(
      storeId,
      pageNavigationArray,
      pageLocal,
      cookieToken
    );

    if (pageData) {
      pageIsDynamic = checkIsFlag(pageData?.isDynamic);
      // This logic is entirely for PDP
      if (pageData?.blockTemplate?.type === "productDetail") {
        const apiUrlCollectionDetails = getApiUrl(`/collection-detailsv2`);
        pdpPayloadData = {
          featureGroupId: "f1461f0a-990d-45f2-8254-60f775480ab4",
          translateId: pageData?.translateId || {},
          navigationHierarchyId: pageData?.id,
          storeId,
          code: pageNavigationArray.at(-1).split("-").at(-1),
          slug: pageNavigationArray?.join("/"),
        };
        try {
          const pdpData = await fetch(apiUrlCollectionDetails, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: pdpPayloadData ? JSON.stringify(pdpPayloadData) : "",
          });
          isPdp = true;
          pdpPlpdata = await pdpData.json();
          isPDPPage = true;
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else if (
        pageData?.blockTemplate?.type === "productList" ||
        pageData?.blockTemplate?.type === "quickDeliveryList"
      ) {
        let featureOptionPayload = "";
        // 4. From parent navigation match feature options with url as per sequence
        // style -> halo ring, solitare, trilogy
        // metal -> silver, gold
        if (pageData) {
          featureOptionsPrice = sortedSequence(pageData?.priceBuckets)?.map(
            (ite) => {
              const findLabel = ite?.priceBucketTranslates?.find((i) => {
                return i?.translateId === pageData?.translateId;
              });
              return {
                name: `${ite?.min}-${ite?.max}`,
                label: findLabel?.label ?? `${ite?.min}-${ite?.max}`,
                featureOptionType: "range",
              };
            }
          );
          let featureGroupData = sortedSequence(pageData?.featureGroup);
          let checkPageNavigation = "";
          featureGroupData?.forEach((feature, i) => {
            const findOption = feature?.featureOptions.find((data) =>
              pageNavigationArray.includes(data?.slugKey)
            );
            if (findOption) {
              checkPageNavigation += `${findOption?.name}/`;
              featureOptionPayload += `&${feature?.name?.toLowerCase()}=${findOption?.name
                }`;
            }
          });

          const editPageNavigationArray = pageNavigationArray
            ?.slice(1)
            ?.join("/");

          // 5. add redirect nav to check sequence
          const redirectNav = checkPageNavigation
            ?.toLocaleLowerCase()
            .slice(0, -1);

          let queryParamsPlp;
          if (query) {
            const { urlSlug, ...filteredQuery } = query;
            queryParamsPlp = Object.entries(filteredQuery)
              .map(([key, value]) => `&${key}=${value.trim()}`)
              ?.join("");
          }

          let apiPageDataUrl = "";
          let isQuickDelivery;
          if (pageData?.isQuickDelivery) {
            isQuickDelivery = pageData?.isQuickDelivery;
          }
          apiPageDataUrl = getApiUrl(
            `/solr/navigation/filter/search?navigationhierarchyid=${pageData?.id
            }&transcode=${pageData?.translate?.code}${featureOptionPayload || ""
            }${queryParamsPlp || ""}${isQuickDelivery ? `&isQuickDelivery=${isQuickDelivery}` : ""
            }`
          );

          isPdp = false;
          const headers = {
            Authorization: `Bearer ${cookieToken}`,
            "Content-Type": "application/json",
          };

          const checkUrlSlr = await fetch(apiPageDataUrl, {
            method: "GET",
            headers: headers,
          });
          pdpPlpdata = await checkUrlSlr.json();
        }
      } else if (
        pageData?.blockTemplate?.type === "blog") {
          let urlSlug
        if (query?.urlSlug) {
          urlSlug = Array.isArray(query?.urlSlug) ? query.urlSlug.join('/') : '';
        }

        try {
          const blogSearchURL = getApiUrl(
            `/solr/cmscontent/search/get?text=${query?.text ?? '*'}&transcode=${pageData?.translate?.code}&pagetype=${urlSlug}&storeid=${storeId}`
          );

          const blogResults = await fetch(blogSearchURL, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!blogResults.ok) {
            throw new Error(`Failed to fetch blog results. Status: ${blogResults.status}`);
          }

          const result = await blogResults.json();

          if (result?.cmsContentData) {
            pageData = pageData || {}; 
            pageData.blogData = pageData.blogData || {}; 

            pageData.blogData.blogResults = result.cmsContentData;
          } else {
            console.warn("No cmsContentData found in the response.");
          }

        } catch (error) {
          console.error("Error fetching or processing blog results:", error.message);
        }

      }
    }

    const educationPageRedirect = !!pageData?.educationDefaultList?.length;
    //check default education page or not. if yes then refirect to first child page
    if (
      educationPageRedirect &&
      pageData?.blockTemplate?.type === "education" &&
      pageNavigationArray.length === 1
    ) {
      let findFirstEducationPage;
      if (pageData?.educationDefaultList) {
        findFirstEducationPage = pageData?.educationDefaultList[0]?.urlSlug;
      }
      return {
        redirect: {
          permanent: false,
          destination: `/${findFirstEducationPage}`,
        },
      };
    }

    const faqPageRedirect = !!pageData?.faqDefaultList?.length;
    //check default education page or not. if yes then refirect to first child page
    if (
      faqPageRedirect &&
      pageData?.blockTemplate?.type === "faq" &&
      pageNavigationArray.length === 1
    ) {
      let findFirstFaqPage;
      if (pageData?.faqDefaultList) {
        findFirstFaqPage = pageData?.faqDefaultList[0]?.urlSlug;
      }

      return {
        redirect: {
          permanent: false,
          destination: `/${findFirstFaqPage}`,
        },
      };
    }

    pageIsDynamic = checkIsFlag(pageData?.isDynamic);

    //error code
    if (
      pageData?.error?.statusCode === 422 ||
      pageData?.error?.statusCode === 500
    ) {
      return {
        notFound: true,
      };
    }

    if (pageData?.error?.statusCode === 404) {
      throw new Error("Page not found");
    }

    const [getHeaderData, getFooterData] = await Promise.all([
      getLayoutData(pageData?.siteComponentHeaderId, cookieToken),
      getLayoutData(pageData?.siteComponentFooterId, cookieToken),
    ]);
    const parsedPageData = parsePageData(pageData);

    const parsedHeaderData = JSON.parse(
      JSON.stringify(parseHeaderData(getHeaderData, pageLocal))
    );
    const parsedFooterData = JSON.parse(
      JSON.stringify(parseFooterData(getFooterData, pageLocal))
    );
    let parsedPDPData = {};
    if (pageIsDynamic) {
      parsedPDPData = isPdp ? parsePDPData(pdpPlpdata) : pdpPlpdata;
    }
    let cartData = cartDataResponse;

    try {
      cartData = await getCartData(
        pageData?.translateId ?? defaultTranslate,
        cookieToken
      );
      if (!cartData) {
        const serviceData = await Promise.all(
          cartData?.orderLineItems?.map(
            async (item) =>
              await getCartService(
                storeObjectId,
                item.id,
                cookieToken,
                pageData?.translateId ?? defaultTranslate
              )
          )
        );
        mergeCartData(cartData?.orderLineItems, serviceData);
      }
    } catch {
      // return {
      //   props: {
      //     pageData: {},
      //     domain: domain || "",
      //     deviceTypeServer,
      //     pdpPlpdata: pdpData || "",
      //     cartData: cartDataResponse,
      //   },
      // };
    }
    let plpData = {};
    let mergedInjectionData = {};
    if (pdpPlpdata) {
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
              price: Array.isArray(doc.price)
                ? doc.price[0] || {}
                : doc.price || {},
              fromprice: Array.isArray(doc.fromprice)
                ? doc.fromprice[0] || {}
                : doc.fromprice || {},
              collectionid: Array.isArray(doc.collectionid)
                ? doc.collectionid[0] || {}
                : doc.collectionid || {},
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
              prodcuctData: [
                { ...collapseItem, selected: true },
                ...matchingExpended,
              ],
            };

            const includedMetal = [];
            // added that only unique variants are rendered
            const filterData = mergedItem.prodcuctData.filter(
              ({ metal }, i, ar) => {
                if (!includedMetal.includes(metal)) {
                  const ob = ar.some((item) => item.metal === metal);
                  if (!ob) {
                    return;
                  }
                  includedMetal.push(metal);
                  return ob;
                }
                return;
              }
            );
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

      plpData = mergeData(plpListingData, pdpPlpdata?.collapsedData);
      mergedInjectionData = mergeDataIntoArray(
        pageData?.navigationMedias,
        plpData
      );
    }

    let hrefLang = [];
    try {
      const hrefLangRes = await fetch(
        getApiUrl(
          `/navigation-hierarchy/getAllTranslatedSlugs?navigationHierarchyId=${pageData?.id}`
        ),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      hrefLang = await hrefLangRes.json();
    } catch (error) {
      console.log(error);
    }

    return {
      props: {
        pageData: parsedPageData,
        isPDPPage: isPDPPage,
        getHeaderData: parsedHeaderData,
        getFooterData: parsedFooterData,
        domain: domain || "",
        deviceTypeServer: deviceTypeServer || "",
        expireTime: expireTime || "",
        dhms: dhms || {},
        message: message || " ",
        headerLink: headerLink || "",
        storeId: storeId || "",
        storeName: storeName || "",
        storeObjectId: storeObjectId || "",
        pdpPlpdata: pageIsDynamic ? parsedPDPData : {},
        isDynamic: pageIsDynamic,
        pdpPayloadData:
          pageIsDynamic && pdpPayloadData && isPdp ? pdpPayloadData : {},
        currency: currency || "",
        translateId: pageData?.translateId ?? defaultTranslate ?? "",
        cartData: cartData || {},
        cookieToken: cookieToken || "",
        pageNavigationRootUrl: pageRootUrl || "",
        plpData: plpData,
        mergedInjectionData: mergedInjectionData,
        featureOptionsPrice: featureOptionsPrice || [],
        hrefLang: hrefLang,
        email: email,
        phoneNumber: phoneNumber,
      },
    };
  } catch {
    return {
      redirect: {
        destination: "/500",
        permanent: false,
      },
    };
  }
}

export default function DynamicLayoutPage({
  pageData,
  isPDPPage,
  getHeaderData,
  getFooterData,
  domain,
  deviceTypeServer,
  expireTime,
  dhms,
  message,
  headerLink,
  storeId,
  storeName,
  storeObjectId,
  isDynamic,
  pdpPlpdata,
  plpData,
  mergedInjectionData,
  pdpPayloadData,
  currency,
  translateId,
  cartData,
  cookieToken,
  pageNavigationRootUrl,
  featureOptionsPrice,
  hrefLang,
  email,
  phoneNumber,
}) {
  const dispatch = useDispatch();
  const metaTitle = !isPDPPage
    ? pageData?.title
    : pageData?.shortDescription ?? "";

  useEffect(() => {
    if (pageData) {
      dispatch(updatePageData(structuredClone(pageData)));
    }
    dispatch(
      updateStoreData({
        email,
        phoneNumber,
      })
    );
    dispatch(updateNavigationhierarchyid(pageData?.id));
    dispatch(updateTranslate(pageData?.translate));
    dispatch(updateDeliveryMessage(pageData?.deliveryMessage));
  }, [pageData]);

  useEffect(() => {
    if (!getCookie(TOKEN_KEY) && cookieToken) {
      setCookie(TOKEN_KEY, cookieToken);
    }
  }, [cookieToken]);
  if (pageData?.error?.statusCode) {
    return <Error statusCode={pageData?.error?.statusCode} />;
  }
  if (typeof window !== "undefined" && domain) {
    localStorage.setItem("domain", domain);
  }
  return (
    <>
      {storeTypes[domain] === "df" ? (
        <Head>
          <link rel="stylesheet" href="/assets/css/theme/df.css" />
        </Head>
      ) : null}
      {storeTypes[domain] === "df" ? (
        !!getHeaderData && !!getHeaderData?.siteNavigation?.length ? (
          <DFHeader
            getHeaderData={getHeaderData}
            domain={domain}
            deviceType={deviceTypeServer}
            expireTime={expireTime}
            dhms={dhms}
            message={message}
            headerLink={headerLink}
            translateId={translateId}
            cartData={cartData}
            currency={currency}
            cookieToken={cookieToken}
            storeId={storeId}
            pageData={pageData}
            phoneNumber={phoneNumber}
          />
        ) : null
      ) : !!getHeaderData && !!getHeaderData?.siteNavigation?.length ? (
        <ABHeader
          getHeaderData={getHeaderData}
          domain={domain}
          deviceTyp={deviceTypeServer}
          expireTime={expireTime}
          dhms={dhms}
          message={message}
          headerLink={headerLink}
          translateId={translateId}
          cartData={cartData}
          currency={currency}
          storeId={storeId}
          cookieToken={cookieToken}
          phoneNumber={phoneNumber}
        />
      ) : null}

      <div className={"page-wrapper"}>
        <Seo
          title={metaTitle}
          description={pageData?.description}
          keywords={pageData?.seoKeyword}
          domain={storeTypes[domain]}
        >
          <link rel="stylesheet" href="/assets/css/dynamic-layout.css" />
          {Array.isArray(hrefLang) &&
            hrefLang?.map((ele) => (
              <link
                key={ele?.code}
                rel="alternate"
                hreflang={ele.code}
                href={`https://${domain}/${ele.url}`}
              />
            ))}
        </Seo>
        <div className="homepage-wrapper">
          {pageData && (
            <DynamicLayout
              storeId={storeId}
              storeName={storeName}
              storeObjectId={storeObjectId}
              pageConfig={pageData}
              deviceTypeServer={deviceTypeServer}
              domain={domain}
              isDynamic={isDynamic}
              pdpPlpdata={pdpPlpdata}
              plpData={plpData}
              mergedInjectionData={mergedInjectionData}
              pageId={pageData?.id}
              lang={pageData?.translate}
              navigationMedias={pageData?.navigationMedias}
              pdpPayloadData={pdpPayloadData}
              currency={currency}
              translateId={translateId}
              pageNavigation={pageNavigationRootUrl}
              featureOptionsPrice={featureOptionsPrice}
              cookieToken={cookieToken}
              phoneNumber={phoneNumber}
              email={email}
            />
          )}
        </div>
      </div>
      {storeTypes[domain] === "df" ? (
        !!getFooterData && !!getFooterData?.siteNavigation?.length ? (
          <DFFooter
            getFooterData={getFooterData}
            domain={domain}
            deviceType={deviceTypeServer}
            cookieToken={cookieToken}
            storeId={storeId}
            pageData={pageData}
            translateId={translateId}
          />
        ) : null
      ) : !!getFooterData && !!getFooterData?.siteNavigation?.length ? (
        <ABFooter
          getFooterData={getFooterData}
          domain={domain}
          deviceType={deviceTypeServer}
          storeId={storeId}
          pageData={pageData}
          cookieToken={cookieToken}
          translateId={translateId}
        />
      ) : null}
    </>
  );
}

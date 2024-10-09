import { deviceTypes } from "@/_hooks/useDeviceHelper";
import * as _ from "lodash";
import apiService from "./apiService";

export * from "./history";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; //process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Get API url with API base url
 * @param {string} path
 * @returns {string} full url
 */
export const getApiUrl = (path) => {
  return `${API_BASE_URL}${path}`;
};

/**
 *
 * @param {variable} arg
 * @param {array of options or a constant variable} arr
 * @returns Inclusion of arg in second param
 */
export const stepCheck = (arg, arr) => {
  return Array.isArray(arr) ? arr.includes(arg) : arg === arr;
};

/**
 *
 * @param {variable} arg
 * @param {array of options or a constant variable } arr
 * @returns Exclusion of arg in second param
 */

export const stepNotCheck = (arg, arr) => {
  return Array.isArray(arr) ? !arr.includes(arg) : arg !== arr;
};

function decodeHtmlEntities(xmlString) {
  const { DOMParser } = require("xmldom");
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, "text/xml");
  return xmlDoc?.documentElement?.firstChild?.nodeValue;
}

export const decodeString = (encodeString) =>
  decodeHtmlEntities(decodeURIComponent(encodeString));

export const getDynamicUrlFromNavigationRespose = (data = []) => {
  return data.reduce((acc, curr) => {
    const uriData = curr || {};
    // if (uriData?.navigationChildren && uriData?.navigationChildren.length > 0) {
    //   const nestData = getDynamicUrlFromNavigationRespose(uriData?.navigationChildren)
    //   acc.concat(nestData);
    // }
    const uriDataArr =
      uriData?.urlSlug.at(0) !== "/"
        ? uriData?.urlSlug.split("/")
        : uriData?.urlSlug.slice(1).split("/");

    // this logic is used to redirect to "/" url
    if (uriDataArr.includes("home") && uriDataArr.length === 1) {
      uriDataArr[0] = "/";
    }
    const navItem = { id: uriData?.id, urlSlug: uriDataArr };

    if (uriData?.isDynamic) {
      navItem.urlSlug = uriDataArr;
      navItem.slugKey = uriData?.slugKey.split("/");
    }
    acc.push({ params: navItem });
    return acc;
  }, []);
  // navigationChildren;
};

export const getStoreID = async (domain) => {
  const apiUrlDomain = getApiUrl(`/store/get?where={"site_url":"${domain}"}`);
  const res = await fetch(apiUrlDomain, { next: { revalidate: 1200 } });
  const result = await res.json();
  const storeId = result?.id;
  const storeName = result?.name;
  const storeObjectId = result?.objectId;
  const expireTime = result?.expireTime;
  const message = result?.message;
  const link = result?.link;
  const currency = result?.defaultCurrency?.symbol;
  const defaultTranslate = result?.defaultTranslate;
  const v12AuthenticationKey = result?.v12AuthenticationKey;
  const translateCode = result?.Translate?.code;
  const phoneNumber = result?.companyPhoneNumber;
  const email = result?.companyEmail;
  return {
    storeId,
    storeName,
    storeObjectId,
    expireTime,
    message,
    link,
    currency,
    defaultTranslate,
    apiUrlDomain,
    v12AuthenticationKey,
    translateCode,
    email,
    phoneNumber,
  };
};

export const getStoreDetails = async (domain) => {
  const res = await fetch(
    getApiUrl(`/store/get?where={"site_url":"${domain}"}`),
    { next: { revalidate: 6000 } }
  );
  return await res.json();
};

export const getAuthToken = async (domain) => {
  const res = await fetch(
    getApiUrl(`/customer/get-token?where={"site_url":"${domain}"}`), { next: { revalidate: 1200 } }
  );
  const response = await res.json();
  return response.token;
};

export const calculateTimeLeft = (expireTime, setTimeLeft) => {
  const currentDatetime = new Date();
  const specifiedDatetime = new Date(expireTime);
  const timeDifference =
    specifiedDatetime.getTime() - currentDatetime.getTime();

  if (timeDifference > 0) {
    const days = _.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = _.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = _.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = _.floor((timeDifference % (1000 * 60)) / 1000);

    setTimeLeft && setTimeLeft({ days, hours, minutes, seconds });
    return { days, hours, minutes, seconds };
  } else {
    setTimeLeft && setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  }
};

/**
 *
 * @param {*} id
 * @returns layout data
 */
export const getLayoutData = async (id, cookieToken) => {
  const getAPI = getApiUrl(`/site-component/get/${id}`);
  const headersData = cookieToken
    ? { headers: { Authorization: `Bearer ${cookieToken}` } }
    : {};
  const getHeaderData = await fetch(getAPI, headersData, { next: { revalidate: 1200 } });
  const res = await getHeaderData.json();
  return res;
};

export const parseHeaderData = (data, local) => {
  const pageLocal = local ? local.toUpperCase() : "EN-GB";
  const translationFR = data?.headerTranslate?.find(
    (translation) => translation.transCode === pageLocal
  );
  let result = {};
  if (data?.headerTranslate) {
    result = {
      name: translationFR ? translationFR.name : "",
      storeId: data.storeId,
      type: "header",
      isContactUs: data.isContactUs,
      socialMedias: [],
      certificates: [],
      otherLinks: [],
      siteNavigation: data?.siteNavigation?.map((siteData) => {
        const translateItem = siteData.headerItemTranslate.find(
          (translation) => translation.transCode === pageLocal
        );
        delete siteData?.headerItemTranslate;
        return {
          ...siteData,
          label: translateItem?.label,
          link: translateItem?.link,
          imageCta: translateItem?.imageCta,
          imageUrl: translateItem?.imageUrl,
          section: siteData?.section?.map((sectionData) => {
            const sectionTrans = sectionData.siteComponentsLinkTranslates.find(
              (translation) => translation.transCode === pageLocal
            );
            delete sectionData.siteComponentsLinkTranslates;
            return {
              ...sectionData,
              label: sectionTrans?.label,
              labelLink: sectionData?.labelLink ?? "",
              linkShowAll: {
                labelLink: sectionTrans?.linkShowAll?.labelLink,
                label: sectionTrans?.linkShowAll?.label,
                show: sectionData?.linkShowAll?.show,
              },
              link: sectionData?.link?.map((linkData) => {
                const linkTrans = linkData?.siteComponentsLinkTranslates?.find(
                  (translation) => translation.transCode === pageLocal
                );
                delete linkData?.siteComponentsLinkTranslates;
                return {
                  ...linkData,
                  label: linkTrans?.label,
                  link: linkTrans?.link ?? "",
                  titleUrl: linkTrans?.titleUrl ?? "",
                };
              }),
            };
          }),
          additionalLink: siteData?.additionalLink?.map((additionalData) => {
            const sectionTrans =
              additionalData.siteCmpAdditionalLinkTranslate.find(
                (translation) => translation.transCode === pageLocal
              );
            delete additionalData.siteCmpAdditionalLinkTranslate;
            return {
              label: sectionTrans?.label,
              link: sectionTrans?.link,
              icon: additionalData?.icon,
              iconLink: sectionTrans?.iconLink,
            };
          }),
        };
      }),
      siteLogo: translationFR ? translationFR.siteLogo : "",
      section: [],
      id: "169e22e3-9a02-4a8e-a8bf-3afd445032c6",
      defaultSelect: true,
      isDefault: true,
    };
  } else {
    result = data;
  }
  return {
    siteLogo: result?.siteLogo || "",
    ...(result?.socialMedias &&
      !!result?.socialMedias?.length && {
        socialMedias: result?.socialMedias || [],
      }),
    siteNavigation: parseSiteNavigationData(result?.siteNavigation) || [],
    isContactUs: result?.isContactUs || false,
    storeId: result?.storeId || "",
    ...(result?.otherLinks &&
      !!result?.otherLinks.length && { otherLinks: result?.otherLinks || [] }),
    ...(result?.certificates &&
      !!result?.certificates.length && {
        certificates: result?.certificates || [],
      }),
  };
};

export const parseSiteNavigationData = (data) => {
  return data?.map((item) => {
    return {
      ...(item?.showImage && { imageUrl: item?.imageUrl || "" }),
      ...(item?.showImage && { imageCta: item?.imageCta || "" }),
      label: item?.label || "",
      link: item?.link || "",
      linkShowAll: item?.linkShowAll || "",
      additionalLink: item?.additionalLink || [],
      section: item?.section || [],
      sequence: item?.sequence || 0,
      ...(item?.showImage && { showImage: item?.showImage || false }),
      ...(item?.showTabs && { showTabs: item?.showTabs || false }),
      ...(item?.tabValues && { tabValues: item?.tabValues || [] }),
      ...(item?.type && { type: item?.type || "" }),
    };
  });
};

export const parseFooterData = (data, local) => {
  const pageLocal = local ? local?.toUpperCase() : "EN-GB";
  const translationFR = data?.headerTranslate?.find(
    (translation) => translation?.transCode === pageLocal
  );
  let result = {};
  if (data?.headerTranslate) {
    result = {
      name: translationFR ? translationFR?.name : "",
      storeId: data?.storeId,
      type: "header",
      isContactUs: data?.isContactUs,
      socialMedias: data?.socialMedias?.map((linkData) => {
        const linkTrans = linkData?.siteCmpSocialMediaTranslates?.find(
          (translation) => translation?.transCode === pageLocal
        );
        delete linkData?.siteCmpSocialMediaTranslates;
        return {
          ...linkData,
          iconsLink: linkData?.iconsLink,
          alt: linkTrans?.alt,
          sequence: linkData?.sequence,
          link: linkTrans?.link,
        };
      }),
      certificates: data?.certificates?.map((linkData) => {
        const linkTrans = linkData?.siteCmpPressTranslates?.find(
          (translation) => translation?.transCode === pageLocal
        );
        delete linkData?.siteCmpPressTranslates;
        return {
          ...linkData,
          iconsLink: linkData?.iconsLink,
          alt: linkTrans?.alt,
          sequence: linkData?.sequence,
          link: linkTrans?.link,
        };
      }),
      otherLinks: data?.otherLinks?.map((linkData) => {
        const linkTrans = linkData?.siteCmpOtherLinkTranslates?.find(
          (translation) => translation?.transCode === pageLocal
        );
        delete linkData?.siteCmpOtherLinkTranslates;
        return {
          ...linkData,
          label: linkTrans?.label,
          link: linkTrans?.link,
        };
      }),
      siteNavigation: data?.siteNavigation?.map((siteData) => {
        const translateItem = siteData?.headerItemTranslate?.find(
          (translation) => translation?.transCode === pageLocal
        );
        delete siteData?.headerItemTranslate;
        return {
          ...siteData,
          label: translateItem?.label,
          link: translateItem?.link,
          imageCta: translateItem?.imageCta,
          imageUrl: translateItem?.imageUrl ?? "",
          section: siteData?.section?.map((sectionData) => {
            const sectionTrans =
              sectionData?.siteComponentsLinkTranslates?.find(
                (translation) => translation?.transCode === pageLocal
              );
            delete sectionData?.siteComponentsLinkTranslates;
            return {
              ...sectionData,
              label: sectionTrans?.label,
              labelLink: sectionTrans?.labelLink,
              linkShowAll: {
                labelLink: sectionTrans?.linkShowAll?.labelLink,
                label: sectionTrans?.linkShowAll?.label,
                show: sectionTrans?.linkShowAll?.show,
              },
              link: sectionData?.link?.map((linkData) => {
                const linkTrans = linkData?.siteComponentsLinkTranslates?.find(
                  (translation) => translation?.transCode === pageLocal
                );
                delete linkData?.siteComponentsLinkTranslates;
                return {
                  ...linkData,
                  label: linkTrans?.label,
                  iconUrl: linkTrans?.iconUrl ?? "",
                  link: linkTrans?.link,
                  // "titleUrl": linkTrans?.titleUrl
                };
              }),
            };
          }),
        };
      }),
      paymentMethod: data?.paymentMethod,
      siteLogo: translationFR ? translationFR?.siteLogo : "",
      section: [],
      id: "169e22e3-9a02-4a8e-a8bf-3afd445032c6",
      defaultSelect: true,
      isDefault: true,
      copyright: data?.copyright,
      newsletterTitle: data?.newsletterTitle,
    };
  } else {
    result = data;
  }
  return {
    certificates: result?.certificates || [],
    copyright: result?.copyright || "",
    newsletterTitle: result?.newsletterTitle || "",
    otherLinks: result?.otherLinks || [],
    siteLogo: result?.siteLogo || "",
    siteNavigation: result?.siteNavigation || [],
    socialMedias: result?.socialMedias || [],
    isContactUs: result?.isContactUs || false,
    paymentMethod: result?.paymentMethod || [],
    storeId: result?.storeId || "",
  };
};

const parseDeviceProps = (pagePropertyValues) => {
  return {
    propertyName: pagePropertyValues?.propertyName || "",
    type: pagePropertyValues?.type || "",
    desktop: pagePropertyValues?.desktop || "",
    mobile: pagePropertyValues?.mobile || "",
    tablet: pagePropertyValues?.tablet || "",
  };
};

const parseHeadingProperties = (properties) => {
  return (
    properties &&
    properties
      ?.filter(
        (item) =>
          !!item.pagePropertyValues.desktop ||
          !!item.pagePropertyValues.tablet ||
          !!item.pagePropertyValues.mobile
      )
      ?.map((item) => ({
        pagePropertyValues: parseDeviceProps(item?.pagePropertyValues) || {},
      }))
  );
};

const parseImageProperties = (properties) => {
  return (
    properties &&
    properties
      ?.filter(
        (item) =>
          !!item?.pagePropertyValues?.desktop ||
          !!item?.pagePropertyValues?.tablet ||
          !!item?.pagePropertyValues?.mobile
      )
      ?.map((item) => ({
        pagePropertyValues: parseDeviceProps(item?.pagePropertyValues) || {},
      }))
  );
};

const parseItemTitle = (title) => {
  return {
    ...(title?.text && { text: title?.text || "" }),
    ...(title?.link && { link: title?.link || "" }),
    ...(title?.linkType && { linkType: title?.linkType || "" }),
    ...(title.color && { color: title?.color || "" }),
    ...(title.widthDesktop && { widthDesktop: title?.widthDesktop || "" }),
    ...(title.widthMobile && { widthMobile: title?.widthMobile || "" }),
    ...(title.widthTablet && { widthTablet: title?.widthTablet || "" }),
    ...(title.contentAlignDesktop && {
      contentAlignDesktop: title?.contentAlignDesktop || "",
    }),
    ...(title.contentAlignMobile && {
      contentAlignMobile: title?.contentAlignMobile || "",
    }),
    ...(title.contentAlignTablet && {
      contentAlignTablet: title?.contentAlignTablet || "",
    }),
  };
};

const parseCtas = (cta) => {
  return !!cta
    ? checkArrayIteration(cta) &&
        cta?.map((ct) => ({
          ...(ct?.sequence && { sequence: ct?.sequence || "" }),
          ...(ct?.link && { link: ct?.link || "" }),
          ...(ct?.linkTarget && { linkTarget: ct?.linkTarget || "" }),
          ...(ct?.position && { position: ct?.position || "" }),
          ...(ct?.icon && { icon: ct?.icon || "" }),
          ...(ct?.align && { align: ct?.align || "" }),
          ...(ct?.linkType && { linkType: ct?.linkType || "" }),
          ...(ct?.text && { text: ct?.text || "" }),
          ...(ct?.marginDesktop && {
            marginDesktop: ct?.marginDesktop || "",
          }),
          ...(ct?.marginTablet && {
            marginTablet: ct?.marginTablet || "",
          }),
          ...(ct?.marginMobile && {
            marginMobile: ct?.marginMobile || "",
          }),
          ...(ct?.paddingDesktop && {
            paddingDesktop: ct?.paddingDesktop || "",
          }),
          ...(ct?.paddingTablet && {
            paddingTablet: ct?.paddingTablet || "",
          }),
          ...(ct?.paddingMobile && {
            paddingMobile: ct?.paddingMobile || "",
          }),
        }))
    : cta;
};

const parseItemTagLine = (items) => {
  return items && !!Object.keys(items).length
    ? {
        ...(items?.text && { text: items?.text || "" }),
        ...(items?.icon && { icon: items?.icon || "" }),
        ...(items?.linkType && { linkType: items?.linkType || "" }),
        ...(items?.color && { color: items?.color || "" }),
      }
    : {};
};

const parseItems = (items) => {
  // return items
  return items && !!Object.keys(items).length && checkArrayIteration(items)
    ? items?.map((item) => {
        return {
          type: item?.type || "",
          alt: item?.alt || "",
          isVimeo: item?.isVimeo || "",
          sequence: item?.sequence || 0,
          title: !!Object.keys(item?.title).length
            ? parseItemTitle(item?.title)
            : {},
          tagLine: !!Object.keys(item?.tagLine).length
            ? parseItemTagLine(item?.tagLine)
            : {},
          properties: !!checkArrayIteration(item?.properties)
            ? parseImageProperties(item?.properties)
            : [],
        };
      })
    : [];
};

const parseImageTagline = (tagline) => {
  return tagline
    ? {
        ...(tagline?.align && { align: tagline?.align || {} }),
        ...(tagline?.headingLevel && {
          headingLevel: tagline?.headingLevel || {},
        }),
        ...(tagline?.iconPosition && {
          iconPosition: tagline?.iconPosition || {},
        }),
        ...(tagline?.margin && { margin: tagline?.margin || {} }),
        ...(tagline?.padding && { padding: tagline?.padding || {} }),
        ...(tagline?.position && { position: tagline?.position || {} }),
        properties: parseImageProperties(tagline?.properties) || [],
      }
    : {};
};

const parseImageTitle = (title) => {
  return title
    ? {
        ...(title?.align && { align: title?.align || {} }),
        ...(title?.bgColor && { bgColor: title?.bgColor || {} }),
        ...(title?.headingLevel && { headingLevel: title?.headingLevel || {} }),
        ...(title?.isListItem && { isListItem: title?.isListItem || {} }),
        ...(title?.linkTarget && { linkTarget: title?.linkTarget || {} }),
        ...(title?.linkType && { linkType: title?.linkType || {} }),
        ...(title?.margin && { margin: title?.margin || {} }),
        ...(title?.padding && { padding: title?.padding || {} }),
        ...(title?.position && { position: title?.position || {} }),
        ...(title?.properties && {
          properties: parseImageProperties(title?.properties) || [],
        }),
      }
    : {};
};

const hasAllProps = (obj) => {
  // return obj
  return obj && Object.values(obj)?.every((i) => !i);
};

const parseImage = (image) => {
  // issue
  // return image
  return image
    ? {
        ...(image?.alignSelf && { alignSelf: image?.alignSelf || {} }),
        ...(hasAllProps(image?.bgColor) && { bgColor: image?.bgColor || {} }),
        ...(hasAllProps(image?.height) && { height: image?.height || {} }),
        ...(hasAllProps(image?.imageFit) && {
          imageFit: image?.imageFit || {},
        }),
        ...(hasAllProps(image?.isHoverImage) && {
          isHoverImage: image?.isHoverImage || {},
        }),
        tagLine: parseImageTagline(image?.tagLine) || {},
        title: parseImageTitle(image?.title) || {},
        ...(hasAllProps(image?.width) && { width: image?.width || {} }),
        properties: parseImageProperties(image?.properties) || [],
      }
    : {};
};

const parseHeading = (heading) => {
  return Object.assign(
    {},
    {
      ...(heading?.link && { link: heading?.link || "" }),
      linkTarget: heading?.linkTarget || "",
      text: heading?.text || "",
      ...(heading?.pagePropertyValues?.margin && {
        margin: heading?.pagePropertyValues?.margin || "",
      }),
      ...(heading?.pagePropertyValues?.padding && {
        padding: heading?.pagePropertyValues?.padding || "",
      }),
      properties: parseHeadingProperties(heading?.properties) || [],
    }
  );
};

const parseSectionProperties = (sectionProperties) => {
  // issue
  // return sectionProperties;
  return (
    sectionProperties &&
    sectionProperties
      ?.filter(
        (item) =>
          !!item?.pagePropertyValues?.desktop ||
          !!item?.pagePropertyValues?.tablet ||
          !!item?.pagePropertyValues?.mobile
      )
      ?.map((sectionProperty) => ({
        pagePropertyValues: parseDeviceProps(
          sectionProperty?.pagePropertyValues
        ),
      }))
  );
};

const parseDescriptionList = (description) => {
  return description
    ? description.map((item) => {
        return !!Object.keys(item).length
          ? {
              sequence: item?.sequence || "",
              position: item?.position || "",
              align: item?.align || "",
              ...(item?.text && { text: item?.text || "" }),
              ...(item?.marginDesktop && {
                marginDesktop: item?.marginDesktop || "",
              }),
              ...(item?.marginTablet && {
                marginTablet: item?.marginTablet || "",
              }),
              ...(item?.marginMobile && {
                marginMobile: item?.marginMobile || "",
              }),
              ...(item?.paddingDesktop && {
                paddingDesktop: item?.paddingDesktop || "",
              }),
              ...(item?.paddingTablet && {
                paddingTablet: item?.paddingTablet || "",
              }),
              ...(item?.paddingMobile && {
                paddingMobile: item?.paddingMobile || "",
              }),
              // isEditor: item?.isEditor,
            }
          : {};
      })
    : [];
};

const parseSection = (section) => {
  return {
    type: section?.type || "",
    ...(section?.bgColor && { bgColor: section?.bgColor || "" }),
    name: section?.name || "",
    ...(section?.configType && { configType: section?.configType || {} }),
    ...(section?.heading && {
      heading: Object.assign({}, parseHeading(section?.heading)) || {},
    }),
    ...(section?.image && { image: parseImage(section?.image) || {} }),
    ...(section?.items && { items: parseItems(section?.items) || [] }),
    ...(section?.ctas && { ctas: parseCtas(section?.ctas) || [] }),
    ...(section?.descriptionList && {
      descriptionList: parseDescriptionList(section?.descriptionList) || [],
    }),
    properties: parseSectionProperties(section?.properties) || [],
    backgroundImage: section?.backgroundImage || "",
  };
};
const parseBlockSectionData = (blockSections) => {
  return blockSections?.map((item) => ({
    sequence: item?.sequence || 0,
    section: parseSection(item?.section),
  }));
};

const blockPagePropertyValues = (pagePropertyValues) => {
  return {
    propertyName: pagePropertyValues?.propertyName,
    propertyType: pagePropertyValues?.propertyType,
    desktop: pagePropertyValues?.desktop,
    mobile: pagePropertyValues?.mobile,
    tablet: pagePropertyValues?.tablet,
  };
};

const parsePropertyData = (properties) => {
  return properties?.map((item) => ({
    pagePropertyValues: blockPagePropertyValues(item?.pagePropertyValues),
  }));
};

const parseBlockData = (blocks) => {
  return !!Object.keys(blocks).length
    ? Object.assign(
        {},
        {
          type: blocks?.type || "",
          containerType: blocks?.containerType,
          ...(Boolean(blocks?.properties) && {
            properties: parsePropertyData(blocks?.properties) || [],
          }),
          ...(Boolean(blocks?.blockSections) && {
            blockSections: parseBlockSectionData(blocks?.blockSections) || [],
          }),
        }
      )
    : {};
};

const parseNavigationBlocks = (navigationBlocks) => {
  return navigationBlocks?.map((item) => ({
    sequence: item?.sequence || 0,
    block:
      item?.block && !!Object.keys(item?.block).length
        ? parseBlockData(item?.block)
        : {},
  }));
};

export const parsePageData = (data) => {
  return {
    navigationBlocks: parseNavigationBlocks(data?.navigationBlocks) || [],
    title: data?.title || "",
    description: data?.description || "",
    id: data?.id || "",
    translate: data?.translate || "",
    featureGroup: data?.featureGroup || [],
    navigationMedias: data?.navigationMedias || [],
    ...(data?.seoKeyword && { seoKeyword: data?.seoKeyword || "" }),
    breadcrumb: data?.breadcrumb || "",
    educationDefaultList: data?.educationDefaultList || [],
    faqDefaultList: data?.faqDefaultList || [],
    blogData: data?.blogData || [],
    deliveryMessage: data?.deliveryMessage || null,
    isASMOnly: data?.isQuickDelivery || null,
    navigationLists: data?.navigationLists || null,
  };
};

export const parsePDPData = (dat) => {
  return {
    collectionDetails: dat?.collectionDetails || {},
    features: sortedSequence(dat?.features) || [],
    defaultFeatureOptions: dat?.defaultFeatureOptions || {},
    priceMap: dat?.priceMap || {},
    breadcrumb: dat?.breadcrumb || [],
    medias: dat?.medias || [],
  };
};

export const parsePLPData = (dat) => {
  return {
    collectionDetails: dat?.collectionDetails,
    features: dat?.features,
    defaultFeatureOptions: dat?.defaultFeatureOptions,
  };
};

export const mergeCartData = (orderLineItems, serviceData) => {
  return orderLineItems?.map((item, index) => {
    const tempData = [];
    serviceData?.[index]?.map((service) => {
      let added =
        item?.groupedLineItem?.filter((lineItem) =>
          lineItem?.product?.name.includes(service?.name)
        )?.length > 0;
      if (!added) {
        const serviceData = {
          label: service?.name,
          values: service?.serviceProducts?.map((price) => {
            return {
              label: `${price.serviceName} - ${
                price?.servicePrices?.total ??
                price?.servicePrices?.[0]?.total ??
                0
              }`,
              value: price.serviceId,
              price:
                price?.servicePrices?.total ??
                price?.servicePrices?.[0]?.total ??
                0,
            };
          }),
        };
        tempData.push(serviceData);
      }
    });
    item.extraService = tempData;
  });
};

export const mergeCartDataClient = (orderLineItems, serviceData) => {
  return orderLineItems?.map((item, index) => {
    const tempData = [];
    serviceData?.[index]?.map((service) => {
      let added =
        item?.groupedLineItem?.filter((lineItem) =>
          lineItem?.product?.name.includes(service?.name)
        )?.length > 0;
      if (!added) {
        const serviceData = {
          label: service?.name,
          values: service?.serviceProducts?.map((price) => {
            return {
              label: `${price.serviceName} - ${
                price?.servicePrices?.total ??
                price?.servicePrices?.[0]?.total ??
                0
              }`,
              value: price.serviceId,
              price:
                price?.servicePrices?.total ??
                price?.servicePrices?.[0]?.total ??
                0,
            };
          }),
        };
        tempData.push(serviceData);
      }
    });
    return Object.assign({}, item, { extraService: tempData });
  });
};

export const checkArrayIteration = (arr) => {
  return (Array.isArray(arr) && !!arr.length) || [];
};

export const DOMAIN = {
  austenBlake: "www.austenblake.com",
  austenBlakeProd: "www.austenblake.com",
  diamondFactory: "www.diamondsfactory.com",
  austenBlakeQa: "https://www.austenblake-qa.com/",
  diamondFactoryGpimUK: "www.diamondsfactory.co.uk",
  diamondFactoryGpimFR: "www.diamondsfactory.fr",
};

export const domainSelection = {
  ["localhost:3002"]: DOMAIN.austenBlake,
  ["localhost:3003"]: DOMAIN.diamondFactoryGpimUK,
  ["uat-df.nj.nvizion.io"]: DOMAIN.diamondFactory,
  ["uat.nj.nvizion.io"]: DOMAIN.austenBlake,
  ["staging.nj.nvizion.io"]: DOMAIN.austenBlakeProd,
  ["staging-df.nj.nvizion.io"]: DOMAIN.diamondFactoryGpimUK,
  ["staging-qa.nj.nvizion.io"]: DOMAIN.austenBlakeQa,
  ["uat-qa.nj.nvizion.io"]: DOMAIN.austenBlakeQa,
  ["dev.nj.nvizion.io"]: DOMAIN.austenBlake,
  ["dev-df.nj.nvizion.io"]: DOMAIN.diamondFactory,
  ["dev-qa.nj.nvizion.io"]: DOMAIN.austenBlakeQa,
  ["prod-df.nj.nvizion.io"]: DOMAIN.diamondFactory,
  ["prod.nj.nvizion.io"]: DOMAIN.austenBlake,
  ["prod-qa.nj.nvizion.io"]: DOMAIN.austenBlakeQa,
  ["gpim.nj.nvizion.io"]: DOMAIN.austenBlake,
  ["gpim-df.nj.nvizion.io"]: DOMAIN.diamondFactoryGpimUK,
  ["gpim-df-fr.nj.nvizion.io"]: DOMAIN.diamondFactoryGpimFR,
};

export const getPageNotFoundImages = {
  mobile: "/assets/images/austen-and-blake/404/404_mid_bannar_mob.png",
  tablet: "/assets/images/austen-and-blake/404/404_mid_bannar_768.png",
  desktop: "/assets/images/austen-and-blake/404/404_mid_bannar.png",
};

export const storeTypes = {
  [DOMAIN.diamondFactory]: "df",
  [DOMAIN.diamondFactoryGpimUK]: "df",
  [DOMAIN.austenBlake]: "ab",
  [DOMAIN.austenBlakeProd]: "ab",
  [DOMAIN.austenBlakeQa]: "ab",
};

export const getStoreType = (domain) => {
  return storeTypes[process.env.NEXT_PUBLIC_STORE_TYPE] || storeTypes[domain];
};
export const deviceMapping = (initial) => ({
  desktop: `${initial}Desktop`,
  mobile: `${initial}Mobile`,
  tablet: `${initial}Tablet`,
});

export const splitAndJoin = (property, deviceType, obj) => {
  const propertyToSplit = deviceMapping(property)?.[deviceType];
  return obj?.[propertyToSplit]
    ?.split(",")
    .map((prop) => `${prop}px`)
    .join(" ");
};

export const marginAndSplit = (deviceType, obj) => {
  return obj?.[deviceType]
    ?.split(",")
    .map((prop) => `${prop}px`)
    .join(" ");
};

export function getDevice(userAgent = "") {
  if (!userAgent && typeof window !== "undefined") {
    userAgent = navigator.userAgent;
  }
  return Boolean(
    userAgent.match(/Android|BlackBerry|iPhone|Opera Mini|IEMobile/i)
  )
    ? deviceTypes.mobile
    : Boolean(userAgent.match(/iPad|iPod|Opera Mini|WPDesktop/i))
    ? deviceTypes.tablet
    : deviceTypes.desktop;
}

export const checkIsFlag = (key) => {
  return key === true || key === "true";
};

export const sortedSequence = (array) => {
  return array?.sort((a, b) => a.sequence - b.sequence);
};

export const convertToSentenceCase = (string) =>
  (string &&
    string?.[0] &&
    `${string?.[0]?.toUpperCase()}${string?.slice(1).toLocaleLowerCase()}`) ||
  "";

export const capitalizeSentence = (item) =>
  (item &&
    item
      .split(" ")
      .map((n) => convertToSentenceCase(n))
      .join(" ")) ||
  "";

export const useBreadCrumbs = (pathArr) => {
  const breadcrumbData =
    pathArr &&
    pathArr?.map((path) => {
      if (path?.index === 1) {
        return {
          label: "Home",
          link: "/",
          reqSlash: true,
          index: path?.index,
        };
      }
      return path?.index !== pathArr.length
        ? {
            label: capitalizeSentence(path?.label),
            link: path.url,
            reqSlash: true,
            index: path?.index,
          }
        : {
            label: capitalizeSentence(path?.label),
            index: path?.index,
            reqSlash: false,
          };
    });

  return breadcrumbData?.filter((e) => e.label);
};

export const getCartData = async (translateId, token) => {
  if (token) {
    const cartData = await fetch(getApiUrl(`/order/viewCart/${translateId}`), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await cartData.json();
    return res;
  }
  return null;
};

export const getCartService = async (
  storeObjectId,
  orderLineItemId,
  token,
  translateId
) => {
  const url = getApiUrl(
    `/store/${storeObjectId}/order/orderLineItem/${orderLineItemId}/getAllServiceProducts/${translateId}`
  );
  const res = await fetch(url, {
    method: "POST",
    body: "",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": `${API_BASE_URL}/`,
      Authorization: `Bearer ${token}`,
    },
  }).catch((err) => {
    console.log(err);
  });
  return await res.json();
};

export const getDataForPageUrlService = async (
  storeId,
  slug,
  locale,
  cookieToken
) => {

  let completeSlug;
  if (!slug) {
    completeSlug = "home";
  } else if (Array.isArray(slug)) {
    completeSlug = locale ? `${locale}/${slug.join("/")}` : slug.join("/");
  } else {
    completeSlug = locale ? `${locale}/${slug}` : slug;
  }

  const apiPageDataUrl = getApiUrl(
    `/navigation-hierarchy/GetPageByUrl?storeId=${storeId}&completeSlug=${completeSlug}`
  );

  const headersData = cookieToken
    ? { headers: { Authorization: `Bearer ${cookieToken}` } }
    : {};
  const slugData = await fetch(apiPageDataUrl, headersData);
  const pageData = await slugData.json();
  return pageData;
};

export const getPageDetailsService = async (
  storeId,
  slug,
  locale,
  cookieToken
) => {
  let apiPageDataUrl = "";
  // if navigation is array then slug should be arranged by joining with "/"
  if (Array.isArray(slug) || !slug) {
    apiPageDataUrl = getApiUrl(
      `/navigation-hierarchy/getPageDetails?storeId=${storeId}&slug=${
        !slug ? "home" : slug.join("/")
      }`
    );
  } else {
    // call slug directly if it is a string
    apiPageDataUrl = getApiUrl(
      `/navigation-hierarchy/getPageDetails?storeId=${storeId}&slug=${
        locale ? locale + "/" + slug : slug
      }`
    );
  }

  const headersData = cookieToken
    ? { headers: { Authorization: `Bearer ${cookieToken}` } }
    : {};
  const checkUrl = await fetch(apiPageDataUrl, headersData);
  const pageDetails = await checkUrl.json();
  return {
    isPageExist: pageDetails?.isPageExist,
    isDynamic: pageDetails?.isDynamic,
  };
};

export const getEstimatedTime = (expectedCompletedDate) => {
  const now = new Date();
  const expectedDate = new Date(expectedCompletedDate);

  // Calculate the difference in milliseconds
  const diffInMs = expectedDate - now;

  // Calculate the difference in days (rounded up to include partial days)
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays <= 0) {
    return "Today"; // The expected date is in the past or today
  } else if (diffInDays <= 1) {
    return "1-2 Days";
  } else if (diffInDays <= 2) {
    return "2-3 Days";
  } else if (diffInDays <= 3) {
    return "3-4 Days";
  } else if (diffInDays <= 7) {
    return "1 Week";
  } else if (diffInDays <= 14) {
    return "1-2 Weeks";
  } else if (diffInDays <= 21) {
    return "2-3 Weeks";
  } else {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks}-${weeks + 1} week${weeks + 1 > 1 ? "s" : ""}`;
  }
};

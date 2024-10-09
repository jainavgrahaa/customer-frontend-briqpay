import useDeviceHelper from "@/_hooks/useDeviceHelper";
import Renderer from "../renderer";

// const Column = ({ width, data, isSingleSection, storeId, domain, pdpPlpdata, features, pageId, lang, navigationMedias }) => {
  const Column = ({
    width,
    data,
    isSingleSection,
    storeId,
    storeName,
    storeObjectId,
    domain,
    pdpPlpdata,
    plpData,
    mergedInjectionData,
    breadcrumbData,
    pdpPayloadData,
    deviceTypeServer,
    features,
    pageId,
    lang,
    navigationMedias,
    currency,
    educationDefaultList,
    faqDefaultList,
    blogData,
    translateId,
    pageNavigation,
    blockData,
    featureOptionsPrice,
    cookieToken,
    navigationHierarchyId,
    phoneNumber,
    email
  }) => {
    const { deviceType } = useDeviceHelper();

    // This is added in Get expert advice section config
    // To center align things properly
    const newInlineStyle = {};
    data?.section &&
      Object.keys(data?.section)?.forEach((prop) => {
        if (prop != "properties")
          newInlineStyle[prop] =
            data?.section[prop] && data?.section?.[prop]?.[deviceType];
      });
    const inlineStyle = newInlineStyle;
    const isListItem = data?.section?.image?.title?.properties?.some(
      ({ pagePropertyValues }) => {
        return (
          pagePropertyValues?.propertyName === "isListItem" &&
          pagePropertyValues[deviceType] === "true"
        );
      }
    );
    return (
      <div
        className={`d-col ${data.section?.bgColor}`}
        style={{
          width: `${width}%`,
          margin: "0 auto",
          // This is added in Get expert advice section config
          // To center align things properly
          ...(inlineStyle?.isCarousal !== "true" &&
            !isListItem &&
            inlineStyle?.isNavigateArrow &&
            data?.section?.items?.length === 1 &&
            data?.section?.type === "CMS" &&
            !isSingleSection && {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }),
        }}
      >

        <Renderer
          breadcrumbData={breadcrumbData}
          storeId={storeId}
          storeName={storeName}
          storeObjectId={storeObjectId}
          data={data}
          isSingleSection={isSingleSection}
          domain={domain}
          pdpPlpdata={pdpPlpdata}
          plpData={plpData}
          mergedInjectionData={mergedInjectionData}
          pdpPayloadData={pdpPayloadData}
          deviceTypeServer={deviceTypeServer}
          features={features}
          pageId={pageId}
          lang={lang}
          navigationMedias={navigationMedias}
          currency={currency}
          educationDefaultList={educationDefaultList}
          faqDefaultList={faqDefaultList}
          blogData={blogData}
          translateId={translateId}
          pageNavigation={pageNavigation}
          blockData={blockData} 
          featureOptionsPrice={featureOptionsPrice}
          cookieToken={cookieToken}
          navigationHierarchyId={navigationHierarchyId}
          email={email}
          phoneNumber={phoneNumber}
        />
      </div>
    );
  };

  export default Column;

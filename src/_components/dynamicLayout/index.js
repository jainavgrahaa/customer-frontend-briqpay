import React from "react";
import Block from "./block";
import { getFormtedData } from "@/_utils/dynamicLayout";

const DynamicLayout = ({
  pageConfig = {},
  deviceTypeServer,
  storeId,
  storeName,
  storeObjectId,
  domain,
  pdpPlpdata,
  pageId,
  lang,
  navigationMedias,
  pdpPayloadData,
  currency,
  translateId,
  pageNavigation,
  plpData,
  mergedInjectionData,
  featureOptionsPrice,
  cookieToken,
  phoneNumber,
  email
}) => {
  const block = pageConfig.navigationBlocks || [];
  const parseData = getFormtedData(block);
  const breadcrumb = pdpPlpdata?.breadcrumb?.length ? pdpPlpdata?.breadcrumb : pageConfig?.breadcrumb || []
  const educationDefaultList = pageConfig?.educationDefaultList || []
  const faqDefaultList = pageConfig?.faqDefaultList || []
  const blogData = pageConfig?.blogData || []
  const navigationHierarchyId = pageConfig?.id || []
  return (
    <div className={`d-layout`}>
      {parseData?.map((item, index) => (
        <Block
          breadcrumbData={breadcrumb}
          key={index}
          data={item}
          deviceTypeServer={deviceTypeServer}
          storeId={storeId}
          storeName={storeName}
          storeObjectId={storeObjectId}
          domain={domain}
          pdpPlpdata={pdpPlpdata}
          plpData={plpData}
          mergedInjectionData={mergedInjectionData}
          features={pageConfig?.featureGroup}
          pageId={pageId}
          lang={lang}
          navigationMedias={navigationMedias}
          pdpPayloadData={pdpPayloadData}
          currency={currency}
          educationDefaultList={educationDefaultList}
          faqDefaultList={faqDefaultList}
          blogData={blogData}
          translateId={translateId}
          pageNavigation={pageNavigation}
          featureOptionsPrice={featureOptionsPrice}
          cookieToken={cookieToken}
          navigationHierarchyId={navigationHierarchyId}
          email={email}
          phoneNumber={phoneNumber}
        />
      ))}
    </div>
  );
};

export default DynamicLayout;

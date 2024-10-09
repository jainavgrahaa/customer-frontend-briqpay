import { types } from "../constants";
import ImageItem from "./imageItem";
import { stepCheck } from "@/_utils";

const ListItem = ({
  data,
  height,
  heading,
  structure,
  image,
  items,
  domain,
  index,
  isAccordion,
  isCarousal,
  isSeparator,
  isListItem,
  active,
  handleToggle,
  deviceTypeServer,
  isAutoItemWidth
}) => {
  const newInlineStyle = {};
  let width = deviceTypeServer === 'mobile'? data?.title?.widthMobile: deviceTypeServer === 'tablet'? data?.title?.widthTablet: data?.title?.widthDesktop;
  let contentAlign = deviceTypeServer === 'mobile'? data?.title?.contentAlignMobile: deviceTypeServer === 'tablet'? data?.title?.contentAlignTablet: data?.title?.contentAlignDesktop;
  image?.title &&
    Object.keys(image?.title)?.forEach((prop) => {
      if (prop != "properties") {
        newInlineStyle[prop] =
          image?.title?.[prop] && image?.title?.[prop][deviceTypeServer];
      }
    });
  
  const newInlineTagStyle = {};

  image?.tagLine &&
    Object.keys(image?.tagLine)?.forEach((prop) => {
      if (prop != "properties")
        newInlineTagStyle[prop] =
          image?.tagLine[prop] && image?.tagLine[prop][deviceTypeServer];
    });
  // const isListItem = image?.title?.properties?.some(({ pagePropertyValues
  // }) => {
  //   return pagePropertyValues?.propertyName === "isListItem" && pagePropertyValues[deviceType] === "true"
  // }
  // )
  return (
    <div
      className={isListItem ? "d-listing-item" : "d-list-item"}
      style={{
        height: height ? height + "px" : "auto",
        width: isAutoItemWidth ==="true" ? width + "px" : 'auto',
      }}
    >
      {stepCheck(data.type, types.image) && (
        <ImageItem
          // height={height}
          contentAlign={contentAlign}
          heading={heading}
          isAutoItemWidth={isAutoItemWidth}
          width={width}
          data={data}
          structure={structure}
          bgColor={image?.bgColor}
          isHoverImage={image?.isHoverImage}
          title={image?.title}
          index={index}
          titlePosition={newInlineStyle?.position}
          titleLinkType={newInlineStyle?.linkType}
          tagLine={image?.tagLine}
          tagLinePosition={newInlineTagStyle?.position}
          properties={image}
          isAccordion={isAccordion}
          isCarousal={isCarousal}
          isListItem={isListItem}
          isSeparator={isSeparator}
          active={active}
          handleToggle={handleToggle}
          deviceType={deviceTypeServer}
          domain={domain}
        />
      )}
    </div>
  );
};

export default ListItem;

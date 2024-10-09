/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import { types } from "../constants";
import Title from "../title";
import TagLine from "./tagLine";
import LinkWrapper from "../linkWrapper";
import { marginAndSplit } from "@/_utils";

const ImageItem = ({
  data,
  heading,
  title,
  tagLine,
  titlePosition,
  titleLinkType,
  tagLinePosition,
  properties,
  index,
  isAccordion,
  isCarousal,
  isSeparator,
  active,
  handleToggle,
  deviceType,
  isListItem,
  domain,
  isAutoItemWidth,
  width,
  contentAlign,
}) => {
  let check = true;
  const marginTitle = data?.title?.text && properties?.title?.margin;
  const marginTagLine = data?.tagLine?.text && properties?.tagLine?.margin;
  const paddingTitle = data?.title?.text && properties?.title?.padding;
  const paddingTagLine = data?.tagLine?.text && properties?.tagLine?.padding;
  const marginImage = properties?.margin;
  const paddingImage = properties?.padding;
  const isAboveImgTitle = title && titlePosition === types.aboveImage;
  const isAboveImgTagLine = tagLine && tagLinePosition === types.aboveImage;
  const titleWithArrow = data?.title?.linkType === "link_with_arrow";
  const imageWithText = types.imageWithText;
  const linkWithArrow = types.linkWithArrow;
  const contentEl = useRef();
  const newInlineStyle = {};
  const titleAndTagLineBgColor = title?.bgColor
    ? title?.bgColor?.[deviceType]
    : "";
  properties &&
    Object.keys(properties)?.forEach((prop) => {
      if (prop != "properties")
        newInlineStyle[prop] =
          properties?.[prop] && properties?.[prop][deviceType];
    });
  const inlineStyle = newInlineStyle;

  const newInlineTitleStyle = {};
  Object.keys(data.title)?.forEach((prop) => {
    if (prop != "properties")
      newInlineTitleStyle[prop] =
        data.title[prop] && data.title[prop][deviceType];
  });

  const inlineTitleStyle = newInlineTitleStyle;

  const newUrl = {};
  Object.keys(data)?.forEach((prop) => {
    if (prop != "properties") {
      newUrl[prop] =
        data[prop] && data[prop][deviceType]
          ? data[prop][deviceType]
          : data[prop]["desktop"];
    }
  });
  const url = newUrl;
  const hasHoverImg = url.hoverImageUrl && inlineStyle.isHoverImage;
  const [hoverImage, setHoverImage] = useState(false);
  return (
    <div
      className={`${contentAlign !== undefined ? contentAlign : ""
        } ${(inlineStyle?.hoverAnimation === "true" && hasHoverImg === undefined) ? "animation" : ""
        } ${inlineStyle?.imageShadow === "true" ? "shadow-box" : ""
        } d-img-block`}
      data-type={data.title.linkType}
    >
      <LinkWrapper
        data={data.title}
        structure={title}
        className={
          (data.title.linkType === linkWithArrow) ? "d-icon-with-text" : ""
        }
        deviceType={deviceType}
      >
        {isAccordion && data?.title?.text && (
          <div className="d-accordion">
            <div
              className={`d-accordion-card ${!data?.tagLine?.text ? "static-title" : ""
                }`}
            >
              <div
                className={
                  index === 0
                    ? "d-accordion-header-custom"
                    : "d-accordion-header"
                }
              >
                <div
                  className={`d-accordion-toggle ${active ? "active" : ""}`}
                  onClick={() => handleToggle(data.sequence)}
                >
                  <div className="d-accordion-title">
                    <Title
                      index={index}
                      isSeparator={isSeparator}
                      data={data.title}
                      structure={title}
                      titleAndTagLineBgColor={titleAndTagLineBgColor}
                      deviceType={deviceType}
                      isListItem={isListItem}
                      paddingImage={paddingImage}
                      marginImage={marginImage}
                      imageWidth={url?.width}
                      isAutoItemWidth={isAutoItemWidth}
                    />
                  </div>
                  {active === data.sequence ? (
                    <span className="material-icons-outlined minus-icon">
                      remove
                    </span>
                  ) : (
                    <span className="material-icons-outlined plus-icon">
                      add
                    </span>
                  )}
                </div>
              </div>
              <div
                ref={contentEl}
                className={`d-collapse ${active === data.sequence ? "show" : ""
                  }`}
                style={
                  active === data.sequence
                    ? { height: contentEl.current.scrollHeight }
                    : { height: "0px" }
                }
              >
                <div className="d-accordion-body">
                  <div className="mb-0">
                    <TagLine
                      data={data?.tagLine}
                      structure={tagLine}
                      titleAndTagLineBgColor={titleAndTagLineBgColor}
                      deviceType={deviceType}
                    />
                    {
                      url?.imageUrl &&
                      !hoverImage && isAccordion && (
                        <div className={`${inlineStyle?.imageShadow === "true" ? "image-with-shadow img-wrap" : "img-wrap"}`}>
                        <img
                          className="main-image mt-3 mb-3"
                          src={url.imageUrl}
                          alt={data.alt}
                          style={{
                            objectFit: inlineStyle.imageFit,
                            height:
                              inlineStyle.height > 0
                                ? inlineStyle.height + "px"
                                : "auto",
                            width: (isAutoItemWidth === 'false' || isAutoItemWidth === undefined) ? (inlineStyle?.width
                              ? inlineStyle?.width + "%"
                              : "100%") : width + "%",
                            padding: marginAndSplit(deviceType, paddingImage),
                            margin: marginAndSplit(deviceType, marginImage),
                          }}
                        />
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {!isAccordion && isAboveImgTitle && (
          <span>
            <Title
              index={index}
              isSeparator={isSeparator}
              data={data.title}
              structure={title}
              deviceType={deviceType}
              isListItem={isListItem}
              paddingImage={paddingImage}
              marginImage={marginImage}
              imageWidth={url?.width}
              isAutoItemWidth={isAutoItemWidth}
            />
          </span>
        )}
        {!isAccordion && isAboveImgTagLine && (
          <TagLine
            data={data.tagLine}
            structure={tagLine}
            deviceType={deviceType}
          />
        )}
        {isAccordion && !data?.title?.text && (
          <TagLine 
            data={data.tagLine}
            structure={tagLine}
            deviceType={deviceType}
          />
        )}
        {isAccordion &&
          !data?.title?.text &&
          !data?.tagLine?.text &&
          url?.imageUrl && (
            <div className={`${inlineStyle?.imageShadow === "true" ? "image-with-shadow img-wrap" : "img-wrap"}`}>
            <img
              className="main-image mt-3 mb-3"
              src={url.imageUrl}
              alt={data.alt}
              style={{
                objectFit: inlineStyle.imageFit,
                height:
                  inlineStyle.height > 0
                    ? inlineStyle.height + "px"
                    : "auto",
                width: (isAutoItemWidth === 'false' || isAutoItemWidth === undefined) ? (inlineStyle?.width
                  ? inlineStyle?.width + "%"
                  : "100%") : width + "%",
                padding: marginAndSplit(deviceType, paddingImage),
                margin: marginAndSplit(deviceType, marginImage),
              }}
            />
            </div>
          )
        }
        <div
          className={`${hasHoverImg === "true" ? "has-hover-img" : ""} ${inlineStyle.bgColor ||
            (contentAlign === "inlineAndCenter"
              ? "inlineLeftalign"
              : contentAlign === "inlineAndLeft"
                ? "inlineLeftalign"
                : "inherit")
            } ${isAutoItemWidth === "true" ? "auto-class" : ""} ${inlineStyle.alignSelf === "center" ? "image-center" : ""} ${inlineStyle.alignSelf === "right" ? "image-right" : ""}`}
          style={{
            alignSelf: inlineStyle.alignSelf,
            textAlignLast: inlineStyle.textAlignLast,
          }}
        >

          {String(isCarousal) === "true"
            ? (url?.imageUrl || url.videoUrl) &&
            (title?.align?.[deviceType] !== "center" ||
              hasHoverImg === "true") && (
              <>
                {url.videoUrl ? (
                  <>
                    {
                      data?.isVimeo ?
                        <iframe
                          title="vimeo-player"
                          src={url?.videoUrl}
                          width="350"
                          height="300"
                          frameborder="0"
                          allowfullscreen>
                        </iframe> :
                        <video
                          width="350"
                          height="300"
                          poster={url?.posterUrl}
                          controls
                        >
                          <source src={url?.videoUrl} type="video/mp4" />
                          <source src={url?.videoUrl} type="video/ogg" />
                          Your browser does not support the video tag.
                        </video>
                    }
                  </>
                ) : (
                  <div className={`${inlineStyle?.imageShadow === "true" ? "image-with-shadow img-wrap" : "img-wrap"}`}>
                  <img
                    className="main-image"
                    src={url.imageUrl}
                    alt={data.alt}
                    style={{
                      objectFit: inlineStyle.imageFit,
                      height:
                        inlineStyle?.height
                          ? inlineStyle?.height + "px"
                          : "auto",
                      width:
                        !url?.width
                          ? inlineStyle?.width
                            ? inlineStyle?.width + "%"
                            : "100%"
                          : url?.width + "%",
                      padding: marginAndSplit(deviceType, paddingImage),
                      margin: marginAndSplit(deviceType, marginImage),
                    }}
                  />
                  </div>
                )}
              </>
            )
            : (url?.imageUrl || url.videoUrl) &&
            !hoverImage && !isAccordion &&
            (title?.align?.[deviceType] !== "center" ||
              hasHoverImg === "true") && (
              <>
                {url.videoUrl ? (
                  <>
                    {
                      data?.isVimeo ?
                        <iframe
                          title="vimeo-player"
                          src={url?.videoUrl}
                          width="350"
                          height="300"
                          frameborder="0"
                          allowfullscreen>
                        </iframe> :
                        <video
                          width="350"
                          height="300"
                          poster={url?.posterUrl}
                          controls
                        >
                          <source src={url?.videoUrl} type="video/mp4" />
                          <source src={url?.videoUrl} type="video/ogg" />
                          Your browser does not support the video tag.
                        </video>
                    }
                  </>
                ) : (
                  <div className={`${inlineStyle?.imageShadow === "true" ? "image-with-shadow img-wrap" : "img-wrap"}`}>
                  <img
                    className="main-image"
                    src={url.imageUrl}
                    alt={data.alt}
                    onMouseOver={() =>
                      url?.hoverImageUrl &&
                      (inlineStyle?.isHoverImage === "true" ||
                        inlineStyle?.isHoverImage === true) &&
                      setHoverImage(true)
                    }
                    style={{
                      objectFit: inlineStyle.imageFit,
                      height:
                        inlineStyle.height > 0
                          ? inlineStyle.height + "px"
                          : "auto",
                      width:
                        !url?.width
                          ? inlineStyle?.width
                            ? inlineStyle?.width + "%"
                            : "100%"
                          : url?.width + "%",
                      padding: marginAndSplit(deviceType, paddingImage),
                      margin: marginAndSplit(deviceType, marginImage),
                    }}
                  />
                  </div>
                )}
              </>
            )}

          {String(isCarousal) === "true"
            ? hasHoverImg === "true" && (
             <div className={`${inlineStyle?.imageShadow === "true" ? "image-with-shadow img-wrap" : "img-wrap"}`}>
              <img
                className="hover-image"
                src={url.hoverImageUrl}
                alt={data.alt}
                style={{
                  objectFit: inlineStyle.imageFit,
                  height: inlineStyle.height + "px",
                  width:
                    !url?.width
                      ? inlineStyle?.width + "%"
                      : url?.width + "px",
                  padding: marginAndSplit(deviceType, paddingImage),
                  margin: marginAndSplit(deviceType, marginImage),
                }}
              />
              </div>
            )
            : hasHoverImg === "true" &&
            hoverImage && (
             <div className={`${inlineStyle?.imageShadow === "true" ? "image-with-shadow img-wrap" : "img-wrap"}`}>
              <img
                className="hover-image"
                src={url.hoverImageUrl}
                alt={data.alt}
                onMouseLeave={() =>
                  isCarousal !== "true" && setHoverImage(false)
                }
                style={{
                  objectFit: inlineStyle.imageFit,
                  height: inlineStyle.height + "px",
                  width:
                    !url?.width
                      ? inlineStyle?.width + "%"
                      : url?.width + "px",
                  padding: marginAndSplit(deviceType, paddingImage),
                  margin: marginAndSplit(deviceType, marginImage),
                }}
              />
              </div>
            )}
        </div>
        <div
          className={`image-description ${inlineTitleStyle?.bgColor ? inlineTitleStyle.bgColor : "inherit"
            }`}
          style={{
            width:
              isAutoItemWidth === "false" || isAutoItemWidth === undefined
                ? inlineTitleStyle?.width || "100" + "%"
                : width + "px",
            // adding this condition to add space below slider
            // ...(!newInlineStyle?.bgColor &&
            //   isCarousal === "true" &&
            //   !!isCarousal && { padding: "1.125rem 0 0" }),

          }}
        >
          {!isAboveImgTitle && !isAccordion && (
            <div className={`${titleWithArrow ? "d-title-arrow" : "d-title"}`} data-type={data.title.linkType}>
              {data.title && (
                <Title
                  index={index}
                  isSeparator={isSeparator}
                  url={url?.imageUrl}
                  data={data.title}
                  inlineStyle={inlineStyle}
                  structure={title}
                  titleAndTagLineBgColor={titleAndTagLineBgColor}
                  deviceType={deviceType}
                  isListItem={isListItem}
                  marginTitle={
                    marginTitle !== undefined && marginTitle !== null
                      ? marginTitle
                      : null
                  }
                  paddingTitle={
                    paddingTitle !== undefined && paddingTitle !== null
                      ? paddingTitle
                      : null
                  }
                  paddingImage={paddingImage}
                  marginImage={marginImage}
                  hasHoverImg={hasHoverImg}
                  domain={domain}
                  hoverAnimationImage={inlineStyle?.hoverAnimation}
                  imageShadowBox={inlineStyle?.imageShadow}
                />
              )}

              {titleWithArrow && (
                <span
                  style={{
                    color: data?.title?.color ? data?.title?.color : "black",
                    padding: marginAndSplit(deviceType, paddingTitle),
                    margin: marginAndSplit(deviceType, marginTitle),
                  }}
                  className={`material-icons-outlined icons-small ${(title?.color && title?.color[deviceType]) || "transparent"
                    }`}
                >
                  chevron_right
                </span>
              )}
            </div>
          )}
          {!isAboveImgTagLine && !isAccordion && (
            <TagLine
              color={data?.tagLine?.color}
              data={data.tagLine}
              structure={tagLine}
              titleAndTagLineBgColor={titleAndTagLineBgColor}
              marginTagLine={
                marginTagLine !== undefined && marginTagLine !== null
                  ? marginTagLine
                  : null
              }
              paddingTagLine={
                paddingTagLine !== undefined && paddingTagLine !== null
                  ? paddingTagLine
                  : null
              }
              deviceType={deviceType}
            />
          )}
        </div>
      </LinkWrapper>
    </div>
  );
};
export default ImageItem;
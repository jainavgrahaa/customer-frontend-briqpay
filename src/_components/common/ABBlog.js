/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import BlogmenuItems from "./BlogmenuItems";
import { FormattedMessage } from "react-intl";
import Link from "next/link";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";
import { storeTypes } from "@/_utils";

const ABBlog = ({ storeId, blogData, domain }) => {
  const router = useRouter();
  const { text } = router.query;
  const [item, setItems] = useState([]);
  const [searchString, setSearchString] = useState();
  const getImageSrc = (mediaUrl) => {
    return mediaUrl || "/assets/images/default-img.jpg";
  };
  return (
    <>
      <BlogmenuItems
        storeId={storeId}
        searchString={searchString}
        domain = {domain}
        storeTypes = {storeTypes}
        item={item}
        setSearchString={setSearchString}
        setItems={setItems}
        blogCategories={blogData?.blogCategories}
      />
      {text && (
        <Typography textAlign="center" className="mt-5 mb-5">
          {`We found `}
          <strong>{blogData?.blogResults?.length}</strong>
          {` results for `}
          <strong>{`"${text}"`}</strong>
        </Typography>
      )}
      <div className={`fixed-container`}>
      <div className="blog-cards-container">
        {blogData?.blogResults?.map((data) => (
          <div className="blog-card" key={data}>
            <img
              className="blog-card-image"
              alt={data?.title}
              src={
                data?.media ?? "/assets/images/default-img.jpg"
              }
            />
            <div className="blog-card-descriptions">
              <div className="blog-content">
                {storeTypes[domain] === "ab" && <h5 className={"blog-card-title"}>{data?.title || data?.navigationhierarchyname || data?.name}</h5>}
                {storeTypes[domain] === "df" && <h4 className="mb-2">{data?.title || data?.navigationhierarchyname || data?.name}</h4>}
                <Link href={data?.urlslug ?? '#'} className="btn-link">
                  {storeTypes[domain] === "ab" && <FormattedMessage id="common.readMore" />}
                  {storeTypes[domain] === "df" && <FormattedMessage id="common.read" />}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
      {(!blogData?.blogResults || blogData?.blogResults?.length <= 0) && (
        <p className="text-center semibold mt-5 mb-5">
          <FormattedMessage id="common.noArticles" />
        </p>
      )}
    </>
  );
};

export default ABBlog;

/* eslint-disable @next/next/no-img-element */
import { blogPageData } from "@/_utils/customApiData";
import Link from "next/link";
import React from "react";

const OverlayTextImage = () => {
  return (
    <>
      <div className="overlayTextImage">
        <div className="row main-wrap">
          {blogPageData?.map((blog) => {
            return (
              <div className="col-md-12 col-lg-6" key={blog?.id}>
                <div className="image-sec">
                  <img src={blog?.image} alt={blog?.alt} />
                  <div className="image-overlay blog-title-box">
                    <h4>{blog?.title}</h4>
                    <Link className="" href="/en/blog-main-page#">
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default OverlayTextImage;

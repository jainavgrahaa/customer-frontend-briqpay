/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const MultiListMenu = ({ linkData }) => {
  return (
    <div className="more-categories">
      {linkData?.link?.map((data, index) => {
        return linkData?.type === "list" ? (
          <div className="category-links" key={index}>
            <Link
              href={`${linkData?.lableLink}` || "#"}
              className="view-all-link"
            >
             { data.showIcon && <img
                className="small-img"
                src={`${data?.link}`}
                alt={data?.label}
              />}
              <span>{data?.label}</span>
            </Link>
          </div>
        ) : (
          <Link href="#" className="category" key={index}>
            {data.link && <img src={`${data.link}`} alt={data.label} />}
            <p>{data.label}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default MultiListMenu;

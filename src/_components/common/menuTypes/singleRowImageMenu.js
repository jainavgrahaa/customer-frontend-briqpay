/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const SingleRowImageMenu = ({ linkData }) => {
  return (
    <div className="more-categories row-4">
      {linkData?.link.map((data, index) => {
        return (
          <Link key={index} href="#" className="category">
            <img src={`${data.link}`} />
            <p>{data.label}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default SingleRowImageMenu;

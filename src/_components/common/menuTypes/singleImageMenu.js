/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const SingleImageMenu = ({ linkData }) => {
  return (
    <>
      {linkData.link?.map((data) => {
        return (
          <Link key={data.link} className="banner-img" href="#">
            <img src={data.link} />
          </Link>
        );
      })}
    </>
  );
};

export default SingleImageMenu;

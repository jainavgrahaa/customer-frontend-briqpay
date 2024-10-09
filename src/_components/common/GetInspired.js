/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const GetInspired = ({ data }) => {

  if (!data) {
    return "";
  }

  return (
    <section className="getinspired-sec">
      {data.map((item, index) => (
        <div className="container" key={`getIns-${index}`}>
          <h2 className="heading">{item.title}</h2>
          <ul className="thumbList row">
            {item.list.map((items, index) => (
              <li key={`insp-thumb-${index}`} className="col-md-3 col-sm-6">
                <Link href={items.link || "#"}>
                  <img src={items.imgPath} />
                  {/* <div className="date">{items.secTitle}</div> */}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default GetInspired;

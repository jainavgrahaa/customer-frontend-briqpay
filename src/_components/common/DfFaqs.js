/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DfFaqs = ({ faqDefaultList }) => {
  const pathname = usePathname();
  return (
    <div className="container mt-5 mb-5">
      <div className="faqs-menus">
        {faqDefaultList.map((item, index) => (
          <div
            className={`faq_items ${
              item?.urlSlug.includes("about") && pathname.includes("about")
                ? "active"
                : item?.urlSlug.includes("orders") &&
                  pathname.includes("orders")
                ? "active"
                : item?.urlSlug.includes("returns") &&
                  pathname.includes("returns")
                ? "active"
                : item?.urlSlug.includes("payments") &&
                  pathname.includes("payments")
                ? "active"
                : ""
            }`}
            key={index}
          >
            <Link href={item?.urlSlug}>
              <img
                src={`${
                  item?.urlSlug.includes("about")
                    ? "/assets/images/diamond-factory/faqs/about-us.svg"
                    : item?.urlSlug.includes("orders")
                    ? "/assets/images/diamond-factory/faqs/orders.svg"
                    : item?.urlSlug.includes("returns")
                    ? "/assets/images/diamond-factory/faqs/returns.svg"
                    : item?.urlSlug.includes("payments")
                    ? "/assets/images/diamond-factory/faqs/payments.svg"
                    : ""
                }`}
                alt={`${item?.name} Image`}
              />
              <div>{item?.name}</div>
              {/* <div>{item?.urlSlug.split('/')[1]}</div> */}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DfFaqs;

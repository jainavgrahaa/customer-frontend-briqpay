/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from "react";
import Link from "next/link";
import Collapse from "@mui/material/Collapse";

export default function DFMobileMenuFooter({
  siteComponentNavigations,
  footerData,
}) {
  const [toggleFooterLinks, settoggleFooterLinks] = useState(null);
  const ref = useRef(null);

  const toggleFooterCollapse = (index) => {
    if (toggleFooterLinks === index) {
      settoggleFooterLinks(null);
    } else {
      settoggleFooterLinks(index);
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  };
  const sortedData = siteComponentNavigations?.sort(
    (a, b) => a?.sequence - b?.sequence
  );
  return (
    <>
      {sortedData?.map((sectionData, index) => (
        <div
          key={sectionData?.label}
          className="footer-info footer-info-mobile"
        >
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              toggleFooterCollapse(index);
            }}
            id={index}
            className="footer-link-title"
          >
            {sectionData?.label}
            {toggleFooterLinks === index ? (
              <span className="material-icons-outlined icons-small">
                expand_less{" "}
              </span>
            ) : (
              <span className="material-icons-outlined icons-small">
                expand_more
              </span>
            )}
          </Link>
          <Collapse in={toggleFooterLinks === index}>
            {sectionData?.section?.map((item, linkIndex) => (
              <Link
                id={linkIndex}
                key={item?.label}
                href={item?.labelLink || "#"}
                className="footer-collapse-links"
              >
                <span>{item?.label}</span>
              </Link>
            ))}
          </Collapse>
        </div>
      ))}
      <div className="footer-info footer-info-mobile footer-info-mobile-certificates">
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            toggleFooterCollapse(4);
          }}
          id={4}
          className="footer-link-title"
        >
          Our certificates
          {toggleFooterLinks === 4 ? (
            <span className="material-icons-outlined icons-small">
              expand_less{" "}
            </span>
          ) : (
            <span className="material-icons-outlined icons-small">
              expand_more
            </span>
          )}
        </Link>
        <Collapse in={toggleFooterLinks === 4}>
          <ul className="cara-logos client-logos">
            {footerData?.certificates?.map(({ iconsLink, alt }, index) => (
              <li key={index}>
                <Link href="#">
                  <img
                    src={iconsLink || "assets/images/menu/mens-rings.png"}
                    alt={alt}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Collapse>
      </div>
    </>
  );
}

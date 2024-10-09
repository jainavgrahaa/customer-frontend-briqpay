import { useState, useRef } from "react";
import Link from "next/link";
import Collapse from "@mui/material/Collapse";

export default function ABMobileMenuFooter({ siteComponentNavigations }) {
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
              <span className="material-icons icons-small">
                keyboard_arrow_up
              </span>
            ) : (
              <span className="material-icons icons-small">
                keyboard_arrow_down
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
    </>
  );
}

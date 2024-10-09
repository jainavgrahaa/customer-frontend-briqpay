import React from "react";
import Link from "next/link";

const ABDesktopMenuFooter = ({ siteComponentNavigations }) => {
  const sortedMenu = siteComponentNavigations?.sort(
    (a, b) => a.sequence - b.sequence
  );
  return (
    <div className="footer-menu">
      {sortedMenu?.map((sectionData, index) => (
        <div className="footer-info footer-info-desktop" key={index}>
          <h4>{sectionData.label}</h4>
          <ul className={sectionData?.section?.length > 7 ? "two-in-row" : ""}>
            {sectionData?.section?.map((item, index) => {
              return (
                <li key={index}>
                  <Link href={item?.labelLink || "#"}>{item.label}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ABDesktopMenuFooter;

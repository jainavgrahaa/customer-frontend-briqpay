import React from "react";
import { FormattedMessage } from "react-intl";

const BreadCrumbs = ({ currentPage, className }) => {
  return (
    <>
      <ul className={`breadcrumb container ${className}`}>
        <li>
          <a href="/"><FormattedMessage id="common.home"/></a>
        </li>
        <span className="breadcrumb-separator"></span>
        <li>
          <a href="#" className="active-breadcrumb">{currentPage}</a>
        </li>
      </ul>
    </>
  );
};

export default BreadCrumbs;

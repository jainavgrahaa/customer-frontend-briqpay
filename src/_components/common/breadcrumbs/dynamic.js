import React from "react";

const BreadCrumbsDynamic = ({ currentPage }) => {
  return (
    <>
     <div className="container">
      <ul className="breadcrumb">
        {currentPage?.sort((a,b) => a.index - b.index).map((item) => {
          return (
            <>
              <li key={item?.index}>
                {item?.link ? (
                  <a href={"/"+item?.link}>{item?.label}</a>
                ) : (
                  <span className="active-breadcrumb">{item?.label}</span>
                )}
              </li>
              {item?.reqSlash && <span className="breadcrumb-separator"></span>}
            </>
          );
        })}
      </ul>
      </div>
    </>
  );
};

export default BreadCrumbsDynamic;

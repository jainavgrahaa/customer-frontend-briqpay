/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { chooseDiamondProductsListData } from "@/_utils/customApiData";
import Link from "next/link";
import Chip from "@mui/material/Chip";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const ChooseDiamondProductsList = () => {
  const [showMoreInfo, setShowMoreInfo] = useState({});
  const router = useRouter();
  const { dataList } = useSelector((state) => state.chooseDiamond);

  const toggleInfo = (productId) => {
    setShowMoreInfo((prevInfo) => ({
      ...prevInfo,
      [productId]: !prevInfo[productId],
    }));
  };

  return (
    <>
      <div className="choose-diamond-product-listing">
        <div className="product-thumb row">
          {Array.isArray(dataList) && dataList?.map((product, index) => {
            return (
              <div
                className={`product-thumb-data col-md-3 col-lg-3 col-sm-12 position-relative`}
                key={index}
              >
                <img src={product?.imgUrl} />
                <div className="product-details">
                  {product.stoneproperty.map((propVal) => (
                    <div className="property" key={propVal.label}>
                      <p className="label">{propVal.property}:</p>
                      <p className="value">{propVal.value}</p>
                    </div>
                  ))}
                </div>
                {/* <p className="price">{product.price}</p> */}
                <Link
                  href="#"
                  className={`info-link`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleInfo(product?.stones[0].stoneid);
                  }}
                >
                  {showMoreInfo[product?.id] ? "Less info" : "More info"}
                </Link>
                <div className="product-actions">
                  <button
                    className="btn-link-primary"
                    onClick={() => {
                      localStorage.setItem(
                        "selectedDiamond",
                        JSON.stringify(product)
                      );
                      router.push(
                        `/complete-review?stoneId=${product?.stones[0].stoneid}`
                      );
                    }}
                  >
                    Choose Diamond
                  </button>
                  <button className="standard-btn">
                    <span>Full specifications</span>
                    <span className="material-icons-outlined icons-small">
                      keyboard_arrow_right
                    </span>
                  </button>
                </div>
                <div className="d-flex justify-space-between align-items-center product-info-header">
                  <Chip
                    label="Sample Image"
                    color="primary"
                    variant="filled"
                    className="primary-chip br-0"
                  />
                  <svg>
                    <use
                      href={`/assets/icons/icons.svg#compare_products_icon`}
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
        <div className="view-more">
          <button className="view-more-btn btn-link-primary">View More</button>
        </div>
      </div>
    </>
  );
};

export default ChooseDiamondProductsList;

import React from "react";
import Link from "next/link";
import { div, Typography } from "@mui/material";

const ShopByPrice = () => {
  return (
    <section className="shop-by shop-by-price">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h5 className="heading">Shop by <i className="title-italic">price</i></h5>
          </div>
          <div className="col-lg-6">
            <div className="price-category-wrapper">
              <Link href="#" className="price-category">
                Up to £1,000 <span className="material-icons-outlined">chevron_right</span>
              </Link>
              <Link href="#" className="price-category">
                £1,000 - £2,500 <span className="material-icons-outlined">chevron_right</span>
              </Link>
              <Link href="#" className="price-category">
                £2,500 - £5,000 <span className="material-icons-outlined">chevron_right</span>
              </Link>
              <Link href="#" className="price-category">
                More than £5,000 <span className="material-icons-outlined">chevron_right</span>
              </Link>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ShopByPrice;

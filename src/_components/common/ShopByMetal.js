/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const ShopByMetal = () => {
  return (
    <section className="shop-by shop-by-metal">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h5 className="heading">
              Shop by <i className="title-italic">metal</i>
            </h5>
          </div>
          <div className="col-lg-6">
            <div className="price-category-wrapper">
              <Link href="#" className="price-category">
                <span className="category-type">
                  <img src="/assets/images/yellow-gold.png" /> Yellow Gold
                </span>
                <span className="material-icons-outlined">chevron_right</span>
              </Link>
              <Link href="#" className="price-category">
                <span className="category-type">
                  <img src="/assets/images/yellow-gold.png" /> Yellow Gold
                </span>
                <span className="material-icons-outlined">chevron_right</span>
              </Link>
              <Link href="#" className="price-category">
                <span className="category-type">
                  <img src="/assets/images/yellow-gold.png" /> Yellow Gold
                </span>
                <span className="material-icons-outlined">chevron_right</span>
              </Link>
              <Link href="#" className="price-category">
                <span className="category-type">
                  <img src="/assets/images/yellow-gold.png" /> Yellow Gold
                </span>
                <span className="material-icons-outlined">chevron_right</span>
              </Link>
              <Link href="#" className="price-category">
                <span className="category-type">
                  <img src="/assets/images/yellow-gold.png" /> Yellow Gold
                </span>
                <span className="material-icons-outlined">chevron_right</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopByMetal;

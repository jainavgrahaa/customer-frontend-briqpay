/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const ShopByCut = () => {
  return (
    <section className="shop-by-cut-sec">
      <div className="container">
        <h2 className="heading">Shop by <span className="italic">shape</span></h2>
        <Link href="#" className="link-primary">
          <span>Shop all shapes</span> <span className="material-icons-outlined">chevron_right</span>
        </Link>
        <ul className="cara-logos">
          <li>
            <Link href="#">
              <img src="/assets/images/shopby/round.png" alt="dimond_image" />
              <p>Round</p>
            </Link>
          </li>
          <li>
            <Link href="#">
              <img src="/assets/images/shopby/cusion.png" alt="dimond_image" />
              <p>Cusion</p>
            </Link>
          </li>
          <li>
            <Link href="#">
              <img src="/assets/images/shopby/pears.png" alt="dimond_image" />
              <p>Pears</p>
            </Link>
          </li>
          <li>
            <Link href="#">
              <img src="/assets/images/shopby/radiant.png" alt="dimond_image" />
              <p>Radiant</p>
            </Link>
          </li>
          <li>
            <Link href="#">
              <img src="/assets/images/shopby/marquise.png" alt="dimond_image" />
              <p>Marquise</p>
            </Link>
          </li>
          <li>
            <Link href="#">
              <img src="/assets/images/shopby/princess.png" alt="dimond_image" />
              <p>Princess</p>
            </Link>
          </li>
          <li>
            <Link href="#">
              <img src="/assets/images/shopby/emerald.png" alt="dimond_image" />
              <p>Emerald</p>
            </Link>
          </li>
          <li>
            <Link href="#">
              <img src="/assets/images/shopby/oval.png" alt="dimond_image" />
              <p>Oval</p>
            </Link>
          </li>
          <li>
            <Link href="#">
              <img src="/assets/images/shopby/asschers.png" alt="dimond_image" />
              <p>Asschers</p>
            </Link>
          </li>
          <li>
            <Link href="#">
              <img src="/assets/images/shopby/heart.png" alt="dimond_image" />
              <p>Heart</p>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ShopByCut;

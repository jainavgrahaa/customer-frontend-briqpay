/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const CardWithText = () => {
  return (
    <>
      <div className="card-with-text">
        <img
          src={`/assets/images/bestseller-thumb.png`}
          alt="Need it sooner?"
        />
        <div className="overlay"></div>
        <div className="card-label-text">
          <p>Need it sooner?</p>
          <Link href="#">
            Shop Quick Delivery Jewellery
            <span className="material-icons-outlined">chevron_right</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CardWithText;

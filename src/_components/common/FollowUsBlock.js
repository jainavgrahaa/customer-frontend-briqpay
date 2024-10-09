/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const FollowUsBlock = () => {
  return (
    <section className="follow-us-sec">
      <div className="container">
        <div className="heading-sec">
          <h1 className="heading">Follow Us</h1>
          <ul className="social-list">
            <li>
              <Link href="">
                <svg>
                  <use href={`/assets/icons/icons.svg#instagram_icon`} />
                </svg>
              </Link>
            </li>
            <li>
              <Link href="">
                <svg>
                  <use href={`/assets/icons/icons.svg#facebook_icon`} />
                </svg>
              </Link>
            </li>
            <li>
              <Link href="">
                <svg>
                  <use href={`/assets/icons/icons.svg#twitter_icon`} />
                </svg>
              </Link>
            </li>
          </ul>
        </div>
        <ul className="image-list">
          <li>
            <Link href="">
              <img
                src="/assets/images/austen-and-blake/product-page/follow_us_img.png"
                alt=""
              />
            </Link>
          </li>
          <li>
            <Link href="">
              <img
                src="/assets/images/austen-and-blake/product-page/follow_us_img2.png"
                alt=""
              />
            </Link>
          </li>
          <li>
            <Link href="">
              <img
                src="/assets/images/austen-and-blake/product-page/follow_us_img3.png"
                alt=""
              />
            </Link>
          </li>
          <li>
            <Link href="">
              <img
                src="/assets/images/austen-and-blake/product-page/follow_us_img4.png"
                alt=""
              />
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default FollowUsBlock;

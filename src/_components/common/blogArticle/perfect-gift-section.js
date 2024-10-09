/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { perfectGiftContentData } from "@/_utils/customApiData";
import PerfectGiftContent from "./perfect-gift-content";
import { Fragment } from "react";

export default function PerfectGiftSection() {
  return (
    <section className="favourite-gift-sec">
      <div className="favourite-wrapper">
        <h1 className="heading">Here are a few of our favourite gift ideas:</h1>
        <div className="perfect-gift">
          <img src="/assets/images/perfect-gift-for-you.png" />
          <div className="absolut-text">
            <h1 className="absolut-text-heading">The perfect gift for you</h1>
            <a href="#">Find more</a>
          </div>
        </div>
        {perfectGiftContentData.map(
          ({ heading, content, img, alt, link, linkText, icon }, index) => (
            <Fragment key={index}>
              <PerfectGiftContent
                heading={heading}
                content={content}
                img={img}
                alt={alt}
                link={link}
                linkText={linkText}
                icon={icon}
              />
            </Fragment>
          )
        )}
      </div>
    </section>
  );
}

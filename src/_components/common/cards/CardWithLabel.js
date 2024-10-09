/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { productBannerSlider } from "@/_utils/customApiData";
import ImageTurnable from "../react-image-turnable/ImageTurnable";
import HandSlider from "../handSlider/handSlider";

const CardWithLabel = ({ id, cardHeading, cardLabel, cardImage }) => {
  const [imageLink, setImageLink] = useState();
  useEffect(() => {
    const foundId = productBannerSlider.find((item) => item.id === id);
    if (foundId) {
      const imageUrl = foundId.url;
      setImageLink(imageUrl);
    }
  }, [id]);

  return (
    <>
      <div className="card-with-label" key={id}>
        {cardHeading && <h2 className="header-text">{cardHeading}</h2>}

        {/* <img
          style={{ width: "100%" }}
          src={id ? imageLink : productBannerSlider[0].url}
          alt={cardLabel}
        /> */}
        <div style={{ width: "100%", height: "60%" }}>
          <ImageTurnable />
        </div>

        <div style={{ width: "100%", height: "60%" }}>
          <HandSlider />
        </div>

        {cardLabel && (
          <div className="card-label-link">
            <Link href="#">
              {cardLabel}
              <span className="material-icons-outlined">chevron_right</span>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CardWithLabel;

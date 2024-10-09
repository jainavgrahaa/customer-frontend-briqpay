import React, { useEffect, useState } from "react";
import TextTitle from '@/_components/atoms/TextTitle';
import { Button } from '@mui/material';
import { storeTypes } from "@/_utils";

const Shape = () => {
  const [domain, setDomain] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedDomain = localStorage?.getItem("domain");
      setDomain(storedDomain);
    }
  }, []);

  if (!domain) return null;

  const shapes = [
    { src: "round.svg", alt: "Round", name: "Round" },
    { src: "princess.svg", alt: "Princess", name: "Princess" },
    { src: "cushion.svg", alt: "Cushion", name: "Cushion" },
    { src: "oval.svg", alt: "Oval", name: "Oval" },
    { src: "emerled.svg", alt: "Emerald", name: "Emerald" },
    { src: "pear.svg", alt: "Pear", name: "Pear" },
    { src: "Marquise.svg", alt: "Marquise", name: "Marquise" },
    { src: "heart.svg", alt: "Heart", name: "Heart" },
    { src: "Asscher.svg", alt: "Asscher", name: "Asscher" },
    { src: "Radiant.svg", alt: "Radiant", name: "Radiant" },
  ];
  const containerStyle = storeTypes[domain] === "df" ? { maxWidth: "730px" } : {};
  return (
    <div className="row">
      <div className="col-sm-12 col-12 mb-4">
        <div className={`${storeTypes[domain] === "df" ? "m-auto" : "light-gray-bg-4-bg"}`} style={containerStyle}>
          {storeTypes[domain] === "ab" &&
            <>
              <TextTitle
                variant="p"
                className="mb-4"
                name="Diamonds come in a variety of shapes, making this a very personal choice. Not to be confused with cut, the diamond shape refers to the final, overall shape it was cut into, and influences the entire look and feel of the diamond."
              />
              <TextTitle
                variant="p"
                className="mb-4"
                name="Round diamonds tend to show more brilliance and scintillation than other shapes and are a popular choice due to their timeless appeal. However, personal preference should prevail when choosing your ideal shape."
              />
            </>
          }
          {storeTypes[domain] === "df" &&
            <>
              <TextTitle
                variant="p"
                className="mb-5 text-center"
                name="Shape refers to the outward appearance of the diamond, not its reflective qualities,it does not relate to the cut of the diamond. At Diamonds Factory we offers the following shapes:"
              />
            </>
          }
          <div className="shape-flex d-flex flex-wrap">
            {shapes.map((shape, index) => (
              <div key={index} className="shape-item">
                <img src={`${storeTypes[domain] === "df" ?
                  "/assets/images/diamond-factory/modal-images/shapes/"
                  : "/assets/images/austen-and-blake/modal-img/shape/"}${shape.src}`} alt={shape.alt} />
                <p className={`${storeTypes[domain] === "df" ? "color-bistre-brown" : ""}`}>{shape.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shape;

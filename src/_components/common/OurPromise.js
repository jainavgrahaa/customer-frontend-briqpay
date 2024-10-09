/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";

const OurPromise = ({id, image, title ,content, date, extraClass, parentBoxClass}) => {
  return (
    <div className={`choose-section-thumb ${parentBoxClass? parentBoxClass: ''}`} key={id}>
      <div className={`choose-logo ${extraClass? extraClass: ''}`}>
        {image && (<img src={`/assets/icons/raw-svgs/${image}`} />)}
        <div className="date">{date && date}</div>
      </div>
      <div className="choose-details">
        <h6>{title}</h6>
        <p variant="body2" className="mb-0">
         {content}
        </p>
      </div>
    </div>
  );
};

export default OurPromise;

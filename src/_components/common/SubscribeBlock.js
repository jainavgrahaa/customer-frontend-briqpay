import React from "react";
//Components
import NewsLetter from "./NewsLetter";

const SubscribeBlock = () => {
  return (
    <section className="newslester-sec">
      <div className="container">
        <div className="image-sec-wrap">
          <div className="image-sec">
            <img src="/assets/images/newslester.png" alt="newslester images" />
          </div>
          <NewsLetter/>
        </div>
      </div>
    </section>
  );
};

export default SubscribeBlock;

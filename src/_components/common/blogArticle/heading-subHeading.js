import React from "react";

const HeadingSubHeading = ({
  head,
  subHead,
  textContent,
  secondParaContent,
}) => {
  return (
   
      <section className="heading-subheading-component">
        <div className="inner-content">
          <h1>{head}</h1>
          <h3>{subHead}</h3>
          <p>{textContent}</p>
          <p>{secondParaContent}</p>
        </div>
      </section>
    
  );
};

export default HeadingSubHeading;

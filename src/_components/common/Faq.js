import React from "react";
import FaqAccordion from "./FaqAccordion";

const Faq = ({ data, variant, secTitle="" , extraClass="" }) => {
  return (
    <section className={`faq-sec ${extraClass}`}>
      <div className="container">
          {secTitle == "" ? (
            ""
          ) : (
            <div className="col-lg-12">
              <h4>{secTitle}</h4>
            </div>
          )}
          <div>
            <FaqAccordion dataList={data} />
          </div>
      </div>
    </section>
  );
};

export default Faq;

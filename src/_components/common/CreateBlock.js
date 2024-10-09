/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from 'next/link'

const CreateBlock = ({ data }) => {
  return data ?
    <section className="create-design-section">
      {data.map((item, index) => (
        <div className="container" key={index}>
          <div className="create-design-heading">
            <h2 className="heading">{item.title}</h2>
            {data.subtitle && (<p>{item.subtitle}</p>)}
          </div>
          <div className="create-design-subtext">
            <p>{item.splPara1}</p>
          </div>
          <div className="row choose-section">
            {item.list.map((items, index) => (
              <div className="col-md-4" key={index}>
                <div className="choose-section-thumb">
                  <div className="choose-logo">
                    <img src={items.icon} />
                  </div>
                  <div className="choose-details">
                    <h3>{items.secTitle}</h3>
                    <p>{items.secDesc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="create-design-subtext">
            <p>{item.splPara2}</p>
          </div>

          <Link href={item.btnLink || "#"} className="btn-link-primary">{item.btnText}</Link>
        </div>
      ))}
    </section> : "";
    
};

export default CreateBlock;

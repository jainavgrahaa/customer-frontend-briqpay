/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import HandSlider from "../handSlider/handSlider";
import ImageTurnable from "../react-image-turnable/ImageTurnable";

const CustomSlider = ({ images, extraClass, setImageId }) => {
  const [start, setStart] = useState(0);
  const next = () => {
    setStart((start + 1) % images.length);
  };
  const prev = () => {
    setStart((start - 1 + images.length) % images.length);
  };

  const displayImages = [
    ...images.slice(start, start + 5),
    ...images.slice(0, (start + 5) % images.length),
  ].slice(0, 5);

  const handleChange = (id) => {
    setImageId(id);
  };

  return (
    <section
      className={`thumbslider-section 
      cat-slider ${extraClass ? extraClass : ""}`}
    >
      <div className="container">
        <div className="thumbslider-header cat-header">
          <div className="main">
            <div className="wrapper">
              <div
                className="image-container"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    height: "400px",
                    objectFit: "cover",
                    justifyContent: "center",
                  }}
                >
                  <ImageTurnable />
                </div>
                <div
                  style={{
                    height: "400px",
                    objectFit: "cover",
                    justifyContent: "center",
                  }}
                >
                  <HandSlider />
                </div>
                {displayImages.map((image, i) => (
                  <div key={image.id} onClick={() => handleChange(image.id)}>
                    <img
                      src={image.url}
                      alt={image.id}
                      style={{
                        width: "100%",
                        height: "400px",
                        cursor: "pointer",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                ))}
                <div
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: "353px",
                  }}
                  className="thumbslider-controls"
                >
                  <div
                    className="swiper-button material-icons-outlined"
                    onClick={() => next()}
                  >
                    arrow_back_ios
                  </div>
                  <div
                    className="swiper-button material-icons-outlined"
                    onClick={() => prev()}
                  >
                    arrow_forward_ios
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomSlider;

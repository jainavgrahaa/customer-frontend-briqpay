/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import useAuthHelper from "@/_hooks/useAuthHelper";
import React, { useEffect, useState } from "react";

const CustomCard = ({
  data,
  id,
  cardContents,
  time,
  addOnClaass,
  handleClick,
  activeClass,
}) => {
  const [imgUrl, setImgUrl] = useState();
  const { getMediaFile } = useAuthHelper();

  useEffect(() => {
    if (data?.imageMedia) {
      getMediaFile(data?.imageMedia?.url).then((res) => setImgUrl(res?.[0]?.signedUrl));
    }
  }, [data?.image]);

  return (
    <div
      className={`choose-section-thumb ${addOnClaass} ${activeClass}`}
      key={id + addOnClaass}
      onClick={() => handleClick(id)}
    >
      {imgUrl && (
        <div className="choose-logo">
          <img src={imgUrl} />
        </div>
      )}
      <div className="virtual-content">
        <div className="choose-details">
          <h5>{data?.appointmentTypeTranslates?.[0]?.name}</h5>
          <p>{data?.appointmentTypeTranslates?.[0]?.description || cardContents}</p>
        </div>
        {(data?.durationInMinutes || time) && (
          <div className="appointment-time">
            <span className="material-icons-outlined"> schedule </span>{" "}
            {data?.durationInMinutes || time} min
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomCard;

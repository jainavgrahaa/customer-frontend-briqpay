/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import useAuthHelper from "@/_hooks/useAuthHelper";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import Chip from "@mui/material/Chip";

const LocationDetail = ({
  durationInMinutes,
  selectedDate,
  title,
  address,
  number,
  img,
  LoclayoutSecond,
  LoclayoutFirst,
  whatsapp,
  selectedTimeSlot,
  isClosed,
  setIsVirtualModalOpen
}) => {
  const { getMediaFile } = useAuthHelper();
  const [imgUrl, setImgUrl] = useState();

  useEffect(() => {
    if (img) {
      getMediaFile(img).then((res) => setImgUrl(res?.[0]?.signedUrl));
    }
  }, [img]);

  return (
    <div className="locationDetail">
      {LoclayoutSecond && (
        <>
          <div className="collection-box">
            <div className="row">
              <div className="col-6">
                <div className="timer-label">{title}</div>
                <div className="timer">
                  <span className="material-icons-outlined">
                    {" "}
                    <FormattedMessage id="common.schedule" />{" "}
                  </span>
                  {durationInMinutes} <FormattedMessage id="view.min" />
                </div>
              </div>
              <div className="col-6">
                <div className="timer-label">
                  {" "}
                  {dayjs(selectedDate).format("LL")}
                </div>
                {dayjs(selectedTimeSlot).format("h:mm A")}
              </div>
            </div>
          </div>
          <div className="address-wrapper">
            <h5 className="mb-3">{title}</h5>
            <p>{address}</p>
            <img src={imgUrl}></img>
            <div className="appointment-btn-box"></div>
          </div>
        </>
      )}
      {LoclayoutFirst && (
        <>
          <div className="address-wrapper store-address-wrap">
            <h5 className="text-center mb-3">{title}</h5>
            <div className="text-center mb-4">
              {isClosed && (
                <Chip label="Opening soon" className="filled-chip" />
              )}
            </div>
            <div className="store-img-block">
              <img src={imgUrl}></img>
            </div>
            <p className="address">
              <span className="material-icons-outlined"> place </span>
              <span className="value-det">{address}</span>
            </p>
            <p className="call">
              <a href={`tel:${number}`}>
                <span className="material-icons-outlined"> call </span>
                <span className="value-det">{number}</span>
              </a>
            </p>
            {whatsapp !== undefined && (
              <p className="whatsapp">
                <a href={`https://wa.me/${whatsapp}`}>
                  <img src="/assets/icons/raw-svgs/whatsapp.svg"></img>
                  <span className="value-det">{whatsapp}</span>
                </a>
              </p>
            )}
            {isClosed && (
              <p className="virtual-apt-available">
                <a href={"#virtual-appointment"}>
                  <img src="/assets/icons/raw-svgs/virtual-camera.svg"></img>
                  <span className="value-det underline">
                    Virtual appointments available
                  </span>
                </a>
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default LocationDetail;

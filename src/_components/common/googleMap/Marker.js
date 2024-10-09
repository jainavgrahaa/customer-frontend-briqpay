import React from "react";
import { MarkerF } from "@react-google-maps/api";

const MarkerWrapper = ({
  data,
  onClick,
  icon,
}) => {
  const handleClick = () => {
    onClick(data);
  };

  return (
    <MarkerF
      animation={true}
      key={data.placeId}
      title={data.title}
      position={data.coords}
      clickable={true}
      onClick={handleClick}
      icon={icon}
    />
  );
};

export default MarkerWrapper;



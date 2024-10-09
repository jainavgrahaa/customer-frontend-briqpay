import { useState } from "react";
import { useServerRender } from "@/_hooks/useServerRender";
import useDeviceHelper from "@/_hooks/useDeviceHelper";
import { splitAndJoin } from "@/_utils";

const Description = ({
  data,
  width,
  isAboveDesc,
  readMoreReq,
  deviceType: device,
}) => {
  const [isReadMore, setReadMore] = useState(false);
  const { isServer } = useServerRender();
  const splitText = data?.text?.split(".");
  const firstSentence = splitText?.at(0);
  const { deviceType } = useDeviceHelper(device);
  return !readMoreReq ? (
    <div
      className={isAboveDesc ? "d-description" : "d-description-below"}
      style={{
        padding: splitAndJoin("padding", deviceType, data) || "initial",
        margin: splitAndJoin("margin", deviceType, data),
        textAlign: data?.align,
      }}
    >
      {data?.text}
    </div>
  ) : (
    <div
      className={isAboveDesc ? "d-description" : "d-description-below"}
      style={{
        padding: splitAndJoin("padding", deviceType, data) || "",
        margin: splitAndJoin("margin", deviceType, data),
        textAlign: data?.align,
        // width: width + "%"
      }}
    >
      {isServer && isReadMore && readMoreReq ? data?.text : firstSentence}
      {!readMoreReq && !splitText?.at(1) && data?.text} {!isReadMore ? "." : ""}
      {readMoreReq && <> &nbsp; &nbsp;</>}
      {isServer && readMoreReq && !!splitText?.at(1) && (
        <span id="read-more" onClick={() => setReadMore(!isReadMore)}>
          {!isReadMore ? "Read more" : "Read less"}
        </span>
      )}
    </div>
  );
};

export default Description;

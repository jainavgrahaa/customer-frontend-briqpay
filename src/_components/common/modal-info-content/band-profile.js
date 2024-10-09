import React, { useEffect, useState } from "react";
import TextTitle from '@/_components/atoms/TextTitle';
import { storeTypes } from "@/_utils";
import useDeviceHelper from "@/_hooks/useDeviceHelper";
const BandProfile = () => {
  const { deviceType } = useDeviceHelper();
  const [domain, setDomain] = useState('');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedDomain = localStorage?.getItem("domain");
      setDomain(storedDomain);
    }
  }, []);

  if (!domain) return null;
  return (
    <>
    {storeTypes[domain] === "df" &&
       <div className={`m-auto ${deviceType === "mobile" ? "text-center" : ""}`} style={{maxWidth: "860px"}}>
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-sm-12">
             <TextTitle variant="h4" className={"mb-2 color-bistre-brown"} name={"Court"}/>
             <TextTitle variant="p" className={"mb-4"} name={"A court finish features a soft rounded interior and exterior which sits on the finger comfortably."}/>
            </div>
            <div className="col-xl-6 col-lg-6 col-sm-12">
             <TextTitle variant="h4" className={"mb-2 color-bistre-brown"} name={"D-Shape"}/>
             <TextTitle variant="p" className={"mb-4"} name={"Rounded on the outside, a D-shape profile lays flat on the inside against a finger and closer to the skin."}/>
            </div>
            <div className="col-xl-6 col-lg-6 col-sm-12">
             <TextTitle variant="h4" className={"mb-2 color-bistre-brown"} name={"Flat-Court"}/>
             <TextTitle variant="p" className={"mb-4"} name={"A flat court profile gives a more structured look on the outside, with court comfort on the inside."}/>
            </div>
            <div className="col-xl-6 col-lg-6 col-sm-12">
             <TextTitle variant="h4" className={"mb-2 color-bistre-brown"} name={"Double Comfort"}/>
             <TextTitle variant="p" className={"mb-4"} name={"A double comfort profile is flat on both the outside and inside, with rounded corners."}/>
            </div>
            <div className="col-xl-6 col-lg-6 col-sm-12">
             <TextTitle variant="h4" className={"mb-2 color-bistre-brown"} name={"Flat Sided Court"}/>
             <TextTitle variant="p" className={"mb-4"} name={"Rounded on the outside and inside, a flat-sided court finish has flat side and less rounded properties."}/>
            </div>
            <div className="col-xl-6 col-lg-6 col-sm-12">
             <TextTitle variant="h4" className={"mb-2 color-bistre-brown"} name={"Flat"}/>
             <TextTitle variant="p" className={"mb-4"} name={"A more modern choice, a flat profile is flat on both the inside and outside with sharp angled corners."}/>
            </div>
            <div className="col-xl-6 col-lg-6 col-sm-12">
             <TextTitle variant="h4" className={"mb-2 color-bistre-brown"} name={"Concave"}/>
             <TextTitle variant="p" className={"mb-4"} name={"A unique choice, a concave profile has a rounded interior and an inward concave exterior that creates a dip."}/>
            </div>
          </div>
       </div>
    }
    </>
  );
};

export default BandProfile;

import React, { useEffect, useState } from "react";
import TextTitle from '@/_components/atoms/TextTitle';
import { storeTypes } from "@/_utils";
import useDeviceHelper from "@/_hooks/useDeviceHelper";
const BandFinish = () => {
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
            <img src="/assets/images/diamond-factory/modal-images/band-finish/band-finish.png" alt="Band Finish" className="mb-3"/>
            </div>
            <div className="col-xl-6 col-lg-6 col-sm-12">
             <TextTitle variant="h4" className={"mb-2"} name={"Fine Matte"}/>
             <TextTitle variant="p" className={"mb-4"} name={"Often referred to as a satin finish, fine matt offers a non-reflective look with a matte texture. Using a bristle polishing mop, parallel lines are added around the band of the ring."}/>
             <TextTitle variant="h4" className={"mb-2"} name={"Mirror"}/>
             <TextTitle variant="p" className={"mb-4"} name={"Super-reflective with a mirror-like surface that catches light effortlessly. A mirror finish is ideal for plain rings."}/>
             <TextTitle variant="h4" className={"mb-2"} name={"Sandblasted"}/>
             <TextTitle variant="p" className={"mb-4"} name={"Created using sand blasting and high levels of pressure. A sandblast finish features a rougher look with tiny flecks of texture. "}/>
             <TextTitle variant="h4" className={"mb-2"} name={"Polished"}/>
             <TextTitle variant="p" className={"mb-4"} name={"A polished ring is super shiny and reflective with a smooth glossy finish. You should be able to see reflections in this finish."}/>
            </div>
          </div>
       </div>
    }
    </>
  );
};

export default BandFinish;

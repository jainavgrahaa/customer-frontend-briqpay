import React, { useEffect, useState } from "react";
import TextTitle from '@/_components/atoms/TextTitle';
import { storeTypes } from "@/_utils";
import useDeviceHelper from "@/_hooks/useDeviceHelper";
const Fluorescence = () => {
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
    <div className="row">
       <div className="col-sm-12 col-12 mb-4">
         <div className="light-gray-bg-4-bg">
           <TextTitle variant="p" className={"mb-4"} name={"The diamond’s response to ultraviolet light. Roughly 35% of all diamonds have fluorescence to some degree. A Gemological Institute of America study has shown that fluorescence has no widely noticeable effect on the diamond appearance. Very rarely (less that 0.2%) of very strong diamonds many appear hazy."} />
           <div className="text-center">
           <img src="/assets/images/austen-and-blake/modal-img/Fluorescence/Fluorescence.png" alt="Fluorescence" className="mt-4"/>
           </div>
        </div>
       </div>
    </div>
    }
    {storeTypes[domain] === "ab" &&
       <div className="m-auto text-center" style={{maxWidth: "860px"}}>
       <TextTitle variant="p" className={"mb-4 text-center"} name={"The diamonds response to ultraviolet light. Roughly 35% of all diamonds have fluorescence to some degree. A GIA study has shown that fluorescence has no widely noticeable effect on the diamond appearance. Very rarely (less that 0.2%) of very strong diamonds many appear hazy."} />
       <img src={`${deviceType === "mobile" ? 
         "/assets/images/diamond-factory/modal-images/flurosence/flurosence-mob.png" 
         : "/assets/images/diamond-factory/modal-images/flurosence/flurosence.png"}`} 
         alt="flurosence" className="mt-3" />
    </div>
    }
    </>
  );
};

export default Fluorescence;

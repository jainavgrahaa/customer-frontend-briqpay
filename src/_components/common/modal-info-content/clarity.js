import React, { useEffect, useState } from "react";
import TextTitle from '@/_components/atoms/TextTitle';
import { storeTypes } from "@/_utils";
import useDeviceHelper from "@/_hooks/useDeviceHelper";
const Clarity = () => {
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
    {storeTypes[domain] === "ab" &&
    <div className="row">
       <div className="col-sm-12 col-12 mb-4">
         <div className="light-gray-bg-4-bg">
           <TextTitle variant="p" className={"mb-4"} name={"Diamond clarity is the assessment of imperfections on the surface or within the diamond. Inclusions are internal defects and are very common within most diamonds, whereas flaws to the surface are known as blemishes. Diamonds with the least amount of defects will have a higher clarity grading. Inclusions can appear black, grey or white in appearance and are graded under x10 magnification. Five grading factors which are considered are:"} />
           <ul className="list-styled mb-4">
            <li>The size of the inclusions</li>
            <li>Number of inclusions</li>
            <li>Position of the inclusions</li>
            <li>Colour and relief of the inclusions</li>
            <li>Nature of the inclusions</li>
           </ul>
           <p>Most diamonds are imperfect, however, our most popular grade is VS1 - VS2 due to appearing almost flawless to the naked eye, making them a good value option.</p>
           <div className="text-center">
           <img src={`${deviceType === "mobile" ? 
            "/assets/images/austen-and-blake/modal-img/clarity/clarity-mob.png" 
            : "/assets/images/austen-and-blake/modal-img/clarity/clarity.png"}`} 
            alt="Clarity" className="mt-3" />
           </div>
        </div>
       </div>
    </div>
    }
    {storeTypes[domain] === "df" &&
       <div className="m-auto text-center" style={{maxWidth: "860px"}}>
          <TextTitle variant="p" className={"mb-4 text-center"} name={"A diamond's clarity refers to the presence of impurities on the within the stone. When a rough stone is extracted from carbon deep beneath the earth, tiny elements are almost always inside. These elements are called flaws or inclusions because they are forms naturally and are unique to each stone."} />
          <img src={`${deviceType === "mobile" ? 
            "/assets/images/diamond-factory/modal-images/clarity/clarity-mob.png" 
            : "/assets/images/diamond-factory/modal-images/clarity/clarity.png"}`} 
            alt="Clarity" className="mt-3" />
          <TextTitle variant="p" className={"mb-4 text-center mt-4"} name={"Slightly Included 1. Inclusions visible to a skilled grader under 10x magnification; possibly visible with the naked eye."} />
       </div>
    }
    </>
  );
};

export default Clarity;

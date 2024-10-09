import React, { useEffect, useState } from "react";
import TextTitle from '@/_components/atoms/TextTitle';
import { Button } from '@mui/material';
import { storeTypes } from "@/_utils";
import useDeviceHelper from "@/_hooks/useDeviceHelper";
const Colour = () => {
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
           <TextTitle variant="p" className={"mb-4"} name={"Colour is another very important factor to consider when choosing diamonds. Rarity and purity are measured by a diamond’s lack of colour. Higher quality diamonds will have a pure, bright white appearance, whereas those lower in quality will have noticeable colour. To the untrained eye, this can be tricky to spot. In the mid-1950s the Gemological Institute of America devised a colour grade scale between D-Z, to regulate and define the colour spectrum of diamonds. With D being completely colourless and Z being slightly yellow or brown in appearance. The colour of the diamond has a huge impact on its value. However, this rule is not to be confused with coloured diamonds. Coloured diamonds are graded on a separate diamond colour scale and can even be more rare or valuable than the diamond."} />
           <img src="/assets/images/austen-and-blake/modal-img/colour/colour.png" alt="Yellow gold" className="w-100"/>
        </div>
       </div>
    </div>
    }
      {storeTypes[domain] === "ab" &&
       <div className="m-auto text-center" style={{maxWidth: "860px"}}>
          <TextTitle variant="p" className={"mb-4 text-center"} name={"The natural colour visible in a diamond, which does not change over time.Colourless diamonds allow more light to pass through them, making the diamond sparkle."} />
          <img src={`${deviceType === "mobile" ? 
            "/assets/images/diamond-factory/modal-images/color/color-mob.png" 
            : "/assets/images/diamond-factory/modal-images/color/color.png"}`} 
            alt="color" className="mt-3" />
          <TextTitle variant="p" className={"mb-4 text-center mt-4"} name={"Near Colourless: Slight colour detected, particularly in large carat sizes and step cuts (Emerald/Asscher).A good value."} />
       </div>
    }
   </>
  );
};

export default Colour;

import React, { useEffect, useState } from "react";
import TextTitle from '@/_components/atoms/TextTitle';
import { Button } from '@mui/material';
import { storeTypes } from "@/_utils";
const Carat = () => {
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
        <div className="m-auto" style={{maxWidth: "860px"}}>
        <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6 col-sm-12">
              <img src={`/assets/images/diamond-factory/modal-images/carat/carat.png`} alt={`Carat`} />
            </div>
            <div className="col-xl-6 col-lg-6 col-sm-12">
             <TextTitle variant="p" className={"mb-4"} name="Carat refers to the weight of the diamond and the overall diameter of the diamond, not the size.Carat weight is often confused with visual size, but it is actually the weight measurement of the diamond." />
             <TextTitle variant="p" name="Total carat weight refers to the total weight of all the stones used in one piece of jewellery,when more than one diamond is used. For example, diamond earrings are usually quoted undertotal carat highlighting the combined weight of both earrings." />
            </div>
        </div>
        <div className="mt-4">
              <img src={`/assets/images/diamond-factory/modal-images/carat/pb.png`} alt={`Carat`} />
        </div>
    </div>
      }
    </>
  );
};

export default Carat;

import React, { useEffect, useState } from "react";
import TextTitle from '@/_components/atoms/TextTitle';
import { Button } from '@mui/material';
import { storeTypes } from "@/_utils";
const RingSize = () => {
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
          <div className="col-xl-6 col-lg-6 col-sm-12 col-12 mb-4">
            <div className="light-gray-bg-4-bg">
              <TextTitle variant="h3" name={"Free ring sizer"} />
              <TextTitle variant="p" name={"If you'd like to measure your ring size at home, we can send you a complimentary plastic ring sizer that's quick and easy to use."} />
              <img src="/assets/images/austen-and-blake/modal-img/ring-size/free-ring-size.png" alt="free-ring-size" className="mb-3" />
            </div>
            <div className="mt-4 text-center">
              <Button variant="outlined">Request your free sizer</Button>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-sm-12 col-12 mb-4">
            <div className="light-gray-bg-4-bg">
              <TextTitle variant="h3" name={"Ring size guide"} />
              <TextTitle variant="p" name={"If you need to find your ring size immediately, you can print our free guide. You'll need a printer and Adobe Acrobat Reader."} />
              <img src="/assets/images/austen-and-blake/modal-img/ring-size/ring-size-guide.png" alt="free-ring-size" className="mb-3" />
            </div>
            <div className="mt-4 text-center">
              <Button variant="outlined">Download our free guide</Button>
            </div>
          </div>
        </div>
      }
      {storeTypes[domain] === "df" &&
        <div className="row align-items-center mt-4 mb-4">
          <div className="col-xl-6 col-lg-6 col-sm-12">
            <img src={`/assets/images/diamond-factory/modal-images/ringsize/ring-size-2.png`} alt={`Natural diamond`} />
          </div>
          <div className="col-xl-6 col-lg-6 col-sm-12 mt-4 mb-4">
            <TextTitle variant="h4" name="Free Ring Sizer" />
            <TextTitle variant="p" className={"mt-3 mb-3"} name="We are happy to send you a complimentary plasticring size so that you can easily measure your ring sizeat home." />
            <Button variant="contained">Request Free Sizer</Button>
          </div>
          <div className="col-xl-6 col-lg-6 col-sm-12 mt-4 mb-4">
            <img src={`/assets/images/diamond-factory/modal-images/ringsize/ring-size-1.png`} alt={`Natural diamond`} />
          </div>
          <div className="col-xl-6 col-lg-6 col-sm-12 mt-4 mb-4">
            <TextTitle variant="h4" name="Ring Size Guide" />
            <TextTitle variant="p" className={"mt-3 mb-3"} name="If you would like to determine your ring size immediately, we suggest that you print our simple Ring Sizing Guide and read the instructions carefully. Before you print, be sure to check that page scaling is set to none on your print dialog box. In order to view this guide, you will need to use Adobe Acrobat Reader. Download it for free." />
            <Button variant="contained">Download / View Guide</Button>
          </div>
        </div>
      }
    </>
  );
};

export default RingSize;

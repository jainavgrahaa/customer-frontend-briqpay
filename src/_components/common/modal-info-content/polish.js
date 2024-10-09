import React, { useEffect, useState } from "react";
import TextTitle from '@/_components/atoms/TextTitle';
import { storeTypes } from "@/_utils";
const Polish = () => {
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
           <TextTitle variant="p" className={"mb-4"} name={"The finish of the facets of the diamond. If the diamond is finished poorly, it can leave the surface scratched or marked. When a diamond has no scratches or very minimal ones, the polish is of a high degree. If the scratches are significant, it can affect the overall cut grade of the diamond."} />
           <div className="text-center">
           <img src="/assets/images/austen-and-blake/modal-img/polish/polish.png" alt="Polish" className="mt-4"/>
           </div>
        </div>
       </div>
    </div>
    }
    {storeTypes[domain] === "df" &&
      <div className="m-auto" style={{maxWidth: "860px"}}>
         <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 col-sm-12">
            <img src="/assets/images/diamond-factory/modal-images/polish/polish.png" alt="Polish" className="mb-3"/>
          </div>
          <div className="col-xl-6 col-lg-6 col-sm-12">
            <TextTitle variant="p" className={"mb-4"} name={"The finish of the facets of the diamond. If the diamondis finished poorly, it can leave surface scratches or marks. When a diamond has no scratches or very minimal ones, the polish is of a high degree.If the scratches are significant, it can affect theoverall cut grade of the diamond."}/>
          </div>
         </div>
      </div>
    }
  </>
  );
};

export default Polish;

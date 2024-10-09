import React, { useEffect, useState } from "react";
import TextTitle from '@/_components/atoms/TextTitle';
import { storeTypes } from "@/_utils";
const Symmetry = () => {
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
           <TextTitle variant="p" className={"mb-4"} name={"The alignment of the facets of the diamond. When the facets are balanced and aligned, the stone has symmetry. This is critical to the diamond’s radiance."} />
           <div className="text-center">
           <img src="/assets/images/austen-and-blake/modal-img/symmetry/Symmetry.png" alt="Symmetry" className="mt-4"/>
           </div>
        </div>
       </div>
    </div>
    }
    {storeTypes[domain] === "df" &&
       <div className="m-auto text-center" style={{maxWidth: "860px"}}>
          <TextTitle variant="p" className={"mb-4"} name={"The alignment of the facets of the diamond, when the facets are balanced and aligned the stone has symmetry.This is critical to the diamonds radiance."}/>
          <img src="/assets/images/diamond-factory/modal-images/symmetry/symmetry.png" alt="Symmetry" className="mt-4"/>
       </div>
    }
    </>
  );
};

export default Symmetry;

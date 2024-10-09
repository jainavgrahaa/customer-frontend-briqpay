import React, { useEffect, useState } from "react";
import TextTitle from '@/_components/atoms/TextTitle';
import { storeTypes } from "@/_utils";
const CutGrade = () => {
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
           <TextTitle variant="p" className={"mb-4"} name={"Not to be confused with the shape or size of the diamond, the cut is all about proportions. A well-cut diamond reflects light and brilliance to ensure maximum sparkle, and is possibly the most important factor to consider when purchasing diamonds. Even a diamond with perfect clarity and colour grade can appear dull if it has been cut poorly."} />
           <TextTitle variant="p" className={"mb-4"} name={"Diamonds which are cut in equal proportion enable light to be returned out of the top, producing the signature sparkle. If they are cut too deep then light is transferred out of the side, whereas too shallow and light will return from the bottom creating a less lustrous appearance. Grades are assigned using the diamond cut grade guidelines established by the Gemological Institute of America. Diamonds which are assigned ideal, excellent or very good cut grades are considered well cut."} />
           <div className="text-center">
           <img src="/assets/images/austen-and-blake/modal-img/cut/cut-grade.png" alt="Cut Grade" className="mt-4"/>
           </div>
        </div>
       </div>
    </div>
    }
    {storeTypes[domain] === "ab" &&
      <div className="m-auto text-center" style={{maxWidth: "860px"}}>
       <TextTitle variant="p" className={"mb-5"} name={"The angles and proportions of the diamond. Referring to the depth and width of the diamond andthe symmetry of the facets. The precision of the cut determines it’s beauty and how well the light reflectsand refracts the light; it’s sparkle and fire."} />
       <div className="row">
          <div className="col-xl-4 col-lg-4 col-sm-12 text-center">
            <img src="/assets/images/diamond-factory/modal-images/cutgrade/ideal.png" alt="Cut Grade ideal" className="mb-3"/>
            <TextTitle variant="h4" className={"mb-4 color-bistre-brown"} name={"Ideal"}/>
          </div>
          <div className="col-xl-4 col-lg-4 col-sm-12 text-center">
            <img src="/assets/images/diamond-factory/modal-images/cutgrade/deep.png" alt="Cut Grade deep" className="mb-3"/>
            <TextTitle variant="h4" className={"mb-4 color-bistre-brown"} name={"Deep"}/>
          </div>
          <div className="col-xl-4 col-lg-4 col-sm-12 text-center">
            <img src="/assets/images/diamond-factory/modal-images/cutgrade/shalow.png" alt="Cut Grade shalow" className="mb-3"/>
            <TextTitle variant="h4" className={"mb-4 color-bistre-brown"} name={"Shalow"}/>
          </div>
       </div>
      </div>
    }
    </>
  );
};

export default CutGrade;

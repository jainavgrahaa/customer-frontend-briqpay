import React, { useEffect, useState } from "react";
import TextTitle from '@/_components/atoms/TextTitle';
import { storeTypes } from "@/_utils";
const Certificate = () => {
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
           <TextTitle variant="p" className={"mb-4"} name={"At Austen & Blake confidence and credibility is important to us, therefore we provide diamond certification for every diamond in which we sell. A diamond certification is an impartial summary of the authenticity of a diamond and its specifications, such as carat, clarity and cut. It is carried out by expert gemologists or diamond laboratories. This document is important as it provides the purchaser with reassurance that the diamond is as described by the seller."} />
           <p><strong>Austen & Blake:</strong> Free of charge and issued by our in-house gemologist. This certificate displays carat weight, colour, clarity of the diamonds, design number and diamond shapes (multi-stone options).</p>
           <p><strong>EGL (European Gemological Laboratory):</strong> A third-party option who is one of the few laboratories to group grade readymade jewellery products, for example, our multi-stone products such as tennis bracelets and eternity rings.</p>
           <p><strong>IGI (International Gemological Institute) & GIA (Gemological Institute of America):</strong>  World-renowned independent labs that are considered to be the strictest in the industry. Certificates will display carat weight, colour, clarity, diamond shape, cut, polish, symmetry, fluorescence levels, types of inclusions and certificate number.</p>
           <p>As your certificate provides invaluable security in the case of loss, trade or resale, it is important to keep this document safe. Whenever the diamond may leave your possession (for example, to be cleaned) it is a good idea to remind the party taking possession of the diamond that you have a certificate. This should remove any temptation of third-party fraud.</p>
           <div className="text-center">
           <img src="/assets/images/austen-and-blake/modal-img/certificate/certificate.png" alt="Certificate" className="mt-4"/>
           </div>
        </div>
       </div>
    </div>
    }
     {storeTypes[domain] === "df" &&
       <div className="m-auto" style={{maxWidth: "860px"}}>
          <TextTitle variant="p" className={"mb-4"} name={"One of the reasons why our 50,000+ happy customers purchase from us is due to the absolute confidencethey have in the credibility of our diamonds. We provide diamond certification for every diamond that we sell."} />
          <div className="row">
             <div className="col-xl-6 col-lg-6 col-sm-12">
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-sm-6 col-6">
                   <img src="/assets/images/diamond-factory/modal-images/certificate/gia.png" alt="GIA Certificate" className="mt-4"/>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-sm-6 col-6">
                   <img src="/assets/images/diamond-factory/modal-images/certificate/igi.png" alt="IGI Certificate" className="mt-4"/>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-sm-6 col-6">
                   <img src="/assets/images/diamond-factory/modal-images/certificate/egl.png" alt="EGL Certificate" className="mt-4"/>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-sm-6 col-6">
                   <img src="/assets/images/diamond-factory/modal-images/certificate/df.png" alt="DF Certificate" className="mt-4"/>
                  </div>
                </div>
             </div>
             <div className="col-xl-6 col-lg-6 col-sm-12">
               <TextTitle variant="h4" className={"mb-2"} name={"What is Diamond Certification?"}/>
               <TextTitle variant="p" className={"mb-4"} name={"Diamond certification is a summary of the authenticity and specification of a given diamond."}/>
               <TextTitle variant="h4" className={"mb-2"} name={"Who provides the Certification?"}/>
               <TextTitle variant="p" className={"mb-4"} name={"In order to ensure that diamonds are certified correctly, they are examined by a gemologist or diamond laboratory. With gemologists who have trained at institutions including the Gemological Institute of America, International Gemological Institute and European Gemological Laboratory, you can choose the certification that you want to accompany your diamond purchase."}/>
               <TextTitle variant="h4" className={"mb-2"} name={"How is the Certification carried out?"}/>
               <TextTitle variant="p" className={"mb-4"} name={"Many Diamond or Jewellery are sent to a third party laboratory for a comprehensive evaluation, or they are graded by our qualified gemologist. Each diamond certificate is uniquely numbered and corresponds to a specific Diamond or Jewellery. The Diamond or Jewellery and its certificate will then stay together from seller to buyer, for life."}/>
               <TextTitle variant="h4" className={"mb-2"} name={"Always request a Diamond Certificate."}/>
               <TextTitle variant="p" className={"mb-4"} name={"Authentic diamond certification provides an impartial expert judgment of the characteristics and quality of a given Diamond or Jewellery. This certification provides the purchaser with the assurance that the diamond is as described by the seller."}/>
               <TextTitle variant="h4" className={"mb-2"} name={"Diamond Certificate vs Valuation Certificate"}/>
               <TextTitle variant="p" className={"mb-4"} name={"A laboratory certification is not a valuation certificate. A Valuation seeks to establish the value of an item, mainly for insurance purposes. A diamond certificate does not evaluate a diamond's market value, only its characteristics and quality. That said, diamond certification from a reputable laboratory is invaluable in generating an accurate appraisal. All our products come with free valuation certificate for insurance purpose."}/>
               <TextTitle variant="p" className={"mb-4"} name={"Keep your certificate in a safe place. It provides invaluable security in the case of loss (helping to establish the quality and size of diamond required for equitable replacement), trade, or resale. Whenever the diamond must leave your possession (for example, to be cleaned), always let the party taking possession know you have a certificate. Knowing you can positively identify your diamond removes any temptation on the part of the third party to commit fraud (such as switching the diamond for one of lower quality)."}/>
             </div>
          </div>
       </div>
     }
    </>
  );
};

export default Certificate;

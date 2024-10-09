import React, { useState } from "react";
import TellUsModal, { DETAILS_MODAL } from "../staticLayout/tellUsModal";
import TextTitle from '@/_components/atoms/TextTitle';
import { Button } from "@mui/material";
function HowItWork({ storeId, translateId }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
    <section className="how-it-works-sec aliceBlue pt-60 pb-60">
      <div className="fixed-container">
        <div className="text-center mb-5">
        <TextTitle variant="h1" name={"How it works"} />
        </div>
        <div className="row">
           <div className="col-xl-4 col-lg-4 col-sm-12">
               <div className="img-block text-center mb-3"><img src="/assets/images/bespoke/How-it-works-1.png" alt="How It Works Step"/></div>
           </div>
           <div className="col-xl-4 col-lg-4 col-sm-12">
               <div className="img-block text-center mb-3"><img src="/assets/images/bespoke/How-it-works-2.png" alt="How It Works Step"/></div>
           </div>
           <div className="col-xl-4 col-lg-4 col-sm-12">
              <div className="img-block text-center mb-3"><img src="/assets/images/bespoke/How-it-works-3.png" alt="How It Works Step"/></div>
           </div>
        </div>
        <div className="text-center">
          <TextTitle variant="p" name={"We've helped over 20,000 people create their dream jewellery."} className={"mb-5 mt-5"} />
          <Button variant="outlined" onClick={() => setIsOpen(true)}>Make a request</Button>
        </div>
      </div>
    </section>
    <TellUsModal isOpen={isOpen} setIsOpen={setIsOpen} handleCloseModal={handleCloseModal} storeId={storeId} translateId={translateId} />
    </>
  );
}

export default HowItWork;

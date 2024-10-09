/* eslint-disable @next/next/no-img-element */
import React from "react";

const Metal = () => {
  return (
    <div className="light-gray-bg-4-bg">
    <p>From the classic and elegant appeal of yellow gold, the versatile and durable qualities of platinum and the unique on-trend blush tone of rose gold, there are so many options when it comes to choosing your metal type. Similarly to choosing diamonds, personal preference is key as the type of metal chosen has a distinct correlation to the complete look and feel of the jewellery piece.</p>
    <p><strong>Yellow gold:</strong> Yellow gold is considered a classic and traditional choice for jewellery. It is suggested that for those wishing to wear their jewellery on an everyday basis to choose a lower carat as the gold purity is lower, making it a more robust option.</p>
    <p><strong>White gold:</strong> Incredibly elegant and contemporary, white gold is a great choice for those wishing to wear with silver jewellery, as the shades complement each other. It also proves a wonderful setting for coloured stones due to the versatile tone of the metal.</p>
    <p><strong>Rose gold:</strong> Fashionable and elegant, rose gold has been used to create jewellery since the 1920s, however, has risen to popularity more recently possibly due to its stunning and surprisingly versatile blush hue.</p>
    <p><strong>Platinum:</strong> Both durable and versatile, platinum is a great option for those looking for a hard-wearing metal which oozes stylish simplicity. This precious metal is naturally white in colour, making it a wonderful option for pairing with any type of gemstone.</p>
    <div className="row mt-4">
       <div className="col-xl-3 col-lg-3 col-sm-6 col-6">
          <div className="text-center">
           <img src="/assets/images/austen-and-blake/modal-img/Metal/yellow-gold.png" alt="Yellow gold" className="mb-3"/>
           <p>Yellow gold</p>
           </div>
       </div>
       <div className="col-xl-3 col-lg-3 col-sm-6 col-6">
          <div className="text-center">
           <img src="/assets/images/austen-and-blake/modal-img/Metal/white-gold.png" alt="Yellow gold" className="mb-3"/>
           <p>White gold</p>
           </div>
       </div>
       <div className="col-xl-3 col-lg-3 col-sm-6 col-6">
          <div className="text-center">
           <img src="/assets/images/austen-and-blake/modal-img/Metal/rose-gold.png" alt="Yellow gold" className="mb-3"/>
           <p>Rose gold</p>
           </div>
       </div>
       <div className="col-xl-3 col-lg-3 col-sm-6 col-6">
          <div className="text-center">
           <img src="/assets/images/austen-and-blake/modal-img/Metal/platinum.png" alt="Yellow gold" className="mb-3"/>
           <p>Platinum</p>
           </div>
       </div>
    </div>
</div>
  );
};

export default Metal;

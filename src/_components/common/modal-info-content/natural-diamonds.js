/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import TextTitle from '@/_components/atoms/TextTitle';
import { storeTypes } from "@/_utils";

const NaturalDiamonds = () => {
    const [domain, setDomain] = useState('');
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedDomain = localStorage?.getItem("domain");
            setDomain(storedDomain);
        }
    }, []);

    if (!domain) return null;

    return (
        <div className="row">
            <div className="col-sm-12 col-12 mb-4">
                {storeTypes[domain] === "df" &&
                    <div className="m-auto" style={{maxWidth: "860px"}}>
                        <div className="row align-items-center">
                            <div className="col-xl-6 col-lg-6 col-sm-12">
                              <img src={`/assets/images/diamond-factory/modal-images/natural-diamond/natural-diamond.png`} alt={`Natural diamond`} />
                            </div>
                            <div className="col-xl-6 col-lg-6 col-sm-12">
                             <TextTitle variant="p" name="Diamonds are incredibly rare and known as the purest form of transparent carbon. They’re formed naturally from billions of carbon atoms that live deep down below the earth's surface, and created via an intense amount of heat and high pressure conditions. Over time, they are then transported above the earth's surface in volcanos, these are then mined and discovered. Natural diamond formation can take anywhere from 1 to over 3 billion years making them a real spectacle of nature. " />
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default NaturalDiamonds;

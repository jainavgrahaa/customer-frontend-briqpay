import React, { useEffect, useState } from "react";
import TextTitle from '@/_components/atoms/TextTitle';
import { storeTypes } from "@/_utils";
const Gemstonequality = () => {
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
               {storeTypes[domain] === "ab" &&
                <div className="light-gray-bg-4-bg">
                    <p><strong>A quality:</strong> Generally darker in appearance with lesser intensity in the colour and more inclusions present.</p>
                    <p><strong>AA quality:</strong> A little lighter in colour when compared to A quality gemstones with fewer inclusions allowing for a more appealing colour.</p>
                    <p><strong>AAA quality:</strong> A richer, more vivid colour gemstone with fewer inclusions than both A and AA quality gemstones.</p>
                    <p><strong>AAAA or Heirloom quality:</strong> These gemstones can amount to the top 1 - 10% of gemstones when it comes to the differentiation of Sapphires (S), Rubies (R) and Emeralds (EM). With either exceptional red hues (R) or rich greens (EM), or intense colours and very very slight inclusions when it comes to (S). AAAA is the most desirable gemstone quality.</p>
                    <div className="text-center">
                        <img src="/assets/images/austen-and-blake/modal-img/gemstone-quality/gemstone-quality.png" alt="Symmetry" className="mt-4" />
                    </div>
                </div>
                }
                {storeTypes[domain] === "df" &&
                    <div className="m-auto" style={{maxWidth: "860px"}}>
                        <div className="row align-items-center">
                            <div className="col-xl-6 col-lg-6 col-sm-12">
                              <img src={`/assets/images/diamond-factory/modal-images/gemstone/gemstone.png`} alt={`Natural diamond`} />
                            </div>
                            <div className="col-xl-6 col-lg-6 col-sm-12">
                             <TextTitle variant="p" name="Gemstones are rare minerals or rocks that are cut carefully with precision and then polished to reveal their true beauty and rarity. Gemstones are often loved for their colour and durability and in today's day and age are often associated with birthstones." />
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Gemstonequality;

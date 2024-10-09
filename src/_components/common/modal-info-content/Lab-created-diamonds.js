/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import TextTitle from '@/_components/atoms/TextTitle';
import { storeTypes } from "@/_utils";

const LabCreatedDiamond = () => {
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
                        <TextTitle variant="p" className="mb-4" name="Lab created diamonds are often referred to as ‘man-made’ or ‘cultured’ diamonds. As the name suggests, they are made in a laboratory compared to natural diamonds which form in the Earth’s mantle. In order to make lab grown diamonds, our experts deeply understand the formation of the natural diamond in order to mimic their growing conditions in the lab." />
                        <TextTitle variant="p" className="mb-4" name="We can explain the process of growing diamonds in four steps..." />
                        <div className="text-center mb-3">
                            <img src={deviceType === "mobile" ? "/assets/images/austen-and-blake/modal-img/lab-created-diamonds/lab-created-diamond-mob.png" : "/assets/images/austen-and-blake/modal-img/lab-created-diamonds/lab-created-diamond.png"} alt="Lab Created Diamond" className="mt-4" />
                        </div>
                        <p><strong>Step 1:</strong> Our beautiful diamonds start off as little carbon seeds. The seed is exposed to extreme conditions, including temperature and pressure.</p>
                        <p><strong>Step 2:</strong> After heat and pressure is applied, the seed starts to develop in the same way natural diamonds form.</p>
                        <p><strong>Step 3:</strong> Having gone through the same geological deposition process, the seed grows and develops into a diamond.</p>
                        <p><strong>Step 4:</strong> After around 6—10 weeks of growing and developing, the diamonds are then polished and cut. The finishing process is the same for lab grown and natural diamonds.</p>
                    </div>
                }
                {storeTypes[domain] === "df" &&
                    <div className="m-auto" style={{maxWidth: "860px"}}>
                        <TextTitle variant="p" className="mb-4 text-center" name="Chemically and visually identical to the natural variety, yet with a different origin. Our lab-created diamonds are as their name suggests - created in a lab. Each lab-created diamond starts life as a tiny carbon seed that is exposed to extreme heat and pressure, mimicking the natural method of diamond formation. Once grown (usually within six to ten weeks), it is then cut and polished to reveal a beautiful lab-created diamond." />
                        <div className="row">
                            {['Diamond Seed', 'Apply Heat & Pressure', 'The Diamond Grows', 'The Diamond is Ready'].map((step, index) => (
                                <div key={index} className="col-xl-3 col-lg-6 col-6 text-center">
                                    <img src={`/assets/images/diamond-factory/modal-images/lab-created-diamond/step-${index + 1}.png`} alt={`Lab Created Diamond Step ${index + 1}`} className="mt-4" />
                                    <TextTitle variant="h4" className={"color-bistre-brown mt-3"} name={`Step ${index + 1}: ${step}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default LabCreatedDiamond;

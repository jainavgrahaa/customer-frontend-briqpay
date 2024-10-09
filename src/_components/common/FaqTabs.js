import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@mui/material";
import { ContactFaqTabs, faqAboutAccordionData, faqAccordionData } from "@/_utils/customApiData";
import CustomAccordion from "@/_components/common/CustomAccordion";
const FaqTabs = () => {
    const [activeTab, setActiveTab] = useState(0);
    const faqContent = () => {
        switch (activeTab) {
            case 0:
                return faqAboutAccordionData;
            case 1:
                return faqAccordionData;
            case 2:
                return faqAboutAccordionData;
            case 3:
                return faqAccordionData;
            case 4:
                return faqAboutAccordionData;
            case 5:
                return faqAccordionData;
                case 6:
                    return faqAboutAccordionData;
            default:
                return [];
        }
    }
    return (
        <div className="faq-tabs-wrapper mb-5">
            <div className="row">
                <div className="col-xl-6 col-md-6 col-sm-12">
                    <div className="search-sec">
                        <div className="input-group">
                            <span className="material-icons-outlined">search</span>
                            <input type="text" defaultValue="" placeholder="Search" />
                        </div>
                    </div>
                    <div className="faq-tabs-sec">
                        {ContactFaqTabs.map((item, index) => (
                            <div className="faq-tabs-item" key={index}>
                                <Button className={`tabs-btn ${activeTab === index && "active"}`} onClick={() => setActiveTab(index)}>{item.text}</Button>
                            </div>
                        ))
                        }
                    </div>
                </div>
                <div className="col-xl-6 col-md-6 col-sm-12">
                    <div className="faqTabs-content">
                        <h4>{ContactFaqTabs[activeTab].text}</h4>
                        <CustomAccordion accordionData={faqContent()} />
                    </div>
                </div>
            </div>
        </div >
    );
};

export default FaqTabs;

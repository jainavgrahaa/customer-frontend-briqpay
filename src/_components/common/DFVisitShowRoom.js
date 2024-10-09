/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { locationData } from "./googleMap/constant";
import { FormattedMessage } from "react-intl";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

function DFVisitShowRoom() {
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const LocationData = [
    {
      id: 1,
      title: "Birmingham",
      content: "",
    },
    {
      id: 2,
      title: "Cardiff",
      content: "",
    },
    {
      id: 3,
      title: "Liverpool",
      content: "",
    },
    {
      id: 4,
      title: "Leeds",
      content: "",
    },
    {
      id: 5,
      title: "Manchester",
      content: "",
    },
    
  ];

  return (
    <div className="df-eng-static-container">
      <div className="df-engagement-showroom-sec">
        <div className="showroom-store">
          <div className="store-stack">
            <p className="stack-heading"><FormattedMessage id="dFVisitShowRoom.title" /></p>
            <p className="stack-content">
            <FormattedMessage id="dFVisitShowRoom.content" />
            </p>
            <div className="list-scroll">
              <div className="desktop-list">
                <div className="block-search">
                  <div className="input-button-container">
                    <div className="search-bar">
                      <input
                        type="text"
                        placeholder={<FormattedMessage id="dFVisitShowRoom.search" />}
                        className="search-input"
                      />
                      <span className="material-icons-outlined icons-small">
                        <span className="material-symbols-outlined">
                          search
                        </span>
                      </span>
                    </div>
                    <div className="use-location">
                      <img
                        className="location-logo"
                        src="/assets/images/diamond_factory_images\home-page/visit-our-showroom/location.png"
                      />
                      <a classsName="location-text" href="#">                       
                        <FormattedMessage id="dFVisitShowRoom.useMyLocation" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="nearest-office">
                  <p className="store-heading"> <FormattedMessage id="dFVisitShowRoom.allStores" /> (15)</p>
                  <div className="office-list">
                    {/* {locationData.map((data) => (
                      <div key={data.id} className="office-town">
                        <p className="office-name">{data.name}</p>
                        <img
                          className="add-logo"
                          src="/assets/images/diamond_factory_images/home-page/visit-our-showroom/plus.png"
                        />
                      </div>
                    ))} */}
                    <div className="purches-descriptions" style={{width:"100%"}}>
                      <div className="accordion-wrapper">
                        {LocationData.map((items, index) => {
                          return (
                            <>
                              <Accordion
                                onChange={handleChange(`panel-${items.id}`)}
                                key={`${index}-faqList`}
                              >
                                <AccordionSummary
                                  expandIcon={
                                    <>
                                      <span className="material-icons-outlined plus-icon">
                                        add
                                      </span>
                                      <span className="material-icons-outlined minus-icon">
                                        remove
                                      </span>
                                    </>
                                  }
                                  aria-controls={`panel-${items.id}bh-content`}
                                  id={`panel-${items.id}bh-header`}
                                >
                                  <h3 className="acc-tl">{items.title}</h3>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <div>{items.content}</div>
                                </AccordionDetails>
                              </Accordion>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <img className="desktop-bottom" /> */}
            </div>
          </div>
        </div>
        <div className="showroom-map">
          <img
            src="/assets/images/diamond_factory_images/home-page/visit-our-showroom/map.png"
            className="showroom-map"
            alt="map"
          />
        </div>
      </div>
    </div>
  );
}

export default DFVisitShowRoom;

import * as React from "react";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

const FaqAccordion = ({ data, dataTitle, dataList, variant }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="wrap">
      {/* Only With list */}
      {dataList && (
        <div className="accordion-wrap">
          <div className="accordion-wrapper">
            {dataList.map((items, index) => (
              <Accordion
                // expanded={expanded === `panel-${items.id}`}
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
                  <h3 className="acc-tl">{items.faqTitle}</h3>
                </AccordionSummary>
                <AccordionDetails>
                  <div>{items.faqDesc}</div>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
      )}
      {/* Only With list */}

      {/* Standard With list Title > SabTitle */}
      {data && !dataList && (
        <div className="accordion-wrap">
          {data.map((item, index) => (
            <div className="wrapIn" key={index}>
              {variant == "faq" ? <h2>{item.mainfaqTitle}</h2> : ""}
              <div className="accordion-wrapper">
                {item.subfaq.map((items, index) => (
                  <Accordion
                    // expanded={expanded === `panel-${items.id}`}
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
                      <h5 className="acc-tl">{items.faqTitle}</h5>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div>{items.faqDesc}</div>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Standard With list */}
    </div>
  );
};
export default FaqAccordion;

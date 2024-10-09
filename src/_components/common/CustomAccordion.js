import * as React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@mui/material";
import { FormattedMessage } from "react-intl";

const CustomAccordion = ({ accordionData , grid}) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="accordion-wrapper">
      {accordionData.map(({ id, title, content }, index) => {
        return (
          <Accordion
            // expanded={expanded === `panel${index + 1}`}
            onChange={handleChange(`panel${index + 1}`)}
            key={id}
            style={{background:"none"}}
          >
            <AccordionSummary
              expandIcon={
                <>
                  <span className="material-icons-outlined plus-icon">add</span>
                  <span className="material-icons-outlined minus-icon">
                    remove
                  </span>
                </>
              }
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                {title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="accordion-content"  dangerouslySetInnerHTML={{__html: content}} ></Typography>
              { grid && (<Grid container spacing={2}>
                <Grid item xs={4}>
                  <div className="description-list">
                    <div sx={{ display: "flex", marginBottom: "10px" }}>
                      <Typography variant="body2" component="span">
                        <FormattedMessage id="custom.productCode"/>
                      </Typography>
                      <Typography variant="body1"><FormattedMessage id="custom.CLear"/>505</Typography>
                    </div>
                    <div sx={{ display: "flex", marginBottom: "10px" }}>
                      <Typography variant="body2" component="span">
                        <FormattedMessage id= "custom.productCode"/>
                      </Typography>
                      <Typography variant="body1"><FormattedMessage id="custom.CLear"/>505</Typography>
                    </div>
                  </div>

                  <div className="description-list">
                    <Typography variant="h4"><FormattedMessage id="custom.DIMENSION"/></Typography>
                    <div sx={{ display: "flex", marginBottom: "10px" }}>
                      <Typography variant="body2" component="span">
                      <FormattedMessage id="custom.productCode"/>
                      </Typography>
                      <Typography variant="body1"><FormattedMessage id="custom.CLear"/>505</Typography>
                    </div>
                    <div sx={{ display: "flex", marginBottom: "10px" }}>
                      <Typography variant="body2" component="span">
                      <FormattedMessage id="custom.productCode"/>
                      </Typography>
                      <Typography variant="body1"><FormattedMessage id="custom.CLear"/>505</Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={8}>
                  <div className="description-list">
                    <Typography variant="h4"><FormattedMessage id="custom.DIMENSION"/></Typography>
                    <div sx={{ display: "flex", marginBottom: "10px" }}>
                      <Typography variant="body2" component="span">
                      <FormattedMessage id="custom.productCode"/>
                      </Typography>
                      <Typography variant="body1"><FormattedMessage id="custom.CLear"/>505</Typography>
                    </div>
                    <div sx={{ display: "flex", marginBottom: "10px" }}>
                      <Typography variant="body2" component="span">
                      <FormattedMessage id="custom.productCode"/>
                      </Typography>
                      <Typography variant="body1"><FormattedMessage id="custom.CLear"/>505</Typography>
                    </div>
                  </div>
                </Grid>
              </Grid>)}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};
export default CustomAccordion;

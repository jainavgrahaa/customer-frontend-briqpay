import TextTitle from "@/_components/atoms/TextTitle";
import { diamondCertificationData } from "@/_utils/customApiData";
import { Button, Grid } from "@mui/material";
import CustomAccordion from "@/_components/common/CustomAccordion";
import { FormattedMessage } from "react-intl";

const ViewDiamondIno = ({ diamonModal }) => {
  return (
    <div className="col-md-12">
      <div className="diamond-specification-img-block text-center">
        <img
          alt={<FormattedMessage id="alt.diamond" />}
          src={diamonModal?.certificateMedia?.diamondImageURL}
        />
        <TextTitle name="Actual Diamond" variant="p" className={"mb-4"} />
      </div>
      <div className="diamond-certification">
        <div className="text-center mb-5">
          <img
            alt={<FormattedMessage id="alt.diamond" />}
            src={`/assets/images/igi-certification.png`}
          />
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <img
              alt={<FormattedMessage id="alt.diamond" />}
              src={`/assets/images/diamond-length-width.png`}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextTitle name="Grading Results" variant="h5" className={"mb-4"} />
            <div className="d-flex">
              <TextTitle
                name={"Diamond Code (Certificate):"}
                variant="p"
                className={"mr-5 mb-0"}
              />
              <TextTitle
                name={diamonModal?.code || "NA"}
                variant="p"
                className={"semi-bold mb-2"}
              />
            </div>
            <div className="d-flex">
              <TextTitle name={"Shape:"} variant="p" className={"mr-5 mb-0"} />
              <TextTitle
                name={diamonModal?.shape}
                variant="p"
                className={"semi-bold mb-2"}
              />
            </div>
            <div className="d-flex">
              <TextTitle name={"Weight:"} variant="p" className={"mr-5 mb-0"} />
              <TextTitle
                name={diamonModal?.weight}
                variant="p"
                className={"semi-bold mb-2"}
              />
            </div>
            <TextTitle
              name="Additional Grading Information"
              variant="h5"
              className={"mb-4 mt-4"}
            />
            <div className="d-flex">
              <TextTitle
                name={"Measurements:"}
                variant="p"
                className={"mr-5 mb-0"}
              />
              <TextTitle
                name={diamonModal?.measurements}
                variant="p"
                className={"semi-bold mb-2"}
              />
            </div>
            <div className="d-flex">
              <TextTitle name={"Cut:"} variant="p" className={"mr-5 mb-0"} />
              <TextTitle
                name={diamonModal?.cut}
                variant="p"
                className={"semi-bold mb-2"}
              />
            </div>
            <div className="d-flex">
              <TextTitle name={"Colour:"} variant="p" className={"mr-5 mb-0"} />
              <TextTitle
                name={diamonModal?.colour}
                variant="p"
                className={"semi-bold mb-2"}
              />
            </div>

            <div className="d-flex">
              <TextTitle
                name={"Clarity:"}
                variant="p"
                className={"mr-5 mb-0"}
              />
              <TextTitle
                name={diamonModal.clarity}
                variant="p"
                className={"semi-bold mb-2"}
              />
            </div>
            <div className="d-flex">
              <TextTitle name={"Polish:"} variant="p" className={"mr-5 mb-0"} />
              <TextTitle
                name={diamonModal?.polish}
                variant="p"
                className={"semi-bold mb-2"}
              />
            </div>
            <div className="d-flex">
              <TextTitle
                name={"Symmetry:"}
                variant="p"
                className={"mr-5 mb-0"}
              />
              <TextTitle
                name={diamonModal?.symmetry}
                variant="p"
                className={"semi-bold mb-2"}
              />
            </div>
            <div className="d-flex">
              <TextTitle
                name={"Fluorescense:"}
                variant="p"
                className={"mr-5 mb-0"}
              />
              <TextTitle
                name={diamonModal?.fluorescence}
                variant="p"
                className={"semi-bold mb-2"}
              />
            </div>
            {diamonModal?.certificateMedia?.certificateURL ? (
              <Button
                variant="outlined"
                className="w-100 mt-5"
                onClick={() =>
                  window.open(
                    diamonModal?.certificateMedia?.certificateURL,
                    "_blank"
                  )
                }
              >
                View Original Certificate
              </Button>
            ) : null}
          </Grid>
        </Grid>
      </div>
      <div className="diamond-certification mt-5">
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <CustomAccordion accordionData={diamondCertificationData} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ViewDiamondIno;

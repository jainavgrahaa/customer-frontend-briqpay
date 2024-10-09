import environment from "@/_utils/environment";
import TrustPilotBox from "../../trustPilotBox";

const ReviewsSectionTrustPilot = () => {
  return (
    <TrustPilotBox
      businessUnitId={environment.trustpilot.reviewSection.businessUnitId}
      templateId={environment.trustpilot.reviewSection.templateId}
      height="1000px"
    />
  );
};

export default ReviewsSectionTrustPilot;

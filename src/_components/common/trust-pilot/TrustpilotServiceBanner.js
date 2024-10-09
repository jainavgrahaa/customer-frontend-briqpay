import environment from "@/_utils/environment";
import TrustPilotBox from "../../trustPilotBox";

const TrustpilotServiceBanner = () => {
  return (
    <TrustPilotBox
      businessUnitId={environment.trustpilot.slider.businessUnitId}
      templateId={environment.trustpilot.slider.templateId}
      height="140px"
    />
  );
};

export default TrustpilotServiceBanner;

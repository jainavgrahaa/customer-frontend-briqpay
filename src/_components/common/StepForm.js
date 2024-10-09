import React from "react";

const StepForm = ({activeindicator,BAModalStatus,VAModalStatus,activeindexStart}) => {
  const BAModalTitle = () => {
    switch(activeindexStart) {
      case 1:
        return "Location";
      case 2:
        return "Service";
      case 3:
        return "Date and time";
      case 4:
        return "Confirm";
      default:
        return "";
    }
  };
  const VAModalTitle = () => {
    switch(activeindexStart) {
      case 1:
        return "Call type";
      case 2:
        return "Request";
      case 3:
        return "Date and time";
      case 4:
        return "Confirm";
      default:
        return "";
    }
  };
  return (
    <div className="step-wrapper">
      {BAModalStatus &&
      <div className="wrapper">
        <ol className="c-stepper">
        <li className={`c-stepper__item ${activeindexStart !== undefined && activeindexStart >= 1 ? 'active' : ''}`}>
            <p className="f-14 semi-bold d-flex align-items-center gap-10 mb-0"><span className="material-icons-outlined">location_on</span> <span>Location</span></p>
            <div className="next-link-line"></div>
          </li>
          <li className={`c-stepper__item ${activeindexStart !== undefined && activeindexStart >= 2 ? 'active' : ''}`}>
            <p className="f-14 semi-bold d-flex align-items-center gap-10 mb-0"><span className="material-icons-outlined">note_alt</span><span>Service</span></p>
            <div className="next-link-line"></div>
          </li>
          <li className={`c-stepper__item ${activeindexStart !== undefined && activeindexStart >= 3 ? 'active' : ''}`}>            
            <p className="f-14 semi-bold d-flex align-items-center gap-10 mb-0"><span className="material-icons-outlined">calendar_month</span> <span>Date and time</span></p>
            <div className="next-link-line"></div>
          </li>
          <li className={`c-stepper__item ${activeindexStart !== undefined && activeindexStart >= 4 ? 'active' : ''}`}>            
            <p className="f-14 semi-bold d-flex align-items-center gap-10 mb-0"><span className="material-icons-outlined">task_alt</span> <span>Confirm</span></p>
          </li>
        </ol>
        <div className="step-mobile-title">
        <h5>{BAModalTitle()}</h5>
        </div>
      </div>
     }
      {VAModalStatus &&
      <div className="wrapper">
        <ol className="c-stepper">
        <li className={`c-stepper__item ${activeindexStart !== undefined && activeindexStart >= 1 ? 'active' : ''}`}>
            <p className="f-14 semi-bold d-flex align-items-center gap-10 mb-0"><span className="material-icons-outlined">call</span> <span>Call type</span></p>
            <div className="next-link-line"></div>
          </li>
          <li className={`c-stepper__item ${activeindexStart !== undefined && activeindexStart >= 2 ? 'active' : ''}`}>
            <p className="f-14 semi-bold d-flex align-items-center gap-10 mb-0"><span className="material-icons-outlined">note_alt</span><span>Request</span></p>
            <div className="next-link-line"></div>
          </li>
          <li className={`c-stepper__item ${activeindexStart !== undefined && activeindexStart >= 3 ? 'active' : ''}`}>            
            <p className="f-14 semi-bold d-flex align-items-center gap-10 mb-0"><span className="material-icons-outlined">calendar_month</span> <span>Date and time</span></p>
            <div className="next-link-line"></div>
          </li>
          <li className={`c-stepper__item ${activeindexStart !== undefined && activeindexStart >= 4 ? 'active' : ''}`}>            
            <p className="f-14 semi-bold d-flex align-items-center gap-10 mb-0"><span className="material-icons-outlined">task_alt</span> <span>Confirm</span></p>
          </li>
        </ol>
        <div className="step-mobile-title">
        <h5>{VAModalTitle()}</h5>
        </div>
      </div>
     }
    </div>
  );         
};

export default StepForm;

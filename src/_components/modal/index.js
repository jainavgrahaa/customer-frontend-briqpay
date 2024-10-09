import React from "react";
import { Button } from "@mui/material";

const Modal = ({
  isOpen = false,
  className = "",
  cancelText = "Cancel",
  okText = "Ok",
  onClose = () => "",
  children,
  title,
  onOk,
  onSubmit,
  isDF,
  disableactions,
  Modaltype,
  onBack,
  onNext,
  backText,
  nextText,
  stepCounter,
  disableNext,
  subtitle
}) => {
  const hasCancelButton = typeof onOk === "function";
  const hasSubmitButton = typeof onSubmit === "function";
  if (!isOpen) {
    return "";
  }

  return (
    <div isOpen={isOpen}>
      <div className={`modal ${className}`}>
        <div className={`modal-inner step-number${stepCounter}`}>
          <div className="modal-main-content">
            <div className="modal-close-btn">
              <span
                style={{ cursor: "pointer" }}
                onClick={onClose}
                className="icons-small material-icons-outlined"
              >
                close
              </span>
            </div>
            {title && (
              <div className="modal-title">
                <h2>{title}</h2>
              </div>
            )}
             {subtitle && (
              <div className="modal-title">
                <h3 className="text-center">{subtitle}</h3>
              </div>
            )}
            <div className="modal-content">{children}</div>

            <div className={`modal-actions ${backText === undefined ? "justify-content-center":""}`}>
              {hasSubmitButton && hasCancelButton && (
                <>
                  <Button
                    variant="outlined"
                    sx={{ mt: 3, mb: 2 }}
                    size="large"
                    className={isDF ? "dark-brown-btn" : "standard-btn"}
                    onClick={onClose}
                  >
                    {cancelText}
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ mt: 3, mb: 2 }}
                    size="large"
                    className={isDF ? "brown-btn" : "dark-blue-btn"}
                    onClick={onSubmit}
                  >
                    {okText}
                  </Button>
                </>
              )}
              {Modaltype === "StepModal" && disableactions !== true &&
                 <>
                 {backText && 
                    <Button
                    variant="outlined"
                    sx={{ mt: 3, mb: 2 }}
                    size="large"
                    className={"back-step-btn"}
                    onClick={() => onBack && onBack(0)}
                  >
                    {backText}
                  </Button>
                  }
                  {nextText &&
                  <Button
                    variant="outlined"
                    sx={{ mt: 3, mb: 2 }}
                    size="large"
                    className={"next-step-btn"}
                    onClick={() => onNext && onNext(1)}
                    disabled={disableNext}
                  >
                    {nextText}
                  </Button>
                  }
                 </>
              }
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Modal;

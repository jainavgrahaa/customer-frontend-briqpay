import { Button } from "@mui/material";
import React from "react";

const ThankYou = ({
  title,
  content,
  secondContent,
  showDefaultMessage,
  children,
}) => {
  return (
    <div>
      <div className="thanku-container">
        <h1 className="heading">{title}</h1>
        <div className="order-text-contianer">
          <h4
            className="order-text"
            style={{ fontSize: "20px" }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <p
            className="order-details"
            style={{ fontWeight: 600, fontSize: "14px" }}
            dangerouslySetInnerHTML={{ __html: secondContent }}
          />
          {showDefaultMessage && (
            <Button
              sx={{
                margin: "0px auto 0px auto",
                display: "flex",
                width: "10rem",
                textTransform: "math-auto;",
              }}
              variant="outlined"
              href="/"
            >
              Go to homepage
            </Button>
          )}
        </div>
      </div>
      {children && children}
    </div>
  );
};

export default ThankYou;

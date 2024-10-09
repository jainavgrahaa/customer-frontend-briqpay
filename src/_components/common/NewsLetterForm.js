import { Button, TextField } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import useDeviceHelper from "@/_hooks/useDeviceHelper";
import { domainSelection } from "@/_utils";

const NewsLetterForm = ({ title, variant, fLabel, buttonLabel, theme, newsletterDescription }) => {
  const { deviceType } = useDeviceHelper();
  const [klaviyoForm, setKlaviyoForm] = useState(false);
  const [isDatePicker, setIsDatePicker] = useState(false);
  const [date, setDate] = useState("");

  const handleFocus = () => {
    setIsDatePicker(true);
  };

  const handleBlur = () => {
    if (!date) {
      setIsDatePicker(false);
    }
  };

  const handleChange = (event) => {
    setDate(event.target.value);
  };
  useEffect(() => {
    const script = document.createElement("script");

    script.src =
      "https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=SymyzT";
    script.async = true;

    document.body.appendChild(script);
    setKlaviyoForm(true);
    return () => {
      document.body.removeChild(script);
      setKlaviyoForm(false);
    };
  }, []);

  return (
    <div className="form-container">
      {title && <h4 className={`form-title ${newsletterDescription ? "mb-0" : ""}`}>{title}</h4>}
      {newsletterDescription && <p className="f-14 color-light-brown">{newsletterDescription}</p>}
      {theme === "ab" && klaviyoForm ? (
        <div className="subscription_bar">
          <div className="klaviyo-form-USD9BK"></div>
          <div className="klaviyo-form-QWTgyA"></div>
        </div>
      ) : null}
      {!theme && klaviyoForm ? (
        <div className="subscription_bar">
          <div className="klaviyo-form-USD9BK"></div>
          <div className="klaviyo-form-QWTgyA"></div>
        </div>
      ) : null}
      {theme === "df" && (
        <div className="subscription_bar">
          <div className="klaviyo-form-USD9BK"></div>
          <div className="klaviyo-form-QWTgyA"></div>
        </div>
      )}

      {variant !== "footer" ? (
        <p>
          {`By clicking "Subscribe" you agree to receive marketing communication from Austen&Blake. You can unsubscribe anytime. `}
          <Link href="">T&Cs Apply</Link>. Read our{" "}
          <Link href="">Privacy Policy</Link>.
        </p>
      ) : (
        ""
      )}
      {/* {theme === "df" && (
        <Button
          variant="standard"
          sx={{
            mt: 1,
            mb: 2,
            color: "#fff",
            border: "1px solid #fff",
            backgroundColor: "black",
            padding: deviceType === "mobile" ? "16px 40px" : "12px 40px",
            width: deviceType === "mobile" ? "100%" : "30%",
          }}
          size="large"
        >
          {buttonLabel}
        </Button>
      )} */}
    </div>
  );
};

export default NewsLetterForm;

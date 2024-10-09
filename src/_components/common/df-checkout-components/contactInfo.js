import { React, useEffect, useState } from "react";
import GuestCustomer from "./guest-customer";
import RegisteredCustomer from "./registered-customer";
import LoginCustomer from "./login-customer";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useSelector } from "react-redux";

const ContactInfo = ({ setOpen, storeId, selectOption, setSelectedOption }) => {
  const { userDetails } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userDetails.isGuest && userDetails.firstname) {
      setOpen(1);
      setSelectedOption("guestCheckout");
    }
  }, []);

  const onChangeLoginOptions = (selOption) => {
    setSelectedOption(selOption);
  };
  return (
    <div className="col-lg-12 col-md-12 mb-5">
      <FormControl style={{ width: "100%" }}>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          defaultValue={selectOption}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <FormControlLabel
            value="login"
            control={<Radio onChange={(e) => onChangeLoginOptions("login")} />}
            label="Login"
          />
          <FormControlLabel
            value="register"
            control={
              <Radio onChange={(e) => onChangeLoginOptions("register")} />
            }
            label="Register"
          />
          <FormControlLabel
            value="guestCheckout"
            control={
              <Radio onChange={(e) => onChangeLoginOptions("guestCheckout")} />
            }
            label="Guest Checkout"
          />
        </RadioGroup>
      </FormControl>
      {selectOption === "login" ? (
        <LoginCustomer setOpen={setOpen} storeId={storeId} />
      ) : selectOption === "register" ? (
        <RegisteredCustomer setOpen={setOpen} storeId={storeId} />
      ) : (
        <GuestCustomer setOpen={setOpen} />
      )}
    </div>
  );
};

export default ContactInfo;

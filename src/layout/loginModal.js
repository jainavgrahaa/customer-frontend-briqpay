import React, { useContext, useEffect, useState } from "react";
import Modal from "@/_components/modal";
import { LoginContext } from "@/_utils/loginCotext";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useSelector } from "react-redux";
import Auth from "@/_components/molecules/Auth";
import Regsitration from "@/_components/molecules/Registration";
import LoginCustomer from "@/_components/common/df-checkout-components/login-customer";
import RegisteredCustomer from "@/_components/common/df-checkout-components/registered-customer";
import ResetPasswordDF from "@/_components/common/df-checkout-components/reset-password"

const LoginModal = () => {
  const { userDetails } = useSelector((state) => state.auth);
  const [radioValue, setRadioValue] = useState("Login");
  const [modalOpen, setModalOpen] = useState(false);
  const handleSigninOption = (event) => {
    setRadioValue(event.target.value);
  };
  const { isOpenLoginModal, setIsOpenLoginModal, closeLoginModal, redirectPath } = useContext(LoginContext);

  useEffect(() => {
    if (isOpenLoginModal && !userDetails?.isGuest) {
      closeLoginModal(true)
    }
  }, [isOpenLoginModal])

  const handleCloseModal = () => {
    setModalOpen(false);
    setIsOpenLoginModal(false);
  };
  const handleOpenForgotPasswordModal = () => {
    setModalOpen(true);
    setIsOpenLoginModal(false);
  };

  if (!userDetails?.isGuest) return null;
  return (
    <>
    <Modal
      isOpen={isOpenLoginModal}
      onClose={() => setIsOpenLoginModal(false)}
      className="cart-modal"
      title="Log In / Register"
    >
      <div className="login-modal-container m-auto w-100" style={{maxWidth: "617px"}}>
        <div className="mb-1">
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="Login"
          name="radio-buttons-group"
          className="login-register"
          value={radioValue}
          onChange={(e) => handleSigninOption(e)}
        >
          <FormControlLabel value="Login" control={<Radio />} label="Login" />
          <FormControlLabel
            value="Register"
            control={<Radio />}
            label="Register"
          />
        </RadioGroup>
        </div>
        {radioValue === "Login" ? (
          <LoginCustomer storeId={userDetails?.storeId} buttonAlign={"center"} redirectPath={redirectPath} modalStatus={true} handleOpenForgotPasswordModal={handleOpenForgotPasswordModal} setIsOpenLoginModal={setIsOpenLoginModal}/>
        ) : (
          <RegisteredCustomer storeId={userDetails?.storeId} buttonAlign={"center"} setIsOpenLoginModal={setIsOpenLoginModal} agreePolicy/>
        )}
      </div>
    </Modal>
      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        className="forgot-modal"
        title="Forgot Password"
      >
        <div className="forgot-modal-container m-auto w-100" style={{maxWidth: "872px"}}>
           <ResetPasswordDF/>
        </div>
      </Modal>
      </>
  );
};

export default LoginModal;

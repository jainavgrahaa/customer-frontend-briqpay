import React, { useEffect, useState } from "react";
import AccountInformation from "./dfMyAccount/accountInformation";
import CreateAcoount from "./dfMyAccount/account";
import ChangePassword from "./dfMyAccount/changePassword";
import EditAddress from "./dfMyAccount/editAddress";
import OrderHistory from "./dfMyAccount/orderHistory";
import ReferralRewards from "./dfMyAccount/refferalReward";
import Wishlist from "./dfMyAccount/wishList";
import NewsLetter from "./dfMyAccount/newsLetter";
import Logout from "./dfMyAccount/logout";
import DeleteAccount from "./dfMyAccount/deleteAccount";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import useDeviceHelper from "@/_hooks/useDeviceHelper";
import { Button } from "@mui/material";

const tabMapping = {
  myAccount: "My Account",
  changePassword: "Change Password",
  addressBook: "Address Book",
  orderHistory: "Order History",
  // referralRewards: "Referral Rewards",
  wishList: "Wishlist",
  newsLetter: "Newsletter",
  logout: "Logout",
  deleteAccount: "Delete Account",
};

const DFMyAccount = ({ translateId, storeId, domain }) => {
  const router = useRouter();
  const { tab } = router.query;
  const [activeComponent, setActiveComponent] = useState(tabMapping[tab] || "My Account");
  const { userDetails } = useSelector((state) => state.auth);
  const [mobileListAccount, setmobileListAccount] = useState(false);
  const { deviceType } = useDeviceHelper();

  const menuItems = Object.values(tabMapping);

  useEffect(() => {
    if (userDetails?.isGuest) {
      router.push("/account-login");
    }
    
    if (tab && tabMapping[tab]) {
      setActiveComponent(tabMapping[tab]);
    }
  }, [router.query, userDetails]);

  const handleClick = (componentName) => {
    const tabKey = Object.keys(tabMapping).find(
      (key) => tabMapping[key] === componentName
    );
    setActiveComponent(componentName);
    setmobileListAccount(false);
    router.push(`/my-account?tab=${tabKey}`, undefined, { shallow: true });
  };

  const isActive = (componentName) => {
    return activeComponent === componentName
      ? "myaccount-menu myaccount-menu-heading"
      : "myaccount-menu";
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "My Account":
        return <AccountInformation />;
      case "Change Password":
        return <ChangePassword setActiveComponent={setActiveComponent} />;
      case "Address Book":
        return (
          <EditAddress
            setActiveComponent={setActiveComponent}
            storeId={storeId}
          />
        );
      case "Order History":
        return <OrderHistory translateId={translateId} />;
      // case "Referral Rewards":
      //   return <ReferralRewards />;
      case "Wishlist":
        return (
          <Wishlist
            domain={domain}
            translateId={translateId}
            storeId={storeId}
          />
        );
      case "Newsletter":
        return <NewsLetter />;
      case "Logout":
        return <Logout domain={domain} />;
      case "Delete Account":
        return <DeleteAccount storeId={storeId} />;
      default:
        return null;
    }
  };

  if (userDetails?.isGuest) return null;

  return (
    <>
      <div className="df-myaccount-page">
        <div className="myaccount-left-side">
          {(deviceType === "mobile" || deviceType === "tablet") && (
            <Button
              variant="contained"
              fullWidth
              onClick={() => setmobileListAccount(!mobileListAccount)}
              className="justify-content-between d-flex light-bg"
            >
              {activeComponent}
              {mobileListAccount ? (
                <span className="material-icons-outlined">
                  keyboard_arrow_up
                </span>
              ) : (
                <span className="material-icons-outlined">expand_more</span>
              )}
            </Button>
          )}
          <ul
            className={`left-side-frame ${mobileListAccount ? "active" : ""}`}
          >
            {menuItems.map((item) => (
              <li
                key={item}
                className={isActive(item)}
                onClick={() => handleClick(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="myaccount-right-side">{renderComponent()}</div>
      </div>
    </>
  );
};

export default DFMyAccount;

import React from "react";
import { List, ListItemIcon, ListItemText, ListItem } from "@mui/material";
import { FormattedMessage } from "react-intl";
import TextTitle from "@/_components/atoms/TextTitle";
import Regsitration from "@/_components/molecules/Registration";
import useDeviceHelper from "@/_hooks/useDeviceHelper";
const SignUpForm = ({ domain }) => {
  const { deviceType } = useDeviceHelper();
  return (
    <div className="sign-up-sec account-sec">
      {deviceType !== "mobile" && (
      <TextTitle variant="h3" name="common.createAnAccount" />
      )}
      <TextTitle
        variant="p"
        name="signup.subTitle"
        className="join-tag-line"
      />
      <List component="div" disablePadding>
        <ListItem>
          <ListItemIcon>
            <span className="material-icons-outlined">
              <FormattedMessage id="common.done" />
            </span>
          </ListItemIcon>
          <ListItemText primary={<FormattedMessage id="signup.saveItem" />} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <span className="material-icons-outlined">
              <FormattedMessage id="common.done" />
            </span>
          </ListItemIcon>
          <ListItemText
            primary={<FormattedMessage id="signup.easyOrderTracking" />}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <span className="material-icons-outlined">
              <FormattedMessage id="common.done" />
            </span>
          </ListItemIcon>
          <ListItemText
            primary={<FormattedMessage id="signup.fasterCheckout" />}
          />
        </ListItem>
      </List>
      <Regsitration domain={domain} />
    </div>
  );
};

export default SignUpForm;

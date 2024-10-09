import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { Button, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { createAlert } from "@/_store/alert.slice";
import { userDetail } from "@/_store/auth.slice";

function NewsLetter() {
  const intl = useIntl();
  const [subscribe, setSubscribe] = useState("Subscribe to newsletter");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { updateUserDetails } = useAuthHelper();
  const { userDetails } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubscription = async () => {
    const isSubscribe = subscribe === "Unsubscribe" ? false : true;
    setLoading(true);
    setMessage("");
    const payload = {
      id: userDetails.id,
      isKlaviyoSubscribe: isSubscribe,
    };

    try {
      await updateUserDetails(payload);
      dispatch(
        userDetail({
          ...userDetails,
          isKlaviyoSubscribe: isSubscribe,
        })
      );
      const successMessage = isSubscribe
        ? intl.formatMessage({
            id: "newsletter.subscriptionPreferencesSuccess",
          })
        : "You have Unsubscribed successfully.";
      setMessage(successMessage); // Set the success message
    } catch (error) {
      console.log('errir', error)
      dispatch(
        createAlert({
          alertType: "error",
          msg: "Something went wrong, please try again",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = (event) => {
    setSubscribe(event.target.value);
  };

  useEffect(() => {
    setSubscribe(
      userDetails?.isKlaviyoSubscribe
        ? "Subscribe to newsletter"
        : "Unsubscribe"
    );
  }, [userDetails?.isKlaviyoSubscribe]);

  return (
    <div className="newsletter">
      <h2 style={{marginBottom: "25px"}}>
        <FormattedMessage id="newsletter.subscriptionPreferences" />
      </h2>
      <div className="add-address-radio mb-15">
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="Yes"
          name="radio-buttons-group"
          className="add-address-radio-btn radio-f-16"
          value={subscribe}
          onChange={(e) => handleSubscribe(e)}
        >
          <FormControlLabel
            value="Subscribe to newsletter"
            control={<Radio />}
            label={intl.formatMessage({ id: "account.subscribe" })}
          />
          <FormControlLabel
            value="Unsubscribe"
            control={<Radio />}
            label={intl.formatMessage({ id: "account.unSubscribe" })}
          />
        </RadioGroup>
      </div>
      <p className="f-16 mb-30">
        <FormattedMessage id="newsletter.updateEmailPrefrences" />
      </p>
      {!message &&
      <Button
        variant="contained"
        className="newsletter-btn"
        onClick={handleSubscription}
        disabled={loading}
        fullWidth
      >
        {loading ? "Loading" : <FormattedMessage id="common.update" />}
      </Button>
      }
      {message && <p className="success-message f-16">{message}</p>}
    </div>
  );
}

export default NewsLetter;

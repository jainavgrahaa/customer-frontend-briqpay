/* eslint-disable @next/next/no-img-element */

import { Modal } from "@mui/base";
import { Button } from "@mui/material";
import { useState } from "react";

const ReferralRewards = () => {
  const [model, setModel] = useState(false);

  const handleOpen = () => setModel(true);
  const handleClose = () => setModel(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  return (
    <>
      <div className="referral-rewards">
        <div className="content-img-sec">
          <div className="content-sec">
            <h2 className="data-heading mb-3">Refer a Friend</h2>
            <p className="f-16">Get a £50 Amazon or John Lewis gift card for each friend you refer!</p>
            <p className="f-16">They get £125 Off First Order and you get £50 Amazon or John Lewis Gift Card when they buy.</p>
            <ul className="reward-list">
              <li>
                <b >1</b>
                <b>&#163; 0</b>
                <b>0</b>
                <b>&#163; 0</b>
              </li>
              <li>
                <span>Times Shared</span>
                <span>Possible Rewards</span>
                <span>Friends Referred</span>
                <span>Rewards Earned</span>
              </li>
            </ul>
          </div>
          {/* /assets/images/austen-and-blake-logo.png/ */}
        <div className="img-sec">
          <img
            className="refer-friend-left-image"
            src="/assets/images/diamond-factory/my-account/refer-friend.png"
            alt="refer-friend-image"
          />
          </div>
        </div>
        <div className="keep-track-shares">
          <h2 className="data-heading">Keep track of your shares & rewards</h2>
          <p className="f-16">You have not invited any friends yet. Go invite them!</p>
        </div>
        <div className="choose-method">
          <h2 className="data-heading">Choose a method to share:</h2>
          <div className="d-flex flex-wrap gap-15">
            <Button variant="contained" onClick={() => handleOpen()}>
            <span className="icons-small material-icons-outlined">mail</span>{" "}
            Share Via Email
            </Button>
            <Button variant="contained">
            <span className="icons-small material-icons-outlined">
                facebook
              </span>
              Share Via my Wall
            </Button>
          </div>
          <div className="personal-links">
            <p className="f-16">Here is your personal link:</p>
            <div className="d-flex flex-wrap gap-15">
            <Button variant="contained">
               https://www.talkable.com/x/MC98Da
            </Button>
            <Button variant="contained">
              {" "}
              <span className="icons-small material-icons-outlined">link</span>
              Copy Link
            </Button>
            </div>
          </div>
          <p className="send-sms-text f-16">You can share it on Twitter, with instant messengers, send in SMS or just tell a friend.</p>
        </div>
      </div>
      <Modal
        style={style}
        isOpen={model}
        onClose={() => setModel(false)}
        className="email-modal"
      >
        <div className="email-modal-container">
          <p className="email-model-heading">Share Via Email</p>
          <div className="email-subject">
            <span className="email-text">Subject:</span>
            <input
              className="email-input"
              placeholder="Your friend Caitlyn Harris sent you £125 off at Diamonds Factory"
            />
          </div>
          <div className="email-subject">
            <span className="email-text">Subject:</span>
            <input
              className="email-input"
              placeholder="Your friend Caitlyn Harris sent you £125 off at Diamonds Factory"
            />
          </div>
          <button className="btn data-btn data-btn-primary">Send Email &gt;</button>
          <span
            onClick={() => handleClose(false)}
            className="icons-small material-icons-outlined login-close-icon"
          >
            close
          </span>
        </div>
      </Modal>
    </>
  );
};

export default ReferralRewards;

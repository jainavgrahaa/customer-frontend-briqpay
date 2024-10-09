import React , {useState} from "react";
import { Button } from "@mui/material";
import Share from "@/_components/common/modal-info-content/share";
const DfCustomIconButton = ({domain,storeTypes}) => {
  const [shareDropDown,setshareDropDown] = useState(false);
  const shareFunction = () => {
    setshareDropDown(!shareDropDown);
  }
  return (
    <>
    <div className="d-flex gap-15 justify-content-center mt-4">
      <Button variant="text" className="icon-rounded-lg light-brown-bordered color-bistre-brown">
        <span className="material-icons-outlined">favorite_border</span>
      </Button>
      <Button variant="text" className="icon-rounded-lg light-brown-bordered color-bistre-brown">
        <span className="material-icons-outlined">send</span>
      </Button>
      <Button variant="text" className="icon-rounded-lg light-brown-bordered color-bistre-brown" onClick={shareFunction}>
        <span className="material-icons-outlined">share</span>
      </Button>
      </div>
      {shareDropDown &&
        <div className="df-share-list">
          <Share storeTypes={storeTypes} domain={domain}/>
        </div>
        }
    </>
  );
};

export default DfCustomIconButton;

import React from "react";
import { Button } from "@mui/material";

const DFAddToBagCard = ({ variant, handleDfAddtoCart, loader }) => {
  return (
    <>
      {variant !== "createyoudesign" ? (
        <Button onClick={handleDfAddtoCart} variant="contained">
          {loader ? "LOADING..." : "Add to Bag"}
        </Button>
      ) : (
        ""
      )}
    </>
  );
};

export default DFAddToBagCard;

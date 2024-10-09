/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { storeTypes } from "@/_utils";
import { Backdrop } from "@mui/material";
import React from "react";

const Loader = ({ domain }) => {
  return (
    <Backdrop sx={{ color: "#1D1F1E", zIndex: () => 10000 }} open={true}>
      {storeTypes[domain] === "ab" ? (
        <img src={"/assets/images/austen-and-blake/loader/anb_loader.gif"} />
      ) : (
        <img
          src={"/assets/images/diamond_factory_images/loader/df-preloader.gif"}
        />
      )}
    </Backdrop>
  );
};

export default Loader;

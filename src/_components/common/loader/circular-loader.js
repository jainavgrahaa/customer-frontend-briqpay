import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

const CircularLoader = ({ domain }) => {
  return (
    <Backdrop sx={{ color: "#1D1F1E", zIndex: () => 10000 }} open={true}>
      <CircularProgress />
    </Backdrop>
  );
};

export default CircularLoader;

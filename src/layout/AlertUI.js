import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const AlertUI = () => {
  const { alertData } = useSelector(state => state.alert);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (alertData?.msg){
      setShow(true);
    }
  }, [alertData]);

  const handleClose = () => setShow(false);

  return (
    <>
      <Snackbar open={show} autoHideDuration={alertData?.timeout} onClose={handleClose} anchorOrigin={{ vertical:"bottom", horizontal:"center" }}>
        <Alert severity={alertData?.alertType} onClose={handleClose}>{alertData?.msg}</Alert>
      </Snackbar>
    </>
  );
};

export default AlertUI;

import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ToastAlert = (props) => {
  ;

  
  const handleClose = (event, reason) => {
 

    props.closeToast();
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={props.opened} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {props.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default ToastAlert;

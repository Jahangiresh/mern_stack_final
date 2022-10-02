import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "../contactinputs.scss";
import "./footercontact.scss";
import { CgArrowLongRight } from "react-icons/cg";
//toaster
// import * as React from 'react';
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
//toaster end

export const FooterContact = () => {
  //toaster
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const navigate = useNavigate();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    navigate(0);
  };
  //toaster

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_b5ro7dm",
        "template_r0xd467",
        form.current,
        "tPL50ov9gd5_A3d6T"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  // const messageHandler = (e) => {
  //   console.log(e.target.value);
  // };

  return (
    <div className="contactinputs">
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Message sent! Stay Connected!
          </Alert>
        </Snackbar>
      </Stack>
      <form ref={form} onSubmit={sendEmail}>
        <input
          placeholder="enter your email..."
          className="footer__email"
          type="email"
          name="from_email"
        />
        <CgArrowLongRight
          onClick={handleClick}
          type="submit"
          className="submit__btn"
        />
      </form>
    </div>
  );
};

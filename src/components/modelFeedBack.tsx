"use client";

import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getNameEmail } from "@/libs/action";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { Colors } from "@/config/color";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 250, sm: 400 },
  boxShadow: 24,
  p: 3,
  borderRadius: 2,
};

interface Prop {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FeedbackModal({ open, setOpen }: Prop) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sendEmail, setSendEmail] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isDark, setIsDark] = useState<boolean>();

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setIsDark(true);
    } else if (localStorage.getItem("theme") === "light") {
      setIsDark(false);
    } else {
      console.log("Nothing in theme");
    }
  }, []);

  useEffect(() => {
    nameAndEmail();
  }, []);

  const nameAndEmail = async () => {
    setSendEmail(await getNameEmail());
  };

  const sendFeedBack = () => {
    if (sendEmail.name == "" || sendEmail.email == "") {
      toast.error("Server error occurs.Please wait for a while");
      return;
    } else if (sendEmail.message == "" || sendEmail.message == null) {
      toast.error("Send me any feedback to be better");
      return;
    } else if (
      sendEmail.name != "" &&
      sendEmail.email != "" &&
      sendEmail.message != ""
    ) {
      //code
      setIsLoading(true);

      const templateParams = {
        from_name: sendEmail.name,
        from_email: sendEmail.email,
        message: sendEmail.message,
      };

      emailjs
        .send(
          "service_z3vocwd",
          "template_hfs6pvi",
          templateParams,
          "xHvkUSbBE_g-sqRH6"
        )
        .then(
          () => {
            setIsLoading(false);
            setOpen(false);
            toast.success("Thank you for your feedback.");
          },
          (error) => {
            console.log("FAILED...", error.text);
            setIsLoading(false);
          }
        )
        .finally(() =>
          setSendEmail((prevState) => ({
            ...prevState,
            message: "",
          }))
        );
      //code
      return;
    } else {
      toast.error("Can't connect");
      return;
    }
  };

  return (
    <Modal open={open}>
      <Box
        sx={{
          ...style,
          backgroundColor: isDark
            ? Colors.dark.background
            : Colors.light.background,
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={() => setOpen(false)}
          sx={{ position: "absolute", top: 8, right: 8, color: "#f87171" }}
        >
          <CloseIcon />
        </IconButton>

        {/* Title */}
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: "bold",
            mb: 2,
            textAlign: "center",
            color: isDark ? Colors.dark.text : Colors.light.text,
          }}
        >
          Share Feedback
        </Typography>

        {/* Text Area */}
        <TextField
          multiline
          rows={4}
          fullWidth
          placeholder="What if..."
          variant="outlined"
          sx={{
            backgroundColor: isDark
              ? Colors.dark.textField
              : Colors.light.textField,
            borderRadius: 1,
          }}
          InputProps={{
            style: { color: isDark ? Colors.dark.text : Colors.light.text },
          }}
          onChange={(evt) =>
            setSendEmail((prevState) => ({
              ...prevState,
              message: evt.target.value,
            }))
          }
        />

        {/* Send Button */}
        <Button
          variant="contained"
          onClick={sendFeedBack}
          fullWidth
          disabled={isLoading} // Disable button while loading
          sx={{
            mt: 2,
            borderRadius: 2,
            textTransform: "none",
            bgcolor: "#7B61FF",
            "&:hover": { bgcolor: "#6A52E1" },
          }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Send Message"
          )}
        </Button>
      </Box>
    </Modal>
  );
}

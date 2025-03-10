"use client";
import { Colors } from "@/config/color";
import { handleCreateStickyWall } from "@/libs/action";
import { Box, Button, Modal, TextareaAutosize, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

interface Pro {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModelCard({ open, setOpen }: Pro) {
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
  const CreateSticky = async (formData: FormData) => {
    const response = await handleCreateStickyWall(formData);

    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("Creating stickyWall is successful.");
      setOpen(false);
    }
  };

  return (
    <Modal
      open={open}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box
        sx={{
          ...style,
          width: 400,
          backgroundColor: isDark
            ? Colors.dark.background
            : Colors.light.background,
        }}
      >
        <Box component={"form"} action={CreateSticky} method="POST">
          <TextField
            sx={{
              mb: 2,
              width: "100%",
              backgroundColor: isDark
                ? Colors.dark.textField
                : Colors.light.textField,
              outline: "none",
              borderRadius: 1,
            }}
            placeholder="Title"
            name="Tit"
            InputProps={{
              style: { color: isDark ? Colors.dark.text : Colors.light.text },
            }}
          />
          <TextareaAutosize
            name="Nte"
            placeholder="Notes"
            style={{
              width: "100%",
              borderColor: isDark ? Colors.dark.textField : "gray",
              borderWidth: 1,
              padding: 10,
              outline: "none",
              borderRadius: 2,
              backgroundColor: isDark
                ? Colors.dark.textField
                : Colors.light.textField,
              color: isDark ? Colors.dark.text : Colors.light.text,
            }}
          />
          <Box
            sx={{
              justifyContent: "space-between",
              display: "flex",
              marginTop: 3,
            }}
          >
            <Button
              variant="contained"
              onClick={() => setOpen(false)}
              sx={{ backgroundColor: "#ef4444" }}
            >
              Close
            </Button>
            <Button
              variant="contained"
              type="submit"
              sx={{ backgroundColor: "#1565C0" }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default ModelCard;

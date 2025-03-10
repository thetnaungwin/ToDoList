"use client";

import { getUserData, updateUserData } from "@/libs/action";
import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import React from "react";
import { upload } from "@vercel/blob/client";

function Setting() {
  const [name, setName] = React.useState<string>("");
  const [life, setLife] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [themeMode, setThemeMode] = React.useState<string>("");
  React.useEffect(() => {
    const alreadyTheme = localStorage.getItem("theme");
    alreadyTheme && setThemeMode(alreadyTheme);

    const fetchData = async () => {
      const user = await getUserData();
      setName(user.name);
      const life = user.life ? user.life : "Student";
      setLife(life);
    };
    fetchData();
  }, []);

  const handleCreateMenuClientUpload = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const file = formData.get("file") as File;

      if (file && file.size) {
        const { url } = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/avatar/upload",
        });
        formData.set("imageUrl", url);
      }

      await updateUserData(formData);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      className="flex flex-col items-center justify-around"
      style={{ height: "530px" }}
      component="form"
      onSubmit={handleCreateMenuClientUpload}
    >
      <Box className="flex flex-col gap-3" sx={{ width: "90%" }}>
        <TextField defaultValue={name} name="name" />
        <TextField defaultValue={life} name="role" />
        <TextField
          type="file"
          name="file"
          sx={{
            mt: 2,
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          mb: 2,
        }}
      >
        <FormControlLabel
          control={
            <Switch
              checked={themeMode === "dark"}
              onChange={(evt, value) => {
                const theme = value ? "dark" : "light";
                setThemeMode(theme);
                localStorage.setItem("theme", theme);
                if (window.location.pathname === "/home/setting") {
                  window.location.reload();
                }
              }}
            />
          }
          label="Use dark mode"
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Button variant="contained" type="submit">
            Update
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default Setting;

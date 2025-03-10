"use client";

import { Box, Button, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: "#F1FAEE",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h2">Welcome back!</Typography>
      <Typography sx={{ textAlign: "center", mb: 5, maxWidth: 400 }}>
        Sign in to your account to access your lists and manage your daily
        route.
      </Typography>
      <Button
        sx={{
          bgcolor: "#1D3557",
          color: "white",
          "&:hover": { bgcolor: "#457B9D" },
        }}
        variant="contained"
        startIcon={<GoogleIcon />}
        onClick={() => signIn("google", { callbackUrl: "/home" })}
      >
        Sign in with Google
      </Button>
    </Box>
  );
}

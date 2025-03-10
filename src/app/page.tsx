"use client";

import { Colors } from "@/config/color";
import { Box, Button, Link, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
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

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        backgroundColor: isDark
          ? Colors.dark.background
          : Colors.light.background,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down(1100)]: {
          flexDirection: "column",
        },
      })}
    >
      <Box
        sx={(theme) => ({
          width: "50%",
          display: "flex",
          flex: 1,
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          [theme.breakpoints.down(1100)]: {
            marginTop: 2,
          },
        })}
      >
        <Image
          src="/splashScreen.jpg"
          width={500}
          height={500}
          alt="Picture of the splashScreen"
          style={{
            borderRadius: "10px",
          }}
        />
      </Box>
      <Box
        sx={(theme) => ({
          width: "50%",
          paddingY: 10,
          [theme.breakpoints.down(1100)]: {
            width: "70%",
          },
        })}
      >
        <Typography
          sx={{
            alignSelf: "start",
            fontSize: "32px",
            color: isDark ? Colors.dark.text : Colors.light.text,
          }}
          className="font-bold"
        >
          Productive Mind
        </Typography>
        <Typography
          sx={{
            marginY: 4,
            color: isDark ? Colors.dark.text : Colors.light.text,
          }}
        >
          With only the features you need, Organic Mind is customized for
          individuals seeking a stress-free way to stay focused on their goals,
          project and tasks.
        </Typography>
        <Link href={"/home"} sx={{ width: "97%" }}>
          <Button
            variant="contained"
            sx={{ width: "97%", backgroundColor: "#FFD43B", color: "black" }}
          >
            Get Started
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

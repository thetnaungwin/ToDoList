"use client";

import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { deleteStickyWall, getStickyWall } from "@/libs/action";
import ModelCard from "@/components/modelCard";
import { Colors } from "@/config/color";

function page() {
  const [stickyWall, setStickyWall] = useState<any[]>();
  const [modelOpen, setModelOpen] = useState<boolean>(false);
  const [pressTimer, setPressTimer] = useState<any>(null);
  const [pressedItemId, setPressedItemId] = useState<any>(null);
  const [isDark, setIsDark] = useState<boolean>();

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setIsDark(true);
    } else if (localStorage.getItem("theme") === "light") {
      setIsDark(false);
    } else {
      alert("Nothing in theme");
    }
  }, []);

  const startPressTimer = (itemId: any) => {
    setPressedItemId(itemId);
    setPressTimer(
      setTimeout(() => {
        deleteStickyWall(itemId);
      }, 1000)
    );
  };
  const cancelPressTimer = () => {
    setPressedItemId(null);
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };

  useEffect(() => {
    const fetchStickyWall = async () => {
      setStickyWall(await getStickyWall());
    };
    fetchStickyWall();
  }, []);

  return (
    <Box style={{ height: "530px" }}>
      <Typography
        className="font-bold pt-3 font-mono px-3"
        sx={{ fontSize: { xs: "20px", sm: "30px" } }}
      >
        Sticky Wall
      </Typography>
      <Box
        className="m-5 rounded-md border border-neutral-300 shadow-md"
        sx={{
          backgroundColor: isDark
            ? Colors.dark.stickyWall
            : Colors.light.stickyWall,
          height: "440px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: { xs: "100%", sm: 150, md: 230 },
              height: 200,
            },
            overflow: "auto",
            maxHeight: 435,
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {stickyWall &&
            stickyWall.map((item) => (
              <Paper
                key={item.id}
                elevation={3}
                sx={{
                  backgroundColor: item.color,
                  display: "flex",
                  flexDirection: "column",
                  paddingX: 2,
                  paddingY: 1,
                  userSelect: "none",
                  cursor: "default",
                  transform:
                    pressedItemId === item.id ? "scale(1.05)" : "scale(1)",
                  transition: "transform 0.2s ease",
                }}
                onMouseDown={() => startPressTimer(item.id)}
                onMouseUp={cancelPressTimer}
                onMouseLeave={cancelPressTimer}
                onTouchStart={() => startPressTimer(item.id)}
                onTouchEnd={cancelPressTimer}
              >
                <Typography className="font-bold text-md">
                  {item.title}
                </Typography>
                <Box
                  sx={{
                    paddingX: 1,
                    width: "100%",
                    overflow: "hidden",
                  }}
                >
                  {item.notes.split("\n").map((notes: any, index: number) => (
                    <Typography
                      key={index}
                      className="text-sm"
                      sx={{
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                      }}
                    >
                      {notes}
                    </Typography>
                  ))}
                </Box>
              </Paper>
            ))}
          <Paper
            elevation={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: isDark
                ? Colors.dark.background
                : Colors.light.background,
            }}
          >
            <Button
              sx={{ height: "100%", width: "100%", color: "black" }}
              onClick={() => setModelOpen(true)}
            >
              <AddIcon
                sx={{
                  fontSize: { xs: 30, sm: 65 },
                  color: isDark ? Colors.dark.box : Colors.light.icon,
                }}
              />
            </Button>
            <ModelCard open={modelOpen} setOpen={setModelOpen} />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

export default page;

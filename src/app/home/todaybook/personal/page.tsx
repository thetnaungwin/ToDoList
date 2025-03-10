"use client";

import { Box, Typography } from "@mui/material";
import styles from "../Scroll.module.css";
import React, { useEffect, useState } from "react";
import { getPersonalTasks } from "@/libs/action";
import DynamicBtn from "../DynamicBtn";
import { Colors } from "@/config/color";

function PersonalPage() {
  const [personalTasks, setPersonalTasks] = useState<any[]>([]);
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

  useEffect(() => {
    const fetchData = async () => {
      setPersonalTasks(await getPersonalTasks());
    };
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "530px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          height: { xs: "17%", sm: "20%", md: "15%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography className="text-2xl text-yellow-300 font-mono text-center">
          You can make yourself improve.
        </Typography>
      </Box>
      <Box
        className={styles.example}
        sx={{
          height: "78%",
          marginLeft: { xs: "0px", lg: "20px" },
        }}
      >
        {personalTasks.map((one) => (
          <Box
            key={one.id}
            className="flex-row justify-between items-center flex p-2 rounded-xl shadow-xl border"
            sx={{
              backgroundColor: isDark
                ? Colors.dark.todayTask
                : Colors.light.todayTask,
              width: "90%",
            }}
          >
            <Box
              className="flex flex-row items-center"
              sx={{
                gap: { xs: "3px", sm: "4px", md: "10px" },
                width: { xs: "58%", sm: "70%", md: "77%" },
              }}
            >
              <Box>
                <Box
                  sx={{ width: { xs: 9, sm: 12 }, height: { xs: 9, sm: 12 } }}
                  className={`rounded-full ${
                    one.role == "Personal"
                      ? "bg-red-400"
                      : one.role == "Freelance"
                      ? "bg-blue-400"
                      : one.role == "Work"
                      ? "bg-yellow-400"
                      : "bg-neutral-600"
                  }`}
                ></Box>
              </Box>
              <Typography
                sx={{
                  fontSize: { xs: "15px", sm: "15px", md: "20px" },
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {one.task}
              </Typography>
            </Box>
            <Box
              className="flex flex-row gap-5 items-center justify-end"
              sx={{
                width: { xs: "50%", sm: "27%", md: "20%" },
              }}
            >
              <Typography
                sx={{ fontSize: { xs: "10px", sm: "15px", md: "20px" } }}
              >
                {one.timer.toString().split(" ")[4]}
              </Typography>
              <DynamicBtn taskStatus={one.taskstatus} task={one.task} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default PersonalPage;

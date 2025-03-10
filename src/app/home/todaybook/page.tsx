"use client";

import { getTasks, handleCreateTask } from "@/libs/action";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./Scroll.module.css";
import toast from "react-hot-toast";
import DynamicBtn from "./DynamicBtn";
import { redirect } from "next/navigation";
import { Colors } from "@/config/color";

function page() {
  const [tasks, setTasks] = useState<any[]>();
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
    const fetchTasks = async () => {
      setTasks(await getTasks());
    };
    fetchTasks();
  }, []);

  const creatingTask = async (formData: FormData) => {
    const response = await handleCreateTask(formData);

    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("Creating task is successful.");
      redirect("todaybook");
    }
  };

  return (
    <Box
      className="flex flex-col items-center justify-around"
      style={{ height: "530px" }}
    >
      {/* One */}
      <Box
        className="gap-3 flex flex-col"
        sx={{
          height: { xs: "30%", sm: "20%" },
          width: "100%",
          marginTop: { xs: 0, md: 3 },
        }}
      >
        <Box>
          <Typography
            className="text-yellow-200 font-bold"
            sx={{
              fontSize: { xs: "16px", sm: "20px", md: "25px" },
              marginLeft: { xs: 1, md: 3 },
            }}
          >
            Try hard with your goal
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: { xs: "30px", sm: "0px" },
            flexDirection: { xs: "column", md: "row" },
          }}
          className="h-10"
          component={"form"}
          action={creatingTask}
          method="POST"
        >
          <Box
            sx={{ display: { xs: "none", md: "flex" } }}
            className="flex-col gap-1 ml-1"
          >
            <Box className="bg-red-400 rounded-full w-3 h-3"></Box>
            <Box className="bg-blue-400 rounded-full w-3 h-3"></Box>
            <Box className="bg-yellow-400 rounded-full w-3 h-3"></Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginTop: { xs: 4, md: 0 },
              marginLeft: { xs: 0, sm: 1 },
            }}
          >
            <input
              name="Task"
              defaultValue={""}
              className={styles.inputResponsive}
              style={{
                padding: 7,
                outline: "none",
                borderRadius: "12px",
                height: "40px",
                color: isDark ? Colors.dark.text : Colors.light.text,
                backgroundColor: isDark
                  ? Colors.dark.textField
                  : Colors.light.textField,
              }}
              placeholder="Task"
            />
            <FormControl
              sx={{
                m: 1,
                width: { xs: "95%", sm: "100px", md: "130px" },
              }}
              size="small"
            >
              <InputLabel id="demo-select-small-label">Role</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Role"
                name="Role"
                defaultValue={""}
                MenuProps={{
                  PaperProps: {
                    style: {
                      backgroundColor: isDark
                        ? Colors.dark.textField
                        : Colors.light.textField,
                    },
                  },
                }}
              >
                <MenuItem
                  value={"Personal"}
                  sx={{ color: isDark ? Colors.dark.text : Colors.light.text }}
                >
                  Personal
                </MenuItem>
                <MenuItem
                  value={"Freelance"}
                  sx={{ color: isDark ? Colors.dark.text : Colors.light.text }}
                >
                  Freelance
                </MenuItem>
                <MenuItem
                  value={"Work"}
                  sx={{ color: isDark ? Colors.dark.text : Colors.light.text }}
                >
                  Work
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: { xs: "90%", md: "50px" },
              borderRadius: { xs: "0%", md: "100%" },
              height: "50px",
            }}
          >
            Create
          </Button>
        </Box>
      </Box>
      {/* Divider */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          marginTop: { xs: 2, sm: 0 },
        }}
        className="justify-center items-center w-full"
      >
        <Divider className="bg-neutral-200" sx={{ height: 1, width: "100%" }} />
      </Box>
      {/* Two */}
      <Box
        className={styles.example}
        sx={{
          height: { xs: "60%", sm: "60%", md: "70%" },
          marginBottom: { xs: "-10px", sm: "0px" },
          marginLeft: { xs: "0px", lg: "20px" },
        }}
      >
        {tasks &&
          tasks.map((one) => (
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
                    sx={{
                      width: { xs: 9, sm: 12 },
                      height: { xs: 9, sm: 12 },
                    }}
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

export default page;

"use client";
import { getForTasks, getTasks } from "@/libs/action";
import { Box, Typography } from "@mui/material";
import FeedbackIcon from "@mui/icons-material/Feedback";
import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DoDisturbOffIcon from "@mui/icons-material/DoDisturbOff";
import formatDateToCustomString, {
  formatDate,
  getDayBefore,
  getTodayDate,
} from "@/components/DateTime";
import ModelFeedBack from "@/components/modelFeedBack";
import { Colors } from "@/config/color";

function Page() {
  const [allTasks, setAllTasks] = useState<any[]>();
  const [open, setOpen] = useState<boolean>(false);
  const [chartWidth, setChartWidth] = useState(window.innerWidth);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1000);
  const [totalTasksCondition, setTotalTasksCondition] = useState<string>("");
  const [totalFinishedTasksCondition, setTotalFinishedTasksCondition] =
    useState<string>("");
  const [totalTasksPercentage, setTotalTasksPercentage] = useState<any>();
  const [totalFinishedTasksPercentage, setFinishedTotalTasksPercentage] =
    useState<any>();
  const [tasks, setTasks] = useState<any[]>();
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
    const fetchTasks = async () => {
      setTasks(await getTasks());
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      setAllTasks(await getForTasks());
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const handleResize = () => setChartWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pieChartData: any = [
    allTasks?.length == 0
      ? {
          id: 0,
          value: 1,
          label: "None",
        }
      : {
          id: 0,
          value: allTasks?.filter((item) => item.taskstatus == "Inactive")
            .length,
          label: "Inactive Tasks",
        },
    {
      id: 1,
      value: allTasks?.filter((item) => item.taskstatus == "Operation").length,
      label: "Operation Tasks",
    },
    {
      id: 2,
      value: allTasks?.filter((item) => item.taskstatus == "Completed").length,
      label: "Completed Tasks",
    },
  ];
  const signs = [
    {
      id: 1,
      sign: (
        <ArrowUpwardIcon
          className="text-green-600"
          sx={{ fontSize: { xs: 7, sm: 15 } }}
        />
      ),
    },
    {
      id: 2,
      sign: (
        <DoDisturbOffIcon
          className="text-gray-600"
          sx={{ fontSize: { xs: 7, sm: 15 } }}
        />
      ),
    },
    {
      id: 3,
      sign: (
        <ArrowDownwardIcon
          className="text-red-600"
          sx={{ fontSize: { xs: 7, sm: 15 } }}
        />
      ),
    },
  ];

  // start%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // Total Tasks
  const numberOfDay =
    allTasks?.map((item) => formatDateToCustomString(item.timer)) || [];
  useEffect(() => {
    if (tasks && tasks?.length > 0) {
      const minDateTime = tasks.reduce((min, current) => {
        return new Date(current.timer) < new Date(min.timer) ? current : min;
      }).timer;

      const endDate = new Date(formatDateToCustomString(minDateTime));
      const startDate = new Date(getDayBefore(minDateTime));

      const lastDay = numberOfDay.filter((dateStr) => {
        const currentDate = new Date(dateStr);
        return currentDate >= startDate && currentDate < endDate;
      });

      let percentageChange;

      if (lastDay.length === 0) {
        percentageChange = tasks.length;
      } else {
        percentageChange =
          ((tasks.length - lastDay.length) / lastDay.length) * 100;
      }
      setTotalTasksPercentage(
        isNaN(percentageChange)
          ? "0.00%"
          : `${percentageChange > 0 ? "+" : ""}${percentageChange.toFixed(2)}%`
      );

      if (percentageChange > 0) {
        setTotalTasksCondition("Increase");
      } else if (percentageChange < 0) {
        setTotalTasksCondition("Decrease");
      } else {
        setTotalTasksCondition("No Change");
      }
    } else {
      const today = getTodayDate();

      const endDate = new Date(today);
      const startDate = new Date(getDayBefore(today));

      const lastDay = numberOfDay.filter((dateStr) => {
        const currentDate = new Date(dateStr);
        return currentDate >= startDate && currentDate < endDate;
      });

      let percentageChange;

      if (lastDay.length === 0) {
        percentageChange = 0;
        setTotalTasksPercentage("0.00%");
      } else {
        percentageChange = ((0 - lastDay.length) / lastDay.length) * 100;
        setTotalTasksPercentage(
          isNaN(percentageChange) ? "0.00%" : `${percentageChange.toFixed(2)}%`
        );
      }

      if (percentageChange > 0) {
        setTotalTasksCondition("Increase");
      } else if (percentageChange < 0) {
        setTotalTasksCondition("Decrease");
      } else {
        setTotalTasksCondition("No Change");
      }
    }
  }, [tasks, numberOfDay]);
  //Finished Task
  const allFinishedTasks =
    allTasks
      ?.filter((item) => item.taskstatus == "Completed")
      .map((item) => formatDateToCustomString(item.timer)) || [];
  const finishedTodayTask = tasks?.filter(
    (item) => item.taskstatus == "Completed"
  );

  useEffect(() => {
    if (finishedTodayTask && finishedTodayTask?.length > 0) {
      const minDateTime = finishedTodayTask.reduce((min, current) => {
        return new Date(current.timer) < new Date(min.timer) ? current : min;
      }).timer;

      const endDate = new Date(formatDateToCustomString(minDateTime));
      const startDate = new Date(getDayBefore(minDateTime));

      const lastDay = allFinishedTasks.filter((dateStr) => {
        const currentDate = new Date(dateStr);
        return currentDate >= startDate && currentDate < endDate;
      });

      let percentageChange;

      if (lastDay.length === 0) {
        percentageChange = finishedTodayTask.length;
      } else {
        percentageChange =
          ((finishedTodayTask.length - lastDay.length) / lastDay.length) * 100;
      }
      setFinishedTotalTasksPercentage(
        isNaN(percentageChange)
          ? "0.00%"
          : `${percentageChange > 0 ? "+" : ""}${percentageChange.toFixed(2)}%`
      );

      if (percentageChange > 0) {
        setTotalFinishedTasksCondition("Increase");
      } else if (percentageChange < 0) {
        setTotalFinishedTasksCondition("Decrease");
      } else {
        setTotalFinishedTasksCondition("No Change");
      }
    } else {
      const today = getTodayDate();

      const endDate = new Date(today);
      const startDate = new Date(getDayBefore(today));

      const lastDay = allFinishedTasks.filter((dateStr) => {
        const currentDate = new Date(dateStr);
        return currentDate >= startDate && currentDate < endDate;
      });

      let percentageChange;

      if (lastDay.length === 0) {
        percentageChange = 0;
        setFinishedTotalTasksPercentage("0.00%");
      } else {
        percentageChange = ((0 - lastDay.length) / lastDay.length) * 100;
        setFinishedTotalTasksPercentage(
          isNaN(percentageChange) ? "0.00%" : `${percentageChange.toFixed(2)}%`
        );
      }

      if (percentageChange > 0) {
        setTotalFinishedTasksCondition("Increase");
      } else if (percentageChange < 0) {
        setTotalFinishedTasksCondition("Decrease");
      } else {
        setTotalFinishedTasksCondition("No Change");
      }
    }
  }, [tasks, allFinishedTasks]);
  //end %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

  return (
    <Box
      sx={{
        height: "530px",
        padding: 2,
      }}
    >
      <Box className="flex justify-between">
        <Box>
          <Typography
            className="font-semibold "
            sx={{
              fontSize: { xs: 10, sm: 17 },
            }}
          >
            {`Welcome to Organic Mind ✌️`}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 8, sm: 15 },
            }}
          >
            {`Here's your report`}
          </Typography>
        </Box>
        <Box>
          <FeedbackIcon
            fontSize="medium"
            sx={{
              cursor: "pointer",
              color: isDark ? Colors.light.text : Colors.dark.text,
            }}
            onClick={() => setOpen(true)}
          />
        </Box>
      </Box>
      <Box
        className="flex justify-between"
        sx={{
          flexDirection: "row",
          maxHeight: 500,
          "@media (max-width: 1000px)": {
            flexDirection: "column",
            maxHeight: { xs: 487, sm: 465 },
          },
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarWidth: "none",
        }}
      >
        <Box
          sx={{
            width: "70%",
            "@media (max-width: 1000px)": {
              width: "100%",
            },
          }}
        >
          <Box
            className="flex justify-between mt-4"
            sx={{ gap: { xs: 1, sm: 6 } }}
          >
            <Box
              className="p-3 rounded-2xl shadow-xl border"
              sx={{
                width: "50%",
                backgroundColor: isDark ? Colors.dark.box : Colors.light.box,
              }}
            >
              <Typography
                className="font-bold"
                sx={{
                  fontSize: window.innerWidth < 400 ? 8 : { xs: 11, sm: 15 },
                  color: "#4b5563",
                }}
              >
                Total Tasks
              </Typography>
              <Box className="flex items-center gap-3">
                <Typography
                  className="font-semibold"
                  sx={{
                    fontSize: { xs: 11, sm: 15 },
                  }}
                >
                  {allTasks?.length}
                </Typography>
                <Box
                  className={`flex items-center px-2 py-1 rounded-lg ${
                    totalTasksCondition === "Increase"
                      ? "bg-green-100 text-green-700"
                      : totalTasksCondition === "Decrease"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {totalTasksCondition === "Increase"
                    ? signs[0].sign
                    : totalTasksCondition === "Decrease"
                    ? signs[2].sign
                    : signs[1].sign}
                  <Typography
                    className="font-medium"
                    sx={{ fontSize: { xs: 7, sm: 15 } }}
                  >
                    {totalTasksPercentage}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box
              className="p-3 rounded-2xl shadow-xl border"
              sx={{
                width: "50%",
                backgroundColor: isDark ? Colors.dark.box : Colors.light.box,
              }}
            >
              <Typography
                className="font-bold"
                sx={{
                  fontSize: window.innerWidth < 400 ? 8 : { xs: 11, sm: 15 },
                  color: "#4b5563",
                }}
              >
                Finished Tasks
              </Typography>
              <Box className="flex items-center gap-3">
                <Typography
                  className="font-semibold"
                  sx={{
                    fontSize: { xs: 11, sm: 15 },
                  }}
                >
                  {
                    allTasks?.filter((item) => item.taskstatus == "Completed")
                      .length
                  }
                </Typography>
                <Box
                  className={`flex items-center px-2 py-1 rounded-lg ${
                    totalFinishedTasksCondition === "Increase"
                      ? "bg-green-100 text-green-700"
                      : totalFinishedTasksCondition === "Decrease"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {totalFinishedTasksCondition === "Increase"
                    ? signs[0].sign
                    : totalFinishedTasksCondition === "Decrease"
                    ? signs[2].sign
                    : signs[1].sign}
                  <Typography
                    className=" font-medium"
                    sx={{ fontSize: { xs: 7, sm: 15 } }}
                  >
                    {totalFinishedTasksPercentage}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            className="shadow-xl border"
            sx={{
              marginTop: 2,
              borderRadius: 3,
              background: isDark
                ? Colors.dark.taskAnalysis
                : Colors.light.taskAnalysis,
              overflow: "auto",
              maxHeight: 357,
              paddingX: 2,
              paddingY: 2,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {/* Header */}
            <Typography
              className="font-bold text-gray-700 mb-2"
              sx={{ fontSize: { xs: 10, sm: 20 } }}
            >
              Task Analysis
            </Typography>

            {/* Table Headers */}
            <Box
              className="flex py-2 rounded-md"
              sx={{
                backgroundColor: isDark
                  ? Colors.dark.tableHeader
                  : Colors.light.tableHeader,
                paddingX: isDark ? 0 : "4px",
              }}
            >
              <Typography
                className=" text-gray-600"
                sx={{
                  width: "40%",
                  fontSize: { xs: 6, sm: 10, md: 15 },
                }}
              >
                Task
              </Typography>
              <Typography
                className="text-gray-600"
                sx={{
                  fontSize: { xs: 6, sm: 10, md: 15 },
                  width: "20%",
                }}
              >
                Task Status
              </Typography>
              <Typography
                className=" text-gray-600"
                sx={{
                  fontSize: { xs: 6, sm: 10, md: 15 },
                  width: "20%",

                  textAlign: "center",
                }}
              >
                Role
              </Typography>
              <Typography
                className=" text-gray-600"
                sx={{
                  fontSize: { xs: 6, sm: 10, md: 15 },
                  width: "20%",
                  textAlign: "end",
                  paddingRight: 1,
                }}
              >
                Created At
              </Typography>
            </Box>

            {/* Sample Task Data */}
            <Box className="mt-2 space-y-2">
              {allTasks?.map((item, index) => (
                <Box
                  key={index}
                  className="flex py-2 rounded-md shadow-sm "
                  sx={{
                    backgroundColor: isDark
                      ? Colors.dark.taskData
                      : Colors.light.taskData,
                  }}
                >
                  <Typography
                    sx={{
                      width: "40%",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      fontSize: { xs: 6, sm: 10, md: 15 },
                      paddingLeft: "4px",
                      paddingRight: 2,
                      color: isDark
                        ? Colors.dark.tasksText
                        : Colors.light.tasksText,
                    }}
                  >
                    {item.task}
                  </Typography>
                  <Typography
                    sx={{
                      width: "20%",
                      alignSelf: "center",
                      fontSize: { xs: 6, sm: 10, md: 15 },
                      color:
                        item.taskstatus === "Completed"
                          ? "#5df066"
                          : item.taskstatus === "Operation"
                          ? "orange"
                          : "#d61a1a",
                    }}
                  >
                    {item.taskstatus}
                  </Typography>
                  <Typography
                    sx={{
                      width: "20%",
                      fontSize: { xs: 6, sm: 10, md: 15 },
                      color: isDark
                        ? Colors.dark.tasksText
                        : Colors.light.tasksText,
                      textAlign: "center",
                    }}
                  >
                    {item.role}
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: "end",
                      paddingRight: 1,
                      width: "20%",
                      fontSize: { xs: 6, sm: 10, md: 15 },
                      color: isDark
                        ? Colors.dark.dateColor
                        : Colors.light.dateColor,
                    }}
                  >
                    {formatDate(item.timer)}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        <Box>
          <PieChart
            colors={["red", "blue", "green"]}
            series={[
              {
                data: pieChartData,
                highlightScope: { fade: "global", highlight: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
              },
            ]}
            width={isSmallScreen ? chartWidth : 250}
            height={
              window.innerWidth < 1000 && window.innerWidth > 600
                ? 200
                : window.innerWidth <= 600
                ? 100
                : 462
            }
            margin={
              isSmallScreen
                ? { left: 20, right: 20 }
                : { bottom: 100, left: 20, right: 20 }
            }
            legend={{
              position: isSmallScreen
                ? { vertical: "middle", horizontal: "left" }
                : { vertical: "bottom", horizontal: "middle" },
              labelStyle: {
                fontSize:
                  window.innerWidth < 1000 && window.innerWidth > 500
                    ? 15
                    : window.innerWidth < 500
                    ? 10
                    : 20,
              },
            }}
            sx={{
              margin: 2,
              marginLeft: { xs: -10, sm: 0 },
              "@media (min-width: 1000px)": {
                paddingBottom: 3,
              },
            }}
          />
        </Box>
      </Box>
      <ModelFeedBack open={open} setOpen={setOpen} />
    </Box>
  );
}

export default Page;

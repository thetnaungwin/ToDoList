"use client";
import { Box, Button, Divider, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import TodayIcon from "@mui/icons-material/Today";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Colors } from "@/config/color";

export interface userData {
  name: string;
  image: string | "";
  life: string | "";
}

function Profile({ name, image, life }: userData) {
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
  const pathName = usePathname();
  const finalImage =
    image == "undefined"
      ? "/default.png"
      : image == "null"
      ? "/default.png"
      : image;

  return (
    <Box
      className={isDark ? "rounded-md shadow-xl border" : ""}
      sx={{
        height: "530px",
        padding: { xs: 0, sm: "10px" },
        backgroundColor: isDark
          ? Colors.dark.profileSide
          : Colors.light.profileSide,
      }}
    >
      {/* Image and UserName */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          height: { xs: "30%", sm: "20%" },
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box>
          <Image
            src={finalImage}
            alt="Dynamic Image"
            width={60}
            height={60}
            className="rounded-full"
          />
        </Box>
        <Box>
          <Link href={"/home"}>
            <Typography
              className="text-center"
              sx={{
                fontSize: { xs: "15px", sm: "10px", md: "17px" },
                fontFamily: "serif",
              }}
            >
              {name}
            </Typography>
          </Link>
          <Typography
            className="font-semibold"
            sx={{
              fontSize: { xs: 10, sm: 10, md: 15 },
              color: isDark
                ? Colors.dark.purpleAndBlack
                : Colors.light.purpleAndBlack,
            }}
          >
            {life ? life : "Student"}
          </Typography>
        </Box>
      </Box>
      {/* Divider */}
      <Box className="flex justify-center items-center">
        <Divider
          className="bg-purple-400"
          sx={{ height: 2, width: { xs: "80px", sm: "150px", md: "200px" } }}
        />
      </Box>
      {/* Book */}
      <Box
        sx={{
          height: { xs: "55%", sm: "65%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box className="relative">
          <Box
            className={
              pathName == "/home/todaybook"
                ? "duration-300 animate-bounce"
                : "duration-300 animate-none"
            }
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0, sm: 2 },
              marginBottom: `${
                pathName == "/home/todaybook" ||
                pathName == "/home/todaybook/personal" ||
                pathName == "/home/todaybook/freelance" ||
                pathName == "/home/todaybook/work"
                  ? "100px"
                  : "10px"
              }`,
            }}
          >
            <TodayIcon
              sx={{
                fontSize: { xs: 15, sm: 25 },
                color: `${
                  (pathName == "/home/todaybook" ||
                    pathName == "/home/todaybook/personal" ||
                    pathName == "/home/todaybook/freelance" ||
                    pathName == "/home/todaybook/work") &&
                  !isDark
                    ? "#A855F7"
                    : isDark
                    ? Colors.dark.icon
                    : Colors.light.icon
                }`,
              }}
            />
            <Link href={"/home/todaybook"}>
              <Button
                variant="text"
                className="font-semibold"
                sx={{
                  fontSize: { xs: "8px", sm: "10px", md: "13px" },
                }}
                color="inherit"
              >
                Today book
              </Button>
            </Link>
          </Box>
          {/* For detail data of todayBook */}
          <Box
            sx={{
              display: `${
                pathName == "/home/todaybook" ||
                pathName == "/home/todaybook/personal" ||
                pathName == "/home/todaybook/freelance" ||
                pathName == "/home/todaybook/work"
                  ? "flex"
                  : "none"
              }`,
              flexDirection: "column",
              position: "absolute",
              gap: 0.6,
              top: 35,
              left: { xs: 20, sm: 50 },
            }}
          >
            <Box className="flex items-center gap-2">
              <Box
                className="bg-red-400 rounded-full"
                sx={{
                  width: { xs: 9, sm: 12 },
                  height: { xs: 9, sm: 12 },
                }}
              ></Box>
              <Link href={"/home/todaybook/personal"}>
                <Typography
                  sx={{
                    color: `${
                      pathName == "/home/todaybook/personal" && !isDark
                        ? "#A855F7"
                        : isDark && pathName == "/home/todaybook/personal"
                        ? "#FFF"
                        : "#00000"
                    }`,
                    fontSize: { xs: "9px", sm: "10px", md: "15px" },
                  }}
                >
                  Personal
                </Typography>
              </Link>
            </Box>
            <Box className="flex items-center gap-2">
              <Box
                className="bg-blue-400 rounded-full"
                sx={{
                  width: { xs: 9, sm: 12 },
                  height: { xs: 9, sm: 12 },
                }}
              ></Box>
              <Link href={"/home/todaybook/freelance"}>
                <Typography
                  sx={{
                    color: `${
                      pathName == "/home/todaybook/freelance" && !isDark
                        ? "#A855F7"
                        : isDark && pathName == "/home/todaybook/freelance"
                        ? "#FFF"
                        : "#00000"
                    }`,
                    fontSize: { xs: "9px", sm: "10px", md: "15px" },
                  }}
                >
                  Freelance
                </Typography>
              </Link>
            </Box>
            <Box className="flex items-center gap-2">
              <Box
                className="bg-yellow-400 rounded-full"
                sx={{
                  width: { xs: 9, sm: 12 },
                  height: { xs: 9, sm: 12 },
                }}
              ></Box>
              <Link href={"/home/todaybook/work"}>
                <Typography
                  sx={{
                    color: `${
                      pathName == "/home/todaybook/work" && !isDark
                        ? "#A855F7"
                        : isDark && pathName == "/home/todaybook/work"
                        ? "#FFF"
                        : "#00000"
                    }`,
                    fontSize: { xs: "9px", sm: "10px", md: "15px" },
                  }}
                >
                  Work
                </Typography>
              </Link>
            </Box>
          </Box>
          <Box
            className={
              pathName == "/home/stickywall" ? "animate-bounce" : "animate-none"
            }
            sx={{
              gap: {
                xs: 0,
                sm: 2,
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              },
            }}
          >
            <EventAvailableIcon
              sx={{
                fontSize: { xs: 15, sm: 25 },
                color: `${
                  pathName == "/home/stickywall" && !isDark
                    ? "#A855F7"
                    : isDark
                    ? Colors.dark.icon
                    : Colors.light.icon
                }`,
              }}
            />
            <Link href={"/home/stickywall"}>
              <Button
                variant="text"
                color="inherit"
                className="font-semibold"
                sx={{
                  fontSize: { xs: "8px", sm: "10px", md: "13px" },
                }}
              >
                Sticky Wall
              </Button>
            </Link>
          </Box>
          <Box
            className={
              pathName == "/home/setting" ? "animate-bounce" : "animate-none"
            }
            sx={{
              gap: { xs: 0, sm: 2 },
              display: "flex",
              alignItems: "center",
            }}
          >
            <SettingsSuggestIcon
              sx={{
                fontSize: { xs: 15, sm: 25 },
                color: `${
                  pathName == "/home/setting" && !isDark
                    ? "#A855F7"
                    : isDark
                    ? Colors.dark.icon
                    : Colors.light.icon
                }`,
              }}
            />
            <Link href={"/home/setting"}>
              <Button
                variant="text"
                className="font-semibold"
                color="inherit"
                sx={{ fontSize: { xs: "8px", sm: "10px", md: "13px" } }}
              >
                Setting
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
      {/* LogOut */}
      <Box
        className="flex justify-center items-end"
        sx={{ height: { xs: "13%", sm: "15%" } }}
      >
        <Button
          variant="contained"
          sx={{ fontSize: { xs: "6px", sm: "8px", md: "10px" } }}
          onClick={() => signOut()}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}

export default Profile;

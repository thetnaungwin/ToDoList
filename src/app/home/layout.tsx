import { getServerSession } from "next-auth";
import { Box } from "@mui/material";
import React, { ReactNode } from "react";
import { getUserData } from "@/libs/action";
import Profile from "@/components/Profile";
import { Toaster } from "react-hot-toast";

interface Pros {
  children: ReactNode;
}

async function Homelayout({ children }: Pros) {
  const session = await getServerSession();
  const { name, life, profileurl } = await getUserData();
  let image;
  if (profileurl == "") {
    image = session?.user?.image;
  }
  image = profileurl;

  return (
    <Box
      className="flex justify-center items-center overflow-hidden"
      sx={{
        "@media (max-height: 600px)": {
          marginTop: 0,
        },
        marginTop: 5,
      }}
    >
      <Box
        className="bg-purple-500"
        sx={{
          width: { xs: "100%", lg: "1100px" },
          borderRadius: { xs: 0, sm: 3 },
          "@media (min-height: 770px) and (max-height: 1400px)": {
            marginTop: 10,
          },
        }}
      >
        <Box className="rounded-lg flex m-4 border-2">
          <Box sx={{ width: { xs: "40%", sm: "28%", md: "23%", lg: "25%" } }}>
            <Profile name={name} image={image} life={life} />
          </Box>
          <Box
            sx={{
              width: { xs: "70%", sm: "72%", md: "76%", lg: "74%" },
            }}
          >
            {children}
          </Box>
          <Toaster position="top-center" />
        </Box>
      </Box>
    </Box>
  );
}

export default Homelayout;

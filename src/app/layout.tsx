"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Colors } from "@/config/color";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{
          backgroundColor:
            localStorage.getItem("theme") === "dark"
              ? Colors.dark.background
              : Colors.light.background,
        }}
      >
        {children}
      </body>
    </html>
  );
}

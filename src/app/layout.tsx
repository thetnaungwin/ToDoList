"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Colors } from "@/config/color";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content={isDark ? "#000000" : "#ffffff"} />
      </head>
      <body
        className={inter.className}
        style={{
          backgroundColor: isDark
            ? Colors.dark.background
            : Colors.light.background,
        }}
      >
        {children}
      </body>
    </html>
  );
}

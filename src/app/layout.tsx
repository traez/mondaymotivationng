import type { Metadata } from "next";
import "./globals.css";
import { NextThemeProvider } from "../components/NextThemeProvider";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Monday Motivation NG",
  description: "Created by Trae Zeeofor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-trebuchetMs">
        <NextThemeProvider>
          <NavBar />
          {children}
        </NextThemeProvider>
      </body>
    </html>
  );
}

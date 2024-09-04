import type { Metadata } from "next";
import "./globals.css";
import { NextThemeProvider } from "../components/NextThemeProvider";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import dbConnect from "@/lib/dbconnect";

export const metadata: Metadata = {
  title: "Monday Motivation NG",
  description: "Created by Trae Zeeofor",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await dbConnect();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-trebuchetMs min-h-screen">
        <NextThemeProvider>
          <NavBar />
          {children}
          <Footer />
        </NextThemeProvider>
      </body>
    </html>
  );
}

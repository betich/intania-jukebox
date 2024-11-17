import type { Metadata } from "next";
import localFont from "next/font/local";
import { IBM_Plex_Sans_Thai } from "next/font/google";
import "./globals.css";
import { Header } from "@/common/header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  variable: "--font-ibm-plex-sans-thai",
  weight: "500",
  subsets: ["thai"],
});

export const metadata: Metadata = {
  title: "Intania Jukebox",
  description: "The Music Player for Intania.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ibmPlexSansThai.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}

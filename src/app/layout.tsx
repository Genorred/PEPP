import "~/app/globals.css";
import { Inter } from "next/font/google";
import {Navbar} from "~/widgets/navigation";
import React from "react";
import Providers from "~/widgets/providers/ui/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "PEPP",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "favicon.ico" }],

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <Providers>
          <main className=' min-h-screen'>
            <Navbar/>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}

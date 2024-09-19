import type {Metadata} from "next";
import "./globals.css";
import {Inter as FontSans} from "next/font/google"

import {cn} from "@/shared/lib/utils"
import React from "react";
import Navbar from "@/widgets/Navbar";
import { Provider } from "react-redux";
import {store} from "@/app/store";
import Providers from "@/widgets/Providers/ui";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})
export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <Providers>
          <body className={cn(
            "bg-background font-sans antialiased",
            fontSans.variable
          )}>
          <main className="flex flex-col items-center">
            <Navbar />
            <div className="w-full flex56 flex-grow min-h-screen">
              {children}
            </div>
          </main>
          </body>

        </Providers>
        </html>
    );
}
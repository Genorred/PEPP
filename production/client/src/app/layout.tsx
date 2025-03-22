import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import Navbar from "@/widgets/Navbar";
import { Providers } from "@/widgets/Providers";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/shared/lib/utils";
import "@radix-ui/themes/styles.css";
import { Toaster } from "@/shared/ui/sonner";
import { Theme } from "@radix-ui/themes";

export const metadata: Metadata = {
  title: "PEPP",
  description: "Powerful Editing for Perfect Posts"
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans"
});
export default function RootLayout({
                                     children
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  console.log('envUrl', process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL);
  return (
    <html lang="en">
    <meta name="viewport" content="initial-scale=1, width=device-width" />
    <body className={cn(
      "min-h-screen bg-background font-sans antialiased !overflow-auto",
      fontSans.variable
    )}>
    <Theme>
    <Providers>
      <main>
        <Navbar />
        <div className="font-bold relative">
          {children}
        </div>
        <Toaster />
      </main>
    </Providers>
    </Theme>
    </body>

    </html>
  );
}
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
import Link from "next/link";
import { Edit } from "lucide-react";
import Footer from "@/widgets/Footer";

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
    <script src="https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js"></script>
    <Theme>
    <Providers>
      <main className='min-h-screen flex-col flex'>
        <Navbar />
        <div className="font-bold relative flex-1">
          {children}
        </div>
        <Footer />
        <Toaster />
      </main>
    </Providers>
    </Theme>

    </body>

    </html>
  );
}
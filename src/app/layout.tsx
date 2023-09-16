import { Open_Sans } from "next/font/google";
import { Metadata } from "next";
import { ReactNode } from "react";

import "./globals.css";

const openSans = Open_Sans({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
  icons: [{ rel: "icon", url: "./favicon.ico" }],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={openSans.className}>{children}</body>
    </html>
  );
}

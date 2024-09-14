import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ReactNode } from "react";

const openSans = Open_Sans({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
  icons: [{ rel: "icon", url: "./favicon.ico" }],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      telemetry={{
        disabled: true,
      }}
      afterSignOutUrl="/"
    >
      <html lang="en">
        <body className={openSans.className}>
          {children}
          <div id="modal-root" />
          <SpeedInsights />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}

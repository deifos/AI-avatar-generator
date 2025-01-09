import "./globals.css";
import type { Metadata } from "next";
import { mono } from "./fonts";
import { Toaster } from "@/components/ui/toaster";
import MicrosoftClarity from "@/metrics/MicrosoftClarity";

export const metadata: Metadata = {
  title: "AI Avatar Creator",
  description: "Create stunning AI-powered avatars",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <MicrosoftClarity />
      </head>
      <body className={`${mono.variable} font-mono antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

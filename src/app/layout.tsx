"use client";
import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface HydrationErrorBoundaryProps {
  children: React.ReactNode;
}

class HydrationErrorBoundary extends React.Component<HydrationErrorBoundaryProps> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        "Error caught in HydrationErrorBoundary:",
        error,
        errorInfo
      );
    }
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (process.env.NODE_ENV === "development") {
    const originalConsoleError = console.error;
    console.error = (...args) => {
      if (
        /A tree hydrated but some attributes of the server rendered HTML didn't match/.test(
          args[0]
        )
      ) {
        return;
      }
      originalConsoleError(...args);
    };
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HydrationErrorBoundary>
          {" "}
          <QueryProvider> {children}</QueryProvider>
        </HydrationErrorBoundary>
      </body>
    </html>
  );
}

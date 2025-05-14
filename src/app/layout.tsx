import Script from "next/script";

import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Image from "next/image";
import { Analytics } from "@vercel/analytics/react";

import { cn } from "@/lib/utils";
import "./globals.css";
import { Providers } from "./providers";
import { ThemePicker } from "@/components/theme-picker";
import { Fathom } from "./fathom";

export const metadata: Metadata = {
  title: "Classrooms",
  description: "Aulas libres en utec",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          "bg-background font-sans antialiased min-h-screen overflow-y-scroll"
        )}
      >
        <Fathom />
        <Providers>
          <div className="flex p-2 items-center mb-2 bg-foreground">
            <div className="flex-none w-16">
              <Image
                src="/classrooms.png"
                alt="Classrooms Logo"
                width={30}
                height={30}
                className="invert dark:invert-0"
              />
            </div>
            <div className="flex-1 text-center">
              <h1 className="text-xl font-bold font-mono animate-pulse text-background">
                classrooms
              </h1>
            </div>
            <div className="flex-none w-16 flex justify-end invert">
              <ThemePicker />
            </div>
          </div>
          <div className="max-w-xl mx-auto">{children}</div>
          <div className="flex p-2 items-center mt-8">
            <div className="flex-1 text-center">
              <p className="text-xs underline">
                <a
                  href="https://www.caverne.io"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  © 2024 Anthony Cueva
                </a>
              </p>
            </div>
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}

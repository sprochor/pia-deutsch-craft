import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ProgressProvider } from "@/context/ProgressContext";
import ThemeWrapper from "./ThemeWrapper";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <ProgressProvider>
          <ThemeWrapper>
            {children}
          </ThemeWrapper>
        </ProgressProvider>
      </body>
    </html>
  );
}
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeWrapper from "./ThemeWrapper"; // <-- Agregamos esta importación

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Piacraft Academy",
  description: "Misiones de Alemán",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Piacraft",
  },
};

export const viewport: Viewport = {
  themeColor: "#528044",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#1e1e1e] text-white transition-colors duration-500">
        {/* Envolvemos los hijos con nuestro escuchador de temas */}
        <ThemeWrapper>
          {children}
        </ThemeWrapper>
      </body>
    </html>
  );
}
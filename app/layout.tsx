import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import ShortcutManager from "@/components/ShortcutManager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Kaif Khan — Product Engineer", template: "%s — Kaif Khan" },
  description: "Product engineer and former product designer. I build the software that runs real businesses — from the Figma file to the database to the server.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <ShortcutManager />
          <Navbar />
          <div className="min-h-[calc(100vh-140px)]">
            <PageTransition>
              {children}
            </PageTransition>
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

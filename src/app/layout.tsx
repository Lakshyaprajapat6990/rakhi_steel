import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "राखी Steel Furniture | Premium Steel Almirahs & Fabrication",
  description:
    "राखी Steel Furniture — premium steel almirahs, wardrobes, and custom steel fabrication with precision manufacturing across Madhya Pradesh.",
  keywords: [
    "Rakhi Steel",
    "राखी Steel",
    "steel furniture",
    "steel almirah",
    "steel fabrication",
    "Madhya Pradesh",
    "Indore",
  ],
  authors: [{ name: "राखी Steel Furniture" }],
  metadataBase: new URL("https://www.rakhisteel.in"),
  icons: {
    icon: "/images/logo-name.png",
  },
  openGraph: {
    title: "राखी Steel Furniture",
    description:
      "Premium steel almirahs, wardrobes, and custom steel fabrication across Madhya Pradesh.",
    url: "https://www.rakhisteel.in",
    siteName: "राखी Steel Furniture",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "राखी Steel Furniture",
    description:
      "Premium steel almirahs, wardrobes, and custom steel fabrication across Madhya Pradesh.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

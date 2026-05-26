import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Recall — Coming your way soon.",
  description:
    "Recall is on the way. A platform built for what matters most. Coming your way soon.",
  openGraph: {
    title: "Recall — Coming your way soon.",
    description: "Recall is on the way. Coming your way soon.",
    type: "website",
  },
  themeColor: "#5EA0F2",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-inter">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shareu Blog",
  description: "A fast personal blog focused on performance, writing, and engineering."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

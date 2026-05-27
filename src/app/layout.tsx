import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LifeQuest",
  description: "A premium gamified productivity command center.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background">{children}</body>
    </html>
  );
}

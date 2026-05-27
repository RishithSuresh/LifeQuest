import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LifeQuest",
  description: "A stylish and modern productivity dashboard with gamified task management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[#05070f]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

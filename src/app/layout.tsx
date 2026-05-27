import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LifeQuest - Gamified Productivity",
  description: "A stylish and modern productivity dashboard with gamified task management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full bg-gradient-to-br from-slate-950 via-slate-900 to-black" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

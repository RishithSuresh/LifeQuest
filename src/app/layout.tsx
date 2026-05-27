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
<<<<<<< HEAD
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[#06080f]" suppressHydrationWarning>
        {children}
      </body>
=======
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background">{children}</body>
>>>>>>> efed10a42a1ed5fff1f4e36b9239afeeed821748
    </html>
  );
}

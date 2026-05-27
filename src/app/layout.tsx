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
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[#06080f]" suppressHydrationWarning>
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
          className="fixed inset-0 w-full h-full object-cover -z-10"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_131941_d136af49-e243-493a-be14-6ff3f24e09e6.mp4" type="video/mp4" />
        </video>
        {children}
      </body>
    </html>
  );
}

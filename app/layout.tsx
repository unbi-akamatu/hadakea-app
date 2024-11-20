import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <Head>
        <script src="/js/script.js" defer></script>
      </Head>
      <body className={cn(`${geistSans.variable} ${geistMono.variable} antialiased`, "min-h-dvh")}>
        <header className="h-16 border-b px-6 flex items-center">
          <Link href="/">LOGO</Link>
        </header>
        {children}
        <footer className="h-16 border-t px-6 flex items-cente sticky top-full">&copy; aaa</footer>
      </body>
    </html>
  );
}

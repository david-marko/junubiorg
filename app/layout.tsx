import type { Metadata } from "next";
import "./globals.css";
import { auth } from "@/lib/auth";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header";
import Footer from "@/components/footer";
import DashHeader from "@/components/dashHeader";
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: "Junubi | Open Data Portal",
  description: "South Sudan's Open Data Portal",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <NextTopLoader />
        <Toaster />
        {session ? <DashHeader session={session} /> : <Header session={session} />}
        {children}
      </body>
    </html>
  );
}

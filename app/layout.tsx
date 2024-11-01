import type { Metadata } from "next";
import "./globals.css";
import { auth } from "@/lib/auth";

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
        {children}
      </body>
    </html>
  );
}

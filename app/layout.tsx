import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Junubi | Open Data Portal",
  description: "South Sudan's Open Data Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

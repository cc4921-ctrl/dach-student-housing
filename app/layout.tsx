import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DACH Student Housing Market",
  description: "Student housing analytics for Austria and Germany",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

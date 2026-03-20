import type { Metadata } from "next";
import "./globals.css";
import Nav from "./components/Nav";

export const metadata: Metadata = {
  title: "DACH Student Housing Market",
  description: "Student housing analytics for Austria and Germany — Innsbruck, Munich, Passau",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-midnight text-glacier">
        <Nav />
        {children}
      </body>
    </html>
  );
}

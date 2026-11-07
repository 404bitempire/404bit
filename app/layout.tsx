import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "404bit — Your world of entertainment",
  description: "Discover movies, series, anime, live channels and sports in one place.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

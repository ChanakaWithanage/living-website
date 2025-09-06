import "./globals.css"
import type { Metadata } from "next"

export const metadata = {
  title: "SparksWall",
  description:
    "SparksWall is a website built by you. Drop your ideas, vote on favorites, and watch them turn into real features.",
  openGraph: {
    title: "SparksWall",
    description:
      "SparksWall is a website built by you. Drop your ideas, vote on favorites, and watch them turn into real features.",
    url: "https://sparkswall.vercel.app",
    siteName: "SparksWall",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SparksWall",
    description:
      "SparksWall is a website built by you. Drop your ideas, vote on favorites, and watch them turn into real features.",
    images: ["/og-image.png"],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}


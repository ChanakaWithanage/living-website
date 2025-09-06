import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "SparksWall",
  description:
    "SparksWall is a website built by you. Drop your ideas, vote on favorites, and watch them turn into real features.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

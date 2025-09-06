import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Living Website",
  description: "This website grows with your ideas",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

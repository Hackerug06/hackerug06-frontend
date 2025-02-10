import type React from "react"

export const metadata = {
  title: "Hackerug06 Technologies",
  description: "Welcome to Hackerug06 Technologies",
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


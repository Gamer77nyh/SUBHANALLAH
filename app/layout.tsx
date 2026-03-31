import type { Metadata } from "next"
import '../styles/globals.css'

export const metadata: Metadata = {
  title: "Subhan Allah Import and Export - Travel & Cargo Services",
  description: "Professional travel agency and cargo logistics services. Flight bookings, cargo shipping, and door-to-door delivery.",
  icons: {
    icon: [{ url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="50" font-size="50" font-weight="bold" text-anchor="middle" dominant-baseline="middle" fill="%23d4af37">✈</text></svg>' }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-navy-900 font-sans antialiased">
        {children}
      </body>
    </html>
  )
}

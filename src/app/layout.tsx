import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Brer Application',
  description: 'Brer Frontend Application',
  icons: {
    favicon: 'favicon.ico',
    favicon16: 'favicon/favicon-16x16.png',
    favicon32: 'favicon/favicon-32x32.png',
    appleTouchIcon: 'favicon/apple-touch-icon.png',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: '#c9b09a',
  assets: '/assets',
  manifest: 'manifest.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

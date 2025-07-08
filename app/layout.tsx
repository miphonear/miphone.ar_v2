// app/layout.tsx
import './globals.css'
import Script from 'next/script'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], weight: ['400', '700', '900'] })

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={inter.className}>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VTHYM5J1V2"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VTHYM5J1V2');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}

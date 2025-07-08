// app/layout.tsx
import './globals.css'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata = {
  title: 'miPhone™',
  description:
    'Descubrí los mejores precios en productos tecnológicos. iPhone, Apple, Samsung, Xiaomi, Consolas, Gaming, Fotografía y más. ¡A un clic de distancia!',
  keywords: [
    'precios celulares Argentina',
    'comprar iPhone',
    'MacBook',
    'Samsung',
    'Xiaomi',
    'consolas',
    'gaming',
    'fotografía',
    'ofertas online',
  ],
  authors: [{ name: 'miPhone', url: 'https://miphone.ar' }],
  openGraph: {
    title: 'miPhone™',
    description: 'Los mejores precios en tecnología: Apple, Samsung, Xiaomi, consolas y más.',
    url: 'https://miphone.ar',
    type: 'website',
    images: [
      {
        url: 'https://miphone.ar/public/images/preview.jpg',
        width: 1200,
        height: 630,
        alt: 'miPhone™',
      },
    ],
    siteName: 'miPhone™',
    locale: 'es_AR',
  },
  metadataBase: new URL('https://miphone.ar'),
}

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
      <body>
        {children} <SpeedInsights />
      </body>
    </html>
  )
}

"use client" 

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"

const queryClient = new QueryClient()

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: 'ComicVerse - Leer Cómics en Vertical',
//   description: 'Plataforma de lectura de cómics optimizada para móvil con formato vertical',
//   viewport: {
//     width: 'device-width',
//     initialScale: 1,
//     maximumScale: 1,
//   },
//     generator: 'v0.app'
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased dark`}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        <Analytics />
      </body>
    </html>
  )
}

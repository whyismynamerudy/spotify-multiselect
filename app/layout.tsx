import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AppContextProvider from '@/components/ContextAPI/provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotify Multi-Select Tool',
  description: 'The one feature Spotify is still missing.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes='any'/>
      <AppContextProvider>
        <body className={inter.className}>
            {children}
        </body>
      </AppContextProvider>
    </html>
  )
}

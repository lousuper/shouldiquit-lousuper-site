import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://shouldiquit.lousuper.com"),
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* 🔥 Open Graph SEO + Social Sharing */}
        <meta property="og:title" content="Should I Quit My Job? Let AI Tell You." />
        <meta
          property="og:description"
          content="Free, no-login AI quiz that gives you a burnout score, archetype, resignation letter, and Career Reboot Kit. Brutally honest."
        />
        <meta property="og:image" content="https://shouldiquit.lousuper.com/og-cover.jpg" />
        <meta property="og:url" content="https://shouldiquit.lousuper.com" />
        <meta property="og:type" content="website" />

        {/* 🐦 Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Should I Quit My Job? Let AI Tell You." />
        <meta
          name="twitter:description"
          content="No login. No fluff. Just an AI-powered burnout score and reboot kit."
        />
        <meta name="twitter:image" content="https://shouldiquit.lousuper.com/og-cover.jpg" />

        {/* Additional meta tags for better SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#7c3aed" />
        <link rel="canonical" href="https://shouldiquit.lousuper.com/" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

import type { Metadata } from "next"
import ClientPage from "./ClientPage"

export const metadata: Metadata = {
  title: "Should I Quit? — Free AI Burnout Quiz",
  description: "Burned out at work? Let AI tell you the brutal truth. Free. No login. Resignation letter included.",
  keywords: "burnout, career change, job satisfaction, quit job, career advice, AI career coach, resignation letter",
  authors: [{ name: "Should I Quit" }],
  openGraph: {
    type: "website",
    url: "https://shouldiquit.lousuper.com/",
    title: "Should I Quit? — Free AI Burnout Quiz",
    description: "Burned out at work? Let AI tell you the brutal truth. Free. No login. Resignation letter included.",
    images: [
      {
        url: "https://shouldiquit.lousuper.com/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Fake AI resignation letter preview and burnout score meter from Should I Quit quiz.",
      },
    ],
    siteName: "Should I Quit",
  },
  twitter: {
    card: "summary_large_image",
    title: "Should I Quit? — Free AI Burnout Quiz",
    description: "Burned out at work? Let AI tell you the brutal truth. Free. No login. Resignation letter included.",
    images: [
      {
        url: "https://shouldiquit.lousuper.com/og-cover.jpg",
        alt: "Fake AI resignation letter preview and burnout score meter from Should I Quit quiz.",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://shouldiquit.lousuper.com"),
  other: {
    "og:image:alt": "Fake AI resignation letter preview and burnout score meter from Should I Quit quiz.",
  },
}

export default function HomePage() {
  return <ClientPage />
}

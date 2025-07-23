"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function ClientPage() {
  const [showThankYou, setShowThankYou] = useState(false)

  useEffect(() => {
    // Check if user is returning from a donation
    const urlParams = new URLSearchParams(window.location.search)
    const isReturning =
      urlParams.get("donated") === "true" ||
      urlParams.get("return") === "true" ||
      document.referrer.includes("buymeacoffee.com") ||
      document.referrer.includes("coff.ee") ||
      document.referrer.includes("paypal.com") ||
      document.referrer.includes("moonshot.com")

    if (isReturning) {
      setShowThankYou(true)
      // Auto-hide after 8 seconds
      setTimeout(() => setShowThankYou(false), 8000)

      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [])

  const handleDonationClick = (platform: string) => {
    // Set a flag in localStorage to detect return
    localStorage.setItem("donationAttempt", platform)
    localStorage.setItem("donationTime", Date.now().toString())
  }

  const handleBitcoinClick = () => {
    navigator.clipboard.writeText("bc1q7qma0wmd62j4plv26n5hm5za9yc4tfpuzykagu")
    setShowThankYou(true)
    setTimeout(() => setShowThankYou(false), 6000)
  }

  const handleMoonshotClick = () => {
    navigator.clipboard.writeText("HF9CgXJj1g7p7FJoLhpmBUSPeHiFppapMRnnLuenmoon")
    setShowThankYou(true)
    setTimeout(() => setShowThankYou(false), 6000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 text-white overflow-hidden relative">
      {/* Thank You Popup */}
      {showThankYou && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-500">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-lg shadow-2xl border border-green-400/30 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🙏</span>
              <div>
                <p className="font-bold text-lg">Thank you so much!</p>
                <p className="text-sm opacity-90">Your support means everything! 💜</p>
              </div>
              <button onClick={() => setShowThankYou(false)} className="ml-4 text-white/70 hover:text-white text-xl">
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>

      {/* Animated Background Orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-40 right-20 w-48 h-48 bg-gradient-to-l from-cyan-400 to-pink-500 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-2xl opacity-25 animate-pulse delay-500"></div>

      {/* Floating Geometric Shapes */}
      <div className="absolute top-1/4 left-8 text-pink-400 text-6xl opacity-30 animate-bounce delay-500">◆</div>
      <div className="absolute top-1/3 right-12 text-cyan-400 text-4xl opacity-40 animate-pulse delay-1000">▲</div>
      <div className="absolute bottom-1/4 left-16 text-purple-400 text-5xl opacity-25 animate-bounce delay-700">●</div>
      <div className="absolute top-2/3 right-1/4 text-yellow-400 text-3xl opacity-30 animate-pulse delay-300">★</div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
          <div className="max-w-5xl mx-auto space-y-12">
            {/* Badge */}
            <div className="flex justify-center">
              <Badge className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 text-pink-300 px-6 py-2 text-sm font-medium backdrop-blur-md">
                ✨ Free AI-Powered Career Reality Check
              </Badge>
            </div>

            {/* Glitch Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight">
              <span className="relative inline-block">
                <span className="glitch-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Should I Quit
                </span>
                <span className="absolute top-0 left-0 glitch-text-shadow text-pink-500 opacity-70">Should I Quit</span>
                <span className="absolute top-0 left-0 glitch-text-shadow-2 text-cyan-400 opacity-70">
                  Should I Quit
                </span>
              </span>
              <br />
              <span className="relative inline-block mt-4">
                <span className="glitch-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  My Job?
                </span>
                <span className="absolute top-0 left-0 glitch-text-shadow text-pink-500 opacity-70">My Job?</span>
                <span className="absolute top-0 left-0 glitch-text-shadow-2 text-cyan-400 opacity-70">My Job?</span>
              </span>
            </h1>

            {/* Tagline */}
            <div className="max-w-4xl mx-auto">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6 font-light">
                Built this AI to help you decide if it's time to quit your job — or just scream into a Slack channel.
              </p>
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 leading-relaxed font-light">
                An AI-powered <span className="text-pink-400 font-semibold">burnout simulator</span> +{" "}
                <span className="text-cyan-400 font-semibold">career reboot kit</span>
                .<br />
                <span className="text-lg md:text-xl text-purple-300">
                  Brutally honest. Totally free. No login needed.
                </span>
              </p>
            </div>

            {/* Enhanced CTA Section */}
            <div className="pt-8 space-y-6">
              <Link href="/quiz">
                <Button className="group relative overflow-hidden bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-xl px-16 py-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/25 border border-pink-400/20">
                  <span className="relative z-10 flex items-center gap-3">
                    🔥 Take the Quiz
                    <span className="text-sm opacity-80">(2 min)</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </Button>
              </Link>

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span>10 Questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-200"></span>
                  <span>AI Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-400"></span>
                  <span>Resignation Letter</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-600"></span>
                  <span>Career Guide</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section className="py-20 px-4 bg-black/20 backdrop-blur-sm border-y border-pink-500/10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Your Career Deserves Better
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/30 backdrop-blur-md rounded-2xl p-8 border border-pink-500/20 hover:border-pink-400/40 transition-all duration-300 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🧠</div>
                <h3 className="text-xl font-bold text-white mb-4">AI Burnout Analysis</h3>
                <p className="text-gray-300 leading-relaxed">
                  Get brutally honest insights about your career situation. No sugar-coating, just real talk about where
                  you stand.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-gradient-to-br from-cyan-900/50 to-blue-900/30 backdrop-blur-md rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">✍️</div>
                <h3 className="text-xl font-bold text-white mb-4">Custom Resignation Letters</h3>
                <p className="text-gray-300 leading-relaxed">
                  From corporate polite to spicy petty — get AI-generated resignation letters that match your vibe.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-gradient-to-br from-yellow-900/50 to-orange-900/30 backdrop-blur-md rounded-2xl p-8 border border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-300 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🚀</div>
                <h3 className="text-xl font-bold text-white mb-4">Career Reboot Kit</h3>
                <p className="text-gray-300 leading-relaxed">
                  Personalized action plans, job suggestions, and next steps to take control of your professional life.
                </p>
              </div>
            </div>

            {/* Enhanced Description */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-pink-500/20 max-w-4xl mx-auto">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  Feeling trapped in your job? You're not alone. Our AI-powered assessment cuts through the noise to
                  give you brutally honest insights about your career situation. Whether you're dealing with burnout,
                  toxic management, or just feeling stuck, we'll help you figure out if it's time to make a change. Get
                  personalized recommendations, actionable next steps, and the clarity you need to take control of your
                  professional life. No fluff, no false hope – just real talk about your career future.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="relative z-10 bg-black/40 backdrop-blur-md border-t border-pink-500/20 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center space-y-8">
            {/* Header with Enhanced Profile */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Support My Projects
              </h3>

              {/* Enhanced Profile Section */}
              <a
                href="https://lousuper.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 hover:scale-110 transition-all duration-500"
              >
                <div className="relative">
                  {/* Enhanced outer glow */}
                  <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-pink-500/30 to-purple-500/30 blur-xl group-hover:from-pink-400/70 group-hover:to-purple-400/70 group-hover:blur-2xl group-hover:-inset-5 transition-all duration-500 animate-pulse"></div>

                  {/* Enhanced inner glow */}
                  <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-pink-400/40 to-purple-400/40 blur-lg group-hover:from-pink-300/80 group-hover:to-purple-300/80 group-hover:blur-xl group-hover:-inset-4 transition-all duration-500"></div>

                  {/* Profile image with enhanced border */}
                  <div className="relative w-20 h-20 rounded-full p-1 bg-gradient-to-r from-pink-400 to-purple-400 group-hover:from-pink-300 group-hover:to-purple-300 group-hover:p-0.5 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-pink-500/50">
                    <img
                      src="/lou-profile.jpg"
                      alt="Lou Super - Chief Quit Officer"
                      className="w-full h-full rounded-full object-cover brightness-110 contrast-120 saturate-125 group-hover:brightness-125 group-hover:contrast-130 group-hover:saturate-150 transition-all duration-500"
                    />
                  </div>

                  {/* Enhanced sparkle effects */}
                  <div className="absolute top-0 right-0 w-3 h-3 bg-white rounded-full opacity-80 group-hover:opacity-100 group-hover:w-4 group-hover:h-4 group-hover:top-[-3px] group-hover:right-[-3px] transition-all duration-500 animate-ping group-hover:animate-pulse"></div>
                  <div className="absolute bottom-1 left-1 w-2 h-2 bg-cyan-300 rounded-full opacity-0 group-hover:opacity-90 transition-all duration-500 animate-pulse delay-200"></div>
                  <div className="absolute top-1/2 left-0 w-1.5 h-1.5 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-80 transition-all duration-500 animate-pulse delay-400"></div>
                </div>

                <div className="text-left group-hover:translate-x-2 transition-all duration-500">
                  <div className="text-white group-hover:bg-gradient-to-r group-hover:from-pink-300 group-hover:to-purple-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500 font-bold text-base group-hover:text-lg">
                    Lou Super
                  </div>
                  <div className="text-purple-300 group-hover:text-purple-200 text-sm font-medium group-hover:text-base transition-all duration-500">
                    Chief Quit Officer
                  </div>
                  <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-all duration-500">
                    Professional Escape Artist
                  </div>
                </div>
              </a>
            </div>

            {/* Enhanced Tip Jar Links */}
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://coff.ee/lousuper81?redirect_url=https://shouldiquit.lousuper.com/thanks"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleDonationClick("buymeacoffee")}
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/25 h-14"
              >
                <img src="/buymeacoffee-logo.png" alt="Buy Me a Coffee" className="w-6 h-6 object-contain" />
                <span>Buy Me a Coffee</span>
              </a>

              <a
                href="https://paypal.me/lousuper81?return=https://shouldiquit.lousuper.com/thanks"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleDonationClick("paypal")}
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 h-14"
              >
                <img src="/paypal-logo.png" alt="PayPal" className="w-6 h-6 object-contain" />
                <span>PayPal</span>
              </a>

              <button
                onClick={handleMoonshotClick}
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 h-14"
                title="Click to copy Moonshot address"
              >
                <img src="/moonshot-logo.png" alt="Moonshot" className="w-6 h-6 object-contain" />
                <span>Moonshot</span>
              </button>

              <button
                onClick={handleBitcoinClick}
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-gray-500/25 h-14"
                title="Click to copy BTC address"
              >
                <img src="/bitcoin-logo.png" alt="Bitcoin" className="w-6 h-6 object-contain" />
                <span>Bitcoin</span>
              </button>
            </div>

            {/* Enhanced Separator and Footer Info */}
            <div className="pt-8 border-t border-gray-700">
              <div className="flex flex-col items-center space-y-4">
                <p className="text-gray-500 text-sm text-center max-w-2xl">
                  © {new Date().getFullYear()} Should I Quit. Crafted by{" "}
                  <a
                    href="https://lousuper.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-400 hover:text-pink-300 transition-colors font-medium"
                  >
                    lousuper.com
                  </a>
                  . Made with 💜 for burned-out professionals everywhere.
                </p>
                <p className="text-gray-600 text-xs">
                  Built using{" "}
                  <a
                    href="https://v0.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    v0.dev
                  </a>{" "}
                  powered by{" "}
                  <a
                    href="https://vercel.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Vercel
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

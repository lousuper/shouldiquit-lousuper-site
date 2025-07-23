"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Copy, Twitter, Instagram, Facebook } from "lucide-react"

interface QuizResults {
  score: number
  archetype: string
  answers: Record<number, number>
  totalQuestions: number
}

const archetypeData = {
  "The Walking Dead": {
    emoji: "🧟‍♂️",
    description:
      "You're basically a zombie at this point. Your soul has left the building, but your body keeps showing up to meetings.",
    advice: "Time for some serious life changes. Consider therapy, a career pivot, or at minimum a very long vacation.",
    color: "from-red-500 to-orange-500",
    energyWaste: 95,
    personality: "You dream of escape but feel trapped in corporate purgatory. You're done with the nonsense.",
  },
  "The Overwhelmed Optimist": {
    emoji: "😵‍💫",
    description:
      "You're drowning but still trying to smile. You keep thinking it'll get better, but deep down you know something's gotta give.",
    advice:
      "Set boundaries, learn to say no, and maybe start updating that resume. Your optimism is admirable but don't let it blind you.",
    color: "from-orange-500 to-yellow-500",
    energyWaste: 75,
    personality:
      "You dream big, tolerate little, and crave freedom. You're done with bureaucracy — you want meaning and momentum.",
  },
  "The Cautious Survivor": {
    emoji: "🤔",
    description:
      "You're in the danger zone but still functional. Some days are good, others make you question your life choices.",
    advice:
      "Pay attention to the warning signs. This is the perfect time to make strategic changes before things get worse.",
    color: "from-yellow-500 to-green-500",
    energyWaste: 50,
    personality:
      "You're strategic and thoughtful, but tired of playing it safe in a system that doesn't reward loyalty.",
  },
  "The Balanced Professional": {
    emoji: "😌",
    description: "You've got your stuff together! Sure, work has its moments, but you're managing pretty well overall.",
    advice: "Keep doing what you're doing. Maybe share your secrets with the rest of us mere mortals?",
    color: "from-green-500 to-blue-500",
    energyWaste: 25,
    personality:
      "You've found the sweet spot between ambition and sanity. You're the unicorn everyone wishes they could be.",
  },
  "The Unicorn": {
    emoji: "🦄",
    description: "You actually love your job? In this economy? Teach us your ways, oh mystical one.",
    advice:
      "Bottle whatever you've got and sell it. The world needs more people like you (or you're in denial, but we'll go with the first option).",
    color: "from-blue-500 to-purple-500",
    energyWaste: 5,
    personality: "You're living the dream and probably making everyone else jealous. Share your secrets!",
  },
}

const resignationLetterTemplates = {
  "corporate-polite": {
    name: "Corporate Polite",
    template: `Dear [Manager's Name],

Please accept this letter as my formal notice of resignation from my position. My last day will be [Date].

I appreciate the opportunities for growth during my time here and am committed to ensuring a smooth transition.

Thank you for your understanding.

Sincerely,
[Your Name]`,
  },
  "spicy-petty": {
    name: "Spicy & Petty",
    template: `Effective immediately, I'm resigning from pretending this job isn't soul-sucking. 

Thank you for the memories. I won't miss Slack.

Peace out,
[Your Name]

P.S. - Check Glassdoor for my honest review 👀`,
  },
  "mystical-vague": {
    name: "Mystical & Vague",
    template: `Dear [Manager's Name],

Like a butterfly emerging from its corporate cocoon, I must spread my wings and soar toward new horizons. 🦋

The universe has whispered my name, and I must answer its call. My final day of earthly employment shall be [Date].

May our paths cross again in the cosmic tapestry of professional destiny.

Namaste,
[Your Name] ✨`,
  },
  "meme-ified": {
    name: "Meme-ified",
    template: `yo [Manager's Name],

this job? it ain't it chief 💀

i'm out like:
- my motivation (gone)
- my patience (expired)
- my will to live through another meeting that could've been an email

last day: [Date]

it's been real, it's been fun, but it hasn't been real fun

catch me on LinkedIn posting inspirational quotes about "new beginnings" 

later skater,
[Your Name]

*mic drop* 🎤⬇️`,
  },
}

export default function ResultsPage() {
  const [results, setResults] = useState<QuizResults | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTone, setSelectedTone] = useState("corporate-polite")
  const [copiedLetter, setCopiedLetter] = useState(false)
  const [selectOpen, setSelectOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const storedResults = localStorage.getItem("quizResults")
    if (storedResults) {
      setResults(JSON.parse(storedResults))
    } else {
      // Create demo results if none exist
      setResults({
        score: 81,
        archetype: "The Overwhelmed Optimist",
        answers: {},
        totalQuestions: 10,
      })
    }
    setIsLoading(false)
  }, [router])

  const shareToTwitter = () => {
    const text = `I just took the Burnout Reality Check and I'm ${results?.score}% burned out! 🔥 #ShouldIQuit Find out yours:`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.origin)}`
    window.open(url, "_blank")
  }

  const shareToInstagram = () => {
    const text = `I just took the Burnout Reality Check and I'm ${results?.score}% burned out! 🔥 #ShouldIQuit Check it out: ${window.location.origin}`
    navigator.clipboard.writeText(text)
    alert("Caption copied to clipboard! Share on Instagram Stories or post.")
  }

  const shareToFacebook = () => {
    const text = `I just took the Burnout Reality Check and I'm ${results?.score}% burned out! 🔥 #ShouldIQuit`
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}&quote=${encodeURIComponent(text)}`
    window.open(url, "_blank")
  }

  const copyResignationLetter = () => {
    const template = resignationLetterTemplates[selectedTone as keyof typeof resignationLetterTemplates]
    navigator.clipboard.writeText(template.template)
    setCopiedLetter(true)
    setTimeout(() => setCopiedLetter(false), 2000)
  }

  const handleMoonshotClick = () => {
    navigator.clipboard.writeText("HF9CgXJj1g7p7FJoLhpmBUSPeHiFppapMRnnLuenmoon")
    // Show a brief success message or could trigger the same thank you popup
    alert("Moonshot address copied to clipboard!")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (!results) {
    return null
  }

  const archetype = archetypeData[results.archetype as keyof typeof archetypeData]
  const selectedTemplate = resignationLetterTemplates[selectedTone as keyof typeof resignationLetterTemplates]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 flex flex-col items-center justify-center p-8 max-w-2xl mx-auto space-y-6 text-center min-h-screen">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Here's Your Burnout Report
          </h1>
          <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2">
            🏆 Certified Burnout Survivor
          </Badge>
        </motion.div>

        {/* Burnout Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full"
        >
          <Card className="bg-gray-800/50 backdrop-blur-md border-gray-700">
            <CardContent className="p-6">
              <p className="font-semibold mb-4 text-pink-400 text-xl">🔥 Burnout Score</p>
              <div className="space-y-4">
                <div className="text-6xl font-bold text-white">{results.score}%</div>
                <Progress value={results.score} className="h-4" />
                <p className="text-gray-300">
                  You are <strong className="text-pink-400">{results.score}%</strong> burned out.
                  {results.score >= 80 && " 🚨 Critical level!"}
                  {results.score >= 60 && results.score < 80 && " ⚠️ High risk zone."}
                  {results.score >= 40 && results.score < 60 && " 🟡 Moderate concern."}
                  {results.score < 40 && " 🟢 You're doing okay!"}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Wasted Energy Meter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full"
        >
          <Card className="bg-gray-800/50 backdrop-blur-md border-gray-700">
            <CardContent className="p-6">
              <p className="font-semibold mb-4 text-purple-400 text-xl">⚡ Wasted Energy</p>
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#374151"
                    strokeWidth="3"
                  />
                  <motion.path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="url(#energyGradient)"
                    strokeWidth="3"
                    strokeDasharray={`${archetype.energyWaste}, 100`}
                    initial={{ strokeDasharray: "0, 100" }}
                    animate={{ strokeDasharray: `${archetype.energyWaste}, 100` }}
                    transition={{ delay: 0.8, duration: 1.5 }}
                  />
                  <defs>
                    <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="50%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">{archetype.energyWaste}%</span>
                </div>
              </div>
              <p className="text-gray-300">
                You're wasting <strong className="text-purple-400">{archetype.energyWaste}%</strong> of your creative
                power on nonsense.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Resignation Letter Generator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full"
        >
          <Card className="bg-gray-800/50 backdrop-blur-md border-gray-700">
            <CardContent className="p-6">
              <p className="font-semibold mb-4 text-cyan-400 text-xl">✍️ AI-Generated Resignation Letter</p>
              <div className="space-y-4">
                <Select
                  value={selectedTone}
                  onValueChange={setSelectedTone}
                  open={selectOpen}
                  onOpenChange={setSelectOpen}
                >
                  <SelectTrigger
                    className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600 focus:ring-2 focus:ring-purple-500"
                    onClick={() => setSelectOpen(!selectOpen)}
                  >
                    <SelectValue placeholder="Choose resignation style..." />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600" style={{ zIndex: 9999 }}>
                    {Object.entries(resignationLetterTemplates).map(([key, template]) => (
                      <SelectItem
                        key={key}
                        value={key}
                        className="text-white hover:bg-gray-700 focus:bg-gray-700 cursor-pointer"
                      >
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="relative">
                  <textarea
                    className="w-full h-40 p-4 rounded-lg bg-gray-900/50 border border-gray-600 text-gray-300 text-sm leading-relaxed resize-none"
                    value={selectedTemplate.template}
                    readOnly
                  />
                  <Button
                    onClick={copyResignationLetter}
                    size="sm"
                    className="absolute top-2 right-2 bg-purple-600 hover:bg-purple-700"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    {copiedLetter ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Archetype Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="w-full"
        >
          <Card className="bg-gray-800/50 backdrop-blur-md border-gray-700">
            <CardContent className="p-6 text-center">
              <div className="text-6xl mb-4">{archetype.emoji}</div>
              <h3
                className={`text-2xl font-bold mb-4 bg-gradient-to-r ${archetype.color} bg-clip-text text-transparent`}
              >
                🧠 Archetype: {results.archetype}
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">{archetype.personality}</p>
              <div className="bg-gray-700/30 rounded-lg p-4">
                <p className="text-gray-300">{archetype.description}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Social Share */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0 }}
          className="w-full"
        >
          <Card className="bg-gray-800/50 backdrop-blur-md border-gray-700">
            <CardContent className="p-6">
              <div className="space-y-4">
                <p className="font-semibold text-green-400 text-xl">📣 Help Someone Else Escape</p>
                <p className="text-gray-300">Post your burnout score and letter with #ShouldIQuit</p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button
                    onClick={shareToTwitter}
                    className="bg-blue-500 hover:bg-blue-600 flex items-center gap-2 px-4 py-2 h-10 transition-all duration-300 hover:scale-105"
                  >
                    <Twitter className="w-4 h-4" />
                    Share to X
                  </Button>
                  <Button
                    onClick={shareToInstagram}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 flex items-center gap-2 px-4 py-2 h-10 transition-all duration-300 hover:scale-105"
                  >
                    <Instagram className="w-4 h-4" />
                    Share to IG
                  </Button>
                  <Button
                    onClick={shareToFacebook}
                    className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 px-4 py-2 h-10 transition-all duration-300 hover:scale-105"
                  >
                    <Facebook className="w-4 h-4" />
                    Share on Facebook
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Donation CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="w-full"
        >
          <Card className="bg-gray-800/50 backdrop-blur-md border-gray-700">
            <CardContent className="p-6 text-center">
              <p className="text-gray-400 mb-4">This site is free and always will be. Love it?</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://coff.ee/lousuper81?redirect_url=https://shouldiquit.lousuper.com/thanks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  <img src="/buymeacoffee-logo.png" alt="Buy Me a Coffee" className="w-6 h-6 object-contain" />
                  Buy me a coffee
                </a>
                <a
                  href="https://paypal.me/lousuper81?return=https://shouldiquit.lousuper.com/thanks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  <img src="/paypal-logo.png" alt="PayPal" className="w-6 h-6 object-contain" />
                  PayPal
                </a>
                <button
                  onClick={handleMoonshotClick}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                  title="Click to copy Moonshot address"
                >
                  <img src="/moonshot-logo.png" alt="Moonshot" className="w-6 h-6 object-contain" />
                  Moonshot
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="flex gap-4"
        >
          <Button
            onClick={() => router.push("/quiz")}
            variant="outline"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 border-cyan-500/30 text-white hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
          >
            🔄 Retake Quiz
          </Button>
          <Button
            onClick={() => router.push("/")}
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
          >
            🏠 Back to Home
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

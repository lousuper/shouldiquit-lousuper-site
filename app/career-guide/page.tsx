"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { useRouter } from "next/navigation"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Download, Share2, Briefcase, Quote, Sparkles, ArrowRight } from "lucide-react"

interface QuizResults {
  score: number
  archetype: string
  answers: Record<number, number>
  totalQuestions: number
}

const archetypeJobSuggestions = {
  "The Walking Dead": {
    suggestions: [
      { title: "Remote Content Writer", company: "Buffer", type: "Remote", match: "95%" },
      { title: "UX Researcher", company: "Figma", type: "Hybrid", match: "88%" },
      { title: "Product Manager", company: "Notion", type: "Remote", match: "92%" },
      { title: "Customer Success Manager", company: "Slack", type: "Remote", match: "85%" },
    ],
    focus: "Low-stress, remote-friendly roles with better work-life balance",
  },
  "The Overwhelmed Optimist": {
    suggestions: [
      { title: "Marketing Coordinator", company: "HubSpot", type: "Hybrid", match: "90%" },
      { title: "Project Manager", company: "Asana", type: "Remote", match: "87%" },
      { title: "Business Analyst", company: "Zoom", type: "Remote", match: "85%" },
      { title: "Sales Development Rep", company: "Salesforce", type: "Hybrid", match: "82%" },
    ],
    focus: "Structured roles with clear boundaries and supportive teams",
  },
  "The Cautious Survivor": {
    suggestions: [
      { title: "Senior Developer", company: "GitHub", type: "Remote", match: "93%" },
      { title: "Data Analyst", company: "Spotify", type: "Hybrid", match: "89%" },
      { title: "Technical Writer", company: "Stripe", type: "Remote", match: "86%" },
      { title: "Operations Manager", company: "Shopify", type: "Remote", match: "84%" },
    ],
    focus: "Growth opportunities with companies known for employee satisfaction",
  },
  "The Balanced Professional": {
    suggestions: [
      { title: "Senior Product Designer", company: "Airbnb", type: "Hybrid", match: "94%" },
      { title: "Engineering Manager", company: "Netflix", type: "Remote", match: "91%" },
      { title: "Strategy Consultant", company: "McKinsey", type: "Travel", match: "88%" },
      { title: "VP of Marketing", company: "Canva", type: "Hybrid", match: "86%" },
    ],
    focus: "Leadership roles and strategic positions at top-tier companies",
  },
  "The Unicorn": {
    suggestions: [
      { title: "Chief Technology Officer", company: "OpenAI", type: "Hybrid", match: "96%" },
      { title: "Founder & CEO", company: "Your Startup", type: "Flexible", match: "100%" },
      { title: "Principal Engineer", company: "Google", type: "Hybrid", match: "93%" },
      { title: "Head of Innovation", company: "Tesla", type: "On-site", match: "90%" },
    ],
    focus: "Executive and entrepreneurial opportunities where you can make impact",
  },
}

const mentorQuotes = {
  "The Walking Dead": [
    "Your burnout isn't a character flaw—it's data. It's telling you that your current situation is unsustainable, and that's valuable information.",
    "Sometimes the bravest thing you can do is admit that what you're doing isn't working and choose a different path.",
    "Recovery from burnout isn't just about rest—it's about fundamentally changing how you approach work and life.",
  ],
  "The Overwhelmed Optimist": [
    "Your optimism is a superpower, but don't let it blind you to red flags. Trust your instincts when something feels off.",
    "Setting boundaries isn't selfish—it's essential. You can't pour from an empty cup.",
    "It's okay to lower your expectations of toxic situations while raising your standards for what you'll accept.",
  ],
  "The Cautious Survivor": [
    "You're in the perfect position to make strategic moves. Use this awareness to your advantage.",
    "Trust the process of gradual change. Small, consistent steps often lead to the biggest transformations.",
    "Your caution is wisdom. Take calculated risks, but don't ignore the warning signs you're already seeing.",
  ],
  "The Balanced Professional": [
    "You've found something that works—now think about how to scale it or share it with others.",
    "Balance isn't a destination, it's a practice. Keep refining what works for you.",
    "Consider how you can use your stability to take on new challenges or help others find their balance.",
  ],
  "The Unicorn": [
    "Your satisfaction at work is rare and valuable. Consider how you can help create better work environments for others.",
    "With great job satisfaction comes great responsibility—use your position to advocate for positive change.",
    "You're proof that fulfilling work exists. Don't take it for granted, and help others find their path to it.",
  ],
}

const jobBoards = [
  {
    name: "AngelList",
    description: "Startup jobs with equity",
    url: "https://angel.co",
    category: "Startups",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Remote.co",
    description: "100% remote opportunities",
    url: "https://remote.co",
    category: "Remote",
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "FlexJobs",
    description: "Flexible & part-time roles",
    url: "https://flexjobs.com",
    category: "Flexible",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Wellfound",
    description: "Tech startup careers",
    url: "https://wellfound.com",
    category: "Tech",
    color: "from-orange-500 to-red-500",
  },
  {
    name: "We Work Remotely",
    description: "Remote-first companies",
    url: "https://weworkremotely.com",
    category: "Remote",
    color: "from-indigo-500 to-purple-500",
  },
  {
    name: "NoDesk",
    description: "Remote work community",
    url: "https://nodesk.co",
    category: "Community",
    color: "from-teal-500 to-blue-500",
  },
]

const resumeTemplate = `OPTIMIZED RESUME FRAMEWORK

🎯 PROFESSIONAL SUMMARY
• Results-driven professional with [X] years of experience
• Proven track record of [specific achievement]
• Expertise in [relevant skills] with focus on [industry/role]
• Seeking opportunities that prioritize [work-life balance/growth/impact]

💼 CORE COMPETENCIES
• Strategic Planning & Execution
• Cross-functional Team Leadership  
• Data-Driven Decision Making
• Process Optimization & Automation
• Stakeholder Communication

📈 KEY ACHIEVEMENTS
• Increased [metric] by [%] through [specific action]
• Led team of [#] to deliver [project] [timeframe]
• Implemented [system/process] resulting in [outcome]
• Recognized for [award/achievement] in [year]

🛠️ TECHNICAL SKILLS
• [Relevant software/tools]
• [Programming languages if applicable]
• [Certifications]
• [Industry-specific skills]

RESUME OPTIMIZATION TIPS:
✅ Use action verbs (Led, Implemented, Optimized)
✅ Quantify achievements with numbers
✅ Tailor keywords to job descriptions
✅ Keep it to 1-2 pages maximum
✅ Use clean, ATS-friendly formatting`

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}

export default function CareerGuidePage() {
  const [results, setResults] = useState<QuizResults | null>(null)
  const [currentQuote, setCurrentQuote] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const storedResults = localStorage.getItem("quizResults")
    if (storedResults) {
      setResults(JSON.parse(storedResults))
    } else {
      // Create default results for demo
      setResults({
        score: 65,
        archetype: "The Overwhelmed Optimist",
        answers: {},
        totalQuestions: 10,
      })
    }
  }, [])

  useEffect(() => {
    if (results) {
      const quotes = mentorQuotes[results.archetype as keyof typeof mentorQuotes]
      const interval = setInterval(() => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [results])

  const shareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: "Career Guidance from Should I Quit",
        text: "Check out this personalized career guide!",
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const downloadGuide = () => {
    alert("Career guide downloaded! (This would be a real PDF in production)")
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  const archetype = results.archetype as keyof typeof archetypeJobSuggestions
  const jobSuggestions = archetypeJobSuggestions[archetype]
  const quotes = mentorQuotes[archetype]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 text-white">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px]"></div>

      <div className="relative z-10">
        {/* Header */}
        <AnimatedSection>
          <div className="container mx-auto px-4 py-16 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30 mb-6 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Personalized Career Guide
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-6">
                Your Career Roadmap
              </h1>
              <p className="text-xl text-purple-200 max-w-2xl mx-auto leading-relaxed">
                Based on your "{results.archetype}" profile, here's your personalized action plan for career success.
              </p>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* AI Resume Rebuilder */}
        <AnimatedSection delay={0.2}>
          <div className="container mx-auto px-4 py-16">
            <Card className="bg-purple-900/20 backdrop-blur-md border-purple-500/20 max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-300 flex items-center gap-3">
                  <Briefcase className="w-6 h-6" />
                  AI Resume Rebuilder
                </CardTitle>
                <p className="text-purple-200">Optimized template based on your archetype</p>
              </CardHeader>
              <CardContent>
                <div className="bg-purple-950/30 rounded-lg p-6 border border-purple-500/10">
                  <pre className="text-sm text-purple-100 whitespace-pre-wrap leading-relaxed font-mono">
                    {resumeTemplate}
                  </pre>
                </div>
                <div className="flex gap-4 mt-6">
                  <Button className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Template
                  </Button>
                  <Button
                    variant="outline"
                    className="border-purple-500/30 text-purple-300 hover:bg-purple-800/20 bg-transparent"
                  >
                    Customize Further
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </AnimatedSection>

        {/* Job Suggestions */}
        <AnimatedSection delay={0.4}>
          <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-300 mb-4">Perfect Role Matches</h2>
              <p className="text-purple-200 text-lg">{jobSuggestions.focus}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {jobSuggestions.suggestions.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-purple-900/20 backdrop-blur-md border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-1">{job.title}</h3>
                          <p className="text-purple-300">{job.company}</p>
                        </div>
                        <Badge className="bg-green-600/20 text-green-300 border-green-500/30">{job.match}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className="border-purple-500/30 text-purple-300">
                          {job.type}
                        </Badge>
                        <Button
                          size="sm"
                          className="bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white group-hover:translate-x-1 transition-all"
                        >
                          Apply <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Mentor Quotes */}
        <AnimatedSection delay={0.6}>
          <div className="container mx-auto px-4 py-16">
            <Card className="bg-purple-900/20 backdrop-blur-md border-purple-500/20 max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-300 flex items-center gap-3 text-center">
                  <Quote className="w-6 h-6" />
                  What Would a Mentor Say?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <motion.div
                  key={currentQuote}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="min-h-[120px] flex items-center justify-center"
                >
                  <blockquote className="text-lg md:text-xl text-purple-100 italic leading-relaxed">
                    "{quotes[currentQuote]}"
                  </blockquote>
                </motion.div>
                <div className="flex justify-center gap-2 mt-6">
                  {quotes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuote(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentQuote ? "bg-purple-400 w-8" : "bg-purple-600"
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </AnimatedSection>

        {/* Job Boards */}
        <AnimatedSection delay={0.8}>
          <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-300 mb-4">Niche Job Boards</h2>
              <p className="text-purple-200 text-lg">Curated platforms for your next opportunity</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {jobBoards.map((board, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-purple-900/20 backdrop-blur-md border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex-1">
                        <div
                          className={`w-12 h-12 rounded-lg bg-gradient-to-r ${board.color} mb-4 flex items-center justify-center`}
                        >
                          <ExternalLink className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">{board.name}</h3>
                        <p className="text-purple-300 mb-4">{board.description}</p>
                        <Badge variant="outline" className="border-purple-500/30 text-purple-300 mb-4">
                          {board.category}
                        </Badge>
                      </div>
                      <a
                        href={board.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white px-4 py-2 rounded-lg transition-all group-hover:translate-y-[-2px]"
                      >
                        Visit Site <ExternalLink className="w-4 h-4" />
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Share & Download */}
        <AnimatedSection delay={1.0}>
          <div className="container mx-auto px-4 py-16">
            <Card className="bg-purple-900/20 backdrop-blur-md border-purple-500/20 max-w-2xl mx-auto">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-purple-300 mb-6">Take Action Today</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={shareResults}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share Guide
                  </Button>
                  <Button
                    onClick={downloadGuide}
                    variant="outline"
                    className="flex-1 border-purple-500/30 text-purple-300 hover:bg-purple-800/20 flex items-center justify-center gap-2 bg-transparent"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </Button>
                </div>
                <p className="text-sm text-purple-400 mt-4">
                  Your personalized career roadmap, ready to guide your next steps.
                </p>
              </CardContent>
            </Card>
          </div>
        </AnimatedSection>

        {/* Footer Navigation */}
        <div className="container mx-auto px-4 py-8 text-center">
          <Button
            onClick={() => router.push("/results")}
            variant="outline"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-purple-500/30 text-white hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
          >
            ← Back to Results
          </Button>
        </div>
      </div>
    </div>
  )
}

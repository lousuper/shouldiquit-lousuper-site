"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"

interface Question {
  id: number
  type: "slider" | "multiple-choice"
  question: string
  subtitle?: string
  options?: { text: string; value: number; emoji: string }[]
  sliderConfig?: {
    min: number
    max: number
    step: number
    labels: { value: number; label: string }[]
  }
}

const questions: Question[] = [
  {
    id: 1,
    type: "slider",
    question: "How often do you check your work email after hours?",
    subtitle: "Be honest... we won't judge (much)",
    sliderConfig: {
      min: 0,
      max: 10,
      step: 1,
      labels: [
        { value: 0, label: "Never 😇" },
        { value: 5, label: "Sometimes 😅" },
        { value: 10, label: "Always 😵" },
      ],
    },
  },
  {
    id: 2,
    type: "multiple-choice",
    question: "Your boss sends you a 'quick question' at 9 PM. You:",
    options: [
      { text: "Respond immediately like a good little worker bee", value: 8, emoji: "🐝" },
      { text: "Read it, panic internally, respond in the morning", value: 5, emoji: "😰" },
      { text: "See it, leave it on read, sleep like a baby", value: 2, emoji: "😴" },
      { text: "What's a work phone? I have boundaries", value: 0, emoji: "🚫" },
    ],
  },
  {
    id: 3,
    type: "slider",
    question: "Rate your current motivation level",
    subtitle: "From 'I could move mountains' to 'I can barely move my mouse'",
    sliderConfig: {
      min: 0,
      max: 10,
      step: 1,
      labels: [
        { value: 0, label: "Dead inside 💀" },
        { value: 5, label: "Meh 😐" },
        { value: 10, label: "Energized ⚡" },
      ],
    },
  },
  {
    id: 4,
    type: "multiple-choice",
    question: "Sunday evening feels like:",
    options: [
      { text: "The calm before the storm of Monday", value: 6, emoji: "⛈️" },
      { text: "Existential dread mixed with wine", value: 8, emoji: "🍷" },
      { text: "Just another evening, no big deal", value: 2, emoji: "😌" },
      { text: "Time to prep for another awesome week!", value: 0, emoji: "🎉" },
    ],
  },
  {
    id: 5,
    type: "slider",
    question: "How many times do you fantasize about quitting per day?",
    subtitle: "Include daydreams, shower thoughts, and dramatic resignation speeches",
    sliderConfig: {
      min: 0,
      max: 20,
      step: 1,
      labels: [
        { value: 0, label: "Never 😊" },
        { value: 10, label: "A few times 🤔" },
        { value: 20, label: "Constantly 🏃‍♂️" },
      ],
    },
  },
  {
    id: 6,
    type: "multiple-choice",
    question: "Your ideal vacation would be:",
    options: [
      { text: "Somewhere with no WiFi or cell service", value: 7, emoji: "🏝️" },
      { text: "A spa where I can sleep for 72 hours straight", value: 8, emoji: "💆‍♀️" },
      { text: "Adventure travel to feel alive again", value: 4, emoji: "🏔️" },
      { text: "Honestly, just a long weekend sounds amazing", value: 2, emoji: "🛋️" },
    ],
  },
  {
    id: 7,
    type: "slider",
    question: "Rate your work-life balance",
    subtitle: "Where 0 = 'What's life?' and 10 = 'Perfect harmony'",
    sliderConfig: {
      min: 0,
      max: 10,
      step: 1,
      labels: [
        { value: 0, label: "What balance? 🤡" },
        { value: 5, label: "Trying 🤹‍♀️" },
        { value: 10, label: "Zen master 🧘‍♂️" },
      ],
    },
  },
  {
    id: 8,
    type: "multiple-choice",
    question: "When someone asks 'How's work?', you:",
    options: [
      { text: "Launch into a 20-minute rant", value: 9, emoji: "😤" },
      { text: "Give a diplomatic 'It's fine' while dying inside", value: 6, emoji: "🙃" },
      { text: "Change the subject immediately", value: 7, emoji: "😅" },
      { text: "Actually have positive things to say", value: 1, emoji: "😊" },
    ],
  },
  {
    id: 9,
    type: "slider",
    question: "How often do you feel physically exhausted from work stress?",
    subtitle: "Think headaches, muscle tension, that weird eye twitch...",
    sliderConfig: {
      min: 0,
      max: 10,
      step: 1,
      labels: [
        { value: 0, label: "Never 💪" },
        { value: 5, label: "Sometimes 😓" },
        { value: 10, label: "Always 🤕" },
      ],
    },
  },
  {
    id: 10,
    type: "multiple-choice",
    question: "If you won the lottery tomorrow, you would:",
    options: [
      { text: "Quit immediately and never look back", value: 8, emoji: "🏃‍♂️" },
      { text: "Give two weeks notice (because you're nice)", value: 6, emoji: "😇" },
      { text: "Take a sabbatical but probably come back", value: 3, emoji: "🤔" },
      { text: "Keep working because you actually love your job", value: 0, emoji: "❤️" },
    ],
  },
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isAnimating, setIsAnimating] = useState(false)
  const router = useRouter()

  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleSliderChange = (questionId: number, value: number[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value[0] }))
  }

  const handleMultipleChoice = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1)
        setIsAnimating(false)
      }, 300)
    } else {
      // Calculate results and redirect
      calculateResults()
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentQuestion((prev) => prev - 1)
        setIsAnimating(false)
      }, 300)
    }
  }

  const calculateResults = () => {
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0)
    const maxPossibleScore = questions.reduce((sum, q) => {
      if (q.type === "slider") {
        return sum + (q.sliderConfig?.max || 10)
      } else {
        return sum + Math.max(...(q.options?.map((o) => o.value) || [0]))
      }
    }, 0)

    const burnoutPercentage = Math.round((totalScore / maxPossibleScore) * 100)

    // Determine archetype based on score
    let archetype = ""
    if (burnoutPercentage >= 80) {
      archetype = "The Walking Dead"
    } else if (burnoutPercentage >= 60) {
      archetype = "The Overwhelmed Optimist"
    } else if (burnoutPercentage >= 40) {
      archetype = "The Cautious Survivor"
    } else if (burnoutPercentage >= 20) {
      archetype = "The Balanced Professional"
    } else {
      archetype = "The Unicorn"
    }

    // Store results and redirect
    const results = {
      score: burnoutPercentage,
      archetype,
      answers,
      totalQuestions: questions.length,
    }

    localStorage.setItem("quizResults", JSON.stringify(results))
    router.push("/results")
  }

  const currentQ = questions[currentQuestion]
  const hasAnswer = answers[currentQ.id] !== undefined

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
            The Burnout Reality Check
          </h1>
          <p className="text-gray-400 text-lg">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mb-8">
          <Progress value={progress} className="h-3 bg-gray-800" />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>Just started</span>
            <span>Almost there!</span>
          </div>
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-gray-800/50 backdrop-blur-md border-gray-700">
              <CardContent className="p-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{currentQ.question}</h2>
                  {currentQ.subtitle && <p className="text-gray-400 text-lg mb-8">{currentQ.subtitle}</p>}

                  {/* Slider Question */}
                  {currentQ.type === "slider" && currentQ.sliderConfig && (
                    <div className="space-y-8">
                      <div className="px-4">
                        <Slider
                          value={[answers[currentQ.id] || currentQ.sliderConfig.min]}
                          onValueChange={(value) => handleSliderChange(currentQ.id, value)}
                          max={currentQ.sliderConfig.max}
                          min={currentQ.sliderConfig.min}
                          step={currentQ.sliderConfig.step}
                          className="w-full"
                        />
                      </div>

                      <div className="flex justify-between text-sm">
                        {currentQ.sliderConfig.labels.map((label) => (
                          <div key={label.value} className="text-center">
                            <div className="text-gray-400">{label.value}</div>
                            <div className="text-gray-300 mt-1">{label.label}</div>
                          </div>
                        ))}
                      </div>

                      {hasAnswer && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-center p-4 bg-purple-900/30 rounded-lg"
                        >
                          <span className="text-2xl">Your answer: {answers[currentQ.id]}</span>
                        </motion.div>
                      )}
                    </div>
                  )}

                  {/* Multiple Choice Question */}
                  {currentQ.type === "multiple-choice" && currentQ.options && (
                    <div className="grid gap-4">
                      {currentQ.options.map((option, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => handleMultipleChoice(currentQ.id, option.value)}
                          className={`p-6 rounded-xl border-2 transition-all duration-300 text-left hover:scale-105 ${
                            answers[currentQ.id] === option.value
                              ? "border-pink-500 bg-pink-500/20 shadow-lg shadow-pink-500/25"
                              : "border-gray-600 bg-gray-700/30 hover:border-purple-500"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <span className="text-3xl">{option.emoji}</span>
                            <span className="text-lg font-medium">{option.text}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  )}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-between items-center mt-8 max-w-4xl mx-auto"
        >
          <Button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            variant="outline"
            className="bg-gradient-to-r from-gray-700 to-gray-800 border-gray-600 hover:from-gray-600 hover:to-gray-700 text-white hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-500/25"
          >
            ← Previous
          </Button>

          <div className="flex gap-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentQuestion
                    ? "bg-pink-500 scale-125"
                    : index < currentQuestion
                      ? "bg-purple-500"
                      : "bg-gray-600"
                }`}
              />
            ))}
          </div>

          <Button
            onClick={nextQuestion}
            disabled={!hasAnswer}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/25"
          >
            {currentQuestion === questions.length - 1 ? "Get Results 🎯" : "Next →"}
          </Button>
        </motion.div>

        {/* Fun Encouragement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 text-gray-400"
        >
          {currentQuestion < 3 && "You're doing great! Keep going... 💪"}
          {currentQuestion >= 3 && currentQuestion < 7 && "Halfway there! The truth is coming... 🔍"}
          {currentQuestion >= 7 && currentQuestion < 9 && "Almost done! Prepare for some real talk... 🎭"}
          {currentQuestion === 9 && "Last question! Time for the moment of truth... 🎉"}
        </motion.div>
      </div>
    </div>
  )
}

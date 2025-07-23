"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ThanksPage() {
  const router = useRouter()

  const retakeQuiz = () => {
    localStorage.removeItem("quizResults")
    router.push("/quiz")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center p-8 max-w-xl mx-auto space-y-6 min-h-screen">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
            ❤️ Thank You!
          </h1>
        </motion.div>

        {/* Main Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p className="text-xl text-gray-300 leading-relaxed">
            You just helped fuel this free burnout simulator for everyone. Seriously, you're amazing.
          </p>
        </motion.div>

        {/* Viral CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="w-full"
        >
          <Card className="bg-gray-800/50 backdrop-blur-md border-gray-700">
            <CardContent className="p-6">
              <p className="font-semibold text-green-400 text-lg mb-3">Want to go viral?</p>
              <p className="text-gray-300 mb-3">
                Make a video about your burnout score and tag <strong className="text-pink-400">#ShouldIQuit</strong>
              </p>
              <p className="text-sm text-gray-500">Your voice helps others quit quietly (or loudly).</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="space-y-4 w-full"
        >
          <Button
            onClick={retakeQuiz}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
          >
            🔁 Take the Quiz Again
          </Button>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => router.push("/")}
              variant="outline"
              className="flex-1 bg-gradient-to-r from-gray-700 to-gray-800 border-gray-600 hover:from-gray-600 hover:to-gray-700 text-white hover:text-white transition-all duration-300 hover:scale-105"
            >
              🏠 Back to Home
            </Button>
            <Button
              onClick={() => router.push("/results")}
              variant="outline"
              className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-700 border-cyan-500/30 text-white hover:text-white transition-all duration-300 hover:scale-105"
            >
              📊 View Results
            </Button>
          </div>
        </motion.div>

        {/* Additional Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-center pt-8"
        >
          <p className="text-gray-500 text-sm">Your support keeps this tool free for everyone who needs it. 💜</p>
        </motion.div>
      </div>
    </div>
  )
}

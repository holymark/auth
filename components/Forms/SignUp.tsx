"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { signIn } from "next-auth/react"

interface SignUpProps {
  onViewChange: (view: "signup" | "signupform" | "signin") => void
}

export default function SignUp({ onViewChange }: SignUpProps) {
  async function handleGoogleSignUp() {
    await signIn("google", { callbackUrl: "/profile" })
  }

  return (
    <motion.div
      className="w-full max-w-md px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-2xl font-bold text-center mb-8">Sign up to Auth-8</h1>

      <Button
        variant="outline"
        className="w-full h-12 mb-6 border border-gray-300 rounded-full flex items-center justify-center gap-2 transition-all duration-200 hover:bg-gray-50"
        onClick={handleGoogleSignUp}
      >
        <svg viewBox="0 0 24 24" width="18" height="18">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Sign up with Google
      </Button>

      <div className="relative flex items-center justify-center mb-6">
        <div className="border-t border-gray-300 absolute w-full"></div>
        <span className="bg-white px-2 relative text-sm text-gray-500">or</span>
      </div>

      <Button
        variant="outline"
        className="w-full h-12 mb-6 border border-gray-300 rounded-full transition-all duration-200 hover:bg-gray-50"
        onClick={() => onViewChange("signupform")}
      >
        Continue with email
      </Button>

      <div className="text-xs text-center text-gray-500 mb-6">
        By creating an account you agree with our{" "}
        <Link href="#" className="text-gray-700 hover:underline transition-colors duration-200">
          Terms of Service
        </Link>
        ,{" "}
        <Link href="#" className="text-gray-700 hover:underline transition-colors duration-200">
          Privacy Policy
        </Link>
        , and our default{" "}
        <Link href="#" className="text-gray-700 hover:underline transition-colors duration-200">
          Notification Settings
        </Link>
      </div>

      <div className="text-sm text-center">
        Already have an account?{" "}
        <button
          className="text-gray-700 font-medium hover:underline transition-colors duration-200"
          onClick={() => onViewChange("signin")}
        >
          Sign In
        </button>
      </div>
    </motion.div>
  )
}

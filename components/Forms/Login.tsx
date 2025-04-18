"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { motion } from "framer-motion"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

interface SignInProps {
  onViewChange: (view: "signup" | "signupform" | "signin") => void
}

export default function SignIn({ onViewChange }: SignInProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setFormError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setFormError("Invalid email or password")
      } else if (result?.ok) {
        // Redirect to profile page on successful login
        router.push("/profile")
      }
    } catch (error) {
      console.log(error)
      setFormError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleGoogleSignIn() {
    await signIn("google", { callbackUrl: "/" })
  }

  return (
    <motion.div
      className="w-full max-w-md px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-2xl font-bold text-center mb-8">Sign in to AUTH-8</h1>

      {formError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">{formError}</div>
      )}

      <Button
        variant="outline"
        className="w-full h-12 mb-6 border border-gray-300 rounded-full flex items-center justify-center gap-2 transition-all duration-200 hover:bg-gray-50"
        onClick={handleGoogleSignIn}
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
        Sign in with Google
      </Button>

      <div className="relative flex items-center justify-center mb-6">
        <div className="border-t border-gray-300 absolute w-full"></div>
        <span className="bg-white px-2 relative text-sm text-gray-500">or sign in with email</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Username or Email
          </label>
          <Input
            id="email"
            name="email"
            required
            className="h-12 rounded-md transition-all duration-200 focus:ring-2 focus:ring-black focus:ring-opacity-20"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Link href="#" className="text-sm text-gray-600 hover:underline transition-colors duration-200">
              Forgot?
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            required
            className="h-12 rounded-md transition-all duration-200 focus:ring-2 focus:ring-black focus:ring-opacity-20"
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 rounded-full bg-[#0D0E1A] hover:bg-[#1a1b2e] transition-colors duration-300"
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </Button>

        <div className="text-sm text-center">
          Don't have an account?{" "}
          <button
            type="button"
            className="text-gray-700 font-medium hover:underline transition-colors duration-200"
            onClick={() => onViewChange("signup")}
          >
            Sign up
          </button>
        </div>
      </form>
    </motion.div>
  )
}

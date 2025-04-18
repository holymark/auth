"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { motion } from "framer-motion"
import { registerUser } from "@/app/actions/auth"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

interface SignUpFormProps {
  onViewChange: (view: "signup" | "signupform" | "signin") => void
}

export default function SignUpForm({ onViewChange }: SignUpFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [formSuccess, setFormSuccess] = useState<string | null>(null)
  const [acceptTerms, setAcceptTerms] = useState(false)

  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    if (!acceptTerms) {
      setFormError("You must agree to the terms and conditions")
      return
    }

    setIsSubmitting(true)
    setFormError(null)
    setFormSuccess(null)

    try {
      const result = await registerUser(formData)

      if (result.success) {
        setFormSuccess(result.message)

        // Get the email and password from the form data
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        // Sign in the user automatically
        const signInResult = await signIn("credentials", {
          email,
          password,
          redirect: false,
        })

        if (signInResult?.ok) {
          // Redirect to profile page
          router.push("/profile")
        } else {
          // If auto sign-in fails, redirect to sign in page
          setTimeout(() => {
            onViewChange("signin")
          }, 2000)
        }
      } else {
        setFormError(result.message)
      }
    } catch (error) {
      console.log(error)
      setFormError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      className="w-full max-w-md px-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8 flex items-center">
        <button
          onClick={() => onViewChange("signup")}
          className="absolute left-4 md:left-8 top-4 md:static md:mr-4 hover:bg-gray-100 p-1 rounded-full transition-colors duration-200"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold text-center flex-1">Sign up to AUTH-8</h1>
      </div>

      {formError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">{formError}</div>
      )}

      {formSuccess && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-md text-sm">
          {formSuccess}
        </div>
      )}

      <form action={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              name="name"
              required
              className="h-12 rounded-md transition-all duration-200 focus:ring-2 focus:ring-black focus:ring-opacity-20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <Input
              id="username"
              name="username"
              required
              className="h-12 rounded-md transition-all duration-200 focus:ring-2 focus:ring-black focus:ring-opacity-20"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            className="h-12 rounded-md transition-all duration-200 focus:ring-2 focus:ring-black focus:ring-opacity-20"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="6+ characters"
            required
            minLength={6}
            className="h-12 rounded-md transition-all duration-200 focus:ring-2 focus:ring-black focus:ring-opacity-20"
          />
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="terms"
            checked={acceptTerms}
            onCheckedChange={(checked) => setAcceptTerms(checked === true)}
            className="mt-1 transition-all duration-200"
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            I agree with AUTH-8's{" "}
            <Link href="#" className="text-gray-700 hover:underline transition-colors duration-200">
              Terms of Service
            </Link>
            ,{" "}
            <Link href="#" className="text-gray-700 hover:underline transition-colors duration-200">
              Privacy Policy
            </Link>
            , and default{" "}
            <Link href="#" className="text-gray-700 hover:underline transition-colors duration-200">
              Notification Settings
            </Link>
          </label>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 rounded-full bg-[#0D0E1A] hover:bg-[#1a1b2e] transition-colors duration-300"
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </Button>

        <div className="text-sm text-center">
          Already have an account?{" "}
          <button
            type="button"
            className="text-gray-700 font-medium hover:underline transition-colors duration-200"
            onClick={() => onViewChange("signin")}
          >
            Sign In
          </button>
        </div>

        <div className="text-xs text-center text-gray-500">
          This site is protected by reCAPTCHA and the Google{" "}
          <Link href="#" className="text-gray-700 hover:underline transition-colors duration-200">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-gray-700 hover:underline transition-colors duration-200">
            Terms of Service
          </Link>{" "}
          apply.
        </div>
      </form>
    </motion.div>
  )
}

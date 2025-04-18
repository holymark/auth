"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { AnimatePresence } from "framer-motion"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import SignUp from "@/components/Forms/SignUp"
import SignUpForm from "@/components/Forms/SignUpForm"
import SignIn from "@/components/Forms/Login"

export default function Home() {
  const { data: session, status } = useSession()
  const [currentView, setCurrentView] = useState<"signup" | "signupform" | "signin">("signup")

  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/profile")
    }
  }, [status, router])

  const handleViewChange = (view: "signup" | "signupform" | "signin") => {
    setCurrentView(view)
  }

  // If user is already logged in, show a welcome screen instead of auth forms
  const renderAuthenticatedContent = () => (
    <div className="w-full max-w-md px-4 text-center">
      <h1 className="text-2xl font-bold mb-6">Welcome to AUTH-8</h1>
      <p className="mb-4">You are signed in as {session?.user?.name}</p>
      <Button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="rounded-full bg-[#0D0E1A] hover:bg-[#1a1b2e] transition-colors duration-300"
      >
        Sign Out
      </Button>
    </div>
  )

  return (
    <main className="flex flex-col md:flex-row min-h-screen">
      {/* Left sidebar - Wix Studio */}
      <div className="w-full md:w-[352px] bg-[#0D0E1A] flex flex-col">
        <div className="p-4 md:p-8 flex flex-col h-full">
          <div className="mb-8 md:mb-16">
            <div className="flex items-center mb-4 md:mb-8">
              <div className="w-8 md:w-10 h-8 md:h-10 bg-white flex items-center justify-center rounded-sm">
                <div className="w-4 md:w-5 h-4 md:h-5 bg-black rounded-sm"></div>
              </div>
              <span className="ml-2 text-white text-lg md:text-xl font-bold">AUTH-8</span>
            </div>

            <div className="text-white">
              <h2 className="text-2xl md:text-3xl font-bold leading-tight">The AUTH-8 authentication system.</h2>
              <div className="mt-4 flex items-center">
                <Link href="#" className="text-white hover:underline transition-colors duration-200">
                  Learn more
                </Link>
                <ArrowRight className="ml-1 w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Figma interface mockup - hidden on mobile */}
      <div className="hidden md:block w-[352px] bg-[#2A3036] relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-dashed border-gray-400 mb-16 relative">
            <div className="absolute inset-0 bg-[#2A3036] flex items-center justify-center">
              <div className="w-12 h-12 rounded-lg overflow-hidden">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="48" rx="8" fill="#0D0E1A" />
                  <circle cx="24" cy="16" r="4" fill="#FF7262" />
                  <circle cx="16" cy="24" r="4" fill="#1ABCFE" />
                  <circle cx="24" cy="32" r="4" fill="#0ACF83" />
                </svg>
              </div>
            </div>
          </div>

          <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-dashed border-gray-400 relative">
            <div className="absolute inset-0 bg-[#0D0E1A] flex items-center justify-center">
              <div className="w-10 h-10 bg-white flex items-center justify-center rounded-sm">
                <div className="w-5 h-5 bg-black rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 right-0">
          <div className="flex items-center h-10 bg-[#1E1E1E] px-2">
            <div className="w-6 h-6 bg-[#333] flex items-center justify-center rounded-sm mr-2">
              <div className="w-3 h-3 bg-white"></div>
            </div>
            <span className="text-white text-xs">Home</span>
            <span className="ml-1 text-white text-xs">+</span>
          </div>

          <div className="bg-[#333] p-4">
            <div className="text-[#333] text-5xl font-bold uppercase tracking-tight">NOM</div>
          </div>

          <div className="bg-[#444] h-40 flex items-center justify-center">
            <div className="w-32 h-20 bg-[#F9C55A] rounded-lg"></div>
          </div>
        </div>

        <div className="absolute top-12 left-0 bottom-0 w-10 bg-[#1E1E1E] flex flex-col items-center py-4 space-y-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <div key={item} className="w-6 h-6 flex items-center justify-center">
              <div className="w-4 h-4 bg-[#555] rounded-sm"></div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-6 bg-[#1E1E1E] flex items-center px-2">
          <span className="text-[#999] text-xs">AUTH</span>
          <span className="ml-1 text-[#F9C55A] text-xs">8</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center py-8 md:py-0">
        {status === "loading" ? (
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
          </div>
        ) : status === "authenticated" ? (
          renderAuthenticatedContent()
        ) : (
          <AnimatePresence mode="wait">
            {currentView === "signup" && <SignUp key="signup" onViewChange={handleViewChange} />}
            {currentView === "signupform" && <SignUpForm key="signupform" onViewChange={handleViewChange} />}
            {currentView === "signin" && <SignIn key="signin" onViewChange={handleViewChange} />}
          </AnimatePresence>
        )}
      </div>
    </main>
  )
}

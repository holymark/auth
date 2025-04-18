import { NextAuthConfig } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"

export const authOptions: NextAuthConfig = {
    providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // @ts-expect-error @todo: fix this
      async authorize(credentials: Record<"email" | "password", string | undefined>, request: Request) {
        console.log("authorize", { credentials, request })

        if (!credentials.email || !credentials.password) {
          return null
        }

        await dbConnect()

        const user = await User.findOne({
          $or: [{ email: credentials.email.toLowerCase() }, { username: credentials.email.toLowerCase() }],
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await compare(credentials.password, user.password)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          username: user.username,
          image: user.image,
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        if (token.sub) {
          session.user.id = token.sub
        }
        session.user.username = token.username as string
      }
      return session
    },
    async jwt({ token, user, account }) {
      console.log("jwt", { token, user, account })
      if (user) {
        token.sub = user.id
        token.username = user.username
      }
      return token
    },
    async signIn({ user, account, profile }) {
      console.log("signIn", { user, account, profile })

      if (account?.provider === "google") {
        try {
          await dbConnect()

          // Check if user already exists
          const existingUser = await User.findOne({ email: user.email })

          if (!existingUser) {
            // Create a new user with Google profile data
            const username = user.email?.split("@")[0] || `user_${Date.now()}`

            await User.create({
              name: user.name,
              email: user.email,
              username: username,
              image: user.image,
              emailVerified: new Date(),
            })
          }

          return true
        } catch (error) {
          console.error("Error during Google sign in:", error)
          return false
        }
      }

      return true
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl + "/profile"
    },
  },
  
  pages: {
    signIn: "/",
    error: "/",
    newUser: "/profile", // Redirect new users to profile page
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}


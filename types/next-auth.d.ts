import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id?: any
      username?: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    username?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username?: string
  }
}

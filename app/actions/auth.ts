"use server"

import { hash } from "bcryptjs"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"

export async function registerUser(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const username = formData.get("username") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!name || !username || !email || !password) {
      return { success: false, message: "All fields are required" }
    }

    if (password.length < 6) {
      return { success: false, message: "Password must be at least 6 characters" }
    }

    await dbConnect()

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }],
    })

    if (existingUser) {
      if (existingUser.email === email.toLowerCase()) {
        return { success: false, message: "Email already in use" }
      }
      if (existingUser.username === username.toLowerCase()) {
        return { success: false, message: "Username already taken" }
      }
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Create user
    await User.create({
      name,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
    })

    return { success: true, message: "Account created successfully" }
  } catch (error) {
    console.error("Registration error:", error)
    return { success: false, message: "An error occurred during registration" }
  }
}

"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import axios from "axios"

export default function VerifyEmail() {
  const [message, setMessage] = useState("Verifying your email...")
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token")
      if (!token) {
        setMessage("Invalid verification link")
        return
      }

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/verify-email?token=${token}`)
        setMessage(response.data.message)
        setTimeout(() => router.push("/"), 3000)
      } catch (error) {
        console.error("Verification error:", error.response?.data || error.message)
        setMessage(error.response?.data?.error || "Failed to verify email. Please try again.")
      }
    }

    verifyEmail()
  }, [router, searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Email Verification</h1>
        <p className="text-center">{message}</p>
      </div>
    </div>
  )
}


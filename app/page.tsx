"use client"

import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function Home() {
  const [isLogin, setIsLogin] = useState(true)
  const [isEmail, setIsEmail] = useState(true)
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setMessage("")
    try {
      if (isLogin) {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, { identifier, password })
        if (response.data.token) {
          localStorage.setItem("token", response.data.token)
          router.push("/dashboard")
        }
      } else {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/signup`,
          isEmail ? { email: identifier, password } : { phoneNumber: identifier, password },
        )
        setMessage(response.data.message)
        if (!isEmail && response.data.verificationToken) {
          router.push(`/verify-phone?token=${response.data.verificationToken}`)
        }
      }
    } catch (error) {
      console.error("Authentication error:", error.response?.data || error.message)
      setError(error.response?.data?.error || "Failed to authenticate. Please try again.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Sign Up"} to Hackerug06 Technologies
        </h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="inline-flex items-center">
                <input type="radio" className="form-radio" checked={isEmail} onChange={() => setIsEmail(true)} />
                <span className="ml-2">Email</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input type="radio" className="form-radio" checked={!isEmail} onChange={() => setIsEmail(false)} />
                <span className="ml-2">Phone</span>
              </label>
            </div>
          )}
          <div>
            <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">
              {isEmail ? "Email" : "Phone Number"}
            </label>
            <input
              type={isEmail ? "email" : "tel"}
              id="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin)
              setError("")
              setMessage("")
            }}
            className="text-sm text-blue-600 hover:underline"
          >
            {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  )
}

    

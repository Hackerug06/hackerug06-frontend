import type React from "react"

interface AnimatedButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: "button" | "submit" | "reset"
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded-md
                 hover:bg-blue-600 transition-all duration-300 ease-in-out
                 animate-in fade-in zoom-in"
    >
      {children}
    </button>
  )
}

export default AnimatedButton

  

"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface CartGlowContextType {
  showCartGlow: boolean
  triggerCartGlow: () => void
}

const CartGlowContext = createContext<CartGlowContextType | undefined>(undefined)

export function CartGlowProvider({ children }: { children: ReactNode }) {
  const [showCartGlow, setShowCartGlow] = useState(false)

  const triggerCartGlow = () => {
    setShowCartGlow(true)
    setTimeout(() => setShowCartGlow(false), 3000) // Glow for 3 seconds
  }

  return (
    <CartGlowContext.Provider value={{ showCartGlow, triggerCartGlow }}>
      {children}
    </CartGlowContext.Provider>
  )
}

export function useCartGlow() {
  const context = useContext(CartGlowContext)
  if (context === undefined) {
    // Return default values for server-side rendering
    return {
      showCartGlow: false,
      triggerCartGlow: () => {},
    }
  }
  return context
}

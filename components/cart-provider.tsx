"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/hooks/use-toast"

export type CartItem = {
  id: string
  name: string
  price: number
  image: string
  days: number
  category: string
  brand?: string
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateItemDays: (id: string, days: number) => void
  clearCart: () => void
  itemCount: number
  total: number
  getWhatsAppLink: () => string
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const { toast } = useToast()

  // Load cart from localStorage on client side
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        // Only load items that were explicitly added by the user
        const parsedCart = JSON.parse(savedCart)
        if (Array.isArray(parsedCart)) {
          setItems(parsedCart)
        }
      } catch (e) {
        console.error("Failed to parse cart from localStorage")
        // Clear invalid cart data
        localStorage.removeItem("cart")
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("cart", JSON.stringify(items))
    } else {
      localStorage.removeItem("cart")
    }
  }, [items])

  const addItem = (item: CartItem) => {
    setItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex((i) => i.id === item.id)

      if (existingItemIndex >= 0) {
        // Update existing item
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          days: item.days,
        }

        toast({
          title: "Item updated in cart",
          description: `${item.name} rental days updated to ${item.days}`,
        })

        return updatedItems
      } else {
        // Add new item
        toast({
          title: "Item added to cart",
          description: `${item.name} added to your cart`,
        })

        return [...prevItems, item]
      }
    })
  }

  const removeItem = (id: string) => {
    setItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === id)
      const newItems = prevItems.filter((item) => item.id !== id)

      if (itemToRemove) {
        toast({
          title: "Item removed from cart",
          description: `${itemToRemove.name} removed from your cart`,
        })
      }

      if (newItems.length === 0) {
        localStorage.removeItem("cart")
      }

      return newItems
    })
  }

  const updateItemDays = (id: string, days: number) => {
    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, days } : item)))
  }

  const clearCart = () => {
    setItems([])
    localStorage.removeItem("cart")
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    })
  }

  const itemCount = items.length

  const total = items.reduce((sum, item) => sum + item.price * item.days, 0)

  const getWhatsAppLink = () => {
    if (items.length === 0) return ""

    const phoneNumber = "919972122462" // Replace with your actual WhatsApp business number

    let message = "Hello, I would like to rent the following items:\n\n"

    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - ₹${item.price} x ${item.days} days = ₹${item.price * item.days}\n`
    })

    message += `\nTotal: ₹${total}`
    message += "\n\nPlease confirm availability and provide payment details."

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateItemDays,
        clearCart,
        itemCount,
        total,
        getWhatsAppLink,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

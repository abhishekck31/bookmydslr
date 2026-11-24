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

/** Shared rental window (ISO yyyy-mm-dd). Chosen on the product page, editable in the cart. */
export type RentalDates = { start: string; end: string }

type CartContextType = {
  items: CartItem[]
  dates: RentalDates | null
  setDates: (dates: RentalDates | null) => void
  setAllDays: (days: number) => void
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
  const [dates, setDatesState] = useState<RentalDates | null>(null)
  const { toast } = useToast()

  type ToastPayload = {
    title: string
    description: string
  }

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

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cart-dates")
      if (saved) setDatesState(JSON.parse(saved))
    } catch {
      localStorage.removeItem("cart-dates")
    }
  }, [])

  const setDates = (next: RentalDates | null) => {
    setDatesState(next)
    if (next) localStorage.setItem("cart-dates", JSON.stringify(next))
    else localStorage.removeItem("cart-dates")
  }

  const setAllDays = (days: number) => {
    setItems((prev) => prev.map((item) => ({ ...item, days })))
  }

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("cart", JSON.stringify(items))
    } else {
      localStorage.removeItem("cart")
    }
  }, [items])

  const addItem = (item: CartItem) => {
    let toastPayload: ToastPayload | null = null

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

        toastPayload = {
          title: "Item updated in cart",
          description: `${item.name} rental days updated to ${item.days}`,
        }

        return updatedItems
      } else {
        // Add new item
        toastPayload = {
          title: "Item added to cart",
          description: `${item.name} added to your cart`,
        }

        return [...prevItems, item]
      }
    })

    if (toastPayload) {
      toast(toastPayload)
    }
  }

  const removeItem = (id: string) => {
    let toastPayload: ToastPayload | null = null

    setItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === id)
      const newItems = prevItems.filter((item) => item.id !== id)

      if (itemToRemove) {
        toastPayload = {
          title: "Item removed from cart",
          description: `${itemToRemove.name} removed from your cart`,
        }
      }

      if (newItems.length === 0) {
        localStorage.removeItem("cart")
      }

      return newItems
    })

    if (toastPayload) {
      toast(toastPayload)
    }
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
        dates,
        setDates,
        setAllDays,
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
    // Return default values for server-side rendering
    return {
      items: [],
      dates: null,
      setDates: () => {},
      setAllDays: () => {},
      addItem: () => {},
      removeItem: () => {},
      updateItemDays: () => {},
      clearCart: () => {},
      itemCount: 0,
      total: 0,
      getWhatsAppLink: () => "",
    }
  }
  return context
}

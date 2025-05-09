"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Trash2, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/components/cart-provider"

export default function CartPage() {
  const { items, removeItem, updateItemDays, clearCart } = useCart()
  const [deliveryMethod, setDeliveryMethod] = useState("pickup")
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    notes: "",
  })

  // Calculate subtotal
  const subtotal = items.reduce((total, item) => total + item.price * item.days, 0)
  const deliveryFee = deliveryMethod === "delivery" ? 200 : 0
  const total = subtotal + deliveryFee

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCustomerInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckout = () => {
    // Format cart items for WhatsApp message
    const itemsList = items
      .map((item) => `• ${item.name} - ₹${item.price}/day x ${item.days} days = ₹${item.price * item.days}`)
      .join("\n")

    // Format customer info
    const customerDetails = `
Name: ${customerInfo.name}
Email: ${customerInfo.email}
Phone: ${customerInfo.phone}
${
  deliveryMethod === "delivery"
    ? `Address: ${customerInfo.address}, ${customerInfo.city}, ${customerInfo.pincode}`
    : "Pickup from store"
}
${customerInfo.notes ? `Notes: ${customerInfo.notes}` : ""}
`

    // Format order summary
    const orderSummary = `
Subtotal: ₹${subtotal}
${deliveryMethod === "delivery" ? `Delivery Fee: ₹${deliveryFee}` : ""}
Total: ₹${total}
`

    // Combine all parts
    const message = `*New Order from Book My DSLR*\n\n*Items:*\n${itemsList}\n\n*Order Summary:*${orderSummary}\n\n*Customer Details:*${customerDetails}`

    // Encode for WhatsApp
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/919876543210?text=${encodedMessage}`

    // Open WhatsApp
    window.open(whatsappUrl, "_blank")
  }

  if (items.length === 0) {
    return (
      <div className="container py-10">
        <div className="text-center py-16">
          <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
          <Button
            asChild
            className="bg-gradient-to-r from-amber-500 to-yellow-300 text-black hover:from-amber-600 hover:to-yellow-400"
          >
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <Link href="/products" className="flex items-center text-muted-foreground mb-6 hover:text-amber-500">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Continue shopping
      </Link>

      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={`${item.category}-${item.id}`} className="flex gap-4 py-4 border-b last:border-0">
                    <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg?height=100&width=100"}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="font-bold text-amber-600">₹{item.price * item.days}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">₹{item.price}/day</p>
                      <div className="flex items-center mt-2">
                        <label htmlFor={`days-${item.id}`} className="text-sm mr-2">
                          Days:
                        </label>
                        <select
                          id={`days-${item.id}`}
                          value={item.days}
                          onChange={(e) => updateItemDays(item.id, Number.parseInt(e.target.value))}
                          className="border rounded-md px-2 py-1 text-sm"
                        >
                          {[1, 2, 3, 7, 14, 30].map((days) => (
                            <option key={days} value={days}>
                              {days} {days === 1 ? "day" : "days"}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto text-red-500 hover:text-red-700"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-6">
            <CardContent className="p-6 space-y-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                {deliveryMethod === "delivery" && (
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>₹{deliveryFee}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold pt-2 border-t">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-medium">Delivery Method</h3>
                <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label htmlFor="pickup">Pick up from store</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <Label htmlFor="delivery">Delivery (+₹200)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-medium">Contact Information</h3>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      placeholder="Your email address"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      placeholder="Your phone number"
                      required
                    />
                  </div>
                </div>
              </div>

              {deliveryMethod === "delivery" && (
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-medium">Delivery Address</h3>
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        name="address"
                        value={customerInfo.address}
                        onChange={handleInputChange}
                        placeholder="Your full address"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={customerInfo.city}
                          onChange={handleInputChange}
                          placeholder="City"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input
                          id="pincode"
                          name="pincode"
                          value={customerInfo.pincode}
                          onChange={handleInputChange}
                          placeholder="Pincode"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t">
                <Label htmlFor="notes">Order Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={customerInfo.notes}
                  onChange={handleInputChange}
                  placeholder="Any special instructions or requirements"
                  className="mt-2"
                />
              </div>

              <Button
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-300 text-black hover:from-amber-600 hover:to-yellow-400"
                size="lg"
                onClick={handleCheckout}
                disabled={
                  !customerInfo.name || !customerInfo.phone || (deliveryMethod === "delivery" && !customerInfo.address)
                }
              >
                Complete Order via WhatsApp
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

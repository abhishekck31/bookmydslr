"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Check, ShoppingCart, Truck, CreditCard, MessageSquare } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/components/ui/use-toast"

const steps = [
  { id: "cart", name: "Cart", icon: <ShoppingCart className="h-5 w-5" /> },
  { id: "delivery", name: "Delivery", icon: <Truck className="h-5 w-5" /> },
  { id: "payment", name: "Payment", icon: <CreditCard className="h-5 w-5" /> },
  { id: "confirmation", name: "Confirmation", icon: <Check className="h-5 w-5" /> },
]

export function CheckoutSteps() {
  const [currentStep, setCurrentStep] = useState("cart")
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    deliveryMethod: "standard",
  })
  const { items, clearCart, total } = useCart()
  const { toast } = useToast()

  const handleDeliveryInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setDeliveryInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleDeliveryMethodChange = (value: string) => {
    setDeliveryInfo((prev) => ({ ...prev, deliveryMethod: value }))
  }

  const handleNextStep = () => {
    if (currentStep === "cart") {
      setCurrentStep("delivery")
    } else if (currentStep === "delivery") {
      // Validate delivery info
      if (!deliveryInfo.name || !deliveryInfo.email || !deliveryInfo.phone || !deliveryInfo.address) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive",
        })
        return
      }
      setCurrentStep("payment")
    } else if (currentStep === "payment") {
      // Process payment (in a real app)
      setCurrentStep("confirmation")
      // In a real app, you would process the payment here
      // For demo purposes, we'll just clear the cart
      clearCart()
    }
  }

  const handlePreviousStep = () => {
    if (currentStep === "delivery") {
      setCurrentStep("cart")
    } else if (currentStep === "payment") {
      setCurrentStep("delivery")
    }
  }

  const handleWhatsAppCheckout = () => {
    // Format the order details for WhatsApp
    const orderItems = items.map((item) => `${item.name} (${item.days} days) - ₹${item.price * item.days}`).join("\n")
    const orderDetails = `
*New Order from Book My DSLR*
----------------------------
${orderItems}
----------------------------
*Total: ₹${total}*

*Customer Details:*
Name: ${deliveryInfo.name}
Phone: ${deliveryInfo.phone}
Address: ${deliveryInfo.address}, ${deliveryInfo.city}, ${deliveryInfo.pincode}
Delivery Method: ${deliveryInfo.deliveryMethod === "standard" ? "Standard Delivery" : "Express Delivery"}
`

    // Create WhatsApp link with pre-filled message
    const whatsappNumber = "919972122462" // Replace with your actual WhatsApp business number
    const encodedMessage = encodeURIComponent(orderDetails)
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

    // Open WhatsApp in a new tab
    window.open(whatsappLink, "_blank")

    // Move to confirmation step
    setCurrentStep("confirmation")
    clearCart()
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Checkout Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          <ol className="flex items-center w-full">
            {steps.map((step, index) => (
              <li
                key={step.id}
                className={`flex items-center ${
                  index < steps.length - 1
                    ? "w-full after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:mx-6 after:inline-block"
                    : ""
                }`}
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep === step.id || steps.findIndex((s) => s.id === currentStep) > index
                      ? "bg-gradient-to-r from-amber-500 to-yellow-300 text-black"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {steps.findIndex((s) => s.id === currentStep) > index ? <Check className="w-5 h-5" /> : step.icon}
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    currentStep === step.id
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-300"
                      : "text-gray-500"
                  } hidden sm:inline-block`}
                >
                  {step.name}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {currentStep === "cart" && (
          <motion.div
            key="cart"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold">Your Cart</h2>
            {items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                <p className="text-gray-600 mb-4">Looks like you haven't added any items to your cart yet.</p>
                <Button asChild className="bg-gradient-to-r from-amber-500 to-yellow-300 text-black">
                  <a href="/products">Browse Products</a>
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={`${item.category}-${item.id}`}
                      className="flex items-center justify-between border-b pb-4"
                    >
                      <div className="flex items-center">
                        <div className="w-16 h-16 relative rounded overflow-hidden mr-4">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-600">
                            ₹{item.price} x {item.days} days
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">₹{item.price * item.days}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Delivery Fee</span>
                    <span>₹200</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>Total</span>
                    <span>₹{total + 200}</span>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleNextStep} className="bg-gradient-to-r from-amber-500 to-yellow-300 text-black">
                    Continue to Delivery
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        )}

        {currentStep === "delivery" && (
          <motion.div
            key="delivery"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold">Delivery Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={deliveryInfo.name}
                  onChange={handleDeliveryInfoChange}
                  className="border-amber-200 focus-visible:ring-amber-500"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={deliveryInfo.email}
                  onChange={handleDeliveryInfoChange}
                  className="border-amber-200 focus-visible:ring-amber-500"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={deliveryInfo.phone}
                  onChange={handleDeliveryInfoChange}
                  className="border-amber-200 focus-visible:ring-amber-500"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={deliveryInfo.address}
                  onChange={handleDeliveryInfoChange}
                  className="border-amber-200 focus-visible:ring-amber-500"
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={deliveryInfo.city}
                  onChange={handleDeliveryInfoChange}
                  className="border-amber-200 focus-visible:ring-amber-500"
                />
              </div>
              <div>
                <Label htmlFor="pincode">PIN Code</Label>
                <Input
                  id="pincode"
                  name="pincode"
                  value={deliveryInfo.pincode}
                  onChange={handleDeliveryInfoChange}
                  className="border-amber-200 focus-visible:ring-amber-500"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label>Delivery Method</Label>
              <RadioGroup
                value={deliveryInfo.deliveryMethod}
                onValueChange={handleDeliveryMethodChange}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:border-amber-300">
                  <RadioGroupItem value="standard" id="standard" className="text-amber-500 border-amber-200" />
                  <Label htmlFor="standard" className="flex-1 cursor-pointer">
                    <div className="font-medium">Standard Delivery</div>
                    <div className="text-sm text-gray-500">Delivery within 3-5 business days</div>
                  </Label>
                  <div className="font-medium">Free</div>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:border-amber-300">
                  <RadioGroupItem value="express" id="express" className="text-amber-500 border-amber-200" />
                  <Label htmlFor="express" className="flex-1 cursor-pointer">
                    <div className="font-medium">Express Delivery</div>
                    <div className="text-sm text-gray-500">Delivery within 24 hours</div>
                  </Label>
                  <div className="font-medium">₹200</div>
                </div>
              </RadioGroup>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePreviousStep} className="border-amber-500 text-amber-500">
                Back to Cart
              </Button>
              <Button onClick={handleNextStep} className="bg-gradient-to-r from-amber-500 to-yellow-300 text-black">
                Continue to Payment
              </Button>
            </div>
          </motion.div>
        )}

        {currentStep === "payment" && (
          <motion.div
            key="payment"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold">Payment Method</h2>

            <div className="bg-amber-50 p-4 rounded-md border border-amber-200 flex items-center">
              <MessageSquare className="h-6 w-6 text-amber-500 mr-3" />
              <div>
                <p className="font-medium">WhatsApp Payment</p>
                <p className="text-sm text-gray-600">
                  Complete your order via WhatsApp. Our team will contact you for payment details.
                </p>
              </div>
            </div>

            <div className="border rounded-md p-4 space-y-4">
              <h3 className="font-medium">Order Summary</h3>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={`${item.category}-${item.id}`} className="flex justify-between text-sm">
                    <span>
                      {item.name} ({item.days} days)
                    </span>
                    <span>₹{item.price * item.days}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryInfo.deliveryMethod === "express" ? 200 : 0}</span>
                </div>
                <div className="flex justify-between font-bold mt-2 pt-2 border-t">
                  <span>Total</span>
                  <span>₹{total + (deliveryInfo.deliveryMethod === "express" ? 200 : 0)}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePreviousStep} className="border-amber-500 text-amber-500">
                Back to Delivery
              </Button>
              <Button
                onClick={handleWhatsAppCheckout}
                className="bg-gradient-to-r from-amber-500 to-yellow-300 text-black"
              >
                Complete via WhatsApp
              </Button>
            </div>
          </motion.div>
        )}

        {currentStep === "confirmation" && (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center py-8 space-y-4"
          >
            <div className="h-20 w-20 rounded-full bg-gradient-to-r from-amber-500 to-yellow-300 flex items-center justify-center mx-auto">
              <Check className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold">Order Confirmed!</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Thank you for your order. Our team will contact you shortly via WhatsApp to confirm your rental details.
            </p>
            <Button asChild className="bg-gradient-to-r from-amber-500 to-yellow-300 text-black mt-4">
              <a href="/">Continue Shopping</a>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

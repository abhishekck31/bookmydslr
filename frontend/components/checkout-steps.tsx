"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Check, ShoppingCart, Truck, CreditCard, MessageSquare, Calendar as CalendarIcon } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"

// --- CONSTANTS ---
const DISCOUNT_THRESHOLD_DAYS = 3;
const DISCOUNT_PERCENTAGE = 0.20;

// --- Helper function for date formatting ---
const formatDate = (date: Date | undefined) => {
  if (!date) return "N/A"
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

// --- Helper function to calculate rental days ---
const calculateRentalDays = (pickup: Date | undefined, returns: Date | undefined) => {
  if (!pickup || !returns) return 0;

  if (returns > pickup) {
    const timeDiff = returns.getTime() - pickup.getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
    return diffDays;
  }
  return 0;
}

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
    pickupDate: undefined as Date | undefined,
    returnDate: undefined as Date | undefined,
  })

  const { items, clearCart, total } = useCart()
  const { toast } = useToast()

  // Calculate rental days from selected dates
  const rentalDays = calculateRentalDays(deliveryInfo.pickupDate, deliveryInfo.returnDate);

  // Calculate base subtotal (without discount)
  const baseSubtotal = useMemo(() => {
    if (rentalDays <= 0) return total;
    return items.reduce((sum, item) => {
      return sum + (item.price * rentalDays);
    }, 0);
  }, [items, rentalDays, total]);

  // Calculate discount and final subtotal
  const discountApplied = rentalDays >= DISCOUNT_THRESHOLD_DAYS ? baseSubtotal * DISCOUNT_PERCENTAGE : 0;
  const finalSubtotal = baseSubtotal - discountApplied;

  // Calculate delivery fee and grand total
  const deliveryFee = deliveryInfo.deliveryMethod === "express" ? 200 : 0;
  const grandTotal = finalSubtotal + deliveryFee;

  const handleDeliveryInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setDeliveryInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date: Date | undefined, field: "pickupDate" | "returnDate") => {
    setDeliveryInfo((prev) => ({ ...prev, [field]: date }))
  }

  const handleDeliveryMethodChange = (value: string) => {
    setDeliveryInfo((prev) => ({ ...prev, deliveryMethod: value }))
  }

  const handleNextStep = () => {
    if (currentStep === "cart") {
      if (items.length === 0) {
        toast({ title: "Cart Empty", description: "Please add items to your cart before continuing.", variant: "destructive" });
        return;
      }
      setCurrentStep("delivery")
    } else if (currentStep === "delivery") {
      if (!deliveryInfo.name || !deliveryInfo.phone || !deliveryInfo.address || !deliveryInfo.city || !deliveryInfo.pincode) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required contact and address fields.",
          variant: "destructive",
        })
        return
      }
      if (!deliveryInfo.pickupDate || !deliveryInfo.returnDate) {
        toast({
          title: "Missing Rental Dates",
          description: "Please select both pickup and return dates.",
          variant: "destructive",
        })
        return
      }
      if (rentalDays <= 0) {
        toast({
          title: "Invalid Dates",
          description: "Return date must be after pickup date.",
          variant: "destructive",
        })
        return
      }
      setCurrentStep("payment")
    } else if (currentStep === "payment") {
      setCurrentStep("confirmation")
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
    const orderItems = items
      .map((item) => `${item.name} (${rentalDays} days) - ₹${item.price * rentalDays}`)
      .join("\n")

    const orderDetails = `
*New Order from Book My DSLR*
----------------------------
*Rental Dates:*
Period: ${rentalDays} Days
Pickup: ${formatDate(deliveryInfo.pickupDate)}
Return: ${formatDate(deliveryInfo.returnDate)}
----------------------------
${orderItems}
----------------------------
*Base Subtotal: ₹${baseSubtotal}*
${discountApplied > 0 ? `*Discount (20%): -₹${discountApplied.toFixed(2)}*` : ''}
*Final Subtotal: ₹${finalSubtotal.toFixed(2)}*
*Delivery Fee: ₹${deliveryFee}*
*Grand Total: ₹${grandTotal.toFixed(2)}*

*Customer Details:*
Name: ${deliveryInfo.name}
Phone: ${deliveryInfo.phone}
Email: ${deliveryInfo.email}
Address: ${deliveryInfo.address}, ${deliveryInfo.city}, ${deliveryInfo.pincode}
Delivery Method: ${deliveryInfo.deliveryMethod === "standard" ? "Standard Delivery (Free)" : "Express Delivery (₹200)"}
`

    const whatsappNumber = "919972122462"
    const encodedMessage = encodeURIComponent(orderDetails.trim())
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

    window.open(whatsappLink, "_blank")
    setCurrentStep("confirmation")
    clearCart()
  }

  return (
    <div className="w-full max-w-4xl mx-auto">

      {/* Checkout Steps Header */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          <ol className="flex items-center w-full">
            {steps.map((step, index) => (
              <li
                key={step.id}
                className={`flex items-center ${index < steps.length - 1
                    ? "w-full after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:mx-6 after:inline-block"
                    : ""
                  }`}
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep === step.id || steps.findIndex((s) => s.id === currentStep) > index
                      ? "bg-gradient-to-r from-amber-500 to-yellow-300 text-black"
                      : "bg-gray-200 text-gray-600"
                    }`}
                >
                  {steps.findIndex((s) => s.id === currentStep) > index ? <Check className="w-5 h-5" /> : step.icon}
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${currentStep === step.id
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

        {/* Step 1: Cart - Display items and show dates if already selected */}
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
                            ₹{item.price}/day
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">₹{item.price}</p>
                        <p className="text-xs text-gray-500">per day</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Display Rental Dates if already selected in checkout */}
                {deliveryInfo.pickupDate && deliveryInfo.returnDate && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-center text-lg font-semibold text-amber-600 mb-3">
                      <CalendarIcon className="w-5 h-5 mr-2" />
                      Selected Rental Period
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <Label className="font-medium text-gray-600">Pickup Date</Label>
                        <p className="font-bold text-gray-900">{formatDate(deliveryInfo.pickupDate)}</p>
                      </div>
                      <div>
                        <Label className="font-medium text-gray-600">Return Date</Label>
                        <p className="font-bold text-gray-900">{formatDate(deliveryInfo.returnDate)}</p>
                      </div>
                    </div>
                    {rentalDays > 0 && (
                      <div className="text-sm font-medium pt-3 border-t mt-3">
                        Total Duration: <span className="text-amber-600 font-bold">{rentalDays} Days</span>
                      </div>
                    )}
                    {rentalDays >= DISCOUNT_THRESHOLD_DAYS && (
                      <div className="text-sm text-green-600 font-medium pt-2">
                        🎉 You're getting a flat 20% discount for renting 3 or more days!
                      </div>
                    )}
                  </div>
                )}

                <div className="border-t pt-4">
                  {rentalDays > 0 ? (
                    <>
                      {discountApplied > 0 && (
                        <>
                          <div className="flex justify-between mb-2 text-gray-600">
                            <span>Base Subtotal ({rentalDays} days)</span>
                            <span>₹{baseSubtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between mb-2 text-green-600">
                            <span>Discount (20%)</span>
                            <span>-₹{discountApplied.toFixed(2)}</span>
                          </div>
                        </>
                      )}
                      <div className="flex justify-between mb-2 font-semibold">
                        <span>Subtotal</span>
                        <span>₹{finalSubtotal.toFixed(2)}</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between mb-2">
                      <span>Subtotal</span>
                      <span className="text-gray-400">Select dates in next step</span>
                    </div>
                  )}
                  <div className="flex justify-between mb-2">
                    <span>Delivery Fee</span>
                    <span>To be selected</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>Estimated Total</span>
                    <span>{rentalDays > 0 ? `₹${finalSubtotal.toFixed(2)}` : 'TBD'}</span>
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

        {/* Step 2: Delivery Information - DATE PICKERS HERE */}
        {currentStep === "delivery" && (
          <motion.div
            key="delivery"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold">Delivery & Rental Details</h2>

            {/* Date Selection Section - DATE PICKERS */}
            <div className="border p-4 rounded-lg bg-amber-50 border-amber-200">
              <div className="flex items-center text-lg font-semibold text-amber-600 mb-4">
                <CalendarIcon className="w-5 h-5 mr-2" />
                Select Rental Dates
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="pickup-date" className="mb-2 block">Pickup Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal border-amber-300 focus-visible:ring-amber-500",
                          !deliveryInfo.pickupDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {deliveryInfo.pickupDate ? format(deliveryInfo.pickupDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={deliveryInfo.pickupDate}
                        onSelect={(date) => handleDateChange(date, "pickupDate")}
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label htmlFor="return-date" className="mb-2 block">Return Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal border-amber-300 focus-visible:ring-amber-500",
                          !deliveryInfo.returnDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {deliveryInfo.returnDate ? format(deliveryInfo.returnDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={deliveryInfo.returnDate}
                        onSelect={(date) => handleDateChange(date, "returnDate")}
                        disabled={(date) => !deliveryInfo.pickupDate || date <= deliveryInfo.pickupDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {rentalDays > 0 && (
                <div className="text-sm font-medium pt-3 border-t border-amber-300">
                  Total Rental Duration: <span className="text-amber-600 font-bold">{rentalDays} Days</span>
                </div>
              )}

              {rentalDays >= DISCOUNT_THRESHOLD_DAYS && (
                <div className="text-sm text-green-600 font-medium pt-2">
                  🎉 Rent for 3 or more days and get a flat 20% discount. The longer you rent, the more you save!
                </div>
              )}
            </div>

            <h3 className="text-xl font-semibold mt-6">Contact & Shipping Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" name="name" value={deliveryInfo.name} onChange={handleDeliveryInfoChange} className="border-amber-200 focus-visible:ring-amber-500" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={deliveryInfo.email} onChange={handleDeliveryInfoChange} className="border-amber-200 focus-visible:ring-amber-500" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" name="phone" value={deliveryInfo.phone} onChange={handleDeliveryInfoChange} className="border-amber-200 focus-visible:ring-amber-500" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="address">Address *</Label>
                <Textarea id="address" name="address" value={deliveryInfo.address} onChange={handleDeliveryInfoChange} className="border-amber-200 focus-visible:ring-amber-500" />
              </div>
              <div>
                <Label htmlFor="city">City *</Label>
                <Input id="city" name="city" value={deliveryInfo.city} onChange={handleDeliveryInfoChange} className="border-amber-200 focus-visible:ring-amber-500" />
              </div>
              <div>
                <Label htmlFor="pincode">PIN Code *</Label>
                <Input id="pincode" name="pincode" value={deliveryInfo.pincode} onChange={handleDeliveryInfoChange} className="border-amber-200 focus-visible:ring-amber-500" />
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

        {/* Step 3: Payment - SHOW FULL SUMMARY */}
        {currentStep === "payment" && (
          <motion.div
            key="payment"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold">Payment & Final Summary</h2>

            {/* Rental Dates Summary */}
            <div className="border p-4 rounded-lg bg-gray-50">
              <div className="flex items-center text-lg font-semibold text-amber-600 mb-3">
                <CalendarIcon className="w-5 h-5 mr-2" />
                Rental Period
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="font-medium">Pickup Date</Label>
                  <p className="font-bold">{formatDate(deliveryInfo.pickupDate)}</p>
                </div>
                <div>
                  <Label className="font-medium">Return Date</Label>
                  <p className="font-bold">{formatDate(deliveryInfo.returnDate)}</p>
                </div>
              </div>
              <div className="text-sm font-medium pt-2 border-t mt-2">
                Total Duration: <span className="text-amber-600 font-bold">{rentalDays} Days</span>
              </div>
            </div>

            {/* Customer Information Summary */}
            <div className="border p-4 rounded-lg bg-gray-50">
              <h3 className="font-semibold mb-3">Customer Details</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="font-medium">Name:</span> {deliveryInfo.name}</div>
                <div><span className="font-medium">Phone:</span> {deliveryInfo.phone}</div>
                <div className="col-span-2"><span className="font-medium">Email:</span> {deliveryInfo.email}</div>
                <div className="col-span-2"><span className="font-medium">Address:</span> {deliveryInfo.address}, {deliveryInfo.city}, {deliveryInfo.pincode}</div>
                <div className="col-span-2"><span className="font-medium">Delivery:</span> {deliveryInfo.deliveryMethod === "standard" ? "Standard (Free)" : "Express (₹200)"}</div>
              </div>
            </div>

            <div className="bg-amber-50 p-4 rounded-md border border-amber-200 flex items-center">
              <MessageSquare className="h-6 w-6 text-amber-500 mr-3" />
              <div>
                <p className="font-medium">WhatsApp Checkout</p>
                <p className="text-sm text-gray-600">
                  Complete your order via WhatsApp. Our team will contact you for payment details.
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="border rounded-md p-4 space-y-4">
              <h3 className="font-medium text-lg">Order Summary</h3>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={`${item.category}-${item.id}`} className="flex justify-between text-sm">
                    <span>{item.name} ({rentalDays} days)</span>
                    <span>₹{(item.price * rentalDays).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-2 mt-2">
                {discountApplied > 0 && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span>Base Subtotal</span>
                      <span>₹{baseSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-green-600 font-medium">
                      <span>Discount (20% - {rentalDays} days)</span>
                      <span>-₹{discountApplied.toFixed(2)}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between text-sm font-medium">
                  <span>Subtotal</span>
                  <span>₹{finalSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                  <span>Grand Total</span>
                  <span className="text-amber-600">₹{grandTotal.toFixed(2)}</span>
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

        {/* Step 4: Confirmation */}
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
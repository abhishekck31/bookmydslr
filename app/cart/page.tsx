"use client"

import type React from "react"
import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Trash2, ShoppingBag, Truck, Calendar, CreditCard, ShieldCheck, Clock, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"

// --- CONSTANTS ---
const DISCOUNT_THRESHOLD_DAYS = 3;

// --- Helper function for date formatting ---
const formatDate = (dateString: string) => {
  if (!dateString) return "N/A"
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

// --- Helper function to calculate rental days ---
const calculateRentalDays = (pickup: string, returns: string): number => {
  if (!pickup || !returns) return 0;
  const pDate = new Date(pickup);
  const rDate = new Date(returns);

  if (rDate > pDate) {
    const timeDiff = rDate.getTime() - pDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
  }
  return 0; // Return 0 if invalid range or same day (assuming min 1 day usually, but simplified logic)
}


export default function CartPage() {
  const { items, removeItem } = useCart()
  const [deliveryMethod, setDeliveryMethod] = useState("pickup")
  const { toast } = useToast()

  // --- Global Booking State ---
  // Using today/tomorrow as defaults
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [bookingDetails, setBookingDetails] = useState({
    pickupDate: today,
    pickupTime: "10:00",
    returnDate: tomorrow,
    returnTime: "10:00",
  })

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    notes: "",
  })

  // --- Calculations ---
  const rentalDays = useMemo(() => {
    return calculateRentalDays(bookingDetails.pickupDate, bookingDetails.returnDate);
  }, [bookingDetails.pickupDate, bookingDetails.returnDate]);

  // Price Calculation with Progressive Discount
  const calculateTotal = (basePrice: number, days: number) => {
    if (days <= 0) return 0;
    const baseTotal = basePrice * days;

    // Discount Logic
    if (days >= DISCOUNT_THRESHOLD_DAYS) {
      let discountRate = 0.20; // 20% by default for 3+ days
      if (days >= 7) discountRate = 0.25; // 25% for 7+ days

      // For 10+ days we might show custom pricing text, but here we calculate 25% max for simplicity or base total
      // User logic: "For 10+ days, base total shown with indication". 
      // Let's stick to the 25% cap for 7+ days logic for now to keep it clean, or 20% constant.
      // Implementation based on previous code:
      if (days >= 10) return baseTotal; // Special rates

      return Math.round(baseTotal * (1 - discountRate));
    }
    return baseTotal;
  };

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + calculateTotal(item.price, rentalDays), 0);
  }, [items, rentalDays]);

  const deliveryFee = deliveryMethod === "delivery" ? 200 : 0
  const finalTotal = subtotal + deliveryFee

  // --- Handlers ---
  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({ ...prev, [name]: value }));
  }

  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCustomerInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckout = () => {
    if (rentalDays <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Dates",
        description: "Return date must be after pickup date.",
      })
      return;
    }

    if (!customerInfo.name || !customerInfo.phone || !customerInfo.city) {
      toast({
        variant: "destructive",
        title: "Missing Details",
        description: "Please fill in your Name, Phone, and City.",
      })
      return;
    }

    if (deliveryMethod === 'delivery' && !customerInfo.address) {
      toast({
        variant: "destructive",
        title: "Address Required",
        description: "Please enter your full delivery address.",
      })
      return;
    }

    // Format Items List
    const itemsList = items
      .map(item => {
        const itemTotal = calculateTotal(item.price, rentalDays);
        return `• ${item.name} (x1)\n  Rate: ₹${item.price}/day\n  Total: ₹${itemTotal}`;
      })
      .join("\n\n");

    // Format Message
    const message = `*New Booking Request - Book My DSLR*

*Customer Details:*
Name: ${customerInfo.name}
Phone: ${customerInfo.phone}
City: ${customerInfo.city}
${deliveryMethod === 'delivery' ? `Address: ${customerInfo.address}, ${customerInfo.pincode}` : 'Method: Self Pickup'}

*Booking Schedule:*
Pickup: ${formatDate(bookingDetails.pickupDate)} at ${bookingDetails.pickupTime}
Return: ${formatDate(bookingDetails.returnDate)} at ${bookingDetails.returnTime}
Duration: ${rentalDays} Days

*Order Summary:*
${itemsList}

Subtotal: ₹${subtotal}
${deliveryMethod === 'delivery' ? `Delivery Fee: ₹${deliveryFee}` : ''}
*Est. Total: ₹${finalTotal}*
${rentalDays >= 3 ? '\n(Long term discount applied)' : ''}

*Notes:* ${customerInfo.notes || 'None'}
`;

    const whatsappUrl = `https://wa.me/919972122462?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  }

  if (items.length === 0) {
    return (
      <div className="container-premium py-32 min-h-[70vh] flex flex-col items-center justify-center text-center">
        <div className="bg-gray-50 p-8 rounded-full mb-8 animate-in fade-in zoom-in duration-500">
          <ShoppingBag className="h-12 w-12 text-gray-300" />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-gray-900 tracking-tight">Your cart is empty</h2>
        <Button asChild size="lg" className="bg-gray-900 hover:bg-black text-white rounded-full px-8 h-12">
          <Link href="/products">Browse Equipment</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <div className="container-premium py-12 lg:py-20">
        <Link href="/products" className="inline-flex items-center text-sm font-medium text-gray-500 mb-8 hover:text-amber-600 transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Continue shopping
        </Link>

        <div className="flex flex-col lg:flex-row gap-12">

          {/* LEFT COLUMN: Cart Items */}
          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Shopping Cart</h1>
              <p className="text-gray-500">{items.length} items in your list</p>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex gap-4 sm:gap-6 group"
                  >
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-xl flex items-center justify-center p-2 relative overflow-hidden shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{item.brand}</p>
                          <h3 className="font-bold text-lg text-gray-900 leading-tight">{item.name}</h3>
                        </div>
                        <Button size="icon" variant="ghost" className="text-gray-300 hover:text-red-500 -mt-2 -mr-2" onClick={() => removeItem(item.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex justify-between items-end mt-4">
                        <div className="text-sm font-medium bg-gray-100/50 px-3 py-1 rounded-lg text-gray-600">
                          Qty: 1
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900">₹{item.price}<span className="text-xs font-normal text-gray-400">/day</span></p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT COLUMN: Booking Details */}
          <div className="w-full lg:w-[480px]">
            <div className="sticky top-28 bg-white rounded-[2rem] p-6 sm:p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-500" />
                Booking Details
              </h2>

              <div className="space-y-6">

                {/* Dates & Times */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-gray-500 uppercase">Pickup</Label>
                    <div className="relative">
                      <input
                        type="date"
                        name="pickupDate"
                        value={bookingDetails.pickupDate}
                        min={today}
                        onChange={handleBookingChange}
                        className="w-full bg-gray-50 border-transparent focus:bg-white focus:border-amber-500 rounded-xl text-sm font-semibold h-11 px-3 outline-none transition-all"
                      />
                    </div>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                      <input
                        type="time"
                        name="pickupTime"
                        value={bookingDetails.pickupTime}
                        onChange={handleBookingChange}
                        className="w-full bg-gray-50 border-transparent focus:bg-white focus:border-amber-500 rounded-xl text-sm font-semibold h-11 pl-9 pr-3 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-gray-500 uppercase">Return</Label>
                    <div className="relative">
                      <input
                        type="date"
                        name="returnDate"
                        value={bookingDetails.returnDate}
                        min={bookingDetails.pickupDate}
                        onChange={handleBookingChange}
                        className="w-full bg-gray-50 border-transparent focus:bg-white focus:border-amber-500 rounded-xl text-sm font-semibold h-11 px-3 outline-none transition-all"
                      />
                    </div>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                      <input
                        type="time"
                        name="returnTime"
                        value={bookingDetails.returnTime}
                        onChange={handleBookingChange}
                        className="w-full bg-gray-50 border-transparent focus:bg-white focus:border-amber-500 rounded-xl text-sm font-semibold h-11 pl-9 pr-3 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50/50 rounded-xl p-3 flex justify-between items-center text-sm border border-amber-100">
                  <span className="text-amber-900 font-medium">Rental Duration:</span>
                  <span className="font-bold text-amber-900">{rentalDays} Days</span>
                </div>

                <Separator />

                {/* Customer Info */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-gray-500 uppercase">Full Name</Label>
                    <Input
                      name="name"
                      value={customerInfo.name}
                      onChange={handleCustomerChange}
                      placeholder="Enter your name"
                      className="bg-gray-50 border-transparent focus:bg-white focus:border-amber-500 h-11 rounded-xl"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-gray-500 uppercase">Phone</Label>
                      <Input
                        name="phone"
                        value={customerInfo.phone}
                        onChange={handleCustomerChange}
                        placeholder="Mobile"
                        className="bg-gray-50 border-transparent focus:bg-white focus:border-amber-500 h-11 rounded-xl"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-gray-500 uppercase">City</Label>
                      <Input
                        name="city"
                        value={customerInfo.city}
                        onChange={handleCustomerChange}
                        placeholder="City"
                        className="bg-gray-50 border-transparent focus:bg-white focus:border-amber-500 h-11 rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Method */}
                <div className="space-y-3">
                  <Label className="text-xs font-bold text-gray-500 uppercase">Delivery Method</Label>
                  <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod} className="grid grid-cols-2 gap-3">
                    <div>
                      <RadioGroupItem value="pickup" id="pickup" className="peer sr-only" />
                      <Label htmlFor="pickup" className="flex flex-col items-center justify-center h-16 rounded-xl border border-gray-200 bg-white peer-data-[state=checked]:border-amber-500 peer-data-[state=checked]:bg-amber-50 peer-data-[state=checked]:text-amber-900 cursor-pointer transition-all hover:bg-gray-50">
                        <ShoppingBag className="w-4 h-4 mb-1" />
                        <span className="text-xs font-bold">Store Pickup</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="delivery" id="delivery" className="peer sr-only" />
                      <Label htmlFor="delivery" className="flex flex-col items-center justify-center h-16 rounded-xl border border-gray-200 bg-white peer-data-[state=checked]:border-amber-500 peer-data-[state=checked]:bg-amber-50 peer-data-[state=checked]:text-amber-900 cursor-pointer transition-all hover:bg-gray-50">
                        <Truck className="w-4 h-4 mb-1" />
                        <span className="text-xs font-bold">Delivery</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Summary & Total */}
                <div className="pt-2 space-y-3">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  {deliveryMethod === 'delivery' && (
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Delivery Fee</span>
                      <span>₹{deliveryFee}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-end pt-3 border-t border-gray-100">
                    <span className="font-bold text-gray-900 text-lg">Total Estimate</span>
                    <span className="font-bold text-3xl text-gray-900">₹{finalTotal}</span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold h-14 rounded-xl text-lg shadow-lg shadow-green-200 transition-all hover:-translate-y-0.5"
                >
                  Place Order via WhatsApp
                </Button>
                <p className="text-xs text-center text-gray-400">
                  No payment required. You'll confirm details on WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
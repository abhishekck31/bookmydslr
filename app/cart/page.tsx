"use client"

import type React from "react"
import { useState, useMemo, useCallback } from "react"
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

// --- CONSTANTS ---
const DISCOUNT_THRESHOLD_DAYS = 3;
const DISCOUNT_PERCENTAGE = 0.20; // 20% total discount

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
        // Calculate difference in full days, add 1 to count the return day
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; 
        return diffDays;
    }
    return 0;
}


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

    // --- State Initialization ---
    const today = new Date().toISOString().split('T')[0];
    
    const initialDates = useMemo(() => {
        const dates: { [key: string]: { pickup: string, return: string } } = {};
        items.forEach(item => {
            // Try to get dates from localStorage if they exist
            const storedDates = localStorage.getItem(`rental-dates-${item.id}`);
            if (storedDates) {
                try {
                    const parsedDates = JSON.parse(storedDates);
                    dates[item.id] = parsedDates;
                } catch (e) {
                    // Fallback to default dates
                    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
                    dates[item.id] = { 
                        pickup: today, 
                        return: tomorrow 
                    };
                }
            } else {
                // Default dates
                const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
                dates[item.id] = { 
                    pickup: today, 
                    return: tomorrow 
                };
            }
        });
        return dates;
    }, [items]);

    const [itemDates, setItemDates] = useState(initialDates);

    // --- NEW: Price Calculation Logic with Progressive Discount ---
    const calculateItemPrice = (item: typeof items[0], calculatedDays: number) => {
        if (calculatedDays <= 0) return 0;
        
        // 1. Calculate the base total price (original daily rate * total days)
        const baseTotal = item.price * calculatedDays;
        
        // 2. Determine if discount applies and which tier
        const isDiscounted = calculatedDays >= DISCOUNT_THRESHOLD_DAYS;
        
        // 3. Apply progressive discount based on rental duration
        if (isDiscounted) {
            let discountRate = 0.2; // Default 20% for 3-6 days
            
            if (calculatedDays >= 10) {
                // For 10+ days, show original price but indicate special rates
                return baseTotal;
            } else if (calculatedDays >= 7) {
                // 25% discount for 7-9 days
                discountRate = 0.25;
            }
            
            const discountedTotal = baseTotal * (1 - discountRate); 
            // Round to the nearest whole number for currency
            return Math.round(discountedTotal);
        }
        
        return baseTotal;
    };
    
    // --- Centralized Subtotal Calculation ---
    const subtotal = useMemo(() => {
        return items.reduce((totalSum, item) => {
            const dates = itemDates[item.id] || { pickup: today, return: '' };
            const days = calculateRentalDays(dates.pickup, dates.return);
            
            const itemTotal = calculateItemPrice(item, days);
            
            return totalSum + itemTotal;
        }, 0);
    }, [items, itemDates]); // Dependency on itemDates ensures price updates when dates change
    
  const deliveryFee = deliveryMethod === "delivery" ? 200 : 0
    const finalTotal = subtotal + deliveryFee


    // --- Handle Date Change ---
    const handleDateChange = useCallback((itemId: string, dateType: 'pickup' | 'return', dateValue: string) => {
        setItemDates(prevDates => {
            const updatedDates = { 
                ...prevDates, 
                [itemId]: { 
                    ...prevDates[itemId], 
                    [dateType]: dateValue 
                } 
            };
            
            const { pickup, return: returns } = updatedDates[itemId];
            const calculatedDays = calculateRentalDays(pickup, returns);
            
            // Save dates to localStorage
            localStorage.setItem(`rental-dates-${itemId}`, JSON.stringify(updatedDates[itemId]));
            
            // Update the cart context with the new calculated days.
            if (calculatedDays >= 0) { 
                 updateItemDays(Number(itemId), calculatedDays);
            }

            return updatedDates;
        });
    }, [updateItemDays]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCustomerInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckout = () => {
      // Basic Validation
      const invalidDates = items.some(item => {
          const { pickup, return: returns } = itemDates[item.id] || {};
          const days = calculateRentalDays(pickup, returns);
          return days <= 0;
      });

      if (invalidDates) {
        alert("Please select valid Pickup and Return dates for all items where the return date is after the pickup date.");
        return;
      }
      
    // Format cart items for WhatsApp message
    const itemsList = items
        .map(item => {
            const dates = itemDates[item.id] || {};
            const days = calculateRentalDays(dates.pickup, dates.return);
            const isDiscounted = days >= DISCOUNT_THRESHOLD_DAYS;
            const baseTotal = item.price * days;
            const finalTotal = calculateItemPrice(item, days);
            const discountAmount = baseTotal - finalTotal;
            
            return `• ${item.name}\n  - Dates: ${formatDate(dates.pickup)} to ${formatDate(dates.return)} (${days} days)\n  - Base Total: ₹${baseTotal}\n  - Discount: ${isDiscounted ? `20% OFF (-₹${discountAmount})` : 'None'}\n  - Final Price: ₹${finalTotal}`;
        })
        .join("\n\n")

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
Total: ₹${finalTotal}
`

    // Combine all parts
    const message = `*New Order from Book My DSLR*\n\n*Items:*\n${itemsList}\n\n*Order Summary:*${orderSummary}\n\n*Customer Details:*${customerDetails}`

    // Encode for WhatsApp
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/919972122462?text=${encodedMessage}`

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
                  {items.map((item) => {
                    const dates = itemDates[item.id] || { pickup: today, return: "" };
                    const calculatedDays = calculateRentalDays(dates.pickup, dates.return);
                    const isDiscounted = calculatedDays >= DISCOUNT_THRESHOLD_DAYS;
                    
                    const baseTotal = item.price * calculatedDays;
                    const itemTotal = calculateItemPrice(item, calculatedDays);
                    const discountAmount = baseTotal - itemTotal;
                    
                    return (
                      <div key={item.id} className="flex gap-4 py-4 border-b last:border-0 relative">
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
                          <div className="flex justify-between items-start">
                        <h3 className="font-medium">{item.name}</h3>
                            <div className="flex items-center gap-2">
                              <p className="font-bold text-amber-600">₹{itemTotal}</p>
                        <button
                          onClick={() => removeItem(item.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                          </div>
                          
                          {/* --- Pricing Breakdown --- */}
                          <p className="text-sm text-muted-foreground">
                            Rate: ₹{item.price}/day
                          </p>
                          {isDiscounted && (
                            <p className="text-xs text-green-600 font-semibold mt-1">
                              {calculatedDays >= 10 ? (
                                "Contact us for exclusive rates! (-₹" + discountAmount + ")"
                              ) : calculatedDays >= 7 ? (
                                "25% Discount Applied! (-₹" + discountAmount + ")"
                              ) : (
                                "20% Discount Applied! (-₹" + discountAmount + ")"
                              )}
                            </p>
                          )}
                          
                          {/* --- Date Selectors for Pickup and Return --- */}
                          <div className="grid grid-cols-2 gap-4 mt-2 mb-2">
                            <div>
                                <Label htmlFor={`pickup-${item.id}`} className="text-xs">Pickup Date</Label>
                                <Input
                                    id={`pickup-${item.id}`}
                                    type="date"
                                    value={dates.pickup}
                                    onChange={(e) => handleDateChange(String(item.id), 'pickup', e.target.value)}
                                    min={today}
                                    className="h-8 text-sm border-amber-200 focus-visible:ring-amber-500"
                                />
                            </div>
                            <div>
                                <Label htmlFor={`return-${item.id}`} className="text-xs">Return Date</Label>
                                <Input
                                    id={`return-${item.id}`}
                                    type="date"
                                    value={dates.return}
                                    onChange={(e) => handleDateChange(String(item.id), 'return', e.target.value)}
                                    min={dates.pickup || today}
                                    className="h-8 text-sm border-amber-200 focus-visible:ring-amber-500"
                                />
                            </div>
                          </div>
                          
                          {/* Display calculated duration */}
                          <p className="text-sm font-medium mt-1">
                              {calculatedDays > 0 
                                  ? `Rental Duration: ${calculatedDays} days` 
                                  : "Select valid dates"
                              }
                          </p>
                    </div>
                  </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>
        </div>

          {/* --- Order Summary and Customer Info --- */}
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
                    <span>₹{finalTotal}</span>
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
"use client"

import { TestimonialsSection } from "@/components/ui/testimonials-with-marquee"

const testimonials = [
  {
    author: {
      name: "Rahul Sharma",
      handle: "@rahulphoto",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    text: "Excellent service! The camera was in perfect condition and the pickup process was super smooth. Best rental service in Bangalore.",
    href: "https://twitter.com/rahulphoto"
  },
  {
    author: {
      name: "Priya Nair",
      handle: "@priyacreates",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    },
    text: "I've been renting from Book My DSLR for 6 months now. Their equipment is always well-maintained and prices are unbeatable.",
    href: "https://twitter.com/priyacreates"
  },
  {
    author: {
      name: "Amit Kumar",
      handle: "@amitevents",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    text: "Great collection of lenses and cameras. The team is very helpful and delivery is always on time. Highly recommend!",
    href: "https://twitter.com/amitevents"
  },
  {
    author: {
      name: "Sneha Reddy",
      handle: "@snehablog",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    text: "Perfect for my travel photography needs. The equipment quality is top-notch and rental process is hassle-free.",
    href: "https://twitter.com/snehablog"
  },
  {
    author: {
      name: "Vikram Singh",
      handle: "@vikramcomm",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    text: "Professional service with excellent equipment. The team understands photography needs and always suggests the right gear.",
    href: "https://twitter.com/vikramcomm"
  },
  {
    author: {
      name: "Anjali Menon",
      handle: "@anjalivlog",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    text: "Great experience renting video equipment. The gear is always clean and well-maintained. Best rental service in Bangalore!",
    href: "https://twitter.com/anjalivlog"
  }
]

export function ReviewSection() {
  return (
    <TestimonialsSection
      title="What Our Customers Say"
      description="Join 500+ happy photographers who trust us for their equipment needs"
      testimonials={testimonials}
    />
  )
}

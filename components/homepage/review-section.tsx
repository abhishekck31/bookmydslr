"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

const reviews = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Wedding Photographer",
    content: "Excellent service! The camera was in perfect condition and the pickup process was super smooth. Best rental service in Bangalore.",
    rating: 5,
    location: "Indiranagar"
  },
  {
    id: 2,
    name: "Priya Nair",
    role: "Content Creator",
    content: "I've been renting from Book My DSLR for 6 months now. Their equipment is always well-maintained and the prices are unbeatable.",
    rating: 5,
    location: "Koramangala"
  },
  {
    id: 3,
    name: "Amit Kumar",
    role: "Event Photographer",
    content: "Great collection of lenses and cameras. The team is very helpful and the delivery is always on time. Highly recommend!",
    rating: 5,
    location: "Whitefield"
  },
  {
    id: 4,
    name: "Sneha Reddy",
    role: "Travel Blogger",
    content: "Perfect for my travel photography needs. The equipment quality is top-notch and the rental process is hassle-free.",
    rating: 5,
    location: "HSR Layout"
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Commercial Photographer",
    content: "Professional service with excellent equipment. The team understands photography needs and always suggests the right gear.",
    rating: 5,
    location: "Kalyan Nagar"
  },
  {
    id: 6,
    name: "Anjali Menon",
    role: "YouTuber",
    content: "Great experience renting video equipment. The gear is always clean and well-maintained. Best rental service in Bangalore!",
    rating: 5,
    location: "Hennur"
  }
]

export function ReviewSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-50 text-amber-700 mb-4"
          >
            <Star className="mr-1 h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            Customer Reviews
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight"
          >
            What Our Customers Say
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-base text-gray-600 leading-relaxed font-medium"
          >
            Join 500+ happy photographers who trust us for their equipment needs
          </motion.p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1, 
                ease: "easeOut" 
              }}
              className="p-6 rounded-xl bg-gray-50 border border-gray-100/50 shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 h-8 w-8 text-amber-200 rotate-180 group-hover:text-amber-300 transition-colors duration-300" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array(review.rating)
                  .fill(0)
                  .map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                  ))}
              </div>

              {/* Review Content */}
              <p className="text-gray-700 leading-relaxed mb-6 text-sm relative z-10">
                "{review.content}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">{review.name}</h4>
                  <p className="text-xs text-gray-500">{review.role}</p>
                </div>
                <div className="text-xs text-gray-400 bg-white px-2 py-1 rounded-full border border-gray-200">
                  📍 {review.location}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-8 px-8 py-4 bg-amber-50 rounded-2xl border border-amber-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-700">4.9/5</div>
              <div className="text-xs text-amber-600">Average Rating</div>
            </div>
            <div className="w-px h-8 bg-amber-200"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-700">500+</div>
              <div className="text-xs text-amber-600">Happy Customers</div>
            </div>
            <div className="w-px h-8 bg-amber-200"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-700">1000+</div>
              <div className="text-xs text-amber-600">Rentals Completed</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { motion, useAnimation, useInView } from "framer-motion"
import Image from "next/image"

export function GoogleReviews() {
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const [autoScroll, setAutoScroll] = useState(true)

  const reviews = [
    {
      id: 1,
      name: "Rahul Sharma",
      rating: 5,
      date: "2 months ago",
      text: "Excellent service! I rented a Canon EOS R5 for my wedding shoot and the quality was exceptional. The staff was very helpful in explaining all the features.",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 2,
      name: "Priya Patel",
      rating: 5,
      date: "1 month ago",
      text: "Best camera rental service in Bangalore. They have a wide range of equipment and their prices are very reasonable. Will definitely use their services again!",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 3,
      name: "Aditya Verma",
      rating: 4,
      date: "3 months ago",
      text: "Great experience renting from Book My DSLR. The equipment was in perfect condition and the rental process was smooth. Only giving 4 stars because the delivery was slightly delayed.",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 4,
      name: "Sneha Gupta",
      rating: 5,
      date: "2 weeks ago",
      text: "I'm a photography student and I regularly rent equipment from Book My DSLR. They have the latest models and their staff is very knowledgeable. Highly recommended!",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 5,
      name: "Vikram Singh",
      rating: 5,
      date: "1 week ago",
      text: "Professional service with high-quality equipment. I rented a Sony A7III and some lenses for a commercial shoot and everything worked perfectly.",
      avatar: "/placeholder.svg?height=50&width=50",
    },
  ]

  // Auto-scroll animation
  useEffect(() => {
    if (isInView && autoScroll) {
      const startScrollAnimation = () => {
        controls.start({
          x: [-10, -1500],
          transition: {
            duration: 30,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          },
        })
      }

      startScrollAnimation()
    } else if (!autoScroll) {
      controls.stop()
    }
  }, [isInView, controls, autoScroll])

  // Pause auto-scroll on hover
  const handleMouseEnter = () => {
    setAutoScroll(false)
    controls.stop()
  }

  const handleMouseLeave = () => {
    setAutoScroll(true)
    // Restart the animation without trying to get the current state
    controls.start({
      x: [-10, -1500],
      transition: {
        duration: 30,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
      },
    })
  }

  return (
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl font-bold mb-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-300">
            Google Verified Reviews
          </span>
        </h2>
        <p className="text-gray-600">See what our customers are saying about us</p>

        <div className="flex items-center justify-center mt-4">
          <Image src="/images/google-logo.png" alt="Google" width={24} height={24} className="mr-2" />
          <div className="flex">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-amber-500 text-amber-500" />
              ))}
          </div>
          <span className="ml-2 font-medium">4.9/5 based on 127 reviews</span>
        </div>
      </motion.div>

      <div className="overflow-hidden" ref={containerRef}>
        <div className="relative w-full" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <motion.div className="flex gap-6 absolute" animate={controls}>
            {/* First set of reviews */}
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}

            {/* Duplicate set for seamless looping */}
            {reviews.map((review) => (
              <ReviewCard key={`dup-${review.id}`} review={review} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function ReviewCard({ review }: { review: any }) {
  return (
    <Card className="w-[350px] flex-shrink-0 shadow-sm hover:shadow-md transition-shadow bg-white border border-gray-100">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
            <Image src={review.avatar || "/placeholder.svg"} alt={review.name} fill className="object-cover" />
          </div>
          <div>
            <p className="font-semibold">{review.name}</p>
            <p className="text-xs text-gray-500">{review.date}</p>
          </div>
        </div>
        <div className="flex mb-3">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < review.rating ? "fill-amber-500 text-amber-500" : "text-gray-300"}`}
              />
            ))}
        </div>
        <p className="text-gray-700">{review.text}</p>
        <div className="mt-4 flex items-center">
          <Image src="/images/google-logo.png" alt="Google icon" width={16} height={16} className="mr-2" />
          <span className="text-xs text-gray-500">Posted on Google</span>
        </div>
      </CardContent>
    </Card>
  )
}

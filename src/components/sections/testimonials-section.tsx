"use client"

import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { useState } from "react"

const testimonials = [
  {
    name: "Ahmed Hassan",
    company: "E-Commerce Business",
    text: "Their service is incredibly reliable. My customers love the real-time tracking feature. Highly recommended!",
    rating: 5,
    image: "👨‍💼",
  },
  {
    name: "Fatima Rahman",
    company: "Online Seller",
    text: "Fast, secure, and professional. I have been using them for 6 months and never had any issues.",
    rating: 5,
    image: "👩‍💼",
  },
  {
    name: "Mohammad Ali",
    company: "Small Business Owner",
    text: "Best delivery service in Bangladesh. Their customer support is amazing and always helpful.",
    rating: 5,
    image: "👨‍💼",
  },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-lg text-gray-400">Join thousands of satisfied customers</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Card className="p-12 bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-lg mb-6 text-gray-100">"{testimonials[currentIndex].text}"</p>
              <div>
                <p className="font-bold text-white">{testimonials[currentIndex].name}</p>
                <p className="text-gray-300">{testimonials[currentIndex].company}</p>
              </div>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={() => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? "bg-white w-8" : "bg-white/30"}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

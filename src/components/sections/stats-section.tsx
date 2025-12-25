"use client"

import { useEffect, useRef, useState } from "react"
import { Package, MapPin, TrendingUp, Users } from "lucide-react"

const stats = [
  { label: "Parcels Delivered", value: 50000, icon: Package },
  { label: "Districts Covered", value: 64, icon: MapPin },
  { label: "On-Time Delivery", value: 98, icon: TrendingUp, suffix: "%" },
  { label: "Happy Customers", value: 10000, icon: Users },
]

export default function StatsSection() {
  const [counts, setCounts] = useState(stats.map(() => 0))
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          stats.forEach((stat, idx) => {
            const interval = setInterval(() => {
              setCounts((prev) => {
                const newCounts = [...prev]
                if (newCounts[idx] < stat.value) {
                  newCounts[idx] = Math.min(newCounts[idx] + stat.value / 50, stat.value)
                }
                return newCounts
              })
            }, 30)
            return () => clearInterval(interval)
          })
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">By The Numbers</h2>
          <p className="text-lg text-gray-300">Our track record speaks for itself</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 text-center hover:bg-white/20 transition-all"
            >
              <stat.icon className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <div className="text-5xl font-bold mb-2">
                {Math.floor(counts[idx])}
                {stat.suffix}
              </div>
              <p className="text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { Card } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

const zones = [
  {
    zone: "Dhaka & Suburbs",
    cities: ["Dhaka", "Gazipur", "Narayanganj", "Tangail", "Shariatpur"],
  },
  {
    zone: "Chittagong Region",
    cities: ["Chittagong", "Cox's Bazar", "Rangamati", "Khagrachhari"],
  },
  {
    zone: "Northern Region",
    cities: ["Rajshahi", "Khulna", "Barisal", "Sylhet", "Mymensingh"],
  },
  {
    zone: "Eastern Region",
    cities: ["Comilla", "Noakhali", "Feni", "Chandpur"],
  },
]

export default function CoverageSection() {
  const [expandedZone, setExpandedZone] = useState<number | null>(null)

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Coverage Area</h2>
          <p className="text-lg text-gray-600">We deliver across all 64 districts of Bangladesh</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {zones.map((item, idx) => (
            <Card key={idx} className="overflow-hidden">
              <button
                onClick={() => setExpandedZone(expandedZone === idx ? null : idx)}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-100 transition-colors"
              >
                <h3 className="text-lg font-bold text-gray-900">{item.zone}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-gray-600 transition-transform ${expandedZone === idx ? "rotate-180" : ""}`}
                />
              </button>

              {expandedZone === idx && (
                <div className="px-6 pb-6 pt-0 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-3">
                    {item.cities.map((city, cidx) => (
                      <div key={cidx} className="text-gray-600 text-sm">
                        ✓ {city}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

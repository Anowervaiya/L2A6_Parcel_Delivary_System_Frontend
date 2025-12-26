

import { Card } from "@/components/ui/card"
import {  MapPin } from "lucide-react"
import { useState } from "react"
const coverageAreas = [
  {
    region: "North Region",
    cities: "Delhi, Chandigarh, Himachal Pradesh, Punjab, Haryana, Jammu & Kashmir",
 
  },
  {
    region: "South Region",
    cities: "Karnataka, Tamil Nadu, Telangana, Andhra Pradesh, Kerala",
  
  },
  {
    region: "East Region",
    cities: "West Bengal, Bihar, Jharkhand, Odisha, Assam",

  },
  {
    region: "West Region",
    cities: "Maharashtra, Gujarat, Rajasthan, Goa",
   
  },
]

export default function CoverageSection() {

  return (
    <section className="py-20 ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Coverage Area</h2>
          <p className="text-lg text-gray-600">We deliver across all 64 districts of Bangladesh</p>
        </div>

        <section className="px-6 ">
          <div className="">
           

            <div className="grid md:grid-cols-2 gap-8">
              {coverageAreas.map((area, i) => (
                <Card
                  key={i}
                  className={`p-8  border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-blue-500 text-white flex items-center justify-center`}
                    >
                      <MapPin className="w-8 h-8" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold mb-3 text-gray-900">{area.region}</h3>
                      <p className="text-gray-700 text-lg leading-relaxed">{area.cities}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

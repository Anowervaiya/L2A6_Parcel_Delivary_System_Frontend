"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, CheckCircle, Package, Truck, MapPin } from "lucide-react"

export default function TrackingSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Real-Time Tracking</h2>
            <p className="text-lg text-gray-600">Know exactly where your parcel is at every moment</p>
          </div>

          {/* Tracking Input */}
          <Card className="p-8 mb-12 shadow-lg">
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder="Enter tracking number"
                  className="w-full pl-4 pr-12 py-3 border-2 border-gray-200"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search className="w-5 h-5" />
                </button>
              </div>
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8">
                Search
              </Button>
            </div>
          </Card>

          {/* Status Timeline */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Your Parcel Journey</h3>
            <div className="space-y-4">
              {[
                { status: "Order Placed", icon: CheckCircle, time: "Today 10:30 AM", active: true },
                { status: "Pickup Scheduled", icon: Package, time: "Today 2:00 PM", active: true },
                { status: "In Transit", icon: Truck, time: "Expected tomorrow", active: true },
                { status: "Out for Delivery", icon: MapPin, time: "In progress", active: false },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${item.active ? "bg-green-500 text-white" : "bg-gray-200 text-gray-400"}`}
                    >
                      <item.icon className="w-6 h-6" />
                    </div>
                    {idx < 3 && <div className="w-1 h-12 bg-gray-200 mt-2" />}
                  </div>
                  <div className="pt-2">
                    <h4 className="font-semibold text-gray-900">{item.status}</h4>
                    <p className="text-sm text-gray-600">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Package, Headphones, MapPin, Truck } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router"


export default function HeroSection() {
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    setShowAnimation(true)
  }, [])

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920"
          alt="Delivery Man"
          className="w-full h-full object-cover object-right"
        />
        {/* Dark gradient overlay from left to transparent right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative  h-screen flex flex-col">
        {/* Main Content */}
        <div className="flex-1 container mx-auto  flex items-center">
          <div className="w-full px-4  pt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className={`space-y-6 text-white ${showAnimation ? "animate-fadeIn" : ""}`}>
                {/* Heading and Subheading */}
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-6xl font-bold leading-tight text-balance">
                    Fast & Reliable Parcel Delivery
                  </h1>
                  <p className="text-xl text-gray-300">Across All 64 Districts of Bangladesh</p>
                  <p className="text-base text-gray-400">
                    Track your parcels in real-time with our advanced delivery system
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link to="/dashboards/sender">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                    >
                      Send Parcel
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white bg-transparent hover:bg-white/10 font-semibold hover:scale-105 transition-all"
                  >
                    Track Package
                  </Button>
                </div>

                <div className="mt-8 max-w-md">
                  <div className="bg-white rounded-xl shadow-xl p-4 flex items-center gap-2">
                    <Input
                      type="text"
                      placeholder="Enter Tracking ID"
                      className="flex-1 border-0 bg-transparent text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-0"
                    />
                    <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white p-2 rounded-lg transition-all hover:shadow-lg">
                      <Search className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right side - empty on desktop, content stacks on mobile */}
              <div className="hidden md:block" />
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md border-t border-white/20">
          <div className="px-4 container mx-auto  py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Parcels Stat */}
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-3 rounded-lg">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div className="text-white">
                  <div className="font-bold text-lg">50K+</div>
                  <div className="text-sm text-gray-300">Parcels</div>
                </div>
              </div>

              {/* Support Stat */}
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-3 rounded-lg">
                  <Headphones className="w-6 h-6 text-white" />
                </div>
                <div className="text-white">
                  <div className="font-bold text-lg">24/7</div>
                  <div className="text-sm text-gray-300">Support</div>
                </div>
              </div>

              {/* Districts Stat */}
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="text-white">
                  <div className="font-bold text-lg">64</div>
                  <div className="text-sm text-gray-300">Districts</div>
                </div>
              </div>

              {/* Delivery Stat */}
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-3 rounded-lg">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <div className="text-white">
                  <div className="font-bold text-lg">Same Day</div>
                  <div className="text-sm text-gray-300">Delivery</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Search, MapPin, Package, Truck } from "lucide-react"

const Hero = () => {
  const [trackingId, setTrackingId] = useState("")

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    if (trackingId.trim()) {
      console.log("Tracking:", trackingId)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/delivery-hero.jpg')`,
        }}
      />

      <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/60 to-black/10" />

      {/* Decorative Background Elements */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
      </div> */}

      {/* Hero Content Container */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text & CTA */}
            <div className="text-white space-y-8 animate-fade-in">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-colors">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-white">50,000+ Parcels Delivered</span>
              </div>

              {/* Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-balance">
                  Fast, Secure &{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10">Reliable</span>
                    <svg
                      className="absolute -bottom-2 left-0 w-full text-blue-400"
                      viewBox="0 0 300 12"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M2 10C100 2 200 2 298 10"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        opacity="0.6"
                      />
                    </svg>
                  </span>
                  <br />
                  Parcel Delivery
                </h1>

                <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
                  Experience seamless parcel delivery across the nation. Real-time tracking, secure handling, and
                  on-time delivery guaranteed.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-6 text-base group"
                >
                  Send a Parcel
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-6 text-base bg-transparent"
                >
                  Track Parcel
                </Button>
              </div>

              {/* Tracking Input */}
              <form onSubmit={handleTrack} className="w-full max-w-md">
                <div className="flex gap-2 p-1 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:border-white/40 transition-colors">
                  <div className="flex-1 relative flex items-center">
                    <Search className="absolute left-4 w-5 h-5 text-white/50" />
                    <Input
                      type="text"
                      placeholder="Enter tracking ID..."
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      className="pl-12 bg-transparent border-none text-white placeholder:text-white/40 focus-visible:ring-0"
                    />
                  </div>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6">
                    Track
                  </Button>
                </div>
              </form>
            </div>

            {/* Right Column - Floating Cards */}
            <div className="hidden lg:block relative h-full min-h-96">
              {/* Main Status Card */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:border-white/40 transition-colors animate-float shadow-2xl">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <Package className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60">Parcel Status</p>
                      <p className="font-semibold text-white">Out for Delivery</p>
                    </div>
                  </div>

                  {/* Route Info */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-white/80">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <span className="text-sm">Dhaka → Chittagong</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full w-3/4 rounded-full" />
                    </div>
                    <p className="text-xs text-white/50">Estimated: 2 hours</p>
                  </div>
                </div>
              </div>

              {/* Active Deliveries Card */}
              <div
                className="absolute top-20 right-10 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:border-white/40 transition-colors animate-bounce shadow-xl"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Truck className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-white/60">Active Deliveries</p>
                    <p className="font-bold text-white text-lg">1,247</p>
                  </div>
                </div>
              </div>

              {/* Today's Delivered Card */}
              <div className="absolute bottom-20 left-10 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:border-white/40 transition-colors animate-bounce shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-emerald-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-white/60">Today's Delivered</p>
                    <p className="font-bold text-white text-lg">523</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Bottom Divider */}
      <div className="absolute bottom-0 left-0 right-0 w-full">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto" preserveAspectRatio="none">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  )
}

export default Hero



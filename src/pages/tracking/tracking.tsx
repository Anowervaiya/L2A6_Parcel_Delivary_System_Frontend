"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, CheckCircle, Package, Truck, MapPin } from "lucide-react";
import TrackingSection from "@/components/sections/tracking-section";

export default function TrackingPage() {
  return (
    <section className=" bg-gray-50">
      <section className="px-6 py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-500"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-cyan-500"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <span className="inline-block px-6 py-2 bg-white/10 rounded-full text-sm font-semibold mb-6 backdrop-blur">
            Tracking
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance leading-tight">
            Track Parcel
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto text-balance">
            Track your parcel in real time with complete transparency. From
            pickup to delivery, stay updated with accurate location, status
            changes, and delivery progress — all in one simple and reliable
            tracking system.
          </p>
        </div>
      </section>
   <TrackingSection/>
    </section>
  );
}

import { Button } from "@/components/ui/button"
import { Apple, Play, Bell, MapPin, Zap } from "lucide-react"

const features = [
  { icon: Bell, title: "Push Notifications", description: "Real-time delivery updates" },
  { icon: MapPin, title: "Live Tracking", description: "Track your parcel every second" },
  { icon: Zap, title: "Easy Booking", description: "Book parcels in just 2 taps" },
]

export default function MobileAppSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Phone Mockup */}
          <div className="flex justify-center">
            <div className="relative w-64 h-96 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl shadow-2xl p-3 flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-2xl flex flex-col items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-4xl">📱</div>
                  <h3 className="text-xl font-bold text-gray-900">ParcelApp</h3>
                  <p className="text-sm text-gray-600">Your delivery companion</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Download Our Mobile App</h2>
              <p className="text-lg text-gray-600">
                Access all delivery services from your phone. Track, book, and manage your parcels on the go.
              </p>
            </div>

            {/* Features Grid */}
            <div className="space-y-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                      <feature.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="flex gap-4 pt-4">
              <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white flex items-center gap-2">
                <Apple className="w-5 h-5" />
                iOS
              </Button>
              <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white flex items-center gap-2">
                <Play className="w-5 h-5" />
                Android
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

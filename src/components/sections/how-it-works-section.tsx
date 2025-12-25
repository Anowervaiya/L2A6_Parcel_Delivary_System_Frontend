import { Card } from "@/components/ui/card"
import { Laptop, Package, Truck, CheckCircle } from "lucide-react"

const steps = [
  {
    number: 1,
    title: "Book Online",
    description: "Create an account and book your parcel in seconds",
    icon: Laptop,
  },
  {
    number: 2,
    title: "Package Pickup",
    description: "Our team picks up your parcel from your location",
    icon: Package,
  },
  {
    number: 3,
    title: "In Transit",
    description: "Your parcel travels safely to its destination",
    icon: Truck,
  },
  {
    number: 4,
    title: "Delivered",
    description: "Parcel reaches the recipient safely and on time",
    icon: CheckCircle,
  },
]

export default function HowItWorksSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600">Simple and straightforward delivery process</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-blue-600 -z-10" />

          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <Card className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white font-bold text-2xl mb-4 mx-auto">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

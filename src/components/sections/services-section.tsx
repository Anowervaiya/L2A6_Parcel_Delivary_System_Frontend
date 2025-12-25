import { Card } from "@/components/ui/card"
import { Clock, Zap, DollarSign, Shield } from "lucide-react"

const services = [
  {
    title: "Same Day Delivery",
    description: "Get your parcel delivered the same day you send it",
    icon: Clock,
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Express Shipping",
    description: "Fast and reliable express delivery across the country",
    icon: Zap,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Cash on Delivery",
    description: "Pay when you receive, making transactions hassle-free",
    icon: DollarSign,
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Secure Packaging",
    description: "Your parcels are handled with utmost care and protection",
    icon: Shield,
    color: "from-orange-500 to-red-600",
  },
]

export default function ServicesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600">Comprehensive delivery solutions tailored for you</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <Card
              key={idx}
              className="p-8 hover:shadow-xl transition-all duration-300 border-t-4 border-transparent hover:border-purple-500 group"
            >
              <div
                className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.color} text-white mb-4 group-hover:scale-110 transition-transform`}
              >
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

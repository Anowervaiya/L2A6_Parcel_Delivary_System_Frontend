import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Basic",
    price: "৳50-100",
    unit: "/kg",
    features: ["Standard delivery", "Standard tracking", "Local delivery", "Email support"],
    popular: false,
  },
  {
    name: "Standard",
    price: "৳80-150",
    unit: "/kg",
    features: ["Fast delivery", "Real-time tracking", "Nationwide coverage", "24/7 support", "Priority handling"],
    popular: true,
  },
  {
    name: "Express",
    price: "৳120-200",
    unit: "/kg",
    features: ["Same-day delivery", "Live GPS tracking", "All districts covered", "VIP support", "Insurance included"],
    popular: false,
  },
]

export default function PricingSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-600">Choose the plan that fits your needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`p-8 relative transition-all hover:shadow-2xl ${plan.popular ? "ring-2 ring-purple-500 md:scale-105" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-600">{plan.unit}</span>
              </div>

              <Button
                className={`w-full mb-8 ${plan.popular ? "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white" : "border-2 border-gray-300 text-gray-900 hover:border-purple-500"}`}
              >
                Choose Plan
              </Button>

              <div className="space-y-4">
                {plan.features.map((feature, fidx) => (
                  <div key={fidx} className="flex items-center gap-3">
                    <Check className={`w-5 h-5 ${plan.popular ? "text-blue-500" : "text-gray-400"}`} />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}


import PricingSection from "@/components/sections/pricing-section"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"

const pricingPlans = [
  {
    name: "Basic",
    price: "$5-100",
    description: "Perfect for occasional shipments",
    color: "from-blue-500 to-blue-600",
    features: ["Standard Delivery", "Basic Tracking", "Email Support", "Up to 5kg", "Local Delivery"],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Standard",
    price: "$10-150",
    description: "Most popular for regular shipping",
    color: "from-blue-600 to-cyan-600",
    featured: true,
    features: [
      "Express Delivery",
      "Real-time Tracking",
      "Phone Support",
      "Up to 20kg",
      "Regional Delivery",
      "SMS Updates",
      "Free Packaging",
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Express",
    price: "$20-200",
    description: "For urgent and high-value shipments",
    color: "from-blue-700 to-blue-800",
    features: [
      "Same-day Delivery",
      "Premium Tracking",
      "24/7 Support",
      "Up to 50kg",
      "National Delivery",
      "Priority Handling",
      "Insurance Included",
      "Photo Proof",
    ],
    cta: "Get Started",
    featured: false,
  },
]

export default function Pricing() {
  return (
    <div className="min-h-screen bg-white">


      <div className="">
        {/* Hero Section */}
        <section className="px-6 py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-500"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-cyan-500"></div>
          </div>

          <div className="max-w-6xl mx-auto relative z-10 text-center">
            <span className="inline-block px-6 py-2 bg-white/10 rounded-full text-sm font-semibold mb-6 backdrop-blur">
              Transparent Pricing
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance leading-tight">Simple, Honest Pricing</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto text-balance">
              Choose the perfect plan for your shipping needs. No hidden charges, no surprises—just transparent pricing.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <PricingSection/>

        {/* FAQ Section */}
        <section className="px-6 py-24 ">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-center text-balance">Pricing Questions</h2>
            <p className="text-center text-gray-600 text-lg mb-16">Everything you need to know about our pricing</p>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  q: "How are prices calculated?",
                  a: "Prices are based on weight, distance, delivery speed, and service type. Get instant quotes on our platform.",
                },
                {
                  q: "Do you offer bulk discounts?",
                  a: "Yes, special discounts available for high-volume shipments. Contact our sales team for details.",
                },
                {
                  q: "Are there any hidden charges?",
                  a: "No hidden charges. What you see is what you pay. All fees are completely transparent.",
                },
                {
                  q: "Can I get a custom quote?",
                  a: "Contact our team for customized pricing based on your specific business needs.",
                },
              ].map((item, i) => (
                <Card
                  key={i}
                  className="p-8 border-0 shadow-lg hover:shadow-xl transition"
                >
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{item.q}</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">{item.a}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>

  
    </div>
  )
}

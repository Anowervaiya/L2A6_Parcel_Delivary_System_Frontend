import { Card } from "@/components/ui/card";
import {

  Zap,

  TrendingDown,
  Rocket,
  Lock,
} from "lucide-react";
import { Button } from "../ui/button";

export const services = [
  {
    icon: Zap,
    title: "Same Day Delivery",
    description:
      "Get your packages delivered on the same day with our priority service.",
    features: [
      "Available in major cities",
      "Real-time tracking",
      "Signature on delivery",
    ],
 
  },
  {
    icon: Rocket,
    title: "Express Shipping",
    description:
      "Fast and reliable shipping for urgent deliveries across the country.",
    features: ["Next-day delivery", "24/7 support", "Insurance included"],

  },
  {
    icon: TrendingDown,
    title: "Cost-Effective Delivery",
    description: "Affordable shipping rates without compromising on quality.",
    features: ["Bulk discounts", "Flexible pricing", "No hidden charges"],
 
  },
  {
    icon: Lock,
    title: "Secure Tracking",
    description:
      "Complete visibility and security for your valuable shipments.",
    features: ["GPS tracking", "Photo proof", "Secure packaging"],
    
  },
];

export default function ServicesSection() {
  return (
    <section className="px-6 py-24">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Service</h2>
          <p className="text-lg text-gray-600">Simple and straightforward delivery process</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, i) => {
            const Icon  = service?.icon as any;
            return (
              <Card
                key={i}
                className={`p-8  border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group`}
              >
                <div
                  className={`w-20 h-20 rounded-2xl bg-blue-500  text-white flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-gray-900">
                  {service.title}
                </h2>
                <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-4 mb-8">
                  {service.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white flex items-center justify-center text-sm font-bold">
                        ✓
                      </span>
                      <span className="text-gray-700 font-medium">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full bg-blue-500  text-white hover:opacity-90 py-6 text-lg font-semibold`}
                >
                  Learn More
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

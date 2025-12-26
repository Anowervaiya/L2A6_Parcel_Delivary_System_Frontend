import ServicesSection, { services } from "@/components/sections/services-section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ServicesPage() {
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
              Service
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance leading-tight">
              Our Services
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto text-balance">
              Get your packages delivered on the same day with our priority
              service.{" "}
            </p>
          </div>
        </section>

        {/* Services Grid */}
<section className="px-6 py-24">
      <div className="max-w-6xl mx-auto">
        
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
        {/* Why Choose Us */}
        <section className="px-6 py-24 bg-gradient-to-r from-blue-900/100  to-gray-900 text-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center text-balance">
              Why Choose ParcelCo?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "99.9% Reliability",
                  desc: "On-time delivery guaranteed with our advanced logistics network",
                  icon: "🎯",
                },
                {
                  title: "Transparent Pricing",
                  desc: "Competitive rates with zero hidden charges or surprise fees",
                  icon: "💰",
                },
                {
                  title: "24/7 Support",
                  desc: "Round-the-clock customer support for all your concerns",
                  icon: "📞",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="text-center p-8 rounded-2xl bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition"
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-200 text-lg">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

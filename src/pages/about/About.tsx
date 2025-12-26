import StatsSection from "@/components/sections/stats-section";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Users, Globe, Award, Target } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <section className="px-6 py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-500"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-cyan-500"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <span className="inline-block px-6 py-2 bg-white/10 rounded-full text-sm font-semibold mb-6 backdrop-blur">
            About Us
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance leading-tight">
            About Us
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto text-balance">
            We're Revolutionizing Parcel Delivery who believe delivery should be
            simple, transparent, and reliable. We've helped thousands of
            businesses and individuals ship with confidence.{" "}
          </p>
        </div>
      </section>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 -z-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-block mb-6 px-4 py-2 bg-blue-100 rounded-full">
                <p className="text-sm font-semibold text-blue-700">Our Story</p>
              </div>
              <h1 className="text-3xl md:text-5xl font-black mb-3 text-balance leading-tight text-gray-900">
                We're{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Revolutionizing
                </span>{" "}
                Parcel Delivery
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Built by innovators who believe delivery should be simple,
                transparent, and reliable. We've helped thousands of businesses
                and individuals ship with confidence.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Button className="px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-bold rounded-xl hover:shadow-2xl hover:shadow-blue-500/30 transition-all">
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  className="px-8 py-6 text-lg font-bold border-2 border-blue-300 rounded-xl hover:bg-blue-50 bg-transparent"
                >
                  Schedule Demo
                </Button>
              </div>
            </div>

            <div className="relative  animate-slide-in">
              <img src="about-hero.gif" alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
                <Target className="w-10 h-10" />
                Our Mission
              </h2>
              <p className="text-lg text-blue-50 leading-relaxed mb-6">
                To make parcel delivery accessible, affordable, and transparent
                for everyone. We believe that logistics shouldn't be complicated
                – it should empower businesses and connect people.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-300 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-700 font-bold text-sm">✓</span>
                  </div>
                  <span className="text-blue-100">
                    Simplify the shipping process
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-300 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-700 font-bold text-sm">✓</span>
                  </div>
                  <span className="text-blue-100">
                    Provide real-time transparency
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-300 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-700 font-bold text-sm">✓</span>
                  </div>
                  <span className="text-blue-100">
                    Ensure secure deliveries
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
                <Zap className="w-10 h-10" />
                Our Vision
              </h2>
              <p className="text-lg text-blue-50 leading-relaxed mb-6">
                A world where every package reaches its destination safely, on
                time, and with complete transparency. Where businesses can focus
                on growth and customers can focus on what matters.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-300 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-700 font-bold text-sm">✓</span>
                  </div>
                  <span className="text-blue-100">Global delivery network</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-300 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-700 font-bold text-sm">✓</span>
                  </div>
                  <span className="text-blue-100">
                    Industry-leading reliability
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-300 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-700 font-bold text-sm">✓</span>
                  </div>
                  <span className="text-blue-100">
                    Sustainable delivery practices
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "Excellence",
                desc: "We never compromise on quality or reliability",
              },
              {
                icon: Users,
                title: "Community",
                desc: "We build solutions with our customers",
              },
              {
                icon: Globe,
                title: "Innovation",
                desc: "We embrace new technology and ideas",
              },
              {
                icon: Zap,
                title: "Speed",
                desc: "We deliver fast without sacrificing quality",
              },
            ].map((value, i) => (
              <div
                key={i}
                className="group bg-gradient-to-br  border border-blue-200 rounded-2xl p-8 hover:shadow-xl hover:border-blue-400 transition-all duration-300"
              >
                <value.icon className="w-12 h-12 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-700">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Achievements */}
          <StatsSection />
    
      {/* Why Choose Us */}
    

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-12">
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
            Ready to Experience Excellence?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of businesses trusting us with their deliveries
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-bold rounded-xl hover:shadow-2xl transition-all">
              Start Shipping Today <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 text-lg font-bold rounded-xl hover:bg-blue-50 bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

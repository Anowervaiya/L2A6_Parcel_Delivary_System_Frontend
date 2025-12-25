import { Button } from "@/components/ui/button"

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Send Your Parcel?</h2>
          <p className="text-xl mb-8 text-white/90">
            Get started in under 2 minutes. Fast, reliable, and affordable delivery.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8">
              Get Started Now
            </Button>
            <div className="text-white">
              <p className="font-semibold">Call us anytime</p>
              <p className="text-lg">+880 1700-000-000</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

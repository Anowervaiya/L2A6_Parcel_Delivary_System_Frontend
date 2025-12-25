"use client"

import { Card } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

const faqs = [
  {
    question: "What are your delivery timelines?",
    answer:
      "Our standard delivery is 1-2 business days nationwide. Same-day delivery is available in Dhaka and major cities for an additional charge.",
  },
  {
    question: "How can I track my parcel?",
    answer:
      "You can track your parcel using your tracking number on our website or mobile app. You will also receive real-time SMS and push notifications.",
  },
  {
    question: "Do you offer cash on delivery?",
    answer:
      "Yes, we support cash on delivery (COD) for most locations in Bangladesh. The recipient can pay the delivery person upon receiving the parcel.",
  },
  {
    question: "Is my parcel insured?",
    answer:
      "Basic coverage is included with all deliveries. For high-value items, we offer additional insurance options during booking.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer free returns for damaged parcels within 48 hours of delivery. Returns for other reasons follow the merchant's policy.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can reach our 24/7 customer support via phone, email, live chat, or through our mobile app. We typically respond within 1 hour.",
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">Find answers to common questions</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <Card key={idx} className="overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 text-left">{faq.question}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-gray-600 flex-shrink-0 transition-transform ${openIndex === idx ? "rotate-180" : ""}`}
                />
              </button>

              {openIndex === idx && (
                <div className="px-6 pb-6 border-t border-gray-200">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const partners = ["Amazon", "Daraz", "Ajkerdeal", "Robi", "Banglalink", "Grameenphone", "Robi Axiata", "iFarmer"]

export default function PartnersSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by 500+ Businesses</h2>
          <p className="text-lg text-gray-600">We partner with Bangladesh's leading brands</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {partners.map((partner, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow grayscale hover:grayscale-0"
            >
              <span className="text-xl font-bold text-gray-700">{partner}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}



const About = () => {
  return (
    <div className="px-6 md:px-20 py-12 text-gray-800">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center mb-10">About Us</h1>

      {/* Services Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">🚀 Our Services</h2>
        <p className="text-lg leading-relaxed mb-4">
          The <span className="font-semibold">Parcel Delivery System</span> is a
          modern platform designed to make sending and receiving parcels secure,
          fast, and reliable.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            📦 <strong>Senders</strong> can create and manage parcel requests
            easily.
          </li>
         
          <li>
            👤 <strong>Receivers</strong> confirm delivery, cancel requests, and
            get live updates.
          </li>
          <li>
            🔒 <strong>Admins</strong> manage users, parcels, and system
            operations securely.
          </li>
        </ul>
      </section>

      {/* Mission Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">🎯 Our Mission</h2>
        <blockquote className="italic border-l-4 border-blue-500 pl-4 text-lg mb-4">
          "To make parcel delivery efficient, transparent, and accessible for
          everyone."
        </blockquote>
        <p className="text-lg leading-relaxed">
          We believe sending and receiving parcels should be as easy as sending
          a message. That’s why we focus on:
        </p>
        <ul className="list-disc list-inside space-y-2 mt-2">
          <li>✅ User-friendly design</li>
          <li>✅ Real-time tracking</li>
          <li>✅ Security & Transparency</li>
          <li>✅ Scalability for businesses</li>
        </ul>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">👨‍👩‍👦 Our Team</h2>
        <p className="text-lg leading-relaxed mb-4">
          We’re a team of passionate developers and entrepreneurs who believe in
          solving real-world delivery challenges through technology.
        </p>
        <div className="bg-gray-100 rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-semibold">Anower Hossen</h3>
          <p className="text-gray-600">
            Co-Founder & Developer (Backend + Frontend)
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;

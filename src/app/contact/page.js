import Link from "next/link"

export default function Contact() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow rounded-b-2xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 flex items-center gap-2">
            ✨ SparksWall
          </h1>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-800">
              Ideas
            </Link>
            <Link href="/about" className="hover:text-gray-800">
              About
            </Link>
            <span className="px-2 py-1 rounded-md bg-gray-100">Contact</span>
          </nav>
        </div>
      </header>

      {/* Contact Form */}
      <div className="flex-1 max-w-2xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">📬 Contact Us</h1>
        <p className="text-gray-700 mb-6">
          Got feedback, questions, or just want to say hi? Drop us a message below —
          we’d love to hear from you.
        </p>

        <form className="space-y-4 bg-white shadow-md rounded-xl p-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
            <textarea
              rows="5"
              placeholder="Write your message..."
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-500 text-center py-4 text-sm">
        © {new Date().getFullYear()} SparksWall
      </footer>
    </main>
  )
}

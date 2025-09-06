import Link from "next/link"
import IdeaForm from "../components/IdeaForm"
import IdeasList from "../components/IdeasList"

export default function Page() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow rounded-b-2xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 flex items-center gap-2">
            ✨ SparksWall
          </h1>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
            <span className="px-2 py-1 rounded-md bg-gray-100">Ideas</span>
            <Link href="/about" className="hover:text-gray-800">
              About
            </Link>
            <Link href="/contact" className="hover:text-gray-800">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 max-w-5xl w-full mx-auto px-6 py-10">
        <p className="text-gray-800 text-center text-lg mb-6">
          Your idea becomes tomorrow’s feature ✨ Suggest one below.
        </p>

        <IdeaForm />

        <div className="mt-8">
          <IdeasList />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-500 text-center py-4 text-sm">
        © {new Date().getFullYear()} SparksWall
      </footer>
    </main>
  )
}

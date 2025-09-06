import Link from "next/link"

export default function About() {
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
            <span className="px-2 py-1 rounded-md bg-gray-100">About</span>
            <Link href="/contact" className="hover:text-gray-800">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 max-w-3xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">✨ About SparksWall</h1>

        <p className="text-gray-800 mb-4 leading-relaxed">
          SparksWall is a <span className="font-semibold">living, community-built website</span>.
          Instead of being designed top-down, it grows through <em>your ideas</em>.
        </p>

        <p className="text-gray-800 mb-4 leading-relaxed">
          Anyone can pin a thought to the wall — whether it’s a tiny tweak, a fun feature,
          or a wild experiment. The community can vote, and ideas move through stages:
        </p>

        <ul className="list-disc list-inside text-gray-800 mb-4 leading-relaxed">
          <li><strong>⏳ Pending</strong> — waiting for attention.</li>
          <li><strong>👍 Approved</strong> — selected and on the way.</li>
          <li><strong>✅ Done</strong> — already brought to life (try them out!).</li>
        </ul>

        <p className="text-gray-800 mb-4 leading-relaxed">
          The magic is simple:
        </p>

        <ol className="list-decimal list-inside text-gray-800 mb-4 leading-relaxed">
          <li>You suggest what this site <em>should become</em>.</li>
          <li>The community shapes which ideas matter most.</li>
          <li>Features get built and added to the wall.</li>
        </ol>

        <p className="text-gray-800 mb-4 leading-relaxed">
          Over time, SparksWall becomes a kind of digital playground — a site that designs
          itself, powered by collective creativity. Think of it as a giant sticky-note board
          on the internet, but instead of fading on a wall, your ideas can actually{" "}
          <span className="font-semibold">turn into reality</span>.
        </p>

        <p className="text-gray-900 font-semibold text-lg">
          So don’t just scroll — pin your spark. The next feature could be yours. 🚀
        </p>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-500 text-center py-4 text-sm">
        © {new Date().getFullYear()} SparksWall
      </footer>
    </main>
  )
}

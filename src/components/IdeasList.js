"use client"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import SnakeGame from "./SnakeGame" // <- your pixel game component
import TodoBoard from "./TodoBoard"

const stickyColors = [
  "bg-[#fef3c7]", // pale yellow
  "bg-[#fde68a]", // sticky yellow
  "bg-[#fbcfe8]", // pink
  "bg-[#e9d5ff]", // lavender
  "bg-[#bae6fd]", // light blue
  "bg-[#bbf7d0]", // mint green
]

function getRandomStyle() {
  const color = stickyColors[Math.floor(Math.random() * stickyColors.length)]
  const rotation = Math.floor(Math.random() * 12 - 6) // -6° to +6°
  const pinColor = ["#ef4444", "#3b82f6", "#22c55e", "#f97316"][
    Math.floor(Math.random() * 4)
  ]
  return { color, rotation, pinColor }
}

export default function IdeasList() {
  const [ideas, setIdeas] = useState([])
  const [showGame, setShowGame] = useState(false) // modal toggle
  const [showTodo, setShowTodo] = useState(false)

  useEffect(() => {
    fetchIdeas()

    const channel = supabase
      .channel("ideas-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "ideas" }, (payload) => {
        if (payload.eventType === "INSERT") {
          const style = getRandomStyle()
          setIdeas((prev) => [{ ...payload.new, style }, ...prev])
        } else if (payload.eventType === "UPDATE") {
          setIdeas((prev) =>
            prev.map((idea) =>
              idea.id === payload.new.id ? { ...payload.new, style: idea.style } : idea
            )
          )
        }
      })
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  async function fetchIdeas() {
    const { data, error } = await supabase
      .from("ideas")
      .select("*")
      .order("created_at", { ascending: false })
    if (!error && data) {
      setIdeas(data.map((idea) => ({ ...idea, style: getRandomStyle() })))
    }
  }

  async function voteIdea(id, currentVotes) {
    const votes = (currentVotes ?? 0) + 1
    await supabase.from("ideas").update({ votes }).eq("id", id)
  }

  // handle generic "Try it" button actions
  function handleAction(idea) {
    if (idea.text.toLowerCase().includes("game")) {
      setShowGame(true)
    } else if (idea.text.toLowerCase().includes("to-do")) {
      setShowTodo(true)
    }
  }

  if (!ideas.length) {
    return (
      <div className="text-center text-gray-700">
        No ideas yet. Be the first to add one!
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {ideas.map((idea) => (
          <div
            key={idea.id}
            className={`${idea.style.color} p-4 rounded-md shadow-md relative
                        transition duration-300 hover:-translate-y-1 hover:scale-105
                        animate-fadeInUp`}
            style={{ transform: `rotate(${idea.style.rotation}deg)` }}
          >
            {/* Pin */}
            <span
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full shadow"
              style={{ backgroundColor: idea.style.pinColor }}
            />

            {/* Note text + vote */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-start gap-3">
                <span className="font-medium text-gray-900 leading-relaxed">
                  {idea.text}
                </span>

                <button
                  onClick={() => voteIdea(idea.id, idea.votes)}
                  className="shrink-0 bg-white/80 border px-3 py-1 rounded-full text-sm shadow"
                >
                  👍 {idea.votes ?? 0}
                </button>
              </div>

              {/* Status badge */}
              <span
                className={`inline-block px-2 py-0.5 rounded text-xs font-semibold w-fit
                  ${
                    idea.status === "done"
                      ? "bg-green-100 text-green-800"
                      : idea.status === "approved"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-200 text-gray-700"
                  }`}
              >
                {idea.status === "done"
                  ? "✅ Done"
                  : idea.status === "approved"
                  ? "👍 Approved"
                  : "⏳ Pending"}
              </span>

              {/* Generic action button if implemented */}
              {idea.status === "done" && (
                <button
                  onClick={() => handleAction(idea)}
                  className="bg-blue-500 text-white px-3 py-1 rounded shadow self-start"
                >
                  🚀 Try it
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Snake game modal */}
      {showGame && <SnakeGame onClose={() => setShowGame(false)} />}
      {showTodo && <TodoBoard onClose={() => setShowTodo(false)} />}
    </>
  )
}

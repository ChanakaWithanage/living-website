"use client"
import { useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function IdeaForm() {
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)

  const submitIdea = async (e) => {
    e.preventDefault()
    if (!text.trim()) return
    setLoading(true)

    const { error } = await supabase.from("ideas").insert([{ text }])
    if (!error) setText("")
    setLoading(false)
  }

  return (
    <form onSubmit={submitIdea} className="flex gap-2 my-6">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Suggest a feature..."
        className="flex-1 p-3 rounded-xl border border-gray-300 bg-white shadow-sm
                   focus:ring-2 focus:ring-pink-300 focus:border-pink-400 outline-none"
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-xl px-6 py-2 font-semibold text-white shadow
                   bg-gradient-to-r from-pink-400 to-purple-400
                   hover:from-pink-500 hover:to-purple-500 disabled:opacity-60"
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  )
}

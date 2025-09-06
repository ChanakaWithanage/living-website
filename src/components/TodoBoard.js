"use client"
import { useState, useEffect } from "react"

export default function TodoBoard({ onClose }) {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState("")

  // Load tasks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("todoTasks")
    if (saved) setTasks(JSON.parse(saved))
  }, [])

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("todoTasks", JSON.stringify(tasks))
  }, [tasks])

  const addTask = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    const newTask = {
      id: Date.now(),
      text: input,
      done: false,
    }
    setTasks([newTask, ...tasks])
    setInput("")
  }

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    )
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  const stickyColors = [
    "bg-yellow-200",
    "bg-pink-200",
    "bg-green-200",
    "bg-blue-200",
    "bg-purple-200",
  ]

  const getRandomStyle = () => {
    const color =
      stickyColors[Math.floor(Math.random() * stickyColors.length)]
    const rotation = Math.floor(Math.random() * 10 - 5)
    return { color, rotation }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center z-50 px-4">
      <div className="bg-white p-6 rounded-xl shadow-lg relative w-full max-w-2xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
        >
          ✖
        </button>
        <h2 className="text-xl font-bold mb-4">🗒️ To-Do Sticky Notes</h2>

        {/* Add task form */}
        <form onSubmit={addTask} className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </form>

        {/* Task list */}
        {tasks.length === 0 ? (
          <p className="text-gray-600 text-center">No tasks yet. Add your first note!</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => {
              const style = getRandomStyle()
              return (
                <div
                  key={task.id}
                  className={`${style.color} p-4 rounded shadow relative`}
                  style={{ transform: `rotate(${style.rotation}deg)` }}
                >
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="absolute top-1 right-1 text-red-600 text-xs"
                  >
                    ✖
                  </button>
                  <p
                    onClick={() => toggleTask(task.id)}
                    className={`cursor-pointer ${
                      task.done ? "line-through text-gray-500" : "text-gray-900"
                    }`}
                  >
                    {task.text}
                  </p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

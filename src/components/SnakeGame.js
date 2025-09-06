"use client"
import { useEffect, useRef, useState } from "react"

export default function SnakeGame({ onClose }) {
  const canvasRef = useRef(null)
  const [snake, setSnake] = useState([{ x: 8, y: 8 }])
  const [food, setFood] = useState({ x: 12, y: 12 })
  const [dir, setDir] = useState({ x: 1, y: 0 })
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const size = 20
  const tileCount = 20

  // Reset game
  const resetGame = () => {
    setSnake([{ x: 8, y: 8 }])
    setFood({ x: 12, y: 12 })
    setDir({ x: 1, y: 0 })
    setScore(0)
    setGameOver(false)
  }

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d")

    const interval = setInterval(() => {
      if (gameOver) return

      let newSnake = [...snake]
      let head = { x: newSnake[0].x + dir.x, y: newSnake[0].y + dir.y }

      // Check walls or self-collision
      if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= tileCount ||
        head.y >= tileCount ||
        newSnake.some((s) => s.x === head.x && s.y === head.y)
      ) {
        setGameOver(true)
        return
      }

      newSnake.unshift(head)

      // Check food
      if (head.x === food.x && head.y === food.y) {
        setFood({
          x: Math.floor(Math.random() * tileCount),
          y: Math.floor(Math.random() * tileCount),
        })
        setScore((prev) => prev + 1) // increase score
      } else {
        newSnake.pop()
      }

      setSnake(newSnake)

      // Draw board
      ctx.fillStyle = "#111"
      ctx.fillRect(0, 0, size * tileCount, size * tileCount)

      // Draw snake
      ctx.fillStyle = "lime"
      newSnake.forEach((s) =>
        ctx.fillRect(s.x * size, s.y * size, size - 2, size - 2)
      )

      // Draw food
      ctx.fillStyle = "red"
      ctx.fillRect(food.x * size, food.y * size, size - 2, size - 2)
    }, 120)

    return () => clearInterval(interval)
  }, [snake, dir, food, gameOver])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowUp" && dir.y !== 1) setDir({ x: 0, y: -1 })
      if (e.key === "ArrowDown" && dir.y !== -1) setDir({ x: 0, y: 1 })
      if (e.key === "ArrowLeft" && dir.x !== 1) setDir({ x: -1, y: 0 })
      if (e.key === "ArrowRight" && dir.x !== -1) setDir({ x: 1, y: 0 })
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [dir])

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
        >
          ✖
        </button>
        <h2 className="text-lg font-bold mb-2">🐍 Snake Game</h2>
        <p className="mb-2">Score: <span className="font-bold">{score}</span></p>

        {gameOver && (
          <div className="mb-2 text-center">
            <p className="text-red-600">Game Over!</p>
            <button
              onClick={resetGame}
              className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
            >
              🔄 Restart
            </button>
          </div>
        )}

        <canvas
          ref={canvasRef}
          width={size * tileCount}
          height={size * tileCount}
          className="border"
        />
      </div>
    </div>
  )
}

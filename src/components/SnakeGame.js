"use client"
import { useEffect, useRef, useState } from "react"

export default function SnakeGame({ onClose }) {
  const canvasRef = useRef(null)
  const [snake, setSnake] = useState([{ x: 8, y: 8 }])
  const [food, setFood] = useState({ x: 12, y: 12 })
  const [dir, setDir] = useState({ x: 1, y: 0 })
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [tileSize, setTileSize] = useState(20)

  const tileCount = 20

  // Calculate canvas size dynamically
  const updateCanvasSize = () => {
    const maxCanvas = 400 // max size for desktop
    const width = Math.min(window.innerWidth - 40, maxCanvas)
    setTileSize(Math.floor(width / tileCount))
  }

  // Reset game
  const resetGame = () => {
    setSnake([{ x: 8, y: 8 }])
    setFood({ x: 12, y: 12 })
    setDir({ x: 1, y: 0 })
    setScore(0)
    setGameOver(false)
  }

  useEffect(() => {
    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)
    return () => window.removeEventListener("resize", updateCanvasSize)
  }, [])

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
        setScore((prev) => prev + 1)
      } else {
        newSnake.pop()
      }

      setSnake(newSnake)

      // Draw
      ctx.fillStyle = "#111"
      ctx.fillRect(0, 0, tileSize * tileCount, tileSize * tileCount)

      ctx.fillStyle = "lime"
      newSnake.forEach((s) =>
        ctx.fillRect(s.x * tileSize, s.y * tileSize, tileSize - 2, tileSize - 2)
      )

      ctx.fillStyle = "red"
      ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize - 2, tileSize - 2)
    }, 120)

    return () => clearInterval(interval)
  }, [snake, dir, food, gameOver, tileSize])

  // Keyboard controls
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

  // Touch controls for mobile
  const handleTouch = (direction) => {
    if (direction === "up" && dir.y !== 1) setDir({ x: 0, y: -1 })
    if (direction === "down" && dir.y !== -1) setDir({ x: 0, y: 1 })
    if (direction === "left" && dir.x !== 1) setDir({ x: -1, y: 0 })
    if (direction === "right" && dir.x !== -1) setDir({ x: 1, y: 0 })
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center z-50 px-4">
      <div className="bg-white p-4 rounded shadow-lg relative w-full max-w-md">
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
          width={tileSize * tileCount}
          height={tileSize * tileCount}
          className="border mx-auto"
        />

        {/* Touch controls for mobile */}
        <div className="grid grid-cols-3 gap-2 mt-4 justify-items-center sm:hidden">
          <button onClick={() => handleTouch("up")} className="col-span-3 bg-gray-200 px-4 py-2 rounded">⬆</button>
          <button onClick={() => handleTouch("left")} className="bg-gray-200 px-4 py-2 rounded">⬅</button>
          <div></div>
          <button onClick={() => handleTouch("right")} className="bg-gray-200 px-4 py-2 rounded">➡</button>
          <button onClick={() => handleTouch("down")} className="col-span-3 bg-gray-200 px-4 py-2 rounded">⬇</button>
        </div>
      </div>
    </div>
  )
}

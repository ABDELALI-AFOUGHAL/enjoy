import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const LightsOut = () => {
  const GRID_SIZE = 5
  
  // Initialize grid with random pattern or solved state
  const initializeGrid = (randomStart = true) => {
    if (randomStart) {
      // Create a solvable puzzle by starting with lights off and making random moves
      let grid = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(false))
      
      // Make 10-15 random moves to create a solvable puzzle
      const moves = 10 + Math.floor(Math.random() * 6)
      for (let i = 0; i < moves; i++) {
        const row = Math.floor(Math.random() * GRID_SIZE)
        const col = Math.floor(Math.random() * GRID_SIZE)
        grid = toggleLights(grid, row, col, false) // false = don't count moves
      }
      return grid
    } else {
      // All lights off (solved state)
      return Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(false))
    }
  }

  const [grid, setGrid] = useState(() => initializeGrid(true))
  const [moves, setMoves] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [difficulty, setDifficulty] = useState('medium')

  // Check if game is complete (all lights off)
  useEffect(() => {
    const allOff = grid.every(row => row.every(light => !light))
    setIsComplete(allOff)
  }, [grid])

  // Toggle a light and its neighbors
  const toggleLights = (currentGrid, row, col, countMove = true) => {
    const newGrid = currentGrid.map(r => [...r])
    
    // Define positions to toggle (center + cross pattern)
    const positions = [
      [row, col],           // Center
      [row - 1, col],       // Up
      [row + 1, col],       // Down
      [row, col - 1],       // Left
      [row, col + 1]        // Right
    ]

    // Toggle each valid position
    positions.forEach(([r, c]) => {
      if (r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE) {
        newGrid[r][c] = !newGrid[r][c]
      }
    })

    if (countMove) {
      setMoves(prev => prev + 1)
    }

    return newGrid
  }

  // Handle cell click
  const handleCellClick = (row, col) => {
    if (isComplete) return
    const newGrid = toggleLights(grid, row, col)
    setGrid(newGrid)
  }

  // Reset game
  const resetGame = () => {
    setGrid(initializeGrid(true))
    setMoves(0)
    setIsComplete(false)
  }

  // New game with different difficulty
  const newGame = (diff = difficulty) => {
    setDifficulty(diff)
    
    // Generate puzzle based on difficulty
    let grid = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(false))
    let moveCount = 0
    
    switch (diff) {
      case 'easy':
        moveCount = 5 + Math.floor(Math.random() * 3) // 5-7 moves
        break
      case 'medium':
        moveCount = 8 + Math.floor(Math.random() * 5) // 8-12 moves
        break
      case 'hard':
        moveCount = 13 + Math.floor(Math.random() * 5) // 13-17 moves
        break
      default:
        moveCount = 10
    }
    
    for (let i = 0; i < moveCount; i++) {
      const row = Math.floor(Math.random() * GRID_SIZE)
      const col = Math.floor(Math.random() * GRID_SIZE)
      grid = toggleLights(grid, row, col, false)
    }
    
    setGrid(grid)
    setMoves(0)
    setIsComplete(false)
  }

  // Get optimal move count estimate
  const getOptimalMoves = () => {
    switch (difficulty) {
      case 'easy': return '5-8'
      case 'medium': return '8-15'
      case 'hard': return '15-25'
      default: return '8-15'
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <Link to="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">💡 Lights Out</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Turn off all the lights! Click a light to toggle it and its neighbors (up, down, left, right).
        </p>
      </div>

      {/* Game Stats */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary-600">{moves}</div>
            <div className="text-sm text-gray-600">Moves</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-secondary-600">{getOptimalMoves()}</div>
            <div className="text-sm text-gray-600">Optimal Range</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600 capitalize">{difficulty}</div>
            <div className="text-sm text-gray-600">Difficulty</div>
          </div>
          <div>
            <div className={`text-2xl font-bold ${isComplete ? 'text-green-600' : 'text-gray-400'}`}>
              {isComplete ? '🎉' : '🎯'}
            </div>
            <div className="text-sm text-gray-600">{isComplete ? 'Complete!' : 'Goal'}</div>
          </div>
        </div>
      </div>

      {/* Game Controls */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Difficulty:</label>
            {['easy', 'medium', 'hard'].map((diff) => (
              <button
                key={diff}
                onClick={() => newGame(diff)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors capitalize ${
                  difficulty === diff
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
          <button 
            onClick={resetGame}
            className="btn-secondary text-sm"
          >
            Reset Puzzle
          </button>
          <button 
            onClick={() => newGame()}
            className="btn-primary text-sm"
          >
            New Puzzle
          </button>
          {isComplete && (
            <div className="text-green-600 font-semibold">
              🎉 Solved in {moves} moves!
            </div>
          )}
        </div>
      </div>

      {/* Game Board */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-center">
          <div className="grid grid-cols-5 gap-2 p-4 bg-gray-100 rounded-lg">
            {grid.map((row, rowIndex) =>
              row.map((isOn, colIndex) => (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  disabled={isComplete}
                  className={`w-16 h-16 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                    isOn
                      ? 'bg-yellow-400 border-yellow-500 shadow-lg shadow-yellow-400/50'
                      : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                  } ${isComplete ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {isOn && (
                    <div className="text-2xl">💡</div>
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-3">How to Play:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <ul className="space-y-2">
              <li>• Click any light to toggle it and its neighbors</li>
              <li>• Neighbors are up, down, left, and right (not diagonal)</li>
              <li>• Goal: Turn off all lights (make grid completely dark)</li>
            </ul>
            <ul className="space-y-2">
              <li>• 💡 = Light is ON</li>
              <li>• Dark square = Light is OFF</li>
              <li>• Try to solve in the fewest moves possible</li>
              <li>• Use different difficulties for varied challenges</li>
            </ul>
          </div>
        </div>

        {/* Strategy Tip */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">💡 Strategy Tip:</h4>
          <p className="text-sm text-blue-700">
            Start from the top row and work your way down. Focus on turning off lights 
            in the top rows by clicking on the row below them. The bottom row strategy 
            is key to solving the puzzle!
          </p>
        </div>
      </div>
    </div>
  )
}

export default LightsOut

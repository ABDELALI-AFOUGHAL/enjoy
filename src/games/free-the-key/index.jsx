import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

const FreeTheKey = () => {
  // Game board: 0 = empty, 1 = wall, 2 = movable block, 3 = key, 4 = exit
  const [board, setBoard] = useState([
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 2, 0, 0, 0, 1],
    [1, 0, 2, 2, 2, 0, 0, 1],
    [1, 0, 0, 2, 0, 0, 0, 1],
    [1, 2, 0, 3, 0, 2, 0, 1],
    [1, 0, 0, 2, 0, 0, 0, 1],
    [1, 0, 0, 0, 2, 2, 4, 1],
    [1, 1, 1, 1, 1, 1, 1, 1]
  ])

  const [keyPosition, setKeyPosition] = useState({ x: 3, y: 4 })
  const [moves, setMoves] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [selectedBlock, setSelectedBlock] = useState(null)
  const [level, setLevel] = useState(1)

  const levels = {
    1: {
      name: "Beginner",
      board: [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 2, 2, 2, 0, 0, 1],
        [1, 0, 0, 2, 0, 0, 0, 1],
        [1, 2, 0, 3, 0, 2, 0, 1],
        [1, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 2, 4, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
      ],
      keyPos: { x: 3, y: 4 }
    },
    2: {
      name: "Intermediate",
      board: [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 0, 1],
        [1, 0, 0, 0, 0, 2, 0, 1],
        [1, 0, 2, 3, 2, 0, 0, 1],
        [1, 0, 2, 0, 2, 0, 0, 1],
        [1, 0, 0, 0, 0, 2, 0, 1],
        [1, 4, 2, 2, 2, 2, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
      ],
      keyPos: { x: 3, y: 3 }
    },
    3: {
      name: "Expert",
      board: [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 2, 0, 0, 2, 0, 1],
        [1, 2, 2, 2, 2, 2, 2, 1],
        [1, 0, 2, 0, 0, 2, 0, 1],
        [1, 0, 2, 3, 2, 2, 0, 1],
        [1, 0, 2, 2, 2, 0, 0, 1],
        [1, 4, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
      ],
      keyPos: { x: 3, y: 4 }
    }
  }

  // Find exit position
  const findExit = useCallback(() => {
    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        if (board[y][x] === 4) {
          return { x, y }
        }
      }
    }
    return null
  }, [board])

  // Check if key reached the exit
  useEffect(() => {
    const exit = findExit()
    if (exit && keyPosition.x === exit.x && keyPosition.y === exit.y) {
      setIsComplete(true)
    }
  }, [keyPosition, findExit])

  // Reset game to current level
  const resetGame = () => {
    const currentLevel = levels[level]
    setBoard(currentLevel.board.map(row => [...row]))
    setKeyPosition({ ...currentLevel.keyPos })
    setMoves(0)
    setIsComplete(false)
    setSelectedBlock(null)
  }

  // Change level
  const changeLevel = (newLevel) => {
    setLevel(newLevel)
    const levelData = levels[newLevel]
    setBoard(levelData.board.map(row => [...row]))
    setKeyPosition({ ...levelData.keyPos })
    setMoves(0)
    setIsComplete(false)
    setSelectedBlock(null)
  }

  // Handle cell click
  const handleCellClick = (x, y) => {
    if (isComplete) return

    if (board[y][x] === 2) {
      // Select/deselect block
      if (selectedBlock && selectedBlock.x === x && selectedBlock.y === y) {
        setSelectedBlock(null)
      } else {
        setSelectedBlock({ x, y })
      }
    } else if (selectedBlock && board[y][x] === 0) {
      // Move selected block to empty space
      moveBlock(selectedBlock.x, selectedBlock.y, x, y)
    }
  }

  // Move block
  const moveBlock = (fromX, fromY, toX, toY) => {
    // Check if move is valid (adjacent and not diagonal)
    const dx = Math.abs(toX - fromX)
    const dy = Math.abs(toY - fromY)
    
    if ((dx === 1 && dy === 0) || (dx === 0 && dy === 1)) {
      const newBoard = board.map(row => [...row])
      newBoard[fromY][fromX] = 0
      newBoard[toY][toX] = 2
      
      setBoard(newBoard)
      setSelectedBlock(null)
      setMoves(moves + 1)
      
      // Check if key path is now clear
      checkKeyMovement()
    }
  }

  // Check if key can move towards exit
  const checkKeyMovement = () => {
    const exit = findExit()
    if (!exit) return

    // Simple pathfinding - move key towards exit if path is clear
    const dx = exit.x - keyPosition.x
    const dy = exit.y - keyPosition.y

    let newKeyPos = { ...keyPosition }

    // Move horizontally first, then vertically
    if (dx !== 0) {
      const nextX = keyPosition.x + (dx > 0 ? 1 : -1)
      if (board[keyPosition.y][nextX] === 0 || board[keyPosition.y][nextX] === 4) {
        newKeyPos.x = nextX
      }
    } else if (dy !== 0) {
      const nextY = keyPosition.y + (dy > 0 ? 1 : -1)
      if (board[nextY] && (board[nextY][keyPosition.x] === 0 || board[nextY][keyPosition.x] === 4)) {
        newKeyPos.y = nextY
      }
    }

    if (newKeyPos.x !== keyPosition.x || newKeyPos.y !== keyPosition.y) {
      setTimeout(() => {
        setKeyPosition(newKeyPos)
      }, 300)
    }
  }

  // Get cell content for display
  const getCellContent = (x, y) => {
    if (keyPosition.x === x && keyPosition.y === y) {
      return { symbol: '🔑', color: 'text-yellow-500' }
    }
    
    switch (board[y][x]) {
      case 1:
        return { symbol: '🧱', color: 'text-gray-600' }
      case 2:
        return { symbol: '📦', color: 'text-amber-600' }
      case 4:
        return { symbol: '🚪', color: 'text-green-600' }
      default:
        return { symbol: '', color: '' }
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">🔑 Free the Key</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Move the blocks to clear a path for the key to reach the exit door. Plan your moves carefully!
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
            <div className="text-2xl font-bold text-secondary-600">{levels[level].name}</div>
            <div className="text-sm text-gray-600">Level</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {selectedBlock ? '📦' : '○'}
            </div>
            <div className="text-sm text-gray-600">Selected</div>
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
            <label className="text-sm font-medium text-gray-700">Level:</label>
            {Object.entries(levels).map(([levelNum, levelData]) => (
              <button
                key={levelNum}
                onClick={() => changeLevel(parseInt(levelNum))}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  level === parseInt(levelNum)
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {levelData.name}
              </button>
            ))}
          </div>
          <button 
            onClick={resetGame}
            className="btn-secondary text-sm"
          >
            Reset Level
          </button>
          {isComplete && (
            <div className="text-green-600 font-semibold">
              🎉 Level completed in {moves} moves!
            </div>
          )}
        </div>
      </div>

      {/* Game Board */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-center">
          <div className="grid grid-cols-8 gap-1 p-4 bg-gray-100 rounded-lg">
            {board.map((row, y) =>
              row.map((cell, x) => {
                const content = getCellContent(x, y)
                const isSelected = selectedBlock && selectedBlock.x === x && selectedBlock.y === y
                const isMovable = cell === 2
                const isEmpty = cell === 0 && keyPosition.x !== x && keyPosition.y !== y
                
                return (
                  <div
                    key={`${x}-${y}`}
                    className={`w-12 h-12 flex items-center justify-center text-xl cursor-pointer transition-all duration-200 rounded ${
                      isSelected 
                        ? 'bg-blue-200 ring-2 ring-blue-400' 
                        : isMovable 
                        ? 'bg-amber-100 hover:bg-amber-200' 
                        : isEmpty && selectedBlock
                        ? 'bg-green-100 hover:bg-green-200'
                        : cell === 1 
                        ? 'bg-gray-300'
                        : cell === 4
                        ? 'bg-green-200'
                        : 'bg-white'
                    }`}
                    onClick={() => handleCellClick(x, y)}
                  >
                    <span className={content.color}>{content.symbol}</span>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-3">Legend:</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-xl">🔑</span>
              <span>Key</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xl">📦</span>
              <span>Movable Block</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xl">🧱</span>
              <span>Wall</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xl">🚪</span>
              <span>Exit</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-white border rounded"></div>
              <span>Empty Space</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">How to Play:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Click on a box (📦) to select it</li>
            <li>• Click on an empty space to move the selected box</li>
            <li>• Boxes can only move to adjacent empty spaces (not diagonal)</li>
            <li>• Clear a path for the key (🔑) to reach the exit door (🚪)</li>
            <li>• The key will automatically move towards the exit when possible</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default FreeTheKey

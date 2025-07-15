import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const TowerOfHanoi = () => {
  const [towers, setTowers] = useState([
    [3, 2, 1], // Tower A - starting with 3 disks
    [],        // Tower B - empty
    []         // Tower C - empty
  ])
  const [selectedTower, setSelectedTower] = useState(null)
  const [moves, setMoves] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [diskCount, setDiskCount] = useState(3)

  // Check if game is complete (all disks on tower C)
  useEffect(() => {
    if (towers[2].length === diskCount && towers[2].every((disk, index) => disk === diskCount - index)) {
      setIsComplete(true)
    }
  }, [towers, diskCount])

  // Reset game
  const resetGame = (numDisks = diskCount) => {
    const initialTower = Array.from({ length: numDisks }, (_, i) => numDisks - i)
    setTowers([initialTower, [], []])
    setSelectedTower(null)
    setMoves(0)
    setIsComplete(false)
    setDiskCount(numDisks)
  }

  // Handle tower click
  const handleTowerClick = (towerIndex) => {
    if (isComplete) return

    if (selectedTower === null) {
      // Select a tower (if it has disks)
      if (towers[towerIndex].length > 0) {
        setSelectedTower(towerIndex)
      }
    } else {
      // Move disk from selected tower to clicked tower
      if (selectedTower === towerIndex) {
        // Deselect if clicking the same tower
        setSelectedTower(null)
      } else {
        moveDisk(selectedTower, towerIndex)
        setSelectedTower(null)
      }
    }
  }

  // Move disk between towers
  const moveDisk = (fromTower, toTower) => {
    const newTowers = [...towers]
    const disk = newTowers[fromTower][newTowers[fromTower].length - 1]
    const topDiskOnTarget = newTowers[toTower][newTowers[toTower].length - 1]

    // Check if move is valid (smaller disk on larger disk or empty tower)
    if (topDiskOnTarget === undefined || disk < topDiskOnTarget) {
      newTowers[fromTower].pop()
      newTowers[toTower].push(disk)
      setTowers(newTowers)
      setMoves(moves + 1)
    }
  }

  // Get disk color based on size
  const getDiskColor = (size) => {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500']
    return colors[size - 1] || 'bg-gray-500'
  }

  // Calculate minimum moves required
  const minMoves = Math.pow(2, diskCount) - 1

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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">🗼 Tower of Hanoi</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Move all disks from the left tower to the right tower. You can only move one disk at a time, 
          and you cannot place a larger disk on top of a smaller one.
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
            <div className="text-2xl font-bold text-secondary-600">{minMoves}</div>
            <div className="text-sm text-gray-600">Minimum Moves</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{diskCount}</div>
            <div className="text-sm text-gray-600">Disks</div>
          </div>
          <div>
            <div className={`text-2xl font-bold ${isComplete ? 'text-green-600' : 'text-gray-400'}`}>
              {isComplete ? '✓' : '○'}
            </div>
            <div className="text-sm text-gray-600">Complete</div>
          </div>
        </div>
      </div>

      {/* Game Controls */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Disks:</label>
            <select 
              value={diskCount} 
              onChange={(e) => resetGame(parseInt(e.target.value))}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
            >
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <button 
            onClick={() => resetGame()}
            className="btn-secondary text-sm"
          >
            Reset Game
          </button>
          {isComplete && (
            <div className="text-green-600 font-semibold">
              🎉 Congratulations! You completed it in {moves} moves!
            </div>
          )}
        </div>
      </div>

      {/* Game Board */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="grid grid-cols-3 gap-8">
          {towers.map((tower, towerIndex) => (
            <div 
              key={towerIndex}
              className={`relative cursor-pointer transition-all duration-200 ${
                selectedTower === towerIndex ? 'transform scale-105' : ''
              }`}
              onClick={() => handleTowerClick(towerIndex)}
            >
              {/* Tower Label */}
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Tower {String.fromCharCode(65 + towerIndex)}
                </h3>
                {selectedTower === towerIndex && (
                  <div className="text-sm text-primary-600 font-medium">Selected</div>
                )}
              </div>

              {/* Tower Base */}
              <div className="relative h-64 flex flex-col-reverse items-center">
                {/* Tower Rod */}
                <div className="absolute bottom-0 w-2 h-full bg-gray-600 rounded-t-full"></div>
                <div className="w-full h-4 bg-gray-700 rounded-lg mb-2"></div>

                {/* Disks */}
                <div className="absolute bottom-6 flex flex-col-reverse items-center">
                  {tower.map((disk, diskIndex) => (
                    <div
                      key={diskIndex}
                      className={`h-6 rounded-lg mb-1 transition-all duration-300 ${getDiskColor(disk)} shadow-lg`}
                      style={{ 
                        width: `${60 + disk * 20}px`,
                        zIndex: diskIndex + 1
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">How to Play:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Click on a tower to select it (must have disks)</li>
            <li>• Click on another tower to move the top disk there</li>
            <li>• You cannot place a larger disk on a smaller disk</li>
            <li>• Goal: Move all disks to Tower C</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TowerOfHanoi

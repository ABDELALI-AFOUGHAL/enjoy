import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const TowerOfHanoi = () => {
  const [towers, setTowers] = useState([
    [3, 2, 1], // Tower A - starting with 3 disks
    [],        // Tower B - empty
    []         // Tower C - empty
  ])
  const [moves, setMoves] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [diskCount, setDiskCount] = useState(3)
  const [draggedDisk, setDraggedDisk] = useState(null)
  const [draggedFromTower, setDraggedFromTower] = useState(null)
  const [dragOverTower, setDragOverTower] = useState(null)

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
    setMoves(0)
    setIsComplete(false)
    setDiskCount(numDisks)
    setDraggedDisk(null)
    setDraggedFromTower(null)
    setDragOverTower(null)
  }

  // Handle drag start
  const handleDragStart = (e, towerIndex) => {
    if (isComplete) return
    
    const tower = towers[towerIndex]
    if (tower.length === 0) return
    
    const topDisk = tower[tower.length - 1]
    setDraggedDisk(topDisk)
    setDraggedFromTower(towerIndex)
    
    // Set drag effect
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', '')
  }

  // Handle drag over
  const handleDragOver = (e, towerIndex) => {
    e.preventDefault()
    if (draggedFromTower === null) return
    
    setDragOverTower(towerIndex)
    
    // Check if drop is valid
    const targetTower = towers[towerIndex]
    const topDiskOnTarget = targetTower[targetTower.length - 1]
    
    if (topDiskOnTarget === undefined || draggedDisk < topDiskOnTarget) {
      e.dataTransfer.dropEffect = 'move'
    } else {
      e.dataTransfer.dropEffect = 'none'
    }
  }

  // Handle drag leave
  const handleDragLeave = () => {
    setDragOverTower(null)
  }

  // Handle drop
  const handleDrop = (e, towerIndex) => {
    e.preventDefault()
    setDragOverTower(null)
    
    if (draggedFromTower === null || draggedFromTower === towerIndex) {
      setDraggedDisk(null)
      setDraggedFromTower(null)
      return
    }
    
    moveDisk(draggedFromTower, towerIndex)
    setDraggedDisk(null)
    setDraggedFromTower(null)
  }

  // Handle drag end
  const handleDragEnd = () => {
    setDraggedDisk(null)
    setDraggedFromTower(null)
    setDragOverTower(null)
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
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-orange-500'
    ]
    return colors[size - 1] || 'bg-gray-500'
  }

  // Calculate minimum moves required (2^n - 1)
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
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value={3}>3 (Easy)</option>
              <option value={4}>4 (Medium)</option>
              <option value={5}>5 (Hard)</option>
              <option value={6}>6 (Expert)</option>
              <option value={7}>7 (Master)</option>
              <option value={8}>8 (Extreme)</option>
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
              {moves === minMoves && <span className="text-green-700"> (Perfect!)</span>}
            </div>
          )}
        </div>
        
        {/* Difficulty Info */}
        <div className="mt-4 text-center">
          <div className="text-sm text-gray-600">
            Minimum moves required: <span className="font-semibold text-primary-600">{minMoves}</span>
            {moves > 0 && (
              <span className="ml-4">
                Efficiency: <span className={`font-semibold ${
                  moves <= minMoves ? 'text-green-600' : 
                  moves <= minMoves * 1.5 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {Math.round((minMoves / moves) * 100)}%
                </span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Game Board */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="grid grid-cols-3 gap-8">
          {towers.map((tower, towerIndex) => (
            <div 
              key={towerIndex}
              className="relative"
              onDragOver={(e) => handleDragOver(e, towerIndex)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, towerIndex)}
            >
              {/* Tower Label */}
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Tower {String.fromCharCode(65 + towerIndex)}
                </h3>
              </div>

              {/* Tower Base */}
              <div className="relative h-80 flex flex-col-reverse items-center">
                {/* Tower Rod */}
                <div className="absolute bottom-0 w-3 h-full bg-gray-600 rounded-t-full"></div>
                <div className="w-full h-6 bg-gray-700 rounded-lg mb-2"></div>

                {/* Disks */}
                <div className="absolute bottom-8 flex flex-col-reverse items-center">
                  {tower.map((disk, diskIndex) => {
                    const isTopDisk = diskIndex === tower.length - 1
                    const isDragging = draggedDisk === disk && draggedFromTower === towerIndex
                    
                    return (
                      <div
                        key={`${towerIndex}-${diskIndex}-${disk}`}
                        className={`h-8 rounded-lg mb-1 transition-all duration-300 ${getDiskColor(disk)} shadow-lg border-2 border-gray-300 ${
                          isTopDisk && !isComplete ? 'cursor-grab' : ''
                        } ${isDragging ? 'opacity-50' : ''}`}
                        style={{ 
                          width: `${40 + disk * 15}px`,
                          zIndex: diskIndex + 1
                        }}
                        draggable={isTopDisk && !isComplete}
                        onDragStart={(e) => handleDragStart(e, towerIndex)}
                        onDragEnd={handleDragEnd}
                      >
                        {/* Disk Label */}
                        <div className="flex items-center justify-center h-full text-white font-bold text-sm">
                          {disk}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-3">How to Play:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <ul className="space-y-2">
              <li>• <strong>Drag and Drop:</strong> Drag the top disk from any tower to another</li>
              <li>• <strong>Rule:</strong> You cannot place a larger disk on a smaller disk</li>
              <li>• <strong>Goal:</strong> Move all disks to Tower C (rightmost)</li>
            </ul>
            <ul className="space-y-2">
              <li>• <strong>Strategy:</strong> Use Tower B as temporary storage</li>
              <li>• <strong>Minimum Moves:</strong> Try to complete in {minMoves} moves</li>
              <li>• <strong>Difficulty:</strong> Each additional disk doubles the complexity</li>
            </ul>
          </div>
        </div>

        {/* Pro Tips */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tips:</h4>
          <div className="text-sm text-blue-700 space-y-1">
            <p>• For optimal solution: Move the smallest disk every other turn</p>
            <p>• The smallest disk moves in the same direction throughout the game</p>
            <p>• For odd number of disks: move clockwise (A→C→B→A)</p>
            <p>• For even number of disks: move counter-clockwise (A→B→C→A)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TowerOfHanoi

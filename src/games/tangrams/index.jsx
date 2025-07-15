import { useState } from 'react'
import { Link } from 'react-router-dom'

const Tangrams = () => {
  const [selectedPiece, setSelectedPiece] = useState(null)
  const [pieces, setPieces] = useState([
    // Initial positions for 7 tangram pieces
    { id: 1, type: 'large-triangle', x: 50, y: 50, rotation: 0, color: '#ef4444' },
    { id: 2, type: 'large-triangle', x: 120, y: 50, rotation: 0, color: '#3b82f6' },
    { id: 3, type: 'medium-triangle', x: 190, y: 50, rotation: 0, color: '#10b981' },
    { id: 4, type: 'small-triangle', x: 260, y: 50, rotation: 0, color: '#f59e0b' },
    { id: 5, type: 'small-triangle', x: 330, y: 50, rotation: 0, color: '#8b5cf6' },
    { id: 6, type: 'square', x: 400, y: 50, rotation: 0, color: '#ec4899' },
    { id: 7, type: 'parallelogram', x: 470, y: 50, rotation: 0, color: '#06b6d4' }
  ])
  const [target, setTarget] = useState('house') // Current target shape

  const targets = {
    house: 'House',
    cat: 'Cat',
    bird: 'Bird',
    fish: 'Fish'
  }

  // Handle piece selection and movement
  const handlePieceClick = (piece) => {
    setSelectedPiece(selectedPiece === piece.id ? null : piece.id)
  }

  // Rotate selected piece
  const rotatePiece = () => {
    if (selectedPiece) {
      setPieces(pieces.map(piece => 
        piece.id === selectedPiece 
          ? { ...piece, rotation: (piece.rotation + 45) % 360 }
          : piece
      ))
    }
  }

  // Reset pieces to original positions
  const resetPieces = () => {
    setPieces([
      { id: 1, type: 'large-triangle', x: 50, y: 50, rotation: 0, color: '#ef4444' },
      { id: 2, type: 'large-triangle', x: 120, y: 50, rotation: 0, color: '#3b82f6' },
      { id: 3, type: 'medium-triangle', x: 190, y: 50, rotation: 0, color: '#10b981' },
      { id: 4, type: 'small-triangle', x: 260, y: 50, rotation: 0, color: '#f59e0b' },
      { id: 5, type: 'small-triangle', x: 330, y: 50, rotation: 0, color: '#8b5cf6' },
      { id: 6, type: 'square', x: 400, y: 50, rotation: 0, color: '#ec4899' },
      { id: 7, type: 'parallelogram', x: 470, y: 50, rotation: 0, color: '#06b6d4' }
    ])
    setSelectedPiece(null)
  }

  // Move piece with arrow keys or drag
  const movePiece = (direction) => {
    if (!selectedPiece) return
    
    const moveDistance = 10
    setPieces(pieces.map(piece => {
      if (piece.id === selectedPiece) {
        let newX = piece.x
        let newY = piece.y
        
        switch (direction) {
          case 'up': newY -= moveDistance; break
          case 'down': newY += moveDistance; break
          case 'left': newX -= moveDistance; break
          case 'right': newX += moveDistance; break
        }
        
        return { ...piece, x: newX, y: newY }
      }
      return piece
    }))
  }

  // Get piece size based on type
  const getPieceSize = (type) => {
    switch (type) {
      case 'large-triangle': return 60
      case 'medium-triangle': return 45
      case 'small-triangle': return 30
      case 'square': return 40
      case 'parallelogram': return 50
      default: return 40
    }
  }

  // Get piece shape
  const getPieceShape = (type) => {
    switch (type) {
      case 'large-triangle':
      case 'medium-triangle':
      case 'small-triangle':
        return '△'
      case 'square':
        return '■'
      case 'parallelogram':
        return '▱'
      default:
        return '■'
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <Link to="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">🔷 Tangrams</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Arrange the seven geometric pieces to form the target shape. Use all pieces without overlapping!
        </p>
      </div>

      {/* Game Controls */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Target Shape</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(targets).map(([key, name]) => (
                <button
                  key={key}
                  onClick={() => setTarget(key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    target === key 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Controls</h3>
            <div className="space-y-2">
              <button 
                onClick={rotatePiece}
                disabled={!selectedPiece}
                className="btn-secondary mr-2 disabled:opacity-50"
              >
                Rotate Piece
              </button>
              <button 
                onClick={resetPieces}
                className="btn-secondary"
              >
                Reset Pieces
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Piece Info */}
      {selectedPiece && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-blue-800">
              Selected: Piece {selectedPiece} ({pieces.find(p => p.id === selectedPiece)?.type})
            </span>
            <div className="flex space-x-2">
              <button onClick={() => movePiece('up')} className="p-2 bg-blue-200 rounded hover:bg-blue-300">↑</button>
              <button onClick={() => movePiece('down')} className="p-2 bg-blue-200 rounded hover:bg-blue-300">↓</button>
              <button onClick={() => movePiece('left')} className="p-2 bg-blue-200 rounded hover:bg-blue-300">←</button>
              <button onClick={() => movePiece('right')} className="p-2 bg-blue-200 rounded hover:bg-blue-300">→</button>
            </div>
          </div>
        </div>
      )}

      {/* Game Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Target Shape Display */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            Target: {targets[target]}
          </h3>
          <div className="aspect-square bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
            <div className="text-6xl text-gray-400">
              {target === 'house' && '🏠'}
              {target === 'cat' && '🐱'}
              {target === 'bird' && '🐦'}
              {target === 'fish' && '🐟'}
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4 text-center">
            Use all 7 pieces to recreate this shape
          </p>
        </div>

        {/* Tangram Pieces Area */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Tangram Pieces</h3>
          <div 
            className="relative aspect-square bg-gray-50 rounded-lg border overflow-hidden"
            style={{ height: '400px' }}
          >
            {pieces.map((piece) => (
              <div
                key={piece.id}
                className={`absolute cursor-pointer transition-all duration-200 flex items-center justify-center font-bold text-white shadow-lg ${
                  selectedPiece === piece.id ? 'ring-4 ring-blue-400 ring-opacity-50 z-10' : ''
                }`}
                style={{
                  left: `${piece.x}px`,
                  top: `${piece.y}px`,
                  width: `${getPieceSize(piece.type)}px`,
                  height: `${getPieceSize(piece.type)}px`,
                  backgroundColor: piece.color,
                  transform: `rotate(${piece.rotation}deg)`,
                  borderRadius: piece.type === 'square' ? '4px' : '0',
                }}
                onClick={() => handlePieceClick(piece)}
              >
                <span className="text-lg select-none">
                  {getPieceShape(piece.type)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
        <h4 className="font-semibold text-gray-900 mb-4">How to Play:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <ul className="space-y-2">
            <li>• Click on a piece to select it</li>
            <li>• Use the Rotate button to rotate selected piece</li>
            <li>• Use arrow buttons to move selected piece</li>
            <li>• Try to recreate the target shape</li>
          </ul>
          <ul className="space-y-2">
            <li>• Use all 7 pieces in your solution</li>
            <li>• Pieces cannot overlap</li>
            <li>• Switch between different target shapes</li>
            <li>• Reset pieces to start over</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Tangrams

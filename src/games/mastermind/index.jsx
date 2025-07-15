import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Mastermind = () => {
  const COLORS = ['🔴', '🟡', '🟢', '🔵', '🟣', '🟠', '🟤', '⚫', '⚪', '🟰']
  const MAX_ATTEMPTS = 12

  // Game settings
  const [codeLength, setCodeLength] = useState(4)
  const [allowRepeats, setAllowRepeats] = useState(true)
  const [gameStarted, setGameStarted] = useState(false)

  // Generate random secret code
  const generateSecretCode = (length = codeLength, repeats = allowRepeats) => {
    if (repeats) {
      // Allow repeated colors
      return Array.from({ length }, () => 
        COLORS[Math.floor(Math.random() * COLORS.length)]
      )
    } else {
      // No repeated colors - ensure we have enough colors
      const availableColors = [...COLORS]
      const code = []
      
      for (let i = 0; i < length; i++) {
        if (availableColors.length === 0) {
          // If we run out of colors, allow repeats for remaining positions
          availableColors.push(...COLORS)
        }
        const randomIndex = Math.floor(Math.random() * availableColors.length)
        code.push(availableColors[randomIndex])
        availableColors.splice(randomIndex, 1) // Remove used color
      }
      
      return code
    }
  }

  const [secretCode, setSecretCode] = useState(() => generateSecretCode())
  const [currentGuess, setCurrentGuess] = useState(Array(codeLength).fill(''))
  const [guessHistory, setGuessHistory] = useState([])
  const [isComplete, setIsComplete] = useState(false)
  const [isWon, setIsWon] = useState(false)
  const [showCode, setShowCode] = useState(false)

  // Update current guess array when code length changes
  useEffect(() => {
    setCurrentGuess(Array(codeLength).fill(''))
  }, [codeLength])

  // Check if game is complete
  useEffect(() => {
    if (guessHistory.length >= MAX_ATTEMPTS && !isWon) {
      setIsComplete(true)
      setShowCode(true)
    }
  }, [guessHistory.length, isWon])

  // Calculate feedback for a guess
  const calculateFeedback = (guess, secret) => {
    let correctPosition = 0 // Black pegs
    let correctColor = 0    // White pegs
    
    const secretCopy = [...secret]
    const guessCopy = [...guess]
    
    // First pass: count correct positions
    for (let i = 0; i < CODE_LENGTH; i++) {
      if (guessCopy[i] === secretCopy[i]) {
        correctPosition++
        secretCopy[i] = null // Mark as used
        guessCopy[i] = null  // Mark as used
      }
    }
    
    // Second pass: count correct colors in wrong positions
    for (let i = 0; i < CODE_LENGTH; i++) {
      if (guessCopy[i] !== null) {
        const colorIndex = secretCopy.indexOf(guessCopy[i])
        if (colorIndex !== -1) {
          correctColor++
          secretCopy[colorIndex] = null // Mark as used
        }
      }
    }
    
    return { correctPosition, correctColor }
  }

  // Handle color selection
  const handleColorSelect = (position, color) => {
    if (isComplete) return
    
    const newGuess = [...currentGuess]
    newGuess[position] = color
    setCurrentGuess(newGuess)
  }

  // Clear position
  const clearPosition = (position) => {
    if (isComplete) return
    
    const newGuess = [...currentGuess]
    newGuess[position] = ''
    setCurrentGuess(newGuess)
  }

  // Submit guess
  const submitGuess = () => {
    if (currentGuess.some(color => color === '') || isComplete) return
    
    const feedback = calculateFeedback(currentGuess, secretCode)
    const newGuessEntry = {
      guess: [...currentGuess],
      feedback
    }
    
    const newHistory = [...guessHistory, newGuessEntry]
    setGuessHistory(newHistory)
    
    // Check if won
    if (feedback.correctPosition === CODE_LENGTH) {
      setIsWon(true)
      setIsComplete(true)
      setShowCode(true)
    }
    
    // Clear current guess for next attempt
    setCurrentGuess(Array(CODE_LENGTH).fill(''))
  }

  // Reset game
  const resetGame = () => {
    setSecretCode(generateSecretCode())
    setCurrentGuess(Array(codeLength).fill(''))
    setGuessHistory([])
    setIsComplete(false)
    setIsWon(false)
    setShowCode(false)
  }

  // Get remaining attempts
  const remainingAttempts = MAX_ATTEMPTS - guessHistory.length

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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">🧠 Mastermind</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Crack the secret code! Guess the correct sequence of colors. Get feedback after each guess.
        </p>
      </div>

      {/* Game Stats */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary-600">{guessHistory.length}</div>
            <div className="text-sm text-gray-600">Attempts Used</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-secondary-600">{remainingAttempts}</div>
            <div className="text-sm text-gray-600">Attempts Left</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{codeLength}</div>
            <div className="text-sm text-gray-600">Code Length</div>
          </div>
          <div>
            <div className={`text-2xl font-bold ${isWon ? 'text-green-600' : isComplete ? 'text-red-600' : 'text-gray-400'}`}>
              {isWon ? '🎉' : isComplete ? '❌' : '🎯'}
            </div>
            <div className="text-sm text-gray-600">
              {isWon ? 'Won!' : isComplete ? 'Lost' : 'Playing'}
            </div>
          </div>
        </div>
      </div>

      {/* Game Settings */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Game Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Game Mode
            </label>
            <select
              value={gameMode}
              onChange={(e) => setGameMode(e.target.value)}
              disabled={guessHistory.length > 0}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="classic">Classic (Repeated Colors)</option>
              <option value="challenge">Challenge (Unique Colors)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Code Length
            </label>
            <select
              value={codeLength}
              onChange={(e) => setCodeLength(Number(e.target.value))}
              disabled={guessHistory.length > 0}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value={3}>3 Colors</option>
              <option value={4}>4 Colors</option>
              <option value={5}>5 Colors</option>
              <option value={6}>6 Colors</option>
            </select>
          </div>
        </div>
        {guessHistory.length > 0 && (
          <p className="text-sm text-gray-500 mt-4 text-center">
            ⚠️ Settings can't be changed during a game. Reset to modify.
          </p>
        )}
      </div>

      {/* Secret Code (shown when game is complete) */}
      {showCode && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-l-4 border-primary-500">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            🔍 Secret Code: {isWon ? 'You cracked it!' : 'Better luck next time!'}
          </h3>
          <div className="flex justify-center space-x-2">
            {secretCode.map((color, index) => (
              <div key={index} className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-2xl bg-white shadow-md">
                {color}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Current Guess Area */}
      {!isComplete && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Your Guess #{guessHistory.length + 1}
          </h3>
          
          {/* Guess slots */}
          <div className="flex justify-center space-x-4 mb-6">
            {currentGuess.map((color, index) => (
              <div key={index} className="relative">
                <button
                  onClick={() => clearPosition(index)}
                  className={`w-16 h-16 rounded-full border-4 border-dashed border-gray-300 flex items-center justify-center text-3xl transition-all duration-200 hover:border-primary-400 ${
                    color ? 'border-solid border-gray-400 bg-white shadow-lg' : 'bg-gray-50'
                  }`}
                >
                  {color || '?'}
                </button>
                {color && (
                  <button
                    onClick={() => clearPosition(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Color palette */}
          <div className="flex justify-center space-x-2 mb-6">
            {COLORS.map((color, index) => (
              <button
                key={index}
                onClick={() => {
                  const emptyIndex = currentGuess.findIndex(c => c === '')
                  if (emptyIndex !== -1) {
                    handleColorSelect(emptyIndex, color)
                  }
                }}
                className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-2xl hover:border-primary-400 hover:scale-105 transition-all duration-200 bg-white shadow-md"
              >
                {color}
              </button>
            ))}
          </div>

          {/* Submit button */}
          <div className="text-center">
            <button
              onClick={submitGuess}
              disabled={currentGuess.some(color => color === '')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                currentGuess.some(color => color === '')
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primary-600 text-white hover:bg-primary-700 hover:scale-105'
              }`}
            >
              Submit Guess
            </button>
          </div>
        </div>
      )}

      {/* Guess History */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Guess History</h3>
          <button 
            onClick={resetGame}
            className="btn-primary text-sm"
          >
            New Game
          </button>
        </div>

        {guessHistory.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No guesses yet. Make your first guess!</p>
        ) : (
          <div className="space-y-4">
            {guessHistory.map((entry, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-600 w-8">#{index + 1}</span>
                  <div className="flex space-x-2">
                    {entry.guess.map((color, colorIndex) => (
                      <div key={colorIndex} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-lg bg-white">
                        {color}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Feedback */}
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-center">
                    <div className="flex space-x-1">
                      {/* Black pegs (correct position) */}
                      {Array.from({ length: entry.feedback.correctPosition }, (_, i) => (
                        <div key={i} className="w-4 h-4 bg-black rounded-full"></div>
                      ))}
                      {/* White pegs (correct color, wrong position) */}
                      {Array.from({ length: entry.feedback.correctColor }, (_, i) => (
                        <div key={i} className="w-4 h-4 bg-white border border-gray-400 rounded-full"></div>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      ⚫{entry.feedback.correctPosition} ⚪{entry.feedback.correctColor}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">How to Play:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
          <div>
            <h5 className="font-medium text-gray-800 mb-2">Gameplay:</h5>
            <ul className="space-y-1">
              <li>• Try to guess the secret 4-color code</li>
              <li>• Click color slots to fill your guess</li>
              <li>• You have {MAX_ATTEMPTS} attempts to crack the code</li>
              <li>• Colors can repeat in the secret code</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-gray-800 mb-2">Feedback:</h5>
            <ul className="space-y-1">
              <li>• ⚫ Black peg = Right color, right position</li>
              <li>• ⚪ White peg = Right color, wrong position</li>
              <li>• No peg = Color not in the code</li>
              <li>• Use feedback to narrow down the code!</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <h5 className="font-medium text-blue-900 mb-1">💡 Strategy Tip:</h5>
          <p className="text-sm text-blue-700">
            Start with a guess using 4 different colors to get maximum information. 
            Use the feedback to eliminate possibilities and focus on the most likely combinations.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Mastermind

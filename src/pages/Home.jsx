import GameCard from '../components/GameCard'

const Home = () => {
  const games = [
    {
      title: "Tower of Hanoi",
      description: "Classic puzzle game where you move disks between towers following specific rules. Test your logical thinking and planning skills.",
      route: "/games/tower-of-hanoi",
      difficulty: "Medium",
      icon: "🗼",
      color: "bg-gradient-to-br from-amber-500 to-orange-600"
    },
    {
      title: "Lights Out",
      description: "Turn off all the lights in this classic puzzle! Click a light to toggle it and its neighbors. Strategic thinking required.",
      route: "/games/lights-out",
      difficulty: "Medium",
      icon: "�",
      color: "bg-gradient-to-br from-yellow-500 to-amber-600"
    },
    {
      title: "Mastermind",
      description: "Crack the secret color code using logic and deduction. Get feedback after each guess to narrow down the possibilities.",
      route: "/games/mastermind",
      difficulty: "Hard",
      icon: "🧠",
      color: "bg-gradient-to-br from-purple-500 to-pink-600"
    }
  ]

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Enjoy
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Your premier destination for logic-based browser games. Challenge your mind with our collection of 
          carefully crafted puzzles designed to entertain and educate.
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
          <span className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            No downloads required
          </span>
          <span className="flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Mobile friendly
          </span>
          <span className="flex items-center">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
            Free to play
          </span>
        </div>
      </div>

      {/* Games Grid */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Games</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game, index) => (
            <GameCard
              key={index}
              title={game.title}
              description={game.description}
              route={game.route}
              difficulty={game.difficulty}
              icon={game.icon}
              color={game.color}
            />
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">3</div>
            <div className="text-gray-600">Games Available</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">∞</div>
            <div className="text-gray-600">Hours of Fun</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">100%</div>
            <div className="text-gray-600">Free to Play</div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">About Enjoy</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
          Enjoy is a modern game hub created by Ali, designed to host engaging logic-based browser games. 
          Our platform focuses on providing clean, accessible gaming experiences that challenge your mind 
          while being fun and educational.
        </p>
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6">
          <p className="text-gray-700 italic">
            &ldquo;Games are the most elevated form of investigation.&rdquo; - Albert Einstein
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home

import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const GameCard = ({ title, description, route, difficulty, icon, color = "bg-gradient-to-br from-blue-500 to-purple-600" }) => {
  return (
    <div className="game-card p-6 h-full flex flex-col">
      <div className={`w-16 h-16 ${color} rounded-xl mb-4 flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
        {icon || title.charAt(0)}
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4 flex-grow">{description}</p>
      
      <div className="flex items-center justify-between mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
          difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {difficulty}
        </span>
      </div>
      
      <Link
        to={route}
        className="btn-primary text-center block hover:scale-105 transform transition-all duration-200"
      >
        Play Now
      </Link>
    </div>
  )
}

GameCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  icon: PropTypes.string,
  color: PropTypes.string
}

export default GameCard

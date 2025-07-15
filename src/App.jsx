import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import TowerOfHanoi from './games/tower-of-hanoi'
import LightsOut from './games/lights-out'
import Mastermind from './games/mastermind'

function App() {
  return (
    <Router basename="/enjoy">
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games/tower-of-hanoi" element={<TowerOfHanoi />} />
            <Route path="/games/lights-out" element={<LightsOut />} />
            <Route path="/games/mastermind" element={<Mastermind />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

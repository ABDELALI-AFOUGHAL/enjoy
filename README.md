# 🎮 Enjoy - Game Hub

**A modern, responsive game hub hosting logic-based browser games**

Created by Ali | Built with React + Vite + Tailwind CSS

![Enjoy Game Hub](https://img.shields.io/badge/Version-1.0.0-blue) ![React](https://img.shields.io/badge/React-18.2.0-61dafb) ![Vite](https://img.shields.io/badge/Vite-5.0.8-646cff) ![Tailwind](https://img.shields.io/badge/TailwindCSS-3.4.0-38bdf8)

## 🌟 Overview

Enjoy is a frontend-only game hub designed to host engaging logic-based browser games. The platform focuses on providing clean, accessible gaming experiences that challenge your mind while being fun and educational.

**🎯 Purpose:** Provide a modern, scalable platform for hosting logic puzzles and brain games  
**🏗️ Architecture:** React SPA with modular game structure for easy extensibility  
**🎨 Design:** Responsive, mobile-first design with smooth animations

## 🚀 Live Demo

Visit the live demo: [https://ABDELALI-AFOUGHAL.github.io/enjoy](https://ABDELALI-AFOUGHAL.github.io/enjoy)

## 🛠️ Tech Stack

- **Framework:** React 18.2.0
- **Build Tool:** Vite 5.0.8
- **Routing:** React Router v6+
- **Styling:** Tailwind CSS 3.4.0
- **Deployment:** GitHub Pages
- **Package Manager:** npm

## 🎮 Featured Games

### 🗼 Tower of Hanoi
**Difficulty:** Medium  
Classic puzzle game where you move disks between towers following specific rules. Test your logical thinking and planning skills with 3-5 disk configurations.

**Features:**
- Multiple difficulty levels (3-5 disks)
- Move counter and minimum moves display
- Visual feedback and animations
- Responsive design for all devices

### � Lights Out
**Difficulty:** Medium  
Turn off all the lights in this addictive puzzle game! Click a light to toggle it and its neighbors (up, down, left, right). Strategic thinking required.

**Features:**
- 5x5 grid puzzle with toggle mechanics
- Multiple difficulty levels (Easy, Medium, Hard)
- Move counter and optimal moves indicator
- Puzzle generation algorithm ensures solvable games
- Strategy tips and hints

### 🧠 Mastermind
**Difficulty:** Hard  
Crack the secret color code using logic and deduction. Get feedback after each guess to narrow down the possibilities in this classic code-breaking game.

**Features:**
- 4-color secret code with 6 possible colors
- 10 attempts to crack the code
- Visual feedback system (black/white pegs)
- Interactive color selection interface
- Strategy guidance and tips

## 📁 Project Structure

```
src/
├── components/           # Shared UI components
│   ├── Navbar.jsx       # Navigation component
│   └── GameCard.jsx     # Game card component
├── games/               # Individual game modules
│   ├── tower-of-hanoi/
│   │   └── index.jsx    # Tower of Hanoi game
│   ├── lights-out/
│   │   └── index.jsx    # Lights Out puzzle
│   └── mastermind/
│       └── index.jsx    # Mastermind game
├── pages/
│   └── Home.jsx         # Game hub homepage
├── App.jsx              # Main router setup
├── main.jsx             # Application entry point
└── index.css            # Global styles & Tailwind
```

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ABDELALI-AFOUGHAL/enjoy.git
   cd enjoy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm run deploy     # Deploy to GitHub Pages
```

## 🚀 Deployment to GitHub Pages

### Automatic Deployment

```bash
npm run deploy
```

This command will:
1. Build the project (`npm run build`)
2. Deploy the `dist` folder to `gh-pages` branch
3. Make it available at `https://yourusername.github.io/enjoy`

### Manual Setup

1. **Configure GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `/ (root)`

2. **Update base URL in `vite.config.js`**
   ```javascript
   export default defineConfig({
     base: '/your-repo-name/',
     // ... other config
   })
   ```

## 🎨 Customization

### Adding New Games

1. **Create game folder**
   ```bash
   mkdir src/games/your-new-game
   ```

2. **Create game component**
   ```jsx
   // src/games/your-new-game/index.jsx
   import React from 'react'
   
   const YourNewGame = () => {
     return (
       <div>Your game content here</div>
     )
   }
   
   export default YourNewGame
   ```

3. **Add route in App.jsx**
   ```jsx
   import YourNewGame from './games/your-new-game'
   
   // Add to Routes
   <Route path="/games/your-new-game" element={<YourNewGame />} />
   ```

4. **Add to homepage**
   ```jsx
   // Update games array in src/pages/Home.jsx
   {
     title: "Your New Game",
     description: "Game description",
     route: "/games/your-new-game",
     difficulty: "Medium",
     icon: "🎯",
     color: "bg-gradient-to-br from-blue-500 to-purple-600"
   }
   ```

### Styling Customization

The project uses Tailwind CSS with custom color schemes defined in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: { /* blue shades */ },
      secondary: { /* purple shades */ }
    }
  }
}
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file for environment-specific configurations:

```env
VITE_APP_TITLE=Enjoy - Game Hub
VITE_BASE_URL=/enjoy/
```

### Vite Configuration
Key configurations in `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/enjoy/',           # GitHub Pages base path
  build: {
    outDir: 'dist',         # Output directory
  },
})
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] All games load correctly
- [ ] Navigation works between pages
- [ ] Games are playable and functional
- [ ] Responsive design works on mobile/tablet
- [ ] GitHub Pages deployment successful

### Browser Compatibility
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 🔮 Future Enhancements

### Planned Features
- [ ] **Dark/Light Theme Toggle**
  - Theme persistence in localStorage
  - Smooth theme transitions
  - Theme-aware game styling

- [ ] **Score Tracking System**
  - Local storage for game statistics
  - Best times and move counts
  - Achievement system

- [ ] **Authentication Integration**
  - User accounts and profiles
  - Cloud save functionality
  - Multiplayer capabilities

- [ ] **Additional Games**
  - Sudoku solver
  - Chess puzzles
  - Word games
  - Logic grid puzzles

- [ ] **Enhanced UX**
  - Sound effects and music
  - Keyboard shortcuts
  - Game tutorials
  - Accessibility improvements

### Contributing Structure
```
games/
├── new-game/
│   ├── index.jsx        # Main component
│   ├── logic.js         # Game logic (optional)
│   ├── components/      # Game-specific components
│   └── README.md        # Game-specific documentation
```

## 📊 Performance

### Bundle Size
- **Development:** ~2.5MB (uncompressed)
- **Production:** ~500KB (compressed)
- **Initial Load:** <1s on fast 3G

### Optimization Features
- Tree shaking with Vite
- CSS purging with Tailwind
- Component lazy loading ready
- Image optimization ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-game`)
3. Commit changes (`git commit -m 'Add amazing new game'`)
4. Push to branch (`git push origin feature/amazing-game`)
5. Open a Pull Request

### Code Style
- Use ES6+ features
- Follow React best practices
- Use Tailwind for styling
- Add comments for complex logic
- Ensure mobile responsiveness

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Tower of Hanoi algorithm inspiration from classic computer science
- Lights Out based on the classic electronic puzzle game
- Mastermind inspired by the traditional code-breaking board game
- UI design inspired by modern game hubs
- Built with love using React and Tailwind CSS

## 📧 Contact

**Ali (ABDELALI-AFOUGHAL)**
- GitHub: [@ABDELALI-AFOUGHAL](https://github.com/ABDELALI-AFOUGHAL)
- Project Link: [https://github.com/ABDELALI-AFOUGHAL/enjoy](https://github.com/ABDELALI-AFOUGHAL/enjoy)

---

*Made with ❤️ for puzzle game enthusiasts*

# Nim Game Strategy Calculator

A modern web application that helps you master the mathematical strategy behind the ancient game of Nim. Calculate optimal moves and understand the winning strategy using Nim-sum (XOR) calculations.

## Features

- **Interactive Game Board**: Set up custom pile configurations and play against the optimal strategy
- **Real-time Strategy Analysis**: See the Nim-sum calculation and whether you're in a winning or losing position
- **Optimal Move Calculator**: Get suggestions for the mathematically optimal move
- **Move Analysis**: Understand the consequences of each potential move
- **Game History**: Track all moves made during the game
- **Educational Content**: Learn the rules and winning strategy

## How to Play

1. **Setup**: Configure the initial pile sizes (default: 3, 5, 7)
2. **Take Turns**: Remove any number of coins from exactly one pile
3. **Win Condition**: The player who takes the last coin wins
4. **Strategy**: Try to leave your opponent with a Nim-sum of 0

## Mathematical Strategy

The key to winning Nim is understanding the **Nim-sum** (XOR of all pile sizes):

- If Nim-sum = 0: You're in a losing position (assuming perfect play)
- If Nim-sum ≠ 0: You're in a winning position
- **Optimal Strategy**: Always try to make moves that leave your opponent with Nim-sum = 0

## Deployment on Vercel

This app is optimized for deployment on Vercel:

### Quick Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/nim-game-sim)

### Manual Deployment

1. **Prerequisites**:
   ```bash
   npm install -g vercel
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Build and Test Locally**:
   ```bash
   npm run build
   npm start
   ```

4. **Deploy to Vercel**:
   ```bash
   vercel
   ```

### Environment Setup

No environment variables required - the app runs entirely client-side.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (static export)
- **Package Manager**: npm

## File Structure

```
nim-game-sim/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Main game component
│   └── utils/
│       └── nimGame.ts       # Game logic and algorithms
├── package.json             # Dependencies and scripts
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── vercel.json              # Vercel deployment configuration
```

## Game Algorithm

The core algorithm implements:

1. **Nim-sum Calculation**: XOR of all pile sizes
2. **Position Evaluation**: Determine winning/losing positions
3. **Optimal Move Finding**: Calculate moves that result in Nim-sum = 0
4. **Move Analysis**: Evaluate consequences of potential moves

## License

MIT License - feel free to use this project for learning and teaching purposes.

'use client';

import { useState } from 'react';
import { 
  calculateNimSum, 
  findOptimalMove, 
  makeMove, 
  isGameOver, 
  isWinningPosition,
  type Move 
} from './utils/nimGame';

// Sarvik's predefined "fair-looking" setups that guarantee first player wins
const WINNING_SETUPS = [
  { piles: [1, 2, 3], name: "Sarvik's Classic", description: "Looks balanced, Sarvik wins easy" },
  { piles: [1, 4, 5], name: "Sarvik's Trap", description: "Appears fair, Sarvik guaranteed win" },
  { piles: [2, 4, 6], name: "Sarvik's Evens", description: "Looks symmetric, Sarvik wins" },
  { piles: [1, 3, 5, 7], name: "Sarvik's Odds", description: "Natural looking, Sarvik victory" },
  { piles: [2, 3, 4, 5], name: "Sarvik's Series", description: "Seems random, Sarvik wins" },
  { piles: [1, 6, 7], name: "Sarvik's Lucky", description: "Looks like luck, pure Sarvik strategy" },
  { piles: [3, 5, 6], name: "Sarvik's Medium", description: "Perfect for longer Sarvik games" },
  { piles: [4, 5, 6, 7], name: "Sarvik's Big Game", description: "Impressive setup, Sarvik wins" }
];

export default function NimGame() {
  const [piles, setPiles] = useState<number[]>([3, 5, 7]);
  const [gameHistory, setGameHistory] = useState<string[]>([]);
  const [showOptimal, setShowOptimal] = useState<boolean>(false);
  const [view, setView] = useState<'analyzer' | 'game'>('analyzer');
  const [currentPlayer, setCurrentPlayer] = useState<'sarvik' | 'opponent'>('sarvik');

  const nimSum = calculateNimSum(piles);
  const isWinning = isWinningPosition(piles);
  const optimalMove = findOptimalMove(piles);
  const gameEnded = isGameOver(piles);

  const updatePileSize = (index: number, size: number) => {
    const newPiles = [...piles];
    newPiles[index] = Math.max(0, size);
    setPiles(newPiles);
  };

  const makePlayerMove = (pileIndex: number, amount: number) => {
    if (piles[pileIndex] >= amount && amount > 0) {
      const move: Move = { pileIndex, amount };
      const newPiles = makeMove(piles, move);
      setPiles(newPiles);
      
      const playerName = currentPlayer === 'sarvik' ? 'Sarvik/Golu Move' : 'Loser\'s Move';
      const moveDescription = `${playerName}: Took ${amount} from pile ${pileIndex + 1}`;
      setGameHistory([...gameHistory, moveDescription]);
      
      if (!isGameOver(newPiles)) {
        setCurrentPlayer(currentPlayer === 'sarvik' ? 'opponent' : 'sarvik');
      }
    }
  };

  const loadSetup = (setup: number[]) => {
    setPiles([...setup]);
  };

  const addPile = () => {
    setPiles([...piles, 1]);
  };

  const removePile = () => {
    if (piles.length > 1) {
      setPiles(piles.slice(0, -1));
    }
  };

  const resetGame = () => {
    setPiles([3, 5, 7]);
    setGameHistory([]);
    setCurrentPlayer('sarvik');
    setView('analyzer');
  };

  if (view === 'analyzer') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 py-4 sm:py-8 px-2 sm:px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-2">
              🎯 SARVIK GOLU SCAM SETUP
            </h1>
            <p className="text-sm sm:text-xl text-emerald-200 mb-2">
              Set up games that look fair but guarantee you WIN!
            </p>
            <p className="text-xs sm:text-sm text-emerald-300 opacity-80">
              Made by Sarvik ⚡
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 sm:gap-8">
            {/* Current Setup Analyzer */}
            <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-8">
              <h2 className="text-xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
                📊 Setup Analyzer
              </h2>
              
              {/* Win/Lose Status */}
              <div className={`p-4 sm:p-6 rounded-xl mb-4 sm:mb-6 text-center ${
                isWinning 
                  ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                  : 'bg-gradient-to-r from-red-400 to-pink-500'
              }`}>
                <div className="text-3xl sm:text-4xl mb-2">
                  {isWinning ? '🎉' : '💀'}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {isWinning ? 'SARVIK WINS!' : 'SARVIK LOSES!'}
                </h3>
                <p className="text-sm sm:text-base text-white">
                  {isWinning 
                    ? 'This setup guarantees Sarvik victory!'
                    : 'This setup gives opponent advantage.'}
                </p>
                <div className="mt-2 sm:mt-3 text-xs sm:text-sm text-white/80">
                  Nim-sum: {nimSum} {isWinning ? '(≠ 0 = Winning)' : '(= 0 = Losing)'}
                </div>
              </div>

              {/* Current Piles */}
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">Current Setup:</h3>
                {piles.map((pile, index) => (
                  <div key={index} className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm sm:text-base font-semibold">Pile {index + 1}:</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updatePileSize(index, pile - 1)}
                          disabled={pile <= 0}
                          className="w-10 h-10 sm:w-8 sm:h-8 bg-red-500 text-white rounded-full text-sm font-bold hover:bg-red-600 disabled:opacity-30 active:scale-95"
                        >
                          -
                        </button>
                        <span className="text-lg sm:text-xl font-bold w-12 text-center">{pile}</span>
                        <button
                          onClick={() => updatePileSize(index, pile + 1)}
                          className="w-10 h-10 sm:w-8 sm:h-8 bg-green-500 text-white rounded-full text-sm font-bold hover:bg-green-600 active:scale-95"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {Array.from({ length: pile }, (_, i) => (
                        <div key={i} className="w-4 h-4 sm:w-5 sm:h-5 bg-yellow-400 rounded-full border border-yellow-600"></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pile Controls */}
              <div className="flex space-x-1 sm:space-x-2 mb-4 sm:mb-6">
                <button
                  onClick={addPile}
                  disabled={piles.length >= 6}
                  className="flex-1 py-3 sm:py-2 bg-blue-500 text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-blue-600 disabled:opacity-50 active:scale-95"
                >
                  ➕ Add
                </button>
                <button
                  onClick={removePile}
                  disabled={piles.length <= 1}
                  className="flex-1 py-3 sm:py-2 bg-red-500 text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-red-600 disabled:opacity-50 active:scale-95"
                >
                  ➖ Remove
                </button>
                <button
                  onClick={resetGame}
                  className="flex-1 py-3 sm:py-2 bg-gray-500 text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-gray-600 active:scale-95"
                >
                  🔄 Reset
                </button>
              </div>

              {/* Play Button */}
              <button
                onClick={() => setView('game')}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg sm:text-xl font-bold rounded-xl hover:from-purple-700 hover:to-blue-700 active:scale-95"
              >
                🎮 PLAY THIS SETUP
              </button>
            </div>

            {/* Winning Setups Library */}
            <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-8">
              <h2 className="text-xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
                🏆 Winning Setups Library
              </h2>
              <p className="text-sm sm:text-base text-gray-600 text-center mb-4 sm:mb-6">
                Pre-made setups that look fair but guarantee victory!
              </p>

              <div className="space-y-2 sm:space-y-3">
                {WINNING_SETUPS.map((setup, index) => (
                  <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 hover:bg-green-100 transition-colors active:scale-95">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex-1 mr-2">
                        <h3 className="text-sm sm:text-base font-bold text-green-800">{setup.name}</h3>
                        <p className="text-xs sm:text-sm text-green-600">{setup.description}</p>
                      </div>
                      <button
                        onClick={() => loadSetup(setup.piles)}
                        className="px-3 py-2 sm:px-4 sm:py-2 bg-green-500 text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-green-600 active:scale-95"
                      >
                        Load
                      </button>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 mb-2">
                      Piles: [{setup.piles.join(', ')}] • Nim-sum: {calculateNimSum(setup.piles)}
                    </div>
                    <div className="flex space-x-1 mt-2">
                      {setup.piles.map((pile, pileIndex) => (
                        <div key={pileIndex} className="text-xs">
                          <div className="flex space-x-1">
                            {Array.from({ length: Math.min(pile, 8) }, (_, i) => (
                              <div key={i} className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full"></div>
                            ))}
                            {pile > 8 && <span className="text-gray-500 text-xs">+{pile - 8}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg">
                <h4 className="text-sm sm:text-base font-bold text-blue-800 mb-2">💡 Pro Tips:</h4>
                <ul className="text-xs sm:text-sm text-blue-700 space-y-1">
                  <li>• All setups guarantee win if you go first</li>
                  <li>• They look "random" or "fair" to opponent</li>
                  <li>• Use different setups to avoid suspicion</li>
                  <li>• Nim-sum ≠ 0 = You have winning advantage</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-4 sm:py-8 px-2 sm:px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">
            🎮 Playing Nim
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 mb-3">Made by Sarvik</p>
          <div className="flex justify-center space-x-2 sm:space-x-4">
            <button
              onClick={() => setView('analyzer')}
              className="px-3 py-2 sm:px-4 sm:py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 text-xs sm:text-sm active:scale-95"
            >
              📊 Back to Analyzer
            </button>
            <button
              onClick={resetGame}
              className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-xs sm:text-sm active:scale-95"
            >
              🔄 New Game
            </button>
          </div>
        </div>

        {/* Current Turn & Win Status */}
        <div className="space-y-3 mb-4 sm:mb-6">
          <div className="bg-white rounded-xl p-3 text-center">
            <p className="text-gray-800 font-bold text-sm sm:text-base">
              Current Turn: <span className={currentPlayer === 'sarvik' ? 'text-blue-600' : 'text-red-600'}>
                {currentPlayer === 'sarvik' ? 'Sarvik/Golu Move' : 'Loser\'s Move'}
              </span>
            </p>
          </div>
          <div className={`p-3 sm:p-4 rounded-xl text-center ${
            isWinning 
              ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
              : 'bg-gradient-to-r from-red-500 to-pink-600'
          }`}>
            <p className="text-white font-bold text-sm sm:text-base">
              {isWinning ? '🎯 You\'re in a WINNING position!' : '⚠️ You\'re in a losing position'}
            </p>
          </div>
        </div>

        {/* Game Over */}
        {gameEnded && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">🎉 GAME OVER!</h2>
            <p className="text-lg sm:text-xl text-white">All coins have been taken!</p>
          </div>
        )}

        {/* Game Board */}
        <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-8 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
            Sarvik's Game • Nim-sum: {nimSum}
          </h2>
          
          <div className="space-y-3 sm:space-y-4">
            {piles.map((pile, index) => (
              <div key={index} className="bg-gray-50 p-4 sm:p-6 rounded-xl">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-0">
                    Pile {index + 1} ({pile} coins)
                  </h3>
                  <div className="flex space-x-1 sm:space-x-2 overflow-x-auto">
                    {[1, 2, 3, 4, 5].map(amount => (
                      <button
                        key={amount}
                        onClick={() => makePlayerMove(index, amount)}
                        disabled={pile < amount || gameEnded}
                        className="w-12 h-12 sm:w-12 sm:h-12 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 flex-shrink-0"
                      >
                        -{amount}
                      </button>
                    ))}
                    {pile > 5 && (
                      <button
                        onClick={() => makePlayerMove(index, pile)}
                        disabled={gameEnded}
                        className="px-3 h-12 sm:px-4 sm:h-12 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 disabled:opacity-30 active:scale-95 flex-shrink-0"
                      >
                        ALL
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {Array.from({ length: pile }, (_, i) => (
                    <div key={i} className="w-5 h-5 sm:w-6 sm:h-6 bg-yellow-400 rounded-full border border-yellow-600"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Optimal Move Helper */}
        {!gameEnded && (
          <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-8 mb-4 sm:mb-6">
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
                🧠 Sarvik's Optimal Move
              </h2>
              <button
                onClick={() => setShowOptimal(!showOptimal)}
                className="px-3 py-2 sm:px-4 sm:py-2 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 text-xs sm:text-sm active:scale-95"
              >
                {showOptimal ? '🙈 Hide' : '👁️ Show'}
              </button>
            </div>
            
            {showOptimal && (
              <div className="bg-blue-50 p-4 sm:p-6 rounded-xl">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-3 sm:mb-0">
                    <h3 className="text-base sm:text-lg font-bold text-blue-800 mb-2">
                      💡 SARVIK'S BEST MOVE
                    </h3>
                    <p className="text-blue-700 text-sm sm:text-lg">
                      Take <span className="font-bold">{optimalMove.amount}</span> from{' '}
                      <span className="font-bold">Pile {optimalMove.pileIndex + 1}</span>
                    </p>
                    <p className="text-xs sm:text-sm text-blue-600 mt-2">
                      {optimalMove.explanation}
                    </p>
                  </div>
                  <button
                    onClick={() => makePlayerMove(optimalMove.pileIndex, optimalMove.amount)}
                    className="w-full sm:w-auto px-4 py-3 sm:px-6 sm:py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 active:scale-95"
                  >
                    ✨ Do It!
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Move History */}
        {gameHistory.length > 0 && (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              📜 Move History
            </h2>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {gameHistory.map((move, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="text-gray-800">{move}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

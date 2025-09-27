// 15 Sticks Game Strategy Calculator
// Players take 1, 2, or 3 sticks per turn. Last stick wins.
// Winning strategy: Always leave multiple of 4 for opponent

export interface SticksGameState {
  sticksLeft: number;
  currentPlayer: 'player' | 'opponent';
  isGameOver: boolean;
  winner?: 'player' | 'opponent';
}

export interface SticksMove {
  amount: 1 | 2 | 3;
}

export interface OptimalSticksMove extends SticksMove {
  isWinning: boolean;
  explanation: string;
}

/**
 * Check if the current position is winning
 * Winning if sticksLeft is NOT a multiple of 4
 */
export function isWinningPosition(sticksLeft: number): boolean {
  return sticksLeft % 4 !== 0;
}

/**
 * Find the optimal move for current position
 */
export function findOptimalMove(sticksLeft: number): OptimalSticksMove {
  const remainder = sticksLeft % 4;
  
  if (remainder === 0) {
    // We're in losing position, just take 1 stick
    return {
      amount: 1,
      isWinning: false,
      explanation: `Position is losing (${sticksLeft} is multiple of 4). Any move gives opponent advantage. Taking 1 stick.`
    };
  }
  
  // We're in winning position - take enough to make it multiple of 4
  const optimalAmount = remainder as 1 | 2 | 3;
  const resultingSticks = sticksLeft - optimalAmount;
  
  return {
    amount: optimalAmount,
    isWinning: true,
    explanation: `Winning move! Take ${optimalAmount} sticks to leave ${resultingSticks} (multiple of 4) for opponent.`
  };
}

/**
 * Apply a move to the game
 */
export function makeMove(sticksLeft: number, move: SticksMove): number {
  return Math.max(0, sticksLeft - move.amount);
}

/**
 * Check if game is over
 */
export function isGameOver(sticksLeft: number): boolean {
  return sticksLeft === 0;
}

/**
 * Get all possible moves
 */
export function getPossibleMoves(sticksLeft: number): SticksMove[] {
  const moves: SticksMove[] = [];
  for (let amount = 1; amount <= Math.min(3, sticksLeft); amount++) {
    moves.push({ amount: amount as 1 | 2 | 3 });
  }
  return moves;
}

/**
 * Analyze a potential move
 */
export function analyzeMove(sticksLeft: number, move: SticksMove): {
  resultingSticks: number;
  isWinningForOpponent: boolean;
  evaluation: string;
} {
  const resultingSticks = makeMove(sticksLeft, move);
  const isWinningForOpponent = isWinningPosition(resultingSticks);
  
  let evaluation: string;
  if (resultingSticks % 4 === 0 && resultingSticks > 0) {
    evaluation = "Excellent! This leaves a multiple of 4 for your opponent (losing position for them).";
  } else if (resultingSticks === 0) {
    evaluation = "Game over! You win by taking the last stick!";
  } else {
    evaluation = `This gives your opponent a winning position (${resultingSticks} is not multiple of 4).`;
  }
  
  return {
    resultingSticks,
    isWinningForOpponent,
    evaluation
  };
}

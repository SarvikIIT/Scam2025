// Nim Game Strategy Calculator
// The optimal strategy is based on the Nim-sum (XOR of all pile sizes)

export interface GameState {
  piles: number[];
  currentPlayer: 'player' | 'opponent';
  isGameOver: boolean;
  winner?: 'player' | 'opponent';
}

export interface Move {
  pileIndex: number;
  amount: number;
}

export interface OptimalMove extends Move {
  isWinning: boolean;
  explanation: string;
}

/**
 * Calculate the Nim-sum (XOR) of all piles
 */
export function calculateNimSum(piles: number[]): number {
  return piles.reduce((nimSum, pile) => nimSum ^ pile, 0);
}

/**
 * Check if the current position is a winning position
 * A position is winning if the Nim-sum is not zero
 */
export function isWinningPosition(piles: number[]): boolean {
  return calculateNimSum(piles) !== 0;
}

/**
 * Find the optimal move for the current position
 */
export function findOptimalMove(piles: number[]): OptimalMove {
  const nimSum = calculateNimSum(piles);
  
  if (nimSum === 0) {
    // We're in a losing position, make any legal move
    for (let i = 0; i < piles.length; i++) {
      if (piles[i] > 0) {
        return {
          pileIndex: i,
          amount: 1,
          isWinning: false,
          explanation: `Position is losing (Nim-sum = 0). Any move will give opponent advantage. Taking 1 from pile ${i + 1}.`
        };
      }
    }
  }
  
  // We're in a winning position, find the move that makes Nim-sum = 0
  for (let i = 0; i < piles.length; i++) {
    const targetSize = piles[i] ^ nimSum;
    if (targetSize < piles[i]) {
      const amount = piles[i] - targetSize;
      return {
        pileIndex: i,
        amount,
        isWinning: true,
        explanation: `Winning move! Take ${amount} from pile ${i + 1} to make Nim-sum = 0. This puts opponent in losing position.`
      };
    }
  }
  
  // Fallback (shouldn't reach here in valid winning position)
  return {
    pileIndex: 0,
    amount: 1,
    isWinning: false,
    explanation: "No optimal move found (this shouldn't happen)"
  };
}

/**
 * Apply a move to the game state
 */
export function makeMove(piles: number[], move: Move): number[] {
  const newPiles = [...piles];
  newPiles[move.pileIndex] = Math.max(0, newPiles[move.pileIndex] - move.amount);
  return newPiles;
}

/**
 * Check if the game is over (all piles are empty)
 */
export function isGameOver(piles: number[]): boolean {
  return piles.every(pile => pile === 0);
}

/**
 * Get all possible moves from current position
 */
export function getPossibleMoves(piles: number[]): Move[] {
  const moves: Move[] = [];
  for (let i = 0; i < piles.length; i++) {
    for (let amount = 1; amount <= piles[i]; amount++) {
      moves.push({ pileIndex: i, amount });
    }
  }
  return moves;
}

/**
 * Analyze a potential move and its consequences
 */
export function analyzeMove(piles: number[], move: Move): {
  resultingPiles: number[];
  nimSum: number;
  isWinningForOpponent: boolean;
  evaluation: string;
} {
  const resultingPiles = makeMove(piles, move);
  const nimSum = calculateNimSum(resultingPiles);
  const isWinningForOpponent = nimSum !== 0;
  
  let evaluation: string;
  if (nimSum === 0) {
    evaluation = "Excellent! This move puts your opponent in a losing position.";
  } else {
    evaluation = `This gives your opponent a winning position (Nim-sum = ${nimSum}).`;
  }
  
  return {
    resultingPiles,
    nimSum,
    isWinningForOpponent,
    evaluation
  };
}

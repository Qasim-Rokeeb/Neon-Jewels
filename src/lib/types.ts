export interface TilePlacement {
  letter: string;
  x: number;
  y: number;
}

export interface WordPlacement {
  word: string;
  score: number;
  player: string;
  position: { x: number; y: number };
  direction: 'horizontal' | 'vertical';
  multipliers_used?: string[];
}

export interface GameData {
  boardSize: number;
  placements: WordPlacement[];
  finalScores: {
    [player: string]: number;
  };
}

export type BoardSquare = {
  letter: string;
  player: number; // 1 for player 1, 2 for player 2
} | null;

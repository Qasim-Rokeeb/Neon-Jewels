'use server';
/**
 * @fileOverview An AI agent that plays a word game.
 * - getAiMove - A function that determines the AI's next move.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { BoardSquare } from '@/lib/types';

const AiOpponentInputSchema = z.object({
  board: z.array(z.array(z.object({ letter: z.string(), player: z.number() }).nullable())).describe('The current game board state.'),
  playerTiles: z.array(z.string()).describe("The AI player's current hand of tiles."),
});
export type AiOpponentInput = z.infer<typeof AiOpponentInputSchema>;

const AiOpponentOutputSchema = z.object({
  word: z.string().describe('The word the AI has chosen to play.'),
  x: z.number().describe('The starting x-coordinate for the word.'),
  y: z.number().describe('The starting y-coordinate for the word.'),
  direction: z.enum(['horizontal', 'vertical']).describe('The direction the word is played in.'),
});
export type AiOpponentOutput = z.infer<typeof AiOpponentOutputSchema>;

export async function getAiMove(input: AiOpponentInput): Promise<AiOpponentOutput> {
  return aiOpponentFlow(input);
}

const TILE_SCORES: { [key: string]: number } = {
  A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8, K: 5, L: 1, M: 3,
  N: 1, O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4, W: 4, X: 8, Y: 4, Z: 10
};

const prompt = ai.definePrompt({
  name: 'aiOpponentPrompt',
  input: { schema: AiOpponentInputSchema },
  output: { schema: AiOpponentOutputSchema },
  prompt: `You are an expert Scrabble player AI. Your goal is to find the highest-scoring word you can play on the given board with your available tiles.

  **Game Rules:**
  1.  The first move of the game must cover the center square (7,7).
  2.  All subsequent words must connect to at least one tile already on the board.
  3.  You can only use the letters available in your hand (playerTiles), but you can also use letters already on the board to form your word.
  4.  The score is calculated based on tile values and board multipliers. Your main goal is to maximize your score for the turn.

  **Board Multipliers:**
  - TW: Triple Word Score
  - DW: Double Word Score
  - TL: Triple Letter Score
  - DL: Double Letter Score
  - Multipliers only apply if the tile placed on them is new (not already on the board).

  **Current Board State:**
  The board is represented as a 2D array. 'null' means the square is empty. An object like { letter: 'A', player: 1 } means the tile is on the board.
  The board is 15x15. Here is the current state:
  {{{JSON.stringify board}}}

  **Your Tiles:**
  You have the following tiles in your hand:
  {{{JSON.stringify playerTiles}}}

  **Tile Scores:**
  ${JSON.stringify(TILE_SCORES)}

  **Your Task:**
  Analyze the board and your tiles. Find the best possible move (word, position, and direction) that results in the highest score.
  
  Think step-by-step:
  1. Identify all possible anchor points on the board where you could connect a new word.
  2. For each anchor, try to form valid words horizontally and vertically using your tiles.
  3. Calculate the score for each valid word you find, considering all letter and word multipliers for the new tiles you place.
  4. Choose the word that gives the absolute highest score.
  5. If no word can be played, you can respond with an empty word, and coordinates that are off the board like -1, -1.

  Respond with the word, its starting coordinates (x, y), and direction.
  `,
});

const aiOpponentFlow = ai.defineFlow(
  {
    name: 'aiOpponentFlow',
    inputSchema: AiOpponentInputSchema,
    outputSchema: AiOpponentOutputSchema,
  },
  async (input) => {
    // A more complex implementation could involve a dictionary check or more sophisticated board analysis here.
    // For now, we rely on the LLM's ability to play the game.
    const { output } = await prompt(input);
    
    if (!output?.word) {
      // Fallback or pass turn logic
      return { word: "", x: -1, y: -1, direction: 'horizontal'};
    }

    return output;
  }
);

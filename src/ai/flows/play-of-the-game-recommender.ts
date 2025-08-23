'use server';
/**
 * @fileOverview An AI agent that recommends the play of the game.
 *
 * - playOfTheGameRecommender - A function that handles the play of the game recommendation process.
 * - PlayOfTheGameRecommenderInput - The input type for the playOfTheGameRecommender function.
 * - PlayOfTheGameRecommenderOutput - The return type for the playOfTheGameRecommender function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PlayOfTheGameRecommenderInputSchema = z.object({
  gameData: z.string().describe('JSON string of the game data, including word placements, scores, and letter multipliers.'),
});
export type PlayOfTheGameRecommenderInput = z.infer<typeof PlayOfTheGameRecommenderInputSchema>;

const PlayOfTheGameRecommenderOutputSchema = z.object({
  recommendedWord: z.string().describe('The most impressive word played during the game.'),
  reason: z.string().describe('The reason why the word was chosen as the play of the game.'),
});
export type PlayOfTheGameRecommenderOutput = z.infer<typeof PlayOfTheGameRecommenderOutputSchema>;

export async function playOfTheGameRecommender(input: PlayOfTheGameRecommenderInput): Promise<PlayOfTheGameRecommenderOutput> {
  return playOfTheGameRecommenderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'playOfTheGameRecommenderPrompt',
  input: {schema: PlayOfTheGameRecommenderInputSchema},
  output: {schema: PlayOfTheGameRecommenderOutputSchema},
  prompt: `You are an AI that recommends the play of the game from a Scrabble game.

  You will be given the game data, including word placements, scores, and letter multipliers.
  You will select the most impressive word played during the game, based on length, letter multipliers, and overall score contribution.

  Game Data: {{{gameData}}}

  Respond with the recommended word and the reason why it was chosen.
  `,
});

const playOfTheGameRecommenderFlow = ai.defineFlow(
  {
    name: 'playOfTheGameRecommenderFlow',
    inputSchema: PlayOfTheGameRecommenderInputSchema,
    outputSchema: PlayOfTheGameRecommenderOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

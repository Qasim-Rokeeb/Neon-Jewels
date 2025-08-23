'use server';

import { playOfTheGameRecommender, PlayOfTheGameRecommenderOutput } from '@/ai/flows/play-of-the-game-recommender';

export async function getPlayOfTheGame(gameData: string): Promise<PlayOfTheGameRecommenderOutput & { error?: string }> {
  try {
    const result = await playOfTheGameRecommender({ gameData });
    return result;
  } catch (error) {
    console.error('Error in getPlayOfTheGame action:', error);
    return { 
      error: 'Failed to get play of the game from AI.',
      recommendedWord: 'N/A',
      reason: 'An error occurred while analyzing the game.'
    };
  }
}

'use server';

import { getAiMove as getAiMoveFlow, AiOpponentInput, AiOpponentOutput } from '@/ai/flows/ai-opponent-flow';

export async function getAiMove(input: AiOpponentInput): Promise<AiOpponentOutput & { error?: string }> {
  try {
    const result = await getAiMoveFlow(input);
    if (!result.word) {
      return { 
        error: 'AI decided to skip its turn.',
        word: '',
        x: -1,
        y: -1,
        direction: 'horizontal',
      };
    }
    return result;
  } catch (error) {
    console.error('Error in getAiMove action:', error);
    return { 
      error: 'Failed to get move from AI.',
      word: '',
      x: -1,
      y: -1,
      direction: 'horizontal',
    };
  }
}

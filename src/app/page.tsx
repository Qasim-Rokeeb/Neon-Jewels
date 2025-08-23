"use client";

import React, { useState } from 'react';
import GameBoard from '@/components/game-board';
import PlayerInfo from '@/components/player-info';
import EndGameModal from '@/components/end-game-modal';
import HowToPlayModal from '@/components/how-to-play-modal';
import { Button } from '@/components/ui/button';
import { GameData } from '@/lib/types';
import { NeonJewelsLogo } from '@/components/icons';
import { Award, HelpCircle, Share2 } from 'lucide-react';

const MOCK_GAME_DATA: GameData = {
  boardSize: 15,
  placements: [
    { word: "NEON", score: 16, player: "NeonGamer", position: { x: 5, y: 7 }, direction: "horizontal" },
    { word: "JEWELS", score: 75, player: "AI Opponent", position: { x: 8, y: 4 }, direction: "vertical", multipliers_used: ["Triple Letter Score on J", "Triple Word Score"] },
    { word: "CRYPTO", score: 48, player: "NeonGamer", position: { x: 3, y: 10 }, direction: "horizontal", multipliers_used: ["Double Letter Score on P", "Double Word Score"] },
    { word: "VOID", score: 10, player: "AI Opponent", position: { x: 5, y: 6 }, direction: "vertical"},
    { word: "AQUA", score: 15, player: "NeonGamer", position: { x: 10, y: 10 }, direction: "horizontal"}
  ],
  finalScores: {
    "NeonGamer": 189,
    "AI Opponent": 210,
  },
};

export default function Home() {
  const [isEndGameModalOpen, setIsEndGameModalOpen] = useState(false);
  const [isHowToPlayModalOpen, setIsHowToPlayModalOpen] = useState(false);

  return (
    <>
      <div className="fixed inset-0 -z-10 nebula-bg" />
      <div className="relative flex flex-col min-h-screen items-center justify-center p-4 sm:p-6 md:p-8 font-body text-foreground overflow-hidden">
        <header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-transparent">
          <div className="flex items-center gap-3">
            <NeonJewelsLogo className="w-10 h-10" />
            <h1 className="text-2xl font-headline tracking-widest uppercase">Neon Jewels</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Share2 className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsHowToPlayModalOpen(true)}>
              <HelpCircle className="w-5 h-5" />
            </Button>
          </div>
        </header>

        <main className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-7xl mt-20 mb-8">
          <PlayerInfo playerName="NeonGamer" score={MOCK_GAME_DATA.finalScores["NeonGamer"]} isCurrentPlayer={false} />
          
          <div className="flex-shrink-0">
            <GameBoard placements={MOCK_GAME_DATA.placements} boardSize={MOCK_GAME_DATA.boardSize} />
          </div>

          <PlayerInfo playerName="AI Opponent" score={MOCK_GAME_DATA.finalScores["AI Opponent"]} isCurrentPlayer={false} isWinner={true} />
        </main>
        
        <div className="mt-auto">
            <Button
              onClick={() => setIsEndGameModalOpen(true)}
              size="lg"
              className="font-headline text-lg tracking-wider bg-primary/80 backdrop-blur-sm border border-primary hover:bg-primary transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_0_20px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_30px_hsl(var(--primary)/0.7)]"
            >
              <Award className="mr-2 h-5 w-5" />
              Show Play of the Game
            </Button>
        </div>

        <EndGameModal
          isOpen={isEndGameModalOpen}
          onClose={() => setIsEndGameModalOpen(false)}
          gameData={MOCK_GAME_DATA}
        />
        <HowToPlayModal
          isOpen={isHowToPlayModalOpen}
          onClose={() => setIsHowToPlayModalOpen(false)}
        />
      </div>
    </>
  );
}


"use client";

import React, { useState, useMemo } from 'react';
import GameBoard from '@/components/game-board';
import PlayerInfo from '@/components/player-info';
import EndGameModal from '@/components/end-game-modal';
import HowToPlayModal from '@/components/how-to-play-modal';
import { Button } from '@/components/ui/button';
import { GameData, WordPlacement } from '@/lib/types';
import { WordGlowLogo } from '@/components/icons';
import { Award, HelpCircle, Share2, ChevronLeft, ChevronRight, Github } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

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
  const [currentMove, setCurrentMove] = useState(0);

  const visiblePlacements = useMemo(() => MOCK_GAME_DATA.placements.slice(0, currentMove), [currentMove]);

  const currentScores = useMemo(() => {
    const scores = { "NeonGamer": 0, "AI Opponent": 0 };
    for (let i = 0; i < currentMove; i++) {
      const placement = MOCK_GAME_DATA.placements[i];
      scores[placement.player as keyof typeof scores] += placement.score;
    }
    return scores;
  }, [currentMove]);

  const handleNext = () => {
    setCurrentMove(prev => Math.min(prev + 1, MOCK_GAME_DATA.placements.length));
  };

  const handlePrev = () => {
    setCurrentMove(prev => Math.max(prev - 1, 0));
  };
  
  const isGameFinished = currentMove === MOCK_GAME_DATA.placements.length;

  return (
    <>
      <div className="fixed inset-0 -z-10 nebula-bg" />
      <div className="relative flex flex-col min-h-screen font-body text-foreground">
        <header className="w-full p-4 flex justify-between items-center bg-transparent animate-fade-in-down container mx-auto">
          <Link href="/" className="flex items-center gap-3">
            <WordGlowLogo className="w-8 h-8 sm:w-10 sm:h-10" />
            <h1 className="text-xl sm:text-2xl font-headline tracking-widest uppercase">WordGlow</h1>
          </Link>
          <div className="flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" size="icon">
              <Share2 className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsHowToPlayModalOpen(true)}>
              <HelpCircle className="w-5 h-5" />
            </Button>
          </div>
        </header>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] xl:grid-cols-[380px_1fr] gap-4 container mx-auto p-4">
          <aside className="animate-fade-in-left animation-delay-300 flex flex-col gap-4 md:gap-8">
            <div className="space-y-4">
              <PlayerInfo playerName="NeonGamer" score={currentScores["NeonGamer"]} isCurrentPlayer={false} />
              <PlayerInfo playerName="AI Opponent" score={currentScores["AI Opponent"]} isCurrentPlayer={false} isWinner={isGameFinished && MOCK_GAME_DATA.finalScores["AI Opponent"] > MOCK_GAME_DATA.finalScores["NeonGamer"]} />
            </div>
            <div className="flex-grow flex flex-col justify-end">
                <div className="w-full flex justify-center py-4 md:py-8 animate-fade-in-up animation-delay-400">
                  <Button
                    onClick={() => setIsEndGameModalOpen(true)}
                    disabled={!isGameFinished}
                    size="lg"
                    className="w-full font-headline text-lg tracking-wider bg-primary/80 backdrop-blur-sm border border-primary hover:bg-primary transition-all duration-300 ease-in-out shadow-[0_0_20px_hsl(var(--primary)/0.5),inset_0_0_10px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.8)] hover:scale-105 data-[disabled]:animate-none data-[disabled]:shadow-none data-[disabled]:scale-100 data-[disabled]:bg-muted/50 data-[disabled]:text-muted-foreground animate-pulse-slow"
                  >
                    <Award className="mr-2 h-5 w-5" />
                    Show Play of the Game
                  </Button>
              </div>
            </div>
          </aside>
          
          <main className="flex flex-col items-center justify-center gap-4 animate-fade-in animation-delay-200">
            <div className="w-full max-w-full aspect-square sm:max-w-[calc(100vh-200px)]">
              <GameBoard placements={visiblePlacements} boardSize={MOCK_GAME_DATA.boardSize} />
            </div>
            <div className="flex items-center gap-4 mt-2">
              <Button onClick={handlePrev} disabled={currentMove === 0} variant="outline" size="icon">
                <ChevronLeft />
              </Button>
              <p className="text-sm text-muted-foreground w-24 text-center">Move: {currentMove} / {MOCK_GAME_DATA.placements.length}</p>
              <Button onClick={handleNext} disabled={isGameFinished} variant="outline" size="icon">
                <ChevronRight />
              </Button>
            </div>
          </main>
        </div>
        
        <footer className="w-full text-center text-muted-foreground text-sm animate-fade-in-up animation-delay-500 container mx-auto">
            <Separator className="my-4 bg-border/20" />
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-4">
              <p>&copy; {new Date().getFullYear()} WordGlow. All Rights Reserved.</p>
              <div className="flex items-center gap-4">
                <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon">
                    <Github className="w-5 h-5" />
                  </Button>
                </a>
              </div>
            </div>
        </footer>

        {isGameFinished && <EndGameModal
          isOpen={isEndGameModalOpen}
          onClose={() => setIsEndGameModalOpen(false)}
          gameData={MOCK_GAME_DATA}
        />}
        <HowToPlayModal
          isOpen={isHowToPlayModalOpen}
          onClose={() => setIsHowToPlayModalOpen(false)}
        />
      </div>
    </>
  );
}

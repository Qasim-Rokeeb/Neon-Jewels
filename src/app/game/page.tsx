
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import GameBoard from '@/components/game-board';
import PlayerInfo from '@/components/player-info';
import EndGameModal from '@/components/end-game-modal';
import HowToPlayModal from '@/components/how-to-play-modal';
import PlayerHand from '@/components/player-hand';
import TurnIndicator from '@/components/turn-indicator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from "@/hooks/use-toast";
import { GameState, Placement, WordPlacement, BoardSquare } from '@/lib/types';
import { getPlayOfTheGame } from '../actions';
import { getAiMove } from './actions';
import { WordGlowLogo } from '@/components/icons';
import { Award, HelpCircle, Share2, Github, RotateCw, Send } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

const BOARD_SIZE = 15;

const TILE_BAG = {
  A: 9, B: 2, C: 2, D: 4, E: 12, F: 2, G: 3, H: 2, I: 9, J: 1, K: 1, L: 4, M: 2,
  N: 6, O: 8, P: 2, Q: 1, R: 6, S: 4, T: 6, U: 4, V: 2, W: 2, X: 1, Y: 2, Z: 1,
};

const TILE_SCORES: { [key: string]: number } = {
  A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8, K: 5, L: 1, M: 3,
  N: 1, O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4, W: 4, X: 8, Y: 4, Z: 10
};

const MULTIPLIERS: { [key: string]: { type: 'word' | 'letter', value: number } } = {
  '0,0': { type: 'word', value: 3 }, '0,7': { type: 'word', value: 3 }, '0,14': { type: 'word', value: 3 },
  '7,0': { type: 'word', value: 3 }, '7,14': { type: 'word', value: 3 },
  '14,0': { type: 'word', value: 3 }, '14,7': { type: 'word', value: 3 }, '14,14': { type: 'word', value: 3 },
  '1,1': { type: 'word', value: 2 }, '2,2': { type: 'word', value: 2 }, '3,3': { type: 'word', value: 2 }, '4,4': { type: 'word', value: 2 },
  '1,13': { type: 'word', value: 2 }, '2,12': { type: 'word', value: 2 }, '3,11': { type: 'word', value: 2 }, '4,10': { type: 'word', value: 2 },
  '10,4': { type: 'word', value: 2 }, '11,3': { type: 'word', value: 2 }, '12,2': { type: 'word', value: 2 }, '13,1': { type: 'word', value: 2 },
  '10,10': { type: 'word', value: 2 }, '11,11': { type: 'word', value: 2 }, '12,12': { type: 'word', value: 2 }, '13,13': { type: 'word', value: 2 },
  '1,5': { type: 'letter', value: 3 }, '1,9': { type: 'letter', value: 3 }, '5,1': { type: 'letter', value: 3 }, '5,5': { type: 'letter', value: 3 },
  '5,9': { type: 'letter', value: 3 }, '5,13': { type: 'letter', value: 3 }, '9,1': { type: 'letter', value: 3 }, '9,5': { type: 'letter', value: 3 },
  '9,9': { type: 'letter', value: 3 }, '9,13': { type: 'letter', value: 3 }, '13,5': { type: 'letter', value: 3 }, '13,9': { type: 'letter', value: 3 },
  '0,3': { type: 'letter', value: 2 }, '0,11': { type: 'letter', value: 2 }, '2,6': { type: 'letter', value: 2 }, '2,8': { type: 'letter', value: 2 },
  '3,0': { type: 'letter', value: 2 }, '3,7': { type: 'letter', value: 2 }, '3,14': { type: 'letter', value: 2 }, '6,2': { type: 'letter', value: 2 },
  '6,6': { type: 'letter', value: 2 }, '6,8': { type: 'letter', value: 2 }, '6,12': { type: 'letter', value: 2 }, '7,3': { type: 'letter', value: 2 },
  '7,11': { type: 'letter', value: 2 }, '8,2': { type: 'letter', value: 2 }, '8,6': { type: 'letter', value: 2 }, '8,8': { type: 'letter', value: 2 },
  '8,12': { type: 'letter', value: 2 }, '11,0': { type: 'letter', value: 2 }, '11,7': { type: 'letter', value: 2 }, '11,14': { type: 'letter', value: 2 },
  '12,6': { type: 'letter', value: 2 }, '12,8': { type: 'letter', value: 2 }, '14,3': { type: 'letter', value: 2 }, '14,11': { type: 'letter', value: 2 },
};

export default function GamePage() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isEndGameModalOpen, setIsEndGameModalOpen] = useState(false);
  const [isHowToPlayModalOpen, setIsHowToPlayModalOpen] = useState(false);
  const [playOfTheGameResult, setPlayOfTheGameResult] = useState(null);
  const [loadingPlayOfTheGame, setLoadingPlayOfTheGame] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const { toast } = useToast();

  const [playerWord, setPlayerWord] = useState('');
  const [playerX, setPlayerX] = useState<number>(7);
  const [playerY, setPlayerY] = useState<number>(7);
  const [playerDirection, setPlayerDirection] = useState<'horizontal' | 'vertical'>('horizontal');

  const initializeGame = useCallback(() => {
    const newBag = { ...TILE_BAG };
    const drawTiles = (count: number) => {
      const tiles = [];
      const availableTiles = Object.keys(newBag).filter(tile => newBag[tile as keyof typeof newBag] > 0);
      for (let i = 0; i < count; i++) {
        if (availableTiles.length === 0) break;
        const tileIndex = Math.floor(Math.random() * availableTiles.length);
        const tile = availableTiles[tileIndex];
        tiles.push(tile);
        newBag[tile as keyof typeof newBag]--;
        if (newBag[tile as keyof typeof newBag] === 0) {
          availableTiles.splice(tileIndex, 1);
        }
      }
      return tiles;
    };

    setGameState({
      board: Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null)),
      players: {
        'human': { score: 0, tiles: drawTiles(7) },
        'ai': { score: 0, tiles: drawTiles(7) },
      },
      tileBag: newBag,
      turn: 'human',
      placements: [],
      isFinished: false,
    });
    setIsEndGameModalOpen(false);
    setPlayOfTheGameResult(null);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const calculateScore = (word: string, x: number, y: number, direction: 'horizontal' | 'vertical', board: BoardSquare[][]): { score: number, multipliers_used: string[] } => {
    let score = 0;
    let wordMultiplier = 1;
    let multipliers_used = [];
    let currentX = x;
    let currentY = y;

    for (const letter of word) {
      const letterScore = TILE_SCORES[letter.toUpperCase()];
      let letterMultiplier = 1;

      if (!board[currentY][currentX]) {
        const multiplier = MULTIPLIERS[`${currentY},${currentX}`];
        if (multiplier) {
          if (multiplier.type === 'letter') {
            letterMultiplier = multiplier.value;
            multipliers_used.push(`${multiplier.value}x Letter on ${letter}`);
          } else { // word
            wordMultiplier *= multiplier.value;
             multipliers_used.push(`${multiplier.value}x Word`);
          }
        }
      }

      score += letterScore * letterMultiplier;
      if (direction === 'horizontal') currentX++;
      else currentY++;
    }

    score *= wordMultiplier;
    return { score, multipliers_used };
  };

  const validateAndPlaceWord = (word: string, x: number, y: number, direction: 'horizontal' | 'vertical'): boolean => {
    if (!gameState) return false;
    const upperWord = word.toUpperCase();
    const tempPlayerTiles = [...gameState.players.human.tiles];
    const newBoard = gameState.board.map(row => [...row]);
    let currentX = x;
    let currentY = y;
    let isConnected = false;
    let isFirstMove = gameState.placements.length === 0;

    for (let i = 0; i < upperWord.length; i++) {
        const letter = upperWord[i];
        if(currentY >= BOARD_SIZE || currentX >= BOARD_SIZE) {
            toast({ title: "Invalid Placement", description: "Word goes off the board.", variant: "destructive" });
            return false;
        }

        if (isFirstMove && i === 0 && (x !== 7 || y !== 7)) {
            toast({ title: "Invalid Placement", description: "First word must be on the center star.", variant: "destructive" });
            return false;
        }

        const boardCell = newBoard[currentY][currentX];
        if (boardCell) {
            if (boardCell.letter !== letter) {
                toast({ title: "Invalid Placement", description: `Cell ${currentX},${currentY} is already occupied by ${boardCell.letter}.`, variant: "destructive" });
                return false;
            }
            isConnected = true;
        } else {
            const tileIndex = tempPlayerTiles.indexOf(letter);
            if (tileIndex === -1) {
                toast({ title: "Invalid Word", description: `You don't have the letter ${letter}.`, variant: "destructive" });
                return false;
            }
            tempPlayerTiles.splice(tileIndex, 1);
            // Check for connection to adjacent tiles
            const neighbors = [[-1, 0], [1, 0], [0, -1], [0, 1]];
            for (const [dy, dx] of neighbors) {
                if (newBoard[currentY + dy]?.[currentX + dx]) {
                    isConnected = true;
                }
            }
        }
        if (direction === 'horizontal') currentX++; else currentY++;
    }

    if (!isConnected && !isFirstMove) {
        toast({ title: "Invalid Placement", description: "Word must connect to existing tiles.", variant: "destructive" });
        return false;
    }

    return true;
  }

  const handlePlayerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gameState || gameState.turn !== 'human' || isSubmitting) return;

    setIsSubmitting(true);
    
    if (!validateAndPlaceWord(playerWord, playerX, playerY, playerDirection)) {
      setIsSubmitting(false);
      return;
    }

    const { score, multipliers_used } = calculateScore(playerWord, playerX, playerY, playerDirection, gameState.board);
    
    // Update game state
    setGameState(prev => {
        if (!prev) return null;
        const newBoard = prev.board.map(row => [...row]);
        const newPlacements = [...prev.placements];
        const newPlayerTiles = [...prev.players.human.tiles];
        const newBag = { ...prev.tileBag };
        const upperWord = playerWord.toUpperCase();

        let currentX = playerX;
        let currentY = playerY;
        for (const letter of upperWord) {
            if (!newBoard[currentY][currentX]) {
                newBoard[currentY][currentX] = { letter, player: 1 };
                const tileIndex = newPlayerTiles.indexOf(letter);
                if (tileIndex > -1) {
                    newPlayerTiles.splice(tileIndex, 1);
                }
            }
            if (playerDirection === 'horizontal') currentX++; else currentY++;
        }
        
        const tilesToDraw = 7 - newPlayerTiles.length;
        const drawnTiles = [];
        const availableTiles = Object.keys(newBag).filter(tile => newBag[tile as keyof typeof newBag] > 0);
        for (let i = 0; i < tilesToDraw; i++) {
          if (availableTiles.length === 0) break;
          const tileIndex = Math.floor(Math.random() * availableTiles.length);
          const tile = availableTiles[tileIndex];
          drawnTiles.push(tile);
          newBag[tile as keyof typeof newBag]--;
          if (newBag[tile as keyof typeof newBag] === 0) {
            availableTiles.splice(tileIndex, 1);
          }
        }

        newPlacements.push({
          word: upperWord,
          score: score,
          player: "You",
          position: { x: playerX, y: playerY },
          direction: playerDirection,
          multipliers_used: multipliers_used
        });

        const updatedState: GameState = {
            ...prev,
            board: newBoard,
            players: {
                ...prev.players,
                human: {
                    score: prev.players.human.score + score,
                    tiles: [...newPlayerTiles, ...drawnTiles],
                }
            },
            tileBag: newBag,
            turn: 'ai',
            placements: newPlacements,
        };

        if(updatedState.players.human.tiles.length === 0) {
          updatedState.isFinished = true;
        }
        
        return updatedState;
    });

    setPlayerWord('');
    setIsSubmitting(false);
    setIsAiThinking(true);
  };

  const triggerAiTurn = useCallback(async () => {
    if (!gameState || gameState.turn !== 'ai' || gameState.isFinished) return;

    try {
      const res = await getAiMove({
        board: gameState.board,
        playerTiles: gameState.players.ai.tiles,
      });

      if (res.error || !res.word) {
        toast({ title: "AI Error", description: res.error || "AI could not make a move.", variant: "destructive" });
        // AI forfeits turn
        setGameState(prev => prev ? ({ ...prev, turn: 'human' }) : null);
        setIsAiThinking(false);
        return;
      }

      const { word, x, y, direction } = res;
      const { score, multipliers_used } = calculateScore(word, x, y, direction, gameState.board);

      setGameState(prev => {
        if (!prev) return null;
        const newBoard = prev.board.map(row => [...row]);
        const newPlacements = [...prev.placements];
        const newPlayerTiles = [...prev.players.ai.tiles];
        const newBag = { ...prev.tileBag };
        const upperWord = word.toUpperCase();

        let currentX = x;
        let currentY = y;
        for (const letter of upperWord) {
            if (!newBoard[currentY][currentX]) {
                newBoard[currentY][currentX] = { letter, player: 2 };
                 const tileIndex = newPlayerTiles.indexOf(letter);
                if (tileIndex > -1) {
                    newPlayerTiles.splice(tileIndex, 1);
                }
            }
            if (direction === 'horizontal') currentX++; else currentY++;
        }
        
        const tilesToDraw = 7 - newPlayerTiles.length;
        const drawnTiles = [];
        const availableTiles = Object.keys(newBag).filter(tile => newBag[tile as keyof typeof newBag] > 0);
        for (let i = 0; i < tilesToDraw; i++) {
          if (availableTiles.length === 0) break;
          const tileIndex = Math.floor(Math.random() * availableTiles.length);
          const tile = availableTiles[tileIndex];
          drawnTiles.push(tile);
          newBag[tile as keyof typeof newBag]--;
           if (newBag[tile as keyof typeof newBag] === 0) {
            availableTiles.splice(tileIndex, 1);
          }
        }
        
        newPlacements.push({
          word: upperWord,
          score: score,
          player: "AI Opponent",
          position: { x, y },
          direction,
          multipliers_used: multipliers_used
        });

        const updatedState: GameState = {
            ...prev,
            board: newBoard,
            players: {
                ...prev.players,
                ai: {
                    score: prev.players.ai.score + score,
                    tiles: [...newPlayerTiles, ...drawnTiles],
                }
            },
            tileBag: newBag,
            turn: 'human',
            placements: newPlacements
        };

        if (updatedState.players.ai.tiles.length === 0) {
          updatedState.isFinished = true;
        }

        return updatedState;
      });

    } catch (err) {
      console.error(err);
      toast({ title: "AI Turn Failed", description: "An unexpected error occurred.", variant: "destructive" });
      setGameState(prev => prev ? ({ ...prev, turn: 'human' }) : null);
    } finally {
      setIsAiThinking(false);
    }
  }, [gameState, toast]);

  useEffect(() => {
    if (gameState?.turn === 'ai' && !isAiThinking) {
      const timer = setTimeout(() => {
        triggerAiTurn();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [gameState?.turn, isAiThinking, triggerAiTurn]);
  
  useEffect(() => {
    if (gameState?.isFinished && !isEndGameModalOpen) {
      handleShowPlayOfTheGame();
    }
  }, [gameState?.isFinished]);

  const handleShowPlayOfTheGame = useCallback(async () => {
    if(!gameState) return;
    setIsEndGameModalOpen(true);
    setLoadingPlayOfTheGame(true);
    setPlayOfTheGameResult(null);

    const gameData = {
      boardSize: BOARD_SIZE,
      placements: gameState.placements,
      finalScores: {
        "You": gameState.players.human.score,
        "AI Opponent": gameState.players.ai.score
      }
    };

    const gameDataString = JSON.stringify(gameData);
    const res = await getPlayOfTheGame(gameDataString);
    setPlayOfTheGameResult(res as any);
    setLoadingPlayOfTheGame(false);
  }, [gameState]);

  if (!gameState) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  const winner = gameState.isFinished 
    ? (gameState.players.human.score > gameState.players.ai.score ? "human" : "ai")
    : undefined;

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
            <Button variant="ghost" size="icon" onClick={initializeGame}>
              <RotateCw className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsHowToPlayModalOpen(true)}>
              <HelpCircle className="w-5 h-5" />
            </Button>
          </div>
        </header>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-4 container mx-auto p-4">
          <main className="flex flex-col items-center justify-center gap-4 animate-fade-in animation-delay-200 order-2 md:order-1">
            <div className="w-full max-w-full aspect-square sm:max-w-[calc(100vh-200px)]">
              <GameBoard placements={gameState.placements.map(p => ({...p, player: p.player === 'You' ? 'NeonGamer' : 'AI Opponent'}))} boardSize={BOARD_SIZE} />
            </div>
          </main>
          
          <aside className="animate-fade-in-left animation-delay-300 flex flex-col gap-4 md:gap-8 order-1 md:order-2">
            <div className="space-y-4">
              <PlayerInfo playerName="You" score={gameState.players.human.score} isCurrentPlayer={gameState.turn === 'human'} isWinner={winner === 'human'} />
              <PlayerInfo playerName="AI Opponent" score={gameState.players.ai.score} isCurrentPlayer={gameState.turn === 'ai'} isWinner={winner === 'ai'} />
            </div>

            <TurnIndicator turn={gameState.turn} isAiThinking={isAiThinking} isFinished={gameState.isFinished} />

            <div className="bg-card/50 backdrop-blur-md rounded-xl border border-border shadow-lg p-4 space-y-4">
              <h3 className="font-headline text-lg text-primary">Your Tiles</h3>
              <PlayerHand tiles={gameState.players.human.tiles} />
              <form onSubmit={handlePlayerSubmit} className="space-y-3">
                <Input 
                  placeholder="Enter word" 
                  value={playerWord} 
                  onChange={(e) => setPlayerWord(e.target.value)} 
                  disabled={gameState.turn !== 'human' || isSubmitting}
                  className="bg-input/50"
                />
                <div className="flex gap-2">
                  <Select value={String(playerX)} onValueChange={(v) => setPlayerX(Number(v))} disabled={gameState.turn !== 'human' || isSubmitting}>
                    <SelectTrigger><SelectValue placeholder="X" /></SelectTrigger>
                    <SelectContent>{Array.from({length: BOARD_SIZE}).map((_, i) => <SelectItem key={i} value={String(i)}>{i}</SelectItem>)}</SelectContent>
                  </Select>
                  <Select value={String(playerY)} onValueChange={(v) => setPlayerY(Number(v))} disabled={gameState.turn !== 'human' || isSubmitting}>
                    <SelectTrigger><SelectValue placeholder="Y" /></SelectTrigger>
                    <SelectContent>{Array.from({length: BOARD_SIZE}).map((_, i) => <SelectItem key={i} value={String(i)}>{i}</SelectItem>)}</SelectContent>
                  </Select>
                   <Select value={playerDirection} onValueChange={(v: 'horizontal' | 'vertical') => setPlayerDirection(v)} disabled={gameState.turn !== 'human' || isSubmitting}>
                    <SelectTrigger><SelectValue placeholder="Dir" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="horizontal">Horizontal</SelectItem>
                      <SelectItem value="vertical">Vertical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full" disabled={gameState.turn !== 'human' || isSubmitting || !playerWord}>
                  <Send className="mr-2 h-4 w-4" />
                  {isSubmitting ? 'Placing...' : 'Place Word'}
                </Button>
              </form>
            </div>
            
            <div className="flex-grow flex flex-col justify-end">
                <div className="w-full flex justify-center py-4 md:py-8 animate-fade-in-up animation-delay-400">
                  <Button
                    onClick={handleShowPlayOfTheGame}
                    disabled={!gameState.isFinished}
                    size="lg"
                    className="w-full font-headline text-lg tracking-wider bg-primary/80 backdrop-blur-sm border border-primary hover:bg-primary transition-all duration-300 ease-in-out shadow-[0_0_20px_hsl(var(--primary)/0.5),inset_0_0_10px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.8)] hover:scale-105 data-[disabled]:animate-none data-[disabled]:shadow-none data-[disabled]:scale-100 data-[disabled]:bg-muted/50 data-[disabled]:text-muted-foreground"
                  >
                    <Award className="mr-2 h-5 w-5" />
                    Show Play of the Game
                  </Button>
              </div>
            </div>
          </aside>
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

        {gameState.isFinished && <EndGameModal
          isOpen={isEndGameModalOpen}
          onClose={() => setIsEndGameModalOpen(false)}
          gameData={{
            boardSize: BOARD_SIZE,
            placements: gameState.placements,
            finalScores: {
              "You": gameState.players.human.score,
              "AI Opponent": gameState.players.ai.score
            }
          }}
          loading={loadingPlayOfTheGame}
          result={playOfTheGameResult}
        />}
        <HowToPlayModal
          isOpen={isHowToPlayModalOpen}
          onClose={() => setIsHowToPlayModalOpen(false)}
        />
      </div>
    </>
  );
}


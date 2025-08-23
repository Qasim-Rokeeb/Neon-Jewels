"use client";

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { getPlayOfTheGame } from '@/app/actions';
import { GameData } from '@/lib/types';
import { Skeleton } from './ui/skeleton';
import { Award, Bot, Quote, Share2, Sparkles, Star } from 'lucide-react';
import { PlayOfTheGameRecommenderOutput } from '@/ai/flows/play-of-the-game-recommender';

interface EndGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameData: GameData;
}

export default function EndGameModal({ isOpen, onClose, gameData }: EndGameModalProps) {
  const [result, setResult] = useState<PlayOfTheGameRecommenderOutput & {error?: string} | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchPlay = async () => {
        setLoading(true);
        setResult(null);
        const gameDataString = JSON.stringify(gameData);
        const res = await getPlayOfTheGame(gameDataString);
        setResult(res);
        setLoading(false);
      };
      fetchPlay();
    }
  }, [isOpen, gameData]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full bg-card/80 backdrop-blur-xl border-primary shadow-2xl shadow-primary/20 text-foreground font-body">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl text-center flex items-center justify-center gap-2">
            <Award className="text-primary w-6 h-6" /> Play of the Game
          </DialogTitle>
          <DialogDescription className="text-center">
            Our AI analyzes the match for the most impressive play.
          </DialogDescription>
        </DialogHeader>

        <div className="my-6 min-h-[200px] flex flex-col items-center justify-center">
          {loading && <LoadingState />}
          {result && !loading && <ResultState result={result} />}
        </div>
        
        <div className="flex justify-center">
          <Button variant="outline" className="w-full font-headline">
            <Share2 className="mr-2 h-4 w-4" /> Share Replay
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const LoadingState = () => (
    <div className="w-full space-y-4">
        <Skeleton className="h-16 w-3/4 mx-auto bg-muted/80" />
        <div className="space-y-2">
            <Skeleton className="h-4 w-full bg-muted/80" />
            <Skeleton className="h-4 w-5/6 bg-muted/80" />
        </div>
        <div className="flex items-center justify-center pt-2">
            <Bot className="w-6 h-6 animate-spin text-primary" />
            <p className="ml-2 text-sm text-muted-foreground">AI is thinking...</p>
        </div>
    </div>
);

const ResultState = ({ result }: { result: PlayOfTheGameRecommenderOutput & {error?: string} }) => {
    if (result.error) {
        return <p className="text-destructive">{result.error}</p>
    }

    return (
        <div className="text-center w-full flex flex-col items-center gap-4 p-4 rounded-lg bg-background/50">
           <div className="relative">
             <h3 className="font-headline text-5xl tracking-wider text-accent" style={{textShadow: '0 0 15px hsl(var(--accent)/0.8)'}}>
                {result.recommendedWord}
             </h3>
             <Sparkles className="absolute -top-2 -right-4 w-6 h-6 text-accent animate-pulse" />
           </div>

            <div className="text-left text-sm text-muted-foreground italic border-l-2 border-accent/50 pl-4 py-2 bg-accent/10 rounded-r-md">
                <Quote className="inline-block w-4 h-4 mr-2 text-accent/80" />
                {result.reason}
            </div>
        </div>
    );
}

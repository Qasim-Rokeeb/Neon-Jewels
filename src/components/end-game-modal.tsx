"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { GameData } from '@/lib/types';
import { Award, Bot, Quote, Share2, Sparkles } from 'lucide-react';
import { PlayOfTheGameRecommenderOutput } from '@/ai/flows/play-of-the-game-recommender';

interface EndGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameData: GameData;
  loading: boolean;
  result: (PlayOfTheGameRecommenderOutput & { error?: string | undefined; }) | null
}

export default function EndGameModal({ isOpen, onClose, loading, result }: EndGameModalProps) {

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full bg-background/80 backdrop-blur-xl border-primary shadow-2xl shadow-primary/30 text-foreground font-body">
        <DialogHeader>
          <DialogTitle className="font-headline text-3xl text-center flex items-center justify-center gap-2 text-primary" style={{textShadow: '0 0 10px hsl(var(--primary))'}}>
            <Award className="w-8 h-8" /> Play of the Game
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Our AI analyzes the match for the most impressive play.
          </DialogDescription>
        </DialogHeader>

        <div className="my-6 min-h-[200px] flex flex-col items-center justify-center bg-black/20 p-6 rounded-lg border border-border">
          {loading && <LoadingState />}
          {result && !loading && <ResultState result={result} />}
        </div>
        
        <div className="flex justify-center">
          <Button variant="outline" className="w-full font-headline border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground hover:shadow-[0_0_20px_hsl(var(--accent)/0.5)] transition-all">
            <Share2 className="mr-2 h-4 w-4" /> Share Replay
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const LoadingState = () => (
    <div className="w-full space-y-4 flex flex-col items-center animate-fade-in">
        <div className="flex items-center justify-center pt-4">
            <Bot className="w-8 h-8 animate-spin text-primary" />
            <p className="ml-3 text-lg text-muted-foreground tracking-widest">AI is thinking...</p>
        </div>
    </div>
);

const ResultState = ({ result }: { result: PlayOfTheGameRecommenderOutput & {error?: string} }) => {
    if (result.error) {
        return <p className="text-destructive">{result.error}</p>
    }

    return (
        <div className="text-center w-full flex flex-col items-center gap-6 p-4 rounded-lg animate-fade-in">
           <div className="relative">
             <h3 className="font-headline text-6xl tracking-wider text-accent" style={{textShadow: '0 0 20px hsl(var(--accent)), 0 0 40px hsl(var(--accent)/0.7)'}}>
                {result.recommendedWord}
             </h3>
             <Sparkles className="absolute -top-3 -right-5 w-8 h-8 text-accent animate-pulse" />
           </div>

            <div className="text-left text-base text-muted-foreground italic border-l-4 border-accent/50 pl-4 py-2 bg-accent/10 rounded-r-lg">
                <Quote className="inline-block w-5 h-5 mr-2 -mt-1 text-accent/80" />
                {result.reason}
            </div>
        </div>
    );
}

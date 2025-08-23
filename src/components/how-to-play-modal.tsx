"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { HelpCircle, Star, Gem, BrainCircuit } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HowToPlayModal({ isOpen, onClose }: HowToPlayModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-full bg-card/80 backdrop-blur-xl border-primary shadow-2xl shadow-primary/20 text-foreground font-body">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl text-center flex items-center justify-center gap-2">
            <HelpCircle className="text-primary w-6 h-6" /> How to Play Neon Jewels
          </DialogTitle>
          <DialogDescription className="text-center">
            Your guide to mastering the glowing grid.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="my-4 h-[60vh] pr-6">
            <div className="space-y-6 text-sm">
                <div className="space-y-2">
                    <h3 className="font-headline text-lg flex items-center gap-2 text-primary"><Star className="w-5 h-5" /> The Goal</h3>
                    <p className="text-muted-foreground pl-7">
                        The objective is to score more points than your opponent by placing tiles on the board to create words. Each game is a battle of wits and vocabulary on a futuristic, neon-lit grid.
                    </p>
                </div>

                <div className="space-y-2">
                    <h3 className="font-headline text-lg flex items-center gap-2 text-primary"><Gem className="w-5 h-5" /> Gameplay</h3>
                    <ul className="list-disc space-y-2 pl-12 text-muted-foreground">
                        <li>Each player starts with a rack of 7 letter tiles.</li>
                        <li>The first player places a word on the center star square.</li>
                        <li>Subsequent words must connect to existing words on the board, crossword-style.</li>
                        <li>Draw new tiles after each turn to replenish your rack to 7.</li>
                        <li>The game ends when all tiles have been drawn and one player uses their last tile, or after three consecutive scoreless turns.</li>
                    </ul>
                </div>

                <div className="space-y-2">
                    <h3 className="font-headline text-lg flex items-center gap-2 text-primary"><BrainCircuit className="w-5 h-5" /> Scoring & Multipliers</h3>
                    <p className="text-muted-foreground pl-7">
                        Points are the currency of victory. Here's how you earn them:
                    </p>
                    <ul className="list-disc space-y-2 pl-12 text-muted-foreground">
                        <li>Each letter tile has a point value.</li>
                        <li>The score for a word is the sum of the letter values in that word.</li>
                        <li>
                            <strong>Bonus Squares:</strong> Strategically placing words on special squares can dramatically increase your score:
                            <ul className="list-disc space-y-1 pl-6 mt-2">
                                <li className="text-blue-400"><strong>DL (Double Letter):</strong> Doubles the points for the letter on this square.</li>
                                <li className="text-accent"><strong>TL (Triple Letter):</strong> Triples the points for the letter on this square.</li>
                                <li className="text-primary"><strong>DW (Double Word):</strong> Doubles the total score for the entire word.</li>
                                <li className="text-destructive"><strong>TW (Triple Word):</strong> Triples the total score for the entire word.</li>
                            </ul>
                        </li>
                         <li>Multiplier bonuses are only counted on the turn they are used.</li>
                    </ul>
                </div>
            </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}


"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { WordGlowLogo } from '@/components/icons';
import { Github, PlayCircle } from 'lucide-react';

export default function Home() {
  return (
    <>
      <div className="fixed inset-0 -z-10 nebula-bg" />
      <div className="relative flex flex-col min-h-screen font-body text-foreground">
        <header className="w-full p-4 flex justify-between items-center bg-transparent animate-fade-in-down container mx-auto">
          <div className="flex items-center gap-3">
            <WordGlowLogo className="w-8 h-8 sm:w-10 sm:h-10" />
            <h1 className="text-xl sm:text-2xl font-headline tracking-widest uppercase">WordGlow</h1>
          </div>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon">
              <Github className="w-5 h-5" />
            </Button>
          </a>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center text-center container mx-auto p-4 animate-fade-in animation-delay-300">
            <h2 className="font-headline text-5xl md:text-7xl text-primary" style={{textShadow: '0 0 20px hsl(var(--primary))'}}>
              Weave Words of Light
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Challenge a cunning AI opponent in a futuristic word battle. Strategize, score, and shine in a dazzling display of vocabulary and tactics.
            </p>
            <div className="mt-8">
              <Link href="/game">
                <Button 
                  size="lg"
                  className="font-headline text-lg tracking-wider bg-primary/80 backdrop-blur-sm border border-primary hover:bg-primary transition-all duration-300 ease-in-out shadow-[0_0_20px_hsl(var(--primary)/0.5),inset_0_0_10px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.8)] hover:scale-105 animate-pulse-slow"
                >
                  <PlayCircle className="mr-2 h-6 w-6" />
                  Start New Game
                </Button>
              </Link>
            </div>
        </main>

        <footer className="w-full text-center text-muted-foreground text-sm py-6 animate-fade-in-up animation-delay-500 container mx-auto">
          <p>&copy; {new Date().getFullYear()} WordGlow. All Rights Reserved.</p>
        </footer>
      </div>
    </>
  );
}


import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Crown, User, Bot } from 'lucide-react';

interface PlayerInfoProps {
  playerName: string;
  score: number;
  isCurrentPlayer: boolean;
  isWinner?: boolean;
}

export default function PlayerInfo({ playerName, score, isCurrentPlayer, isWinner = false }: PlayerInfoProps) {
  const isAI = playerName === "AI Opponent";

  return (
    <div
      className={cn(
        'relative flex-shrink-0 w-full lg:max-w-xs p-4 rounded-xl border bg-card/50 backdrop-blur-md transition-all duration-500 ease-elegant overflow-hidden',
        'border-border/20 shadow-xl',
        isCurrentPlayer ? 'border-primary shadow-primary/20' : '',
        isWinner ? 'border-amber-400 shadow-amber-400/20' : ''
      )}
    >
      <div className={cn(
          "absolute inset-x-0 top-0 h-1.5 transition-all duration-500",
          isWinner ? "bg-amber-400" : (isCurrentPlayer ? "bg-primary" : "bg-transparent"),
          isWinner && "shadow-[0_0_10px_theme(colors.amber.400)]",
          isCurrentPlayer && "shadow-[0_0_10px_hsl(var(--primary))]"
      )}/>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className={cn('h-14 w-14 border-2', isAI ? 'border-accent' : 'border-primary' )}>
              {isAI ? <Bot className="h-8 w-8 text-accent" /> : <User className="h-8 w-8 text-primary" />}
            </Avatar>
          </div>
          <h2 className="font-headline text-xl tracking-wider">{playerName}</h2>
        </div>
        {isWinner && <Crown className="w-7 h-7 text-amber-400 animate-pulse" />}
      </div>

      <div className="mt-4 flex justify-end">
         <div className="relative p-2 rounded-md">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-25" />
            <p className="relative font-headline text-5xl text-foreground" style={{textShadow: '0 0 10px hsl(var(--foreground)/0.7)'}}>
              {score}
            </p>
         </div>
      </div>
    </div>
  );
}

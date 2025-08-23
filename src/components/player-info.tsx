import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Crown } from 'lucide-react';

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
        'flex-shrink-0 w-full lg:w-56 p-4 rounded-xl border bg-card/50 backdrop-blur-md transition-all duration-500 ease-elegant',
        isCurrentPlayer ? 'border-primary shadow-2xl shadow-primary/20' : 'border-border',
        isWinner ? 'border-amber-400 shadow-2xl shadow-amber-400/20' : ''
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className={cn(isWinner && 'border-2 border-amber-400')}>
            <AvatarImage src={`https://placehold.co/64x64/1B1B2F/7B68EE.png?text=${playerName.charAt(0)}`} />
            <AvatarFallback>{playerName.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="font-headline text-lg">{playerName}</h2>
        </div>
        {isWinner && <Crown className="w-6 h-6 text-amber-400" />}
      </div>

      <div className="mt-4 text-right">
        <p className="text-sm text-muted-foreground">Score</p>
        <p className="font-headline text-5xl text-primary" style={{textShadow: '0 0 10px hsl(var(--primary)/0.7)'}}>
          {score}
        </p>
      </div>
    </div>
  );
}

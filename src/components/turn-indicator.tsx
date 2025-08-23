import { cn } from '@/lib/utils';
import { User, Bot, Loader } from 'lucide-react';

interface TurnIndicatorProps {
  turn: 'human' | 'ai';
  isAiThinking: boolean;
  isFinished: boolean;
}

export default function TurnIndicator({ turn, isAiThinking, isFinished }: TurnIndicatorProps) {

  if (isFinished) {
    return (
       <div className="flex items-center justify-center gap-3 p-3 rounded-lg bg-card/50 border border-border">
          <span className="font-headline text-lg">Game Over</span>
       </div>
    )
  }
  
  const isPlayerTurn = turn === 'human';

  return (
    <div className={cn(
        "flex items-center justify-center gap-3 p-3 rounded-lg bg-card/50 border transition-all",
        isPlayerTurn ? "border-primary" : "border-accent",
        isAiThinking && "animate-pulse"
    )}>
      {isAiThinking ? (
         <Loader className="w-6 h-6 animate-spin text-accent" />
      ) : (
        isPlayerTurn ? <User className="w-6 h-6 text-primary" /> : <Bot className="w-6 h-6 text-accent" />
      )}
      <span className="font-headline text-lg">
        {isAiThinking ? 'AI is Thinking...' : (isPlayerTurn ? "Your Turn" : "AI's Turn")}
      </span>
    </div>
  );
}

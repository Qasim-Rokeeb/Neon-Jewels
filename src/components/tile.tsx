import { cn } from '@/lib/utils';

interface TileProps {
  letter: string;
  player: number;
}

const TILE_POINTS: { [key: string]: number } = {
  A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8, K: 5, L: 1, M: 3,
  N: 1, O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4, W: 4, X: 8, Y: 4, Z: 10
};

export default function Tile({ letter, player }: TileProps) {
  const points = TILE_POINTS[letter.toUpperCase()] || 0;
  const playerClass = player === 1 
    ? "bg-primary/30 border-primary text-primary-foreground shadow-primary/40"
    : "bg-accent/30 border-accent text-accent-foreground shadow-accent/40";

  return (
    <div
      className={cn(
        'relative flex items-center justify-center w-full h-full rounded-md border backdrop-blur-sm',
        'font-headline transition-all duration-300 ease-elegant transform-gpu animate-pop-in',
        playerClass
      )}
    >
      <span
        className="text-lg md:text-xl lg:text-2xl font-bold"
        style={{ textShadow: '0 0 5px hsl(var(--foreground)), 0 0 10px currentColor' }}
      >
        {letter.toUpperCase()}
      </span>
      <span className="absolute bottom-0 right-1 text-[8px] md:text-[10px] font-sans font-bold">
        {points}
      </span>
    </div>
  );
}

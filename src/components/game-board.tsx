import { WordPlacement, BoardSquare } from '@/lib/types';
import Tile from './tile';
import { cn } from '@/lib/utils';

interface GameBoardProps {
  board: BoardSquare[][];
}

const MULTIPLIERS: { [key: string]: { label: string; className: string } } = {
  '0,0': { label: 'TW', className: 'bg-destructive/60' }, '0,7': { label: 'TW', className: 'bg-destructive/60' }, '0,14': { label: 'TW', className: 'bg-destructive/60' },
  '7,0': { label: 'TW', className: 'bg-destructive/60' }, '7,14': { label: 'TW', className: 'bg-destructive/60' },
  '14,0': { label: 'TW', className: 'bg-destructive/60' }, '14,7': { label: 'TW', className: 'bg-destructive/60' }, '14,14': { label: 'TW', className: 'bg-destructive/60' },
  '1,1': { label: 'DW', className: 'bg-primary/50' }, '2,2': { label: 'DW', className: 'bg-primary/50' }, '3,3': { label: 'DW', className: 'bg-primary/50' }, '4,4': { label: 'DW', className: 'bg-primary/50' },
  '1,13': { label: 'DW', className: 'bg-primary/50' }, '2,12': { label: 'DW', className: 'bg-primary/50' }, '3,11': { label: 'DW', className: 'bg-primary/50' }, '4,10': { label: 'DW', className: 'bg-primary/50' },
  '10,4': { label: 'DW', className: 'bg-primary/50' }, '11,3': { label: 'DW', className: 'bg-primary/50' }, '12,2': { label: 'DW', className: 'bg-primary/50' }, '13,1': { label: 'DW', className: 'bg-primary/50' },
  '10,10': { label: 'DW', className: 'bg-primary/50' }, '11,11': { label: 'DW', className: 'bg-primary/50' }, '12,12': { label: 'DW', className: 'bg-primary/50' }, '13,13': { label: 'DW', className: 'bg-primary/50' },
  '7,7': { label: '★', className: 'bg-primary/50' },
  '1,5': { label: 'TL', className: 'bg-accent/60' }, '1,9': { label: 'TL', className: 'bg-accent/60' }, '5,1': { label: 'TL', className: 'bg-accent/60' }, '5,5': { label: 'TL', className: 'bg-accent/60' },
  '5,9': { label: 'TL', className: 'bg-accent/60' }, '5,13': { label: 'TL', className: 'bg-accent/60' }, '9,1': { label: 'TL', className: 'bg-accent/60' }, '9,5': { label: 'TL', className: 'bg-accent/60' },
  '9,9': { label: 'TL', className: 'bg-accent/60' }, '9,13': { label: 'TL', className: 'bg-accent/60' }, '13,5': { label: 'TL', className: 'bg-accent/60' }, '13,9': { label: 'TL', className: 'bg-accent/60' },
  '0,3': { label: 'DL', className: 'bg-blue-500/50' }, '0,11': { label: 'DL', className: 'bg-blue-500/50' }, '2,6': { label: 'DL', className: 'bg-blue-500/50' }, '2,8': { label: 'DL', className: 'bg-blue-500/50' },
  '3,0': { label: 'DL', className: 'bg-blue-500/50' }, '3,7': { label: 'DL', className: 'bg-blue-500/50' }, '3,14': { label: 'DL', className: 'bg-blue-500/50' }, '6,2': { label: 'DL', className: 'bg-blue-500/50' },
  '6,6': { label: 'DL', className: 'bg-blue-500/50' }, '6,8': { label: 'DL', className: 'bg-blue-500/50' }, '6,12': { label: 'DL', className: 'bg-blue-500/50' }, '7,3': { label: 'DL', className: 'bg-blue-500/50' },
  '7,11': { label: 'DL', className: 'bg-blue-500/50' }, '8,2': { label: 'DL', className: 'bg-blue-500/50' }, '8,6': { label: 'DL', className: 'bg-blue-500/50' }, '8,8': { label: 'DL', className: 'bg-blue-500/50' },
  '8,12': { label: 'DL', className: 'bg-blue-500/50' }, '11,0': { label: 'DL', className: 'bg-blue-500/50' }, '11,7': { label: 'DL', className: 'bg-blue-500/50' }, '11,14': { label: 'DL', className: 'bg-blue-500/50' },
  '12,6': { label: 'DL', className: 'bg-blue-500/50' }, '12,8': { label: 'DL', className: 'bg-blue-500/50' }, '14,3': { label: 'DL', className: 'bg-blue-500/50' }, '14,11': { label: 'DL', className: 'bg-blue-500/50' },
};


export default function GameBoard({ board }: GameBoardProps) {

  return (
    <div className="p-2 md:p-4 bg-card/50 backdrop-blur-md rounded-xl border border-border shadow-2xl shadow-primary/10">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${board.length}, minmax(0, 1fr))`,
          gap: '2px',
        }}
      >
        {board.map((row, y) =>
          row.map((cell, x) => {
            const multiplier = MULTIPLIERS[`${y},${x}`];
            return (
              <div
                key={`${y}-${x}`}
                className={cn(
                  'aspect-square w-full flex items-center justify-center rounded-sm bg-card/50',
                  multiplier?.className,
                  'transition-all duration-300 ease-elegant'
                )}
              >
                {cell ? (
                  <Tile letter={cell.letter} player={cell.player} />
                ) : (
                  multiplier && (
                    <span className="text-xs font-bold text-foreground/30">{multiplier.label}</span>
                  )
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

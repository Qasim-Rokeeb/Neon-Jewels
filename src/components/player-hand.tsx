import Tile from './tile';

interface PlayerHandProps {
  tiles: string[];
}

export default function PlayerHand({ tiles }: PlayerHandProps) {
  return (
    <div className="flex justify-center gap-1 sm:gap-2 p-2 rounded-lg bg-black/10">
      {tiles.map((letter, index) => (
        <div key={index} className="w-10 h-10 sm:w-12 sm:h-12">
            <Tile letter={letter} player={1} />
        </div>
      ))}
    </div>
  );
}

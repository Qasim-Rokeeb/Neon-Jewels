import { cn } from "@/lib/utils";

export function WordGlowLogo({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <defs>
          <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "hsl(var(--primary))" }} />
            <stop offset="100%" style={{ stopColor: "hsl(var(--accent))" }} />
          </linearGradient>
           <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
        </filter>
        </defs>
        <path
          d="M50 2L98 25V75L50 98L2 75V25L50 2Z"
          stroke="url(#logo-grad)"
          strokeWidth="4"
          filter="url(#glow)"
        />
        <text
          x="50%"
          y="62%"
          className="font-headline"
          fontSize="36"
          fill="hsl(var(--foreground))"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          WG
        </text>
      </svg>
    </div>
  );
}

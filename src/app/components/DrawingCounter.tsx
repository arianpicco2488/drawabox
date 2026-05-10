import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

interface DrawingCounterProps {
  target: number;
  onComplete?: () => void;
  className?: string;
}

export function DrawingCounter({ target, onComplete, className = '' }: DrawingCounterProps) {
  const [count, setCount] = useState(0);
  const isGoalReached = count >= target;

  return (
    <div className={`flex flex-col items-center justify-center gap-6 ${className}`}>
      <div className="flex flex-col items-center gap-3">
        <p className="text-[0.6875rem] font-semibold text-muted-foreground uppercase tracking-widest">
          Drawings completed
        </p>
        <div className="flex items-center gap-5">
          <button
            onClick={() => setCount((c) => Math.max(0, c - 1))}
            disabled={count === 0}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-[#e49944] hover:text-[#e49944] disabled:opacity-30 transition-all duration-150 cursor-pointer"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-mono text-5xl font-bold tabular-nums text-foreground w-24 text-center">
            {count}
          </span>
          <button
            onClick={() => setCount((c) => c + 1)}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-[#e49944] hover:text-[#e49944] transition-all duration-150 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[0.8125rem] text-muted-foreground">
          Goal:{' '}
          <span className={`font-semibold ${isGoalReached ? 'text-green-500' : 'text-foreground'}`}>
            {target}
          </span>
        </p>
        {isGoalReached && (
          <p className="text-[0.875rem] text-green-500 font-semibold">Goal reached!</p>
        )}
      </div>

      <button
        onClick={onComplete}
        className="h-11 px-8 rounded-full bg-[#e49944] hover:bg-[#c47c20] text-[#1a0e00] font-semibold text-[0.8125rem] uppercase tracking-[0.08em] transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.97] cursor-pointer"
      >
        Done
      </button>
    </div>
  );
}

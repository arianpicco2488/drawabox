import { useEffect, useRef, useState } from 'react';

const TOTAL_SECONDS = 15 * 60;
const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

interface DrawingCountdownProps {
  onComplete?: () => void;
  className?: string;
}

export function DrawingCountdown({ onComplete, className = '' }: DrawingCountdownProps) {
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const isComplete = secondsLeft <= 0;
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          onCompleteRef.current?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  const progress = secondsLeft / TOTAL_SECONDS;
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <div className="relative w-40 h-40">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          {/* Track */}
          <circle
            cx="60" cy="60" r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            className="text-border"
          />
          {/* Progress arc */}
          <circle
            cx="60" cy="60" r={RADIUS}
            fill="none"
            stroke={isComplete ? '#22c55e' : '#e49944'}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-2xl font-bold tabular-nums text-foreground">
            {isComplete ? '00:00' : formatTime(secondsLeft)}
          </span>
          <span className="text-[0.625rem] font-semibold text-muted-foreground uppercase tracking-widest mt-0.5">
            {isComplete ? 'Done!' : 'remaining'}
          </span>
        </div>
      </div>
      <p className="text-[0.875rem] text-muted-foreground text-center">
        {isComplete ? "Great work — time's up!" : 'Warm-up in progress'}
      </p>
    </div>
  );
}

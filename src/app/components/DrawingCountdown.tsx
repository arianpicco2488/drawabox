import { useEffect, useRef, useState } from 'react';

const TOTAL_SECONDS = 15 * 60; // 15:00 in seconds

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':');
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

  return (
    <div className={`flex flex-col items-center justify-center gap-2 ${className}`}>
      <div className="font-mono text-4xl font-semibold tabular-nums text-foreground">
        {isComplete ? '00:00:00' : formatTime(secondsLeft)}
      </div>
      <p className="text-[0.8125rem] text-muted-foreground">
        {isComplete ? "Time's up!" : 'Warm-up in progress'}
      </p>
    </div>
  );
}

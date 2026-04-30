import { useState } from 'react';
import { motion } from 'motion/react';

export interface RouletteExercise {
  name: string;
  lesson: number;
  instructions: string;
  imageUrl: string;
}

interface RouletteWheelProps {
  exercises: RouletteExercise[];
  onResult: (exercise: RouletteExercise) => void;
  size?: number;
}

export function RouletteWheel({ exercises, onResult, size }: RouletteWheelProps) {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const segmentAngle = 360 / exercises.length;
  const wheelSize = size ?? 288;
  const radius = wheelSize / 2;
  const labelOffset = Math.round(radius * 0.347);
  const labelWidth = Math.round(radius * 0.625);
  const hubSize = Math.round(wheelSize * 0.194);
  const labelFontSize = Math.round(wheelSize * 0.031);

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);

    const spins = 5 + Math.random() * 3;
    const randomIndex = Math.floor(Math.random() * exercises.length);
    const finalAngle = 360 * spins + (randomIndex * segmentAngle) + segmentAngle / 2;

    setRotation(finalAngle);

    setTimeout(() => {
      setIsSpinning(false);
      const normalizedRotation = finalAngle % 360;
      const selectedIndex = Math.floor(((360 - normalizedRotation + segmentAngle / 2) % 360) / segmentAngle) % exercises.length;
      onResult(exercises[selectedIndex]);
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative">
        <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[16px] border-t-[#e67e22]" />
      </div>

      <div className="relative" style={{ width: wheelSize, height: wheelSize }}>
        <motion.div
          className="w-full h-full rounded-full relative overflow-hidden border-2 border-[#e5e2dc] shadow-sm"
          style={{
            rotate: rotation,
            background: 'conic-gradient(from 0deg, #f5f5f4 0deg, #e7e5e4 22.5deg, #f5f5f4 45deg, #e7e5e4 67.5deg, #f5f5f4 90deg, #e7e5e4 112.5deg, #f5f5f4 135deg, #e7e5e4 157.5deg, #f5f5f4 180deg, #e7e5e4 202.5deg, #f5f5f4 225deg, #e7e5e4 247.5deg, #f5f5f4 270deg, #e7e5e4 292.5deg, #f5f5f4 315deg, #e7e5e4 337.5deg)'
          }}
          animate={{ rotate: rotation }}
          transition={{ duration: 4, ease: "easeOut" }}
        >
          {exercises.map((exercise, index) => {
            const angle = index * segmentAngle;
            return (
              <div
                key={index}
                className="absolute top-1/2 left-1/2 origin-left"
                style={{
                  transform: `rotate(${angle}deg) translateX(${labelOffset}px)`,
                  width: labelWidth
                }}
              >
                <p className="text-[#2b2b2b] font-medium leading-tight" style={{ fontSize: labelFontSize }}>
                  {exercise.name}
                </p>
              </div>
            );
          })}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border-2 border-[#e67e22]/30 flex items-center justify-center shadow-sm" style={{ width: hubSize, height: hubSize }}>
            <div className="text-[#e67e22] text-[0.625rem] font-bold text-center leading-tight">
              WARM<br/>UP
            </div>
          </div>
        </motion.div>
      </div>

      <button
        onClick={handleSpin}
        disabled={isSpinning}
        className="h-12 px-8 rounded-xl bg-[#e67e22] hover:bg-[#cf6d17] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-[0.9375rem] transition-colors"
      >
        {isSpinning ? 'Spinning…' : 'Spin'}
      </button>
    </div>
  );
}

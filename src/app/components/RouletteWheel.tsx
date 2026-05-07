import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { motion } from 'motion/react';

export interface RouletteExercise {
  name: string;
  lesson: number;
  instructions: string;
  imageUrl: string;
}

export interface RouletteWheelHandle {
  spin: () => void;
}

interface RouletteWheelProps {
  exercises: RouletteExercise[];
  onResult: (exercise: RouletteExercise) => void;
  onSpinningChange?: (spinning: boolean) => void;
  size?: number;
}

export const RouletteWheel = forwardRef<RouletteWheelHandle, RouletteWheelProps>(
  ({ exercises, onResult, onSpinningChange, size }, ref) => {
    const [rotation, setRotation] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const isSpinningRef = useRef(false);
    const exercisesRef = useRef(exercises);
    exercisesRef.current = exercises;

    const segmentAngle = 360 / exercises.length;
    const wheelSize = size ?? 300;
    const radius = wheelSize / 2;
    const labelOffset = Math.round(radius * 0.347);
    const labelWidth = Math.round(radius * 0.625);
    const hubSize = Math.round(wheelSize * 0.194);
    const labelFontSize = Math.round(wheelSize * 0.031);

    const handleSpin = () => {
      if (isSpinningRef.current) return;
      isSpinningRef.current = true;
      setIsSpinning(true);
      onSpinningChange?.(true);

      const exs = exercisesRef.current;
      const arc = 360 / exs.length;
      const spins = 5 + Math.random() * 3;
      const randomIndex = Math.floor(Math.random() * exs.length);
      const finalAngle = 360 * spins + (randomIndex * arc) + arc / 2;

      setRotation(finalAngle);

      setTimeout(() => {
        isSpinningRef.current = false;
        setIsSpinning(false);
        onSpinningChange?.(false);
        const normalizedRotation = finalAngle % 360;
        const selectedIndex =
          Math.floor(((360 - normalizedRotation + arc / 2) % 360) / arc) % exs.length;
        onResult(exs[selectedIndex]);
      }, 4000);
    };

    useImperativeHandle(ref, () => ({ spin: handleSpin }));

    return (
      <div className="flex flex-col items-center">
        <div style={{ marginBottom: -(hubSize / 4) }} className="z-10 relative">
          <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-[#e49944] drop-shadow-md" />
        </div>

        <div className="relative" style={{ width: wheelSize, height: wheelSize }}>
          <motion.div
            className="w-full h-full rounded-full relative overflow-hidden border-4 border-[#e49944]/25 shadow-xl"
            style={{
              rotate: rotation,
              background:
                'conic-gradient(from 0deg, #2e2e2e 0deg, #242424 22.5deg, #2e2e2e 45deg, #242424 67.5deg, #2e2e2e 90deg, #242424 112.5deg, #2e2e2e 135deg, #242424 157.5deg, #2e2e2e 180deg, #242424 202.5deg, #2e2e2e 225deg, #242424 247.5deg, #2e2e2e 270deg, #242424 292.5deg, #2e2e2e 315deg, #242424 337.5deg)',
            }}
            animate={{ rotate: rotation }}
            transition={{ duration: 4, ease: 'easeOut' }}
          >
            {exercises.map((exercise, index) => {
              const angle = index * segmentAngle;
              return (
                <div
                  key={index}
                  className="absolute top-1/2 left-1/2 origin-left"
                  style={{
                    transform: `rotate(${angle}deg) translateX(${labelOffset}px)`,
                    width: labelWidth,
                  }}
                >
                  <p
                    className="text-[#e8e8e8] font-medium leading-tight"
                    style={{ fontSize: labelFontSize }}
                  >
                    {exercise.name}
                  </p>
                </div>
              );
            })}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1a1a1a] border-2 border-[#e49944]/60 flex items-center justify-center shadow-md"
              style={{ width: hubSize, height: hubSize }}
            >
              <div className="text-[#e49944] text-[0.5625rem] font-bold text-center leading-tight uppercase tracking-wide">
                WARM
                <br />
                UP
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }
);

RouletteWheel.displayName = 'RouletteWheel';

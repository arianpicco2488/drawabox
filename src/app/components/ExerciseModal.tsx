import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Play } from 'lucide-react';
import { DrawingCountdown } from './DrawingCountdown';

interface ExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  exercise: {
    name: string;
    lesson: number;
    description: string;
    imageUrl: string;
  } | null;
}

export function ExerciseModal({ isOpen, onClose, exercise }: ExerciseModalProps) {
  const [isCountingDown, setIsCountingDown] = useState(false);

  const handleClose = (open: boolean) => {
    if (!open) {
      setIsCountingDown(false);
      onClose();
    }
  };

  if (!exercise) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-card border border-border text-foreground max-w-sm mx-4 rounded-2xl shadow-lg">
        {isCountingDown ? (
          <div className="py-8">
            <DrawingCountdown onComplete={() => setIsCountingDown(false)} />
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-foreground pr-8">
                {exercise.name}
              </DialogTitle>
              <p className="text-[0.8125rem] text-muted-foreground">Lesson {exercise.lesson}</p>
            </DialogHeader>

            <div className="my-4 rounded-xl overflow-hidden border border-border">
              <img
                src={exercise.imageUrl}
                alt={exercise.name}
                className="w-full h-44 object-cover"
              />
            </div>

            <div className="mb-5">
              <h3 className="text-[0.75rem] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Description
              </h3>
              <p className="text-foreground text-[0.9375rem] leading-relaxed">
                {exercise.description}
              </p>
            </div>

            <button
              onClick={() => setIsCountingDown(true)}
              className="w-full h-12 rounded-xl bg-[#e67e22] hover:bg-[#cf6d17] text-white font-semibold text-[0.9375rem] flex items-center justify-center gap-2 transition-colors"
            >
              <Play className="w-4 h-4" fill="currentColor" />
              Start Drawing
            </button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

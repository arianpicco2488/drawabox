import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { RouletteWheel, type RouletteExercise, type RouletteWheelHandle } from '../components/RouletteWheel';
import { DrawingCountdown } from '../components/DrawingCountdown';
import { AppHeader } from '../components/AppHeader';
import { BottomNav } from '../components/BottomNav';
import { useCompletedLessons } from '../context/CompletedLessonsContext';
import { allExercises } from '../data/exercises';
import { Dialog, DialogContent } from '../components/ui/dialog';
import { Play, RotateCcw } from 'lucide-react';

export default function WarmUpSelector() {
  const navigate = useNavigate();
  const { completedLessonIds } = useCompletedLessons();
  const [selectedExercise, setSelectedExercise] = useState<RouletteExercise | null>(null);
  const [showCountdown, setShowCountdown] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const wheelRef = useRef<RouletteWheelHandle>(null);

  const wheelExercises: RouletteExercise[] = useMemo(() => {
    const completedSet = new Set(completedLessonIds);
    return allExercises
      .filter((e) => completedSet.has(e.lesson))
      .map((e) => ({
        name: e.name,
        lesson: e.lesson,
        instructions: e.description,
        imageUrl: e.imageUrl,
      }));
  }, [completedLessonIds]);

  const hasCompletedLessons = wheelExercises.length > 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BottomNav />
      <div className="max-w-[680px] mx-auto min-h-screen">
        <AppHeader
          title="Warm-Up"
          titleAccent="Selector"
          subtitle={
            hasCompletedLessons
              ? 'Spin for a random exercise from your completed lessons'
              : 'Complete a lesson on the dashboard to unlock the wheel'
          }
          subtitleAlign="center"
          showBack
          onBack={() => navigate('/')}
        />

        <div className="px-6 pb-24 md:pb-8">
          {hasCompletedLessons ? (
            <>
              {/* Wheel + right panel side by side */}
              <div className="flex items-start gap-8 flex-wrap justify-center">
                <div className="flex-shrink-0">
                  <RouletteWheel
                    ref={wheelRef}
                    exercises={wheelExercises}
                    onResult={setSelectedExercise}
                    onSpinningChange={setIsSpinning}
                    size={300}
                  />
                </div>

                {/* Right panel */}
                <div className="flex flex-col gap-3 min-w-[180px] flex-1">
                  {/* Pill */}
                  <div className="inline-flex items-center gap-2 bg-card px-4 py-2 rounded-full border border-border/50 w-fit">
                    <div className="w-2 h-2 rounded-full bg-[#e49944] flex-shrink-0" />
                    <span className="text-[0.8125rem] text-muted-foreground whitespace-nowrap">
                      <span className="font-semibold text-foreground">{wheelExercises.length}</span>{' '}
                      exercise{wheelExercises.length === 1 ? '' : 's'} from{' '}
                      {completedLessonIds.length} lesson{completedLessonIds.length === 1 ? '' : 's'}
                    </span>
                  </div>

                  {/* Result card */}
                  <div className="bg-card border border-border/50 rounded-xl p-4 min-h-[80px] flex flex-col justify-center">
                    <p className="text-[0.6875rem] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5">
                      Selected exercise
                    </p>
                    {selectedExercise ? (
                      <p className="text-[0.9375rem] font-medium text-foreground leading-snug">
                        {selectedExercise.name}
                      </p>
                    ) : (
                      <p className="text-[0.8125rem] text-muted-foreground italic">
                        Spin the wheel to find out…
                      </p>
                    )}
                  </div>

                  {/* Spin / action buttons */}
                  {selectedExercise ? (
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => setShowCountdown(true)}
                        className="h-11 rounded-full bg-[#e49944] hover:bg-[#c47c20] text-[#1a0e00] font-semibold text-[0.8125rem] uppercase tracking-[0.08em] flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer active:scale-[0.97] w-full"
                      >
                        <Play className="w-3.5 h-3.5" fill="currentColor" />
                        Start
                      </button>
                      <button
                        onClick={() => {
                          setSelectedExercise(null);
                          wheelRef.current?.spin();
                        }}
                        disabled={isSpinning}
                        className="h-11 rounded-full border border-[#e49944]/60 text-[#e49944] font-semibold text-[0.8125rem] uppercase tracking-[0.08em] flex items-center justify-center gap-2 hover:bg-[#e49944]/8 hover:border-[#e49944] transition-all duration-200 cursor-pointer disabled:opacity-50 w-full"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Spin Again
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => wheelRef.current?.spin()}
                      disabled={isSpinning}
                      className="h-11 rounded-full bg-[#e49944] hover:bg-[#c47c20] disabled:opacity-50 disabled:cursor-not-allowed text-[#1a0e00] font-semibold text-[0.8125rem] uppercase tracking-[0.08em] transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.97] w-full"
                    >
                      {isSpinning ? 'Spinning…' : 'Spin the Wheel'}
                    </button>
                  )}
                </div>
              </div>

              {/* Exercise detail card below */}
              {selectedExercise && (
                <div className="mt-6 rounded-2xl border border-border bg-card shadow-md overflow-hidden">
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={selectedExercise.imageUrl}
                      alt={selectedExercise.name}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 pt-2">
                      <span className="inline-flex items-center rounded-md bg-[#e49944]/15 text-[#e49944] text-[0.6875rem] font-semibold px-2 py-0.5 mb-1">
                        Lesson {selectedExercise.lesson}
                      </span>
                      <h2 className="text-lg font-bold text-foreground leading-snug">
                        {selectedExercise.name}
                      </h2>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-[0.6875rem] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5">
                      Instructions
                    </h3>
                    <p className="text-foreground text-[0.9375rem] leading-relaxed">
                      {selectedExercise.instructions}
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-14 px-6 rounded-2xl border border-dashed border-border bg-card/60">
              <p className="text-muted-foreground text-center text-[0.9375rem] leading-relaxed mb-6 max-w-[260px]">
                Mark at least one lesson as completed on the dashboard, then return here to spin the wheel.
              </p>
              <button
                onClick={() => navigate('/')}
                className="h-11 px-7 rounded-full bg-[#e49944] hover:bg-[#c47c20] text-[#1a0e00] font-semibold text-[0.8125rem] uppercase tracking-[0.06em] transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
              >
                Go to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>

      <Dialog open={showCountdown} onOpenChange={(open) => !open && setShowCountdown(false)}>
        <DialogContent className="bg-card border border-border text-foreground max-w-sm mx-4 md:mx-auto rounded-2xl shadow-xl">
          <div className="py-8">
            <DrawingCountdown onComplete={() => setShowCountdown(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

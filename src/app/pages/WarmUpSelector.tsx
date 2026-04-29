import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { RouletteWheel, type RouletteExercise } from '../components/RouletteWheel';
import { DrawingCountdown } from '../components/DrawingCountdown';
import { AppHeader } from '../components/AppHeader';
import { useCompletedLessons } from '../context/CompletedLessonsContext';
import { allExercises } from '../data/exercises';
import { Dialog, DialogContent } from '../components/ui/dialog';
import { Play, RotateCcw } from 'lucide-react';

export default function WarmUpSelector() {
  const navigate = useNavigate();
  const { completedLessonIds } = useCompletedLessons();
  const [selectedExercise, setSelectedExercise] = useState<RouletteExercise | null>(null);
  const [showCountdown, setShowCountdown] = useState(false);

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

  const handleResult = (exercise: RouletteExercise) => {
    setSelectedExercise(exercise);
  };

  const handleSpinAgain = () => {
    setSelectedExercise(null);
  };

  const hasCompletedLessons = wheelExercises.length > 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-md mx-auto min-h-screen relative">
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

        <div className="px-5 py-6">
          {hasCompletedLessons ? (
            <RouletteWheel exercises={wheelExercises} onResult={handleResult} />
          ) : (
            <div className="flex flex-col items-center justify-center py-14 px-6 rounded-2xl border border-dashed border-border bg-card/60">
              <p className="text-muted-foreground text-center text-[0.9375rem] leading-relaxed mb-6 max-w-[260px]">
                Mark at least one lesson as completed on the dashboard, then return here to spin the wheel.
              </p>
              <button
                onClick={() => navigate('/')}
                className="h-12 px-6 rounded-xl bg-[#e67e22] hover:bg-[#cf6d17] text-white font-semibold text-[0.9375rem] transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          )}
        </div>

        {selectedExercise && (
          <div className="px-5 pb-8">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-foreground mb-0.5">
                  {selectedExercise.name}
                </h2>
                <p className="text-muted-foreground text-[0.8125rem]">Lesson {selectedExercise.lesson}</p>
              </div>
              <div className="mb-4 rounded-xl overflow-hidden border border-border">
                <img
                  src={selectedExercise.imageUrl}
                  alt={selectedExercise.name}
                  className="w-full h-28 object-cover"
                />
              </div>
              <div className="mb-5">
                <h3 className="text-[0.75rem] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                  Instructions
                </h3>
                <p className="text-foreground text-[0.9375rem] leading-relaxed">
                  {selectedExercise.instructions}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => setShowCountdown(true)}
                  className="h-11 rounded-xl bg-[#e67e22] hover:bg-[#cf6d17] text-white font-semibold text-[0.9375rem] flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" fill="currentColor" />
                  Start Drawing
                </button>
                <button
                  onClick={handleSpinAgain}
                  className="h-11 rounded-xl bg-card border border-[#e67e22] text-[#e67e22] font-semibold text-[0.9375rem] flex items-center justify-center gap-2 hover:bg-[#e67e22]/5 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Spin Again
                </button>
              </div>
              <button
                onClick={() => navigate('/')}
                className="w-full h-11 mt-2.5 rounded-xl bg-background hover:bg-muted text-muted-foreground font-medium text-[0.9375rem] border border-border transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        )}

        {!selectedExercise && hasCompletedLessons && (
          <div className="px-5 pb-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-card/80 px-4 py-2.5 rounded-full border border-border">
                <div className="w-2 h-2 rounded-full bg-[#e67e22]" />
                <span className="text-[0.8125rem] text-muted-foreground">
                  <span className="font-semibold text-foreground">{wheelExercises.length}</span> exercises from {completedLessonIds.length} lesson{completedLessonIds.length === 1 ? '' : 's'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <Dialog open={showCountdown} onOpenChange={(open) => !open && setShowCountdown(false)}>
        <DialogContent className="bg-card border border-border text-foreground max-w-sm mx-4 rounded-2xl shadow-lg">
          <div className="py-8">
            <DrawingCountdown onComplete={() => setShowCountdown(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

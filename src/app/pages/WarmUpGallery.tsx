import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Grid3x3 } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { ExerciseModal } from '../components/ExerciseModal';
import { allExercises, type Exercise } from '../data/exercises';

export default function WarmUpGallery() {
  const navigate = useNavigate();
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExerciseClick = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-md md:max-w-4xl mx-auto min-h-screen relative">
        <AppHeader
          title="Warm-Up"
          titleAccent="Gallery"
          subtitle="Browse all exercises"
          subtitleAlign="center"
          showBack
          onBack={() => navigate('/')}
        />

        <div className="px-5 md:px-8 pb-10">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 md:gap-3">
            {allExercises.map((exercise, index) => (
              <button
                key={index}
                onClick={() => handleExerciseClick(exercise)}
                className="group relative aspect-square rounded-xl overflow-hidden border border-border bg-card hover:border-border/70 hover:shadow-sm transition-all duration-200"
              >
                <img
                  src={exercise.imageUrl}
                  alt={exercise.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity"
                />
                <div className="absolute inset-0 bg-card/60" />
                <div className="relative h-full p-2.5 flex flex-col justify-between">
                  <span className="inline-flex w-fit items-center rounded-md bg-[#e67e22]/12 text-[#e67e22] text-[0.6875rem] font-semibold px-1.5 py-0.5">
                    L{exercise.lesson}
                  </span>
                  <h3 className="text-foreground text-[0.8125rem] font-medium leading-tight line-clamp-3 text-left">
                    {exercise.name}
                  </h3>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5">
                  <div className="rounded-full bg-[#e67e22] p-2 shadow-sm">
                    <Grid3x3 className="w-4 h-4 text-white" strokeWidth={2} />
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 bg-card/80 px-4 py-2.5 rounded-full border border-border">
              <div className="w-2 h-2 rounded-full bg-[#e67e22]" />
              <span className="text-[0.8125rem] text-muted-foreground">
                <span className="font-semibold text-foreground">{allExercises.length}</span> exercises
              </span>
            </div>
          </div>
        </div>
      </div>

      <ExerciseModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        exercise={selectedExercise}
      />
    </div>
  );
}

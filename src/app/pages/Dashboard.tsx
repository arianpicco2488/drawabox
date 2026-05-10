import { LessonCard } from '../components/LessonCard';
import { PencilIcon } from '../components/icons/PencilIcon';
import { AppHeader } from '../components/AppHeader';
import { BottomNav } from '../components/BottomNav';
import { useNavigate } from 'react-router';
import { useCompletedLessons } from '../context/CompletedLessonsContext';

import L1Img from '../../Lessons-img/L1.jpg';
import L2Img from '../../Lessons-img/L2.jpg';
import L3Img from '../../Lessons-img/L3.jpg';
import L4Img from '../../Lessons-img/L4.jpg';
import L5Img from '../../Lessons-img/L5.jpg';
import L6Img from '../../Lessons-img/L6.jpg';
import L7Img from '../../Lessons-img/L7.jpg';
import L250Img from '../../Lessons-img/250-boxes.jpg';

const LESSON_IMAGES = [L1Img, L2Img, L3Img, L4Img, L5Img, L6Img, L7Img, L250Img] as const;
const TOTAL_LESSONS = 8;

export default function Dashboard() {
  const navigate = useNavigate();
  const { completedLessonIds } = useCompletedLessons();
  const completedCount = completedLessonIds.length;
  const progressPct = (completedCount / TOTAL_LESSONS) * 100;

  const lessons = [
    { id: 1, title: 'Lines, Ellipses and Boxes' },
    { id: 2, title: 'Organic Forms, Dissections and Form Intersection' },
    { id: 3, title: 'Applying Construction to Plants' },
    { id: 4, title: 'Applying Construction to Insects and Arachnids' },
    { id: 5, title: 'Applying Construction to Animals' },
    { id: 6, title: 'Applying Construction to Everyday Objects' },
    { id: 7, title: 'Applying Construction to Vehicles' },
    { id: 8, title: '250 Boxes Challenge' },
  ].map((lesson) => ({
    ...lesson,
    imageUrl: LESSON_IMAGES[lesson.id - 1],
  }));

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <BottomNav />
      <div className="max-w-[800px] mx-auto w-full flex flex-col flex-1 min-h-0">
        <AppHeader
          title="Drawing"
          titleAccent="Warmups"
          subtitle="Complete your daily lessons. Select completed lessons to spin the wheel."
          icon={<PencilIcon className="text-[#e49944]" size={32} />}
        />

        <div className="flex-1 min-h-0 overflow-y-auto px-5 md:px-8 pb-24 md:pb-8">
          {/* Progress indicator */}
          <div className="mb-4 px-4 py-3 rounded-xl bg-card border border-border shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[0.6875rem] font-semibold text-muted-foreground uppercase tracking-widest">
                Progress
              </span>
              <span className="text-[0.75rem] font-bold text-[#e49944]">
                {completedCount} / {TOTAL_LESSONS} · {Math.round(progressPct)}%
              </span>
            </div>
            <div className="h-1.5 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-[#e49944] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            {completedCount === TOTAL_LESSONS && (
              <p className="mt-1.5 text-[0.6875rem] text-[#e49944] font-medium">
                All lessons complete — ready to warm up!
              </p>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center gap-3">
            {lessons.map((lesson) => (
              <div key={lesson.id} className="w-full md:w-[calc(25%-9px)]">
                <LessonCard
                  lessonNumber={lesson.id}
                  imageUrl={lesson.imageUrl}
                  title={lesson.title}
                />
              </div>
            ))}
          </div>

          <div className="hidden md:flex mt-8 flex-col gap-3 max-w-sm mx-auto w-full">
            <button
              onClick={() => navigate('/warmup')}
              className="w-full h-14 rounded-xl bg-[#e49944] hover:bg-[#c47c20] active:scale-[0.99] text-white font-bold text-[0.875rem] uppercase tracking-[0.06em] transition-all duration-200 flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg"
            >
              <PencilIcon className="text-white" size={28} />
              <span>Warm Up</span>
            </button>
            <button
              onClick={() => navigate('/gallery')}
              className="w-full h-12 rounded-xl bg-transparent hover:bg-[#e49944]/8 text-[#e49944] font-semibold text-[0.875rem] uppercase tracking-[0.06em] border-2 border-[#e49944]/60 hover:border-[#e49944] transition-all duration-200 flex items-center justify-center"
            >
              Warm-Up Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { LessonCard } from '../components/LessonCard';
import { PencilIcon } from '../components/icons/PencilIcon';
import { AppHeader } from '../components/AppHeader';
import { useNavigate } from 'react-router';

import L1Img from '../../Lessons-img/L1.jpg';
import L2Img from '../../Lessons-img/L2.jpg';
import L3Img from '../../Lessons-img/L3.jpg';
import L4Img from '../../Lessons-img/L4.jpg';
import L5Img from '../../Lessons-img/L5.jpg';
import L6Img from '../../Lessons-img/L6.jpg';
import L7Img from '../../Lessons-img/L7.jpg';

const LESSON_IMAGES = [L1Img, L2Img, L3Img, L4Img, L5Img, L6Img, L7Img] as const;

export default function Dashboard() {
  const navigate = useNavigate();

  const lessons = [
    { id: 1, title: 'Lines, Ellipses and Boxes' },
    { id: 2, title: 'Organic Forms, Dissections and Form Intersection' },
    { id: 3, title: 'Applying Construction to Plants' },
    { id: 4, title: 'Applying Construction to Insects and Arachnids' },
    { id: 5, title: 'Applying Construction to Animals' },
    { id: 6, title: 'Applying Construction to Everyday Objects' },
    { id: 7, title: 'Applying Construction to Vehicles' },
  ].map((lesson) => ({
    ...lesson,
    imageUrl: LESSON_IMAGES[lesson.id - 1],
  }));

  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      <div className="max-w-md mx-auto w-full flex flex-col flex-1 min-h-0">
        <AppHeader
          title="Drawing"
          titleAccent="Warmups"
          subtitle="Complete your daily lessons. Select completed lessons to spin the wheel."
          icon={<PencilIcon className="text-[#e67e22]" size={32} />}
        />

        <div className="flex-1 min-h-0 overflow-y-auto px-5 pb-8">
          <div className="flex flex-col gap-3">
            {lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lessonNumber={lesson.id}
                imageUrl={lesson.imageUrl}
                title={lesson.title}
              />
            ))}
          </div>

          <div className="mt-8 space-y-3">
            <button
              onClick={() => navigate('/warmup')}
              className="w-full h-14 rounded-2xl bg-[#e67e22] hover:bg-[#cf6d17] active:scale-[0.99] text-white font-semibold text-[1rem] tracking-tight transition-all duration-200 flex items-center justify-center gap-2.5 shadow-sm"
            >
              <PencilIcon className="text-white" size={28} />
              <span>Warm Up</span>
            </button>
            <button
              onClick={() => navigate('/gallery')}
              className="w-full h-12 rounded-xl bg-card hover:bg-secondary text-foreground font-medium text-[0.9375rem] border border-border transition-colors flex items-center justify-center"
            >
              Warm-Up Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

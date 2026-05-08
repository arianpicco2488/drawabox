import { Check } from 'lucide-react';
import { useCompletedLessons } from '../context/CompletedLessonsContext';

interface LessonCardProps {
  lessonNumber: number;
  imageUrl: string;
  title: string;
}

export function LessonCard({ lessonNumber, imageUrl, title }: LessonCardProps) {
  const { completedLessonIds, toggleLesson } = useCompletedLessons();
  const isCompleted = completedLessonIds.includes(lessonNumber);

  return (
    <button
      type="button"
      onClick={() => toggleLesson(lessonNumber)}
      className={`group relative w-full text-left cursor-pointer transition-all duration-200 overflow-hidden rounded-2xl ${
        isCompleted
          ? 'border-2 border-[#e49944] shadow-sm ring-2 ring-[#e49944]/20'
          : 'border border-border hover:border-[#e49944]/50 hover:shadow-md'
      }`}
    >
      {/* ── Mobile: horizontal list row ── */}
      <div className="md:hidden flex items-center gap-3 p-3 bg-card active:bg-muted transition-colors">
        <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
          <img src={imageUrl} alt="" className="w-full h-full object-cover" />
          {isCompleted && <div className="absolute inset-0 bg-[#e49944]/15" />}
        </div>
        <div className="flex-1 min-w-0">
          <span className="inline-flex items-center rounded bg-foreground/10 text-foreground text-[0.625rem] font-bold px-1.5 py-0.5 mb-1">
            Lesson {lessonNumber}
          </span>
          <h3 className="text-foreground text-[0.875rem] font-semibold leading-snug line-clamp-2">
            {title}
          </h3>
        </div>
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
            isCompleted
              ? 'bg-[#e49944]'
              : 'border-2 border-border bg-background'
          }`}
        >
          {isCompleted && <Check className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />}
        </div>
      </div>

      {/* ── Desktop: portrait card ── */}
      <div className="hidden md:block relative aspect-[3/4]">
        <img
          src={imageUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        {isCompleted && <div className="absolute inset-0 bg-[#e49944]/15" />}

        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center rounded-lg bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-2 py-1">
            L{lessonNumber}
          </span>
        </div>

        <div
          className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
            isCompleted
              ? 'bg-[#e49944] shadow-sm scale-100 opacity-100'
              : 'bg-black/40 backdrop-blur-sm scale-90 opacity-0 group-hover:opacity-60 group-hover:scale-100'
          }`}
        >
          <Check className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-3.5">
          <h3 className="text-white text-sm font-semibold leading-snug line-clamp-3">{title}</h3>
        </div>
      </div>
    </button>
  );
}

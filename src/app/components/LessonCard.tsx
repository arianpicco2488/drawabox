import { Checkbox } from './ui/checkbox';
import { useCompletedLessons } from '../context/CompletedLessonsContext';

interface LessonCardProps {
  lessonNumber: number;
  imageUrl: string;
  title: string;
}

export function LessonCard({ lessonNumber, imageUrl, title }: LessonCardProps) {
  const { completedLessonIds, toggleLesson } = useCompletedLessons();
  const isCompleted = completedLessonIds.includes(lessonNumber);

  const handleClick = () => {
    toggleLesson(lessonNumber);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`relative w-full min-h-[80px] overflow-hidden rounded-xl text-left transition-all duration-200 ${
        isCompleted
          ? 'border border-[#e67e22]/50 bg-card shadow-sm ring-1 ring-[#e67e22]/20'
          : 'border border-border bg-card hover:border-border/70 hover:shadow-sm'
      }`}
    >
      <img
        src={imageUrl}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-[0.35] pointer-events-none"
      />
      <div className="absolute inset-0 bg-card/55 pointer-events-none" />

      <div className="relative flex items-center gap-4 w-full px-4 py-3.5">
        <span className="flex-shrink-0 text-lg font-semibold text-foreground tabular-nums w-8 text-center">
          {lessonNumber}
        </span>
        <h3 className="flex-1 min-w-0 text-[0.9375rem] font-medium text-foreground leading-snug line-clamp-2">
          {title}
        </h3>
        <span className="flex-shrink-0 flex items-center gap-2">
          <Checkbox
            checked={isCompleted}
            onCheckedChange={() => {}}
            className="pointer-events-none border-border data-[state=checked]:bg-[#e67e22] data-[state=checked]:border-[#e67e22] size-5 rounded-md"
          />
        </span>
      </div>
    </button>
  );
}

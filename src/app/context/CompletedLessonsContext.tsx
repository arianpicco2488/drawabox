import { createContext, useCallback, useContext, useState } from 'react';

const STORAGE_KEY = 'drawabox-completed-lessons';

function loadCompletedIds(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((n: unknown) => typeof n === 'number') : [];
  } catch {
    return [];
  }
}

function saveCompletedIds(ids: number[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // ignore
  }
}

interface CompletedLessonsContextValue {
  completedLessonIds: number[];
  toggleLesson: (lessonNumber: number) => void;
}

const CompletedLessonsContext = createContext<CompletedLessonsContextValue | null>(null);

export function CompletedLessonsProvider({ children }: { children: React.ReactNode }) {
  const [completedLessonIds, setCompletedLessonIds] = useState<number[]>(loadCompletedIds);

  const toggleLesson = useCallback((lessonNumber: number) => {
    setCompletedLessonIds((prev) => {
      const next = prev.includes(lessonNumber)
        ? prev.filter((id) => id !== lessonNumber)
        : [...prev, lessonNumber].sort((a, b) => a - b);
      saveCompletedIds(next);
      return next;
    });
  }, []);

  return (
    <CompletedLessonsContext.Provider value={{ completedLessonIds, toggleLesson }}>
      {children}
    </CompletedLessonsContext.Provider>
  );
}

export function useCompletedLessons() {
  const ctx = useContext(CompletedLessonsContext);
  if (!ctx) {
    throw new Error('useCompletedLessons must be used within CompletedLessonsProvider');
  }
  return ctx;
}

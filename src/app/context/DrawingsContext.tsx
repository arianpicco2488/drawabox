import { createContext, useCallback, useContext, useState } from 'react';

const STORAGE_KEY = 'drawabox-drawings';

export interface Drawing {
  id: string;
  filename: string;
  uploadDate: string;
  label: string;
  data: string;
}

function loadDrawings(): Drawing[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

interface DrawingsContextValue {
  drawings: Drawing[];
  addDrawing: (file: File, label?: string) => Promise<void>;
  updateLabel: (id: string, label: string) => void;
  removeDrawing: (id: string) => void;
}

const DrawingsContext = createContext<DrawingsContextValue | null>(null);

export function DrawingsProvider({ children }: { children: React.ReactNode }) {
  const [drawings, setDrawings] = useState<Drawing[]>(loadDrawings);

  const addDrawing = useCallback(async (file: File, label = '') => {
    const data = await fileToBase64(file);
    const drawing: Drawing = {
      id: crypto.randomUUID(),
      filename: file.name,
      uploadDate: new Date().toISOString(),
      label,
      data,
    };
    setDrawings((prev) => {
      const next = [...prev, drawing];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // quota exceeded — image visible this session but won't persist
      }
      return next;
    });
  }, []);

  const updateLabel = useCallback((id: string, label: string) => {
    setDrawings((prev) => {
      const next = prev.map((d) => (d.id === id ? { ...d, label } : d));
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const removeDrawing = useCallback((id: string) => {
    setDrawings((prev) => {
      const next = prev.filter((d) => d.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  return (
    <DrawingsContext.Provider value={{ drawings, addDrawing, updateLabel, removeDrawing }}>
      {children}
    </DrawingsContext.Provider>
  );
}

export function useDrawings() {
  const ctx = useContext(DrawingsContext);
  if (!ctx) throw new Error('useDrawings must be used within DrawingsProvider');
  return ctx;
}

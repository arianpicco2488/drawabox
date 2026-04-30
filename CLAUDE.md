# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (Vite, localhost:5173)
npm run build    # production build → dist/
```

No linter or test suite is configured.

Deploy via Firebase Hosting (`dist/` is the public folder):
```bash
firebase deploy
```

## Architecture

This is a React 18 + TypeScript SPA built with Vite. Tailwind v4 is used for styling (via `@tailwindcss/vite` plugin). All UI primitives in `src/app/components/ui/` are shadcn/ui components wrapping Radix UI.

**Path alias:** `@` resolves to `src/`.

### Routing (`src/app/routes.tsx`)
Three routes via React Router v7:
- `/` → `Dashboard` — lesson list with completion checkboxes; navigates to warm-up flow
- `/warmup` → `WarmUpSelector` — roulette wheel that picks a random exercise from completed lessons
- `/gallery` → `WarmUpGallery` — image gallery of all warm-up exercises

### State
`CompletedLessonsContext` (`src/app/context/CompletedLessonsContext.tsx`) is the only shared state. It persists completed lesson IDs to `localStorage` under key `drawabox-completed-lessons`. The warm-up wheel only shows exercises from completed lessons.

### Data
- `src/app/data/exercises.ts` — the full exercise list keyed by lesson number (1–7). Each exercise has a fallback Unsplash URL and, if a matching file exists, a local image from `src/Lessons-img/warm-up-img/`.
- `src/app/data/warmUpImages.ts` — maps exercise names to local image files using Vite's `import.meta.glob`. The glob key must exactly match the filename (watch out for the trailing space in `"Form Intersections .jpg"`).

### Key components
- `LessonCard` — tappable card that toggles lesson completion via `useCompletedLessons()`
- `RouletteWheel` — animated spinning wheel using `motion/react`; determines selected exercise from final rotation angle
- `DrawingCountdown` — timer dialog launched after an exercise is selected

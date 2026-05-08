import { RouterProvider } from 'react-router';
import { ThemeProvider } from 'next-themes';
import { CompletedLessonsProvider } from './context/CompletedLessonsContext';
import { DrawingsProvider } from './context/DrawingsContext';
import { router } from './routes';

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <CompletedLessonsProvider>
        <DrawingsProvider>
          <RouterProvider router={router} />
        </DrawingsProvider>
      </CompletedLessonsProvider>
    </ThemeProvider>
  );
}
import { RouterProvider } from 'react-router';
import { ThemeProvider } from 'next-themes';
import { CompletedLessonsProvider } from './context/CompletedLessonsContext';
import { router } from './routes';

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <CompletedLessonsProvider>
        <RouterProvider router={router} />
      </CompletedLessonsProvider>
    </ThemeProvider>
  );
}
import { Sun, Moon, ArrowLeft } from 'lucide-react';
import { useTheme } from 'next-themes';

interface AppHeaderProps {
  title: string;
  titleAccent: string;
  subtitle: string;
  subtitleAlign?: 'left' | 'center';
  showBack?: boolean;
  onBack?: () => void;
  icon?: React.ReactNode;
}

export function AppHeader({
  title,
  titleAccent,
  subtitle,
  subtitleAlign = 'left',
  showBack,
  onBack,
  icon,
}: AppHeaderProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <header className="flex-shrink-0 px-5 pt-10 pb-5">
      <div className="flex items-center gap-3 mb-3">
        {showBack ? (
          <button
            onClick={onBack}
            className="flex items-center justify-center w-11 h-11 -ml-1 rounded-xl hover:bg-[#e67e22]/8 active:bg-[#e67e22]/12 transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="w-6 h-6 text-[#e67e22]" strokeWidth={2} />
          </button>
        ) : icon ? (
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#e67e22]/10">
            {icon}
          </div>
        ) : null}
        <h1
          className={`text-[1.75rem] font-bold tracking-tight text-foreground leading-tight flex-1 ${
            showBack ? 'text-center' : ''
          }`}
        >
          {title} <span className="text-[#e67e22]">{titleAccent}</span>
        </h1>
        <button
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          className="flex items-center justify-center w-11 h-11 rounded-xl hover:bg-border transition-colors"
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-foreground" />
          ) : (
            <Moon className="w-5 h-5 text-foreground" />
          )}
        </button>
      </div>
      <p
        className={`text-muted-foreground text-[0.8125rem] leading-relaxed ${
          subtitleAlign === 'center' ? 'text-center' : 'max-w-[85%]'
        }`}
      >
        {subtitle}
      </p>
      <div className="mt-5 h-px w-full bg-border" />
    </header>
  );
}

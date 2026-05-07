import { Sun, Moon, ArrowLeft } from 'lucide-react';
import { useTheme } from 'next-themes';

interface AppHeaderProps {
  title: string;
  titleAccent: string;
  subtitle: string;
  subtitleAlign?: 'left' | 'center';
  subtitleClassName?: string;
  showBack?: boolean;
  onBack?: () => void;
  icon?: React.ReactNode;
}

export function AppHeader({
  title,
  titleAccent,
  subtitle,
  subtitleAlign = 'left',
  subtitleClassName,
  showBack,
  onBack,
  icon,
}: AppHeaderProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <header className="flex-shrink-0 px-5 md:px-8 pt-10 pb-5">
      <div className="flex items-center gap-3 mb-3">
        {showBack ? (
          <button
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10 -ml-1 rounded-xl hover:bg-[#e49944]/10 active:bg-[#e49944]/15 transition-colors cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5 text-[#e49944]" strokeWidth={2.5} />
          </button>
        ) : icon ? (
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#e49944]/12 border border-[#e49944]/20">
            {icon}
          </div>
        ) : null}
        <h1
          className={`text-[1.25rem] font-medium tracking-tight text-foreground leading-tight flex-1 ${
            showBack ? 'text-center' : ''
          }`}
        >
          {title} <span className="text-[#e49944]">{titleAccent}</span>
        </h1>
        <button
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-border/70 transition-colors cursor-pointer"
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? (
            <Sun className="w-4.5 h-4.5 text-foreground" />
          ) : (
            <Moon className="w-4.5 h-4.5 text-foreground" />
          )}
        </button>
      </div>
      <p
        className={`text-muted-foreground text-[0.8125rem] leading-relaxed ${
          subtitleAlign === 'center' ? 'text-center' : 'max-w-[85%] md:max-w-lg'
        } ${subtitleClassName ?? ''}`}
      >
        {subtitle}
      </p>
      <div className="mt-5 h-px w-full bg-gradient-to-r from-border via-border/60 to-transparent" />
    </header>
  );
}

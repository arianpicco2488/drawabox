import { useLocation, useNavigate } from 'react-router';
import { Home, Dices, Grid3x3 } from 'lucide-react';

const TABS = [
  { path: '/', icon: Home, label: 'Lessons' },
  { path: '/warmup', icon: Dices, label: 'Warm Up' },
  { path: '/gallery', icon: Grid3x3, label: 'Gallery' },
];

export function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border">
      <div className="flex items-stretch justify-around h-16">
        {TABS.map(({ path, icon: Icon, label }) => {
          const active = pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`relative flex flex-col items-center justify-center gap-1 flex-1 cursor-pointer transition-colors duration-150 ${
                active ? 'text-[#e49944]' : 'text-muted-foreground'
              }`}
            >
              {active && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-[#e49944]" />
              )}
              <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 1.75} />
              <span className="text-[0.625rem] font-semibold tracking-wide">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

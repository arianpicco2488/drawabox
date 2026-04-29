import pencilIconUrl from '../../../Lessons-img/pencil_icon.png';

/** Pencil icon from design asset — flat, minimalist. */
export function PencilIcon({ className, size = 24 }: { className?: string; size?: number }) {
  return (
    <img
      src={pencilIconUrl}
      alt=""
      width={size}
      height={size}
      className={className}
      aria-hidden
    />
  );
}

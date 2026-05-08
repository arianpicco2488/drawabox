import { useRef, useState } from 'react';
import { ImagePlus, X, Pencil } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { BottomNav } from '../components/BottomNav';
import { Drawing, useDrawings } from '../context/DrawingsContext';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function getDaysBetween(a: string, b: string) {
  return Math.floor((new Date(b).getTime() - new Date(a).getTime()) / 86_400_000);
}

// ---------------------------------------------------------------------------
// DrawingCard
// ---------------------------------------------------------------------------

interface DrawingCardProps {
  drawing: Drawing;
  onDelete: (id: string) => void;
  onUpdateLabel: (id: string, label: string) => void;
}

function DrawingCard({ drawing, onDelete, onUpdateLabel }: DrawingCardProps) {
  const [editing, setEditing] = useState(false);
  const [editLabel, setEditLabel] = useState(drawing.label);

  function commitEdit() {
    onUpdateLabel(drawing.id, editLabel);
    setEditing(false);
  }

  return (
    <div className="relative rounded-xl overflow-hidden border border-border bg-card hover:border-[#e49944] hover:shadow-md transition-all duration-200 group aspect-square">
      <img
        src={drawing.data}
        alt={drawing.label || drawing.filename}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />

      <button
        onClick={() => onDelete(drawing.id)}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 rounded-full bg-black/70 flex items-center justify-center cursor-pointer hover:bg-black/90"
        aria-label="Remove drawing"
      >
        <X className="w-3.5 h-3.5 text-white" />
      </button>

      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-2.5 pt-8">
        {editing ? (
          <input
            autoFocus
            value={editLabel}
            onChange={(e) => setEditLabel(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={(e) => e.key === 'Enter' && commitEdit()}
            className="w-full text-xs text-white bg-transparent outline-none border-b border-white/50 pb-0.5"
            placeholder="Add a label…"
          />
        ) : (
          <div className="flex items-end justify-between gap-1">
            <div className="flex-1 min-w-0">
              {drawing.label && (
                <p className="text-xs text-white font-medium truncate leading-snug">{drawing.label}</p>
              )}
              <p className="text-[0.625rem] text-white/60">{formatDate(drawing.uploadDate)}</p>
            </div>
            <button
              onClick={() => { setEditing(true); setEditLabel(drawing.label); }}
              className="opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 flex items-center justify-center cursor-pointer flex-shrink-0"
              aria-label="Edit label"
            >
              <Pencil className="w-3 h-3 text-white/70" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Drawings page
// ---------------------------------------------------------------------------

export default function Drawings() {
  const { drawings, addDrawing, updateLabel, removeDrawing } = useDrawings();
  const [compareMode, setCompareMode] = useState(false);
  const [compareLayout, setCompareLayout] = useState<'side-by-side' | 'overlay'>('side-by-side');
  const [overlayOpacity, setOverlayOpacity] = useState(50);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const valid = Array.from(files).filter((f) =>
      ['image/jpeg', 'image/png', 'image/webp'].includes(f.type)
    );
    await Promise.all(valid.map((f) => addDrawing(f)));
  }

  // -------------------------------------------------------------------------
  // Compare mode
  // -------------------------------------------------------------------------

  if (compareMode && drawings.length >= 2) {
    const first = drawings[0];
    const latest = drawings[drawings.length - 1];
    const days = getDaysBetween(first.uploadDate, latest.uploadDate);

    return (
      <div className="min-h-screen bg-background text-foreground">
        <BottomNav />
        <div className="max-w-[800px] mx-auto">
          <AppHeader
            title="Progress"
            titleAccent="Compare"
            subtitle={days > 0 ? `${days} day${days !== 1 ? 's' : ''} of progress` : 'First vs latest drawing'}
            showBack
            onBack={() => setCompareMode(false)}
          />

          <div className="px-5 md:px-8 pb-24 md:pb-8">
            {/* Layout toggle */}
            <div className="flex gap-2 mb-5">
              {(['side-by-side', 'overlay'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setCompareLayout(mode)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-150 cursor-pointer ${
                    compareLayout === mode
                      ? 'bg-[#e49944] text-white'
                      : 'bg-card border border-border text-muted-foreground hover:border-[#e49944]/60'
                  }`}
                >
                  {mode === 'side-by-side' ? 'Side by Side' : 'Overlay'}
                </button>
              ))}
            </div>

            {compareLayout === 'side-by-side' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { drawing: first, label: 'First drawing' },
                  { drawing: latest, label: 'Latest drawing' },
                ].map(({ drawing, label }) => (
                  <div key={drawing.id}>
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-2">
                      {label} · {formatDate(drawing.uploadDate)}
                    </p>
                    <img
                      src={drawing.data}
                      alt={label}
                      className="w-full object-contain rounded-xl max-h-[60vh] bg-card border border-border"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-card border border-border">
                  <img
                    src={first.data}
                    alt="First drawing"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                  />
                  <img
                    src={latest.data}
                    alt="Latest drawing"
                    style={{ opacity: overlayOpacity / 100 }}
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                  />
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <span className="text-xs text-muted-foreground w-10 text-right">First</span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={overlayOpacity}
                    onChange={(e) => setOverlayOpacity(Number(e.target.value))}
                    className="flex-1 accent-[#e49944] cursor-pointer"
                    aria-label="Blend between first and latest drawing"
                  />
                  <span className="text-xs text-muted-foreground w-10">Latest</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Empty state
  // -------------------------------------------------------------------------

  if (drawings.length === 0) {
    return (
      <div
        className="min-h-screen bg-background text-foreground flex flex-col"
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragOver(false); }}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
      >
        <BottomNav />
        <div className="max-w-[680px] mx-auto w-full flex-1 flex flex-col">
          <AppHeader
            title="Your"
            titleAccent="Gallery"
            subtitle="Upload your drawings to track progress over time"
          />
          <div className="flex-1 flex items-center justify-center px-5 md:px-8 pb-24 md:pb-8">
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`w-full max-w-sm flex flex-col items-center justify-center gap-4 p-10 rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer ${
                dragOver
                  ? 'border-[#e49944] bg-[#e49944]/8'
                  : 'border-border hover:border-[#e49944]/60 hover:bg-[#e49944]/5'
              }`}
            >
              <ImagePlus
                className={`w-12 h-12 transition-colors duration-200 ${dragOver ? 'text-[#e49944]' : 'text-muted-foreground'}`}
                strokeWidth={1.5}
              />
              <div className="text-center">
                <p className="text-foreground font-semibold text-base">Upload your first drawing</p>
                <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                  Start with your Lesson 1 homework to track your progress
                </p>
              </div>
              <p className="text-xs text-muted-foreground/60">JPG, PNG or WebP · drag &amp; drop or click</p>
            </div>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Gallery state
  // -------------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BottomNav />
      <div className="max-w-[800px] mx-auto">
        <AppHeader
          title="Your"
          titleAccent="Gallery"
          subtitle={`${drawings.length} drawing${drawings.length !== 1 ? 's' : ''}`}
        />

        <div className="px-5 md:px-8 pb-24 md:pb-8">
          {/* Action row */}
          <div className="flex items-center justify-end gap-2 mb-5">
            {drawings.length >= 2 && (
              <button
                onClick={() => setCompareMode(true)}
                className="h-9 px-4 rounded-xl bg-[#e49944] hover:bg-[#c47c20] text-white text-sm font-semibold transition-colors duration-150 cursor-pointer"
              >
                Compare: First vs Latest
              </button>
            )}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="h-9 px-4 rounded-xl border-2 border-[#e49944]/60 hover:border-[#e49944] text-[#e49944] text-sm font-semibold bg-transparent hover:bg-[#e49944]/8 transition-all duration-150 cursor-pointer"
            >
              Upload new
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {drawings.map((drawing) => (
              <DrawingCard
                key={drawing.id}
                drawing={drawing}
                onDelete={removeDrawing}
                onUpdateLabel={updateLabel}
              />
            ))}
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        className="hidden"
        onChange={(e) => { handleFiles(e.target.files); if (fileInputRef.current) fileInputRef.current.value = ''; }}
      />
    </div>
  );
}

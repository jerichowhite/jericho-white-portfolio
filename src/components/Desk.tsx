import { useRef, useState } from 'react';
import { projects, peeksFor, photosFor, thumb, full } from '../content/data';
import { backdrop, folderSpots, prints } from '../content/desk';
import { go } from '../router';
import { profile } from '../content/projects';

type Offset = { x: number; y: number };

/** Drag-or-click: a press that barely moves counts as a click. */
function useDraggable(onOpen: () => void) {
  const [off, setOff] = useState<Offset>({ x: 0, y: 0 });
  const [lifted, setLifted] = useState(false);
  const start = useRef<{ x: number; y: number; ox: number; oy: number; moved: boolean } | null>(null);

  return {
    style: { translate: `${off.x}px ${off.y}px` },
    lifted,
    handlers: {
      onPointerDown(e: React.PointerEvent<HTMLElement>) {
        if (e.button !== 0) return;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        start.current = { x: e.clientX, y: e.clientY, ox: off.x, oy: off.y, moved: false };
        setLifted(true);
      },
      onPointerMove(e: React.PointerEvent<HTMLElement>) {
        const s = start.current;
        if (!s) return;
        const dx = e.clientX - s.x;
        const dy = e.clientY - s.y;
        if (!s.moved && Math.hypot(dx, dy) > 5) s.moved = true;
        if (s.moved) setOff({ x: s.ox + dx, y: s.oy + dy });
      },
      onPointerUp() {
        const s = start.current;
        start.current = null;
        setLifted(false);
        if (s && !s.moved) onOpen();
      },
      onPointerCancel() {
        start.current = null;
        setLifted(false);
      },
      onKeyDown(e: React.KeyboardEvent) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen();
        }
      },
    },
  };
}

let zTop = 10;

function Folder({ slug, left, top }: { slug: string; left: number; top: number }) {
  const p = projects.find((x) => x.slug === slug)!;
  const d = useDraggable(() => go({ view: 'project', slug }));
  const [z, setZ] = useState(2);
  const peeks = peeksFor(p);
  const isVideo = !!p.videos?.length;
  return (
    <button
      type="button"
      className={`desk-item folder${d.lifted ? ' is-lifted' : ''}`}
      style={{ left: `${left}%`, top: `${top}%`, zIndex: z, ...d.style }}
      aria-label={`Open ${p.title}, ${p.type}`}
      {...d.handlers}
      onPointerDownCapture={() => setZ(++zTop)}
    >
      <span className="folder-art" aria-hidden="true">
        {peeks.map((src, i) => (
          <img key={src + i} src={src} alt="" draggable={false} className={`peek peek-${i}`} />
        ))}
        <span className="folder-tab" />
        <span className="folder-front">{isVideo && <span className="rec" title="Has video" />}</span>
      </span>
      <span className="desk-label">{p.title}</span>
    </button>
  );
}

function Print({ slug, file, left, top, width, tilt }: (typeof prints)[number]) {
  const p = projects.find((x) => x.slug === slug);
  const index = p ? photosFor(p).findIndex((i) => i.file === file) : -1;
  const d = useDraggable(() => go({ view: 'project', slug, photo: Math.max(0, index) }));
  const [z, setZ] = useState(1);
  if (!p || index < 0) return null;
  return (
    <button
      type="button"
      className={`desk-item print${d.lifted ? ' is-lifted' : ''}`}
      style={{ left: `${left}%`, top: `${top}%`, width, zIndex: z, rotate: `${tilt}deg`, ...d.style }}
      aria-label={`View photo from ${p.title}`}
      {...d.handlers}
      onPointerDownCapture={() => setZ(++zTop)}
    >
      <img src={thumb(slug, file)} alt="" draggable={false} />
      <span className="desk-label print-label">{p.title}</span>
    </button>
  );
}

export function Desk() {
  // Projects without a set spot get dropped in a loose row near the bottom.
  const unplaced = projects.filter((p) => !folderSpots[p.slug]);
  return (
    <main className="desk" aria-label="Desk">
      <img className="desk-backdrop" src={full(backdrop.slug, backdrop.file)} alt="" aria-hidden="true" draggable={false} />

      <header className="desk-head">
        <h1 className="name">{profile.name}</h1>
        <p className="tagline">
          {profile.roles}
          <br />
          {profile.base}
        </p>
      </header>

      <p className="status">
        <span className="dot" aria-hidden="true" />
        Available for crew work
      </p>

      {prints.map((pr) => (
        <Print key={pr.slug + pr.file} {...pr} />
      ))}
      {projects
        .filter((p) => folderSpots[p.slug])
        .map((p) => (
          <Folder key={p.slug} slug={p.slug} {...folderSpots[p.slug]} />
        ))}
      {unplaced.map((p, i) => (
        <Folder key={p.slug} slug={p.slug} left={22 + i * 12} top={80} />
      ))}

      <p className="desk-hint">Drag things around. Open a folder to see the work.</p>
    </main>
  );
}

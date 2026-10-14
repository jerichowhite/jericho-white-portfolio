import { useEffect } from 'react';
import type { Project } from '../content/projects';
import { photosFor, full, thumb } from '../content/data';
import { go } from '../router';

export function Lightbox({ p, index }: { p: Project; index: number }) {
  const photos = photosFor(p);
  const n = photos.length;
  const i = ((index % n) + n) % n;
  const img = photos[i];
  const to = (k: number) => go({ view: 'project', slug: p.slug, photo: ((k % n) + n) % n });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') to(i + 1);
      if (e.key === 'ArrowLeft') to(i - 1);
      if (e.key === 'Escape') go({ view: 'project', slug: p.slug });
    };
    window.addEventListener('keydown', onKey);
    // warm up the neighbours
    [i + 1, i - 1].forEach((k) => {
      const nb = photos[((k % n) + n) % n];
      if (nb) new Image().src = full(p.slug, nb.file);
    });
    return () => window.removeEventListener('keydown', onKey);
  });

  if (!img) return null;
  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${p.title}, photo ${i + 1} of ${n}`}>
      <img
        key={img.file}
        className="lb-img"
        src={full(p.slug, img.file)}
        alt={`${p.title}, photo ${i + 1}`}
        style={{ backgroundImage: `url(${thumb(p.slug, img.file)})` }}
      />
      <div className="lb-bar">
        <span className="lb-title">{p.title}</span>
        <span className="lb-count">
          {i + 1} of {n}
        </span>
        <div className="lb-actions">
          <button type="button" onClick={() => to(i - 1)} aria-label="Previous photo">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button type="button" onClick={() => to(i + 1)} aria-label="Next photo">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button type="button" onClick={() => go({ view: 'project', slug: p.slug })} aria-label="Back to project">
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
        </div>
      </div>
      <button type="button" className="lb-zone lb-prev" tabIndex={-1} aria-hidden="true" onClick={() => to(i - 1)} />
      <button type="button" className="lb-zone lb-next" tabIndex={-1} aria-hidden="true" onClick={() => to(i + 1)} />
    </div>
  );
}

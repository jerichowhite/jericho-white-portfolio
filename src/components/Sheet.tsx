import { useEffect, useRef, type ReactNode } from 'react';
import { go } from '../router';

/** Frosted glass panel that floats over the desk. Esc or the backdrop closes it. */
export function Sheet({ label, wide, children }: { label: string; wide?: boolean; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    ref.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !document.querySelector('.lightbox')) go({ view: 'desk' });
    };
    window.addEventListener('keydown', onKey);
    document.body.classList.add('has-sheet');
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('has-sheet');
      prev?.focus?.();
    };
  }, []);
  return (
    <div className="sheet-layer">
      <button type="button" className="sheet-veil" aria-label="Close" tabIndex={-1} onClick={() => go({ view: 'desk' })} />
      <section ref={ref} className={`sheet${wide ? ' sheet-wide' : ''}`} role="dialog" aria-modal="true" aria-label={label} tabIndex={-1}>
        <button type="button" className="close" aria-label="Close" onClick={() => go({ view: 'desk' })}>
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
        {children}
      </section>
    </div>
  );
}

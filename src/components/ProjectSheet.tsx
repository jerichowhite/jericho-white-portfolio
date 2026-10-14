import { useState } from 'react';
import type { Project, Video } from '../content/projects';
import { photosFor, thumb, youtubeThumb, asset } from '../content/data';
import { go } from '../router';
import { Sheet } from './Sheet';

function VideoBlock({ v }: { v: Video }) {
  const [playing, setPlaying] = useState(false);
  if (v.kind === 'file') {
    return (
      <figure className="video">
        <video src={asset(v.src)} poster={v.poster && asset(v.poster)} controls playsInline preload="metadata" />
        {v.title && <figcaption>{v.title}</figcaption>}
      </figure>
    );
  }
  return (
    <figure className="video">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`}
          title={v.title ?? 'Video'}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button type="button" className="video-poster" onClick={() => setPlaying(true)} aria-label={`Play ${v.title ?? 'video'}`}>
          <img src={youtubeThumb(v.id)} alt="" />
          <span className="play" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
          </span>
        </button>
      )}
      {v.title && <figcaption>{v.title}</figcaption>}
    </figure>
  );
}

export function ProjectSheet({ p }: { p: Project }) {
  const photos = photosFor(p);
  const facts = [p.type, p.year, p.place].filter(Boolean).join(', ');
  return (
    <Sheet label={p.title} wide>
      <header className="project-head">
        <h2>{p.title}</h2>
        <p className="facts">{facts}</p>
      </header>

      <div className="project-intro">
        <p className="summary">{p.summary}</p>
        <dl className="my-role">
          <dt>My role</dt>
          <dd>{p.role}</dd>
        </dl>
      </div>

      {p.videos?.map((v, i) => <VideoBlock key={i} v={v} />)}

      {p.look && (
        <section className="look">
          <h3>Look and feel</h3>
          <p>{p.look}</p>
        </section>
      )}

      {photos.length > 0 && (
        <section className="gallery" aria-label={`${p.title} photos`}>
          {photos.map((img, i) => (
            <button
              key={img.file}
              type="button"
              className="tile"
              style={{ aspectRatio: `${img.w} / ${img.h}` }}
              onClick={() => go({ view: 'project', slug: p.slug, photo: i })}
              aria-label={`Open photo ${i + 1} of ${photos.length}`}
            >
              <img src={thumb(p.slug, img.file)} alt="" loading={i < 6 ? 'eager' : 'lazy'} />
            </button>
          ))}
        </section>
      )}

      {p.clips?.length ? (
        <section className="clips">
          {p.clips.map((src) => (
            <video key={src} src={asset(src)} poster={asset(src.replace(/\.mp4$/, '.jpg'))} muted loop autoPlay playsInline preload="none" />
          ))}
        </section>
      ) : null}

      {!photos.length && !p.videos?.length && <p className="empty">Work for this folder is on its way.</p>}

      {p.credits?.length ? (
        <section className="credits">
          <h3>Credits</h3>
          <dl>
            {p.credits.map((c) => (
              <div key={c.name + c.role}>
                <dt>{c.name}</dt>
                <dd>{c.role}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}
    </Sheet>
  );
}

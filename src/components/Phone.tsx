import { projects, peeksFor } from '../content/data';
import { backdrop } from '../content/desk';
import { profile } from '../content/projects';
import { full } from '../content/data';
import { href } from '../router';

/** Phone home screen: same desk, laid out as a grid of folders. */
export function Phone() {
  return (
    <main className="phone" aria-label="Home">
      <img className="desk-backdrop" src={full(backdrop.slug, backdrop.file)} alt="" aria-hidden="true" />
      <header className="phone-head">
        <h1 className="name">{profile.name}</h1>
        <p className="tagline">
          {profile.roles}, {profile.base}
        </p>
        <p className="status">
          <span className="dot" aria-hidden="true" />
          Available for crew work
        </p>
      </header>
      <ul className="phone-grid">
        {projects.map((p) => {
          const peeks = peeksFor(p);
          return (
            <li key={p.slug}>
              <a href={href({ view: 'project', slug: p.slug })} aria-label={`${p.title}, ${p.type}`}>
                <span className="phone-folder" aria-hidden="true">
                  {[0, 1, 2, 3].map((k) =>
                    peeks[k] ? <img key={k} src={peeks[k]} alt="" /> : <span key={k} className="blank" />,
                  )}
                  {p.videos?.length ? <span className="rec" /> : null}
                </span>
                <span className="desk-label">{p.title}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

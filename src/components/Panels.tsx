import { profile } from '../content/projects';
import { projects, coverFor } from '../content/data';
import { href } from '../router';
import { Sheet } from './Sheet';

function ContactList() {
  return (
    <ul className="contact-list">
      <li>
        <a href={`mailto:${profile.email}`}>
          <span>Email</span>
          <span className="v">{profile.email}</span>
        </a>
      </li>
      <li>
        <a href={profile.phoneHref}>
          <span>Phone or text</span>
          <span className="v">{profile.phone}</span>
        </a>
      </li>
      {profile.instagram.map((ig) => (
        <li key={ig.handle}>
          <a href={ig.href} target="_blank" rel="noreferrer">
            <span>Instagram</span>
            <span className="v">{ig.handle}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function About() {
  const groups: [string, string[]][] = [
    ['Roles I can fill', profile.roles_available],
    ['Cameras I’ve run', profile.cameras],
    ['Light', profile.lighting],
    ['Live and events', profile.live],
    ['Software', profile.software],
  ];
  return (
    <Sheet label="About">
      <header className="project-head">
        <h2>{profile.name}</h2>
        <p className="facts">
          {profile.roles}, {profile.base}
        </p>
      </header>
      <p className="summary">{profile.bio}</p>
      <section className="crew">
        {groups.map(([title, items]) => (
          <div key={title}>
            <h3>{title}</h3>
            <ul>
              {items.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <section className="credits">
        <h3>Get in touch</h3>
        <ContactList />
      </section>
    </Sheet>
  );
}

export function Contact() {
  return (
    <Sheet label="Contact">
      <header className="project-head">
        <h2>Need a hand on set?</h2>
        <p className="facts">Toronto and the GTA. Shoots, events and productions.</p>
      </header>
      <ContactList />
    </Sheet>
  );
}

export function WorkIndex() {
  return (
    <Sheet label="All work" wide>
      <header className="project-head">
        <h2>All work</h2>
      </header>
      <ul className="work-grid">
        {projects.map((p) => (
          <li key={p.slug}>
            <a href={href({ view: 'project', slug: p.slug })}>
              <span className="work-cover">{coverFor(p) ? <img src={coverFor(p)} alt="" loading="lazy" /> : null}</span>
              <span className="work-title">{p.title}</span>
              <span className="work-type">{[p.type, p.year].filter(Boolean).join(', ')}</span>
            </a>
          </li>
        ))}
      </ul>
    </Sheet>
  );
}

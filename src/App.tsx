import { useEffect, useState } from 'react';
import { useRoute, href } from './router';
import { bySlug } from './content/data';
import { profile } from './content/projects';
import { Desk } from './components/Desk';
import { Phone } from './components/Phone';
import { ProjectSheet } from './components/ProjectSheet';
import { Lightbox } from './components/Lightbox';
import { About, Contact, WorkIndex } from './components/Panels';

function useIsPhone() {
  const q = '(max-width: 820px)';
  const [m, setM] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const on = () => setM(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return m;
}

export default function App() {
  const route = useRoute();
  const phone = useIsPhone();
  const project = route.view === 'project' ? bySlug(route.slug) : undefined;

  useEffect(() => {
    document.title = project ? `${project.title} — ${profile.name}` : `${profile.name} — ${profile.roles}`;
  }, [project]);

  return (
    <>
      {phone ? <Phone /> : <Desk />}

      <nav className="dock" aria-label="Main">
        <a href={href({ view: 'work' })} aria-current={route.view === 'work' ? 'page' : undefined}>
          Work
        </a>
        <a href={href({ view: 'about' })} aria-current={route.view === 'about' ? 'page' : undefined}>
          About
        </a>
        <a className="dock-cta" href={href({ view: 'contact' })} aria-current={route.view === 'contact' ? 'page' : undefined}>
          Contact
        </a>
      </nav>

      {route.view === 'about' && <About />}
      {route.view === 'contact' && <Contact />}
      {route.view === 'work' && <WorkIndex />}
      {project && <ProjectSheet key={project.slug} p={project} />}
      {project && route.view === 'project' && route.photo !== undefined && <Lightbox p={project} index={route.photo} />}
    </>
  );
}

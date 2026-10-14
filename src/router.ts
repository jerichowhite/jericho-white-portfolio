import { useEffect, useState } from 'react';

// Tiny hash router so every project has a link you can paste in a DM:
//   /#/voices          a project
//   /#/voices/3        the 4th photo of a project, open full size
//   /#/about  /#/contact  /#/work

export type Route =
  | { view: 'desk' }
  | { view: 'about' }
  | { view: 'contact' }
  | { view: 'work' }
  | { view: 'project'; slug: string; photo?: number };

export function parse(hash: string): Route {
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  if (!parts.length) return { view: 'desk' };
  if (parts[0] === 'about' || parts[0] === 'contact' || parts[0] === 'work') return { view: parts[0] };
  const photo = parts[1] !== undefined ? Number(parts[1]) : undefined;
  return { view: 'project', slug: parts[0], photo: Number.isFinite(photo) ? photo : undefined };
}

export const href = (r: Route) => {
  switch (r.view) {
    case 'desk':
      return '#/';
    case 'project':
      return r.photo === undefined ? `#/${r.slug}` : `#/${r.slug}/${r.photo}`;
    default:
      return `#/${r.view}`;
  }
};

export const go = (r: Route) => {
  window.location.hash = href(r);
};

export function useRoute(): Route {
  const [route, setRoute] = useState(() => parse(window.location.hash));
  useEffect(() => {
    const on = () => setRoute(parse(window.location.hash));
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}

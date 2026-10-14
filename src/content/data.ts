import images from './images.json';
import { projects, type Project } from './projects';

export type Img = { file: string; w: number; h: number };

const all = images as Record<string, Img[]>;

/** Photos for a project, featured frames first. */
export function photosFor(p: Project): Img[] {
  const list = all[p.slug] ?? [];
  if (!p.featured?.length) return list;
  const first = p.featured.map((f) => list.find((i) => i.file === f)).filter(Boolean) as Img[];
  return [...first, ...list.filter((i) => !p.featured!.includes(i.file))];
}

const BASE = import.meta.env.BASE_URL;
/** Turns '/work/…' paths into ones that work wherever the site is hosted. */
export const asset = (path: string) => (path.startsWith('/') ? BASE + path.slice(1) : path);
export const full = (slug: string, file: string) => `${BASE}work/${slug}/${file}`;
export const thumb = (slug: string, file: string) => `${BASE}work/${slug}/thumb/${file}`;

export const youtubeThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

/** Image used on a project's folder: its cover, first photo, or its video poster. */
export function coverFor(p: Project): string | undefined {
  const photos = photosFor(p);
  if (p.cover && photos.some((i) => i.file === p.cover)) return thumb(p.slug, p.cover);
  if (photos[0]) return thumb(p.slug, photos[0].file);
  const v = p.videos?.[0];
  if (v?.kind === 'youtube') return youtubeThumb(v.id);
  if (v?.kind === 'file' && v.poster) return v.poster;
  return undefined;
}

/** Up to three small images that peek out of a folder. */
export function peeksFor(p: Project): string[] {
  const photos = photosFor(p).slice(0, 3).map((i) => thumb(p.slug, i.file));
  if (photos.length) return photos;
  const c = coverFor(p);
  return c ? [c] : [];
}

export { projects };
export const bySlug = (slug: string) => projects.find((p) => p.slug === slug);

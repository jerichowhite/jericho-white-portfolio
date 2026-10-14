// Where things sit on the desk (desktop screens only).
// left/top are percentages of the screen so the layout scales with it.
// Projects not listed here are placed automatically.

export const backdrop = { slug: 'shoot-03-04', file: 'dsc02845.jpg' };

export const folderSpots: Record<string, { left: number; top: number }> = {
  'shoot-03-04': { left: 8, top: 18 },
  'shoot-05': { left: 31, top: 13 },
  sharon: { left: 70, top: 14 },
  www: { left: 86, top: 36 },
  voices: { left: 13, top: 52 },
  mystery: { left: 63, top: 60 },
  bts: { left: 33, top: 63 },
  design: { left: 85, top: 66 },
};

export const prints: { slug: string; file: string; left: number; top: number; width: number; tilt: number }[] = [
  { slug: 'shoot-03-04', file: 'dsc02845.jpg', left: 21, top: 33, width: 128, tilt: -4 },
  { slug: 'shoot-05', file: 'dsc04031.jpg', left: 47, top: 22, width: 108, tilt: 3 },
  { slug: 'sharon', file: 'dsc02607.jpg', left: 56, top: 35, width: 118, tilt: -3 },
  { slug: 'shoot-05', file: 'dsc04104.jpg', left: 75, top: 43, width: 106, tilt: 4 },
  { slug: 'sharon', file: 'dsc02669.jpg', left: 47, top: 56, width: 98, tilt: -2 },
  { slug: 'shoot-03-04', file: 'dsc02806.jpg', left: 3, top: 74, width: 150, tilt: 2 },
];

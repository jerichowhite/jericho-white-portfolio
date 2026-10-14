# Jericho White — portfolio

Photo + film portfolio built as a desk: projects are glass folders, loose prints sit on top, and everything opens in frosted-glass sheets. On phones it becomes a home-screen grid.

Every project has its own link you can paste in a DM, for example `/#/voices` or `/#/shoot-05`.

## Put it online (Vercel, free)

1. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
2. Import **jericho-white-portfolio**. Vercel detects Vite; leave the settings as they are.
3. Press **Deploy**. You get a link like `jericho-white-portfolio.vercel.app`.
4. Later, add your own domain in the project's **Settings → Domains**.

After that, every push to `main` updates the site automatically.

## Add new work

All the words live in **`src/content/projects.ts`**. Photos live in **`public/work/<slug>/`**.

1. Put the full-size photos in `raw/<slug>/` (for example `raw/www/` for the Worship Without Walls stills). The `raw/` folder is never uploaded.
2. Run `npm run images`. It makes web-sized copies and thumbnails, and skips anything already done.
3. In `src/content/projects.ts`, find the project (or copy one to make a new one) and fill in the title, summary, role and credits. Leave out anything you don't have.
4. To place a new folder on the desk, add its slug to `folderSpots` in `src/content/desk.ts`. If you don't, it gets a spot automatically.

Videos:
- **YouTube:** `videos: [{ kind: 'youtube', id: 'VfjbScPK080', title: '…' }]` (the id is the part after `youtu.be/`).
- **Your own file:** export a 1080p H.264 MP4 under ~40 MB, put it in `public/work/<slug>/`, then `videos: [{ kind: 'file', src: '/work/<slug>/teaser.mp4' }]`.

Or just ask Claude Code: “add the photos in raw/www to Worship Without Walls”.

## Run it on your computer

```bash
npm install
npm run dev
```

## Where things are

| File | What it controls |
|---|---|
| `src/content/projects.ts` | Projects, credits, your bio, crew sheet and contact details |
| `src/content/desk.ts` | Where folders and loose prints sit on the desk, and the blurred backdrop photo |
| `src/index.css` | Colours, type, glass, layout |
| `src/components/` | Desk, phone home screen, project sheet, lightbox, about/contact |
| `scripts/add-images.mjs` | The photo converter behind `npm run images` |

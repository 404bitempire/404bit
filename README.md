# 404bit

A modern entertainment discovery experience for movies, TV shows, anime, live TV and sports.

## Tech stack

- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS
- Lucide icons

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to GitHub Pages

The repository is configured for a static export at `/404bit` and includes a GitHub Actions deployment workflow.

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. The workflow in `.github/workflows/deploy.yml` will build and publish the site on pushes to `main`.

The expected site URL is https://404bitempire.github.io/404bit/.

## Project status

The first UI foundation includes a responsive cinematic homepage, studio discovery tiles, a searchable title grid, category navigation and a title-details modal.

Catalog artwork and title data are currently demo content. Connect a licensed metadata provider (for example TMDB, subject to its terms) before production. Playback should only be enabled for public-domain, licensed or otherwise authorized sources.

## Roadmap

- [ ] Connect movie and TV metadata API
- [ ] Add genre, studio and year filters
- [ ] Add user accounts and watchlists
- [ ] Add authorized video playback and subtitle support
- [ ] Build dedicated Movies, TV Shows, Anime, Live TV and Sports pages
- [ ] Add accessibility and automated tests
- [x] Add GitHub Pages deployment workflow

# 3D Quest Portfolio Game

A static-exportable **Next.js App Router + TypeScript + Tailwind + React Three Fiber** portfolio that feels like a compact exploration game.

## Features

- Third-person 3D exploration world with 8 content zones
- Cinematic loading scene (3D globe + airplane route concept)
- Zone-triggered Mission / Exploration / Victory panels
- Persistent HUD (zone, badges, inventory, mute, low-motion, `/work` link)
- Inventory with unlockable badges and easter-egg badges
- Easter eggs:
  - Hidden gallery object
  - Secret room
  - Konami code unlock
- Mobile controls (on-screen directional pad)
- Adaptive DPR via `PerformanceMonitor`
- Reduced-motion support and manual low-motion toggle
- Accessible HTML fallback route at `/work`
- Content centralized in `src/content/content.ts`

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- `@react-three/fiber`, `@react-three/drei`, `three`

## Project Structure

- `src/app/page.tsx`: main game entry
- `src/app/work/page.tsx`: readable fallback route
- `src/components/game/LoadingExperience.tsx`: cinematic 3D pre-start scene
- `src/components/game/QuestPortfolio.tsx`: game shell and state management
- `src/components/game/QuestWorld.tsx`: world rendering, controls, triggers
- `src/components/ui/*`: HUD, inventory, panels, mobile controls
- `src/content/content.ts`: all zone text, badges, quests, timeline, contacts

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run development server:
   ```bash
   npm run dev
   ```
3. Open:
   - `http://localhost:3000/`
   - `http://localhost:3000/work`

## Build + Static Export

```bash
npm run build
```

This project uses `output: "export"`, so `next build` generates static files in `out/`.

## GitHub Pages Deployment

If your repo is `https://github.com/<user>/<repo>`, set:

```bash
NEXT_PUBLIC_BASE_PATH=/<repo>
```

Then build:

```bash
NEXT_PUBLIC_BASE_PATH=/<repo> npm run build
```

Publish the generated `out/` folder to GitHub Pages (via Actions or branch deploy).

### Example GitHub Actions workflow

Create `.github/workflows/deploy.yml`:

```yml
name: Deploy Pages
on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: NEXT_PUBLIC_BASE_PATH=/${{ github.event.repository.name }} npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Also enable Pages in repo settings with **GitHub Actions** as source.

## Swapping 3D Models

Current scene uses procedural meshes (no external model dependencies). To swap assets:

1. Put models in `public/assets/models/` (recommended `.glb`).
2. Load with `useGLTF('/assets/models/<name>.glb')` in R3F components.
3. Preload with `useGLTF.preload('/assets/models/<name>.glb')`.
4. Keep model sizes optimized (target each GLB <= 2-4 MB for faster first load).

### Suggested replacements

- Airplane in loader: replace procedural airplane group in `LoadingExperience.tsx`
- Player character: replace `Character` mesh in `QuestWorld.tsx`
- Props/portals: replace portal meshes with stylized GLBs

## Asset Sources (recommended)

- Sketchfab (downloadable CC models)
- Poly Pizza (Google Poly archive)
- Kenney assets
- Quaternius
- ambientCG / Poly Haven (textures/HDRIs)

Preferred formats:

- Models: `.glb` (embedded textures)
- Textures: `.webp` or compressed `.jpg/.png`
- Environment maps: `.hdr` (keep size modest for web)

## Notes

- Audio toggle is wired in HUD with default muted state; add your own audio source if needed.
- Update all placeholder content in `src/content/content.ts`.

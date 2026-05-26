# Recall — Coming Soon.

A teaser landing page for Recall. Sky-blue background with drifting clouds, centered wordmark, "Coming your way soon." tagline in Inter Bold 68px.

## Stack
- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** with custom sky-blue palette and drift keyframes
- **Inter** font (via `next/font/google`) — weights 400–800
- Pure CSS clouds (no images) — built from layered radial-gradient puffs

## Run
```bash
npm install
npm run dev
```
Open http://localhost:3000

## How the clouds work
`components/Cloud.tsx` composes each cloud from 7 overlapping radial-gradient "puffs" plus a soft shadow underneath and a top-left highlight. This gives a lumpy, naturalistic silhouette and a sense of volume from sunlight above.

`components/Sky.tsx` arranges 10 clouds across three depth bands:
- **Back** — small, faded, drifts slowest (atmospheric haze)
- **Mid** — readable middle layer
- **Front** — large, crisp, fastest (parallax depth)

Each cloud uses a negative `animation-delay` so the scene starts mid-motion (no awkward "all entering from the left" moment on page load) and no two clouds occupy the same horizontal position.

## File map
```
app/
  layout.tsx       Inter font + metadata
  page.tsx         The sky + logo + tagline
  globals.css      Sky gradient, cloud styling, animations
components/
  Sky.tsx          Cloud arrangement / parallax layers
  Cloud.tsx        Single cloud — puffs + shadow + highlight
public/
  recall-logo.png  Brand wordmark (white)
tailwind.config.ts Sky color tokens + drift keyframes
```

## Tweaking
- **Cloud density** — add/remove `<Cloud />` entries in `Sky.tsx`
- **Drift speed** — change `animate-drift-*` class or edit durations in `tailwind.config.ts`
- **Sky color** — adjust the `sky-bg` gradient in `globals.css`
- **Tagline size** — `clamp(28px, 6.2vw, 68px)` in `page.tsx` — 68px is the desktop target

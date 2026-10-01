# LEKUKA e-Invoicing — Virtual Awareness Session

A keynote-style presentation deck and marketing website for **Infinity Business Dynamics (IBD)**, built for the *LEKUKA e-Invoicing — Virtual Awareness Session* (Thursday, 1 October 2026, 10:00 AM – 12:00 Noon).

The deck runs in the browser: 19 slides with animated transitions, speaker notes, keyboard navigation, an interactive system self-assessment, and a responsive layout that also works as a normal multi-page website.

Built with **Next.js 16 (App Router) + React 19 + Tailwind CSS 4 + Framer Motion + TypeScript**.

---

## Quick start

```bash
npm install
npm run dev      # development server → http://localhost:3000
```

Production:

```bash
npm run build
npm run start    # production server → http://localhost:3000
```

Other scripts:

| Script | Purpose |
| --- | --- |
| `npm run lint` | ESLint |
| `npm run build` | Type-check + production build |
| `npm run start` | Serve the production build |

> If port 3000 is already in use, run `npm run dev -- -p 3100` (or any other port).

---

## Routes

| Route | What it is |
| --- | --- |
| `/` | The full presentation deck (also the site home) |
| `/present` | The same deck, opening directly in presentation mode |
| `/about` | About Infinity Business Dynamics |
| `/services` | IBD services |
| `/contact` | Contact / enquiry page |

---

## Presenting the deck

### Keyboard

| Key | Action |
| --- | --- |
| `→` / `PageDown` / `Space` | Next slide |
| `←` / `PageUp` | Previous slide |
| `↓` / `↑` | Scroll the current slide first, then move (when focus is in the deck) |
| `Home` / `End` | First / last slide |
| `N` | Toggle speaker notes |
| `F` | Toggle fullscreen presentation mode |
| `?` | Show the shortcut reference |
| `Esc` | Close help → close notes → exit presentation mode |

### Pointer / touch

- Use the on-screen **← / →** buttons in the bottom bar, or click the progress dots.
- On touch devices, swipe **horizontally** to change slides; swipe **vertically** to scroll the current slide.

### Slide behaviour

- On desktop widths (≥ 1024px) each slide is automatically **scaled to fit the viewport** and vertically centred, so nothing is ever cut off and no scrolling is needed — the deck behaves like a real keynote at any window size.
- Below 1024px the layout becomes a normal scrolling website: content stacks and the user scrolls inside each slide.

---

## Project structure

```
src/
  app/
    layout.tsx           Fonts, metadata, open-graph image
    page.tsx             Deck (home)
    present/page.tsx     Deck in presentation mode
    about/ services/ contact/   Site pages
    globals.css          Tailwind v4 theme tokens + slide surfaces
  components/
    presentation/        Deck chrome: shell, slide frame, nav, notes, progress
    slides/              One component per slide type
    ui/                  Reveal animations, animated numbers, flow chains
    decor/               Mountain ridge, Basotho band, grid sheen
    shared/              Site header / footer / contact block
  data/
    slides.ts            ★ All slide content + speaker notes
    company.ts           ★ Company contact details and stats
    systems.ts           ★ Self-assessment system list
    assets.ts            Server-side asset detection
public/
  logo-ibd-dark.png      IBD logo for DARK backgrounds (white text)
  logo-ibd-white.png     IBD logo for LIGHT backgrounds (navy text)
  logo-ibd-white-wordmark.png
  motheo-icon.png
  images/
    lekuka-awareness-poster.jpg   Event poster (also the OG image)
    ibd-integrations-poster.jpg
    lekuka.png                    Lekuka logo lockup
    rsl.png                       Revenue Services Lesotho logo
    rsl-platform-screenshot.png   (optional — see below)
```

---

## Editing the content

### Change slide text or speaker notes

Everything lives in **`src/data/slides.ts`**. Slides are a typed discriminated union — each entry is created with `defineSlide({...})` and carries its own `type`, `theme`, `eyebrow`, `title`, `subtitle`, `note` and a `content` object specific to that slide type. Speaker notes are in the `notes` field.

The rendered order of the deck is the order of the array, so reordering or removing an entry reorders the deck. `src/components/presentation/SlideRenderer.tsx` maps each `type` to its component in `src/components/slides/`.

### Change company details

**`src/data/company.ts`** holds the address, phone, email, website and the stat figures. Update it once and it flows to the contact block, footer and slides.

### Change the self-assessment options

**`src/data/systems.ts`** lists the platforms offered on the *What system are you using today?* slide, together with the per-system assessment starting point.

---

## Replacing images

Drop replacement files into `public/` using the **same file name** and rebuild — no code changes needed.

| File | Used by | Notes |
| --- | --- | --- |
| `public/logo-ibd-dark.png` | Dark slides + site header | **"dark" = for dark backgrounds** (white lettering, transparent PNG) |
| `public/logo-ibd-white.png` | Light slides | **"white" = white background artwork** (navy lettering) |
| `public/images/rsl.png` | — | RSL logo. Not currently placed on any slide; drop it into a slide if you need it again. |
| `public/images/lekuka.png` | Cover, footer | Lekuka logo |
| `public/images/lekuka-awareness-poster.jpg` | Cover slide + open-graph image | Update the width/height in `src/app/layout.tsx` if the size changes |
| `public/images/ibd-integrations-poster.jpg` | Closing slide | |
| `public/motheo-icon.png` | Motheo POS slide | |

### RSL platform screenshot (slide 13)

Slide 13 normally shows a **reconstructed table** of IBD's registered models.

To use a real screenshot instead, add:

```
public/images/rsl-platform-screenshot.png
```

The file is detected at build/render time by `src/data/assets.ts` (`getAssetFlags()`), and the slide switches to the image automatically. Removing the file switches back to the table. No code change is required either way.

---

## Design tokens

Defined in `src/app/globals.css` under Tailwind v4's `@theme`:

| Token | Value | Use |
| --- | --- | --- |
| `--color-ibd-red` | `#ed1c24` | IBD accent, eyebrow rules |
| `--color-ibd-blue` | `#142e63` | IBD navy |
| `--color-lekuka` | `#078a58` | Lekuka green |
| `--color-lekuka-bright` | `#2fc98d` | Green highlights on dark |
| `--color-navy` / `ink` / `muted` / `line` | — | Text and borders |

Slide themes are `"dark" | "light" | "mist" | "green"` and are selected per slide in `src/data/slides.ts`; the surface classes live in `globals.css` as `.slide-surface--*`.

---

## Content guardrails

This deck is public-facing, so it deliberately **does not invent regulatory detail**:

- No fabricated RSL specifications, deadlines, tax rates, API field lists or approval numbers.
- Anywhere a technical detail depends on the regulation, the copy says *"subject to applicable RSL requirements"* or *"to be confirmed based on the applicable Lekuka technical specification"*.
- The 5-day roadmap is labelled as **IBD's stated 5-day compliance pathway for applicable engagements**, not a regulatory deadline.
- Audience sectors are described as illustrative, not a statement of regulatory scope.

If you add content, keep the same discipline: only state facts you can source (the IBD website is `https://ibd.co.ls/`), and keep the disclaimers.

---

## Deploying to Vercel

The project is a standard Next.js app with no custom server, environment variables or database, so it deploys directly:

```bash
npm i -g vercel
vercel
```

…or connect the repository in the Vercel dashboard and use the defaults (`npm run build` / `npm run start`).

**Before you deploy**, update `siteUrl` in `src/app/layout.tsx` to your real domain — it drives `metadataBase`, the canonical URL and the open-graph image URL.

---

## Verification

The deck has been checked at **1920×1080**, **1366×768** and **390×844**:

- Every slide fits the viewport with no clipping and no horizontal overflow on desktop/laptop sizes.
- No console errors, page errors or failed asset requests on any route.
- Keyboard navigation, `Home`/`End`, speaker notes (`N` + `Esc`) and fullscreen all behave as described above.
- All image assets load successfully.

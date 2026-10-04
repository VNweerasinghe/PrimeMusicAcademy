# Prime Music Academy — project context

Last reviewed: 4 October 2026

This document records the current application behavior and technical choices for future maintenance. It is based on the checked-in source and the project history; it is not a performance benchmark or a security certification.

## Purpose and current scope

Prime Music Academy is a public website for one-to-one music tuition in Colombo. It introduces the instructor and courses, answers common questions, and helps prospective students contact the academy.

The website does **not** create lesson bookings, confirm availability, process payments, or store lesson inquiries. A lesson request prepares a message in WhatsApp; the visitor reviews and sends it, and the instructor confirms arrangements directly.

## Technology

| Area | Current implementation |
| --- | --- |
| UI | React 17.0.2, JSX, component-scoped CSS imports |
| Routing | React Router DOM 5.3.4; browser routes locally and hash routes for GitHub Pages |
| Bundling | Webpack 5, webpack-cli 4, webpack-dev-server 4 |
| Transpilation | Babel 7 with `babel-loader` |
| Reviews | Supabase JavaScript client 2.x and Postgres Realtime |
| Local environment configuration | `dotenv`; `.env` is ignored by Git |
| Tests | Jest 26; the existing test file covers WhatsApp link creation |
| CI/deployment | GitHub Actions, Node.js 20, GitHub Pages |

Installed dependency versions can differ within the ranges in `package.json`; `package-lock.json` is the reproducible install source. Run `npm ci` when reproducing the locked dependency tree.

## Application structure

- `src/app.js` — application root, router selection, shared components and global styles; page modules are loaded with React `lazy`.
- `src/pages/` — route-level pages:
  - `/` — homepage, hero carousel, student reviews, FAQs, instructor introduction.
  - `/tutors` — instructor profile and qualifications.
  - `/courses` — course descriptions and course-specific lesson-request links.
  - `/schedule` — lesson inquiry form that opens a prefilled WhatsApp message.
  - `/contact` — contact information and WhatsApp inquiry action.
  - unmatched routes — not-found page.
- `src/components/` — shared navigation/header, footer, buttons, lesson request form, carousel, floating WhatsApp action, and review section.
- `src/data/siteData.js` — instructor information, contact details, lesson durations, and course content.
- `src/lib/supabaseClient.js` — one browser Supabase client, configured only when both public environment variables are present.
- `src/utils/whatsapp.js` — normalization and URL encoding for prefilled WhatsApp links.
- `src/styles/` — global theme, navigation, button, form, page, homepage, carousel, WhatsApp, and review styles.
- `src/assets/` — navigation logo, instructor photo, and carousel photos.
- `supabase/schema.sql` — review table, row-level security policies, column grants, checks, and Realtime registration.
- `tests/` — Jest tests.
- `public/index.html` — document title, language, viewport, metadata, and React root.
- `.github/workflows/deploy-pages.yml` — GitHub Pages build/deploy pipeline.

## User-facing behavior and UI

### Shared layout

- Fixed navigation with a small academy emblem (`src/assets/images/hero.webp`), route links, a mobile menu, and a light/dark theme control.
- Theme choice is stored in `localStorage`; the initial theme falls back to the operating-system preference.
- A skip-to-main-content link supports keyboard and assistive-technology users.
- Shared footer contains quick links, Colombo location, phone, and WhatsApp contact.
- A floating WhatsApp shortcut is visible throughout the site and uses the academy contact number defined in `src/data/siteData.js`.

### Home

- Text-led hero with lesson inquiry and course links next to a five-image carousel.
- Carousel advances every five seconds by default and has previous/next controls, slide indicators, and a pause/resume control. It honors the reduced-motion preference.
- Lesson highlights, live student reviews, common questions, and an instructor introduction follow the hero.
- Reviews remain visible on the homepage; the **Review** button opens the submission form in a native dialog. The dialog closes using its close button, Escape, or a backdrop click.
- The instructor image below the hero is lazy-loaded.

### Courses, instructor, schedule, and contact

- Course pages show course outline, instrument, and level. They do not display unconfirmed prices.
- A course-specific action passes the selected course to the lesson request page.
- Lesson requests offer 45-minute, one-hour, and two-hour durations and ask for a preferred time. Submission opens WhatsApp; it does not store or book the request.
- Contact page provides the Colombo location, telephone link, and WhatsApp action.

### Responsive and accessibility choices

- Responsive CSS adapts the navigation, hero/carousel, content grids, lesson form, and footer for narrower screens.
- The carousel and WhatsApp shortcut respect reduced-motion settings.
- Controls include accessible names and visible keyboard-focus styling; pages use semantic headings, landmarks, form labels, and descriptive image alternatives where images convey content.
- The homepage and modal were checked in-browser at 320, 375, 390, 768, 1024, and 1440 CSS-pixel viewport widths. The modal was also checked for initial-closed state and button, Escape, and backdrop dismissal. This is a responsive smoke check, not a complete accessibility audit.

## Supabase student reviews

### Data flow

1. The homepage loads up to the newest 12 rows from `public.student_reviews`.
2. The client subscribes to inserted review rows over Supabase Realtime and merges new rows into the displayed list.
3. A visitor opens the modal, chooses a 1–5 star rating, enters an optional display name and a 15–1000 character review, and confirms public publication.
4. The form inserts the row. Reviews publish immediately; there is no approval queue.

The `student_reviews` table has `id`, `display_name`, `rating`, `review`, `consent_to_publish`, and `created_at` columns. Database checks constrain ratings and text lengths. Row-level security permits anonymous reads and inserts. Column grants limit anonymous reads to review display fields and limit inserts to the name, rating, review, and required consent fields.

### Configuration and security boundary

- Copy `.env.example` to `.env` and configure `SUPABASE_URL` plus `SUPABASE_ANON_KEY` with the project's public URL and anon/publishable key.
- For GitHub Pages, configure repository Actions variables or secrets with those same names; the deploy workflow passes them to the Pages build and refuses to build if either value is absent.
- Webpack exposes only those two public configuration values to browser code. The public key is not a secret; the Supabase service-role key must never be placed in this app or its built assets.
- `.env` and other `.env.*` files are ignored by Git, with `.env.example` explicitly allowed.
- The schema is in `supabase/schema.sql`; setup steps and operational caveats are in `supabase/setup.md`.
- Public instant publishing is the selected product behavior. It can attract spam and visitors may submit identifying information despite the on-page warning. CAPTCHA, moderation, and a removal workflow are not currently implemented.

The browser's ability to read the review table was previously verified with an HTTP 200 response. No test review has been submitted during development.

## Visual assets and performance

- Carousel photos are individual local assets, not externally hosted images. The largest was optimized from roughly 475 KB to about 134 KB (approximately 72% smaller); its source path remains `src/assets/carousell/img4.jpg`.
- `src/assets/images/hero.jpg` was an unused 266,512-byte legacy image with no source references. It has been removed; the active navigation emblem is `hero.webp`.
- Route-level code splitting is configured with React lazy loading. The carousel renders one active slide at a time, and the instructor image on the homepage uses native lazy loading.
- The production Webpack build reports separate route/vendor chunks. No Lighthouse, Core Web Vitals, or real-network performance baseline has been run; do not treat bundle build success as a measured speed score.

## Commands and deployment

```bash
npm ci
npm start
npm test -- --runInBand
npm run build
npm run build:pages
```

- `npm start` serves the local development site on port 3000.
- `npm run build` writes to `dist/`.
- `npm run build:pages` writes to `dist-pages/` and enables hash-based routing.
- The GitHub Actions workflow builds `dist-pages/` on pushes to `main` and manual dispatch, then deploys it to GitHub Pages. The Pages source must be configured as **GitHub Actions** in repository settings.

## Change history recorded for future work

- Replaced the oversized homepage brand treatment with an automatically advancing, manually controllable, responsive lesson-photo carousel.
- Added the academy emblem as a small navigation brand mark.
- Refined homepage heading spacing, course-card alignment, and responsive navigation/layout details.
- Added the floating WhatsApp contact shortcut and retained WhatsApp inquiry links across the site.
- Optimized the largest carousel photo.
- Added Supabase-backed public student reviews with ratings, optional names, consent, live inserts, and a modal submission form.
- Consolidated the earlier overlapping UI/UX reports and implementation checklists into this source-verified guide because several older documents described components or states that no longer exist.

## Maintenance notes

- Preserve the distinction between a WhatsApp inquiry and a confirmed booking; do not imply scheduling, payment, or persistence that the site does not provide.
- Keep all academy contact information in `src/data/siteData.js` so inquiry links and contact details stay consistent.
- Treat browser-exposed Supabase configuration as public. Validate any future database permissions against `supabase/schema.sql`; never weaken RLS to fix a client issue.
- Keep review publishing/consent language aligned with the actual immediate-publication behavior.
- Before changing layout, check mobile and desktop breakpoints and reduced-motion behavior. Before claiming a performance improvement, capture comparable measurements on a production build.
- The site uses React 17 and React Router 5. A framework upgrade is a separate migration and should be planned and tested rather than mixed into maintenance cleanup.

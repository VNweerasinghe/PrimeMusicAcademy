# Prime Music Academy

Responsive React website for Prime Music Academy's music tuition services in Colombo.

## Features

- Home, instructor, courses, lesson-request, and contact pages.
- Responsive image carousel, light/dark theme, and mobile navigation.
- WhatsApp links for inquiries; requests are sent by the visitor and confirmed by the instructor.
- Public student reviews backed by Supabase, with realtime updates and a review form in a modal.
- Mobile-friendly floating WhatsApp shortcut.

The site does not accept or store lesson bookings or payments. See [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md) for the current architecture, UI behavior, integrations, and maintenance notes. For the Supabase review setup, see [supabase/setup.md](./supabase/setup.md).

## Run locally

Requirements: Node.js 20 and npm.

```bash
npm ci
npm start
```

The development server runs at `http://localhost:3000`. To enable Supabase reviews locally, copy `.env.example` to `.env` and use the public project URL and anon/publishable key. Never use a service-role or secret key in this client application.

For GitHub Pages reviews, configure the `SUPABASE_URL` and `SUPABASE_ANON_KEY` repository Actions variables. See [the Supabase setup guide](./supabase/setup.md).

## Build and test

```bash
npm test -- --runInBand
npm run build
```

`npm run build` writes production files to `dist/`. The GitHub Pages build writes to `dist-pages/`:

```bash
npm run build:pages
```

## Deploy to GitHub Pages

The workflow at `.github/workflows/deploy-pages.yml` builds and deploys on pushes to `main` and can also be started manually. Set the repository's Pages source to **GitHub Actions** under **Settings → Pages**. The Pages build uses hash-based routing so pages work when hosted under a repository path.

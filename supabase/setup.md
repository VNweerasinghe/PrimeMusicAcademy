# Live student reviews setup

1. Create a Supabase project.
2. In the Supabase dashboard, open **SQL Editor**, paste the contents of
   [`schema.sql`](./schema.sql), and run it.
3. Copy `.env.example` to `.env` in the project root. Set:
   - `SUPABASE_URL` to the Project URL from **Project Settings → API**.
   - `SUPABASE_ANON_KEY` to the public anon/publishable key from the same page.
4. Restart the development server or rebuild/redeploy the site so the values are
   included in the client bundle.

For GitHub Pages deployments, add repository Actions variables named
`SUPABASE_URL` and `SUPABASE_ANON_KEY` under **Settings → Secrets and variables
→ Actions → Variables**. The Pages workflow passes these values to the build.
They are public browser configuration, so use the anon/publishable key only.

Only use the public anon/publishable key in the website. Never put a Supabase
`service_role` or secret key in `.env` for this app or in any client-side bundle.
The anon key is public; row-level security and column grants in `schema.sql`
limit what the website can do.

Reviews are public immediately after submission. The form requires consent to
publish, but public anonymous submissions can still attract spam. For a busy
production site, add a server-side CAPTCHA or moderation workflow.

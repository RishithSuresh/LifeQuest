# LifeQuest

Premium gamified productivity dashboard built with Next.js, Tailwind CSS, Framer Motion, GSAP, and Three.js.

## Run locally

```bash
npm install
npm run dev
```

## Supabase Setup

1. Create a Supabase project in the dashboard.
2. Copy [.env.local.example](.env.local.example) to `.env.local`.
3. Fill in these values from Supabase Settings -> API:
	- `NEXT_PUBLIC_SUPABASE_URL`
	- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Optionally add `SUPABASE_SERVICE_ROLE_KEY` for server-only tasks.
5. Run the schema in [supabase/migrations/20260527_initial_schema.sql](supabase/migrations/20260527_initial_schema.sql) from the Supabase SQL editor.
6. Add these local redirect URLs in Supabase Auth settings:
	- `http://localhost:3000`
	- `http://localhost:3000/login`
	- `http://localhost:3000/register`
7. Restart the dev server after updating `.env.local`.

## Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS v4
- Framer Motion
- GSAP
- Three.js (@react-three/fiber + drei)

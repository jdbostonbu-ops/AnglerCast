# AnglerCast — Starter

A Next.js (App Router) + TypeScript starter scaffold for AnglerCast, set up for the
stack and rules in AGENTS.md. No feature code or tests yet — those are built one at a
time, test-first, in the order in AGENTS.md.

## Stack
- Next.js (App Router) + React + TypeScript
- Prisma ORM + PostgreSQL on Neon
- bcrypt (passwords) + email code verification
- Resend (verification emails)
- OpenAI gpt-4o-mini (explanation/assembly + travel-time estimate)
- Vitest (tests; external calls mocked, fetch stubbed)
- Vercel (deploy)

## First-time setup
1. Install dependencies:
   npm install
2. Copy the env template and fill in real values (never commit .env):
   cp .env.example .env
3. Generate the Prisma client and run the first migration to Neon:
   npm run prisma:generate
   npm run prisma:migrate
4. Run the checks you own:
   npm run typecheck
   npm test
5. Start the dev server when you want to look at the app:
   npm run dev

## Project structure
- src/app/                  App Router pages + layout
- src/app/api/auth/         signup, verify, login route handlers (to be built)
- src/app/api/spots/        SavedSpot CRUD route handlers (to be built)
- src/lib/                  shared logic seams (prisma client here; tested seams go here)
- src/components/           React components (to be built)
- src/types/                shared TypeScript types
- src/test/                 Vitest setup (fetch is stubbed so unit tests never hit the network)
- prisma/schema.prisma      User + SavedSpot models (the entity + relationship)

## How I work (see AGENTS.md for the full rules)
- I write and run all tests myself; Codex writes implementation to pass them.
- Test-first: RED before GREEN. I commit the RED separately, then the GREEN.
- Build features in the order listed in AGENTS.md, one at a time.
- Coordinates are always kept at full precision — never truncated.

AGENTS.md — AnglerCast

Read this file at the start of every task before writing any code. This is the standing rulebook for how Jacqueline wants this project built. Her current instructions and this file are the source of truth.

What AnglerCast is
A Next.js web app that helps fishermen know what fish are where and when, using real public occurrence data. Split into Freshwater and Saltwater views, with live conditions, a map of real recorded occurrences, plain-English AI explanations, and recommendations of real fish + real location + best month.

Stack
Frontend: Next.js (App Router) + React + TypeScript
Backend: Next.js API route handlers
Database: PostgreSQL on Neon, accessed via Prisma ORM
Auth: bcrypt-hashed passwords + email code verification
Email: Resend (transactional email, free tier) for sending the verification code, sent from a Next.js route handler
AI: OpenAI API (gpt-4o-mini), explanation/assembly layer only (plus the travel-time estimate)
Testing: Vitest (unit, component, integration), with external calls mocked
Deployment: Vercel (app) + Neon (database)

The honest-data thesis (do not violate)
Real data computes the facts; the AI explains and assembles, it does not invent.
Locations, fish, months, sighting frequency, sample sizes, and confidence flags are produced by tested code from real occurrence data (GBIF, OBIS, USGS).
The AI (OpenAI) phrases recommendations and explanations from facts the code already computed. It must never invent or guess a location, a species, or a season.
One intentional exception: for travel time/ETA, the AI computes a conditions-aware estimate from inputs the code provides (origin, destination, conditions, speed), guarded by a sanity-check test, and the AI is told to show its reasoning.
Always show sample size and a high/low confidence flag wherever a frequency or recommendation is shown. Never present a fabricated "catch probability."
Fish move constantly; the app shows where fish have been recorded, never a guarantee of where they are.
If a request would make the app invent data to look more complete, refuse and flag it.

Who runs what (testing constraints)
Jacqueline runs ALL tests and ALL commands herself, in her own terminal. Codex does NOT run tests, does NOT run the dev server, and does NOT run git commands.
Write the test code (or the implementation), then STOP and tell Jacqueline exactly what to run. She runs it and reports back.
TESTING.md is Jacqueline's. Never edit it. She writes and commits the RED/GREEN ledger herself.
Do not git commit. Jacqueline commits the RED separately, then the GREEN, herself.

TDD rules (strictly — first in everything)
Codex does NOT change, edit, rename, or delete any test file. If a test seems wrong or needs to change, Codex stops and tells Jacqueline — it does not touch the test itself.
Codex's job is to write the implementation code that makes Jacqueline's existing tests pass — nothing more.
Test-first, always. A failing test (RED) is written and confirmed to fail BEFORE any implementation.
The first run must fail as expected, because no implementation exists yet.
Then the simplest code to make that one test pass (GREEN).
Never weaken or delete a test to make it pass. If behavior genuinely changed, stop and tell Jacqueline so she updates the test herself, on purpose.
One RED at a time. Don't write future tests ahead of the cycle.
Mock all external calls in unit tests: GBIF, OBIS, Open-Meteo, USGS, OpenAI, Prisma/Neon, and email. Unit tests never touch the real network or database. Unit tests MUST mock 'fetch' (stub the function). Never hit the network in a unit test.

Build order (follow this sequence)
Build the features in this order:
Email code verification
Login
CRUD for SavedSpot
Delete confirmation dialog
Prisma + Neon live database
Coordinate precision fix
Nav bar
Post-login home (two buttons)
Landing page
Recommendation feature (fish + location + month)
Rugged visual redesign
Page background fix (jpeg as the page background, not on a card)
Distinct map markers per species
Knots/ETA travel time
Empirical sighting-rate search

Acceptance Criteria
User Story 1 (create account + verify email) — Accepted when:
A new user can sign up and their account starts inactive.
A verification code is emailed to them.
Entering the correct, unexpired code activates the account.
An expired or wrong code is rejected with a clear message.
The account can't be used until verified.
An already-verified account can't be verified again.
User Story 2 (log in) — Accepted when:
A verified user can log in with the correct email and password.
A wrong password is rejected with a clear message.
An unverified user cannot log in, even with the correct password.
The password field has a show/hide toggle that switches between hidden and visible.
After a successful login, the user reaches their own account.
User Story 3 (save, view, edit, delete fishing spots) — Accepted when:
A logged-in user can create a saved spot (name, coordinates, species, water type, notes).
The saved spot's coordinates are stored at full precision (no rounding).
The user can see a list of their own saved spots.
The user only sees their own spots, not anyone else's.
The user can edit a saved spot and the change persists.
The user can delete a saved spot.
User Story 4 (delete confirmation) — Accepted when:
Choosing to delete a saved spot shows a confirmation dialog first.
The spot is deleted only after the user explicitly confirms.
Canceling the dialog leaves the spot untouched and closes the dialog.
User Story 5 (data persists — Prisma + Neon) — Accepted when:
A created account and saved spots are still there after closing and reopening the app (the data persists in the live database).
Each saved spot is linked to the user who created it.
The app reads and writes against the live Neon database.

Coding constraints (all generated code)
Strict TypeScript — never use any.
No var — use const/let.
Arrow functions assigned to const, closure-based style.
Factory functions over classes.
Exception: Next.js route handlers use export async function GET/POST/PATCH/DELETE() {}.
Keep shared values (theme tokens, species-to-marker-style map) in one place so they're testable and reusable.

Coordinate rule (critical)
Preserve full decimal precision on every coordinate — whatever number of decimals is needed to pinpoint the accurate location.
Never truncate or round coordinates for storage, transport, or queries (no toFixed on a real coordinate). Rounding moves the point miles off and is unsafe.
Grouping/bucketing for cluster detection may round internally, but any coordinate displayed or saved must be a real, full-precision coordinate.

Data sources (roles)
GBIF Occurrence — keyless — historical occurrence records (primary).
OBIS Occurrence — keyless — marine occurrence records (Darwin Core), labeled-separate.
Open-Meteo Marine — keyless — saltwater conditions.
Open-Meteo Forecast — keyless — freshwater conditions.
USGS — keyless — fish life-history facts, enriches the AI explanation.
OpenAI (gpt-4o-mini) — explanation + assembly + the conditions-aware travel-time estimate.
RMPC — pending key — not yet wired. Do NOT implement unless instructed.

Working style with Jacqueline
She drives. Reflect her decisions back accurately. Do not substitute assumptions, and do not quote the outdated original proposal as if it's current — this file and her current instructions are the source of truth.
Do not go ahead and build more than she asked for. One thing at a time.
When reporting, separate the requested change from any incidental diffs.
If a test fails after a change, report which and why — never silently "fix" it by weakening it.
Built test-first; the RED failed for the right reason; the GREEN passes; typecheck clean (Jacqueline runs these).
No test weakened or deleted.
Coding constraints above followed.
Coordinates full-precision.
Honest-data thesis intact.
Jacqueline commits the RED and the GREEN herself, with clear messages.





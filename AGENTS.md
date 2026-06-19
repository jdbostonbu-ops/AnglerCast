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

Feature 15 — Empirical sighting-rate search (search + map)
What it does: A user picks a species and enters a latitude/longitude, then submits the search. The app queries the real occurrence records near those coordinates and shows two things together: (1) the honest historical sighting rate for the selected month, with sample size and a confidence flag, and (2) a map of the real recorded occurrences for that search. This is the historical-data feature from the first build, now added as its own feature. It never shows a fabricated "catch probability" and the AI never invents the locations, fish, or the rate.
The calculation: matching-month records ÷ total records — the share of that species' nearby records that fall in the selected month. Computed by tested code from real occurrence data (GBIF and OBIS). Always shown with the total record count (sample size) and a high/low confidence flag.
Technical detail:
Search input + button (client component): species select, latitude, longitude, and month. Lat/long accept full-precision decimals (pos/neg), never truncated; reject out-of-range and non-numeric with a clear message. The submit button runs the search; the entered coordinates drive both the rate calc and the map, so the map matches the search.
Sighting-rate calculation (tested seam, pure function): input is the species' nearby records + the selected month; output is { rate, matchingMonthCount, totalCount, confidence }; rate = matchingMonthCount ÷ totalCount (0 when total is 0); confidence is low/high by sample size. Closure-based arrow function, no any, tested directly, fetch mocked.
Occurrence fetch (tested seam): builds the query to GBIF and OBIS near the searched coordinates at full precision; returns records with scientificName, decimalLatitude, decimalLongitude, eventDate; mocked in unit tests.
Map (client component): renders the real occurrences as markers at full-precision coordinates; reuses the per-species distinct markers + legend (Feature 12); excludes 0,0 records; centered on/tied to the searched coordinates; visuals eyeball-verified, data-shaping tested.
AI explanation (assembly only): OpenAI receives the computed rate, sample size, and confidence and explains them; never computes or invents.
Acceptance: listed in the doc — covers the rate formula, full-precision coordinates, the matching map with markers/legend and no 0,0, and "historical sighting rate, never a catch probability."



Feature #17 — Password reset (forgot password) — Expected Behavior 

RED 17.1 — createPasswordResetCode — reset code is generated hashed, with a future expiry 

What it checks: the generator returns a 6-digit code, the HASH of that code (not the raw code), and an expiry timestamp set in the future. 

Why it fails first; expected behavior: the generator function doesn't exist yet, so there's nothing to make a code, hash it, or set an expiry. 

RED 17.2 — verifyPasswordResetCode — a correct, unexpired code verifies as valid; expired and wrong codes are rejected 

What it checks: the pure verify function returns valid when the entered code matches the stored hash and the expiry is in the future; returns "expired" when the code is correct but the expiry is past (time mocked); returns "mismatch" when the code doesn't match the hash. 

Why it fails first; expected behavior: the verify function doesn't exist yet, so there's no expiry check or hash comparison. 

RED 17.3 — requestPasswordReset — only verified accounts may reset; a code is issued and stored 

What it checks: requesting a reset for an account where isVerified = false is rejected with a clear "not verified" reason; for a verified account, a reset code is generated and stored on the user. DB mocked. 

Why it fails first; expected behavior: the request-reset function doesn't exist yet, so there's no user lookup, no isVerified check, and nowhere storing the code. 

RED 17.4 — resetPasswordWithCode — a correct code sets a new password and clears the reset fields 

What it checks: given a valid, unexpired code, the function hashes the NEW password, updates the user, and clears the stored reset code and expiry so it can't be reused; an expired or wrong code is rejected and the password is left unchanged. DB mocked, time mocked for the expired case. 

Why it fails first; expected behavior: the confirm function doesn't exist yet to verify the code, hash the new password, or clear the fields. 

RED 17.5 — request-reset API route — POST email returns success without revealing whether the email exists 

What it checks: POSTing an email returns the same success response whether or not the account exists (so it can't be used to discover registered emails); when the account exists and is verified, it calls requestPasswordReset and triggers the email send. Route, DB, and email send mocked. 

Why it fails first; expected behavior: the request-reset route doesn't exist yet. 

RED 17.6 — confirm-reset API route — POST email + code + new password updates the password for a valid code 

What it checks: POSTing email, code, and new password returns success and updates the password when the code is valid; returns the appropriate error response for expired or mismatched codes. Route and DB mocked. 

Why it fails first; expected behavior: the confirm-reset route doesn't exist yet. 

RED 17.7 — email send — the reset code is delivered via Resend 

What it checks: when a reset is requested for a verified account, the Resend email client is called with the recipient's address and the reset code in the message. Resend mocked (no real email sent in the test). 

Why it fails first; expected behavior: there's no reset-email send wired yet. 

RED 17.8 — request-reset UI page — the user can enter their email and submit 

What it checks: the page renders an email field and a submit control; submitting posts the email to the request-reset route and shows a confirmation message. Fetch mocked. 

Why it fails first; expected behavior: the request-reset page doesn't exist yet. 

RED 17.9 — confirm-reset UI page — the user can enter the code and a new password and submit 

What it checks: the page renders a code field, a new-password field, and a submit control; submitting posts to the confirm-reset route and shows success or the appropriate error. Fetch mocked. 

Why it fails first; expected behavior: the confirm-reset page doesn't exist yet. 

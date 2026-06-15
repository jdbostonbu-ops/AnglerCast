# AnglerCast — Sprint Plan

**By:** Jacqueline Delgado
**Status:** For review before I start building

---

## My one-sentence pitch

AnglerCast is a fishing app for anglers that shows what fish are where and when —
using real public occurrence data, with honest sample sizes and confidence — and an
AI that explains the conditions and recommends real spots, never inventing data.

**My user:** a fisherman planning a trip who wants to know what's biting where and when.
**The one must-have that proves it works:** a user can create an account and save a
fishing spot (account → CRUD), which is the gate's core requirement.

---

## How I build: strict TDD (first in everything)

TDD comes first in every feature I build — it is not a final checkbox, it's how I work.
Every behavior follows the cycle:

1. **RED** — I write a failing test first and run it. I confirm it fails for the reason I
   expect (the missing behavior), not a typo or import error.
2. **GREEN** — I write the simplest code that makes that one test pass.
3. **Refactor** — I clean it up with the test still green.

My rules: a failing test always comes before implementation; I never weaken or delete a
test to make it pass (if behavior genuinely changed, I update the test on purpose); one
RED at a time; external calls (the APIs, OpenAI, Prisma/Neon, email) are mocked so unit
tests never hit the real network or database; and I record every RED/GREEN cycle in
TESTING.md. Every task in the day-by-day plan below is written test-first for this reason.

---

## Why I'm doing a fresh sprint

I built AnglerCast for 12 hours and then used it myself, and that showed me exactly
what's missing: there's no front door (you have to type URLs), the coordinate search
is broken (it truncated to 3 digits and pointed miles off), it shows 0% and nothing
useful too often, it doesn't look like it's made for fishermen, and there's no account
or saved-spots yet. This sprint fixes the foundation first, then builds the rest. I'm
building all 14 features this sprint — I have the full week and I'm putting in the time.

---

## My data sources (6 working APIs)

Every fact comes from real data. The AI explains and assembles; it does not invent
locations, fish, or seasons.

1. GBIF Occurrence API — keyless. Historical species occurrences worldwide.
2. Open-Meteo Marine API — keyless. Ocean conditions for saltwater.
3. Open-Meteo Weather/Forecast API — keyless. Inland weather for freshwater.
4. OBIS Occurrence API — keyless. Marine occurrence records (Darwin Core), labeled
   as its own source.
5. USGS — fish life-history/science, enriches the AI explanation.
6. OpenAI (gpt-4o-mini) — explains conditions, phrases recommendations, and computes
   the conditions-aware travel time.

Pending: RMPC (Pacific salmon tag/recovery) — I've emailed for a key. Not in this
sprint's working set; I'll wire it when the key arrives.

---

## My backlog (all 14 features)

1. Email code verification (hashed, expiring code, required before account active)
2. Login (email/password, bcrypt, show/hide password toggle)
3. CRUD for SavedSpot (save/read/update/delete fishing locations)
4. Delete confirmation dialog
5. Prisma + Neon live database
6. Landing page (rugged outdoor feel, character, varied fonts/sizes/colors)
7. Nav bar (Freshwater | Saltwater + About | Mission | Contact)
8. Post-login home (two buttons: Freshwater / Saltwater, no URL typing)
9. Recommendation feature (real clusters → fish + location + month, AI phrases it)
10. Coordinate precision fix (full decimal precision, never truncate)
11. Page background fix (jpeg as the page background, not stuck on a card)
12. Distinct map markers per species
13. Rugged visual redesign throughout
14. Knots/ETA travel time (user enters location; AI computes conditions-aware ETA;
    sanity-check test)

---

## Prioritized backlog (MoSCoW)

### Must Have (my first 5 — the account + data foundation the gate requires)

| # | Feature | Effort | Why it's a Must Have (if it's not done, what breaks) |
|---|---------|--------|------------------------------------------------------|
| 1 | Email code verification | M | No verified accounts means no real users and no secured sign-up. |
| 2 | Login | M | Without login, a user can't get back to their own data. |
| 3 | CRUD for SavedSpot | M | This is the gate's core requirement (Create + Read end-to-end). The app's whole point of "save your spots" doesn't exist without it. |
| 4 | Delete confirmation dialog | S | Delete is part of CRUD; without a confirm, a user can lose a saved spot by accident. |
| 5 | Prisma + Neon live database | M | Nothing persists without the live DB — saved spots vanish. This is the entity-with-relationships the gate checks. |

**Must Have test applied:** for each of these, if it's not done, a user cannot create
an account, log in, or save/keep a spot — so the app fails its core promise. They pass
the test.

### Should Have (important; the app works without them but they're the next priority)

| # | Feature | Effort |
|---|---------|--------|
| 10 | Coordinate precision fix | S | 
| 7 | Nav bar | S |
| 8 | Post-login home (two buttons) | S |
| 6 | Landing page (rugged feel) | M |
| 9 | Recommendation feature (fish + location + month) | L |

### Nice to Have (makes it better, not essential to ship)

| # | Feature | Effort |
|---|---------|--------|
| 13 | Rugged visual redesign throughout | M |
| 11 | Page background fix | S |
| 12 | Distinct map markers per species | S |
| 14 | Knots/ETA travel time | L |

### Won't Do (this sprint)

- RMPC integration — blocked on the API key I requested; out of scope until it arrives.

> Note: I'm building all 14 this sprint. MoSCoW here orders my attack, and the Must
> Have block is the 5 the assignment asks me to commit to and defend.

---

## Day-by-day plan (my full week)

Each task is a tiny user story with an S/M/L estimate (S = under 30 min, M = 30–60 min,
L = over 1 hour) and a Definition of Done. P1 bugs first. I commit after every green
cycle. I build test-first.

The build days follow my Must Have order (features 1–5), then my Should Have features,
then my Nice to Have features — consistent with my MoSCoW prioritization above. Every
build task is test-first: I write a failing test (RED), confirm it fails for the right
reason, then write the simplest code to pass (GREEN), then refactor. I never weaken a
test to go green, and I record every cycle in TESTING.md.

#### MUST HAVE block (features 1–5, in my priority order)

### Day 1 — Must Have #1: Email code verification — M
- *Story:* As a new user, I verify my email with a code so my account is secured.
- *Test-first:* RED — failing test that a correct, unexpired code verifies true and the
  account flips to active; then expired code → false; then wrong code → false. GREEN
  after each. Email and DB mocked.
- *DoD:* hashed, expiring code; account inactive until the correct, unexpired code is
  entered; built test-first; tests pass; typecheck clean; committed.

### Day 2 — Must Have #2: Login — M
- *Story:* As a returning user, I log in with email/password and can show/hide it.
- *Test-first:* RED — failing test that a correct password passes the bcrypt compare and
  a wrong password is rejected; then a test for the show/hide toggle. GREEN after each.
- *DoD:* bcrypt compare against the stored hash; wrong credentials rejected with a clear
  message; show/hide password toggle works; built test-first; committed.

### Day 3 — Must Have #3: CRUD for SavedSpot — M
- *Story:* As a logged-in user, I can create a fishing spot and see my saved spots
  (Create + Read), and update them.
- *Test-first:* RED — failing test that creating a SavedSpot (full-precision coords)
  stores it and reading returns it; then update persists. GREEN after each. DB mocked in
  unit tests.
- *DoD:* Create + Read working end-to-end (the gate's core requirement); coordinates kept
  at full precision; built test-first; committed.

### Day 4 — Must Have #4: Delete confirmation dialog — S
- *Story:* As a user, I can delete a saved spot, but only after a confirmation prompt so
  I don't lose it by accident.
- *Test-first:* RED — failing test that delete only fires after explicit confirm, and
  canceling leaves the spot untouched. GREEN.
- *DoD:* confirmation dialog appears before delete; delete fires only on confirm; cancel
  leaves the spot; built test-first; committed.

### Day 5 — Must Have #5: Prisma + Neon live database — M
- *Story:* As the app, I connect to the live Neon database via Prisma so a user's data
  persists between visits.
- *Test-first:* logic/seams tested with Prisma mocked; then a real migration + a live
  read/write against Neon to confirm the connection.
- *DoD:* schema (SavedSpot with its relationship) migrates to Neon; a live read/write
  succeeds; connection string in `.env` (not committed); committed.

> After the Must Have block: end-to-end test — register → verify email → log in →
> create a saved spot → read it back → delete with confirm. This proves the gate's core
> flow works.

#### SHOULD HAVE block (in my priority order)

### Day 6 — Coordinate precision fix (P1 bug) — S
- *Story:* As a fisherman, I enter full-precision lat/long so the search points at the
  real spot, not miles off.
- *Test-first:* RED — failing test that a full-precision coordinate survives input →
  query unchanged (no truncation); then validation rejects out-of-range/non-numeric.
- *DoD:* full precision preserved everywhere; never truncated; built test-first; committed.
- *Note:* this is a P1 bug. Per the lesson, P1s can jump ahead of anything — if I want it
  fixed before the Must Have block, I move it to Day 1. Listed here to keep the doc
  consistent with my MoSCoW order, but flagged as a P1 I may pull forward.

### Day 7 — Nav bar + post-login home (two buttons) — S/S
- *Story:* As a visitor I reach Freshwater/Saltwater from a nav bar; after login I land
  on a home with two buttons — no URL typing.
- *Test-first:* RED — failing component test that the NavBar renders Freshwater,
  Saltwater, About, Mission, Contact links with the right hrefs. GREEN.
- *DoD:* nav links route correctly; post-login home shows two working buttons;
  built test-first (for the component); committed.

### Day 8 — Landing page (structure) — M
- *Story:* As a visitor, I land on a real home page that tells me what AnglerCast does.
- *DoD:* landing page at `/` loads; explains the app; links into the nav. (Visual styling
  comes in the redesign.)

### Day 9 — Recommendation feature (fish + location + month) — L
- *Story:* As a fisherman, I get real spot recommendations so the app is never empty.
- *Test-first:* RED — failing test that, given a fixed set of real records, the code
  returns the top species + a real full-precision coordinate + the peak month; then the
  never-empty case. GREEN. AI mocked.
- *DoD:* recommendation = fish + real location + month, from real data; sample size +
  confidence shown; AI only phrases it; built test-first; committed.

#### NICE TO HAVE block (in my priority order)

### Day 10 — Rugged redesign + page background fix + distinct map markers — M/S/S
- *Story:* As an outdoor enthusiast, the app looks rugged and made for fishermen.
- *Test-first:* logic seams (species→marker-style map) tested; visuals eyeball-verified.
- *DoD:* theme applied consistently; jpeg as the page background (not on a card); each
  species has a distinct marker + legend; committed.

### Day 11 — Knots/ETA travel time — L
- *Story:* As a fisherman, I enter my location and get a conditions-aware ETA to a spot.
- *Test-first:* RED — failing sanity-check test that an out-of-range ETA fails and a
  reasonable one passes (AI mocked). GREEN.
- *DoD:* origin required (full precision); AI computes the ETA and shows its reasoning;
  sanity-check test catches a bad number; built test-first; committed.

### Day 12 — Test + deploy
- Full click-through of every feature; fix any bugs found; remove stray console.logs;
  then deploy to Vercel and confirm the live URL works.

> Buffer: everything takes longer than I think. If a day's task finishes early, I pull
> the next feature forward. If it runs long, it rolls to the next day — I'm building
> every day this week.

---

## My users for testing
- I will have 2–3 teammates test the app and give feedback (screenshots / notes), per
  the gate requirement of documented real-user activity.

---

## Definition of done (per feature)
- Built test-first (RED before GREEN), recorded in my TESTING.md.
- All tests pass; `npm run typecheck` clean.
- No test weakened or deleted to go green.
- My code constraints followed: strict TypeScript (no `any`), no `var`, closure-based
  arrow functions assigned to const, factory functions over classes (except Next.js
  route handlers).
- Coordinates kept at full precision.
- Honest-data thesis intact (AI explains/assembles; never invents).
- Committed with a clear message.
- For UI features: visibly works in the browser.

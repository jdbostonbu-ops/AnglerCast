# TESTING.md — AnglerCast TDD Ledger (Must Haves 1–5)

How I work this file:
- I write the failing tests FIRST. I run all of the tests myself — not Codex.
- The first run MUST fail as expected, because no implementation code has been written yet.
- I commit the RED (failing test) separately, then write the simplest code to pass, then commit the GREEN.
- I never weaken or delete a test to make it pass.
- External calls (Prisma/Neon, email, bcrypt where noted) are mocked in unit tests.

Each test below is described in plain English: what it checks, and why it fails first.

---

# 1. Write the failing tests

---

## 1 — Email code verification

RED 1.1 — Code is stored hashed, with a future expiry
- What it checks: the code-generation function returns a stored value that is the HASH of the code (not the raw code), plus an expiry timestamp set in the future.
- Why it fails first: the code-generation function doesn't exist yet, so there's nothing to hash the code or set an expiry.

RED 1.2 — A correct, unexpired code verifies as true
- What it checks: the verify function returns true when the entered code matches the stored hash and the expiry is still in the future.
- Why it fails first: the verify function doesn't exist yet.

RED 1.3 — An expired code is rejected
- What it checks: the verify function returns false (with a clear "expired" reason) when the code is correct but the expiry is in the past. Time is mocked so the code is expired.
- Why it fails first: no expiry-checking logic exists yet.

RED 1.4 — A wrong code is rejected
- What it checks: the verify function returns false when the entered code does not match the stored hash, even if it hasn't expired.
- Why it fails first: no hash-comparison logic exists yet.

RED 1.5 — A new account starts inactive and only activates after verification
- What it checks: a newly created user has isVerified = false, and it flips to true only after a successful verification. DB mocked.
- Why it fails first: there's no sign-up/verify flow setting or flipping isVerified yet.

RED 1.6 — An already-verified account can't be verified again
- What it checks: calling verify on an account that is already verified is rejected with a clear message.
- Why it fails first: no "already verified" guard exists yet.

---

## 2 — Login

RED 2.1 — A correct password for a verified user succeeds
- What it checks: the credential-check function looks up the user by email and, when the bcrypt compare passes and the user is verified, returns success. DB and bcrypt mocked.
- Why it fails first: the credential-check function doesn't exist yet.

RED 2.2 — A wrong password is rejected
- What it checks: the same function returns a clear failure (not a crash) when the password does not match the stored hash.
- Why it fails first: no password-comparison logic exists yet.

RED 2.3 — An unverified user can't log in
- What it checks: a user who has not verified their email is blocked from logging in even with the correct password.
- Why it fails first: no "is this user verified?" check exists in the login path yet.

RED 2.4 — The password field has a working show/hide toggle
- What it checks: the password input starts with type "password" (hidden); after clicking the show/hide toggle it becomes type "text" (visible).
- Why it fails first: the toggle component / its state doesn't exist yet.

---

## 3 — CRUD for SavedSpot

RED 3.1 — Create then read returns the spot with full-precision coordinates
- What it checks: creating a SavedSpot with full-precision coordinates (e.g. 41.063500, -71.862800) stores it, and reading returns the SAME coordinates with no rounding. Prisma mocked.
- Why it fails first: the create/read logic doesn't exist yet.

RED 3.2 — A user only sees their own spots
- What it checks: reading spots returns only the logged-in user's spots, not another user's. Two users' data mocked.
- Why it fails first: no user-scoping (filter by userId) exists yet.

RED 3.3 — Update persists and keeps coordinates at full precision
- What it checks: updating a SavedSpot (e.g. its name or notes) saves the change and leaves the coordinates unrounded.
- Why it fails first: the update logic doesn't exist yet.

---

## 4 — Delete confirmation dialog

RED 4.1 — Confirming the dialog deletes the spot
- What it checks: clicking delete opens the confirmation dialog, and clicking "Confirm" calls the delete handler exactly once. Delete handler mocked.
- Why it fails first: the dialog and its confirm wiring don't exist yet.

RED 4.2 — Canceling the dialog does nothing
- What it checks: clicking "Cancel" does NOT call the delete handler and closes the dialog.
- Why it fails first: no cancel behavior exists yet.

---

## 5 — Prisma + Neon live database

RED 5.1 — A SavedSpot is linked to its User (the relationship)
- What it checks: with Prisma mocked, creating a User and then a SavedSpot for that user results in a SavedSpot whose userId matches the user's id (the one-User-has-many-SavedSpots relationship).
- Why it fails first: the data layer / schema relationship isn't defined yet.

Live check (manual, not a unit test):
- After the mocked tests pass: run the real Prisma migration against Neon, create one row, and read it back to confirm the live connection works. Connection string is in .env (not committed). This is a manual confirmation, separate from the unit tests.

---

## 6 — Coordinate precision fix Expected Behavior

RED 6.1 — A full-precision coordinate survives input unchanged (never truncated)
- What it checks: the parseCoordinate function takes a coordinate the user typed (e.g. "-71.862800987654") and returns the exact same full-precision number, with no rounding or truncation.
- Why it fails first; expected behavior: the parseCoordinate function doesn't exist yet, so there's nothing to preserve the precision.

RED 6.2 — Out-of-range and non-numeric input is rejected
- What it checks: parseCoordinate rejects an out-of-range value (e.g. "200") and non-numeric input (e.g. "abc") with a clear error, instead of silently returning a wrong number.
- Why it fails first; expected behavior: no validation logic exists yet.

---

## 7 — Nav bar Expected Behavior

RED 7.1 — The nav bar renders the Freshwater and Saltwater links with correct routes
- What it checks: the NavBar component renders a Freshwater link pointing to /freshwater and a Saltwater link pointing to /saltwater.
- Why it fails first; expected behavior: the NavBar component doesn't exist yet, so there are no links to render.

RED 7.2 — The nav bar renders the About, and Contact links
- What it checks: the NavBar component renders About, and Contact links, each pointing to its route (/about, /contact).
- Why it fails first; expected behavior: the NavBar component doesn't exist yet, so those links aren't rendered.

---

## 8 — Post-login home Expected Behavior

RED 8.1 — The home view renders Freshwater and Saltwater buttons with correct routes

- What it checks: the HomeButtons component renders a Freshwater button/link pointing to /freshwater and a Saltwater button/link pointing to /saltwater, so a logged-in user reaches either page without typing a URL.
- Why it fails first; expected behavior: the HomeButtons component doesn't exist yet, so there are no buttons to render.

---

## 9 — Landing page Expected Behavior

RED 9.1 — The landing page renders and explains what AnglerCast does

- What it checks: the landing page at / renders a heading/intro that tells a visitor what AnglerCast is, and includes the nav so they can reach Freshwater and Saltwater.
- Why it fails first; expected behavior: the landing page content doesn't exist yet (only the placeholder), so there's nothing for the test to find.

---

## 10 — Recommendation feature (fish + location + month) Expected Behavior

RED 10.1 — Given real records, the code returns the top species with a real coordinate and peak month

- What it checks: given a fixed set of real occurrence records for one or more species, the recommendation function returns the top species (the one with the most records), a real full-precision coordinate drawn from that species' records, and the peak month (the month with the most records). The AI is mocked — the code does the selecting, not the AI.
- Why it fails first; expected behavior: the recommendation function doesn't exist yet.

RED 10.2 — The recommendation includes sample size and a confidence flag

- What it checks: the recommendation includes the total record count (sample size) and a high/low confidence flag based on that count, so the result is honest about how much data backs it.
- Why it fails first; expected behavior: no sample-size/confidence logic exists yet.

RED 10.3 — Never empty: a recommendation is still returned when data is sparse

- What it checks: when the record set is small but not empty, the function still returns a valid recommendation (species + real coordinate + month), never null or an empty result.
- Why it fails first; expected behavior: no never-empty handling exists yet.

---

## 11 — Rugged visual redesign Expected Behavior
This is a visual feature. Visual styling is verified by eye.

---

## 12 — Page background fix Expected Behavior
This is a visual feature. Visual styling is verified by eye.

---

## 13 — Distinct map markers per species Expected Behavior

RED 13.1 — Each species maps to a distinct marker style, with a default for unknown species

- What it checks: a getMarkerStyle function takes a species name and returns a distinct marker style (e.g. color + shape). Two different known species return two different styles; an unknown species returns a defined default style (never undefined/crash). The mapping is a shared, reusable lookup.

- Why it fails first; expected behavior: the getMarkerStyle function / the species-to-marker-style map doesn't exist yet.
Visual part (eyeball-verified, built with the map in Feature 15):

The markers render at real full-precision coordinates on the map, each species visually distinct, with a legend. No 0,0 markers. Verified by eye, not unit-tested.

---

## 14 — Knots/ETA travel time Expected Behavior

RED 14.1 — Distance is computed accurately from the user's full-precision coordinates

- What it checks: a computeDistance function takes the user's origin (full-precision latitude/longitude) and a destination (latitude/longitude) and returns the correct distance between them, using the real coordinates with no truncation.
- Why it fails first; expected behavior: the computeDistance function doesn't exist yet.

RED 14.2 — A plausible ETA passes

- What it checks: a checkEtaIsReasonable function takes the AI's proposed ETA plus the inputs the code provided (distance, speed) and returns valid (e.g. { isReasonable: true }) when the ETA is in a plausible range for that distance and speed.
- Why it fails first; expected behavior: the sanity-check function doesn't exist yet.

RED 14.3 — A negative or zero ETA is rejected

- What it checks: the sanity check rejects an ETA that is negative or zero (you can't arrive in no time or in the past) with a clear reason.
- Why it fails first; expected behavior: no validation of the ETA value exists yet.

RED 14.4 — An implausible ETA for the distance and speed is rejected

- What it checks: the sanity check rejects an ETA that is wildly out of range for the given distance and speed (e.g. far too short to physically cover the distance, or absurdly long) with a clear reason — this is the guard that catches the AI inventing a bad number.
- Why it fails first; expected behavior: no plausibility-against-distance logic exists yet.

AI part (mocked in tests; the intentional exception):

The user enters their origin at full-precision latitude/longitude. The code computes the distance from those real coordinates (RED 14.1), then provides distance, speed, and conditions to the AI. The AI computes the conditions-aware ETA and shows its reasoning. In unit tests the AI/fetch is mocked; the sanity-check seam (14.2–14.4) guards whatever the AI returns. The AI never invents the origin, destination, or speed — the user provides the origin (full precision) and the code supplies the rest.

---

## 15 — Empirical sighting-rate search (search + map) Expected Behavior

RED 15.1 — The sighting rate is computed as matching-month records ÷ total records

- What it checks: a computeSightingRate function takes a species' nearby occurrence records and a selected month, and returns { rate, matchingMonthCount, totalCount } where rate = matchingMonthCount ÷ totalCount — the share of that species' records that fall in the selected month.
- Why it fails first; expected behavior: the computeSightingRate function doesn't exist yet.

RED 15.2 — Rate is 0 when there are no records (never divides by zero)

- What it checks: when totalCount is 0, the function returns a rate of 0 (and a 0 count) instead of dividing by zero or crashing.
- Why it fails first; expected behavior: no empty/zero-guard exists yet.

RED 15.3 — The result includes a high/low confidence flag based on sample size

- What it checks: the result includes the sample size (totalCount) and a high/low confidence flag based on how many records back it, so the rate is always shown honestly.
- Why it fails first; expected behavior: no confidence logic exists yet.

RED 15.4 — Occurrence records at 0,0 (Null Island) are excluded

- What it checks: a function that prepares records for the map drops any record at latitude 0, longitude 0 (placeholder/garbage coordinates), so no marker is ever placed at Null Island.
Why it fails first; expected behavior: no 0,0-filtering exists yet.

Occurrence fetch (tested seam; fetch mocked):

A function builds the query to the real occurrence sources (GBIF and OBIS) near the searched coordinates at full precision and returns records shaped with scientificName, decimalLatitude, decimalLongitude, eventDate. In unit tests fetch is mocked — never hits the network.

Visual part (eyeball-verified):

The search input (species, full-precision latitude, longitude, month) and a submit button render on the freshwater and saltwater pages. The entered coordinates drive both the rate and the map, so the map matches the search. The map renders the real occurrences as markers at full-precision coordinates, using the per-species marker styles from Feature 13, with a legend and no 0,0 markers. The sighting rate is shown with its sample size and confidence flag, and the AI phrases the explanation. Verified by eye, not unit-tested.

AI part (assembly only; mocked in tests):

OpenAI receives the already-computed rate, sample size, and confidence and explains them in plain English. It never computes the rate and never invents a location, species, or season.

# 2. Run the tests (expect RED)

I run all the tests. They must all fail, because no implementation exists yet. I confirm each fails for the REASON I expect (missing behavior) — not a typo or bad import. Then I commit the RED.

# 3. Write the simplest code to pass (GREEN)

One test at a time, I write the simplest implementation to make that test pass, re-run, confirm GREEN, and commit the GREEN separately. I never weaken a test to get there.

---




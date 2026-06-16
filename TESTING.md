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


# 2. Run the tests (expect RED)

I run all the tests. They must all fail, because no implementation exists yet. I confirm each fails for the REASON I expect (missing behavior) — not a typo or bad import. Then I commit the RED.

# 3. Write the simplest code to pass (GREEN)

One test at a time, I write the simplest implementation to make that test pass, re-run, confirm GREEN, and commit the GREEN separately. I never weaken a test to get there.

---




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

## 6 — Coordinate precision Expected Behavior

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

---

## 16 — Integration (wire tested logic to real APIs + live DB) Expected Behavior

The pattern for every seam: write the integration test with the boundary mocked first (RED → GREEN), then wire the real call and verify manually. Unit tests mock fetch/Prisma; integration tests prove the seams call the right things with the right data.

RED 16.1 — The occurrence fetch parses a real GBIF/OBIS response shape

- What it checks: the occurrence-fetch function, given a captured real GBIF (and OBIS) response as a mocked fetch result, returns records correctly shaped as { scientificName, decimalLatitude, decimalLongitude, eventDate }. Uses a saved real-response fixture so it matches the actual data shape, not an invented one.
- Why it fails first; expected behavior: the fetch/parse function doesn't exist yet.

RED 16.2 — The signup route creates an inactive user and triggers the verification email

- What it checks: POSTing to the signup route calls the email-verification logic and creates a User (isVerified false) via Prisma with the right data. Prisma and email mocked.
- Why it fails first; expected behavior: the signup route handler doesn't exist yet.

RED 16.3 — The verify route activates the account with a correct code

- What it checks: POSTing to the verify route calls verifyEmailVerificationCodeAndActivateAccount with the email + code and returns success. Prisma mocked.
- Why it fails first; expected behavior: the verify route handler doesn't exist yet.

RED 16.4 — The login route authenticates a verified user

- What it checks: POSTing valid credentials to the login route calls checkLoginCredentials and returns success; wrong/unverified is rejected. Prisma and bcrypt mocked.
- Why it fails first; expected behavior: the login route handler doesn't exist yet.

RED 16.5 — The saved-spot routes create, list, update, and delete scoped to the user

- What it checks: the spot routes call createSavedSpot / listSavedSpotsForUser / updateSavedSpot / delete via Prisma, scoped to the logged-in user, preserving full-precision coordinates. Prisma mocked.
- Why it fails first; expected behavior: the spot route handlers don't exist yet.

RED 16.6 — The sighting-rate search route ties fetch → rate → confidence together

- What it checks: the search route takes species + full-precision lat/long + month, calls the occurrence fetch, runs computeSightingRate over all nearby records, and returns the rate with sample size and confidence; excludes 0,0 records, and returns map occurrences filtered to the selected month (see Feature 24). Fetch and AI mocked.

- Why it fails first; expected behavior: the search route handler doesn't exist yet.

Manual end-to-end verification (eyeball, against live Neon — for the gate):

Sign up → receive code → verify → log in → save a spot → see it persist (visible in Neon/Prisma Studio). Run a sighting-rate search and see the rate + map render. Documented with screenshots as real-user evidence.

AI part (assembly only; mocked in tests):

Where the AI explains the rate or computes the ETA, the AI/fetch is mocked in integration tests; the real call is wired and verified manually. The AI never invents data.

---

## 17 — Password reset (forgot password) — Expected Behavior 

RED 17.1 — createPasswordResetCode — reset code is generated hashed, with a future expiry 

-What it checks: the generator returns a 6-digit code, the HASH of that code (not the raw code), and an expiry timestamp set in the future. 

- Why it fails first; expected behavior: the generator function doesn't exist yet, so there's nothing to make a code, hash it, or set an expiry. 

RED 17.2 — verifyPasswordResetCode — a correct, unexpired code verifies as valid; expired and wrong codes are rejected 

- What it checks: the pure verify function returns valid when the entered code matches the stored hash and the expiry is in the future; returns "expired" when the code is correct but the expiry is past (time mocked); returns "mismatch" when the code doesn't match the hash. 

- Why it fails first; expected behavior: the verify function doesn't exist yet, so there's no expiry check or hash comparison. 

RED 17.3 — requestPasswordReset — only verified accounts may reset; a code is issued and stored 

- What it checks: requesting a reset for an account where isVerified = false is rejected with a clear "not verified" reason; for a verified account, a reset code is generated and stored on the user. DB mocked. 

- Why it fails first; expected behavior: the request-reset function doesn't exist yet, so there's no user lookup, no isVerified check, and nowhere storing the code. 

RED 17.4 — resetPasswordWithCode — a correct code sets a new password and clears the reset fields 

- What it checks: given a valid, unexpired code, the function hashes the NEW password, updates the user, and clears the stored reset code and expiry so it can't be reused; an expired or wrong code is rejected and the password is left unchanged. DB mocked, time mocked for the expired case. 

- Why it fails first; expected behavior: the confirm function doesn't exist yet to verify the code, hash the new password, or clear the fields. 

RED 17.5 — request-reset API route — POST email returns success without revealing whether the email exists 

- What it checks: POSTing an email returns the same success response whether or not the account exists (so it can't be used to discover registered emails); when the account exists and is verified, it calls requestPasswordReset and triggers the email send. Route, DB, and email send mocked. 

- Why it fails first; expected behavior: the request-reset route doesn't exist yet. 

RED 17.6 — confirm-reset API route — POST email + code + new password updates the password for a valid code 

- What it checks: POSTing email, code, and new password returns success and updates the password when the code is valid; returns the appropriate error response for expired or mismatched codes. Route and DB mocked. 

- Why it fails first; expected behavior: the confirm-reset route doesn't exist yet. 

RED 17.7 — email send — the reset code is delivered via Resend 

- What it checks: when a reset is requested for a verified account, the Resend email client is called with the recipient's address and the reset code in the message. Resend mocked (no real email sent in the test). 

- Why it fails first; expected behavior: there's no reset-email send wired yet. 

RED 17.8 — request-reset UI page — the user can enter their email and submit 

- What it checks: the page renders an email field and a submit control; submitting posts the email to the request-reset route and shows a confirmation message. Fetch mocked. 

- Why it fails first; expected behavior: the request-reset page doesn't exist yet. 

RED 17.9 — confirm-reset UI page — the user can enter the code and a new password and submit 

- What it checks: the page renders a code field, a new-password field, and a submit control; submitting posts to the confirm-reset route and shows success or the appropriate error. Fetch mocked. 

RED 17.12 — After a successful reset, the confirm page shows a link to log in

- What it checks: after the user submits a valid email, code, and new password and the reset succeeds, the confirm page renders a "Log in" link pointing to /login, so the user can go log in with their new password.

- Why it fails first; expected behavior: the confirm page shows the success message but has no login link yet, so there's no element with the role "link" named "Log in".

---

## Feature 18 — Empty-records notice on search results RED 18.1 — A no-records message shows only when there are zero records

- What it checks: the EmptyRecordsNotice component renders the message "No records found near these coordinates" when totalCount is 0, and renders nothing when totalCount is greater than 0 (tested with totalCount={1}).

- Why it fails first; expected behavior: the EmptyRecordsNotice component doesn't exist yet, so the test can't import it from @/components/EmptyRecordsNotice and fails to resolve the module.

---

## 19 — Honest "records" wording in the AI sighting-rate explanation — Expected BehaviorRED 19.1 — explainSightingRate — the model is instructed to call the counts "records," not a fish count

- What it checks: the system prompt sent to OpenAI explicitly tells the model that the counts are occurrence records — it includes the word "records" and an instruction not to describe them as a count of fish (e.g. "not a fish count" / "occurrence records"). The test inspects the request body's system message; OpenAI is mocked, so no real call is made.

- Why it fails first; expected behavior: the current system prompt only says to "state the percentage and the sample size" without defining what the counts represent, so it contains no "records" instruction and nothing forbidding a fish-count framing — leaving the model free to say "30 fish counted."

---

## 20 — AI explanation voice: no self-reference — Expected BehaviorRED 20.1 — explainSightingRate — the model is instructed not to refer to itself or announce its role

- What it checks: the system prompt sent to OpenAI includes an instruction telling the model not to refer to itself or describe its role (the test matches the system message against /do not (refer to|mention|describe) yourself|do not announce your role|never refer to yourself/i). The test inspects the request body's system message; OpenAI is mocked, so no real call is made.

- Why it fails first; expected behavior: the current system prompt says to "write like an honest fishing guide" but never forbids the model from naming that role, so the model can echo the instruction in its output (e.g. "As an honest fishing guide, I want to share…") instead of just adopting the voice.

---

## 21 — AI explanation voice: upbeat angler tone — Expected Behavior

RED 21.1 — explainSightingRate — the model is instructed to use an upbeat tone with a casual greeting and encouraging close

- What it checks: the system prompt sent to OpenAI instructs a warm, playful, upbeat angler voice — it includes an example casual greeting ("Alright, folks,"), an example encouraging close ("Happy fishing!"), and an upbeat/playful/fun tone word (the test matches the system message against /Alright, folks/i, /Happy fishing/i, and /upbeat|playful|fun/i). The test inspects the request body's system message; OpenAI is mocked, so no real call is made.

- Why it fails first; expected behavior: the current system prompt only says to write in a "warm, casual tone like an experienced angler talking to a friend," which produces flat, generic output — it gives no greeting, no sign-off, and no playful-energy instruction, so the lively "Alright, folks… Happy fishing!" voice is gone.

---

## 22 — AI explanation: percentage is a share of records, not a chance — Expected Behavior

RED 22.1 — explainSightingRate — the model is instructed to describe the percentage as a share of records, not a chance of catching

- What it checks: the system prompt sent to OpenAI defines what the percentage represents — it ties the percentage to records (share/percentage of records) and forbids framing it as a chance, probability, or likelihood of catching (the test matches the system message against /percentage.*records|share of (the )?records|percentage of (the )?records/i and /not a chance|never.*chance|not.*probability|not.*likelihood of catching/i). The test inspects the request body's system message; OpenAI is mocked, so no real call is made.

- Why it fails first; expected behavior: the current system prompt only says to "state the percentage" without defining what it represents, so the model is free to relabel it as catch odds (e.g. "That puts your chances at a whopping 23.33%!") instead of "23.33% of records."

---

## 23 — OBIS fetch returns a confident sample, not a default page — Expected Behavior 

RED 23.1 — fetchObisOccurrences — requests 2000 records from OBIS instead of the small default page 

- What it checks: the OBIS request includes a size=2000 query parameter, so OBIS returns up to 2000 occurrence records for the species rather than its small default page (the test inspects the fetched URL's search params and asserts size is 2000). Fetch is mocked; no real OBIS call is made. 

- Why it fails first; expected behavior: the current fetchObisOccurrences sends only the species name with no size parameter, so OBIS returns its small default page (~the handful of records that left the app computing month percentages over only ~30 records — far too small a sample to speak with confidence for any of the 40 species). 

RED 23.2 — fetchOccurrenceRecords — requests up to 300 records from GBIF instead of the small default page

- What it checks: the GBIF request includes a limit=300 query parameter, so GBIF returns up to 300 occurrence records for the species near the searched coordinates rather than its small default page (the test inspects the fetched GBIF URL's search params and asserts limit is 300). Fetch is mocked; no real GBIF call is made.

- Why it fails first; expected behavior: the current fetchOccurrenceRecords sends only scientificName and the coordinate ranges with no limit parameter, so GBIF returns its small default page — far too small a sample for the freshwater page (which is GBIF-driven), leaving freshwater month percentages and the map computed over too few records.

## RED 23.3 — fetchOccurrenceRecords — paginates GBIF to collect up to 2000 records, stopping early when records run out

- What it checks: the GBIF fetch requests records in pages (using an offset that advances by the page size) and accumulates results until it has collected 2000 records or GBIF returns a partial/empty page (meaning no more records exist). The test mocks fetch to return full pages until a point and then a short page, and asserts that (a) GBIF is called multiple times with advancing offsets, (b) pagination stops once 2000 are collected, and (c) pagination stops early when a returned page is short (no further requests, no error). Fetch is mocked; no real GBIF call is made.

- Why it fails first; expected behavior: the current fetchOccurrenceRecords makes a single GBIF request with limit=300, so it can never return more than 300 records — under-pulling the rich local GBIF data (e.g. 9,345 Rainbow Trout records available in-box) while global OBIS records dominate the merged sample.

---

## 24 — Map shows only the selected month's records — Expected Behavior

RED 24.1 — search route — the returned occurrences are filtered to the selected month, while the sighting rate is still computed over all records

- What it checks: when the search route is called with records spanning multiple months, the occurrences array it returns (the records the map renders) contains only records whose eventDate falls in the selected month, while rate.totalCount still reflects all records (so the percentage denominator is unchanged). The test mocks the fetch/data layer so the records are controlled; it asserts the returned occurrences are month-filtered and that rate.totalCount equals the full record count.

- Why it fails first; expected behavior: the route currently builds occurrences with prepareOccurrenceRecordsForMap (which only drops 0,0 NullIsland records) and never filters by month, so the map receives all-month records — the percentage changes with the month but the map does not, which defeats the seasonal-location purpose.

---

## 25 — resetPasswordWithCode handles missing account / missing reset code — Expected Behavior

RED 25.1 — resetPasswordWithCode — returns a clean failure when no account exists for the email

- What it checks: when prisma.user.findUnique resolves to null (no account for that email), resetPasswordWithCode returns a handled failure result ({ ok: false, reason: ... }) instead of throwing. prisma is mocked to return null; the test asserts the function resolves (does not reject/throw) and that prisma.user.update is not called.

- Why it fails first; expected behavior: the function currently does (await prisma.user.findUnique(...))!, so a null account is force-unwrapped and the next line throws — there is no missing-account guard yet.

RED 25.2 — resetPasswordWithCode — returns a clean failure when the account has no reset code pending

- What it checks: when the account exists but passwordResetCodeHash / passwordResetCodeExpiresAt are null (the user never requested a reset, or already used it), resetPasswordWithCode returns a handled failure result ({ ok: false, reason: ... }) instead of throwing, and does not change the password (prisma.user.update not called). prisma mocked to return an account with null reset fields.

- Why it fails first; expected behavior: the function passes account.passwordResetCodeHash! / account.passwordResetCodeExpiresAt! straight into verifyPasswordResetCode, so null reset fields are force-unwrapped and throw — there is no missing-code guard yet.


Notes: (1) This is a robustness fix, not a security fix — the existing valid/expired/mismatch enforcement is already correct and tested; this only converts a crash (unhandled null via ! assertions) into a clean handled failure for inputs the current tests don't exercise (e.g. a user who skips straight to reset-confirm without requesting a code). (2) The exact reason strings are a design choice, decided at GREEN — reuse an existing reason or add new ones (e.g. 'account_not_found', 'no_reset_pending'); the ResetPasswordWithCodeResult type may need widening, which is part of the GREEN.

---

## 26 — Server-side route guard (middleware) — Expected BehaviorThe testable seam is a pure helper, shouldRedirectToLogin(pathname, hasSessionCookie), that decides whether a request should be redirected to /login. The actual middleware.ts is a thin wrapper that reads the anglercast_session cookie and the pathname, calls this helper, and returns a redirect or continues. The wrapper's real redirect wiring is verified by curl (see notes), not unit-tested.RED 26.1 — shouldRedirectToLogin — protected route with no session cookie redirects

- What it checks: shouldRedirectToLogin('/', false) returns true — a protected app route with no session cookie should be redirected to login. Tested for representative protected paths (e.g. /, /saltwater, /freshwater, /explore, /contact).

- Why it fails first; expected behavior: the shouldRedirectToLogin helper does not exist yet.
RED 26.2 — shouldRedirectToLogin — protected route with a session cookie does not redirect

- What it checks: shouldRedirectToLogin('/', true) returns false — a protected route with the session cookie present is allowed through. Presence of the cookie is sufficient (matches current getSessionUserId behavior — presence, not validity).

- Why it fails first; expected behavior: the helper does not exist yet.
RED 26.3 — shouldRedirectToLogin — auth route with no session cookie does not redirect

- What it checks: shouldRedirectToLogin('/login', false) returns false — auth routes (/login, /signup, /verify, /reset-confirm) are exempt even with no cookie, so a logged-out user can reach them (preventing a redirect loop). Tested for representative auth paths.

- Why it fails first; expected behavior: the helper does not exist yet.

Notes: (1) All app pages (/, /saltwater, /freshwater, /explore, /contact) are protected; only /login, /signup, /verify, /reset-confirm, and /api/auth/* are exempt (plus Next.js internals/static assets, handled by the middleware matcher, not this helper). (2) The helper checks presence of the session cookie (a boolean passed in), not its authenticity — the cookie stores a raw userId with no signing — so the tests assert presence-based allow/deny only. Cookie signing is a separate future hardening task. (3) These unit tests verify the decision logic only. The thin middleware.ts wrapper (reading the real cookie, returning the real redirect, and the path matcher) is verified end-to-end with a curl to a protected route while logged out (expect a redirect and no protected HTML) — a passing unit test does NOT prove the deployed app withholds the page.

---

## 27 — Signup handles a duplicate email cleanly — Expected Behavior

RED 27.1 — POST /api/auth/signup — returns a clean error when the email already exists, instead of throwing

- What it checks: when prisma.user.create rejects with a Prisma duplicate-key error (code P2002 — the email is already registered), the signup route returns a handled error response (a non-2xx status with a JSON error message) instead of letting the error propagate as an unhandled 500. prisma.user.create is mocked to reject with a P2002-style error; the test asserts the route resolves to the handled error response (does not reject/throw) and does not call sendVerificationEmail.

- Why it fails first; expected behavior: the route currently calls prisma.user.create with no try/catch, so a P2002 rejection propagates unhandled — there is no duplicate-email guard yet.


Notes: (1) This is a robustness / UX fix, not a security fix — it converts an unhandled 500 (on a duplicate email) into a clean, specific error the signup page can display. The page already reads data.error from the response, so returning { error: '...' } makes the page show a specific message instead of its generic fallback. (2) The exact status code (e.g. 409 Conflict) and error wording are a GREEN-time choice — the test asserts only that the response is a handled non-2xx with an error field and that no verification email is sent; it does not lock a specific status or message. (3) Honest privacy note to decide at GREEN: a specific "that email is already registered" message confirms an email exists (a mild account-enumeration signal). That's a deliberate tradeoff — clearer UX vs. not revealing which emails are registered. The test does not force either choice.

---

## 28 — Profile in the nav bar (display name + optional image)

This feature extends the existing NavBar (section 7) to show the logged-in user's profile, and adds the data layer behind it. The NavBar gains a profile section on the right side: avatar + display name when set, "Set up profile" prompt when not.

RED 28.1 — A user can save a profile name to their account
- What it checks: a saveProfileName function takes a userId and a name string, stores it, and a follow-up read returns the saved name. Prisma mocked.
- Why it fails first; expected behavior: the saveProfileName function doesn't exist yet.

RED 28.2 — A user can save a profile image URL to their account
- What it checks: a saveProfileImage function takes a userId and an image URL, stores it, and a follow-up read returns the saved URL. The upload itself is out of scope here — this test covers the URL being persisted on the user record. Prisma mocked.
- Why it fails first; expected behavior: the saveProfileImage function doesn't exist yet.

RED 28.3 — getDisplayAvatar returns the image URL when one is set
- What it checks: getDisplayAvatar({ profileImageUrl, email }) returns { kind: "image", src: profileImageUrl } when the user has uploaded an image.
- Why it fails first; expected behavior: the getDisplayAvatar function doesn't exist yet.

RED 28.4 — getDisplayAvatar falls back to the first letter of the email when no image is set
- What it checks: getDisplayAvatar({ profileImageUrl: null, email: "jdboston@example.com" }) returns { kind: "letter", letter: "J" } — uppercase first letter of the email.
- Why it fails first; expected behavior: no fallback logic exists yet.

RED 28.5 — The NavBar renders the AnglerCast logo on the left and the existing links in the middle (regression guard)
- What it checks: the existing NavBar still renders the AnglerCast logo/title on the left and the Freshwater, Saltwater, About, Contact links in their existing positions, so adding the profile doesn't break what's already tested in section 7.
- Why it fails first; expected behavior: this test should PASS immediately if section 7 still holds. It's here as a regression guard before we modify the NavBar.

RED 28.6 — The NavBar renders the profile avatar and display name on the right when a profile is set
- What it checks: the NavBar component, given a logged-in user with a profile name "trigger" and a profile image URL, renders an avatar image and the name "trigger" on the right side of the nav.
- Why it fails first; expected behavior: the NavBar doesn't render a profile section yet.

RED 28.7 — The NavBar renders the letter avatar when no profile image is set
- What it checks: the NavBar, given a user with profile name "trigger" and no profile image, renders the letter avatar (first letter of email, uppercase) and the name "trigger" on the right side.
- Why it fails first; expected behavior: no letter-avatar rendering exists yet.

RED 28.8 — The NavBar renders "Set up profile" prompt when no profile name is set
- What it checks: the NavBar, given a logged-in user with no profile name, renders a "Set up profile" link/button on the right side instead of an avatar+name pair.
- Why it fails first; expected behavior: no profile-not-set state exists yet.

RED 28.9 — Posting requires a profile name; without one, canPostCatch returns false
- What it checks: a canPostCatch({ profileName }) function returns { allowed: false, reason: "no profile name" } when profileName is empty/null, and { allowed: true } when set.
- Why it fails first; expected behavior: no profile-name check exists yet.

RED 28.10 — When canPostCatch is false, clicking Post on the feed shows "Set up profile" dialog instead of submitting
- What it checks: clicking "Post" without a profile name shows a dialog with the message "Set up profile" (and does NOT call the submit handler). Submit handler mocked.
- Why it fails first; expected behavior: the dialog doesn't exist yet.

---

## 29 — Catch Reports Feed (per-page: freshwater and saltwater)

RED 29.1 — A logged-in user can create a catch report scoped to a water type
- What it checks: a createCatchReport function takes a userId, a waterType ("freshwater" or "saltwater"), and the post body text, and returns a saved post with id, userId, waterType, body, createdAt. Prisma mocked.
- Why it fails first; expected behavior: the createCatchReport function doesn't exist yet.

RED 29.2 — Each feed returns only the posts for its water type
- What it checks: getCatchReports({ waterType: "freshwater" }) returns only freshwater posts; getCatchReports({ waterType: "saltwater" }) returns only saltwater posts. Two seeded sets of posts in the mock.
- Why it fails first; expected behavior: no water-type filtering exists yet.

RED 29.3 — Posts return newest first (real-time feel)
- What it checks: getCatchReports returns posts sorted by createdAt descending, so the newest catch shows at the top of the feed.
- Why it fails first; expected behavior: no ordering logic exists yet.

RED 29.4 — Each returned post includes the author's display name and avatar
- What it checks: getCatchReports returns each post joined with the author's profileName and a resolved avatar (image URL if set, otherwise the first-letter-of-email fallback), so the feed component doesn't have to fetch users separately.
- Why it fails first; expected behavior: no join/avatar-resolution logic exists yet.

RED 29.5 — A user can update their OWN post
- What it checks: updateCatchReport({ postId, userId, newBody }) updates the post body when the userId owns the post, and returns the updated post. Prisma mocked.
- Why it fails first; expected behavior: the update function doesn't exist yet.

RED 29.6 — A user cannot update someone else's post
- What it checks: updateCatchReport rejects (with a clear "not your post" error) when the userId does not own the post. The post is not changed.
- Why it fails first; expected behavior: no ownership check exists yet.

RED 29.7 — A user can delete their OWN post
- What it checks: deleteCatchReport({ postId, userId }) removes the post when the userId owns it, and returns success. Prisma mocked.
- Why it fails first; expected behavior: the delete function doesn't exist yet.

RED 29.8 — A user cannot delete someone else's post
- What it checks: deleteCatchReport rejects (with a clear "not your post" error) when the userId does not own the post. The post is not removed.
- Why it fails first; expected behavior: no ownership check exists yet.

---

## 30 — Catch Report Edit and Delete UI

RED 30.1 — A pencil edit button is shown only on the user's own posts
- What it checks: the CatchPost component renders a pencil edit button when the post's userId matches the logged-in user, and does NOT render it on other users' posts.
- Why it fails first; expected behavior: the edit-button-with-ownership logic doesn't exist yet.

RED 30.2 — Clicking the pencil reveals an editable field and a Save button
- What it checks: clicking the pencil swaps the post body for an editable textarea pre-filled with the current body, and shows a Save button next to it.
- Why it fails first; expected behavior: the edit-mode toggle and Save button don't exist yet.

RED 30.3 — Clicking Save calls the update handler with the new body
- What it checks: editing the textarea and clicking Save calls the update handler exactly once with the new body text. Update handler mocked.
- Why it fails first; expected behavior: the Save wiring doesn't exist yet.

RED 30.4 — Confirming the delete dialog calls the delete handler exactly once
- What it checks: clicking delete on a catch post opens the confirmation dialog, and clicking "Confirm" calls the delete handler exactly once. Delete handler mocked.
- Why it fails first; expected behavior: the dialog and its confirm wiring don't exist yet.

RED 30.5 — Canceling the delete dialog does nothing
- What it checks: clicking "Cancel" does NOT call the delete handler and closes the dialog.
- Why it fails first; expected behavior: no cancel behavior exists yet.

---

## 31 — Real-time feed refresh (no manual reload)

RED 31.1 — The feed polls for new posts on a fixed interval
- What it checks: the CatchFeed component calls getCatchReports on mount and then again on a fixed interval (e.g. every 10 seconds). Fake timers and a mocked getCatchReports are used to assert the second call fires after the interval advances.
- Why it fails first; expected behavior: no polling logic exists yet.

RED 31.2 — A newly-posted catch appears in the feed without a page refresh
- What it checks: when getCatchReports returns a longer list on the second poll, the CatchFeed re-renders with the new post visible at the top — no page reload, no user action required.
- Why it fails first; expected behavior: no re-render-on-new-data logic exists yet.

RED 31.3 — Polling stops when the component unmounts
- What it checks: when the CatchFeed component unmounts, the polling interval is cleared so it doesn't keep firing or leak memory.
- Why it fails first; expected behavior: no cleanup exists yet.

---

## 32 — Species dropdown (common names) on the sighting-rate search

The Species field is currently a free-text input. Users type a common name (e.g. "Striped Bass"), but the search needs the scientific name (e.g. "Morone saxatilis"), so typing fails and returns 0%. This replaces the free-text input with a dropdown of common names whose selected value is the scientific name — mirroring what clicking the right-hand species list already does.

RED 32.1 — The Species field renders as a dropdown of the water type's common names
- What it checks: SightingRateSearch, given a waterType, renders a select control whose options are the common names of the species for that water type (from getSpeciesForWaterType). A blank/placeholder option is present as the default.
- Why it fails first; expected behavior: the Species field is currently a free-text input, not a select, so there is no dropdown with common-name options to find.

RED 32.2 — Selecting a common name sets the species to its scientific name
- What it checks: when the user selects a common name from the dropdown, the value submitted as `species` is the corresponding scientific name (not the common name). Submitting the form calls onSearch with the scientific name. The species-to-scientific mapping comes from getSpeciesForWaterType.
- Why it fails first; expected behavior: there is no dropdown and no common-name-to-scientific mapping in the field yet, so selecting a common name cannot set the scientific name.

RED 32.3 — A list-click selection is reflected in the dropdown
- What it checks: when selectedSpecies (a scientific name, set by clicking the right-hand SpeciesList) is provided to SightingRateSearch, the dropdown shows that species as the selected option, keeping the two selection methods in sync.
- Why it fails first; expected behavior: the field has no dropdown to reflect a selected option yet.

Visual/wiring part (eyeball-verified):
The saltwater and freshwater pages pass their waterType into SightingRateSearch so the dropdown lists the correct species. Selecting a species via the dropdown populates the search the same way a list-click does, and the search returns a real rate instead of 0%. Verified by eye.

---

## 33 — Map zoom hint

A short hint appears between the AI explanation and the occurrence map, telling the user they can zoom in and out to see more occurrences, encouraging map interaction.

RED 33.1 — The MapHint renders the zoom guidance text
- What it checks: the MapHint component renders a message telling the user to zoom in and out on the map to see more occurrences.
- Why it fails first; expected behavior: the MapHint component doesn't exist yet, so there is nothing to import or render.

Visual/wiring part (eyeball-verified):
The MapHint is placed on the saltwater and freshwater pages between the AI explanation paragraph and the OccurrenceMap, and only shows when a result/map is showing. Verified by eye.

---

## 34 — FAQ chat on Explore page (RAG)

A FAQ chat below the ETA result on the Explore page. Users ask
natural-language fishing questions and the AI answers grounded in
src/lib/faq/*.md. The FAQ corpus contains two kinds of docs: concept docs
(how sighting rate works, why month matters, tide reading, conditions,
safety, gear, ethics) and how-to-use-AnglerCast docs that route seasonality
questions to the live Saltwater and Freshwater search tools. The RAG
pipeline chunks the markdown, embeds chunks with OpenAI, retrieves the
most similar chunks for the user's question, and the AI answers using only
those chunks. Each answer shows the friendly titles of the FAQ docs it
drew from. If no chunks score high enough, the AI says "I don't have that
information" — the honest-data thesis is preserved (the AI does not invent
fishing advice, and it does not duplicate the live seasonality data that
already lives in /api/search).

RED 34.1 — cosineSimilarity returns 1 for identical, 0 for orthogonal, -1 for opposite vectors
- What it checks: cosineSimilarity(a, b) in src/lib/rag.ts returns 1
  (within floating-point tolerance) when a and b are the same vector,
  0 when they are orthogonal (e.g. [1, 0] and [0, 1]), and -1 when one
  is the negation of the other.
- Why it fails first; expected behavior: the cosineSimilarity function
  doesn't exist yet in src/lib/rag.ts, so the import fails.

RED 34.2 — chunkMarkdownContent splits on double newlines and drops chunks under 50 chars
- What it checks: chunkMarkdownContent(text, source) in src/lib/rag.ts
  takes a markdown string and a source identifier, splits the text on
  double newlines, drops any resulting paragraph shorter than 50
  characters after trimming, and returns an array of { source, text }
  objects where each text is the trimmed paragraph. Empty input returns
  an empty array.
- Why it fails first; expected behavior: the chunkMarkdownContent
  function doesn't exist yet in src/lib/rag.ts, so the import fails.

RED 34.3 — retrieveTopChunks returns topK chunks sorted by similarity, highest first
- What it checks: retrieveTopChunks(questionEmbedding, chunks, topK) in
  src/lib/rag.ts takes a question embedding, an array of chunks each
  with an embedding, and a number topK; it returns at most topK chunks
  sorted in descending order of cosine similarity to the question
  embedding, with each returned chunk including a numeric score field.
  Empty chunk input returns an empty array.
- Why it fails first; expected behavior: the retrieveTopChunks function
  doesn't exist yet in src/lib/rag.ts, so the import fails.

RED 34.4 — POST /api/explore-chat returns answer + sources for a valid question
- What it checks: POST to /api/explore-chat with a JSON body
  { question: "what is sighting rate?" } returns a 200 response with a
  JSON body containing answer (non-empty string) and sources (array of
  source titles such as "How Sighting Rate Works"). OpenAI embeddings
  are mocked to return fixed vectors. OpenAI chat completion is mocked
  to return a fixed answer string. The FAQ content read from disk is
  mocked or provided as a test fixture so the test is deterministic and
  does not touch the real network or filesystem.
- Why it fails first; expected behavior: the route file
  src/app/api/explore-chat/route.ts doesn't exist yet, so POST returns
  404 (or the import fails).

RED 34.5 — POST /api/explore-chat returns 400 for missing or empty question
- What it checks: POST to /api/explore-chat with a JSON body where
  question is missing, an empty string, or whitespace-only returns a
  400 status with a JSON body containing an error message. No OpenAI
  calls are made.
- Why it fails first; expected behavior: the route doesn't exist yet,
  so the validation guard isn't in place.

RED 34.6 — POST /api/explore-chat returns "I don't have that information" when top score is below threshold
- What it checks: When the mocked OpenAI embedding returns a question
  vector that has very low cosine similarity to all FAQ chunks (top
  score below the configured threshold, e.g. 0.2), POST to
  /api/explore-chat returns a 200 response with answer equal to
  "I don't have that information." and sources as an empty array. The
  OpenAI chat completion is NOT called (there is nothing relevant to
  ground in).
- Why it fails first; expected behavior: the route doesn't exist yet,
  and there is no threshold check logic.

RED 34.7 — ExploreFaqChat component renders the question input and submit button
- What it checks: The ExploreFaqChat component (a new component in
  src/components/) renders a labeled text input for the user's question
  and a submit button (e.g. "Ask"). Both elements are present on
  initial render with no result yet.
- Why it fails first; expected behavior: the ExploreFaqChat component
  doesn't exist yet, so the import fails.

RED 34.8 — ExploreFaqChat displays the answer after a successful submission
- What it checks: When the user types a question into ExploreFaqChat,
  clicks submit, and the mocked fetch to /api/explore-chat resolves
  with { answer: "Sighting rate is...", sources: ["How Sighting Rate Works"] },
  the component displays the answer text. The /api/explore-chat fetch
  call is mocked.
- Why it fails first; expected behavior: the component doesn't exist
  or doesn't yet wire the API call to a rendered answer.

RED 34.9 — ExploreFaqChat displays the source titles under the answer
- What it checks: When the mocked /api/explore-chat fetch resolves with
  sources like ["How Sighting Rate Works", "Why Month Matters"], the
  component displays each source title in a sources area beneath the
  answer (e.g. labeled "Sources:" or "From:"). The /api/explore-chat
  fetch call is mocked.
- Why it fails first; expected behavior: the component does not yet
  render the sources array, only the answer.

RED 34.10 — ExploreFaqChat shows an error message when the API call fails
- What it checks: When the mocked fetch to /api/explore-chat rejects or
  returns a non-200 response, the component displays a clear,
  user-friendly error message (e.g. "Something went wrong. Please try
  again.") instead of an answer. The /api/explore-chat fetch call is
  mocked.
- Why it fails first; expected behavior: the component does not yet
  handle fetch errors and has no error state.

Visual/wiring part (eyeball-verified):
The ExploreFaqChat component is placed on the Explore page below the
ETA result block (the spot-cards section), so users see it after their
travel-time/conditions/species result. Verified by eye.

---

# 2. Run the tests (expect RED)

I run all the tests. They must all fail, because no implementation exists yet. I confirm each fails for the REASON I expect (missing behavior) — not a typo or bad import. Then I commit the RED.

# 3. Write the simplest code to pass (GREEN)

One test at a time, I write the simplest implementation to make that test pass, re-run, confirm GREEN, and commit the GREEN separately. I never weaken a test to get there.

---




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

RED 34.4 — POST /api/explore-chat returns answer + sources and grounds the model
- What it checks: (1) POST to /api/explore-chat with a JSON body
  { question: "What is sighting rate?" } returns a 200 response with a
  JSON body containing answer (non-empty string) and sources (array of
  source titles such as "How Sighting Rate Works"). (2) The system
  prompt sent to OpenAI instructs the model to ground answers in the
  retrieved context and to say "I don't know based on the provided
  documents." when the answer is not in the retrieved context. OpenAI
  embeddings and chat completion are mocked; the FAQ loader is mocked
  to return fixture documents so the test is deterministic and does
  not touch the real network or filesystem.
- Why it fails first; expected behavior: the route file
  src/app/api/explore-chat/route.ts doesn't exist yet, so the import
  of POST fails to resolve.

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

RED 34.11 — chunkMarkdownContent prepends the most recent heading to each chunk
- What it checks: When chunkMarkdownContent processes a markdown file
  that contains headings (e.g. "# Title" or "## Section"), each chunk
  that follows a heading has the heading text prepended to its text
  field. When a new heading appears in the text, subsequent chunks
  use the new heading and not the previous one. Chunks before any
  heading are returned without prepended context.
- Why it fails first; expected behavior: the current
  chunkMarkdownContent implementation only splits on double newlines
  and filters by length; it does not track heading state or prepend
  headings to chunk text, so paragraphs lose their semantic context
  when retrieved by the RAG pipeline.

---

## 35 — Weekly blog post on the Home page

A weekly blog post that lives below the % cards on the Home page. Blog
posts are markdown files in src/lib/blog/*.md with frontmatter (title,
date) and a markdown body. Only the most recent post is rendered on the
Home page — when a new post is added, it replaces the previous one in
view. Each post file is named YYYY-MM-DD-slug.md so the date sorts
naturally. The post is meant to be filled in weekly by a Zapier AI
workflow that writes a new markdown file into the repo via GitHub,
triggers a Vercel deploy, and the new post appears live the next time
someone visits Home.

RED 35.1 — loadBlogPosts reads markdown from src/lib/blog and returns posts sorted newest-first
- What it checks: loadBlogPosts() in src/lib/blogLoader.ts reads every
  .md file in src/lib/blog/, parses each file's frontmatter (title,
  date) and the markdown body that follows, and returns an array of
  { slug, title, date, body } objects sorted by date in descending
  order (newest first). The slug is derived from the filename without
  the .md extension (e.g. "2026-06-25-where-the-fish-are" stays as the
  slug). The frontmatter is parsed using gray-matter or an equivalent.
  The function uses fs/promises and is async. Two fixture files placed
  in src/lib/blog/ for the test confirm the ordering: an older-dated
  post and a newer-dated post must come back newest-first.
- Why it fails first; expected behavior: the loadBlogPosts function
  doesn't exist yet in src/lib/blogLoader.ts, so the import fails.

RED 35.2 — loadBlogPosts returns an empty array when the blog directory does not exist
- What it checks: When src/lib/blog/ does not exist on disk (ENOENT
  error from fs/promises.readdir), loadBlogPosts() returns an empty
  array [] rather than throwing. The fs/promises module is mocked so
  the readdir call rejects with an ENOENT error during the test. This
  matches the same defensive pattern as loadFaqDocuments() in
  src/lib/faqLoader.ts.
- Why it fails first; expected behavior: the loadBlogPosts function
  doesn't exist yet, so there is no ENOENT handling.

RED 35.3 — getLatestBlogPost returns the most recent post or null
- What it checks: getLatestBlogPost() in src/lib/blogLoader.ts calls
  loadBlogPosts() internally and returns the first element of the
  sorted-newest-first array as a single { slug, title, date, body }
  object, or null when loadBlogPosts() returns an empty array.
  fs/promises is mocked in the test (same setup as RED 35.1 and 35.2)
  to seed fixture markdown content, and the test asserts
  getLatestBlogPost returns the newest post or null when none exist.
- Why it fails first; expected behavior: the getLatestBlogPost
  function doesn't exist yet in src/lib/blogLoader.ts, so the import
  fails.

RED 35.4 — LatestBlogPost component renders the post title and body when a post exists
- What it checks: The LatestBlogPost component (a new component in
  src/components/LatestBlogPost.tsx, named export, server component)
  calls getLatestBlogPost() and renders the post's title as a heading
  and the post's markdown body rendered as HTML below it. The markdown
  body is rendered using react-markdown or an equivalent so headings,
  paragraphs, and lists in the markdown source render as real HTML.
  getLatestBlogPost is mocked in the test to return a fixture post
  with a known title and body, and the test asserts both appear in
  the rendered output.
- Why it fails first; expected behavior: the LatestBlogPost component
  doesn't exist yet in src/components/LatestBlogPost.tsx, so the
  import fails.

RED 35.5 — LatestBlogPost renders nothing when no posts exist
- What it checks: When getLatestBlogPost() returns null (no posts in
  src/lib/blog/), the LatestBlogPost component renders nothing
  visible — no empty heading, no placeholder text, no error. The
  component returns null or an empty fragment so the Home page is
  unaffected when there are no posts yet. getLatestBlogPost is mocked
  in the test to return null.
- Why it fails first; expected behavior: the LatestBlogPost component
  doesn't exist yet, so there is no graceful empty state.

Visual/wiring part (eyeball-verified):
Visual/wiring part (eyeball-verified):
The LatestBlogPost component is rendered on the Home page below the
% cards (the species occurrence summary section), so users see the
latest weekly post when they scroll past the data. The post title and
body must be at a comfortable reading size — large enough that
anglers reading on phones or laptops don't have to squint. Body text
should be at least the same size as the disclaimer paragraph beneath
the data cards. Verified by eye after wiring.
---

## 36 — Refactor blog to fetch from Google Apps Script JSON endpoint

Section 35 built the blog feature against local markdown files in
src/lib/blog/. This section refactors getLatestBlogPost to fetch the
current blog post from a Google Apps Script Web App that serves a
single sheet row as JSON. The Apps Script URL is stored in the
BLOG_JSON_URL environment variable. The endpoint returns a JSON object
with the shape { title: string, date: string, body: string } where
body is markdown content. With this in place, a future Zapier Zap can
update the blog by writing new values into the sheet (Schedule → AI
generate post → Google Sheets row update), and the change appears on
Home on the next page load without any redeploy. The existing
LatestBlogPost component (Section 35) does not change — only the
data source underneath it changes. The BlogPost type remains
{ slug: string; title: string; date: string; body: string }; the slug
field is derived from the date in YYYY-MM-DD form when read from the
endpoint (since the sheet does not carry a slug column).

RED 36.1 — getLatestBlogPost fetches the BLOG_JSON_URL and returns the post
- What it checks: getLatestBlogPost() in src/lib/blogLoader.ts calls
  fetch with the URL stored in process.env.BLOG_JSON_URL and returns
  a BlogPost object built from the JSON response. The response has
  the shape { title, date, body }. The returned BlogPost has its
  slug derived from the date in YYYY-MM-DD form (e.g. a date of
  "2026-06-25T04:00:00.000Z" produces slug "2026-06-25"). The
  global fetch is mocked to return a Response-like object whose
  json() method resolves with a fixture { title, date, body }.
  process.env.BLOG_JSON_URL is set to a fixture URL in the test and
  the test asserts fetch was called with that URL.
- Why it fails first; expected behavior: the current
  getLatestBlogPost reads from the filesystem via loadBlogPosts and
  does not call fetch at all, so the assertion that fetch was called
  with BLOG_JSON_URL fails.

RED 36.2 — getLatestBlogPost returns null when the fetch fails
- What it checks: When the global fetch rejects with a network error
  or resolves with a non-ok response (e.g. status 500),
  getLatestBlogPost() returns null instead of throwing. The fetch
  mock is configured to reject in one variation and to resolve with
  { ok: false, status: 500 } in another, and both variations result
  in null being returned. process.env.BLOG_JSON_URL is set so the
  function does attempt a fetch.
- Why it fails first; expected behavior: the current
  getLatestBlogPost does not call fetch and has no error handling
  around it, so this contract does not yet exist.

RED 36.3 — getLatestBlogPost returns null when BLOG_JSON_URL is not set
- What it checks: When process.env.BLOG_JSON_URL is undefined or
  empty, getLatestBlogPost() returns null without calling fetch.
  The test deletes the env var (or sets it to ""), calls the
  function, and asserts both that the return value is null and that
  the global fetch mock was never invoked. This protects the build
  in environments where the env var has not been configured yet.
- Why it fails first; expected behavior: the current
  getLatestBlogPost ignores process.env.BLOG_JSON_URL entirely, so
  the early-return-on-missing-env-var behavior does not yet exist.

Visual/wiring part (eyeball-verified):
After GREEN 36.3, with BLOG_JSON_URL set in .env to the live Apps
Script URL, the Home page renders the welcome blog post under the
% cards exactly as it did under Section 35 — same title, same body,
same styling — but the data is now coming from the Google Sheet via
the Apps Script JSON endpoint, not from the local markdown file in
src/lib/blog/. Confirmed by reload of the Home page on the dev
server. Once verified, the file src/lib/blog/2026-06-25-welcome-to-anglercast.md
can be deleted along with the now-unused loadBlogPosts helper.

---

## 37 — Agentic RAG: Saltwater Agent — Expected Behavior

The Saltwater Agentic RAG is a new feature on the saltwater page, separate from the FAQ RAG on the explore page (Section 34). Where the explore-chat RAG retrieves from markdown documents using vector similarity, the saltwater agentic RAG calls live external APIs in response to a user's saltwater fishing question and synthesizes a plain-English plan. A parallel freshwater agent will be built in Section 38, mirroring this structure.

The agent has access to exactly six external APIs:

1. Open-Meteo Forecast
2. Open-Meteo Marine
3. OBIS
4. GBIF
5. USGS
6. NOAA CO-OPS

These behaviors are non-negotiable and align with the AnglerCast honest-data principle: "Real data computes the facts. The AI explains and assembles — it does not invent."

A. The agent ALWAYS confirms the user's intended date BEFORE calling any tools. The agent never silently infers "this Saturday" or any relative date. The agent's first response is a clarifying question that proposes the date it thinks the user means and asks the user to confirm, so the user can see exactly which date the agent will pull data for.

B. The agent NEVER invents data outside its six APIs. When the user asks for something outside the agent's six APIs (restaurants, gear shops, lodging, news, etc.), the agent says it does not have that data source, lists the six APIs it does have, and suggests an external source (e.g. Google Maps) the user can check instead.

C. When the user asks an open-ended species question (e.g. "what fish are biting in Boston in July?") and the underlying API returns more than 40 species, the agent narrows the answer to the saltwater common-fished species list (provided to the agent in context) — so the answer surfaces species fishermen actually target, not noise. When the user asks about a specific species by name, the agent uses that species directly with no filtering.

D. The agent calls multiple tools in sequence to answer comprehensive questions (e.g. trip planning) and a single tool for simple targeted questions (e.g. "when is high tide today?"). The agent never asks the user mid-loop for more info — once the date is confirmed and the question is in scope, the agent runs its tools and assembles the final answer.

### Files this section produces

- Route: `src/app/api/saltwater-chat/route.ts` (POST handler)
- Agent lib: `src/lib/saltwaterAgent.ts` exporting `runSaltwaterAgent`
- Agent lib test: `src/lib/saltwaterAgent.test.ts`
- Tool registry + tools: `src/lib/saltwaterAgentTools.ts` exporting the tool registry and the six tool functions
- Tool registry + tools test: `src/lib/saltwaterAgentTools.test.ts`
- Component: `src/components/SaltwaterChat.tsx`
- Component test: `src/components/SaltwaterChat.test.tsx`
- Wired into: `src/app/saltwater/page.tsx`

---

### Behavior A — Date confirmation

RED 37.1 — System prompt instructs the agent to confirm the user's date before calling any tools
- What it checks: the system prompt sent to OpenAI by `runSaltwaterAgent` explicitly tells the model that it must propose a date back to the user and wait for confirmation before calling any of its tools. The test inspects the request body's system message and asserts it matches phrasing requiring date confirmation (e.g. matches /confirm.*date|propose.*date|wait.*confirm/i). OpenAI is mocked.
- Why it fails first; expected behavior: `runSaltwaterAgent` does not exist yet, so there is no system prompt to inspect.

RED 37.2 — `runSaltwaterAgent` returns a clarifying question and invokes no tools when the user's question contains an implicit date reference
- What it checks: when the user submits a question containing a relative date (e.g. "this Saturday"), `runSaltwaterAgent` returns a result whose response field contains a clarifying question with a proposed concrete date. No tool dispatches occur. The test mocks OpenAI to return a clarification message (no tool_calls) and asserts (a) the function returns the clarifying text and (b) no tool functions were invoked.
- Why it fails first; expected behavior: `runSaltwaterAgent` does not exist yet, so no clarification-then-tool flow is in place.

---

### Behavior B — Honest 6-API scope

RED 37.3 — System prompt declares exactly the six APIs the agent has access to
- What it checks: the system prompt lists exactly the six API names — Open-Meteo Forecast, Open-Meteo Marine, OBIS, GBIF, USGS, and NOAA CO-OPS — and instructs the model that these are the only data sources it may use. The test asserts each of the six API names appears in the system message. OpenAI is mocked.
- Why it fails first; expected behavior: `runSaltwaterAgent` does not exist yet.

RED 37.4 — System prompt instructs the agent to decline out-of-scope requests and suggest an external source
- What it checks: the system prompt tells the model that when the user asks for something outside the six APIs (restaurants, gear shops, lodging, news, etc.), the model must (a) say it does not have a data source for that, (b) name what it does have, and (c) suggest an external source like Google Maps. The test asserts phrasing matches /do not have.*data source|don't have.*data source/i and /Google Maps|external source/i. OpenAI is mocked.
- Why it fails first; expected behavior: `runSaltwaterAgent` does not exist yet.

RED 37.5 — `runSaltwaterAgent` returns the honest decline and invokes no tools when the user's question is fully out of scope
- What it checks: when the user submits a fully out-of-scope question (e.g. "What's a good vegetarian restaurant near Boston Harbor?"), `runSaltwaterAgent` returns the honest decline text and no tool dispatches occur. OpenAI is mocked to return the decline (no tool_calls); the test asserts the function returns the decline text and no tool functions were invoked.
- Why it fails first; expected behavior: `runSaltwaterAgent` does not exist yet.

---

### Behavior C — Common-fished species filter on open-ended queries

RED 37.6 — System prompt instructs the agent to narrow to the saltwater common-fished species list when the user's species question is open-ended
- What it checks: the system prompt tells the model that when the user asks about fish without naming a specific species AND a species query would return more than 40 results, the agent must narrow to the saltwater common-fished species list (provided in context). The test asserts the system prompt mentions the 40-species threshold and the saltwater common-fished list. OpenAI is mocked.
- Why it fails first; expected behavior: `runSaltwaterAgent` does not exist yet, and the system prompt has no species-narrowing instruction.

RED 37.7 — System prompt does NOT instruct narrowing when the user names a specific species
- What it checks: the system prompt distinguishes between open-ended species questions and specific-species questions, and only triggers the narrowing rule for open-ended ones. The test asserts the system prompt contains language clarifying that specific named species are queried directly (e.g. matches /specific species|named species|named by the user/i).
- Why it fails first; expected behavior: `runSaltwaterAgent` does not exist yet.

---

### Tool registry — six tools

RED 37.8 — `saltwaterAgentTools.ts` exports a tool registry with exactly six tools, each with name, description, and JSON Schema parameters
- What it checks: `SALTWATER_AGENT_TOOLS` (or equivalent named export) is an array of exactly six entries, each shaped as `{ type: "function", function: { name, description, parameters } }` per OpenAI's tool-calling contract. Each tool's name is unique and matches one of: forecast, marine, OBIS, GBIF, USGS, NOAA. Each `parameters` is a valid JSON Schema object with `type: "object"`, `properties`, and `required` fields. Each tool has a non-empty description.
- Why it fails first; expected behavior: `saltwaterAgentTools.ts` does not exist yet, so the import fails.

RED 37.9 — Tool registry exposes a dispatcher that runs the right tool function for a given tool_call name
- What it checks: `saltwaterAgentTools.ts` exports a `runSaltwaterTool(name, args)` function. Given a tool_call name and a parsed args object, `runSaltwaterTool` dispatches to the matching tool function and returns its result. Unknown tool names return a clear error shape (e.g. `{ error: "unknown_tool" }`) rather than throwing. Individual tool functions are mocked in this test.
- Why it fails first; expected behavior: the `runSaltwaterTool` dispatcher does not exist yet.

---

### Individual tool functions — six APIs

RED 37.10 — `fetchSaltwaterForecast` tool builds the Open-Meteo Forecast URL with the agent-provided lat/lng and target date, and parses the response into a stable shape
- What it checks: the tool function takes structured input from the agent (latitude, longitude, target date or date range) and calls fetch with a URL whose search params include full-precision lat/lng and the appropriate hourly variables for saltwater conditions context (wind, temperature, precipitation). Given a captured real response as a mocked fetch result, the function returns a parsed shape suitable for the agent to read. The test asserts the URL parameters and the parsed shape; fetch is mocked.
- Why it fails first; expected behavior: the tool function does not exist yet.

RED 37.11 — `fetchSaltwaterMarine` tool builds the Open-Meteo Marine URL with the agent-provided lat/lng and target date, and parses the response
- What it checks: the tool function takes lat/lng and target date and calls fetch with a URL whose search params include full-precision lat/lng and marine variables (wave height, wave direction, wave period, sea surface temperature, etc.). Given a captured real Open-Meteo Marine response as a mocked fetch result, returns a parsed shape. The test asserts URL parameters and parsed shape; fetch is mocked.
- Why it fails first; expected behavior: the tool function does not exist yet.

RED 37.12 — `fetchSaltwaterObis` tool queries OBIS by lat/lng bounding box and parses the response
- What it checks: the tool function takes lat/lng, radius, and optionally a species name and calls fetch with an OBIS occurrence URL whose search params include a geometry built from the lat/lng and radius, the species (when provided), and a size parameter for a confident sample (matching Section 23.1's contract). Given a captured real OBIS response, returns parsed records shaped `{ scientificName, decimalLatitude, decimalLongitude, eventDate, marine, vernacularName }`. The test asserts URL params and parsed shape; fetch is mocked.
- Why it fails first; expected behavior: the tool function does not exist yet.

RED 37.13 — `fetchSaltwaterGbif` tool queries GBIF by lat/lng bounding box and parses the response
- What it checks: the tool function takes lat/lng, radius, and optionally a species name and calls fetch with a GBIF occurrence search URL whose search params include decimal lat/lng range bounds, the species (when provided), and a limit parameter for a confident sample (matching Section 23.2's contract). Given a captured real GBIF response, returns parsed records shaped `{ scientificName, decimalLatitude, decimalLongitude, eventDate, year, month, stateProvince }`. The test asserts URL params and parsed shape; fetch is mocked.
- Why it fails first; expected behavior: the tool function does not exist yet.

RED 37.14 — `fetchSaltwaterUsgs` tool queries USGS NWIS for a site near the user's location and parses the response
- What it checks: the tool function takes a USGS site ID and parameter codes and calls fetch with the USGS NWIS instantaneous-values URL. Given a captured real USGS response (with deeply nested `value.timeSeries[]`), returns a flattened shape `{ siteName, latitude, longitude, parameters: [{ variableName, unit, latestValue, latestTime }] }`. The test asserts URL params and parsed shape; fetch is mocked.
- Why it fails first; expected behavior: the tool function does not exist yet.

RED 37.15 — `fetchSaltwaterNoaa` tool queries NOAA CO-OPS for tide predictions and parses the response
- What it checks: the tool function takes a NOAA station ID and target date and calls fetch with the NOAA CO-OPS predictions URL. Given a captured real NOAA response (`{ predictions: [{ t, v }] }`), returns a parsed shape that surfaces the high and low tide times for the date (walking the 6-minute series for local maxima/minima OR using a high_low product variant). The test asserts URL params and parsed shape; fetch is mocked.
- Why it fails first; expected behavior: the tool function does not exist yet.

---

### Tool dispatch and orchestration loop

RED 37.16 — `runSaltwaterAgent` sends the tool registry and system prompt to OpenAI along with the user's question
- What it checks: when `runSaltwaterAgent` is called with a user question, it invokes the OpenAI chat completion with (a) the user's question in the messages array, (b) the `SALTWATER_AGENT_TOOLS` registry in the `tools` parameter, and (c) the system prompt described in Behaviors A–D. OpenAI is mocked; the test asserts the request body contains all three pieces.
- Why it fails first; expected behavior: `runSaltwaterAgent` does not exist yet.

RED 37.17 — When OpenAI returns a single tool_call, `runSaltwaterAgent` runs that tool and feeds the result back to OpenAI
- What it checks: OpenAI is mocked to return a chat completion with one tool_call entry (e.g. `{ name: "fetchSaltwaterNoaa", arguments: '{"stationId":"8443970","date":"2026-06-28"}' }`) on the first call and a final answer on the second call. The test asserts (a) the matching tool function was invoked with the parsed arguments, (b) the tool's return value was sent back to OpenAI as a tool message in the second call's messages array, and (c) the final answer from the second call is what `runSaltwaterAgent` returns.
- Why it fails first; expected behavior: the tool-dispatch + result-feedback loop does not exist yet.

RED 37.18 — When OpenAI returns multiple tool_calls in sequence across turns, `runSaltwaterAgent` chains them and returns the final synthesis
- What it checks: OpenAI is mocked to return three responses in sequence — a tool_call for `fetchSaltwaterForecast`, then a tool_call for `fetchSaltwaterMarine`, then a tool_call for `fetchSaltwaterNoaa`, then a final answer. The test asserts each tool was invoked in order, each result was appended to the messages array between OpenAI calls, and the final answer is returned. This is the multi-turn loop described in Behavior D for comprehensive questions.
- Why it fails first; expected behavior: multi-turn iteration does not exist yet.

RED 37.19 — `runSaltwaterAgent` stops after a max iteration cap to prevent infinite loops
- What it checks: OpenAI is mocked to ALWAYS return a tool_call (never a final answer). `runSaltwaterAgent` stops looping after the configured cap (e.g. 8 iterations) and returns a clear safety result (e.g. `{ ok: false, reason: "max_iterations_exceeded" }`) instead of looping forever. The test asserts OpenAI was called exactly cap times and `runSaltwaterAgent` resolved (did not hang).
- Why it fails first; expected behavior: no iteration cap exists yet.

RED 37.20 — `runSaltwaterAgent` recovers when a tool function returns null or an error shape
- What it checks: OpenAI returns a tool_call; the mocked tool returns null (e.g. inland coordinates for marine, or no recent data from USGS). `runSaltwaterAgent` passes that null back to OpenAI as the tool result (so the model can adjust) rather than throwing. The test asserts the agent does not throw and the loop continues normally.
- Why it fails first; expected behavior: no graceful tool-null handling exists yet.

---

### Route — POST /api/saltwater-chat

RED 37.21 — POST /api/saltwater-chat — surfaces `runSaltwaterAgent`'s response back to the client
- What it checks: POSTing a JSON body `{ question: "...", history?: [...] }` to `src/app/api/saltwater-chat/route.ts` calls `runSaltwaterAgent` once with the question (and the optional prior conversation history sent by the component), and the route returns a 200 JSON response whose body contains the agent's response text. `runSaltwaterAgent` is mocked to return a known response; the test asserts the route surfaces it.
- Why it fails first; expected behavior: the route file does not exist yet.

RED 37.22 — POST /api/saltwater-chat — returns 400 for missing or empty question
- What it checks: POSTing with `question` missing, empty string, or whitespace-only returns a 400 status with a JSON error message. `runSaltwaterAgent` is NOT called.
- Why it fails first; expected behavior: the route does not exist yet.

RED 37.23 — POST /api/saltwater-chat — returns 500 when `runSaltwaterAgent` throws
- What it checks: when `runSaltwaterAgent` is mocked to throw an unexpected error, the route returns a 500 with a JSON error message instead of letting the error propagate.
- Why it fails first; expected behavior: the route does not exist yet.

---

### Component — SaltwaterChat

RED 37.24 — `SaltwaterChat` renders a labeled question input and a submit button
- What it checks: `SaltwaterChat` renders a labeled text input (with `id` and `htmlFor` pair) and a submit button. Both present on initial render with no response yet.
- Why it fails first; expected behavior: the component does not exist yet.

RED 37.25 — `SaltwaterChat` displays the agent's response after a successful submission
- What it checks: when the user submits a question and the mocked fetch to `/api/saltwater-chat` resolves with `{ response: "Did you mean Saturday, June 28?" }`, the component displays the response text. Fetch is mocked.
- Why it fails first; expected behavior: the component does not exist yet, or doesn't yet wire the API call to a rendered response.

RED 37.26 — `SaltwaterChat` shows a red spinner while the request is in flight
- What it checks: after the user clicks submit and while the fetch to `/api/saltwater-chat` is pending, a loading spinner (using the existing `Spinner.tsx` with a red variant or prop) is visible and the submit button is disabled. Once the fetch resolves, the spinner disappears and the response renders.
- Why it fails first; expected behavior: the component does not exist yet, and no spinner integration is in place.

RED 37.27 — `SaltwaterChat` sends prior conversation history with each follow-up request
- What it checks: when the user submits a follow-up question after a prior agent response (the typical date-confirmation flow), the component sends `{ question, history }` to the route, where `history` is the running conversation. The test mocks the first fetch to return a clarification, then asserts the second fetch's request body includes the prior assistant + user turns in `history`. This is how the multi-turn flow stays cost-effective without DB storage.
- Why it fails first; expected behavior: the component does not exist yet, and no history-passing wiring is in place.

RED 37.28 — `SaltwaterChat` shows an error message when the API call fails
- What it checks: when the mocked fetch to `/api/saltwater-chat` rejects or returns a non-200 response, the component displays a clear error message (e.g. "Something went wrong. Please try again.") and clears the spinner.
- Why it fails first; expected behavior: the component does not exist yet.

RED 37.29 — POST /api/saltwater-chat forwards body.history to runSaltwaterAgent
What it checks: POSTing to the route with a body containing both question AND a non-empty history array (e.g. one prior user turn + one prior assistant turn) calls runSaltwaterAgent with both fields, not just question. The runSaltwaterAgent import is mocked; the test asserts the mock was called with { question, history } where history deeply equals the array sent in the body.
Why it fails first; expected behavior: the route currently extracts only body.question and calls runSaltwaterAgent({ question }), dropping the history array silently. The component sends history (RED 37.27 proved that), but no test until now has asserted the route forwards it.

RED 37.30 — runSaltwaterAgent passes prior history into the OpenAI messages array before the new question
What it checks: When runSaltwaterAgent is called with { question, history } where history contains one user turn and one assistant turn, the global fetch mock that captures the OpenAI request is inspected: the messages array sent in the request body contains the prior user turn AND the prior assistant turn as { role, content } entries BEFORE the new question. The test asserts the prior user message appears before the prior assistant message, and both appear before the new question's user message.
Why it fails first; expected behavior: the current runSaltwaterAgent only sends the system prompt and the new question in the messages array. Even though RED 37.29 made the route forward history to the agent, the agent's input type doesn't yet accept history, so the prior turns never reach OpenAI.

It always returns unknown_tool regardless of input. It looks like Codex left a stub here that was never wired into the agent (the agent uses its own runSupportedTool instead). It's dead code but it's worth noting because it suggests the original Section 37 intent was for the tool-running logic to live in one place.

Why Codex's implementation passes all 28 tests despite this:
The orchestration tests (RED 37.16–37.20) mocked OpenAI responses and hand-crafted the tool_calls with the exact names the dispatcher expected. The tool tests (RED 37.10–37.15) tested each tool function with explicit arguments. No test asserted:

The tool name in the registry matches the dispatcher
The tool schemas declare the parameters those tools need
A real OpenAI response (with the actual model deciding what to call) reaches the right tool

These are real coverage gaps from Section 37.

Three RED tests I'd write to close the gaps, in TESTING.md style (specs only, no code yet — you tell me if these are the right tests before I write the code):

RED 37.31 — Tool registry names match the dispatcher in runSaltwaterAgent
What it checks: For each tool in SALTWATER_AGENT_TOOLS, calling the dispatcher (runSupportedTool or whatever the agent's tool-call handler is) with that tool's name field and valid arguments returns a non-error result. No tool in the registry can produce { error: 'unknown_tool' } when dispatched by its declared name.
Why it fails first; expected behavior: the registry uses short names (forecast, marine, etc.) but the dispatcher's switch statement matches long names (fetchSaltwaterForecast, etc.). Five of six tools fall through to unknown_tool.


RED 37.32 — Tool schemas declare required parameters with descriptions OpenAI can act on
What it checks: For each tool in SALTWATER_AGENT_TOOLS whose function requires inputs (forecast, marine, OBIS, GBIF, USGS, NOAA), the parameters JSON Schema declares the inputs the function actually needs — at minimum latitude and longitude for the location-based tools, targetDate for date-bound tools, siteId for USGS, stationId for NOAA — each with a type and a non-empty description, and listed in required. No tool schema uses an empty-properties object.
Why it fails first; expected behavior: every tool currently uses the emptyParameters constant. OpenAI receives no parameter schema and calls every tool with {}. Even when the right tool fires, it runs against latitude: 0, longitude: 0, targetDate: ''.


RED 37.33 — Agent does not invent data when a tool returns null or an error
What it checks: When OpenAI returns a tool_call, the matching tool returns null (or an error object), the agent sends that back to OpenAI, and OpenAI's next response contains the invented fallback ("typical July temperatures around 80°F..."). The agent's final response is post-processed or the system prompt is reinforced such that the final response acknowledges the tool failure honestly and does not contain fabricated facts. Specifically: the system prompt must instruct the model to say it could not retrieve the data and stop, never to fall back on training data. The test asserts the system prompt contains language matching /never invent|do not fabricate|cannot use training data|honest data/i (or similar honesty enforcement language matching your honest-data thesis).
Why it fails first; expected behavior: the current system prompt has no fallback-prohibition language. When a tool returns nothing useful, OpenAI fills the gap with training-data weather averages, directly violating AnglerCast's honest-data thesis from the README.

RED 37.34 — runSaltwaterAgent dispatches tool_calls through the registry-aware runSaltwaterTool, not a private duplicate
What it checks: When OpenAI returns a tool_call whose function.name is a registered short name from SALTWATER_AGENT_TOOLS (e.g. 'forecast', 'marine', 'noaa', 'obis', 'gbif', 'usgs'), the agent dispatches that call through the shared runSaltwaterTool exported from saltwaterAgentTools.ts. The test mocks runSaltwaterTool directly via vi.mock('@/lib/saltwaterAgentTools', ...) and asserts the mock is called with the tool name and parsed arguments. The agent must not maintain a separate, private switch statement that handles only a subset of tools or uses different name strings.
Why it fails first; expected behavior: the agent currently has a private runSupportedTool function inside saltwaterAgent.ts that handles only fetchSaltwaterForecast, fetchSaltwaterMarine, and fetchSaltwaterNoaa (the old long names). When OpenAI calls a tool by its registry name ('forecast', etc.), this private dispatcher returns { error: 'unknown_tool' } for all six cases. The fix from RED 37.31 wired runSaltwaterTool correctly but the agent never calls it. This RED forces the agent to use the registry-aware dispatcher.

## 37.5 — Refactor: orchestration tests use the registry-aware dispatcher seam

After GREEN 37.34 wired `runSaltwaterAgent` to dispatch tool_calls through the shared `runSaltwaterTool` from `saltwaterAgentTools.ts` (instead of a private switch over individual tool functions), 5 existing orchestration tests began failing. Their mocks targeted the old seam: they stubbed `fetchSaltwaterForecast`, `fetchSaltwaterMarine`, etc. directly. The agent no longer calls those functions directly, so the mocks no longer intercept the dispatch.

This section refactors each broken test to mock the new seam (`runSaltwaterTool`) without weakening what each test asserts. The orchestration behaviors each test was originally designed to cover — single tool_call round-trip, multi-step chaining, max iteration cap, null tool recovery, error-shape recovery — remain unchanged. Only the mock target is updated.

Each entry below is a single test, refactored in its own RED → GREEN cycle.

---

REFACTOR 37.35 — Test "recovers when a tool function returns null or an error shape and continues to a final answer"
- What it checks (unchanged): when a tool returns an error-shape result mid-loop, the agent feeds the error back to OpenAI and continues to a final answer.
- Why it currently fails: the test mocks an individual tool function to return `{ error: ... }`. The agent dispatches through `runSaltwaterTool` now, so the mock is never reached and the loop receives whatever the real `runSaltwaterTool` returns (which is the real fetch path against undefined env, throwing or returning unexpected data).
- Refactor: replace the individual tool function mock with a `vi.spyOn(toolsModule, 'runSaltwaterTool').mockResolvedValue({ error: ... })`. The test's assertions about the final agent response and the OpenAI message sequence remain the same.

REFACTOR 37.36 — Test "runs a single tool_call, feeds the result back to OpenAI, and returns the final answer"
- What it checks (unchanged): the agent dispatches the tool, sends the tool result back to OpenAI in the messages array with the matching `tool_call_id`, and returns the final answer text.
- Why it currently fails: the test mocks `fetchSaltwaterNoaa` (or similar) directly. The agent dispatches through `runSaltwaterTool`, so the original mock isn't called and the real `runSaltwaterTool` runs against the second OpenAI mock that returned `{}` with no `choices`.
- Refactor: replace the individual tool function mock with a `vi.spyOn(toolsModule, 'runSaltwaterTool').mockResolvedValue(...)` returning the same shape the test originally expected. The OpenAI mock sequence stays the same.

REFACTOR 37.37 — Test "chains multiple tool_calls in sequence and returns the final synthesis"
- What it checks (unchanged): when OpenAI returns tool_calls across multiple iterations, the agent dispatches each, feeds each result back, and returns the final answer after the loop terminates.
- Why it currently fails: the test mocks multiple individual tool functions, none of which are reached now that the agent uses `runSaltwaterTool`.
- Refactor: replace the multiple individual tool function mocks with a single `vi.spyOn(toolsModule, 'runSaltwaterTool')` that returns different values per call (`mockResolvedValueOnce` per iteration). The OpenAI mock sequence stays the same.

REFACTOR 37.38 — Test "stops after max iterations when OpenAI never returns a final answer"
- What it checks (unchanged): when OpenAI keeps returning tool_calls past the configured cap, the agent stops and returns `{ ok: false, reason: 'max_iterations_exceeded' }`.
- Why it currently fails: the test mocks a tool function to always succeed, but the agent dispatches through `runSaltwaterTool` instead, so the mock isn't reached.
- Refactor: replace the tool function mock with a `vi.spyOn(toolsModule, 'runSaltwaterTool').mockResolvedValue(...)`. The assertion about max iterations and the OpenAI call count stays the same.

REFACTOR 37.39 — Test "handles a tool returning null and continues the loop to a final answer"
- What it checks (unchanged): when a tool returns `null`, the agent feeds `null` back to OpenAI (serialized in the tool message), and OpenAI's next response is honored normally.
- Why it currently fails: the test mocks an individual tool function to return `null`. The agent dispatches through `runSaltwaterTool`, so the null never reaches OpenAI as the tool result.
- Refactor: replace the individual tool function mock with a `vi.spyOn(toolsModule, 'runSaltwaterTool').mockResolvedValue(null)`. The assertions about the agent continuing the loop stay the same.

---

RED 37.40 — Forecast and Marine tools request imperial units from Open-Meteo
- What it checks: When fetchSaltwaterForecast is called, the URL it builds for api.open-meteo.com includes temperature_unit=fahrenheit and wind_speed_unit=mph query parameters, and precipitation_unit=inch. When fetchSaltwaterMarine is called, the URL it builds for marine-api.open-meteo.com includes length_unit=imperial (so wave heights come back in feet rather than meters). The existing tool tests are extended to assert these query parameters appear in the fetched URL.

- Why it fails first; expected behavior: the current tool implementations call Open-Meteo with no unit parameters, so the API returns metric defaults (Celsius, km/h, mm, meters). Reports to users mix units and don't match the US-centric audience. This change keeps the honest-data thesis intact — the API returns imperial values, no LLM-side conversion required.

After all five GREENs commit, the diagnostic console.log lines added during the GREEN 37.34 debugging pass will be cleaned up in a final commit. Those were not test-driven and exist only to confirm the bug fix; once the orchestration tests run cleanly against the new seam, they can come out.

---

RED 37.41 — runSaltwaterAgent handles OpenAI responses that have no choices field without crashing
What it checks: When the OpenAI API returns a response body that omits the choices field (e.g. an error payload like { error: { message: 'rate limit exceeded' } }), runSaltwaterAgent does not throw Cannot read properties of undefined (reading '0'). Instead it returns a SaltwaterAgentResult with a recognizable shape — either an empty response or an error indicator — so the route can surface a graceful failure rather than a 500 stack trace.
Why it fails first; expected behavior: the current implementation accesses completion.choices[0]?.message directly. The optional chaining protects against choices[0] being undefined, but not against choices itself being undefined. When OpenAI returns an error payload, the agent crashes.

---

### Reference system prompt (GREEN-time starting point)

This is reference wording for Codex to use as a starting point. The tests above assert the SHAPE of the prompt via regex, not these exact sentences. Codex may tune the wording at GREEN as long as the regex shape continues to match.

> You are AnglerCast's saltwater trip-planning agent. You help anglers plan a saltwater fishing trip by checking live data from real public APIs.
>
> You have access to exactly six external data sources, and these are the ONLY data sources you may use:
>
> 1. Open-Meteo Forecast — wind, temperature, precipitation
> 2. Open-Meteo Marine — wave height, period, direction, sea surface conditions
> 3. OBIS — marine species occurrence records
> 4. GBIF — global species occurrence records
> 5. USGS — water gauge readings
> 6. NOAA CO-OPS — tide predictions
>
> CRITICAL RULE — date confirmation: Before calling ANY tools, you MUST confirm the user's intended date with the user. The user may say things like "this Saturday," "next weekend," or "tomorrow" — never silently infer the date yourself. Always propose a concrete date back to the user (e.g. "Did you mean Saturday, June 28?") and wait for them to confirm before calling any tools. This is non-negotiable.
>
> CRITICAL RULE — honest scope: When the user asks for something you cannot answer with your six APIs (restaurants, food, lodging, gear shops, fishing licenses, news, regulations, etc.), respond plainly: say you do not have a data source for that, list the six APIs you do have access to, and suggest the user check an external source like Google Maps. Never invent data outside your six APIs. This is non-negotiable.
>
> CRITICAL RULE — common-fished species filter: When the user asks an open-ended species question (e.g. "what fish are biting?") and a species query would return more than 40 species, narrow your answer to the saltwater common-fished species list provided to you in this context. The list contains exactly 40 species (each with a common name and scientific name) and is read at request time from `getSpeciesForWaterType('saltwater')` in `src/lib/species.ts`, then injected into this prompt before the OpenAI call. When the user names a specific species, query that species directly without filtering.
>
> CRITICAL RULE — tool sequencing: For comprehensive questions (trip planning, "where should I fish," etc.), call multiple tools in sequence to gather all the data you need (weather, marine, tide, species records, etc.). For simple targeted questions (e.g. "when is high tide today?"), call only the one tool that answers it. Do not ask the user mid-loop for more information — once the date is confirmed and the question is in scope, run your tools and assemble the final answer.

---

### Notes:

(1) The exact wording of the system prompt is a GREEN-time choice. Tests assert SHAPE via regex (Sections 19–22 pattern), not specific sentences.

(2) The saltwater common-fished species list is already in the project at `src/lib/species.ts`, exported as a 40-species list accessible via `getSpeciesForWaterType('saltwater')`. Each species is shaped `{ commonName, scientificName }`. The route should read the list with this helper and inject it into the system prompt before each OpenAI call so the agent can use it for the species-narrowing behavior described in Behavior C. No new species list needs to be created — Codex imports from the existing file.

(3) Conversation history is stored in the component's React state and sent with every fetch request in the `history` field of the JSON body. No DB schema is added in this section. If implementation reveals a need for persistence (rate limit handling, audit, cross-tab), a schema can be added in a follow-up section.

(4) Section 38 will mirror this structure for the freshwater page: `/api/freshwater-chat`, `freshwaterAgent.ts`, `freshwaterAgentTools.ts`, `FreshwaterChat.tsx`. The tool functions in Section 38 will mirror the six saltwater tools with a freshwater-appropriate variable set (e.g. forecast emphasis on freshwater conditions, USGS emphasis on streamflow/temperature, no NOAA tides). The freshwater common-fished species list will be a separate list provided by Jacqueline.

---

### Visual/wiring part (eyeball-verified):

After GREEN, an angler on the saltwater page can submit a question like "Where should I fish this Saturday?" in the `SaltwaterChat` component and see the agent's clarifying question proposing the date. After replying with the date, the angler sees the red spinner while the agent calls multiple tools (forecast, marine, tide, OBIS, GBIF) in sequence, then sees the synthesized fishing plan with which data sources were consulted. A question like "What's a good vegetarian restaurant near Boston Harbor?" produces the honest decline with the six-API list and a Google Maps suggestion. A question like "when is high tide today?" produces a single-tool response from NOAA CO-OPS. Verified by eye on the dev server, then again against the deployed Vercel build.

---

# 2. Run the tests (expect RED)

I run all the tests. They must all fail, because no implementation exists yet. I confirm each fails for the REASON I expect (missing behavior) — not a typo or bad import. Then I commit the RED.

# 3. Write the simplest code to pass (GREEN)

One test at a time, I write the simplest implementation to make that test pass, re-run, confirm GREEN, and commit the GREEN separately. I never weaken a test to get there.

---




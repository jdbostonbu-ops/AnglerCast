TDD Test-Writing Prompts — Must Haves (Features 1–5)

These are the prompts I give Codex to drive strict test-first development for my 5 Must Have features. Each one tells Codex to write the FAILING test first (RED) and stop, so I can confirm it fails for the right reason before any implementation. Then I ask for the simplest code to pass (GREEN). I never let a test be weakened to go green, and I paste my own TESTING.md ledger entries — Codex never edits TESTING.md.

Standing rules in every prompt: re-read AGENTS.md first; strict TypeScript (no any); no var; closure-based arrow functions assigned to const; factory functions over classes (except Next.js route handlers); mock external calls (Prisma/Neon, email, OpenAI); run the test and show me the result; do not commit unless I ask.


FEATURE 1 — Email code verification

RED prompt (generate a code):
Re-read AGENTS.md. Strict TDD — write ONE failing test first, then stop, do not write the implementation. I want a pure function that generates an email verification code and returns it stored HASHED with an expiry timestamp (the raw code is what gets emailed, the hash is what gets stored). Write a test that asserts: the function returns a hash that is NOT equal to the raw code, and an expiry timestamp that is in the future. Run it and show me it's RED. Do not edit TESTING.md.

GREEN prompt:
Good, that's the RED I wanted. Now write the simplest code to make only that test pass — hash the code, set an expiry in the future. Run it, show me GREEN. Don't add extra behavior. Don't touch other tests.

RED prompt (verify correct, unexpired code):
Now one more failing test first, then stop. I want a verify function that returns true only when the entered code matches the stored hash AND the expiry is still in the future. Write a test for the success case: a correct, unexpired code verifies true. Run it, show me RED.

RED prompt (expired code fails):
Another failing test first. The same verify function returns false when the code is correct but the expiry is in the past. Mock time so the code is expired. Write it, run it, show me RED.

RED prompt (wrong code fails):
Another failing test first. The verify function returns false when the entered code does not match the stored hash, even if it's unexpired. Write it, run it, show me RED.

RED prompt (account stays inactive until verified):
Last failing test for this feature. A new account is created with isVerified false, and only flips to true after a successful verification. Mock the DB. Write it, run it, show me RED.


FEATURE 2 — Login

RED prompt (correct password passes):
Re-read AGENTS.md. One failing test first, then stop. I want a credential-check function that looks up a user by email and bcrypt-compares the entered password to the stored passwordHash. Write a test for the success case: a correct password for a verified user returns success. Mock the DB and bcrypt. Run it, show me RED. Don't edit TESTING.md.

GREEN prompt:
Simplest code to pass only that test. Show me GREEN.

RED prompt (wrong password rejected):
Another failing test first. The same function rejects a wrong password with a clear failure (not a crash). Write it, run it, show me RED.

RED prompt (unverified user blocked):
Another failing test first. A user who has not verified their email cannot log in even with the correct password — the function blocks them. Write it, run it, show me RED.

RED prompt (show/hide toggle — component test):
One failing component test first. The password input has a show/hide toggle: by default the input type is "password", and after clicking the toggle it becomes "text". Write the test that renders the field, checks it starts as "password", clicks the toggle, and checks it becomes "text". Run it, show me RED.


FEATURE 3 — CRUD for SavedSpot

RED prompt (create + read):
Re-read AGENTS.md. One failing test first, then stop. I want the SavedSpot create-and-read logic: creating a SavedSpot for a user stores it, and reading returns that user's spots. Write a test that creates a SavedSpot with FULL-PRECISION coordinates (like 41.063500, -71.862800) and asserts reading it back returns the SAME coordinates with no rounding. Mock Prisma. Run it, show me RED. Do not edit TESTING.md.

GREEN prompt:
Simplest code to pass only that test. Coordinates must round-trip unchanged — no toFixed, no rounding. Show me GREEN.

RED prompt (only my own spots):
Another failing test first. Reading spots returns only the logged-in user's spots, not another user's. Mock two users' data. Write it, run it, show me RED.

RED prompt (update persists):
Another failing test first. Updating a SavedSpot (e.g. its name or notes) persists the change and leaves the coordinates at full precision. Write it, run it, show me RED.


FEATURE 4 — Delete confirmation dialog

RED prompt (confirm fires delete):
Re-read AGENTS.md. One failing component test first, then stop. I want a delete confirmation dialog: clicking delete opens a dialog, and only clicking "Confirm" calls the delete handler. Write a test that renders the dialog, clicks Confirm, and asserts the delete function was called exactly once. Mock the delete function. Run it, show me RED. Do not edit TESTING.md.

GREEN prompt:
Simplest code to pass only that test. Show me GREEN.

RED prompt (cancel does nothing):
Another failing test first. Clicking "Cancel" in the dialog does NOT call the delete handler and closes the dialog. Write it, run it, show me RED.


FEATURE 5 — Prisma + Neon live database

RED prompt (schema + relationship, logic level):
Re-read AGENTS.md. One failing test first, then stop. With Prisma mocked, I want to prove the data layer creates a User and a SavedSpot linked to that user (the SavedSpot has the user's id as its foreign key). Write a test that creates a user, creates a SavedSpot for that user, and asserts the SavedSpot's userId matches the user's id. Run it, show me RED. Do not edit TESTING.md.

GREEN prompt:
Simplest code to pass only that test. Show me GREEN.

Live check (not a unit test — I run this myself):
After the mocked tests pass: run the real Prisma migration against Neon, then create one row and read it back to confirm the live connection works. The connection string is in .env (not committed). This is a manual confirmation, separate from the mocked unit tests.


How I grade every RED before allowing GREEN
- Did it fail for the REASON I expected (the missing behavior), not a typo or a bad import?
- Is the assertion specific (the actual value I expect), not just "truthy"?
- Is it testing real behavior, not a tautology?
If the RED is wrong, I fix the test before any implementation is written.
